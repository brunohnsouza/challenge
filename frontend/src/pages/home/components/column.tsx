import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "./task-board"
import { TaskItem } from "./task-item"

interface ColumnProps {
  title: string
  tasks: Task[]
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onMoveTask={() => {}} 
            onEditTask={() => {}} 
            onDeleteTask={() => {}} 
          />
        ))}
      </CardContent>
    </Card>
  )
}

