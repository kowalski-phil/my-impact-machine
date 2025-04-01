import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NewProject from './components/NewProject';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import { Project, User } from './types';

// Separate Komponente für die Projektdetails-Seite
const ProjectDetailsPage: React.FC<{
  projects: Project[],
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
}> = ({ projects, onEdit, onDelete }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  // Wenn keine ID vorhanden ist, zurück zur Startseite
  if (!id) {
    return <Navigate to="/" />;
  }
  
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700">Project not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-[#0074D9] text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <ProjectDetails 
      project={project}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

// Eine wrapper-Komponente, die das Routing innerhalb des Router-Kontexts handhabt
const AppRoutes: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Berechne die aggregierten Werte
  const totalTimeSavings = projects.reduce((sum, project) => 
    sum + project.results.timeSavingPerYear, 0);
  
  const averageImpactScore = projects.length > 0
    ? projects.reduce((sum, project) => sum + project.results.impactScore, 0) / projects.length
    : 0;

  const handleSaveProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
    navigate('/');
  };

  const handleLogin = () => {
    // Implementiere Login-Logik hier
    console.log('Login clicked');
  };

  const handleLogout = () => {
    setUser(null);
    // Weitere Logout-Logik hier
    console.log('Logout clicked');
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/project/${projectId}/edit`);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        isLoggedIn={!!user}
        onLoginClick={handleLogin}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <Dashboard 
              projects={projects}
              totalTimeSavings={totalTimeSavings * 60} // Konvertiere zu Minuten für formatTime
              averageImpactScore={Math.round(averageImpactScore)}
            />
          } />
          <Route path="/new-project" element={
            <NewProject 
              user={user}
              onSave={handleSaveProject}
              onCancel={() => navigate('/')}
              mode="create"
            />
          } />
          <Route 
            path="/project/:id" 
            element={
              <ProjectDetailsPage 
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Wir benötigen einen zusätzlichen Wrapper, da wir useNavigate nicht direkt in App verwenden können
const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App; 