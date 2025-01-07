import { Task } from '../../types/task'
import { useTaskStore } from '../../store/useTaskStore'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface TaskCardProps {
  task: Task
  index: number
  isDragging?: boolean
}

export const TaskCard = ({ task, isDragging: forcedDragging }: TaskCardProps) => {
  const { deleteTask, updateTask } = useTaskStore((state) => ({
    deleteTask: state.deleteTask,
    updateTask: state.updateTask
  }))

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id
  })

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    opacity: (isDragging || forcedDragging) ? 0.5 : undefined,
  } : undefined

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-danger'
      case 'medium':
        return 'bg-warning'
      case 'low':
        return 'bg-success'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
    >
      <div className="card shadow-sm">
        <div className="card-body p-3">
          <div 
            className="drag-handle" 
            {...attributes} 
            {...listeners}
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h3 className="h6 mb-0 text-truncate">{task.title}</h3>
              <span className={`badge ${getPriorityColor(task.priority)} text-white ms-2`}>
                {task.priority}
              </span>
            </div>
            <p className="text-muted small mb-2">{task.description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="small text-muted">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </span>
            <div className="d-flex gap-2">
              <button
                onClick={() => updateTask(task.id, { status: 'done' })}
                className="btn btn-outline-success btn-sm"
                disabled={task.status === 'done'}
              >
                Complete
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 