import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  Clock, 
  Building2, 
  Layers, 
  ArrowRightLeft, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  X
} from 'lucide-react';
import { MaharashtraMap } from '../components/MaharashtraMap';
import { DistrictDetailPanel } from '../components/DistrictDetailPanel';
import { DistrictComparisonModal } from '../components/DistrictComparisonModal';
import { MAHARASHTRA_DISTRICTS_DATA } from '../data/maharashtraData';
import { DistrictData, MetricType } from '../types';

export const MaharashtraMapPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(
    MAHARASHTRA_DISTRICTS_DATA.find(d => d.id === 'Pune') || MAHARASHTRA_DISTRICTS_DATA[0]
  );
  const [activeMetric, setActiveMetric] = useState<MetricType>('employmentRate');
  const [filterDivision, setFilterDivision] = useState<string>('All');
  
  // Comparison modal state
  const [showComparison, setShowComparison] = useState(false);
  const [compareDistrictB, setCompareDistrictB] = useState<DistrictData | null>(
    MAHARASHTRA_DISTRICTS_DATA.find(d => d.id === 'Gadchiroli') || MAHARASHTRA_DISTRICTS_DATA[1]
  );

  // Top 5 Highest Performing Districts (sorted by employment rate desc)
  const top5Performing = useMemo(() => {
    return [...MAHARASHTRA_DISTRICTS_DATA]
      .sort((a, b) => b.employmentRate - a.employmentRate)
      .slice(0, 5);
  }, []);

  // Top 5 Priority Intervention Districts (lowest employment rate or highest skill gap intensity)
  const top5Intervention = useMemo(() => {
    return [...MAHARASHTRA_DISTRICTS_DATA]
      .sort((a, b) => a.employmentRate - b.employmentRate)
      .slice(0, 5);
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Statewide Choropleth
            </span>
            <span className="text-xs text-slate-400">Screen 6 • 36 Administrative Districts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Maharashtra Skill Gap &amp; Employment Map
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            District-level visualization of employment outcomes, retention longevity, and industrial skill gap intensity across all 36 districts.
          </p>
        </div>

        {selectedDistrict && (
          <button
            onClick={() => setShowComparison(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-sm transition-all shrink-0"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-200" />
            <span>Compare {selectedDistrict.name} vs District</span>
          </button>
        )}
      </div>

      {/* 2. Primary Layout: Interactive Map + District Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Map Column */}
        <div className="lg:col-span-8 space-y-4">
          <MaharashtraMap
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(d) => setSelectedDistrict(d)}
            activeMetric={activeMetric}
            onChangeMetric={(m) => setActiveMetric(m)}
            filterDivision={filterDivision}
            onSelectDivision={(div) => setFilterDivision(div)}
          />

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Click any district polygon or search by name to inspect live verification data.</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Accurate Survey of India boundary schema</span>
          </div>
        </div>

        {/* Selected District Details Column */}
        <div className="lg:col-span-4 sticky top-20">
          {selectedDistrict ? (
            <DistrictDetailPanel
              district={selectedDistrict}
              onClose={() => setSelectedDistrict(null)}
              onCompareWith={(d) => {
                setCompareDistrictB(d);
                setShowComparison(true);
              }}
            />
          ) : (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center space-y-3 shadow-sm">
              <MapPin className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-white text-sm">Select a District</h3>
              <p className="text-xs text-slate-400">
                Click any of the 36 districts on the Maharashtra choropleth to review local employment rates, top skill gaps, and active centers.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Secondary Benchmark Panels: Top 5 Performing vs Top 5 Needing Intervention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Panel A: Top 5 Highest Performing Districts */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Top 5 Highest Performing Districts
                </h3>
                <p className="text-xs text-slate-400">High industrial absorption &amp; retention</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Employment Rate &gt; 65%
            </span>
          </div>

          <div className="space-y-2.5">
            {top5Performing.map((dist, idx) => (
              <div
                key={dist.id}
                onClick={() => setSelectedDistrict(dist)}
                className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] border border-slate-700">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white">{dist.name}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5">({dist.division} Div)</span>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      Key Driver: Auto/IT corridors &amp; industrial apprenticeships
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-emerald-400 text-sm">{dist.employmentRate}%</div>
                  <div className="text-[10px] text-slate-400">{dist.retentionRate}% ret.</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel B: Top 5 Districts Needing Priority Intervention */}
        <div className="bg-slate-900 rounded-2xl border border-rose-900/60 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Top 5 Priority Intervention Districts
                </h3>
                <p className="text-xs text-slate-400">Severe skill mismatches &amp; rural placement gaps</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-300 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Intervention Required
            </span>
          </div>

          <div className="space-y-2.5">
            {top5Intervention.map((dist, idx) => (
              <div
                key={dist.id}
                onClick={() => setSelectedDistrict(dist)}
                className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-800/80 cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 flex items-center justify-center font-bold text-[11px] border border-rose-800">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white">{dist.name}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5">({dist.division} Div)</span>
                    <div className="text-[11px] text-rose-400 line-clamp-1">
                      Primary Deficit: {dist.topSkillGap || 'Local industrial job link'}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-rose-400 text-sm">{dist.employmentRate}%</div>
                  <div className="text-[10px] text-slate-400">Intensity: {dist.skillGapIntensity}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Comparison Modal */}
      {showComparison && selectedDistrict && (
        <DistrictComparisonModal
          districtA={selectedDistrict}
          districtB={compareDistrictB}
          onClose={() => setShowComparison(false)}
          onSelectDistrictB={(d) => setCompareDistrictB(d)}
        />
      )}
    </div>
  );
};
