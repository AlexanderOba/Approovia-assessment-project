import React from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import { useProjects } from './hooks/useProjects'
import ProjectCard from './components/ProjectCard'

function App() {
  const { 
    folders, 
    projects, 
    activeFolder, 
    selectedProject,
    draggingProject,
    handleFolderClick, 
    handleProjectSelect,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleRename
  } = useProjects()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#334155',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '12px 16px',
          },
        }}
      />
      <header className="bg-white shadow-sm border-b border-neutral-200 py-4 px-6">
        <h1 className="text-xl font-semibold text-neutral-800">APPROOVIA</h1>
      </header>
      
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        
      >
        <Dashboard
          folders={folders}
          projects={projects}
          activeFolder={activeFolder}
          selectedProject={selectedProject}
          onFolderClick={handleFolderClick}
          onProjectSelect={handleProjectSelect}
          onRename={handleRename}
        />

        <DragOverlay>
          {draggingProject ? (
            <ProjectCard 
              project={draggingProject} 
              isOverlay={true} 
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default App