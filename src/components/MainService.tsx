import React, { useState, useEffect } from 'react';
import Header from './Header';
import ReportDisplay from './ReportDisplay';
import { analyzeReport } from '../services/geminiService';
import { Language, ReportAnalysis, FileData } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';

const LOADING_MESSAGES = [
  "Digitizing report data...",
  "Processing medical terminology...",
  "Formatting explanation...",
  "Checking medicine safety database..."
];

const MainService: React.FC = () => {
  const [file, setFile] = useState<FileData | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ReportAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setFile({
        base64,
        mimeType: selectedFile.type,
        name: selectedFile.name
      });
      setError(null);
    };
    reader.onerror = () => setError("The file could not be read.");
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setFile({
          base64,
          mimeType: droppedFile.type,
          name: droppedFile.name
        });
        setError(null);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file to continue.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await analyzeReport(file.base64, file.mimeType, language);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError("Analysis encountered an error. Please ensure the image is clear and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#e5e5e5] font-sans">
      <Header />

      <main className="flex-grow w-full mx-auto px-6 py-12 md:py-24 max-w-7xl">
        {!analysis ? (
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left Column: Upload Area */}
            <div className="order-2 md:order-1 h-full">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`h-full min-h-[400px] relative border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center text-center p-8 ${isDragging
                  ? 'border-cyan-500 bg-cyan-500/5'
                  : file
                    ? 'border-cyan-500/50 bg-cyan-500/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-cyan-500/30'
                  }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <label htmlFor="file-upload" className={`cursor-pointer w-full h-full flex flex-col items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="space-y-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors mx-auto ${file ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400'}`}>
                      {file ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-white">
                        {file ? file.name : isDragging ? "Drop your file here" : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {file ? "Ready to analyze" : "Supports PDF, JPG, PNG (Max 10MB)"}
                      </p>
                    </div>
                    {file && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-sm text-red-400 hover:text-red-300 underline underline-offset-4"
                      >
                        Remove file
                      </button>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column: Key Info & Actions */}
            <div className="order-1 md:order-2 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Free Medical Analysis</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Simplify your <br />
                  <span className="text-gray-500">medical reports.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Upload your lab test or prescription and get a simple, easy-to-understand explanation in seconds.
                </p>
              </div>

              <div className="space-y-8 bg-white/[0.03] p-8 rounded-2xl border border-white/5">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Choose Language
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setLanguage(opt.value as Language)}
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${language === opt.value
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!file || loading}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] ${!file || loading
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-xl shadow-cyan-500/20'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>{LOADING_MESSAGES[loadingMsgIdx]}</span>
                    </div>
                  ) : (
                    "Analyze Report"
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3 text-red-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ReportDisplay analysis={analysis} onReset={handleReset} />
        )}
      </main>

      <footer className="py-10 border-t border-white/5 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#444] font-bold">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-cyan-500/50 rounded-full animate-pulse"></div>
            Private Session Active
          </div>
          <div>&copy; {new Date().getFullYear()} </div>
        </div>
      </footer>
    </div>
  );
};

export default MainService;
