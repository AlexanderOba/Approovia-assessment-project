import { useState } from 'react'
import toast from 'react-hot-toast'

// Initial data
const initialFolders = [
  { id: 'folder-1', name: 'Folder 1' },
  { id: 'folder-2', name: 'Folder 2' },
  { id: 'folder-3', name: 'Folder 3' },
]

const initialProjects = [
  { 
    id: 'project-1', 
    name: 'Project 1',
    folderId: null
  },
  { 
    id: 'project-2', 
    name: 'Project 2',
    folderId: null
  },
  { 
    id: 'project-3', 
    name: 'Project 3',
    folderId: null
  },
]

// Mock API endpoint
const API_ENDPOINT = 'https://example.com/api/update-project'

// Mock API call
const updateProjectFolder = async (projectId, folderId) => {
  // request payload
  const payload = {
    projectId,
    folderId,
    timestamp: new Date().toISOString()
  }

  // Simulate network request
  return new Promise((resolve, reject) => {
    console.log('Sending API request:', payload)
    
    setTimeout(() => {
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          data: payload,
          message: 'Project updated successfully'
        })
      } else {
        reject(new Error('Failed to update project'))
      }
    }, 800) 
  })
}

export function useProjects() {
  const [folders, setFolders] = useState(initialFolders)
  const [projects, setProjects] = useState(initialProjects)
  const [activeFolder, setActiveFolder] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [draggingProject, setDraggingProject] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleFolderClick = (folderId) => {
    setActiveFolder(folderId === activeFolder ? null : folderId)
  }

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId === selectedProject ? null : projectId)
  }

  const handleDragStart = (event) => {
    const { active } = event
    
    const draggedProject = projects.find(project => project.id === active.id)
    if (draggedProject) {
      setDraggingProject(draggedProject)
      setSelectedProject(active.id)
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    setDraggingProject(null)
    
    if (!over) return

    let newFolderId = null

    // If dropping onto a folder
    if (over.id.startsWith('folder-')) {
      newFolderId = over.id
    }

    // Don't update if the folder hasn't changed
    const currentProject = projects.find(p => p.id === active.id)
    if (currentProject.folderId === newFolderId) return

    const targetFolder = folders.find(f => f.id === newFolderId)
    const folderName = targetFolder ? targetFolder.name : 'root'

    // Update state optimistically
    setProjects(prev => 
      prev.map(project => 
        project.id === active.id 
          ? { ...project, folderId: newFolderId }
          : project
      )
    )

    // Show loading toast
    const toastId = toast.loading(`Moving project to ${folderName}...`)

    // Make API call
    setIsUpdating(true)
    try {
      const result = await updateProjectFolder(active.id, newFolderId)
      console.log('API Response:', result)
      toast.success(`Project moved to ${folderName}`, { id: toastId })
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to move project', { id: toastId })
      // Revert on error
      setProjects(prev => 
        prev.map(project => 
          project.id === active.id 
            ? { ...project, folderId: currentProject.folderId }
            : project
        )
      )
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    
    // Add custom drag over effects if needed
    if (over && over.id.startsWith('folder-')) {
      // Folder drag over logic can be added here
    }
  }

  const handleRename = (id, newName) => {
    console.log(newName, id)
    if (id.startsWith('folder-')) {
      // Check if it's a new folder
      const isNewFolder = !folders.find(f => f.id === id)
      if (isNewFolder) {
        setFolders(prev => [...prev, { id, name: newName }])
        toast.success(`Created folder "${newName}"`)
      } else {
        setFolders(prev => 
          prev.map(folder => 
            folder.id === id 
              ? { ...folder, name: newName }
              : folder
          )
        )
        toast.success(`Folder renamed to "${newName}"`)
      }
    } else {
      setProjects(prev => 
        prev.map(project => 
          project.id === id 
            ? { ...project, name: newName }
            : project
        )
      )
      toast.success(`Project renamed to "${newName}"`)
    }
  }

  return {
    folders,
    projects,
    activeFolder,
    selectedProject,
    draggingProject,
    isUpdating,
    handleFolderClick,
    handleProjectSelect,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleRename,
  }
}