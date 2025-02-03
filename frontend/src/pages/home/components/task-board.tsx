import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { AddTaskDialog } from "./add-task-dialog"
import { EditTaskDialog } from "./edit-task-dialog"
import { TaskColumn } from "./task-column"

export interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "DONE"
}

const API_URL = import.meta.env.VITE_API_URL;

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error("Error ao buscar os dados: ", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as tarefas. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleAddTask = async (newTask: Omit<Task, "id" | "status">) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, newTask)
      setTasks([...tasks, { ...newTask, id: response.data.taskId, status: "PENDING" }])
      toast({
        title: "Sucesso",
        description: "Tarefa adicionada com sucesso!",
      })
    } catch (error) {
      console.error("Error ao adicionar uma tarefa: ", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a tarefa. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleEditTask = async (task: Task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
      })
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
      toast({
        title: "Sucesso",
        description: "Tarefa atualizada com sucesso!",
      })
    } catch (error) {
      console.error("Error ao atualizar uma tarefa: ", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a tarefa. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleMoveTask = async (task: Task, newStatus: Task["status"]) => {
    try {
      await axios.patch(`${API_URL}/tasks/${task.id}/status`, { status: newStatus })
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)))

      let statusInPortuguese = ""
      switch (newStatus) {
        case "PENDING":
          statusInPortuguese = "pendentes"
          break
        case "IN_PROGRESS":
          statusInPortuguese = "em andamento"
          break
        case "DONE":
          statusInPortuguese = "feitas"
          break
      }

      toast({
        title: "Sucesso",
        description: `Tarefa movida para ${statusInPortuguese}.`,
      })
    } catch (error) {
      console.error("Error ao mover uma tarefa: ", error)
      toast({
        title: "Erro",
        description: "Não foi possível mover a tarefa. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`)
      setTasks(tasks.filter((t) => t.id !== taskId))
      toast({
        title: "Sucesso",
        description: "Tarefa excluída com sucesso!",
      })
    } catch (error) {
      console.error("Error ao excluir uma tarefa: ", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tarefa. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tarefas</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Tarefa
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen gap-4">
        <TaskColumn
          title="Pendentes"
          tasks={tasks.filter((task) => task.status === "PENDING")}
          onMoveTask={handleMoveTask}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="Em Andamento"
          tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
          onMoveTask={handleMoveTask}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="Feitas"
          tasks={tasks.filter((task) => task.status === "DONE")}
          onMoveTask={handleMoveTask}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <AddTaskDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddTask={handleAddTask} />
      {editingTask && (
        <EditTaskDialog
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          task={editingTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  )
}

