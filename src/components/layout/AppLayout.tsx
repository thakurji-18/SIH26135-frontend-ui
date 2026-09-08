import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { SlideNavigation } from './SlideNavigation';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Persistent Sidebar */}
      <Sidebar 
        isMobileOpen={mobileMenuOpen} 
        onCloseMobile={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content Column */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic Route Viewport */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-24">
          <Outlet />
        </main>

        {/* Global Slide Controller Floating Dock for SIH 2026 */}
        <SlideNavigation />

        {/* Global Government Footer */}
        <footer className="border-t border-slate-800/80 bg-[#090D16] px-4 sm:px-6 py-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Skilling Outcomes Intelligence</span>
              <span>•</span>
              <span className="text-slate-500">Smart India Hackathon 2026 Presentation Model</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-200">Team: THE BUG SLAYERS</span>
              <span>•</span>
              <span className="text-slate-400">Illustrative Demo Data Layer</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

