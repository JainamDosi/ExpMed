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
    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
    : status === 'loading'
      ? "bg-white/10 text-gray-400 cursor-wait"
      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white";

  const sizeClasses = compact
    ? "w-8 h-8 rounded-full"
    : "px-4 py-2 rounded-full text-xs space-x-2";

  return (
    <button
      onClick={handleToggle}
      disabled={status === 'loading'}
      className={`${baseClasses} ${stateClasses} ${sizeClasses}`}
      title={status === 'playing' ? "Stop" : "Listen"}
    >
      {status === 'loading' ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : status === 'playing' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      )}
      {!compact && <span>{status === 'playing' ? 'Stop' : label || 'Listen'}</span>}
    </button>
  );
};


export default VoiceButton;

