import { 
  TrainingProgramItem, 
  TraineeRecord, 
  AIInsightItem, 
  ReportItem, 
  PriorityIntervention 
} from '../types';

// ==========================================
// 1. CORE SYSTEM SUMMARY METRICS (Screen 1)
// Centralized Source of Truth for SIH 2026
// ==========================================
export const CORE_OUTCOMES_METRICS = {
  totalTrainees: 24860,
  completedTrainees: 21728,
  completionRate: 87.4, // 21,728 / 24,860 = 87.4%
  
  certifiedTrainees: 20136, // 81.0% of enrolled
  certificationRate: 81.0,
  
  // Placed = Formal Wage (11,518) + Self-Employed (2,215) = 13,733
  // 13,733 / 20,136 = 68.2%
  employedTrainees: 11518,
  selfEmployedTrainees: 2215,
  totalPlacedTrainees: 13733,
  employmentRate: 68.2, // exactly 13,733 / 20,136
  
  seekingEmploymentTrainees: 4430, // 22.0%
  seekingEmploymentRate: 22.0,
  
  notReportedTrainees: 1973, // 9.8% (Tracking leakage)
  notReportedRate: 9.8,
  
  averageTimeToEmploymentDays: 42,
  retentionRate6Month: 74.8, // 10,272 / 13,733 = 74.8%
  retainedTrainees6Month: 10272,
  
  activeTrainingProgramsCount: 8,
  participatingDistrictsCount: 36,
  verifiedByEPFOPercentage: 84.6
};

// ==========================================
// 2. TRAINING-TO-EMPLOYMENT FUNNEL (Screen 1)
// ==========================================
export const FUNNEL_STAGES = [
  {
    id: 'enrolled',
    stage: 'Enrolled',
    count: 24860,
    conversionPercent: 100.0,
    dropOffPercent: 0.0,
    dropOffCount: 0,
    stageDescription: 'Youth admitted into NSQF-aligned skilling programs'
  },
  {
    id: 'completed',
    stage: 'Completed Training',
    count: 21728,
    conversionPercent: 87.4,
    dropOffPercent: 12.6,
    dropOffCount: 3132,
    stageDescription: 'Completed mandatory practical & theoretical hours'
  },
  {
    id: 'certified',
    stage: 'Certified',
    count: 20136,
    conversionPercent: 81.0, // of enrolled (92.7% of completed)
    dropOffPercent: 7.3,
    dropOffCount: 1592,
    stageDescription: 'Passed Sector Skill Council examination'
  },
  {
    id: 'placed',
    stage: 'Placed / Employed',
    count: 13733,
    conversionPercent: 68.2, // of certified
    dropOffPercent: 31.8,
    dropOffCount: 6403,
    stageDescription: 'Verified formal payroll or registered enterprise'
  },
  {
    id: 'retained',
    stage: 'Retained After 6 Months',
    count: 10272,
    conversionPercent: 74.8, // of placed
    dropOffPercent: 25.2,
    dropOffCount: 3461,
    stageDescription: 'Sustained continuous active workforce tenure'
  }
];

// ==========================================
// 3. 6-MONTH EMPLOYMENT TREND (Screen 1, 4, 5)
// ==========================================
export const MONTHLY_EMPLOYMENT_TREND = [
  { month: 'Oct 2025', employmentRate: 61.4, placedCount: 1840, target: 65.0 },
  { month: 'Nov 2025', employmentRate: 63.2, placedCount: 2010, target: 65.0 },
  { month: 'Dec 2025', employmentRate: 65.0, placedCount: 2280, target: 66.0 },
  { month: 'Jan 2026', employmentRate: 66.8, placedCount: 2430, target: 67.0 },
  { month: 'Feb 2026', employmentRate: 67.5, placedCount: 2520, target: 68.0 },
  { month: 'Mar 2026', employmentRate: 68.2, placedCount: 2653, target: 68.0 }
];

// ==========================================
// 4. EMPLOYMENT STATUS BREAKDOWN (Screen 2, 5)
// Exact sum = 20,136 (All certified trainees)
// ==========================================
export const EMPLOYMENT_STATUS_DISTRIBUTION = [
  { name: 'Employed (Formal Wage)', count: 11518, percentage: 57.2, color: '#0D9488' }, // Teal
  { name: 'Self-Employed', count: 2215, percentage: 11.0, color: '#059669' }, // Emerald
  { name: 'Seeking Employment', count: 4430, percentage: 22.0, color: '#F59E0B' }, // Amber
  { name: 'Not Reported (Tracking Gap)', count: 1973, percentage: 9.8, color: '#E11D48' } // Rose
];

// ==========================================
// 5. TOP SKILL GAPS (Screen 1, 7)
// ==========================================
export const TOP_SKILL_GAPS_DATA = [
  { 
    skillGap: 'Communication & Workplace English', 
    category: 'Soft Skills',
    affectedTrainees: 5420, 
    percentage: 26.9,
    priority: 'High',
    industryMismatch: 'Entry-level customer care, technical field support, and front-office roles'
  },
  { 
    skillGap: 'Practical Equipment & Machine Rig Experience', 
    category: 'Practical Experience',
    affectedTrainees: 4890, 
    percentage: 24.3,
    priority: 'Critical',
    industryMismatch: 'CNC milling, automated welding, and electronic test-bench operators'
  },
  { 
    skillGap: 'Digital Literacy & Enterprise ERP Systems', 
    category: 'Digital Literacy',
    affectedTrainees: 3740, 
    percentage: 18.6,
    priority: 'High',
    industryMismatch: 'Warehouse barcode inventory, automated logistics, and billing systems'
  },
  { 
    skillGap: 'Technical Troubleshooting & Diagnostics', 
    category: 'Technical Skills',
    affectedTrainees: 2980, 
    percentage: 14.8,
    priority: 'Moderate',
    industryMismatch: 'Electric vehicle wiring harness, inverter fault detection, solar plants'
  },
  { 
    skillGap: 'Interview Readiness & Professional Etiquette', 
    category: 'Interview Readiness',
    affectedTrainees: 2410, 
    percentage: 12.0,
    priority: 'Moderate',
    industryMismatch: 'Mock behavioral rounds, resume clarity, employer expectation mismatch'
  },
  { 
    skillGap: 'Industry Standards & Safety Compliance (ISO/OSHA)', 
    category: 'Industry-Specific Skills',
    affectedTrainees: 1860, 
    percentage: 9.2,
    priority: 'Moderate',
    industryMismatch: 'Chemical manufacturing, automotive paint shop, high-voltage substations'
  }
];

