import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Sparkles, 
  FileText, 
  User,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { ALL_TRAINEES_DATA } from '../data/centralData';

export const TraineeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Look up candidate or default to first record
  const trainee = ALL_TRAINEES_DATA.find((t) => t.id === id) || ALL_TRAINEES_DATA[0];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/trainees')}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Trainees</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          UAN / Aadhaar Vault Linked
        </span>
      </div>

      {/* Trainee Header Card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-emerald-400 font-black text-xl flex items-center justify-center shadow-md border border-slate-700">
              {trainee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">
                  {trainee.name}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  trainee.employmentStatus === 'Employed'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : trainee.employmentStatus === 'Self-Employed'
                    ? 'bg-teal-950 text-teal-300 border border-teal-800'
                    : trainee.employmentStatus === 'Seeking Employment'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {trainee.employmentStatus}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-2">
                <span>ID: <strong className="text-white">{trainee.id}</strong></span>
                <span>•</span>
                <span>Cert: <strong className="text-white">{trainee.id.replace('TRN', 'CERT')}-MSDE</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {trainee.district}, Maharashtra
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Current Monthly Wage</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono">
                {trainee.salaryRange || (trainee.monthlySalary ? `₹${trainee.monthlySalary.toLocaleString()}` : 'Unpaid / Seeking')}
              </div>
            </div>
          </div>
        </div>

        {/* Course metadata bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Training Program</span>
            <strong className="text-slate-200 font-semibold">{trainee.trainingProgram}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Training Center / Provider</span>
            <strong className="text-slate-200 font-semibold">Government ITI &amp; Partner Skill Hub</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Enrollment &amp; Completion</span>
            <strong className="text-slate-200 font-semibold">{trainee.enrolmentDate} → {trainee.completionDate}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Verification Source</span>
            <strong className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {trainee.timeline?.[4]?.verifiedBy || 'EPFO Digital UAN'}
            </strong>
          </div>
        </div>
      </div>

      {/* Main Trainee Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Vertical Timeline */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">
              Complete Training-to-Employment Trajectory
            </h2>
            <p className="text-xs text-slate-400">
              Verified longitudinal milestones logged in Maharashtra Skilling Ledger
            </p>
          </div>

          {/* Vertical Milestone Flow */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {trainee.timeline.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Milestone Node */}
                <div className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  idx === trainee.timeline.length - 1
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}>
                  {idx + 1}
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">
                      {step.stage}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {step.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Outcome & AI Career Analysis */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Employment Outcome Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Outcome Status
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Verified Placement
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Employer Organization</span>
                <span className="font-bold text-white text-sm">{trainee.employerName || trainee.businessType || 'Tata Motors Passenger Vehicles Ltd'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Designated Job Role</span>
                <span className="font-semibold text-slate-200">{trainee.jobRole || 'EV Battery Diagnostic Specialist'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px]">Employment Type</span>
                  <span className="font-medium text-slate-300">Full-time Regular</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">6-Month Retention</span>
                  <span className="font-bold text-emerald-400">
                    {trainee.employmentStatus === 'Employed' ? 'Retained (Active)' : 'Under Monitoring'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/80 text-emerald-200 text-[11px] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Outcome cross-referenced via EPFO Electronic Challan and DGET Kaushalya Portal.
                </span>
              </div>
            </div>
          </div>

          {/* AI Skill Gap & Career Path Analysis */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Demo AI Skill Gap Analysis
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Model: SkillPredict-v2</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <div className="text-[11px] text-slate-400">Recommended Next Skill Upgrade</div>
                <div className="font-bold text-white text-sm mt-0.5">
                  5-Axis CNC Programming &amp; CAD Integration
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400">Estimated Wage Growth Potential</div>
                <div className="font-semibold text-emerald-400 mt-0.5">
                  +35% to 45% (₹24,500 - ₹26,000/mo) within 18 months
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-300 pt-1 border-t border-slate-700/80">
                Candidate demonstrated high tool dexterity in training. Supplementing with Siemens NX CAD will transition candidate from Machine Operator to Automation Technician.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up History Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Post-Training Follow-Up Audit Log
          </h2>
          <p className="text-xs text-slate-400">
            Mandatory 30-day, 90-day, and 180-day telephonic and employer touchpoints
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-y border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact Date</th>
                <th className="py-3 px-4">Employment Status</th>
                <th className="py-3 px-4">Designated Job Role</th>
                <th className="py-3 px-4">Wage / Salary Range</th>
                <th className="py-3 px-4">Verification Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {trainee.followUpHistory.map((fu, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-white">{fu.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {fu.employmentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-200">{fu.jobRole}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">{fu.salaryRange}</td>
                  <td className="py-3 px-4 text-slate-400">{fu.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
