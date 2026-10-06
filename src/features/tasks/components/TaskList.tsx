import { formatDeadlineLabel } from '../utils/date'
import { getDaysRemaining } from '../utils/date'
import type { DeadlineTask, FilterStatus } from '../types'

type TaskListProps = {
  tasks: DeadlineTask[]
  filter: FilterStatus
  onFilterChange: (nextFilter: FilterStatus) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskList({ tasks, filter, onFilterChange, onToggle, onDelete }: TaskListProps) {
  return (
    <section className="panel list-panel">
      <div className="panel-header list-header">
        <h2>Danh sách bài tập</h2>
        <div className="filter-tabs" aria-label="Bộ lọc trạng thái">
          {(['all', 'open', 'overdue', 'completed'] as const).map((status) => (
            <button
              type="button"
              key={status}
              className={filter === status ? 'tab active' : 'tab'}
              onClick={() => onFilterChange(status)}
            >
              {status === 'all' && 'Tất cả'}
              {status === 'open' && 'Chưa hoàn thành'}
              {status === 'overdue' && 'Quá hạn'}
              {status === 'completed' && 'Đã hoàn thành'}
            </button>
          ))}
        </div>
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => {
            const isOverdue = !task.completed && getDaysRemaining(task.dueDate) < 0
            const badgeClass = task.completed
              ? 'badge done'
              : isOverdue
                ? 'badge overdue'
                : 'badge soon'

            return (
              <li key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-topline">
                  <span className="subject-pill">{task.subject}</span>
                  <span className={`priority-pill ${task.priority.toLowerCase().replace(/\s+/g, '-')}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="task-main">
                  <div>
                    <h3>{task.title}</h3>
                    <p className="task-meta">Hạn nộp: {task.dueDate}</p>
                  </div>
                  <span className={badgeClass}>{formatDeadlineLabel(task)}</span>
                </div>

                <div className="task-actions">
                  <button type="button" onClick={() => onToggle(task.id)}>
                    {task.completed ? 'Bỏ đánh dấu' : 'Đánh dấu hoàn thành'}
                  </button>
                  <button type="button" className="danger" onClick={() => onDelete(task.id)}>
                    Xóa
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-state">Không có bài tập phù hợp với bộ lọc hiện tại.</div>
      )}
    </section>
  )
}

export default TaskList
