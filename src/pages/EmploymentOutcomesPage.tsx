import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Award, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Building2, 
  UserCheck, 
  PhoneCall, 
  Filter
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
  CORE_OUTCOMES_METRICS, 
  EMPLOYMENT_DISTRIBUTION_STACKED, 
  TIME_TO_EMPLOYMENT_DATA, 
  ALL_TRAINEES_DATA 
} from '../data/centralData';

export const EmploymentOutcomesPage: React.FC = () => {
  const navigate = useNavigate();
  const [counselorNotification, setCounselorNotification] = useState<string | null>(null);

  // Employed trainees table records
  const verifiedPlacements = ALL_TRAINEES_DATA.filter(t => t.employmentStatus === 'Employed' || t.employmentStatus === 'Self-Employed');

  // Trainees requiring attention (>60 days unplaced)
  const traineesRequiringAttention = ALL_TRAINEES_DATA.filter(t => 
    t.employmentStatus === 'Seeking Employment' || t.employmentStatus === 'Not Reported'
  ).slice(0, 5);

  const kpis = [
    { label: 'Certified Trainees', value: CORE_OUTCOMES_METRICS.certifiedTrainees.toLocaleString(), sub: '81.0% Certification Rate', icon: Award },
    { label: 'Employed Trainees', value: CORE_OUTCOMES_METRICS.totalPlacedTrainees.toLocaleString(), sub: '68.2% Placement Rate', icon: Briefcase },
    { label: 'Seeking / Unplaced', value: CORE_OUTCOMES_METRICS.seekingEmploymentTrainees.toLocaleString(), sub: '22.0% of Certified', icon: AlertTriangle },
    { label: 'Average Wage', value: '₹17,800 / mo', sub: 'Across 8 Core Sectors', icon: DollarSign },
    { label: '6-Month Retention', value: `${CORE_OUTCOMES_METRICS.retentionRate6Month}%`, sub: 'EPFO UAN Verified Continuity', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header & Core Message Banner */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
              Outcome Verification
            </span>
            <span className="text-xs text-slate-400">Screen 5 • Post-Skilling Ground Truth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Employment Outcomes
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Beyond certification — measuring real, verified employment impact, wage distribution, and post-placement job continuity.
          </p>
        </div>

        {/* CORE MESSAGE BANNER: "Certified ≠ Employed" */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              State Skilling Paradigm Shift
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Certified ≠ Employed
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "A certificate is a milestone. Sustainable employment is the outcome." This platform transitions administration from tracking training seats to enforcing verified livelihood continuity.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end justify-center shrink-0 border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-6 text-xs">
            <span className="text-slate-400">State Verification Engine:</span>
            <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
              EPFO Electronic Challan Link
            </span>
          </div>
        </div>
      </div>

      {/* Counselor trigger feedback if active */}
      {counselorNotification && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs rounded-xl flex items-center justify-between">
          <span>{counselorNotification}</span>
          <button onClick={() => setCounselorNotification(null)} className="text-slate-400 hover:text-white font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* 3. Main Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Graph A: Stacked Employment Distribution */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Employment Outcome Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Direct classification of 20,136 certified candidates
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EMPLOYMENT_DISTRIBUTION_STACKED} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis domain={[0, 14000]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${Number(val).toLocaleString()} trainees (${item.payload.percentage}%)`,
                    'Count'
                  ]}
                  contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {EMPLOYMENT_DISTRIBUTION_STACKED.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 ? '#10b981' :
                        index === 1 ? '#06b6d4' :
                        index === 2 ? '#f59e0b' : '#f43f5e'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Wage Employment</span>
              <div className="font-extrabold text-white">11,518 (57.2%)</div>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Self / Micro-Enterprise</span>
              <div className="font-extrabold text-teal-400">2,215 (11.0%)</div>
            </div>
          </div>
        </div>

        {/* Graph B: Time to Employment */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Time to Placement Post-Certification
            </h2>
            <p className="text-xs text-slate-400">
              Days elapsed between certificate issue and first verifiable wage receipt
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TIME_TO_EMPLOYMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis domain={[0, 50]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% (${item.payload.trainees.toLocaleString()} trainees)`,
                    'Percentage'
                  ]}
                  contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>Average statewide time-to-hire: <strong className="text-white">42 Days</strong></span>
            <span className="text-emerald-400 font-bold">75.8% Placed within 60 Days</span>
          </div>
        </div>
      </div>

      {/* 4. Table: Recent Verified Employment Outcomes */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Recent Verified Employment Outcomes
            </h2>
            <p className="text-xs text-slate-400">
              Sample records validated via EPFO active UAN contribution receipts
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Trainee</th>
                <th className="py-3 px-4">Training Program</th>
                <th className="py-3 px-4">Employer</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Monthly Salary</th>
                <th className="py-3 px-4">Verification Method</th>
                <th className="py-3 px-4 text-center">6-Mo Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {verifiedPlacements.slice(0, 6).map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{t.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{t.id} • {t.district}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-300">{t.trainingProgram}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-200">{t.employerName || t.businessType || 'State Partner'}</td>
                  <td className="py-3.5 px-4 text-slate-300">{t.jobRole || 'Technician'}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{t.salaryRange || (t.monthlySalary ? `₹${t.monthlySalary.toLocaleString()}` : '₹18,500')}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {t.timeline?.find(tl => tl.verifiedBy)?.verifiedBy || 'EPFO Electronic Challan'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {t.employmentStatus === 'Employed' ? 'Retained' : 'Monitoring'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. "Requires Attention" Section */}
      <div className="bg-slate-900 rounded-2xl border border-rose-900/60 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Action Required: Certified Candidates Unplaced &gt;60 Days
              </h2>
              <p className="text-xs text-slate-400">
                Candidates requiring immediate District Skill Officer counseling, bridging course, or placement mela intervention
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800">
            {CORE_OUTCOMES_METRICS.seekingEmploymentTrainees.toLocaleString()} Total State Pool
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {traineesRequiringAttention.map((trainee) => (
            <div 
              key={trainee.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-white font-bold">{trainee.name}</strong>
                  <span className="font-mono text-slate-400">({trainee.id})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                    Unplaced 75 Days
                  </span>
                </div>
                <div className="text-slate-300">
                  Course: {trainee.trainingProgram} • District: {trainee.district}
                </div>
                <div className="text-slate-400 text-[11px]">
                  <strong className="text-slate-300">Primary Block:</strong> {trainee.identifiedSkillGaps?.[0] || 'Technical interview soft-skill communication barrier'}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate(`/trainees/${trainee.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
                >
                  View Trainee
                </button>
                <button
                  onClick={() => setCounselorNotification(`SMS counseling invitation sent to ${trainee.name} for upcoming District Rozgar Mela.`)}
                  className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-bold transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Assign Counselor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
