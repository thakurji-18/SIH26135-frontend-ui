import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Download, 
  Share2, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { ALL_TRAINEES_DATA, TRAINING_PROGRAMS_DATA } from '../../data/centralData';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [exportedToast, setExportedToast] = useState(false);

  // Breadcrumb mapping
  const pathMap: Record<string, { title: string; parent?: string }> = {
    '/dashboard': { title: 'Skilling Outcomes Intelligence' },
    '/trainees': { title: 'Trainee Outcomes' },
    '/training-programs': { title: 'Training Program Performance' },
    '/employment-outcomes': { title: 'Employment Outcomes' },
    '/map': { title: 'Maharashtra Skilling Outcomes Map' },
    '/skill-gaps': { title: 'Skill Gap Intelligence' },
    '/ai-insights': { title: 'AI Insights & Recommendations' },
    '/reports': { title: 'Reports & Decision Support' },
    '/settings': { title: 'System Settings & Integration' },
  };

  const currentPath = location.pathname;
  const currentTitle = pathMap[currentPath]?.title || (currentPath.startsWith('/trainees/') ? 'Trainee Outcome Profile' : 'Dashboard');

  const filteredTrainees = searchTerm.trim().length > 1
    ? ALL_TRAINEES_DATA.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.district.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleQuickExport = () => {
    // Generate quick summary CSV
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      "Total Trainees,24860\n" +
      "Completion Rate,87.4%\n" +
      "Employment Rate,68.2%\n" +
      "Average Time to Employment,42 Days\n" +
      "6-Month Retention Rate,74.8%\n" +
      "Exported At," + new Date().toISOString();
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Maharashtra_Skilling_Outcomes_Executive_Summary_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportedToast(true);
    setTimeout(() => setExportedToast(false), 3000);
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-6 py-3.5 shadow-sm text-slate-100">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
            <span className="font-semibold text-slate-400 hidden sm:inline">Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
            <span className="font-semibold text-slate-100 truncate">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Center: Strategic core premise pill (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Core Question: <strong className="text-white">Did the training actually work?</strong></span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Tracking post-certification outcomes</span>
        </div>

        {/* Right: Quick actions, Search, Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search trainees...</span>
            </button>

            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-slate-100">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, ID (e.g. TRN-2026-1048), district..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {filteredTrainees.length > 0 ? (
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {filteredTrainees.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          navigate(`/trainees/${t.id}`);
                          setSearchOpen(false);
                          setSearchTerm('');
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between transition-colors border border-transparent hover:border-slate-700 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-slate-100">{t.name}</div>
                          <div className="text-[11px] text-slate-400">{t.district} • {t.trainingProgram}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.employmentStatus === 'Employed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          t.employmentStatus === 'Self-Employed' ? 'bg-teal-950 text-teal-300 border border-teal-800' :
                          t.employmentStatus === 'Seeking Employment' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {t.employmentStatus}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchTerm.trim().length > 1 ? (
                  <div className="text-center py-4 text-xs text-slate-400">
                    No trainees found matching "{searchTerm}".
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 text-center py-2">
                    Type 2+ characters to search across 24,860 trainee records.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Export Button */}
          <button
            onClick={handleQuickExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            title="Download executive outcomes summary CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Summary</span>
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 text-slate-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white">Outcome Alerts (Live)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    3 New
                  </span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="font-semibold text-slate-200">EPFO Bulk Verification Batch</div>
                    <div className="text-slate-400 text-[11px]">842 new candidate wage placements confirmed in Pune &amp; Chakan.</div>
                    <div className="text-[10px] text-slate-500 mt-1">20 minutes ago</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-900/60">
                    <div className="font-semibold text-amber-300">Tracking Gap Alert</div>
                    <div className="text-amber-400/90 text-[11px]">18 trainees in Nandurbar flagged for telephonic follow-up retry.</div>
                    <div className="text-[10px] text-slate-500 mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Toast Notification */}
      {exportedToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Executive Outcomes Summary CSV downloaded successfully.</span>
        </div>
      )}
    </header>
  );
};
