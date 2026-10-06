export type Priority = 'Cao' | 'Trung bình' | 'Thấp'
export type FilterStatus = 'all' | 'open' | 'overdue' | 'completed'

export type DeadlineTask = {
  id: string
  subject: string
  title: string
  dueDate: string
  priority: Priority
  completed: boolean
}

export type DeadlineFormState = Omit<DeadlineTask, 'id' | 'completed'>

export type TaskFilter = Record<FilterStatus, (task: DeadlineTask) => boolean>
