import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  ArrowUpDown, 
  ChevronRight, 
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Eye
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  CORE_OUTCOMES_METRICS, 
  EMPLOYMENT_STATUS_DISTRIBUTION, 
  ALL_TRAINEES_DATA, 
  TRAINING_PROGRAMS_DATA 
} from '../data/centralData';

export const TraineeOutcomesPage: React.FC = () => {
  const navigate = useNavigate();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState<'id' | 'name' | 'lastFollowUp'>('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered and sorted dataset
  const filteredTrainees = useMemo(() => {
    return ALL_TRAINEES_DATA.filter((t) => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDistrict = selectedDistrict === 'All' || t.district === selectedDistrict;
      const matchesProgram = selectedProgram === 'All' || t.trainingProgram === selectedProgram;
      const matchesStatus = selectedStatus === 'All' || t.employmentStatus === selectedStatus;

      return matchesSearch && matchesDistrict && matchesProgram && matchesStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'id') comparison = a.id.localeCompare(b.id);
      if (sortField === 'name') comparison = a.name.localeCompare(b.name);
      if (sortField === 'lastFollowUp') comparison = a.lastFollowUp.localeCompare(b.lastFollowUp);
      return sortAsc ? comparison : -comparison;
    });
  }, [searchTerm, selectedDistrict, selectedProgram, selectedStatus, sortField, sortAsc]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTrainees.length / itemsPerPage);
  const paginatedTrainees = filteredTrainees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = "Trainee ID,Name,Training Program,District,Training Status,Certificate Status,Employment Status,Last Follow-up,Monthly Salary\n";
    const rows = filteredTrainees.map(t => 
      `"${t.id}","${t.name}","${t.trainingProgram}","${t.district}","${t.trainingStatus}","${t.certificateStatus}","${t.employmentStatus}","${t.lastFollowUp}","${t.monthlySalary || 'N/A'}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Trainee_Outcomes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPI cards
  const kpis = [
    { label: 'Total Trainees', value: CORE_OUTCOMES_METRICS.totalTrainees.toLocaleString(), sub: '100% Enrolment' },
    { label: 'Certified Trainees', value: CORE_OUTCOMES_METRICS.certifiedTrainees.toLocaleString(), sub: '81.0% of Enrolled' },
    { label: 'Employed Trainees', value: CORE_OUTCOMES_METRICS.totalPlacedTrainees.toLocaleString(), sub: '68.2% Placement' },
    { label: 'Seeking Employment', value: CORE_OUTCOMES_METRICS.seekingEmploymentTrainees.toLocaleString(), sub: '22.0% of Certified' },
    { label: 'Not Reported', value: CORE_OUTCOMES_METRICS.notReportedTrainees.toLocaleString(), sub: '9.8% Tracking Gap' }
  ];

  // Secondary Chart: Training Completion vs Employment Rate data
  const programComparisonData = TRAINING_PROGRAMS_DATA.map(p => ({
    name: p.name.split(' ')[0] + ' ' + (p.name.split(' ')[1] || ''),
    completionRate: p.completionRate,
    employmentRate: p.employmentRate
  }));

  // Unique districts & programs for filter dropdowns
  const districtList = ['All', ...Array.from(new Set(ALL_TRAINEES_DATA.map(t => t.district)))];
  const programList = ['All', ...Array.from(new Set(ALL_TRAINEES_DATA.map(t => t.trainingProgram)))];

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-950 text-teal-300 border border-teal-800">
              Longitudinal Monitoring
            </span>
            <span className="text-xs text-slate-400">Screen 2 • Individual Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Trainee Outcomes
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Track individual training journeys and employment status beyond certification. Click any trainee to inspect full verification history.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 shadow-sm transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Records ({filteredTrainees.length})</span>
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-sm">
            <div className="text-xs font-semibold text-slate-400">{kpi.label}</div>
            <div className="text-2xl font-extrabold text-white mt-1">{kpi.value}</div>
            <div className="text-[11px] font-medium text-slate-400 mt-2">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 3. Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Graph A: Employment Status Distribution (Donut Chart) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Employment Status Distribution
            </h2>
            <p className="text-xs text-slate-400">
              Total 20,136 certified candidates categorized into mutually exclusive outcomes
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EMPLOYMENT_STATUS_DISTRIBUTION}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {EMPLOYMENT_STATUS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, item: any) => [
                    `${Number(value).toLocaleString()} trainees (${item.payload.percentage}%)`,
                    name
                  ]}
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-200 border border-emerald-800/80">
              <div className="text-[10px] text-emerald-400 font-bold uppercase">Gainfully Placed</div>
              <div className="font-extrabold text-sm">68.2% (13,733)</div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/60 text-amber-200 border border-amber-800/80">
              <div className="text-[10px] text-amber-400 font-bold uppercase">Unplaced / Leakage</div>
              <div className="font-extrabold text-sm">31.8% (6,403)</div>
            </div>
          </div>
        </div>

        {/* Graph B: Training Completion vs Employment Rate (Grouped Bar Chart) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Training Completion vs. Employment Rate
              </h2>
              <p className="text-xs text-slate-400">
                Highlighting programs where high certification does not guarantee employment
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#94A3B8' }} 
                  angle={-15} 
                  textAnchor="end" 
                  stroke="#334155"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" stroke="#334155" />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`]}
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px', color: '#94A3B8' }} />
                <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="employmentRate" name="Employment Rate (%)" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Notice how Precision Agriculture achieves 68% completion, yet only 40.8% employment conversion.
          </p>
        </div>
      </div>

      {/* 4. Filter & Search Controls */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, district, or program..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-950 text-white placeholder-slate-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-1.5 px-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                {districtList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-1.5 px-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Seeking Employment">Seeking Employment</option>
                <option value="Not Reported">Not Reported</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Trainee Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-y border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 cursor-pointer" onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Trainee ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer" onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Candidate Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Training Program</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Training Status</th>
                <th className="py-3 px-4">Certificate</th>
                <th className="py-3 px-4">Employment Status</th>
                <th className="py-3 px-4">Last Follow-up</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {paginatedTrainees.length > 0 ? (
                paginatedTrainees.map((trainee) => (
                  <tr 
                    key={trainee.id}
                    onClick={() => navigate(`/trainees/${trainee.id}`)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {trainee.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {trainee.name}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-300">
                      {trainee.trainingProgram}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {trainee.district}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {trainee.trainingStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {trainee.certificateStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
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
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {trainee.lastFollowUp}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/trainees/${trainee.id}`);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 transition-colors border border-slate-700"
                        title="View Trainee Journey"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No trainees found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
          <div>
            Showing <strong>{paginatedTrainees.length}</strong> of <strong>{filteredTrainees.length}</strong> matched candidates
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-700 disabled:opacity-40 hover:bg-slate-800 text-slate-300 font-medium transition-colors"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-white">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-700 disabled:opacity-40 hover:bg-slate-800 text-slate-300 font-medium transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
