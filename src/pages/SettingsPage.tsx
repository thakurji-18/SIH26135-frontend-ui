import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Database, 
  Bell, 
  Key, 
  CheckCircle2, 
  Server, 
  Layers, 
  RefreshCw,
  Users,
  Globe,
  Sliders
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [uanAutoVerify, setUanAutoVerify] = useState(true);
  const [followUpCadence, setFollowUpCadence] = useState('30, 90, 180 Days');
  const [minimumWageThreshold, setMinimumWageThreshold] = useState('14500');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            System Administration
          </span>
          <span className="text-xs text-slate-400">Settings &amp; DPI Integrations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Settings &amp; DPI Architecture
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure automated employment verification connectors, longitudinal follow-up intervals, and state policy thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section A: Digital Public Infrastructure (DPI) Connectors */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Digital Public Infrastructure (DPI) Integrations
              </h2>
              <p className="text-xs text-slate-400">Live API bridges for real-time outcome validation</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <strong className="text-white font-bold block">EPFO Electronic Challan Return (ECR) Gateway</strong>
                <span className="text-slate-400">Automated UAN active monthly wage contribution check</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active Bridge
              </span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <strong className="text-white font-bold block">DGET National Career Service (NCS) &amp; MahaSwayam</strong>
                <span className="text-slate-400">Sync state trainee roster with National Qualification Register (NQR)</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active Bridge
              </span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <strong className="text-white font-bold block">Aadhaar Vault &amp; DigiLocker Certificate Push</strong>
                <span className="text-slate-400">Issuing tamper-proof QR verifiable digital skill credentials</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active Bridge
              </span>
            </div>
          </div>
        </div>

        {/* Section B: Policy Thresholds */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-slate-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Outcome Policy Parameters
              </h2>
              <p className="text-xs text-slate-400">Configure regulatory benchmarks for placement verification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Longitudinal Follow-up Cadence
              </label>
              <input
                type="text"
                value={followUpCadence}
                onChange={(e) => setFollowUpCadence(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-700 bg-slate-950 text-white font-medium"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Scheduled automated touchpoint intervals post-certification</span>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Minimum Monthly Wage Benchmark (₹)
              </label>
              <input
                type="text"
                value={minimumWageThreshold}
                onChange={(e) => setMinimumWageThreshold(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-700 bg-slate-950 text-white font-medium font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Minimum salary to count towards formal employment placement</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            Team: <strong className="text-white">THE BUG SLAYERS</strong> • SIH 2026
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </form>

      {/* Toast */}
      {savedToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>System parameters updated successfully.</span>
        </div>
      )}
    </div>
  );
};
