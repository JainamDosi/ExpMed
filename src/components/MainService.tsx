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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0d1b2a] text-[#e5e5e5]">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
        {!analysis ? (
          <div className="max-w-2xl mx-auto py-8 fade-in">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Analyze Your Report
              </h2>
              <p className="text-xl text-[#888888] font-light leading-relaxed max-w-xl mx-auto">
                Upload your medical lab report or prescription. We'll extract and explain the findings in plain language.
              </p>
            </div>

            <div className="space-y-8">
              {/* File Upload Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 p-12 text-center glass-effect ${isDragging
                    ? 'border-white bg-white/10 scale-[1.02]'
                    : file
                      ? 'border-white/50 bg-white/5'
                      : 'border-white/20 hover:border-white/50 hover:bg-white/5'
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
                <label htmlFor="file-upload" className={`cursor-pointer block ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className={`transition-all duration-300 ${file ? 'text-cyan-400 scale-110' : 'text-[#888888]'}`}>
                      {file ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg mb-2">
                        {file ? file.name : isDragging ? "Drop your file here" : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-[#888888] font-light">
                        {file ? "File ready for analysis" : "JPG, PNG or PDF (Max 10MB)"}
                      </p>
                    </div>
                    {file && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="mt-2 px-4 py-2 text-xs text-[#888888] hover:text-white transition-colors"
                      >
                        Remove file
                      </button>
                    )}
                  </div>
                </label>
              </div>

              {/* Language Selection */}
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-4">
                    Select Output Language
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setLanguage(opt.value as Language)}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${language === opt.value
                            ? 'bg-white text-black shadow-lg shadow-white/30 scale-105'
                            : 'bg-white/5 text-[#888888] border border-white/10 hover:border-white/50 hover:text-white hover:bg-white/10'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!file || loading}
                  className={`w-full py-4 rounded-lg font-semibold text-base transition-all duration-300 ${!file || loading
                      ? 'bg-[#333333] text-[#666666] cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/30 active:scale-[0.98]'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium">{LOADING_MESSAGES[loadingMsgIdx]}</span>
                    </div>
                  ) : (
                    "Analyze Report"
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="glass-effect border border-red-500/30 bg-red-500/10 rounded-xl p-4 flex items-start space-x-3 text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ReportDisplay analysis={analysis} onReset={handleReset} />
        )}
      </main>

      <footer className="py-8 border-t border-white/10 mt-auto">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#888888] text-xs font-light">
            Medical Understanding Tool • Secured • &copy; {new Date().getFullYear()} Swasthya Helper
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainService;
