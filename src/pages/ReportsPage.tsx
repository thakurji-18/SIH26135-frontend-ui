import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  X, 
  Clock, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { REPORT_TEMPLATES, TRAINING_PROGRAMS_DATA } from '../data/centralData';
import { ReportItem } from '../types';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(REPORT_TEMPLATES);
  const [generatingReport, setGeneratingReport] = useState<ReportItem | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'CSV' | 'PDF'>('CSV');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 6 Months (FY 2025-26)');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Chart data summarizing key findings across reports
  const reportSummaryChartData = TRAINING_PROGRAMS_DATA.map(p => ({
    name: p.name.split(' ')[0] + ' ' + (p.name.split(' ')[1] || ''),
    enrolled: p.totalEnrolled,
    employed: p.employed
  }));

  const handleDownload = (report: ReportItem, format: string = 'CSV') => {
    // Generate authentic CSV report
    let csvHeader = "";
    let csvBody = "";

    if (report.id === 'rep-1') {
      csvHeader = "Indicator,Value,Benchmark,Status\n";
      csvBody = "Total Enrolled Trainees,24860,20000,Target Met\n" +
        "Certified Candidates,20136,80%,81.0% Achieved\n" +
        "Verified Employed,13733,65%,68.2% Achieved\n" +
        "6-Month Longitudinal Retention,74.8%,70%,Verified via EPFO\n" +
        "Average Starting Wage,₹17800,₹15000,Above State Living Minimum\n";
    } else if (report.id === 'rep-2') {
      csvHeader = "Program Code,Program Name,Sector,Enrolled,Certified,Employed,Retention Rate\n";
      csvBody = TRAINING_PROGRAMS_DATA.map(p => 
        `"${p.code}","${p.name}","${p.sector}",${p.totalEnrolled},${p.certified},${p.employed},${p.retentionRate}%`
      ).join("\n");
    } else if (report.id === 'rep-3') {
      csvHeader = "District,Division,Employment Rate,Completion Rate,Top Identified Deficit\n" +
        "Pune,Pune,72.4%,89.0%,EV & PLC Automation\n" +
        "Mumbai Suburban,Konkan,74.2%,91.2%,Customer Technical Comm\n" +
        "Thane,Konkan,71.0%,88.4%,CNC Advanced Machining\n" +
        "Nashik,Nashik,69.5%,87.0%,Dual Certification Requirement\n" +
        "Gadchiroli,Nagpur,42.5%,74.0%,Practical Heavy Machine Hours\n" +
        "Nandurbar,Nashik,41.2%,71.5%,Language & Migration Relocation\n";
    } else {
      csvHeader = "Metric,Cohort 3-Month,Cohort 6-Month,Cohort 12-Month\n" +
        "Total Verified Active Candidates,12280,10272,8920\n" +
        "Retention Rate %,89.4%,74.8%,64.9%\n" +
        "Average Wage Increment %,+8.4%,+16.2%,+24.8%\n";
    }

    const fullContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvHeader + csvBody);
    const link = document.createElement("a");
    link.setAttribute("href", fullContent);
    link.setAttribute("download", `${report.name.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update last generated
    setReports(prev => prev.map(r => r.id === report.id ? { ...r, lastGeneratedDate: 'Just now' } : r));
    setGeneratingReport(null);
    setDownloadSuccessToast(report.name);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              Accountability &amp; Audit
            </span>
            <span className="text-xs text-slate-400">Screen 9 • Decision Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Reports &amp; Decision Support
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Generate, view, and export verified employment outcome reports for legislative review, departmental budgets, and training provider accountability.
          </p>
        </div>
      </div>

      {/* 2. Interactive Report Findings Chart */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Training Cohort Output Summary
          </h2>
          <p className="text-xs text-slate-400">
            Statewide enrollment vs verified placements across all current program audits
          </p>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportSummaryChartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip 
                formatter={(val: any) => [Number(val).toLocaleString()]}
                contentStyle={{ backgroundColor: '#090D16', border: '1px solid #334155', color: '#FFF', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px', color: '#cbd5e1' }} />
              <Bar dataKey="enrolled" name="Enrolled Trainees" fill="#38bdf8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="employed" name="Verified Placed Trainees" fill="#14b8a6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. 5 Pre-Configured Report Types */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Pre-Configured Legislative &amp; Administrative Reports
          </h2>
          <p className="text-xs text-slate-400">
            Official standardized export packages formatted for state committee review
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                    <FileText className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {rep.frequency}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {rep.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rep.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Last Generated:</span>
                  <strong className="text-slate-200 font-mono">{rep.lastGenerated}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGeneratingReport(rep)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Generate &amp; Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate & Download Configuration Modal */}
      {generatingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-800 space-y-5 text-slate-300">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Report Export Dispatch
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {generatingReport.name}
                </h3>
              </div>
              <button
                onClick={() => setGeneratingReport(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-200 block mb-1">Time Horizon Range</label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-700 bg-slate-950 text-white font-medium"
                >
                  <option>Last 6 Months (FY 2025-26)</option>
                  <option>Last 12 Months (Full Cohort)</option>
                  <option>Last Quarter (Q3 2025)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">Sector Scope Filter</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-700 bg-slate-950 text-white font-medium"
                >
                  <option>All Sectors</option>
                  <option>Automotive &amp; Capital Goods</option>
                  <option>Healthcare &amp; Allied Services</option>
                  <option>Renewable &amp; Solar Energy</option>
                  <option>Information Technology &amp; BPM</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">File Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('CSV')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold ${
                      selectedFormat === 'CSV' ? 'border-emerald-600 bg-emerald-950 text-emerald-300' : 'border-slate-700 bg-slate-950 text-slate-400'
                    }`}
                  >
                    CSV Spreadsheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('PDF')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold ${
                      selectedFormat === 'PDF' ? 'border-emerald-600 bg-emerald-950 text-emerald-300' : 'border-slate-700 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Standard Formatted CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setGeneratingReport(null)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDownload(generatingReport, selectedFormat)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dataset Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white border border-slate-700 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessToast} exported successfully.</span>
        </div>
      )}
    </div>
  );
};
