import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, ArrowRight, Edit, MoreVertical, Trash } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "DONE"
}

interface TaskItemProps {
  task: Task
  onMoveTask: (task: Task, newStatus: Task["status"]) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskItem({ task, onMoveTask, onEditTask, onDeleteTask }: TaskItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEditTask(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteTask(task.id)}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Mover para</DropdownMenuLabel>
            {task.status !== "PENDING" && (
              <DropdownMenuItem onClick={() => onMoveTask(task, "PENDING")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Pendentes
              </DropdownMenuItem>
            )}
            {task.status !== "IN_PROGRESS" && (
              <DropdownMenuItem onClick={() => onMoveTask(task, "IN_PROGRESS")}>
                {
                  task.status !== "DONE" ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />
                }
                Em Andamento
              </DropdownMenuItem>
            )}
            {task.status !== "DONE" && (
              <DropdownMenuItem onClick={() => onMoveTask(task, "DONE")}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Feitas
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  )
}

