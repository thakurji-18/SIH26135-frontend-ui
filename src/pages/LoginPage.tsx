import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Users, 
  Sparkles, 
  BarChart3,
  Award,
  ExternalLink
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('State Director');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'State Director',
      title: 'State Skill Development Directorate',
      badge: 'Executive Level',
      desc: 'Full access to statewide skilling funnel, district comparisons, policy simulator, and longitudinal retention.'
    },
    {
      id: 'District Skill Officer',
      title: 'District Skill Development Officer (DSDO)',
      badge: 'District Level',
      desc: 'Track local training providers, candidate follow-up compliance, and Kaushalya Rozgar Mela outcomes.'
    },
    {
      id: 'Policy & AI Analyst',
      title: 'State Policy & Outcome Intelligence Unit',
      badge: 'Intelligence Unit',
      desc: 'Access predictive drop-off models, diagnostic skill gap correlation, and curriculum revision roadmaps.'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('sih_demo_user', JSON.stringify({
        role: selectedRole,
        loggedAt: new Date().toISOString()
      }));
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-emerald-900 selection:text-emerald-200 font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-black border border-slate-800 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Smart India Hackathon 2026
              </div>
              <div className="text-base font-extrabold text-white">
                THE BUG SLAYERS
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Government Decision-Intelligence Demo
          </div>
        </div>
      </header>

      {/* Main Login Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Problem Statement ID: SIH-2026
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Skilling Outcomes &amp; Employment Intelligence
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                "Difficulties in tracking employment outcomes, skill gaps, and the impact of skilling initiatives."
              </p>
            </div>

            {/* Core Value Proposition Card */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core System Objective
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Government can now see not only <strong>WHO</strong> received training, but <strong>WHO</strong> got employed, <strong>WHO</strong> did not, <strong>WHY</strong> they did not, and <strong>WHAT</strong> action should be taken.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Wage EPFO Links</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>36 Districts Choropleth</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>6-Month Retention Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prescriptive AI Interventions</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Presented for Smart India Hackathon 2026 by:</span>
              <strong className="text-white">Team: THE BUG SLAYERS</strong>
            </div>
          </div>

          {/* Right Role-Based Login Card */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Access Outcomes Portal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your demonstration credentials to enter the interactive suite.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Select Administrative Role
                </label>
                <div className="space-y-2">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedRole === r.id
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-xs'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{r.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                        {r.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:gap-3"
              >
                {loading ? (
                  <span>Authorizing Session...</span>
                ) : (
                  <>
                    <span>Enter Government Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-center">
              1-Click Demo Evaluation Mode • No external credentials required for Hackathon Jury.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 py-4 px-6 text-center text-xs text-slate-400">
        Team: <strong className="text-white">THE BUG SLAYERS</strong> • Smart India Hackathon 2026 Presentation Model
      </footer>
    </div>
  );
};
