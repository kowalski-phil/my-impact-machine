import React from 'react';
import { Project, User } from '../types';
import { calculateAggregatedResults } from '../utils/projectManager';
import { formatTime } from '../utils/calculations';
import ProjectCard from './ProjectCard';
import { FaPlus, FaClock, FaChartPie, FaProjectDiagram } from 'react-icons/fa';

interface ProjectsDashboardProps {
  projects: Project[];
  user: User;
  onViewProject: (projectId: string) => void;
  onNewProject: () => void;
  onLogout: () => void;
}

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ 
  projects, 
  user, 
  onViewProject, 
  onNewProject,
  onLogout
}) => {
  const { totalSavedTime, averageImpactScore, totalProjects } = calculateAggregatedResults(projects);
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Deine Projekte</h1>
        <button 
          onClick={onNewProject}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition shadow-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Neues Projekt
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Gesamtergebnisse
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <FaClock className="text-white text-xl" />
              </div>
              <p className="text-lg text-gray-700">Gesamtzeitersparnis pro Jahr</p>
            </div>
            <p className="text-3xl font-bold text-primary">{formatTime(totalSavedTime)}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <FaChartPie className="text-white text-xl" />
              </div>
              <p className="text-lg text-gray-700">Durchschnittlicher Impact Score</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{averageImpactScore}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <FaProjectDiagram className="text-white text-xl" />
              </div>
              <p className="text-lg text-gray-700">Anzahl der Projekte</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">{totalProjects}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Meine Projekte
        </h2>
      </div>
      
      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <div className="bg-gray-100 p-5 rounded-full inline-flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <p className="text-gray-600 mb-6">Du hast noch keine Projekte angelegt. Starte jetzt und dokumentiere deine Erfolge!</p>
          <button 
            onClick={onNewProject}
            className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center mx-auto"
          >
            <FaPlus className="mr-2" />
            Erstes Projekt erstellen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => onViewProject(project.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard; 