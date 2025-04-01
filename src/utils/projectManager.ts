import { Project, FormData, CalculationResult } from '../types';
import { calculateResults } from './calculations';

// Hilfsfunktion zur Generierung einer zufälligen ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Projekt-Speicher im Local Storage
const PROJECTS_STORAGE_KEY = 'impactMachineProjects';

// Projekte für einen Benutzer laden
export const loadProjects = (userEmail: string): Project[] => {
  try {
    const projectsJson = localStorage.getItem(`${PROJECTS_STORAGE_KEY}_${userEmail}`);
    if (!projectsJson) return [];
    
    return JSON.parse(projectsJson);
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
};

// Projekte für einen Benutzer speichern
export const saveProjects = (userEmail: string, projects: Project[]): void => {
  try {
    localStorage.setItem(`${PROJECTS_STORAGE_KEY}_${userEmail}`, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

// Neues Projekt erstellen
export const createProject = (userEmail: string, formData: FormData): Project => {
  const results = calculateResults(formData);
  const now = new Date().toISOString();
  
  const newProject: Project = {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    formData,
    results
  };
  
  const currentProjects = loadProjects(userEmail);
  saveProjects(userEmail, [...currentProjects, newProject]);
  
  return newProject;
};

// Projekt löschen
export const deleteProject = (userEmail: string, projectId: string): void => {
  const currentProjects = loadProjects(userEmail);
  const updatedProjects = currentProjects.filter(project => project.id !== projectId);
  saveProjects(userEmail, updatedProjects);
};

// Projekt aktualisieren
export const updateProject = (userEmail: string, projectId: string, formData: FormData): Project => {
  const results = calculateResults(formData);
  
  const updatedProject: Project = {
    id: projectId,
    createdAt: new Date().toISOString(), // We should actually keep the original createdAt
    updatedAt: new Date().toISOString(),
    formData,
    results
  };
  
  const currentProjects = loadProjects(userEmail);
  const updatedProjects = currentProjects.map(project => 
    project.id === projectId ? {
      ...updatedProject,
      createdAt: project.createdAt // Preserve the original creation date
    } : project
  );
  
  saveProjects(userEmail, updatedProjects);
  
  return updatedProject;
};

// Aggregierte Werte für alle Projekte berechnen
export const calculateAggregatedResults = (projects: Project[]) => {
  const totalSavedTime = projects.reduce((sum, project) => 
    sum + project.results.timeSavingPerYear, 0);
  
  const averageImpactScore = projects.length > 0
    ? projects.reduce((sum, project) => sum + project.results.impactScore, 0) / projects.length
    : 0;

  return {
    totalSavedTime: totalSavedTime * 60, // Convert hours to minutes for formatTime function
    averageImpactScore: Math.round(averageImpactScore),
    totalProjects: projects.length
  };
}; 