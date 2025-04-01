import React, { useState } from 'react';
import InputForm from './InputForm';
import ResultsPanel from './ResultsPanel';
import Badges from './Badges';
import { FormData, CalculationResult, Project } from '../types';
import { calculateResults, formatTime } from '../utils/calculations';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { DASHBOARD_TEXTS } from '../constants';

interface DashboardProps {
  projects: Project[];
  totalTimeSavings: number;
  averageImpactScore: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  projects, 
  totalTimeSavings, 
  averageImpactScore 
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleCalculation = (data: FormData) => {
    const results = calculateResults(data);
    setFormData(data);
  };

  const handleProjectClick = (projectId: string) => {
    // Implementation of handleProjectClick
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{DASHBOARD_TEXTS.title}</h2>
        <Link 
          to="/new-project" 
          className="inline-flex items-center px-4 py-2 bg-[#0074D9] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          {DASHBOARD_TEXTS.newProject}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{DASHBOARD_TEXTS.stats.timeSavings}</h3>
          <p className="text-3xl font-bold text-[#0074D9]">{formatTime(totalTimeSavings)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{DASHBOARD_TEXTS.stats.impactScore}</h3>
          <p className="text-3xl font-bold text-[#0074D9]">{averageImpactScore}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{DASHBOARD_TEXTS.stats.projectCount}</h3>
          <p className="text-3xl font-bold text-[#0074D9]">{projects.length}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">My Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 