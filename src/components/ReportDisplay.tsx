import React from 'react';
import { ReportAnalysis, LabTest, Medicine } from '../types';
import VoiceButton from './VoiceButton';

interface ReportDisplayProps {
  analysis: ReportAnalysis;
  onReset: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-32 fade-in">
      {/* Overview Section */}
      <section className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Medical Summary</h2>
          </div>
          <VoiceButton text={analysis.summary} label="Read Summary" />
        </div>
        <div className="p-6">
          <p className="text-[#e5e5e5] text-lg leading-relaxed font-light">
            {analysis.summary}
          </p>
        </div>
      </section>

      {/* Clinical Observations / Notes */}
      {analysis.clinicalObservations && analysis.clinicalObservations.length > 0 && (
        <section className="glass-effect border border-white/20 bg-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Additional Observations</h3>
          <ul className="space-y-3">
            {analysis.clinicalObservations.map((obs, idx) => (
              <li key={idx} className="text-sm text-[#e5e5e5] flex items-start space-x-3 font-light">
                <span className="text-white mt-1.5">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lab Tests Table-like Layout */}
      {analysis.tests.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider pl-2">
            Detailed Test Results ({analysis.tests.length})
          </h2>
          <div className="glass-effect rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden">
            {analysis.tests.map((test, idx) => (
              <div key={idx} className="p-6 transition-colors hover:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-white text-lg mb-1">{test.name}</h3>
                    <p className="text-xs font-light text-[#888888]">Reference Range: {test.normalRange}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xs font-semibold text-[#888888] uppercase tracking-tight mb-1">Result</p>
                      <p className="text-xl font-bold text-white">{test.value}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-tight uppercase ${test.status === 'Normal' ? 'bg-white/20 text-white border border-white/30' :
                        test.status === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          test.status === 'Low' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-white/10 text-[#888888] border border-white/10'
                      }`}>
                      {test.status}
                    </div>
                  </div>
                </div>
                <div className="glass-effect border border-white/10 rounded-xl px-4 py-4 flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <VoiceButton text={`${test.name}. ${test.explanation}`} compact />
                  </div>
                  <p className="text-[#e5e5e5] text-sm leading-relaxed font-light">
                    {test.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Medicines Section */}
      {analysis.medicines.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider pl-2">Medications Found</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {analysis.medicines.map((med, idx) => (
              <div key={idx} className="glass-effect border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/30 transition-all">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-white text-lg">{med.name}</h3>
                    <VoiceButton text={`${med.name}. ${med.generalPurpose}. ${med.howItWorks}`} compact />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase mb-2">General Purpose</h4>
                      <p className="text-sm text-[#e5e5e5] font-light leading-relaxed">{med.generalPurpose}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase mb-2">How It Works</h4>
                      <p className="text-sm text-[#e5e5e5] font-light leading-relaxed">{med.howItWorks}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 glass-effect border-t border-white/10 flex justify-center z-40 backdrop-blur-md">
        <button
          onClick={onReset}
          className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>Analyze New Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