// ==========================================
// 6. TRAINING PROGRAMS DATA (Screen 1, 4, 5)
// ==========================================
export const TRAINING_PROGRAMS_DATA: TrainingProgramItem[] = [
  {
    id: 'prog-auto-mech',
    name: 'Automotive Mechatronics Technician',
    code: 'AUTO-MECH-04',
    sector: 'Automotive & EV',
    provider: 'Tata Motors Skill Academy',
    totalEnrolled: 4200,
    certified: 3780,
    employed: 2684,
    selfEmployed: 226,
    seekingEmployment: 642,
    notReported: 228,
    completionRate: 90.0,
    employmentRate: 77.0,
    retentionRate: 83.4,
    avgTimeToEmploymentDays: 32,
    performanceStatus: 'High Performing'
  },
  {
    id: 'prog-health-gda',
    name: 'Healthcare General Duty Assistant',
    code: 'HLTH-GDA-02',
    sector: 'Healthcare',
    provider: 'Apollo MedSkills Foundation',
    totalEnrolled: 3600,
    certified: 3240,
    employed: 2235,
    selfEmployed: 162,
    seekingEmployment: 616,
    notReported: 227,
    completionRate: 90.0,
    employmentRate: 74.0,
    retentionRate: 79.5,
    avgTimeToEmploymentDays: 28,
    performanceStatus: 'High Performing'
  },
  {
    id: 'prog-ind-robotics',
    name: 'Industrial Automation & Robotics Operator',
    code: 'IND-ROBO-03',
    sector: 'Manufacturing',
    provider: 'Festo Didactic Institute',
    totalEnrolled: 3400,
    certified: 2958,
    employed: 1952,
    selfEmployed: 207,
    seekingEmployment: 562,
    notReported: 237,
    completionRate: 87.0,
    employmentRate: 73.0,
    retentionRate: 77.2,
    avgTimeToEmploymentDays: 38,
    performanceStatus: 'High Performing'
  },
  {
    id: 'prog-cloud-dev',
    name: 'Junior Cloud & Web Developer',
    code: 'IT-CLOUD-01',
    sector: 'IT & Electronics',
    provider: 'NSDC National Technology Center',
    totalEnrolled: 3800,
    certified: 3230,
    employed: 1841,
    selfEmployed: 323,
    seekingEmployment: 775,
    notReported: 291,
    completionRate: 85.0,
    employmentRate: 67.0,
    retentionRate: 71.0,
    avgTimeToEmploymentDays: 48,
    performanceStatus: 'On Track'
  },
  {
    id: 'prog-solar-grid',
    name: 'Solar PV Rooftop Grid Installer',
    code: 'GRN-SOLAR-02',
    sector: 'Green Energy',
    provider: 'Maharishi Solar & Adani Academy',
    totalEnrolled: 3100,
    certified: 2635,
    employed: 1212,
    selfEmployed: 422,
    seekingEmployment: 711,
    notReported: 290,
    completionRate: 85.0,
    employmentRate: 62.0,
    retentionRate: 68.6,
    avgTimeToEmploymentDays: 45,
    performanceStatus: 'On Track'
  },
  {
    id: 'prog-cold-chain',
    name: 'Cold Chain & Automated Logistics',
    code: 'LOG-CHAIN-01',
    sector: 'Logistics',
    provider: 'Mahindra Logistics Training Trust',
    totalEnrolled: 2500,
    certified: 2125,
    employed: 1105,
    selfEmployed: 170,
    seekingEmployment: 595,
    notReported: 255,
    completionRate: 85.0,
    employmentRate: 60.0,
    retentionRate: 69.4,
    avgTimeToEmploymentDays: 41,
    performanceStatus: 'On Track'
  },
  {
    id: 'prog-textile-jacquard',
    name: 'Digital Jacquard Weaving & Design',
    code: 'TEX-JACQ-01',
    sector: 'Textiles & Handloom',
    provider: 'Raymond & Solapur Textile Consortium',
    totalEnrolled: 2260,
    certified: 1808,
    employed: 362,
    selfEmployed: 578,
    seekingEmployment: 615,
    notReported: 253,
    completionRate: 80.0,
    employmentRate: 52.0,
    retentionRate: 65.0,
    avgTimeToEmploymentDays: 52,
    performanceStatus: 'Needs Attention'
  },
  {
    id: 'prog-agri-drip',
    name: 'Precision Agriculture & Drip Technician',
    code: 'AGR-DRIP-02',
    sector: 'Agriculture',
    provider: 'Jain Irrigation Technical School',
    totalEnrolled: 2000,
    certified: 1360,
    employed: 128,
    selfEmployed: 427,
    seekingEmployment: 519,
    notReported: 286,
    completionRate: 68.0,
    employmentRate: 40.8,
    retentionRate: 58.2,
    avgTimeToEmploymentDays: 60,
    performanceStatus: 'Needs Attention'
  }
];

