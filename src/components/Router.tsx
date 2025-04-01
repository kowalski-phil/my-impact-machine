import React, { useState } from 'react';
import ProjectsDashboard from './ProjectsDashboard';
import ProjectDetail from './ProjectDetail';
import NewProject from './NewProject';
import { Project, User } from '../types';
import { loadProjects, createProject, updateProject, deleteProject } from '../utils/projectManager';

interface RouterProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'detail' | 'new' | 'edit';

const Router: React.FC<RouterProps> = ({ user, onLogout }) => {
  const [view, setView] = useState<View>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => loadProjects(user.email));
  
  const handleCreateProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
    setView('dashboard');
  };
  
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setView('detail');
    setSelectedProjectId(updatedProject.id);
  };
  
  const handleDeleteProject = (projectId: string) => {
    deleteProject(user.email, projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setView('dashboard');
  };
  
  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setView('detail');
  };
  
  const handleNewProject = () => {
    setView('new');
  };
  
  const handleEditProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setView('edit');
  };
  
  const handleBackToDashboard = () => {
    setView('dashboard');
  };
  
  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) || null
    : null;
  
  switch (view) {
    case 'dashboard':
      return (
        <ProjectsDashboard 
          projects={projects} 
          user={user}
          onViewProject={handleViewProject}
          onNewProject={handleNewProject}
          onLogout={onLogout}
        />
      );
    case 'detail':
      return selectedProject ? (
        <ProjectDetail 
          project={selectedProject}
          onBack={handleBackToDashboard}
          onEdit={() => handleEditProject(selectedProject.id)}
          onDelete={() => handleDeleteProject(selectedProject.id)}
        />
      ) : (
        <div>Projekt nicht gefunden</div>
      );
    case 'new':
      return (
        <NewProject 
          user={user}
          onSave={handleCreateProject}
          onCancel={handleBackToDashboard}
          mode="create"
        />
      );
    case 'edit':
      return selectedProject ? (
        <NewProject 
          user={user}
          initialData={selectedProject.formData}
          projectId={selectedProject.id}
          onSave={handleUpdateProject}
          onCancel={() => {
            setView('detail');
            setSelectedProjectId(selectedProject.id);
          }}
          mode="edit"
        />
      ) : (
        <div>Projekt nicht gefunden</div>
      );
    default:
      return <div>Unbekannte Ansicht</div>;
  }
};

export default Router; 