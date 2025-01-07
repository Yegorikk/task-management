import { useEffect } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { TaskList } from './TaskList'
import { TaskForm } from './TaskForm'

export const TasksPage = () => {
  const { tasks, isLoading, error, setTasks } = useTaskStore((state) => ({
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    setTasks: state.setTasks,
  }))

  useEffect(() => {
    // TODO: Implement tasks fetching
    setTasks([])
  }, [setTasks])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>
  }

  return (
    <div>
      <h1 className="h3 mb-4">My Tasks</h1>
      <TaskForm />
      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <TaskList
            title="To Do"
            tasks={tasks.filter((task) => task.status === 'todo')}
          />
        </div>
        <div className="col-md-4">
          <TaskList
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 'in_progress')}
          />
        </div>
        <div className="col-md-4">
          <TaskList
            title="Done"
            tasks={tasks.filter((task) => task.status === 'done')}
          />
        </div>
      </div>
    </div>
  )
} 