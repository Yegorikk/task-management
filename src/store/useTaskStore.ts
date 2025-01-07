import { create } from 'zustand'
import { Task } from '../types/task'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
}

type TaskStore = (
  set: (
    partial: TaskState | Partial<TaskState> | ((state: TaskState) => TaskState | Partial<TaskState>),
    replace?: boolean | undefined
  ) => void
) => TaskState

export const useTaskStore = create<TaskState>(
  ((set) => ({
    tasks: [],
    isLoading: false,
    error: null,
    setTasks: (tasks: Task[]) => set({ tasks }),
    addTask: (task: Task) => 
      set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (taskId: string, updates: Partial<Task>) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      })),
    deleteTask: (taskId: string) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      })),
  })) as TaskStore
) 