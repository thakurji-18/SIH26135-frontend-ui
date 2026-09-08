import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Layers, 
  X, 
  CheckCircle2, 
  Download,
  Building2,
  Users,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  TRAINING_PROGRAMS_DATA 
} from '../data/centralData';
import { TrainingProgramItem } from '../types';

export const TrainingProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgramItem | null>(null);

  // Grouped Bar Chart Data
  const groupedChartData = TRAINING_PROGRAMS_DATA.map(p => ({
    name: p.name.length > 20 ? p.name.substring(0, 18) + '...' : p.name,
    fullName: p.name,
    completionRate: p.completionRate,
    employmentRate: p.employmentRate,
    retentionRate: p.retentionRate
  }));

  // 6-month trend for top 3 programs
  const trendData = [
    { month: 'Oct 2025', Healthcare: 78, CNC: 70, Solar: 62 },
    { month: 'Nov 2025', Healthcare: 80, CNC: 72, Solar: 65 },
    { month: 'Dec 2025', Healthcare: 81, CNC: 73, Solar: 68 },
    { month: 'Jan 2026', Healthcare: 83, CNC: 74, Solar: 70 },
    { month: 'Feb 2026', Healthcare: 84, CNC: 76, Solar: 71 },
    { month: 'Mar 2026', Healthcare: 84.6, CNC: 76.5, Solar: 72.0 }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
              Curriculum &amp; Provider Benchmarks
            </span>
            <span className="text-xs text-slate-400">Screen 4 • Program Impact</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Training Program Performance
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Evaluate which skilling courses deliver real employment outcomes versus courses with high certification but low employer absorption.
          </p>
        </div>

        <div className="text-xs font-semibold px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 shadow-sm">
          Active Evaluated Sectors: <strong className="text-white">Automotive, Healthcare, IT, Green Energy, Agri</strong>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-400">Total Active Programs</div>
          <div className="text-2xl font-extrabold text-white mt-1">8 Statewide</div>
          <div className="text-[11px] text-slate-400 mt-2">Covering 24,860 enrolled candidates</div>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-emerald-800/80 shadow-sm">
          <div className="text-xs font-semibold text-emerald-400">Highest Employing Program</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">84.6% Placement</div>
          <div className="text-[11px] text-emerald-300 mt-2 font-medium">Healthcare &amp; Patient Care Assistant</div>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-rose-900/80 shadow-sm">
          <div className="text-xs font-semibold text-rose-400">Lowest Employing Program</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">40.8% Placement</div>
          <div className="text-[11px] text-rose-300 mt-2 font-medium">Precision Agriculture &amp; Drone Spraying</div>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-400">Average 6-Month Retention</div>
          <div className="text-2xl font-extrabold text-white mt-1">74.8% Retained</div>
          <div className="text-[11px] text-slate-400 mt-2">Longitudinal EPFO UAN Active Checks</div>
        </div>
      </div>

      {/* 3. MAIN GRAPH: Program Outcome Comparison (Grouped Bar Chart) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">
              Program Outcome Comparison
            </h2>
            <p className="text-xs text-slate-400">
              Visualizing the gap: Training Completion vs. Verified Employment vs. 6-Month Retention
            </p>
          </div>
          <div className="text-xs text-slate-300 flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-600 rounded-xs" /> Completion</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal-500 rounded-xs" /> Employment</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-400 rounded-xs" /> Retention</span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#94a3b8' }} 
                angle={-15} 
                textAnchor="end" 
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
              <Tooltip 
                formatter={(value: any, name: any) => [`${value}%`, name]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#475569" radius={[3, 3, 0, 0]} />
              <Bar dataKey="employmentRate" name="Employment Rate (%)" fill="#14b8a6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="retentionRate" name="6-Month Retention (%)" fill="#34d399" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-800 text-xs text-amber-200 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Policy Alert:</strong> Data Entry &amp; Office Management exhibits a <strong>92.8% completion rate</strong>, but only <strong>51.2% employment conversion</strong> due to market saturation and lack of advanced spreadsheet skills.
          </span>
        </div>
      </div>

      {/* 4. Secondary Graph: Program Employment Trend Over Time */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Program Employment Trajectory Over Time
          </h2>
          <p className="text-xs text-slate-400">
            6-month employment trajectory for Top-3 industry demand courses
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
              <Tooltip 
                formatter={(val: any) => [`${val}%`]}
                contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: '#cbd5e1' }} />
              <Line type="monotone" dataKey="Healthcare" name="Healthcare & Patient Care" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="CNC" name="CNC Machinist & Automation" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Solar" name="Solar PV Installation" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Professional Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              State Skilling Course Inventory
            </h2>
            <p className="text-xs text-slate-400">
              Click "View Details" to open program diagnostic scorecard
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Program Name</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Training Provider</th>
                <th className="py-3 px-4 text-right">Enrolled</th>
                <th className="py-3 px-4 text-right">Certified</th>
                <th className="py-3 px-4 text-right">Employed</th>
                <th className="py-3 px-4 text-right">Retention</th>
                <th className="py-3 px-4 text-right">Avg Salary</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {TRAINING_PROGRAMS_DATA.map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{prog.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{prog.code}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-300">{prog.sector}</td>
                  <td className="py-3.5 px-4 text-slate-400">{prog.provider}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-200">{prog.totalEnrolled.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">{prog.certified.toLocaleString()} ({prog.completionRate}%)</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{prog.employed.toLocaleString()} ({prog.employmentRate}%)</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">{prog.retentionRate}%</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">{prog.avgTimeToEmploymentDays} Days</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold transition-colors text-[11px] border border-slate-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-800 space-y-5 text-slate-300">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {selectedProgram.sector} Sector
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedProgram.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Code: {selectedProgram.code} • Center: {selectedProgram.provider}
                </div>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Enrolled</div>
                <div className="text-lg font-bold text-white mt-0.5">{selectedProgram.totalEnrolled.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Completion</div>
                <div className="text-lg font-bold text-white mt-0.5">{selectedProgram.completionRate}%</div>
              </div>
              <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-800">
                <div className="text-[10px] uppercase font-bold text-emerald-300">Employment</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{selectedProgram.employmentRate}%</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">6-Mo Retention</div>
                <div className="text-lg font-bold text-white mt-0.5">{selectedProgram.retentionRate}%</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white">Key Curriculum Deficit &amp; Action:</div>
              <p className="p-3 bg-slate-950 rounded-xl border border-slate-800 leading-relaxed text-slate-300">
                {selectedProgram.topSkillGap}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Benchmark Avg. Salary: <strong className="text-emerald-400">{selectedProgram.avgSalary}</strong></span>
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 transition-colors"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
