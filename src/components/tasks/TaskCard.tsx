import { Task } from '../../types/task'
import { useTaskStore } from '../../store/useTaskStore'

interface TaskCardProps {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-danger text-white'
      case 'medium':
        return 'bg-warning text-dark'
      case 'low':
        return 'bg-success text-white'
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h3 className="h6 mb-0">{task.title}</h3>
          <span
            className={`badge ${getPriorityColor(task.priority)}`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-muted mt-2 mb-0">{task.description}</p>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <span className="small text-muted">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="btn btn-outline-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
} 