import { useEffect, useMemo, useState } from 'react'
import { defaultForm, sortByPriority } from '../data/mockTasks'
import { getTasks } from '../services/taskApi'
import type { DeadlineFormState, DeadlineTask, FilterStatus } from '../types'
import { getDaysRemaining, isCompletedTask } from '../utils/date'

export const filterByStatus = {
  all: () => true,
  open: (task: DeadlineTask) => !task.completed,
  overdue: (task: DeadlineTask) => !task.completed && getDaysRemaining(task.dueDate) < 0,
  completed: (task: DeadlineTask) => task.completed,
} as const

export function useTaskTracker() {
  const [tasks, setTasks] = useState<DeadlineTask[]>([])
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [form, setForm] = useState<DeadlineFormState>(defaultForm)

  useEffect(() => {
    let isActive = true

    const loadTasks = async () => {
      try {
        const loadedTasks = await getTasks()
        if (isActive) {
          setTasks(loadedTasks)
        }
      } catch {
        if (isActive) {
          setLoadError('Không thể tải danh sách bài tập. Vui lòng thử tải lại trang.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadTasks()

    return () => {
      isActive = false
    }
  }, [])

  const filteredTasks = useMemo(() => {
    const activeFilter = filterByStatus[filter]
    return sortByPriority(tasks.filter(activeFilter))
  }, [filter, tasks])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(isCompletedTask).length
    const incomplete = total - completed
    const overdue = tasks.filter((task) => !task.completed && getDaysRemaining(task.dueDate) < 0).length

    return { total, completed, incomplete, overdue }
  }, [tasks])

  const updateForm = <K extends keyof DeadlineFormState>(field: K, value: DeadlineFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault()

    const trimmedTitle = form.title.trim()
    const trimmedSubject = form.subject.trim()

    if (!trimmedTitle || !trimmedSubject || !form.dueDate) {
      return false
    }

    const newTask: DeadlineTask = {
      id: crypto.randomUUID(),
      subject: trimmedSubject,
      title: trimmedTitle,
      dueDate: form.dueDate,
      priority: form.priority,
      completed: false,
    }

    setTasks((current) => [newTask, ...current])
    setForm(defaultForm)
    return true
  }

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    isLoading,
    loadError,
    form,
    stats,
    updateForm,
    handleSubmit,
    toggleTask,
    deleteTask,
  }
}
