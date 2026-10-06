import type { DeadlineTask, DeadlineFormState, Priority } from '../types'

export const DAY_IN_MS = 1000 * 60 * 60 * 24

export const dateOffset = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const defaultForm: DeadlineFormState = {
  subject: '',
  title: '',
  dueDate: dateOffset(2),
  priority: 'Trung bình',
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
