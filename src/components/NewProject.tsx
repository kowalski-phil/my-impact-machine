import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData, Project, User } from '../types';
import InputForm from './InputForm';
import { createProject, updateProject } from '../utils/projectManager';
import { FaArrowLeft } from 'react-icons/fa';
import { NEW_PROJECT_TEXTS } from '../constants';

interface NewProjectProps {
  user: User | null;
  initialData?: FormData;
  projectId?: string;
  onSave: (project: Project) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const NewProject: React.FC<NewProjectProps> = ({ 
  user, 
  initialData, 
  projectId,
  onSave, 
  onCancel,
  mode 
}) => {
  const navigate = useNavigate();

  const handleSubmit = (formData: FormData) => {
    try {
      if (mode === 'edit' && projectId) {
        const updatedProject = updateProject(user?.email || '', projectId, formData);
        onSave(updatedProject);
      } else {
        const newProject = createProject(user?.email || '', formData);
        onSave(newProject);
      }
      // Nach erfolgreichem Speichern zur Dashboard-Seite navigieren
      navigate('/');
    } catch (error) {
      console.error('Error saving project:', error);
      // Hier könnte eine Fehlerbehandlung hinzugefügt werden
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={onCancel}
          className="flex items-center mr-4 text-gray-600 hover:text-[#0074D9] transition"
          aria-label={NEW_PROJECT_TEXTS.backButton}
        >
          <FaArrowLeft className="mr-2" />
          <span>{NEW_PROJECT_TEXTS.backButton}</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {mode === 'create' ? NEW_PROJECT_TEXTS.createTitle : NEW_PROJECT_TEXTS.editTitle}
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <InputForm 
          onSubmit={handleSubmit} 
          initialData={initialData}
          submitButtonText={mode === 'create' ? NEW_PROJECT_TEXTS.createButton : NEW_PROJECT_TEXTS.saveButton}
        />
      </div>
    </div>
  );
};

export default NewProject; 