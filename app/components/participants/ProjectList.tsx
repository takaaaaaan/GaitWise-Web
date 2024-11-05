'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Project } from 'types'

const ProjectList: React.FC = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'Project Beta' },
    { id: 3, name: 'Project Gamma' },
    { id: 4, name: 'Project Delta' },
  ])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = parseInt(event.target.value)
    const project = projects.find((proj) => proj.id === projectId) || null
    setSelectedProject(project)
  }

  const handleAddProject = () => {
    router.push('/createproject') // Navigate to Create Project page
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="mb-4 text-2xl font-medium">Select a Project</h2>
      <select
        id="project-select"
        onChange={handleProjectChange}
        value={selectedProject?.id || ''}
        className="mb-4 w-60 rounded-lg border border-gray-300 p-2"
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
        className="rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
      >
        + Add Project
      </button>
    </div>
  )
}

export default ProjectList
