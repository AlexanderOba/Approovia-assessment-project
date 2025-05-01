import React from 'react'
import FolderItem from './FolderItem'

function FolderSidebar({ folders, activeFolder, onFolderClick, projects, onRename }) {
  const handleCreateFolder = () => {
    const newName = `Folder ${folders.length + 1}`
    onRename(`folder-${Date.now()}`, newName)
  }

  return (
    <div className="w-full md:w-64 bg-white border-r border-neutral-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Folders</h2>
        <button 
          onClick={handleCreateFolder}
          className="text-sm px-3 py-1.5 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
        >
          + New Folder
        </button>
      </div>
      
      <div className="space-y-1.5">
        <div
          className={`folder-item py-2.5 px-4 rounded-md flex items-center justify-between ${
            activeFolder === null ? 'active' : ''
          }`}
          onClick={() => onFolderClick(null)}
        >
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 mr-3 ${activeFolder === null ? 'text-primary-600' : 'text-neutral-400'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="text-sm">Root</span>
          </div>
          <span className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5">
            {projects.filter(p => p.folderId === null).length}
          </span>
        </div>

        {folders.map(folder => {
          const projectCount = projects.filter(p => p.folderId === folder.id).length
          
          return (
            <FolderItem 
              key={folder.id} 
              folder={folder} 
              isActive={activeFolder === folder.id}
              projectCount={projectCount}
              onClick={() => onFolderClick(folder.id)}
              onRename={onRename}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FolderSidebar