// ==========================================
// 7. TRAINEE RECORDS (Screen 2 & Screen 3)
// ==========================================
export const SAMPLE_TRAINEES_DATA: TraineeRecord[] = [
  {
    id: 'TRN-2026-1048',
    name: 'Pooja Vishwanath Gaikwad',
    trainingProgram: 'Automotive Mechatronics Technician',
    programCode: 'AUTO-MECH-04',
    district: 'Pune',
    division: 'Pune',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '02 Mar 2026',
    gender: 'Female',
    enrolmentDate: '10 Jun 2025',
    completionDate: '15 Oct 2025',
    certificationDate: '28 Oct 2025',
    jobRole: 'EV Battery Diagnostic Specialist',
    industry: 'Automotive & Clean Mobility',
    employerType: 'Large Enterprise',
    employerName: 'Tata Motors Passenger Vehicles Ltd',
    employmentStartDate: '15 Nov 2025',
    salaryRange: '₹22,000 - ₹26,000 / month',
    monthlySalary: 24500,
    workLocation: 'Chakan MIDC, Pune',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '10 Jun 2025',
        status: 'Completed',
        description: 'Enrolled under MSSDS subsidized youth quota at Government ITI Aundh, Pune.',
        verifiedBy: 'MSSDS Enrolment Portal'
      },
      {
        stage: 'Training Started',
        date: '15 Jun 2025',
        status: 'Completed',
        description: 'Began 500-hour NSQF Level 4 training module covering CAN-bus and battery cell balancing.',
        verifiedBy: 'Biometric Attendance (94.2% attendance)'
      },
      {
        stage: 'Training Completed',
        date: '15 Oct 2025',
        status: 'Completed',
        description: 'Successfully passed internal shop floor practical examinations and viva.',
        verifiedBy: 'District Training Superintendent'
      },
      {
        stage: 'Certificate Issued',
        date: '28 Oct 2025',
        status: 'Completed',
        description: 'Automotive Skills Development Council (ASDC) Certificate issued via DigiLocker.',
        verifiedBy: 'DigiLocker QR Hash: SHA-98A1F4'
      },
      {
        stage: 'Employment Follow-up',
        date: '15 Nov 2025',
        status: 'Completed',
        description: 'Selected during Kaushalya Rozgar Mela; joined Tata Motors EV plant in Chakan.',
        verifiedBy: 'EPFO UAN Linked: 101849204912'
      },
      {
        stage: 'Current Outcome: Retained (4 Months)',
        date: '02 Mar 2026',
        status: 'Active',
        description: 'Consecutive EPFO challans verified. Trainee received merit bonus for zero-defect testing.',
        verifiedBy: 'Direct EPFO API integration'
      }
    ],
    followUpHistory: [
      {
        date: '15 Dec 2025',
        employmentStatus: 'Employed',
        jobRole: 'Junior EV Tech',
        salaryRange: '₹22,000 / month',
        notes: 'Completed initial shop-floor probation without incident.',
        retentionFlag: true
      },
      {
        date: '15 Jan 2026',
        employmentStatus: 'Employed',
        jobRole: 'EV Battery Diagnostic Specialist',
        salaryRange: '₹24,500 / month',
        notes: 'Promoted to diagnostic line after passing internal quality audit.',
        retentionFlag: true
      },
      {
        date: '02 Mar 2026',
        employmentStatus: 'Employed',
        jobRole: 'EV Battery Diagnostic Specialist',
        salaryRange: '₹24,500 / month',
        notes: 'Candidate expresses high satisfaction; transport bus provided by employer.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Advanced Thermal Runaway Simulation',
      'Technical Documentation in English'
    ],
    aiConfidenceLevel: 94,
    recommendedActions: [
      'Enroll in online 15-hour ASDC Masterclass on High-Voltage Safety.',
      'Schedule 6-month retention verification check in May 2026.'
    ]
  },
  {
    id: 'TRN-2026-2184',
    name: 'Rohan Suresh Shinde',
    trainingProgram: 'Cold Chain & Automated Logistics',
    programCode: 'LOG-CHAIN-01',
    district: 'Nagpur',
    division: 'Nagpur',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '28 Feb 2026',
    gender: 'Male',
    enrolmentDate: '01 Jul 2025',
    completionDate: '20 Oct 2025',
    certificationDate: '05 Nov 2025',
    jobRole: 'Warehouse Automation Assistant',
    industry: 'Logistics & Supply Chain',
    employerType: 'MNC',
    employerName: 'DHL Supply Chain India',
    employmentStartDate: '01 Dec 2025',
    salaryRange: '₹18,000 - ₹21,000 / month',
    monthlySalary: 19800,
    workLocation: 'MIHAN SEZ, Nagpur',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '01 Jul 2025',
        status: 'Completed',
        description: 'Admitted into Cold Chain Operator course at Nagpur Multi-Skill Center.',
        verifiedBy: 'Nagpur District Skill Office'
      },
      {
        stage: 'Training Started',
        date: '05 Jul 2025',
        status: 'Completed',
        description: 'Covered cold storage refrigeration cycles and automated barcode scanners.',
        verifiedBy: 'Biometric Attendance (89.1%)'
      },
      {
        stage: 'Training Completed',
        date: '20 Oct 2025',
        status: 'Completed',
        description: 'Demonstrated operational proficiency in warehouse ERP software.',
        verifiedBy: 'Lead Assessor Logistics SSC'
      },
      {
        stage: 'Certificate Issued',
        date: '05 Nov 2025',
        status: 'Completed',
        description: 'Logistics Sector Skill Council NSQF Level 3 Certificate issued.',
        verifiedBy: 'DigiLocker QR Hash: SHA-77C201'
      },
      {
        stage: 'Employment Follow-up',
        date: '01 Dec 2025',
        status: 'Completed',
        description: 'Onboarded at DHL Supply Chain hub in MIHAN multi-modal corridor.',
        verifiedBy: 'EPFO UAN Linked: 101984210984'
      },
      {
        stage: 'Current Outcome: Employed (3 Months)',
        date: '28 Feb 2026',
        status: 'Active',
        description: 'Working regular night rotation shifts; 3rd month salary slip verified.',
        verifiedBy: 'Field Officer Telephonic Audit'
      }
    ],
    followUpHistory: [
      {
        date: '05 Jan 2026',
        employmentStatus: 'Employed',
        jobRole: 'Warehouse Automation Assistant',
        salaryRange: '₹19,800 / month',
        notes: 'Shift completed with good attendance record.',
        retentionFlag: true
      },
      {
        date: '28 Feb 2026',
        employmentStatus: 'Employed',
        jobRole: 'Warehouse Automation Assistant',
        salaryRange: '₹19,800 / month',
        notes: 'Working in climate-controlled pharmaceutical storage unit.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Automated Guided Vehicle (AGV) Troubleshooting',
      'Inventory Discrepancy Reporting'
    ],
    aiConfidenceLevel: 88,
    recommendedActions: [
      'Recommend company-sponsored micro-credential on WMS software.',
      'Monitor for shift fatigue and overtime wage transparency.'
    ]
  },
  {
    id: 'TRN-2026-3392',
    name: 'Anjali Sanjay Jadhav',
    trainingProgram: 'Digital Jacquard Weaving & Design',
    programCode: 'TEX-JACQ-01',
    district: 'Solapur',
    division: 'Pune',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Self-Employed',
    lastFollowUp: '25 Feb 2026',
    gender: 'Female',
    enrolmentDate: '15 May 2025',
    completionDate: '20 Sep 2025',
    certificationDate: '08 Oct 2025',
    businessType: 'Micro-Jacquard Handloom Unit & Chaddar Weaver',
    businessStartDate: '10 Nov 2025',
    incomeRange: '₹16,000 - ₹20,000 / month',
    udyamRegistration: 'UDYAM-MH-26-004819',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '15 May 2025',
        status: 'Completed',
        description: 'Enrolled under Women Entrepreneurship Initiative in Solapur traditional cluster.',
        verifiedBy: 'Solapur Handloom Cooperative'
      },
      {
        stage: 'Training Started',
        date: '20 May 2025',
        status: 'Completed',
        description: 'Trained on computerized jacquard punch-card simulation & CAD design software.',
        verifiedBy: 'Training Center Daily Log'
      },
      {
        stage: 'Training Completed',
        date: '20 Sep 2025',
        status: 'Completed',
        description: 'Successfully developed 12 novel geometric Solapur chaddar patterns.',
        verifiedBy: 'Textile SSC Assessor'
      },
      {
        stage: 'Certificate Issued',
        date: '08 Oct 2025',
        status: 'Completed',
        description: 'NSQF Level 4 Weaving & CAD Certificate issued.',
        verifiedBy: 'DigiLocker QR Hash: SHA-44D991'
      },
      {
        stage: 'Employment Follow-up',
        date: '10 Nov 2025',
        status: 'Completed',
        description: 'Secured ₹1.5 Lakh Mudra Shishu loan and set up own electronic jacquard loom.',
        verifiedBy: 'PFMS Bank Account Disbursal'
      },
      {
        stage: 'Current Outcome: Self-Employed (Sustained)',
        date: '25 Feb 2026',
        status: 'Active',
        description: 'Supplying directly to Maharashtra State Handloom Corporation sales emporium.',
        verifiedBy: 'GST Invoices & Udyam Portal'
      }
    ],
    followUpHistory: [
      {
        date: '10 Dec 2025',
        employmentStatus: 'Self-Employed',
        jobRole: 'Micro-Enterprise Owner',
        salaryRange: '₹14,000 / month',
        notes: 'Initial production batch delivered to Solapur market.',
        retentionFlag: true
      },
      {
        date: '25 Feb 2026',
        employmentStatus: 'Self-Employed',
        jobRole: 'Micro-Enterprise Owner',
        salaryRange: '₹18,500 / month',
        notes: 'Income expanded due to direct e-commerce linkage.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Digital Marketing & Social Commerce',
      'Inventory Working Capital Management'
    ],
    aiConfidenceLevel: 91,
    recommendedActions: [
      'Connect with ONDC (Open Network for Digital Commerce) handicrafts onboarding desk.',
      'Sanction Mudra Kishore expansion credit review in Q3.'
    ]
  },
  {
    id: 'TRN-2026-4401',
    name: 'Akash Balasaheb Munde',
    trainingProgram: 'Precision Agriculture & Drip Technician',
    programCode: 'AGR-DRIP-02',
    district: 'Beed',
    division: 'Chhatrapati Sambhajinagar',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Seeking Employment',
    lastFollowUp: '22 Feb 2026',
    gender: 'Male',
    enrolmentDate: '10 Jun 2025',
    completionDate: '15 Oct 2025',
    certificationDate: '02 Nov 2025',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '10 Jun 2025',
        status: 'Completed',
        description: 'Admitted into drought-resilient micro-irrigation training in Beed ITI.',
        verifiedBy: 'Beed District Skill Officer'
      },
      {
        stage: 'Training Started',
        date: '15 Jun 2025',
        status: 'Completed',
        description: 'Trained on solar submersible pumps and venturi fertilizer injectors.',
        verifiedBy: 'Biometric Attendance'
      },
      {
        stage: 'Training Completed',
        date: '15 Oct 2025',
        status: 'Completed',
        description: 'Passed final installation assessment with 72% aggregate score.',
        verifiedBy: 'Agriculture SSC Examiner'
      },
      {
        stage: 'Certificate Issued',
        date: '02 Nov 2025',
        status: 'Completed',
        description: 'Digital certificate issued via DigiLocker.',
        verifiedBy: 'DigiLocker QR Hash: SHA-11B382'
      },
      {
        stage: 'Employment Follow-up',
        date: '15 Dec 2025',
        status: 'Pending',
        description: 'Local agri-service agency in Beed offered seasonal day-rate work only.',
        verifiedBy: 'Field DSC Survey'
      },
      {
        stage: 'Current Outcome: Actively Seeking Employment',
        date: '22 Feb 2026',
        status: 'Action Required',
        description: 'Candidate desires formal wage contract with drip irrigation manufacturers (Jain/Netafim).',
        verifiedBy: 'AI WhatsApp Pulse Survey'
      }
    ],
    followUpHistory: [
      {
        date: '15 Dec 2025',
        employmentStatus: 'Seeking Employment',
        jobRole: 'Unplaced',
        salaryRange: 'None',
        notes: 'Offered informal unpaid apprenticeship; rejected due to distance.',
        retentionFlag: false
      },
      {
        date: '22 Feb 2026',
        employmentStatus: 'Seeking Employment',
        jobRole: 'Unplaced',
        salaryRange: 'None',
        notes: 'Willing to relocate to Chhatrapati Sambhajinagar or Pune for formal job.',
        retentionFlag: false
      }
    ],
    identifiedSkillGaps: [
      'Lack of Industrial Field Experience',
      'Solar Pump Variable Frequency Drive (VFD) Calibration',
      'Interview English Vocabulary'
    ],
    aiConfidenceLevel: 89,
    recommendedActions: [
      'Queue for Priority Rozgar Mela in Chhatrapati Sambhajinagar MIDC (12 Mar 2026).',
      'Provide 2-week bridge apprenticeship with Jain Irrigation service partner.'
    ]
  },
  {
    id: 'TRN-2026-5590',
    name: 'Deepak Kisan Rathod',
    trainingProgram: 'Solar PV Rooftop Grid Installer',
    programCode: 'GRN-SOLAR-02',
    district: 'Nandurbar',
    division: 'Nashik',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Not Reported',
    lastFollowUp: '12 Jan 2026',
    gender: 'Male',
    enrolmentDate: '15 Jul 2025',
    completionDate: '25 Nov 2025',
    certificationDate: '10 Dec 2025',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '15 Jul 2025',
        status: 'Completed',
        description: 'Enrolled under Tribal Area Skilling scheme at ITI Nandurbar.',
        verifiedBy: 'Tribal Development Department'
      },
      {
        stage: 'Training Started',
        date: '20 Jul 2025',
        status: 'Completed',
        description: 'Rooftop mounting structures and AC/DC inverter synchronization.',
        verifiedBy: 'Biometric Attendance (82.4%)'
      },
      {
        stage: 'Training Completed',
        date: '25 Nov 2025',
        status: 'Completed',
        description: 'Demonstrated rooftop ladder safety and multimeter testing.',
        verifiedBy: 'Green Skill Council Examiner'
      },
      {
        stage: 'Certificate Issued',
        date: '10 Dec 2025',
        status: 'Completed',
        description: 'Solar Surya Mitra Certified.',
        verifiedBy: 'DigiLocker QR Hash: SHA-55E890'
      },
      {
        stage: 'Employment Follow-up (Missed)',
        date: '12 Jan 2026',
        status: 'Leakage Alert',
        description: 'Candidate primary phone unreachable. Relocated to Gujarat border for agricultural harvest.',
        verifiedBy: 'AI Automated IVR Call Failure'
      },
      {
        stage: 'Current Outcome: Untraceable (Tracking Leakage)',
        date: '12 Jan 2026',
        status: 'High Alert',
        description: 'Core problem statement instance: Certified but outcome unrecorded due to migration.',
        verifiedBy: 'District DSC Field Officer'
      }
    ],
    followUpHistory: [
      {
        date: '12 Jan 2026',
        employmentStatus: 'Not Reported',
        jobRole: 'Unknown',
        salaryRange: 'Unknown',
        notes: 'Phone switched off; village sarpanch reported seasonal migration to Surat.',
        retentionFlag: false
      }
    ],
    identifiedSkillGaps: [
      'Communication & Contact Retention',
      'Local Enterprise Formalization'
    ],
    aiConfidenceLevel: 82,
    recommendedActions: [
      'Trigger Aadhaar-PAN EPFO automated webhook sync.',
      'Dispatch WhatsApp bot reminder with survey link to alternate family mobile number.'
    ]
  },
  {
    id: 'TRN-2026-6712',
    name: 'Surekha Madhav Atram',
    trainingProgram: 'Healthcare General Duty Assistant',
    programCode: 'HLTH-GDA-02',
    district: 'Gadchiroli',
    division: 'Nagpur',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '04 Mar 2026',
    gender: 'Female',
    enrolmentDate: '10 May 2025',
    completionDate: '15 Sep 2025',
    certificationDate: '01 Oct 2025',
    jobRole: 'Hospital Ward Caregiver & Triage Nurse Assistant',
    industry: 'Healthcare',
    employerType: 'Government Contractor',
    employerName: 'District Civil Hospital Health Consortium',
    employmentStartDate: '15 Oct 2025',
    salaryRange: '₹17,500 - ₹20,000 / month',
    monthlySalary: 18500,
    workLocation: 'Gadchiroli Town',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '10 May 2025',
        status: 'Completed',
        description: 'Enrolled under Aspirational District Skilling Fellowship in Gadchiroli.',
        verifiedBy: 'District Collectorate'
      },
      {
        stage: 'Training Started',
        date: '15 May 2025',
        status: 'Completed',
        description: 'Clinical nursing triage, vitals monitoring, and emergency CPR protocol.',
        verifiedBy: 'Biometric Attendance (96.5%)'
      },
      {
        stage: 'Training Completed',
        date: '15 Sep 2025',
        status: 'Completed',
        description: 'Completed 120-hour clinical internship at Gadchiroli District Hospital.',
        verifiedBy: 'Civil Surgeon Evaluation'
      },
      {
        stage: 'Certificate Issued',
        date: '01 Oct 2025',
        status: 'Completed',
        description: 'Healthcare Sector Skill Council Certification verified.',
        verifiedBy: 'DigiLocker QR Hash: SHA-33A781'
      },
      {
        stage: 'Employment Follow-up',
        date: '15 Oct 2025',
        status: 'Completed',
        description: 'Appointed under National Health Mission (NHM) contracted healthcare staff.',
        verifiedBy: 'PFMS Treasury Disbursal Ledger'
      },
      {
        stage: 'Current Outcome: Retained (5 Months)',
        date: '04 Mar 2026',
        status: 'Active',
        description: 'Active payroll record verified. Commended for primary healthcare outreach.',
        verifiedBy: 'Direct EPFO & State Health Portal'
      }
    ],
    followUpHistory: [
      {
        date: '15 Nov 2025',
        employmentStatus: 'Employed',
        jobRole: 'Ward Caregiver',
        salaryRange: '₹18,500 / month',
        notes: 'Assigned to maternity triage wing.',
        retentionFlag: true
      },
      {
        date: '15 Jan 2026',
        employmentStatus: 'Employed',
        jobRole: 'Ward Caregiver',
        salaryRange: '₹18,500 / month',
        notes: 'Zero absenteeism; excellent community feedback.',
        retentionFlag: true
      },
      {
        date: '04 Mar 2026',
        employmentStatus: 'Employed',
        jobRole: 'Hospital Ward Caregiver & Triage Nurse Assistant',
        salaryRange: '₹18,500 / month',
        notes: 'Continuous employment confirmed for month 5.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Electronic Health Record (EHR) Typing Speed',
      'Advanced Pediatric First Aid'
    ],
    aiConfidenceLevel: 96,
    recommendedActions: [
      'Recommend candidate for ANM / GNM sponsored lateral degree progression.',
      'Authorize annual retention bonus incentive.'
    ]
  },
  {
    id: 'TRN-2026-7823',
    name: 'Vikram Dashrath Patil',
    trainingProgram: 'Industrial Automation & Robotics Operator',
    programCode: 'IND-ROBO-03',
    district: 'Kolhapur',
    division: 'Pune',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '01 Mar 2026',
    gender: 'Male',
    enrolmentDate: '01 Jun 2025',
    completionDate: '30 Sep 2025',
    certificationDate: '15 Oct 2025',
    jobRole: 'CNC Milling & Robotics Apprentice',
    industry: 'Automotive & Heavy Engineering',
    employerType: 'MSME',
    employerName: 'Menon & Menon Foundry Ltd',
    employmentStartDate: '01 Nov 2025',
    salaryRange: '₹15,000 - ₹18,000 / month',
    monthlySalary: 16500,
    workLocation: 'Shiroli MIDC, Kolhapur',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '01 Jun 2025',
        status: 'Completed',
        description: 'Admitted at Government Polytechnic Kolhapur automation wing.',
        verifiedBy: 'MSSDS Technical Board'
      },
      {
        stage: 'Training Started',
        date: '05 Jun 2025',
        status: 'Completed',
        description: 'G-Code programming, tool offset compensation, and robot arm teaching pendant.',
        verifiedBy: 'Biometric Attendance'
      },
      {
        stage: 'Training Completed',
        date: '30 Sep 2025',
        status: 'Completed',
        description: 'Machined test part within 10-micron tolerance limit.',
        verifiedBy: 'Capital Goods SSC Examiner'
      },
      {
        stage: 'Certificate Issued',
        date: '15 Oct 2025',
        status: 'Completed',
        description: 'Capital Goods Skill Council NSQF Level 4 Credential.',
        verifiedBy: 'DigiLocker QR Hash: SHA-66B124'
      },
      {
        stage: 'Employment Follow-up',
        date: '01 Nov 2025',
        status: 'Completed',
        description: 'Joined under NAPS (National Apprenticeship Promotion Scheme).',
        verifiedBy: 'NAPS Portal Contract: NAPS-MH-2025-4819'
      },
      {
        stage: 'Current Outcome: Employed (4 Months)',
        date: '01 Mar 2026',
        status: 'Active',
        description: 'Regular monthly stipend credited via DBT; employer submitted confirmation letter.',
        verifiedBy: 'NAPS Portal & Bank Statement'
      }
    ],
    followUpHistory: [
      {
        date: '01 Dec 2025',
        employmentStatus: 'Employed',
        jobRole: 'Apprentice Operator',
        salaryRange: '₹16,500 / month',
        notes: 'First month stipend received.',
        retentionFlag: true
      },
      {
        date: '01 Mar 2026',
        employmentStatus: 'Employed',
        jobRole: 'CNC Milling & Robotics Apprentice',
        salaryRange: '₹16,500 / month',
        notes: 'Offered permanent role post-apprenticeship in October 2026.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Fanuc vs Siemens Controller Conversion',
      'Shop Floor 5S & Kaizen Documentation'
    ],
    aiConfidenceLevel: 90,
    recommendedActions: [
      'Provide supplementary e-learning module on multi-axis CNC controllers.',
      'Track transition from NAPS apprentice to permanent payroll.'
    ]
  },
  {
    id: 'TRN-2026-8910',
    name: 'Sneha Ramesh Kulkarni',
    trainingProgram: 'Junior Cloud & Web Developer',
    programCode: 'IT-CLOUD-01',
    district: 'Nashik',
    division: 'Nashik',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '27 Feb 2026',
    gender: 'Female',
    enrolmentDate: '15 Jun 2025',
    completionDate: '25 Oct 2025',
    certificationDate: '10 Nov 2025',
    jobRole: 'Junior Frontend Cloud Associate',
    industry: 'Information Technology',
    employerType: 'Startup',
    employerName: 'KumbhTech Software Labs',
    employmentStartDate: '15 Dec 2025',
    salaryRange: '₹20,000 - ₹25,000 / month',
    monthlySalary: 22000,
    workLocation: 'Ambad MIDC, Nashik',
    timeline: [
      {
        stage: 'Enrolled in Program',
        date: '15 Jun 2025',
        status: 'Completed',
        description: 'Enrolled in IT-BPM youth track at Nashik Skill Innovation Center.',
        verifiedBy: 'IT Skill Council'
      },
      {
        stage: 'Training Started',
        date: '20 Jun 2025',
        status: 'Completed',
        description: 'React, TypeScript, REST APIs, and basic AWS cloud hosting.',
        verifiedBy: 'Biometric Attendance'
      },
      {
        stage: 'Training Completed',
        date: '25 Oct 2025',
        status: 'Completed',
        description: 'Built capstone public health booking portal.',
        verifiedBy: 'Technical Assessor Panel'
      },
      {
        stage: 'Certificate Issued',
        date: '10 Nov 2025',
        status: 'Completed',
        description: 'NASSCOM IT-ITeS SSC Certified.',
        verifiedBy: 'DigiLocker QR Hash: SHA-99F123'
      },
      {
        stage: 'Employment Follow-up',
        date: '15 Dec 2025',
        status: 'Completed',
        description: 'Joined local Nashik startup; working hybrid 3 days in office.',
        verifiedBy: 'EPFO UAN Linked: 101773910248'
      },
      {
        stage: 'Current Outcome: Retained (3 Months)',
        date: '27 Feb 2026',
        status: 'Active',
        description: 'EPFO contributions validated; active on GitHub enterprise repository.',
        verifiedBy: 'Direct EPFO API integration'
      }
    ],
    followUpHistory: [
      {
        date: '15 Jan 2026',
        employmentStatus: 'Employed',
        jobRole: 'Junior Frontend Cloud Associate',
        salaryRange: '₹22,000 / month',
        notes: 'Passed probation evaluation with flying colors.',
        retentionFlag: true
      },
      {
        date: '27 Feb 2026',
        employmentStatus: 'Employed',
        jobRole: 'Junior Frontend Cloud Associate',
        salaryRange: '₹22,000 / month',
        notes: 'Working on municipal smart governance dashboard.',
        retentionFlag: true
      }
    ],
    identifiedSkillGaps: [
      'Docker & Container Orchestration',
      'CI/CD Pipeline Troubleshooting'
    ],
    aiConfidenceLevel: 93,
    recommendedActions: [
      'Provide subsidized voucher for AWS Certified Cloud Practitioner exam.',
      'Invite as guest speaker for next Nashik ITI female cohort.'
    ]
  }
];

