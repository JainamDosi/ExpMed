import React, { useState, useEffect, useRef } from 'react';
import { speakText } from '../services/ttsService';

interface VoiceButtonProps {
  text: string;
  label?: string;
  compact?: boolean;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ text, label, compact = false }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'playing') {
      currentSourceRef.current?.stop();
      setStatus('idle');
      return;
    }

    setStatus('loading');
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const source = await speakText(text, audioContextRef.current);
      currentSourceRef.current = source;
      
      source.onended = () => {
        setStatus('idle');
      };

      source.start();
      setStatus('playing');
    } catch (err) {
      console.error('Audio playback failed:', err);
      setStatus('idle');
    }
  };

  useEffect(() => {
    return () => {
      currentSourceRef.current?.stop();
    };
  }, []);

  const baseClasses = "flex items-center justify-center transition-all duration-200 font-medium";
  
  const stateClasses = status === 'playing' 
    ? "bg-slate-800 text-white" 
    : status === 'loading'
    ? "bg-slate-100 text-slate-400 cursor-wait"
    : "bg-white text-slate-600 border border-slate-300 hover:border-slate-400 hover:bg-slate-50";

  const sizeClasses = compact 
    ? "w-8 h-8 rounded-full shadow-sm" 
    : "px-3 py-1.5 rounded-md text-xs space-x-2 shadow-sm";

  return (
    <button 
      onClick={handleToggle} 
      disabled={status === 'loading'}
      className={`${baseClasses} ${stateClasses} ${sizeClasses}`}
      title={status === 'playing' ? "Stop playback" : "Read aloud"}
    >
      {status === 'loading' ? (
        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : status === 'playing' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      )}
      {!compact && <span>{status === 'playing' ? 'Stop' : label || 'Listen'}</span>}
    </button>
  );
};

export default VoiceButton;

