import { create } from 'zustand'
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task'
import { tasksApi } from '../api/tasks'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (task: CreateTaskDto) => Promise<void>
  updateTask: (taskId: string, updates: UpdateTaskDto) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const tasks = await tasksApi.getAllTasks()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addTask: async (task: CreateTaskDto) => {
    set({ isLoading: true, error: null })
    try {
      const newTask = await tasksApi.createTask(task)
      set((state) => ({ 
        tasks: [...state.tasks, newTask],
        isLoading: false 
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateTask: async (taskId: string, updates: UpdateTaskDto) => {
    set({ isLoading: true, error: null })
    try {
      const updatedTask = await tasksApi.updateTask(taskId, updates)
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === taskId ? updatedTask : task
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  deleteTask: async (taskId: string) => {
    set({ isLoading: true, error: null })
    try {
      await tasksApi.deleteTask(taskId)
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        isLoading: false
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  }
})) 