// Generate extra realistic trainees dynamically to allow extensive searching/filtering
export const ALL_TRAINEES_DATA: TraineeRecord[] = [
  ...SAMPLE_TRAINEES_DATA,
  // Additional trainees to simulate diverse districts and outcomes
  {
    id: 'TRN-2026-9021',
    name: 'Nilesh Vasantrao More',
    trainingProgram: 'Automotive Mechatronics Technician',
    programCode: 'AUTO-MECH-04',
    district: 'Chhatrapati Sambhajinagar',
    division: 'Chhatrapati Sambhajinagar',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '03 Mar 2026',
    gender: 'Male',
    enrolmentDate: '12 Jun 2025',
    completionDate: '18 Oct 2025',
    certificationDate: '30 Oct 2025',
    jobRole: 'Automated Assembly Operator',
    industry: 'Automotive',
    employerType: 'Large Enterprise',
    employerName: 'Bajaj Auto Ltd, Waluj',
    employmentStartDate: '20 Nov 2025',
    salaryRange: '₹21,000 - ₹24,000 / month',
    monthlySalary: 22500,
    workLocation: 'Waluj MIDC, Sambhajinagar',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Hydraulic Press Troubleshooting'],
    aiConfidenceLevel: 91,
    recommendedActions: ['Provide hydraulic calibration training']
  },
  {
    id: 'TRN-2026-9022',
    name: 'Tanvi Sachin Pawar',
    trainingProgram: 'Healthcare General Duty Assistant',
    programCode: 'HLTH-GDA-02',
    district: 'Thane',
    division: 'Konkan',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '02 Mar 2026',
    gender: 'Female',
    enrolmentDate: '05 Jul 2025',
    completionDate: '12 Nov 2025',
    certificationDate: '26 Nov 2025',
    jobRole: 'ICU Patient Care Assistant',
    industry: 'Healthcare',
    employerType: 'Large Enterprise',
    employerName: 'Jupiter Hospital, Thane',
    employmentStartDate: '10 Dec 2025',
    salaryRange: '₹20,000 - ₹23,000 / month',
    monthlySalary: 21000,
    workLocation: 'Thane West',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Ventilator Interface Operation'],
    aiConfidenceLevel: 94,
    recommendedActions: ['Advanced critical care micro-certification']
  },
  {
    id: 'TRN-2026-9023',
    name: 'Manoj Devidas Chavan',
    trainingProgram: 'Solar PV Rooftop Grid Installer',
    programCode: 'GRN-SOLAR-02',
    district: 'Jalgaon',
    division: 'Nashik',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Seeking Employment',
    lastFollowUp: '20 Feb 2026',
    gender: 'Male',
    enrolmentDate: '20 Jun 2025',
    completionDate: '28 Oct 2025',
    certificationDate: '14 Nov 2025',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Inverter High-Voltage Safety', 'Local Client Sourcing'],
    aiConfidenceLevel: 87,
    recommendedActions: ['Connect with Jalgaon Solar Rooftop Contractor Empanelment']
  },
  {
    id: 'TRN-2026-9024',
    name: 'Priyanka Ashok Kamble',
    trainingProgram: 'Digital Jacquard Weaving & Design',
    programCode: 'TEX-JACQ-01',
    district: 'Satara',
    division: 'Pune',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '26 Feb 2026',
    gender: 'Female',
    enrolmentDate: '10 May 2025',
    completionDate: '18 Sep 2025',
    certificationDate: '02 Oct 2025',
    jobRole: 'Pattern CAD Operator',
    industry: 'Textiles',
    employerType: 'MSME',
    employerName: 'Wai Textile Mills Pvt Ltd',
    employmentStartDate: '01 Nov 2025',
    salaryRange: '₹16,000 - ₹19,000 / month',
    monthlySalary: 17500,
    workLocation: 'Wai, Satara',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Organic Dye Formulation'],
    aiConfidenceLevel: 89,
    recommendedActions: ['Schedule sustainable textile finishing refresher']
  },
  {
    id: 'TRN-2026-9025',
    name: 'Arjun Rameshwar Gite',
    trainingProgram: 'Precision Agriculture & Drip Technician',
    programCode: 'AGR-DRIP-02',
    district: 'Yavatmal',
    division: 'Amravati',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Self-Employed',
    lastFollowUp: '24 Feb 2026',
    gender: 'Male',
    enrolmentDate: '01 Jul 2025',
    completionDate: '30 Oct 2025',
    certificationDate: '15 Nov 2025',
    businessType: 'Cotton Belt Drip Irrigation Repair & AMC Clinic',
    businessStartDate: '01 Dec 2025',
    incomeRange: '₹15,000 - ₹19,000 / month',
    udyamRegistration: 'UDYAM-MH-33-009124',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Credit Accounting & Invoice GST'],
    aiConfidenceLevel: 92,
    recommendedActions: ['Link with PMFME micro-enterprise support subsidy']
  },
  {
    id: 'TRN-2026-9026',
    name: 'Fatima Abdul Qureshi',
    trainingProgram: 'Junior Cloud & Web Developer',
    programCode: 'IT-CLOUD-01',
    district: 'Mumbai',
    division: 'Konkan',
    trainingStatus: 'Completed',
    certificateStatus: 'Certified',
    employmentStatus: 'Employed',
    lastFollowUp: '04 Mar 2026',
    gender: 'Female',
    enrolmentDate: '01 Jun 2025',
    completionDate: '10 Oct 2025',
    certificationDate: '25 Oct 2025',
    jobRole: 'QA Test Automation Engineer',
    industry: 'IT & FinTech',
    employerType: 'Large Enterprise',
    employerName: 'TCS Siruseri / Vikhroli Campus',
    employmentStartDate: '15 Nov 2025',
    salaryRange: '₹26,000 - ₹30,000 / month',
    monthlySalary: 28000,
    workLocation: 'Vikhroli, Mumbai',
    timeline: [],
    followUpHistory: [],
    identifiedSkillGaps: ['Cypress & Playwright API Mocking'],
    aiConfidenceLevel: 95,
    recommendedActions: ['Approve fast-track FinTech compliance certification']
  }
];

