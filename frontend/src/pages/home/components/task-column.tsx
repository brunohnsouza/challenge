import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskItem } from "./task-item"

interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "DONE"
}

interface TaskColumnProps {
  title: string
  tasks: Task[]
  onMoveTask: (task: Task, newStatus: Task["status"]) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskColumn({ title, tasks, onMoveTask, onEditTask, onDeleteTask }: TaskColumnProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </CardContent>
    </Card>
  )
}

