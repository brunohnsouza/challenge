import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: { title: string; description: string }) => void
}

export function AddTaskDialog({ open, onOpenChange, onAddTask }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask({ title, description })
    setTitle("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
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
            <Button type="submit">Adicionar Tarefa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

