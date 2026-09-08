import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  AlertTriangle, 
  Sparkles, 
  Users, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  Layers,
  Clock,
  Compass,
  Zap
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
import { 
  TOP_SKILL_GAPS_DATA, 
  DISTRICT_SKILL_INTENSITY, 
  SECTOR_MISMATCH_DATA, 
  POLICY_REFORM_PACKAGES 
} from '../data/centralData';

export const SkillGapIntelligencePage: React.FC = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Identified Skill Gaps', value: '24 Competencies', sub: 'Cataloged from employer interviews', icon: BarChart3 },
    { label: 'Trainees Affected', value: '6,403 Unplaced', sub: '31.8% of certified candidate cohort', icon: Users },
    { label: 'Most Common Gap', value: 'Practical Machinery', sub: '28.4% of unplaced report lack of equipment access', icon: AlertTriangle },
    { label: 'Top Affected Sector', value: 'Industrial Mfg.', sub: '31.2% employer rejection in auto/capital goods', icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800">
              Root Cause Diagnostics
            </span>
            <span className="text-xs text-slate-400">Screen 7 • Diagnostic Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skill Gap Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Identifying WHY certified trainees are not getting employed. Isolating curriculum mismatches, lack of equipment hours, and regional employer requirements.
          </p>
        </div>

        <button
          onClick={() => navigate('/ai-insights')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-sm transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>View Prescriptive Actions</span>
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold text-slate-300">{kpi.label}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{kpi.value}</div>
              <div className="text-[11px] font-medium text-slate-400 mt-2">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Chart: Top Skill Gaps Preventing Employment (Horizontal Bar Chart) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">
              Top Skill Gaps Preventing Employment
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated from 6,403 employer interview feedback logs and post-exam audits
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500 rounded-xs" /> Critical Priority</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal-500 rounded-xs" /> High Priority</span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={TOP_SKILL_GAPS_DATA} 
              layout="vertical" 
              margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis 
                type="category" 
                dataKey="skillGap" 
                tick={{ fontSize: 11, fill: '#cbd5e1' }} 
                width={170} 
              />
              <Tooltip 
                formatter={(val: any, name: any, item: any) => [
                  `${Number(val).toLocaleString()} trainees (${item.payload.percentage}%)`,
                  item.payload.category
                ]}
                contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="affectedTrainees" radius={[0, 4, 4, 0]}>
                {TOP_SKILL_GAPS_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.priority === 'Critical' ? '#f59e0b' : '#14b8a6'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-400 text-center">
          Over 51.4% of placement failures stem from practical machine operation deficits and workplace communication barriers.
        </p>
      </div>

      {/* 4. Secondary Graphs: District Intensity & Training vs Demand Mismatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Graph B: Skill Gap Intensity by District */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Skill Gap Intensity by Key Industrial Districts
            </h2>
            <p className="text-xs text-slate-400">
              Percentage of certified candidates failing initial technical interview screenings
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_SKILL_INTENSITY} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis domain={[0, 70]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% intensity`,
                    `Top Gap: ${item.payload.topDeficit}`
                  ]}
                  contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="intensity" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Tribal and agrarian districts like Nandurbar report 64% intensity due to lack of heavy machine simulators.
          </p>
        </div>

        {/* Graph C: Training vs Industry Demand Mismatch */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Training Output vs. Industry Job Vacancies
            </h2>
            <p className="text-xs text-slate-400">
              Demonstrating structural oversupply in low-demand skills and shortage in technical trades
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTOR_MISMATCH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="sector" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  formatter={(val: any) => [Number(val).toLocaleString()]}
                  contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
                <Bar dataKey="traineesProduced" name="Trainees Produced" fill="#0284c7" radius={[3, 3, 0, 0]} />
                <Bar dataKey="industryVacancies" name="Industry Vacancies" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Critical under-supply in Healthcare and Auto Mechatronics, alongside massive over-supply in basic office data entry.
          </p>
        </div>
      </div>

      {/* 5. Priority Interventions Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Priority Policy Interventions
          </h2>
          <p className="text-xs text-slate-400">
            Actionable reform packages designed to bridge identified deficits before the next training cycle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {POLICY_REFORM_PACKAGES.map((interv) => (
            <div
              key={interv.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-5 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {interv.targetSector}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    interv.impactLevel === 'High Impact' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {interv.impactLevel}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm leading-snug">
                  {interv.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {interv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Timeline:</span>
                  <strong className="text-slate-200">{interv.timeline}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Expected Placement:</span>
                  <strong className="text-emerald-400 font-bold">{interv.expectedOutcome}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
