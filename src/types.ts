export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  HINGLISH = 'Hinglish'
}

export interface LabTest {
  name: string;
  value: string;
  normalRange: string;
  status: 'Low' | 'Normal' | 'High' | 'N/A';
  explanation: string;
}

export interface Medicine {
  name: string;
  generalPurpose: string;
  howItWorks: string;
}

export interface ReportAnalysis {
  summary: string;
  tests: LabTest[];
  medicines: Medicine[];
  clinicalObservations?: string[];
}

export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}