// ==========================================
// 8. PRIORITY INTERVENTION AREAS (Screen 7)
// ==========================================
export const PRIORITY_INTERVENTIONS: PriorityIntervention[] = [
  {
    id: 'p-int-1',
    skillGap: 'Lack of Practical Machine Rig & Shop-floor Experience',
    category: 'Practical Experience',
    affectedTrainees: 4890,
    severity: 'Critical',
    recommendedAction: 'Mandate employer-linked practical co-op apprenticeships and establish 15 regional Industrial Testing Labs.',
    expectedImpact: '+14.2% lift in first-round industrial job offer conversion',
    districts: ['Pune', 'Kolhapur', 'Chhatrapati Sambhajinagar', 'Nashik']
  },
  {
    id: 'p-int-2',
    skillGap: 'Workplace Communication & English Terminology Barrier',
    category: 'Communication',
    affectedTrainees: 5420,
    severity: 'High',
    recommendedAction: 'Incorporate 40-hour communicative vernacular-to-English workplace simulation modules in all ITIs.',
    expectedImpact: '+18.5% improvement in technical customer support and sales placements',
    districts: ['Nagpur', 'Nanded', 'Amravati', 'Solapur', 'Dhule']
  },
  {
    id: 'p-int-3',
    skillGap: 'Digital Warehouse ERP & Barcode Software Unfamiliarity',
    category: 'Digital Literacy',
    affectedTrainees: 3740,
    severity: 'High',
    recommendedAction: 'Deploy standardized open-source Warehouse Management System (WMS) simulators across logistics training providers.',
    expectedImpact: '+12.0% faster time to employment in major logistics corridors (Bhiwandi, MIHAN, Chakan)',
    districts: ['Thane', 'Nagpur', 'Raigad', 'Pune']
  },
  {
    id: 'p-int-4',
    skillGap: 'Electric Vehicle (EV) & Solar String Inverter Diagnostics',
    category: 'Technical Skills',
    affectedTrainees: 2980,
    severity: 'Moderate',
    recommendedAction: 'Partner with ASDC and Skill Council for Green Jobs to provide 48V/400V safety certified trainer credentials.',
    expectedImpact: '+22.4% increase in entry wages for clean mobility technicians',
    districts: ['Pune', 'Ahmednagar', 'Osmanabad/Dharashiv', 'Jalgaon']
  },
  {
    id: 'p-int-5',
    skillGap: 'Interview Demeanor & Salary Expectation Misalignment',
    category: 'Interview Readiness',
    affectedTrainees: 2410,
    severity: 'Moderate',
    recommendedAction: 'Mandatory pre-placement bootcamps with AI mock video interviews and industry compensation benchmarking.',
    expectedImpact: '-16 days reduction in average time to employment',
    districts: ['Beed', 'Latur', 'Parbhani', 'Yavatmal', 'Gadchiroli']
  }
];

