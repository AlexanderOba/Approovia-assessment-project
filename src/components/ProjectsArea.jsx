import React, { useState } from 'react'
import ProjectCard from './ProjectCard'

function ProjectsArea({ projects, selectedProject, onProjectSelect, onRename }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateProject = () => {
    setIsModalOpen(true)
  }

  const handleSubmitProject = (name) => {
    onRename(`project-${Date.now()}`, name)
  }

  if (projects.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-neutral-200">
          <p className="text-neutral-500 mb-4">No projects in this folder</p>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={project.id === selectedProject}
            onClick={() => onProjectSelect(project.id)}
            onRename={onRename}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsArea