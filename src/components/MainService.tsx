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

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-20">
        {!analysis ? (
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="text-left space-y-4">
              <div className="inline-block px-2 py-1 border border-cyan-500/20 text-[10px] uppercase tracking-[0.2em] text-cyan-400 bg-cyan-500/5">
                Analyze Report
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">
                Upload <br />Your Document
              </h2>
            </div>

            <div className="space-y-12">
              {/* File Upload Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed transition-all duration-300 p-16 text-center group ${isDragging
                  ? 'border-cyan-500 bg-cyan-500/5'
                  : file
                    ? 'border-cyan-500/40 bg-cyan-500/5'
                    : 'border-white/10 bg-transparent hover:border-cyan-500/30'
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
                  <div className="flex flex-col items-center justify-center space-y-6 transition-transform group-hover:scale-[1.02]">
                    <div className={`w-16 h-16 border flex items-center justify-center transition-colors ${file ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10'}`}>
                      {file ? (
                        <div className="w-4 h-4 bg-cyan-400 animate-pulse"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/20 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white text-xs uppercase tracking-widest">
                        {file ? file.name : isDragging ? "Release now" : "Select your file"}
                      </p>
                      <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">
                        {file ? "File ready" : "PDF, JPG or PNG supported"}
                      </p>
                    </div>
                    {file && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-[9px] uppercase tracking-widest text-white/30 hover:text-red-400 border-b border-white/5 transition-colors"
                      >
                        Change File
                      </button>
                    )}
                  </div>
                </label>
              </div>

              {/* Language Selection */}
              <div className="border border-white/10 p-10 space-y-8 bg-white/[0.01] hover:border-cyan-500/10 transition-colors">
                <div className="space-y-6">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#888888]">
                    Explanation Language
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setLanguage(opt.value as Language)}
                        disabled={loading}
                        className={`px-6 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${language === opt.value
                          ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                          : 'bg-transparent text-[#888888] border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400'
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
                  className={`w-full py-5 rounded-none font-bold text-sm uppercase tracking-[0.2em] transition-all sleek-button ${!file || loading
                    ? 'bg-transparent text-[#333] border-white/5 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-cyan-500 hover:text-black hover:border-cyan-500'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="dot-pulse"></div>
                      <span className="font-bold uppercase italic text-[10px] tracking-widest text-[#888888]">{LOADING_MESSAGES[loadingMsgIdx]}</span>
                    </div>
                  ) : (
                    "Analyze Now →"
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="border border-red-900/50 bg-red-950/20 rounded-none p-5 flex items-start space-x-3 text-red-500 font-sans text-[10px] uppercase tracking-widest font-bold">
                  <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>
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
