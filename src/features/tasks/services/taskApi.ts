import { initialTasks } from '../data/mockTasks'
import type { DeadlineTask } from '../types'

const MOCK_API_DELAY_MS = 350

export async function getTasks(): Promise<DeadlineTask[]> {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, MOCK_API_DELAY_MS)
  })

  return initialTasks.map((task) => ({ ...task }))
}
