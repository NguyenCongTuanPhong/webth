import type { DeadlineFormState, Priority } from '../types'

type TaskFormProps = {
  form: DeadlineFormState
  onChange: <K extends keyof DeadlineFormState>(field: K, value: DeadlineFormState[K]) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function TaskForm({ form, onChange, onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <label>
        Môn học
        <input
          type="text"
          value={form.subject}
          onChange={(event) => onChange('subject', event.target.value)}
          placeholder="Ví dụ: Toán, Tiếng Anh"
        />
      </label>

      <label>
        Tên bài tập
        <input
          type="text"
          value={form.title}
          onChange={(event) => onChange('title', event.target.value)}
          placeholder="Nhập tên công việc"
        />
      </label>

      <div className="inline-fields">
        <label>
          Hạn nộp
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => onChange('dueDate', event.target.value)}
          />
        </label>

        <label>
          Độ ưu tiên
          <select
            value={form.priority}
            onChange={(event) => onChange('priority', event.target.value as Priority)}
          >
            <option value="Cao">Cao</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Thấp">Thấp</option>
          </select>
        </label>
      </div>

      <button type="submit" className="submit-button">
        Lưu bài tập
      </button>
    </form>
  )
}

export default TaskForm
