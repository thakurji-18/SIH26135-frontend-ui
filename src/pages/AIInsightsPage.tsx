import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { AI_INSIGHTS_DATA } from '../data/centralData';
import { AIInsightItem } from '../types';

export const AIInsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Predictive' | 'Diagnostic' | 'Prescriptive'>('All');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedGain, setSimulatedGain] = useState<number | null>(null);

  const filteredInsights = selectedCategory === 'All' 
    ? AI_INSIGHTS_DATA 
    : AI_INSIGHTS_DATA.filter(i => i.category === selectedCategory);

  // Intervention Impact Comparison Chart
  const impactComparisonData = [
    { intervention: 'Baseline (Current)', placementRate: 68.2, retentionRate: 74.8 },
    { intervention: '+30-Day Apprenticeship', placementRate: 81.5, retentionRate: 86.2 },
    { intervention: '+English Bridge Module', placementRate: 76.0, retentionRate: 79.4 },
    { intervention: '+Mobile Rural Simulators', placementRate: 74.2, retentionRate: 78.0 },
    { intervention: 'Combined Policy Package', placementRate: 85.8, retentionRate: 89.0 }
  ];

  // Risk Distribution Data
  const riskDistributionData = [
    { level: 'High Risk (>50% Drop-off)', percentage: 22.4, count: 5560, color: '#E11D48' },
    { level: 'Medium Risk (20-50% Drop-off)', percentage: 38.6, count: 9590, color: '#D97706' },
    { level: 'Low Risk (<20% Drop-off)', percentage: 39.0, count: 9710, color: '#0D9488' },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedGain(17.6);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Machine Learning Intelligence
            </span>
            <span className="text-xs text-slate-400">Screen 8 • Decision Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Insights &amp; Recommendations
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Data-driven intelligence to guide government skilling decisions, curriculum redesign, and targeted budget allocations.
          </p>
        </div>

        {/* Demo Tag */}
        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 shadow-sm shrink-0">
          Demo AI Insight Engine
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 bg-amber-950/60 rounded-xl border border-amber-800 text-xs text-amber-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Evaluation Model Notice:</strong> Demo AI Insight — Recommendations generated from simulated machine learning models for demonstration purposes during Smart India Hackathon 2026.
        </div>
      </div>

      {/* 2. Interactive Category Filter & Simulator Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1">Classification:</span>
          {(['All', 'Predictive', 'Diagnostic', 'Prescriptive'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isSimulating ? 'Simulating Interventions...' : 'Run Policy Impact Simulation'}</span>
        </button>
      </div>

      {/* Simulation Result Toast */}
      {simulatedGain !== null && (
        <div className="p-4 bg-emerald-950/80 rounded-xl border border-emerald-800 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-emerald-300">Policy Simulation Output:</strong> Enforcing the Combined Policy Package is projected to elevate statewide placement from <strong>68.2%</strong> to <strong>85.8% (+17.6% net placement lift)</strong> and generate ₹48.2 Cr in additional annual trainee wages.
            </span>
          </div>
          <button 
            onClick={() => setSimulatedGain(null)}
            className="text-xs text-emerald-400 hover:underline font-bold shrink-0 ml-3"
          >
            Reset
          </button>
        </div>
      )}

      {/* 3. Visual Charts Grid: Impact Comparison & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart A: Intervention Impact Comparison */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Projected Policy Intervention Impact
            </h2>
            <p className="text-xs text-slate-400">
              Comparative forecast of placement and retention under different state interventions
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="intervention" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`]}
                  contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px', color: '#cbd5e1' }} />
                <Bar dataKey="placementRate" name="Placement Rate (%)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="retentionRate" name="6-Mo Retention (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Trainee Risk Distribution */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Candidate Placement Risk Stratification
            </h2>
            <p className="text-xs text-slate-400">
              Categorizing candidate cohort by statistical vulnerability of remaining unplaced &gt;60 days
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {riskDistributionData.map((risk) => (
              <div key={risk.level} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{risk.level}</span>
                  <span className="font-mono font-bold text-white">{risk.percentage}% ({risk.count.toLocaleString()} candidates)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${risk.percentage}%`, backgroundColor: risk.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            High-risk candidates are concentrated in districts with no active industrial cluster agreements.
          </p>
        </div>
      </div>

      {/* 4. AI Insight Cards Feed */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Active Recommendations &amp; Strategic Actions
          </h2>
          <p className="text-xs text-slate-400">
            Synthesizing statewide outcome patterns into direct executive interventions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Demo AI Insight
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      insight.category === 'Predictive' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                      insight.category === 'Diagnostic' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {insight.category} Model
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Confidence: <strong className="text-white">{insight.confidenceLevel}%</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {insight.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-white block mb-0.5">Recommended Government Action:</span>
                  <span className="text-slate-300">{insight.recommendedAction}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Expected Outcome Impact:</span>
                  <span className="font-bold text-emerald-400">{insight.expectedLift || insight.supportingMetric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
