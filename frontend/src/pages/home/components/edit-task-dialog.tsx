import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "DONE"
}

interface EditTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task
  onEditTask: (task: Task) => void
}

export function EditTaskDialog({ open, onOpenChange, task, onEditTask }: EditTaskDialogProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  useEffect(() => {
    setTitle(task.title)
    setDescription(task.description)
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditTask({ ...task, title, description })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da tarefa"
                minLength={3}
                maxLength={50}
                required
              />
              <small className="text-muted-foreground">Mínimo 3 e máximo 50 caracteres.</small>
            </div>

            <div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da tarefa"
                required
                minLength={3}
                maxLength={255}
              />
              <small className="text-muted-foreground">Mínimo 3 e máximo 255 caracteres.</small>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Atualizar Tarefa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

