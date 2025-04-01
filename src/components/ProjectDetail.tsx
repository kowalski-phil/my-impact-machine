import React from 'react';
import { Project } from '../types';
import ResultsPanel from './ResultsPanel';
import { formatDate } from '../utils/helpers';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onEdit, onDelete }) => {
  const confirmDelete = () => {
    if (window.confirm('Möchtest du dieses Projekt wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      onDelete();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center mr-4 text-gray-600 hover:text-primary transition"
          aria-label="Zurück"
        >
          <FaArrowLeft className="mr-2" />
          <span>Zurück zur Übersicht</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">{project.formData.workflowName}</h1>
            <p className="text-gray-600">
              <span className="font-medium">Erstellt am:</span> {formatDate(project.createdAt)}
            </p>
            {project.formData.workflowDescription && (
              <p className="text-gray-700 mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-primary">
                {project.formData.workflowDescription}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="flex items-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm"
              aria-label="Bearbeiten"
            >
              <FaEdit className="mr-2" />
              <span>Bearbeiten</span>
            </button>
            <button 
              onClick={confirmDelete}
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition shadow-sm"
              aria-label="Löschen"
            >
              <FaTrash className="mr-2" />
              <span>Löschen</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">Ausführungen pro Monat</p>
            <p className="text-xl font-semibold text-gray-800">{project.formData.executionsPerMonth}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">Betroffene Personen</p>
            <p className="text-xl font-semibold text-gray-800">{project.formData.affectedPersons}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">Zeitaufwand vorher</p>
            <p className="text-xl font-semibold text-gray-800">{project.formData.timeBefore} Min.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">Zeitaufwand nachher</p>
            <p className="text-xl font-semibold text-gray-800">{project.formData.timeAfter} Min.</p>
          </div>
        </div>
        
        <ResultsPanel 
          results={project.results} 
          formData={project.formData}
        />
      </div>
    </div>
  );
};

export default ProjectDetail; 