// ==========================================
// 9. AI INSIGHTS & RECOMMENDATIONS (Screen 8)
// Labeled clearly as "Demo AI Insight"
// ==========================================
export const AI_INSIGHTS_DATA: AIInsightItem[] = [
  // Category A: Predictive Insights
  {
    id: 'ai-pred-1',
    category: 'Predictive',
    title: 'Post-Placement 90-Day Attrition Risk in Precision Agriculture',
    explanation: 'Algorithmic regression indicates that candidates placed beyond 45 km from their hometowns in seasonal agri-allied roles have an estimated 48.6% drop-off risk within 90 days due to travel cost asymmetry.',
    supportingMetric: '48.6% predicted 90-day attrition without travel allowance',
    confidenceLevel: 92,
    recommendedAction: 'Institute a 90-day ₹2,500/month rural transit allowance or mandate local village-level clustering for agro-machinery technicians.',
    affectedPrograms: ['Precision Agriculture & Drip Technician (AGR-DRIP-02)'],
    riskLevel: 'High',
    expectedLift: '+16.5% 6-month retention rate'
  },
  {
    id: 'ai-pred-2',
    category: 'Predictive',
    title: 'EV Powertrain Hiring Surge in Western Maharashtra Corridor',
    explanation: 'Analysis of 1,420 industrial expansion filings in Pune, Chakan, and Talegaon projects a 64% increase in demand for battery assembly technicians by Q3 2026.',
    supportingMetric: '+64% projected vacancy surge across Tier-1 auto suppliers',
    confidenceLevel: 94,
    recommendedAction: 'Double batch capacity for Automotive Mechatronics (AUTO-MECH-04) and sanction EV training test-beds in 12 western Maharashtra ITIs.',
    affectedPrograms: ['Automotive Mechatronics Technician (AUTO-MECH-04)'],
    riskLevel: 'Low',
    expectedLift: '+3,200 additional formal wage jobs'
  },

  // Category B: Diagnostic Insights
  {
    id: 'ai-diag-1',
    category: 'Diagnostic',
    title: 'Certification-to-Employment Bottleneck in Solapur & Marathwada',
    explanation: 'While Solapur achieves an 80% certification rate, wage employment lags at 52%. Diagnostic correlation reveals that local mills prioritize traditional piece-rate contracts over formal payroll, leading to high seeking status.',
    supportingMetric: '28% divergence between certification rate and wage placement',
    confidenceLevel: 91,
    recommendedAction: 'Deploy Udyam enterprise registration desks at exam centers to formalize self-employed weavers into registered proprietorships with credit linkage.',
    affectedPrograms: ['Digital Jacquard Weaving & Design (TEX-JACQ-01)'],
    riskLevel: 'High',
    expectedLift: '+24.0% self-employment formalization'
  },
  {
    id: 'ai-diag-2',
    category: 'Diagnostic',
    title: 'Tracking Leakage Hotspot Identified in Nandurbar & Gadchiroli',
    explanation: 'Over 12% of certified candidates in tribal districts are currently classified as "Not Reported". Telemetric analysis shows that seasonal interstate migration causes SIM turnover and contact breakdown.',
    supportingMetric: '12.4% unrecorded outcome leakage in border tribal districts',
    confidenceLevel: 88,
    recommendedAction: 'Activate automated EPFO/DigiLocker reverse webhook lookup and assign local Gram Rozgar Sahayaks for quarterly physical audit.',
    affectedPrograms: ['Solar PV Rooftop Grid Installer', 'Healthcare General Duty Assistant'],
    riskLevel: 'High',
    expectedLift: '-75% reduction in untraceable candidate records'
  },

  // Category C: Prescriptive Insights
  {
    id: 'ai-pres-1',
    category: 'Prescriptive',
    title: 'Dual Apprenticeship Model Transition for Industrial Automation',
    explanation: 'Prescriptive modeling indicates shifting the final 30% of classroom curriculum to on-the-job NAPS stipendiary apprenticeships increases 12-month wage retention from 71% to 88.5%.',
    supportingMetric: '+17.5% net outcome lift through co-op apprenticeship mandate',
    confidenceLevel: 95,
    recommendedAction: 'Restructure IND-ROBO-03 into a 4-month classroom + 8-month shop floor dual apprenticeship with guaranteed stipend co-funding.',
    affectedPrograms: ['Industrial Automation & Robotics Operator (IND-ROBO-03)'],
    riskLevel: 'Medium',
    expectedLift: '+17.5% longitudinal retention'
  },
  {
    id: 'ai-pres-2',
    category: 'Prescriptive',
    title: 'English & Soft-Skills Bridge Injection for Cloud & IT Cadres',
    explanation: 'Interview transcripts and rejection analytics show 62% of technical interview failures in Tier-2 districts (Nashik, Nanded) are caused by verbal communication hesitation rather than coding deficits.',
    supportingMetric: '62% of corporate rejection reasons linked to soft-skill friction',
    confidenceLevel: 93,
    recommendedAction: 'Mandate a mandatory 2-week immersive business English & presentation sprint before releasing candidate profiles to corporate recruiters.',
    affectedPrograms: ['Junior Cloud & Web Developer (IT-CLOUD-01)'],
    riskLevel: 'Medium',
    expectedLift: '+21.0% first-round campus interview clearance'
  }
];

