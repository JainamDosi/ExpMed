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

  const baseClasses = "flex items-center justify-center transition-all duration-200 font-bold uppercase tracking-widest";

  const stateClasses = status === 'playing'
    ? "bg-white text-black"
    : status === 'loading'
      ? "bg-[#111] text-[#444] cursor-wait border border-white/5"
      : "bg-transparent text-[#888888] border border-white/10 hover:border-white/30 hover:text-white";

  const sizeClasses = compact
    ? "w-8 h-8 rounded-none"
    : "px-4 py-2 rounded-none text-[9px] space-x-2";

  return (
    <button
      onClick={handleToggle}
      disabled={status === 'loading'}
      className={`${baseClasses} ${stateClasses} ${sizeClasses}`}
      title={status === 'playing' ? "Halt Protocol" : "Execute Voice Protocol"}
    >
      {status === 'loading' ? (
        <div className="w-2 h-2 bg-white/20 animate-pulse"></div>
      ) : status === 'playing' ? (
        <div className="w-2 h-2 bg-black animate-ping"></div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      )}
      {!compact && <span>{status === 'playing' ? 'Stop' : label || 'Listen'}</span>}
    </button>
  );
};


export default VoiceButton;

