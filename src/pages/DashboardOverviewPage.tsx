import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  ChevronRight,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  Cell
} from 'recharts';
import { 
  CORE_OUTCOMES_METRICS, 
  FUNNEL_STAGES, 
  MONTHLY_EMPLOYMENT_TREND, 
  TOP_SKILL_GAPS_DATA, 
  TRAINING_PROGRAMS_DATA 
} from '../data/centralData';

export const DashboardOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const kpis = [
    {
      id: 'kpi-total',
      label: 'Total Trainees',
      value: CORE_OUTCOMES_METRICS.totalTrainees.toLocaleString(),
      subtext: 'Admitted into state skilling programs',
      icon: Users,
      trend: '+12.4% YoY',
      color: 'slate'
    },
    {
      id: 'kpi-completion',
      label: 'Training Completion Rate',
      value: `${CORE_OUTCOMES_METRICS.completionRate}%`,
      subtext: '21,728 candidates finished coursework',
      icon: Award,
      trend: '87.4% completion benchmark',
      color: 'teal'
    },
    {
      id: 'kpi-employment',
      label: 'Employment Rate',
      value: `${CORE_OUTCOMES_METRICS.employmentRate}%`,
      subtext: '13,733 placed (wage + self-employed)',
      icon: TrendingUp,
      trend: 'Target: 68.0% (Exceeded)',
      color: 'emerald'
    },
    {
      id: 'kpi-time',
      label: 'Avg. Time to Employment',
      value: `${CORE_OUTCOMES_METRICS.averageTimeToEmploymentDays} Days`,
      subtext: 'From certification to job placement',
      icon: Clock,
      trend: '-8 days vs prior cohort',
      color: 'amber'
    },
    {
      id: 'kpi-retention',
      label: '6-Month Retention Rate',
      value: `${CORE_OUTCOMES_METRICS.retentionRate6Month}%`,
      subtext: '10,272 active workforce continuity',
      icon: ShieldCheck,
      trend: 'EPFO verified continuity',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Executive Overview
            </span>
            <span className="text-xs text-slate-400">SIH 2026 Presentation Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skilling Outcomes Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Track the journey from training to sustainable employment. Government can now see not only WHO received training, but WHO got employed, WHO did not, WHY they did not, and WHAT action should be taken.
          </p>
        </div>

        {/* Action Button: Explore Maharashtra Map */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-sm transition-all"
          >
            <MapPin className="w-4 h-4 text-emerald-200" />
            <span>View 36-District Map</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold text-slate-400">{kpi.label}</span>
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-white tracking-tight">
                  {kpi.value}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 text-right -mt-4">
        *Illustrative demo values calibrated for Smart India Hackathon 2026.
      </div>

      {/* 3. MAIN GRAPH: Training-to-Employment Funnel */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Core Milestone Pipeline
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                Monotonically Decreasing
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Training-to-Employment Funnel
            </h2>
            <p className="text-xs text-slate-400">
              Measuring candidate progression, conversion rates, and leakages at every milestone.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            Overall Funnel Retention: <strong className="text-emerald-400 font-bold">41.3% of Enrolled</strong>
          </div>
        </div>

        {/* Funnel Visual Bars */}
        <div className="space-y-3.5 pt-2">
          {FUNNEL_STAGES.map((stage, index) => {
            const widthPercent = (stage.count / FUNNEL_STAGES[0].count) * 100;
            const barColors = [
              'bg-slate-700',
              'bg-teal-700',
              'bg-teal-600',
              'bg-emerald-600',
              'bg-emerald-500'
            ];
            return (
              <div key={stage.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] border border-slate-700">
                      {index + 1}
                    </span>
                    <strong className="text-slate-100">{stage.stage}</strong>
                    <span className="text-slate-400 hidden sm:inline">• {stage.stageDescription}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="font-bold text-slate-100">{stage.count.toLocaleString()}</span>
                    <span className="text-emerald-400 font-semibold w-14 text-right">
                      {stage.conversionPercent}%
                    </span>
                    {stage.dropOffPercent > 0 ? (
                      <span className="text-rose-400 text-[11px] w-20 text-right font-medium">
                        -{stage.dropOffPercent}% drop
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px] w-20 text-right">Baseline</span>
                    )}
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-6 w-full bg-slate-950 rounded-lg overflow-hidden flex items-center p-0.5 border border-slate-800">
                  <div
                    style={{ width: `${Math.max(6, widthPercent)}%` }}
                    className={`h-full rounded-md ${barColors[index]} transition-all duration-500 flex items-center justify-end pr-2 text-white text-[10px] font-bold`}
                  >
                    {widthPercent > 18 && `${Math.round(widthPercent)}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Key Finding:</strong> 31.8% of certified youth fail to secure initial placement due to practical equipment deficits and language hesitation.
            </span>
          </div>
          <button
            onClick={() => navigate('/employment-outcomes')}
            className="text-emerald-400 font-bold hover:underline shrink-0 text-xs flex items-center gap-1"
          >
            <span>Deep Dive</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Secondary Graphs: Trends & Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Graph A: Employment Outcomes Trend (Line Chart) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Employment Outcomes Trend
              </h2>
              <p className="text-xs text-slate-400">
                Monthly verified placement conversion over the last 6 months
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              61.4% → 68.2% (+6.8%)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_EMPLOYMENT_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} stroke="#334155" />
                <YAxis domain={[55, 75]} tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" stroke="#334155" />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, 'Employment Rate']}
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: '#94A3B8' }} />
                <Line 
                  type="monotone" 
                  dataKey="employmentRate" 
                  name="Verified Employment Rate" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10B981' }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="State Policy Target" 
                  stroke="#64748B" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Employment trajectory sustained upward momentum following industry-partnered Rozgar Melas in Q4.
          </p>
        </div>

        {/* Graph B: Skill Gap Distribution (Horizontal Bar Chart) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Skill Gap Distribution
              </h2>
              <p className="text-xs text-slate-400">
                Top identified deficits preventing non-placed certified youth from job offers
              </p>
            </div>
            <button
              onClick={() => navigate('/skill-gaps')}
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Gaps</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={TOP_SKILL_GAPS_DATA.slice(0, 5)} 
                layout="vertical" 
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1E293B" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} stroke="#334155" />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  tick={{ fontSize: 11, fill: '#CBD5E1' }} 
                  width={110} 
                  stroke="#334155"
                />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${val.toLocaleString()} trainees (${item.payload.percentage}%)`, 
                    item.payload.skillGap
                  ]}
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="affectedTrainees" radius={[0, 4, 4, 0]}>
                  {TOP_SKILL_GAPS_DATA.slice(0, 5).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.priority === 'Critical' ? '#F97316' : '#14B8A6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Communication and practical hands-on machine exposure represent over 51% of all reported deficits.
          </p>
        </div>
      </div>

      {/* 5. Professional Table: Training Program Performance */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              Training Program Performance Benchmark
            </h2>
            <p className="text-xs text-slate-400">
              Comparative analysis of state skilling courses: Enrolment, completion, employment conversion, and retention
            </p>
          </div>
          <button
            onClick={() => navigate('/training-programs')}
            className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Program Name</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4 text-right">Trainees</th>
                <th className="py-3 px-4 text-right">Completion Rate</th>
                <th className="py-3 px-4 text-right">Employment Rate</th>
                <th className="py-3 px-4 text-right">6-Mo. Retention</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {TRAINING_PROGRAMS_DATA.slice(0, 5).map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{prog.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{prog.code} • {prog.provider}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {prog.sector}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-white">
                    {prog.totalEnrolled.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {prog.completionRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    {prog.employmentRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {prog.retentionRate}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      prog.performanceStatus === 'High Performing'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : prog.performanceStatus === 'On Track'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {prog.performanceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. AI Insight Panel */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md border border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Demo AI Insight
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Confidence Score: 94%
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          Employer Apprenticeship Mandate for Capital Goods &amp; Automotive Corridors
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Automated regression analysis identifies that cohorts undergoing 60+ days of on-site industrial internship exhibit an <strong>83.4% employment rate</strong>, compared to <strong>52.0%</strong> for purely classroom-based cohorts. Recommending expansion of dual certification with ASDC across Pune, Nashik, and Chhatrapati Sambhajinagar industrial clusters.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => navigate('/ai-insights')}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Review All AI Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
