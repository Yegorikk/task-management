export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  AUTH_URL: import.meta.env.VITE_AUTH_URL || 'http://localhost:5000/api/auth',
  TASKS_URL: import.meta.env.VITE_TASKS_URL || 'http://localhost:5000/api/tasks'
} 