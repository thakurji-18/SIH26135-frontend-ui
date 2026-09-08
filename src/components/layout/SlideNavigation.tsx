import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  Layers, 
  X, 
  Maximize2, 
  Minimize2,
  Sliders
} from 'lucide-react';

interface SlideItem {
  number: number;
  title: string;
  subtitle: string;
  path: string;
}

export const SLIDES: SlideItem[] = [
  { number: 1, title: 'Screen 1: Overview Dashboard', subtitle: 'Funnel & Core Outcomes', path: '/dashboard' },
  { number: 2, title: 'Screen 2: Trainee Outcomes', subtitle: 'Directory & Verifications', path: '/trainees' },
  { number: 3, title: 'Screen 3: Trainee Profile', subtitle: 'Journey & EPFO Audit', path: '/trainees/TRN-2026-1048' },
  { number: 4, title: 'Screen 4: Program Performance', subtitle: 'Comparative Benchmarking', path: '/training-programs' },
  { number: 5, title: 'Screen 5: Employment Outcomes', subtitle: 'Wages & Time-to-Job', path: '/employment-outcomes' },
  { number: 6, title: 'Screen 6: Maharashtra Map', subtitle: '36-District Choropleth', path: '/map' },
  { number: 7, title: 'Screen 7: Skill Gap Intelligence', subtitle: 'Deficits & Industry Gaps', path: '/skill-gaps' },
  { number: 8, title: 'Screen 8: AI Insights', subtitle: 'Predictive Policy Simulator', path: '/ai-insights' },
  { number: 9, title: 'Screen 9: Reports & Decision', subtitle: 'CSV Exports & Audit Logs', path: '/reports' },
];

export const SlideNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine current slide index
  const getCurrentSlideIndex = (): number => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/trainees/TRN') || (currentPath.startsWith('/trainees/') && currentPath !== '/trainees')) {
      return 2; // Slide 3 (index 2)
    }
    const idx = SLIDES.findIndex(s => s.path === currentPath);
    return idx !== -1 ? idx : 0;
  };

  const currentIndex = getCurrentSlideIndex();
  const currentSlide = SLIDES[currentIndex];

  // Keyboard navigation for presentation slides: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentIndex < SLIDES.length - 1) {
          navigate(SLIDES[currentIndex + 1].path);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          navigate(SLIDES[currentIndex - 1].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, navigate]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      navigate(SLIDES[index].path);
      setMenuOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 text-emerald-400 border border-slate-700/80 shadow-2xl backdrop-blur-md hover:bg-slate-800 transition-all text-xs font-semibold"
        title="Open Presentation Slides Controller"
      >
        <Presentation className="w-4 h-4 text-emerald-400" />
        <span>Slide {currentIndex + 1}/9</span>
      </button>
    );
  }

  return (
    <aside aria-label="Presentation Slide Controller" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]">
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl shadow-black/80 backdrop-blur-xl text-slate-100 select-none">
        
        {/* Pitch Deck Badge */}
        <div className="hidden md:flex items-center gap-2 pr-2 border-r border-slate-800 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">THE BUG SLAYERS</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono font-medium">SIH 2026 DECK</span>
        </div>

        {/* Previous Button */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`p-1.5 rounded-lg border transition-colors ${
            currentIndex === 0 
              ? 'border-slate-800/40 text-slate-600 cursor-not-allowed' 
              : 'border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white'
          }`}
          title="Previous Slide (← Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Active Slide Info & Menu Jumper */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors text-left"
          >
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  Slide {currentIndex + 1} of 9
                </span>
                <span className="text-xs font-bold text-slate-100 hidden sm:inline truncate max-w-[200px]">
                  {currentSlide.title.replace('Screen ' + (currentIndex + 1) + ': ', '')}
                </span>
              </div>
            </div>
          </button>

          {/* Slide Deck Menu Dropdown */}
          {menuOpen && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-80 max-h-96 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 space-y-1 z-50">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Presentation Slides (1 - 9)</span>
                <span className="text-[10px] font-mono text-emerald-400">Arrow Keys Active</span>
              </div>
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.number}
                  onClick={() => goToSlide(idx)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    idx === currentIndex
                      ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/40 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-semibold text-slate-200">
                      Slide {slide.number}: {slide.title.replace(`Screen ${slide.number}: `, '')}
                    </div>
                    <div className="text-[10px] text-slate-400">{slide.subtitle}</div>
                  </div>
                  {idx === currentIndex && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === SLIDES.length - 1}
          className={`p-1.5 rounded-lg border transition-colors ${
            currentIndex === SLIDES.length - 1 
              ? 'border-slate-800/40 text-slate-600 cursor-not-allowed' 
              : 'border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white'
          }`}
          title="Next Slide (→ Arrow)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Visual Progress Dots */}
        <div className="hidden lg:flex items-center gap-1 pl-1">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-5 bg-emerald-400'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Minimize Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-slate-500 hover:text-slate-300 rounded-md transition-colors ml-1"
          title="Minimize slide controller"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
