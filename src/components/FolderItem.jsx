import React, { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'

function FolderItem({ folder, isActive, projectCount, onClick, onRename }) {
  const { setNodeRef, isOver } = useDroppable({
    id: folder.id,
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(folder.name)

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setName(folder.name)
    }
  }

  const handleSubmit = () => {
    if (name.trim() && name !== folder.name) {
      onRename(folder.id, name.trim())
    }
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      className={`folder-item py-2 px-3 rounded-md flex items-center justify-between ${
        isActive ? 'active' : ''
      } ${isOver ? 'droppable-active' : ''}`}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center flex-1">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 mr-2 ${isActive ? 'text-primary-600' : 'text-neutral-400'}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
          />
        </svg>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="bg-white border rounded px-1 py-0.5 text-sm w-full"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span>{folder.name}</span>
        )}
      </div>
      
      {projectCount > 0 && (
        <span className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 ml-2">
          {projectCount}
        </span>
      )}
    </div>
  )
}

export default FolderItem