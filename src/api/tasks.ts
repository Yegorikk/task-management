import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task'
import { config } from '../config/env'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const tasksApi = {
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${config.TASKS_URL}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }

      return response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to connect to server')
    }
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    try {
      const response = await fetch(`${config.TASKS_URL}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...task,
          status: 'todo'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      return response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to connect to server')
    }
  },

  async updateTask(taskId: string, updates: UpdateTaskDto): Promise<Task> {
    try {
      const response = await fetch(`${config.TASKS_URL}/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      return response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to connect to server')
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      const response = await fetch(`${config.TASKS_URL}/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to connect to server')
    }
  },
} 