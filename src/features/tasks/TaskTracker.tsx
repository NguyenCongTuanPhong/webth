import { useEffect, useState } from 'react'
import StatCard from './components/StatCard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTaskTracker } from './hooks/useTaskTracker'

function TaskTracker() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const {
    tasks,
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
  } = useTaskTracker()

  useEffect(() => {
    if (!isFormOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFormOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isFormOpen])

  return (
    <main className="deadline-app">
      <header className="app-header">
        <div>
          <div className="brand-line">
            <span className="brand-mark" aria-hidden="true">✓</span>
            <p className="eyebrow">Student Deadline Tracker</p>
          </div>
          <h1>Quản lý deadline bài tập</h1>
          <p className="header-description">
            Theo dõi bài tập và luôn chủ động với mọi hạn nộp.
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsFormOpen(true)}
        >
          <span className="button-plus" aria-hidden="true">+</span>
          Thêm bài tập
        </button>
      </header>

      <section className="stats-grid" aria-label="Thống kê nhiệm vụ">
        <StatCard label="Tổng bài tập" value={String(stats.total)} accent="purple" />
        <StatCard label="Đã hoàn thành" value={String(stats.completed)} accent="green" />
        <StatCard label="Chưa hoàn thành" value={String(stats.incomplete)} accent="blue" />
        <StatCard label="Quá hạn" value={String(stats.overdue)} accent="red" />
      </section>

      <section className="content-grid">
        {isLoading ? (
          <div className="panel list-panel loading-state">Đang tải danh sách deadline...</div>
        ) : loadError ? (
          <div className="panel list-panel empty-state" role="alert">{loadError}</div>
        ) : (
          <TaskList
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </section>

      {isFormOpen && (
        <div
          className="form-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsFormOpen(false)
            }
          }}
        >
          <section className="panel form-panel form-dialog" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
            <div className="panel-header form-dialog-header">
              <div>
                <h2 id="task-form-title">Thêm bài tập mới</h2>
                <p className="panel-description">Điền thông tin để thêm deadline vào danh sách.</p>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="Đóng biểu mẫu"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
            </div>
            <TaskForm
              form={form}
              onChange={updateForm}
              onSubmit={(event) => {
                if (handleSubmit(event)) {
                  setIsFormOpen(false)
                }
              }}
            />
          </section>
        </div>
      )}
    </main>
  )
}

export default TaskTracker
