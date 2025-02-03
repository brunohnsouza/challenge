import { Toaster } from "@/components/ui/toaster"
import { TaskBoard } from "./components/task-board";

export function Home() {
  return (
    <main className="container mx-auto py-8">
      <TaskBoard />
      <Toaster />
    </main>
  );
}
