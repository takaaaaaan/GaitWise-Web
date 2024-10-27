'use client'
import React, { useState } from 'react';
import {Project} from '@/../../types'


const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'Project Beta' },
    { id: 3, name: 'Project Gamma' },
    { id: 4, name: 'Project Delta' },
  ]);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = parseInt(event.target.value);
    const project = projects.find((proj) => proj.id === projectId) || null;
    setSelectedProject(project);
  };

  const handleAddProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Project ${String.fromCharCode(65 + projects.length)}`, // 자동으로 알파벳 순서 지정
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-medium mb-4">Select a Project</h2>
      <select
        id="project-select"
        onChange={handleProjectChange}
        value={selectedProject?.id || ''}
        className="w-60 p-2 rounded-lg border border-gray-300 mb-4"
      >
        <option value="">--Select a Project--</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddProject}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full"
      >
        + Add Project
      </button>
    </div>
  );
};

export default ProjectList;
