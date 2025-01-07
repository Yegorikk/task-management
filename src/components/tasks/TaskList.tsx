import { Task, Status } from '../../types/task'
import { TaskCard } from './TaskCard'
import { useDroppable } from '@dnd-kit/core'

interface TaskListProps {
  title: string
  tasks: Task[]
  status: Status
}

export const TaskList = ({ title, tasks, status }: TaskListProps) => {
  const { setNodeRef } = useDroppable({
    id: status
  })

  return (
    <div className="card h-75">
      <div className="card-header bg-white border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{title}</h2>
          <span className="badge bg-secondary">{tasks.length}</span>
        </div>
      </div>
      <div 
        ref={setNodeRef}
        className="card-body p-2 task-list"
      >
        <div className="d-flex flex-column gap-2">
          {tasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              index={index}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-muted p-4">
              No tasks yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 