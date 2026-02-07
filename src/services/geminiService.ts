import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ReportAnalysis, Language } from "../types";

export const analyzeReport = async (
  fileBase64: string,
  mimeType: string,
  language: Language
): Promise<ReportAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const systemInstruction = `
    You are a high-precision medical document specialist. Your task is to extract data from medical reports with 100% accuracy and explain them for common people.
    
    CRITICAL EXTRACTION RULES:
    1. EXHAUSTIVE EXTRACTION: You MUST extract every single laboratory parameter, biomarker, and value found in the report. Do not skip any rows, even if they seem minor.
    2. DATA INTEGRITY: Keep medical terminology exact in the 'name' field.
    3. LOSSLESS: If there are multiple tables, scan all of them. Identify units (like mg/dL) and include them in the 'value' field.
    4. NO DIAGNOSIS: Explain what the values mean broadly, but never diagnose a specific disease.
    5. LANGUAGE: All explanations (summary, test explanation, medicine purpose) must be in ${language}.
    6. For 'Hinglish', use Hindi words but write them in English script.
  `;

  const prompt = `
    Analyze this medical document with extreme precision. 
    1. Table Extraction: Scan every row of every table. Extract the Test Name, Result Value (with units), and Reference/Normal Range.
    2. Status Determination: Flag results as 'Low', 'High', or 'Normal' based strictly on the reference range provided in the document.
    3. Medicine Identification: List every drug or supplement mentioned.
    4. Observations: Capture any 'Clinical Notes', 'Impression', or 'Comments' section found at the bottom of the report.
    5. Summary: Provide a clear, professional overview of the findings in ${language}.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { inlineData: { data: fileBase64, mimeType: mimeType } },
          { text: prompt }
        ]
      }
    ],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A simple overview of the report in 3-5 sentences." },
          tests: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Full medical name of the test as written in the report." },
                value: { type: Type.STRING, description: "The result value including units (e.g., '12.5 g/dL')." },
                normalRange: { type: Type.STRING, description: "The reference range provided in the report." },
                status: { type: Type.STRING, enum: ["Low", "Normal", "High", "N/A"] },
                explanation: { type: Type.STRING, description: "Simple explanation of what this specific parameter measures and what the current value implies for health." }
              },
              required: ["name", "value", "status", "explanation"]
            }
          },
          medicines: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                generalPurpose: { type: Type.STRING },
                howItWorks: { type: Type.STRING }
              },
              required: ["name", "generalPurpose", "howItWorks"]
            }
          },
          clinicalObservations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Any extra terminologies, clinical notes, or impressions found in the document text."
          }
        },
        required: ["summary", "tests", "medicines"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as ReportAnalysis;
};

