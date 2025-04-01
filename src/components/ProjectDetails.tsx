import React from 'react';
import { Project } from '../types';
import { formatTime } from '../utils/calculations';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ProjectDetailsProps {
  project: Project;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{project.formData.workflowName}</h2>
          <p className="text-gray-600 mt-2">{project.formData.workflowDescription}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project.id)}
            className="p-2 text-gray-600 hover:text-[#0074D9] transition"
            aria-label="Edit project"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 text-gray-600 hover:text-red-500 transition"
            aria-label="Delete project"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Process Time</h3>
            <div className="flex justify-between">
              <span>Before:</span>
              <span>{project.formData.timeBefore} min</span>
            </div>
            <div className="flex justify-between">
              <span>After:</span>
              <span>{project.formData.timeAfter} min</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Time Savings</h3>
            <div className="flex justify-between">
              <span>Per Process:</span>
              <span>{project.results.timeSavingPerProcess} min</span>
            </div>
            <div className="flex justify-between">
              <span>Per Month:</span>
              <span>{formatTime(project.results.timeSavingPerMonth * 60)}</span>
            </div>
            <div className="flex justify-between">
              <span>Per Year:</span>
              <span>{formatTime(project.results.timeSavingPerYear * 60)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Error Rates</h3>
            <div className="flex justify-between">
              <span>Before:</span>
              <span>{project.formData.errorRateBefore}%</span>
            </div>
            <div className="flex justify-between">
              <span>After:</span>
              <span>{project.formData.errorRateAfter}%</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Improvement:</span>
              <span>{project.results.errorReductionPercentage}%</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Team Impact</h3>
            <div className="flex justify-between">
              <span>Team Size:</span>
              <span>{project.formData.affectedPersons}</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency:</span>
              <span>{project.formData.executionsPerMonth}x per month</span>
            </div>
            <div className="flex justify-between">
              <span>Team Time Saved:</span>
              <span>{formatTime(project.results.teamTimeSavingPerYear * 60)}</span>
            </div>
          </div>
        </div>
      </div>

      {project.formData.colleagueFeedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Colleague Feedback</h3>
          <p className="italic text-gray-600">"{project.formData.colleagueFeedback}"</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails; 