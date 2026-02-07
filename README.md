# ExpMed (Swasthya Report Explainer) 🏥

**Understand Your Health Reports Instantly.**

ExpMed is an AI-powered application designed to simplify complex medical laboratory reports for everyone. By leveraging advanced Generative AI (Google Gemini), it translates medical jargon into clear, easy-to-understand language in English, Hindi, or Hinglish.

![ExpMed Demo](https://placehold.co/1200x600?text=ExpMed+App+Preview) 
*(Replace with your actual screenshot)*

## ✨ Key Features

- **📄 Universal Upload**: Drag & drop support for PDF documents, JPG, and PNG images.
- **🤖 AI Analysis**: Uses Google's Gemini 1.5 Flash model for high-speed, accurate medical data extraction.
- **🗣️ Multi-Language Support**:
  - **English**: Standard simplified medical explanation.
  - **Hindi (हिंदी)**: For native speakers.
  - **Hinglish**: Hindi spoken in English script for easy reading.
- **🔊 Text-to-Speech**: Listen to summaries and explanations with built-in voice support.
- **🔒 Privacy First**: All processing happens in real-time. No medical data is stored on our servers.
- **⚡ Fast & Responsive**: Built with Vite and React for a lightning-fast experience.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (with custom animations and glassmorphism)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`)
- **Routing**: React Router DOM

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JainamDosi/ExpMed.git
   cd swasthya-report-explainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```
   *Note: Ensure you have access to the Gemini API.*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the app.

## 📂 Project Structure

```
src/
├── components/       # UI Components (LandingPage, MainService, ReportDisplay, etc.)
├── services/         # API integrations (geminiService, ttsService)
├── constants.ts      # App-wide constants and configuration
├── types.ts          # TypeScript interfaces and types
├── App.tsx           # Main application router
├── main.tsx          # Entry point
└── index.css         # Global styles and Tailwind directives
```

## ⚠️ Disclaimer

**ExpMed is an educational tool.** It is **NOT** a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by Jainam Dosi
