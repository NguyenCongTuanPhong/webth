import type { DeadlineTask } from '../types'

export const DAY_IN_MS = 1000 * 60 * 60 * 24

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

export const isCompletedTask = (
  task: Partial<DeadlineTask>,
): task is DeadlineTask & { completed: true } => Boolean(task.completed)
