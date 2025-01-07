import { useEffect, useState } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { TaskList } from './TaskList'
import { TaskForm } from './TaskForm'
import { 
  DndContext, 
  DragEndEvent,
  DragStartEvent,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core'
import { Status, Task } from '../../types/task'
import { TaskCard } from './TaskCard'

export const TasksPage = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const { tasks, isLoading, error, fetchTasks, updateTask } = useTaskStore((state) => ({
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    fetchTasks: state.fetchTasks,
    updateTask: state.updateTask
  }))

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = tasks.find((t) => t.id === active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Status

    if (taskId && newStatus) {
      updateTask(taskId, { status: newStatus })
    }
    setActiveTask(null)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="container-fluid" style={{ maxWidth: '1900px', padding: '20px 20px' }}>
      <div className="mb-5 mt-2">
        <h1 className="h3 mb-5">My Tasks</h1>
        <TaskForm />
      </div>
      <DndContext 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="row g-4 ">
          <div className="col-md-4">
            <TaskList
              title="To Do"
              tasks={tasks.filter((task) => task.status === 'todo')}
              status="todo"
            />
          </div>
          <div className="col-md-4">
            <TaskList
              title="In Progress"
              tasks={tasks.filter((task) => task.status === 'in_progress')}
              status="in_progress"
            />
          </div>
          <div className="col-md-4">
            <TaskList
              title="Done"
              tasks={tasks.filter((task) => task.status === 'done')}
              status="done"
            />
          </div>
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} index={-1} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
} 