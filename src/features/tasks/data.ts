import type { DeadlineFormState, DeadlineTask, FilterStatus, Priority, TaskFilter } from './types'

export const DAY_IN_MS = 1000 * 60 * 60 * 24

export const dateOffset = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const getDaysRemaining = (dueDate: string) => {
  const today = new Date()
  const due = parseDate(dueDate)
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const dueUtc = Date.UTC(due.getFullYear(), due.getMonth(), due.getDate())
  return Math.round((dueUtc - todayUtc) / DAY_IN_MS)
}

export const defaultForm: DeadlineFormState = {
  subject: '',
  title: '',
  dueDate: dateOffset(2),
  priority: 'Trung bình',
}

export const formatDeadlineLabel = (task: DeadlineTask) => {
  const deadlineInDays = getDaysRemaining(task.dueDate)

  if (task.completed) {
    return 'Đã hoàn thành'
  }

  if (deadlineInDays < 0) {
    return `Quá hạn ${Math.abs(deadlineInDays)} ngày`
  }

  if (deadlineInDays === 0) {
    return 'Hạn nộp hôm nay'
  }

  return `${deadlineInDays} ngày còn lại`
}

export const filterByStatus: TaskFilter = {
  all: () => true,
  open: (task) => !task.completed && getDaysRemaining(task.dueDate) >= 0,
  overdue: (task) => !task.completed && getDaysRemaining(task.dueDate) < 0,
  completed: (task) => task.completed,
}

export const initialTasks: DeadlineTask[] = [
  {
    id: '1',
    subject: 'Toán',
    title: 'Bài tập mảng số phức',
    dueDate: dateOffset(1),
    priority: 'Cao',
    completed: false,
  },
  {
    id: '2',
    subject: 'Vật lý',
    title: 'Báo cáo thí nghiệm dao động',
    dueDate: dateOffset(-2),
    priority: 'Trung bình',
    completed: false,
  },
  {
    id: '3',
    subject: 'Lập trình',
    title: 'Project deadline tracker',
    dueDate: dateOffset(4),
    priority: 'Thấp',
    completed: true,
  },
]

export const sortByPriority = <T extends { priority: Priority }>(items: T[]) =>
  [...items].sort((a, b) => {
    const ranking: Record<Priority, number> = {
      Cao: 3,
      'Trung bình': 2,
      Thấp: 1,
    }

    return ranking[b.priority] - ranking[a.priority]
  })

export const isCompletedTask = (
  task: Partial<DeadlineTask>,
): task is DeadlineTask & { completed: true } => Boolean(task.completed)

export const filterOptions: FilterStatus[] = ['all', 'open', 'overdue', 'completed']
