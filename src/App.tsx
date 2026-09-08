import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { TraineeOutcomesPage } from './pages/TraineeOutcomesPage';
import { TraineeDetailPage } from './pages/TraineeDetailPage';
import { TrainingProgramsPage } from './pages/TrainingProgramsPage';
import { EmploymentOutcomesPage } from './pages/EmploymentOutcomesPage';
import { MaharashtraMapPage } from './pages/MaharashtraMapPage';
import { SkillGapIntelligencePage } from './pages/SkillGapIntelligencePage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Screen 10: Login & Role Selection */}
        <Route path="/login" element={<LoginPage />} />

        {/* Core Government Dashboard Layout */}
        <Route path="/" element={<AppLayout />}>
          {/* Root redirect to Screen 1 */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Screen 1: Overview / Government Dashboard */}
          <Route path="dashboard" element={<DashboardOverviewPage />} />
          
          {/* Screen 2: Trainee Outcomes */}
          <Route path="trainees" element={<TraineeOutcomesPage />} />
          
          {/* Screen 3: Trainee Outcome Profile */}
          <Route path="trainees/:id" element={<TraineeDetailPage />} />
          
          {/* Screen 4: Training Program Performance */}
          <Route path="training-programs" element={<TrainingProgramsPage />} />
          
          {/* Screen 5: Employment Outcomes */}
          <Route path="employment-outcomes" element={<EmploymentOutcomesPage />} />
          
          {/* Screen 6: Maharashtra Skill Gap & Employment Map */}
          <Route path="map" element={<MaharashtraMapPage />} />
          
          {/* Screen 7: Skill Gap Intelligence */}
          <Route path="skill-gaps" element={<SkillGapIntelligencePage />} />
          
          {/* Screen 8: AI Insights & Recommendations */}
          <Route path="ai-insights" element={<AIInsightsPage />} />
          
          {/* Screen 9: Reports & Decision Support */}
          <Route path="reports" element={<ReportsPage />} />
          
          {/* Settings & System Architecture */}
          <Route path="settings" element={<SettingsPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
