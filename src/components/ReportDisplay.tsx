import React from 'react';
import { ReportAnalysis, LabTest, Medicine } from '../types';
import VoiceButton from './VoiceButton';

interface ReportDisplayProps {
  analysis: ReportAnalysis;
  onReset: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 fade-in">
      {/* Summary Section */}
      <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-white tracking-wide">Report Summary</h2>
          </div>
          <VoiceButton text={analysis.summary} label="Listen" />
        </div>
        <div className="p-6 md:p-8">
          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
            {analysis.summary}
          </p>
        </div>
      </section>

      {/* Clinical Observations */}
      {analysis.clinicalObservations && analysis.clinicalObservations.length > 0 && (
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-sm font-medium uppercase tracking-wider">Key Observations</h3>
          </div>
          <ul className="space-y-4">
            {analysis.clinicalObservations.map((obs, idx) => (
              <li key={idx} className="flex gap-4 text-gray-300 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-2 shrink-0"></span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lab Tests */}
      {analysis.tests.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-semibold text-white">Test Results</h2>
            <span className="text-sm text-gray-500">{analysis.tests.length} tests analyzed</span>
          </div>

          <div className="space-y-4">
            {analysis.tests.map((test, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{test.name}</h3>
                    <p className="text-sm text-gray-500">Normal Range: {test.normalRange}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white tracking-tight">{test.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Result</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${test.status === 'Normal' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      test.status === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        test.status === 'Low' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                      {test.status}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-4 mt-4">
                  <div className="shrink-0 mt-0.5">
                    <VoiceButton text={`${test.name}. ${test.explanation}`} compact />
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    {test.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Medicines */}
      {analysis.medicines.length > 0 && (
        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-white px-2">Medications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {analysis.medicines.map((med, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">{med.name}</h3>
                  </div>
                  <VoiceButton text={`${med.name}. ${med.generalPurpose}. ${med.howItWorks}`} compact />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Purpose</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{med.generalPurpose}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">How it works</h4>
                    <p className="text-sm text-gray-400 italic leading-relaxed">{med.howItWorks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 border-t border-white/10 bg-[#050505]/90 backdrop-blur-xl z-50 flex justify-center">
        <button
          onClick={onReset}
          className="bg-cyan-500 text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 flex items-center space-x-2 w-full md:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Analyze New Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
