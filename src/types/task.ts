export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  deadline: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title: string
  description: string
  priority: Priority
  deadline: string
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: Status
} 