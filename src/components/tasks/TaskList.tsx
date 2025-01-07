import { Task, Status } from '../../types/task'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  title: string
  tasks: Task[]
  status: Status
}

export const TaskList = ({ title, tasks }: Omit<TaskListProps, 'status'>) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="h5 mb-0">{title}</h2>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
} 