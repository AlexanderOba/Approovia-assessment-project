import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'

function ProjectCard({ project, isSelected, isOverlay = false, onClick, onRename }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: project.id,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(project.name)

  const handleEditClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setName(project.name)
    }
  }

  const handleSubmit = () => {
    if (name.trim() && name !== project.name) {
      onRename(project.id, name.trim())
    }
    setIsEditing(false)
  }

  const cardClasses = `
    project-card 
    border 
    hover:cursor-default
    ${isSelected ? 'border-primary-500 selected' : 'border-neutral-200'} 
    ${isDragging ? 'dragging' : ''} 
    ${isOverlay ? 'shadow-active' : 'shadow-card'} 
    rounded-xl 
    p-5 
    h-36 
    flex 
    flex-col 
    justify-between
    transform transition-all duration-200
  `

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      ref={setNodeRef}
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="bg-white border rounded-md px-2 py-1.5 text-sm w-full font-medium text-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            <div className="flex items-center">
             <h3 className="font-medium text-neutral-800">{project.name}</h3>
             <button
              onClick={handleEditClick}
              className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            </div>
            <div
              {...listeners}
              {...attributes}
              onClick={(e) => e.stopPropagation()}
              className="cursor-grab p-1 rounded-full hover:bg-neutral-100"
            >
              <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6 text-neutral-400"
               fill="currentColor"
               viewBox="0 0 20 20"
             >
               <path d="M7 4a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0zM7 10a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0zM7 16a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
            </svg>
          </div>
          </>
        )}
      </div>
      
      <div className="mt-2 text-sm text-neutral-500 flex items-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
      </div>
    </div>
  )
}

export default ProjectCard