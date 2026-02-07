import React from 'react';
import { ReportAnalysis, LabTest, Medicine } from '../types';
import VoiceButton from './VoiceButton';

interface ReportDisplayProps {
  analysis: ReportAnalysis;
  onReset: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-48 fade-in">
      {/* Overview Section */}
      <section className="border border-white/5 bg-white/[0.01] hover:border-cyan-500/10 transition-colors">
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border border-cyan-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-400 dot-pulse"></div>
            </div>
            <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Summary</h2>
          </div>
          <VoiceButton text={analysis.summary} label="Listen to Summary" />
        </div>
        <div className="p-8">
          <p className="text-white text-xl leading-relaxed font-light italic">
            "{analysis.summary}"
          </p>
        </div>
      </section>

      {/* Clinical Observations */}
      {analysis.clinicalObservations && analysis.clinicalObservations.length > 0 && (
        <section className="border border-white/5 p-8 space-y-6 bg-white/[0.01]">
          <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em]">Important Notes</h3>
          <ul className="space-y-4">
            {analysis.clinicalObservations.map((obs, idx) => (
              <li key={idx} className="text-sm text-[#e5e5e5] flex items-start space-x-4 group">
                <span className="text-cyan-500/30 font-mono text-[10px] pt-1 group-hover:text-cyan-400 transition-colors">[{idx + 1}]</span>
                <span className="leading-relaxed">{obs}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lab Tests */}
      {analysis.tests.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] px-1">
            Test Results ({analysis.tests.length})
          </h2>
          <div className="border-y border-white/5 divide-y divide-white/5">
            {analysis.tests.map((test, idx) => (
              <div key={idx} className="py-12 first:pt-0 group hover-lift">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                  <div className="space-y-2">
                    <div className="text-[10px] text-cyan-500/20 font-mono tracking-widest lowercase">ref_{idx}</div>
                    <h3 className="font-bold text-white text-3xl uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{test.name}</h3>
                    <p className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Normal Range: {test.normalRange}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[10px] font-bold text-[#888888] uppercase tracking-widest">Your Result</span>
                      <span className="text-4xl font-bold text-white tracking-tighter">{test.value}</span>
                    </div>
                    <div className={`px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all ${test.status === 'Normal' ? 'border-green-500/20 text-green-400 bg-green-500/5' :
                      test.status === 'High' ? 'border-red-500/40 text-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                        test.status === 'Low' ? 'border-amber-500/40 text-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)]' :
                          'border-white/5 text-[#444]'
                      }`}>
                      {test.status}
                    </div>
                  </div>
                </div>
                <div className="border-l border-cyan-500/10 pl-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <VoiceButton text={`${test.name}. ${test.explanation}`} compact />
                    </div>
                    <p className="text-[#888888] text-sm leading-relaxed italic max-w-2xl">
                      {test.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Medicines */}
      {analysis.medicines.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] px-1">Prescribed Medications</h2>
          <div className="grid md:grid-cols-2 gap-4 px-1">
            {analysis.medicines.map((med, idx) => (
              <div key={idx} className="border border-white/10 p-10 hover:border-cyan-500/20 transition-all relative group bg-white/[0.01]">
                <div className="absolute top-4 right-4 text-[10px] text-cyan-500/10 font-mono group-hover:text-cyan-500/30 transition-colors">DRUG_0{idx}</div>
                <div className="space-y-8">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white text-2xl uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{med.name}</h3>
                    <VoiceButton text={`${med.name}. ${med.generalPurpose}. ${med.howItWorks}`} compact />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Purpose</h4>
                      <p className="text-sm text-[#e5e5e5] font-light leading-relaxed">{med.generalPurpose}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-[#444] uppercase tracking-widest">How it works</h4>
                      <p className="text-sm text-[#888888] italic leading-relaxed">{med.howItWorks}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-8 border-t border-white/5 flex justify-center z-40 bg-[#050505]/80 backdrop-blur-xl">
        <button
          onClick={onReset}
          className="accent-button bg-cyan-500 text-black px-12 py-5 rounded-sm font-bold text-sm uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          Analyze Another Report
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
