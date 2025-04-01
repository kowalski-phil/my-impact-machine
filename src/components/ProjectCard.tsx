import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { FaClock, FaUsers, FaCalendar } from 'react-icons/fa';
import { formatTime } from '../utils/calculations';

interface ProjectCardProps {
  project: Project;
  onClick?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(project.id);
    } else {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <h3 className="text-xl font-semibold mb-2">{project.formData.workflowName}</h3>
      <p className="text-gray-600 mb-4">{project.formData.workflowDescription}</p>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-2 text-[#0074D9]" />
          <span>Monthly savings: {formatTime(project.results.timeSavingPerMonth * 60)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaUsers className="mr-2 text-[#0074D9]" />
          <span>Team size: {project.formData.affectedPersons}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaCalendar className="mr-2 text-[#0074D9]" />
          <span>Frequency: {project.formData.executionsPerMonth}x per month</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
          <span className="text-[#0074D9] font-medium hover:text-blue-700">View Details →</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 