import { useState } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { Priority } from '../../types/task'

export const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [deadline, setDeadline] = useState('')

  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement task creation
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'todo' as const,
      deadline,
      userId: '1', // TODO: Get from auth store
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addTask(newTask)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDeadline('')
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="form-control"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              rows={3}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </form>
  )
} 