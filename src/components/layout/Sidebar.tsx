import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Map, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Award
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/trainees', label: 'Trainees', icon: Users },
    { to: '/training-programs', label: 'Training Programs', icon: GraduationCap },
    { to: '/employment-outcomes', label: 'Employment Outcomes', icon: Briefcase },
    { to: '/map', label: 'Maharashtra Map', icon: Map },
    { to: '/skill-gaps', label: 'Skill Gap Intelligence', icon: BarChart3 },
    { to: '/ai-insights', label: 'AI Insights', icon: Sparkles },
    { to: '/reports', label: 'Reports', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sih_demo_user');
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black shadow-md shadow-emerald-950/40 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block leading-tight">
              SIH 2026 Initiative
            </span>
            <span className="text-base font-extrabold text-white tracking-tight block">
              THE BUG SLAYERS
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Pill */}
      <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800/60 flex items-center justify-between text-xs">
        <span className="text-slate-400">Portal Access:</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          State Directorate
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Intelligence &amp; Actions
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                  {item.to === '/ai-insights' && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      Demo AI
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
        {/* Help & Support */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Help &amp; Documentation</span>
        </button>

        {/* Team Signature */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="text-[11px] text-slate-400 font-medium">Platform Engineering</div>
          <div className="font-bold text-slate-100 flex items-center justify-between mt-0.5">
            <span>Team: THE BUG SLAYERS</span>
            <span className="text-[10px] text-emerald-400 font-mono">SIH 2026</span>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 border border-slate-600">
              MH
            </div>
            <div className="truncate text-left">
              <div className="text-xs font-bold text-white truncate">Govt. of Maharashtra</div>
              <div className="text-[11px] text-slate-400 truncate">Skill Development Dept</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out of demo"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ?
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">About the Platform</h3>
                  <p className="text-xs text-slate-500">Smart India Hackathon 2026</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Problem Statement:</strong> "Difficulties in tracking employment outcomes, skill gaps, and the impact of skilling initiatives."
              </p>
              <p>
                <strong>Core Mission:</strong> Move beyond basic enrolment headcounts to tracking actual verified wage outcomes, micro-enterprise formalization, and 6-month longitudinal retention.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800">Team Name: THE BUG SLAYERS</div>
                <div className="text-slate-500">State Directorate Analytics Suite • Maharashtra Pilot</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 fixed inset-y-0 left-0 z-30 flex-col">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
