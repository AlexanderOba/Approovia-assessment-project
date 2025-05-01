import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import FolderSidebar from './FolderSidebar'
import ProjectsArea from './ProjectsArea'

function Dashboard({ 
  folders, 
  projects, 
  activeFolder, 
  selectedProject,
  onFolderClick, 
  onProjectSelect,
  onRename,
}) {
  const { setNodeRef } = useDroppable({
    id: 'dashboard',
  })

  // Filter projects based on active folder
  const filteredProjects = activeFolder 
    ? projects.filter(project => project.folderId === activeFolder)
    : projects.filter(project => project.folderId === null)

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      <FolderSidebar 
        folders={folders} 
        activeFolder={activeFolder} 
        onFolderClick={onFolderClick}
        projects={projects}
        onRename={onRename}
      />
      
      <div 
        ref={setNodeRef} 
        className="flex-1 p-6 overflow-auto"
      >
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            {activeFolder 
              ? `Projects in ${folders.find(f => f.id === activeFolder)?.name}` 
              : 'All Projects'}
          </h2>
        </div>
        
        <ProjectsArea 
          projects={filteredProjects} 
          selectedProject={selectedProject} 
          onProjectSelect={onProjectSelect}
          onRename={onRename}
        />
      </div>
    </div>
  )
}

export default Dashboard