// Employment Risk by Training Program (for AI Insights screen bar chart)
export const PROGRAM_EMPLOYMENT_RISK_DATA = [
  { program: 'Precision Agriculture', riskScore: 78, employmentRate: 40.8, benchmark: 68.2, level: 'High Risk' },
  { program: 'Textile Jacquard', riskScore: 65, employmentRate: 52.0, benchmark: 68.2, level: 'High Risk' },
  { program: 'Logistics Operations', riskScore: 44, employmentRate: 60.0, benchmark: 68.2, level: 'Moderate' },
  { program: 'Solar PV Installer', riskScore: 40, employmentRate: 62.0, benchmark: 68.2, level: 'Moderate' },
  { program: 'Junior Cloud Dev', riskScore: 32, employmentRate: 67.0, benchmark: 68.2, level: 'Moderate' },
  { program: 'Robotics Operator', riskScore: 24, employmentRate: 73.0, benchmark: 68.2, level: 'Low Risk' },
  { program: 'Healthcare GDA', riskScore: 20, employmentRate: 74.0, benchmark: 68.2, level: 'Low Risk' },
  { program: 'Auto Mechatronics', riskScore: 16, employmentRate: 77.0, benchmark: 68.2, level: 'Low Risk' }
];

// Recommended Intervention Impact (Current vs Expected Outcome)
export const INTERVENTION_IMPACT_DATA = [
  { metric: 'Overall Employment Rate', current: 68.2, projected: 78.5, lift: '+10.3%' },
  { metric: '6-Month Retention Rate', current: 74.8, projected: 85.0, lift: '+10.2%' },
  { metric: 'Avg Time to Employment (Days)', current: 42, projected: 26, lift: '-16 Days' },
  { metric: 'EPFO Verification Rate', current: 84.6, projected: 95.0, lift: '+10.4%' },
  { metric: 'Untraceable Leakage Rate', current: 9.8, projected: 2.5, lift: '-7.3%' }
];

// ==========================================
// 10. REPORT TEMPLATES DATA (Screen 9)
// ==========================================
export const REPORT_TEMPLATES: ReportItem[] = [
  {
    id: 'rep-outcomes',
    name: 'Statewide Employment Outcome Audit Report',
    code: 'REP-EMP-OUT-2026',
    description: 'Comprehensive audit analyzing certification-to-employment conversion, formal wage EPFO records, and 6-month retention rates across all districts.',
    category: 'Outcomes',
    lastGeneratedDate: '02 Mar 2026, 09:30 AM',
    fileSize: '4.8 MB (CSV / PDF)',
    totalRecordsCount: 20136
  },
  {
    id: 'rep-programs',
    name: 'Training Program Performance & ROI Evaluation',
    code: 'REP-PROG-ROI-2026',
    description: 'Provider-by-provider benchmarking of course completion, placement efficiency, starting salaries, and drop-off leakage stages.',
    category: 'Programs',
    lastGeneratedDate: '28 Feb 2026, 04:15 PM',
    fileSize: '2.4 MB (CSV / PDF)',
    totalRecordsCount: 8
  },
  {
    id: 'rep-skillgaps',
    name: 'District Skill Deficit & Industrial Mismatch Dossier',
    code: 'REP-SKILL-GAP-2026',
    description: 'Diagnostic assessment of employer rejection reasons, categorized by soft skills, practical machinery rig access, and digital literacy deficits.',
    category: 'Skill Gaps',
    lastGeneratedDate: '01 Mar 2026, 11:00 AM',
    fileSize: '3.1 MB (CSV / PDF)',
    totalRecordsCount: 6
  },
  {
    id: 'rep-districts',
    name: 'Maharashtra 36-District Skilling Governance Index',
    code: 'REP-DIST-GOV-2026',
    description: 'Comparative choropleth ranking of all 36 administrative districts evaluating employment rate, female participation, and average starting wage.',
    category: 'Districts',
    lastGeneratedDate: '03 Mar 2026, 08:00 AM',
    fileSize: '1.9 MB (CSV / PDF)',
    totalRecordsCount: 36
  },
  {
    id: 'rep-retention',
    name: 'Longitudinal Workforce Retention & Attrition Tracker',
    code: 'REP-RET-LONG-2026',
    description: 'Cohort tracking analysis monitoring 30-day, 90-day, 180-day, and 365-day job continuity using live EPFO electronic challan returns.',
    category: 'Retention',
    lastGeneratedDate: '25 Feb 2026, 02:45 PM',
    fileSize: '5.2 MB (CSV / PDF)',
    totalRecordsCount: 13733
  }
];

// District comparison summary for Reports & AI
export const TOP_PERFORMING_DISTRICTS_SUMMARY = [
  { name: 'Mumbai', division: 'Konkan', employmentRate: 78.5, completionRate: 90.9, retentionRate: 84.2, avgSalary: 23200 },
  { name: 'Pune', division: 'Pune', employmentRate: 72.4, completionRate: 89.0, retentionRate: 81.6, avgSalary: 21500 },
  { name: 'Thane', division: 'Konkan', employmentRate: 71.8, completionRate: 88.5, retentionRate: 80.2, avgSalary: 20800 },
  { name: 'Nagpur', division: 'Nagpur', employmentRate: 69.2, completionRate: 87.2, retentionRate: 78.5, avgSalary: 19400 },
  { name: 'Kolhapur', division: 'Pune', employmentRate: 68.0, completionRate: 86.4, retentionRate: 76.0, avgSalary: 18200 },
  { name: 'Nashik', division: 'Nashik', employmentRate: 67.5, completionRate: 86.0, retentionRate: 75.8, avgSalary: 18900 }
];

export const ATTENTION_DISTRICTS_SUMMARY = [
  { name: 'Gadchiroli', division: 'Nagpur', employmentRate: 51.5, completionRate: 78.8, retentionRate: 59.0, avgSalary: 14800, topDeficit: 'Lack of local formal industries & travel friction' },
  { name: 'Beed', division: 'Sambhajinagar', employmentRate: 53.0, completionRate: 79.5, retentionRate: 60.5, avgSalary: 14200, topDeficit: 'Seasonal agro-migration & unpaid apprentice contracts' },
  { name: 'Nandurbar', division: 'Nashik', employmentRate: 52.8, completionRate: 77.2, retentionRate: 58.4, avgSalary: 13900, topDeficit: 'Interstate border migration & tracking leakage' },
  { name: 'Washim', division: 'Amravati', employmentRate: 54.2, completionRate: 80.1, retentionRate: 61.0, avgSalary: 14400, topDeficit: 'Absence of MIDC large industrial anchor employers' },
  { name: 'Yavatmal', division: 'Amravati', employmentRate: 55.4, completionRate: 81.0, retentionRate: 62.4, avgSalary: 14600, topDeficit: 'Low credit linkage for micro-enterprises' }
];

export const TIME_TO_EMPLOYMENT_DATA = [
  { range: '< 30 Days', percentage: 41.2, trainees: 5658 },
  { range: '30-60 Days', percentage: 34.6, trainees: 4752 },
  { range: '60-90 Days', percentage: 15.8, trainees: 2170 },
  { range: '> 90 Days', percentage: 8.4, trainees: 1153 }
];

export const EMPLOYMENT_DISTRIBUTION_STACKED = [
  { category: 'Formal Wage', count: 11518, percentage: 57.2 },
  { category: 'Self-Employed', count: 2215, percentage: 11.0 },
  { category: 'Seeking Placement', count: 4430, percentage: 22.0 },
  { category: 'Unreported', count: 1973, percentage: 9.8 }
];

export const DISTRICT_SKILL_INTENSITY = [
  { district: 'Pune', intensity: 34.5, topDeficit: 'EV & PLC Automation' },
  { district: 'Nashik', intensity: 46.2, topDeficit: 'CNC Practical Tooling' },
  { district: 'Chhatrapati Sambhajinagar', intensity: 48.0, topDeficit: 'Communication & ERP' },
  { district: 'Nagpur', intensity: 42.5, topDeficit: 'Digital Logistics' },
  { district: 'Amravati', intensity: 58.0, topDeficit: 'Apprenticeship Access' },
  { district: 'Nandurbar', intensity: 64.0, topDeficit: 'Heavy Machinery Rig Exposure' }
];

export const SECTOR_MISMATCH_DATA = [
  { sector: 'Automotive & EV', traineesProduced: 4200, industryVacancies: 5800 },
  { sector: 'Healthcare GDA', traineesProduced: 3600, industryVacancies: 6200 },
  { sector: 'IT & Cloud', traineesProduced: 3800, industryVacancies: 3400 },
  { sector: 'Solar PV', traineesProduced: 3100, industryVacancies: 4100 },
  { sector: 'Office / Data Entry', traineesProduced: 5600, industryVacancies: 1800 }
];

export const POLICY_REFORM_PACKAGES = [
  { 
    id: 'pi-1', 
    title: 'Mandatory 30-Day Apprenticeship Tie-Up', 
    targetSector: 'Automotive & Manufacturing', 
    impactLevel: 'High Impact', 
    description: 'Requires training providers to partner with MIDC manufacturing units for 30 days on-site machine exposure before certifying.', 
    timeline: 'Q1 FY26', 
    expectedOutcome: '+18.5% Placement' 
  },
  { 
    id: 'pi-2', 
    title: 'Spoken English & Workplace Communication Bridge', 
    targetSector: 'IT, Healthcare & Retail', 
    impactLevel: 'High Impact', 
    description: 'Integrates an intensive 40-hour communicative English & mock interview module into all diploma and ITI curricula.', 
    timeline: 'Immediate', 
    expectedOutcome: '+14.2% Placement' 
  },
  { 
    id: 'pi-3', 
    title: 'Mobile Skill Simulation Vans for Rural Clusters', 
    targetSector: 'Agriculture & Construction', 
    impactLevel: 'Medium Impact', 
    description: 'Deploys 18 mobile training vans equipped with computerized hydraulic and welding simulators to Nandurbar, Gadchiroli, and Washim.', 
    timeline: 'Q2 FY26', 
    expectedOutcome: '+22.0% Rural Retention' 
  },
  { 
    id: 'pi-4', 
    title: 'Dual Certification with Sector Skill Councils', 
    targetSector: 'Green Energy & Electronics', 
    impactLevel: 'High Impact', 
    description: 'Co-certification directly backed by ASDC and ESSCI to guarantee employer recognition across state borders.', 
    timeline: 'Q3 FY26', 
    expectedOutcome: '+11.0% Wage Increment' 
  }
];


