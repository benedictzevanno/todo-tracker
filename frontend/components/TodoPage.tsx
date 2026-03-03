"use client";

import {useTodos} from "@/hooks/useTodos";
import {useTodoDetail} from "@/hooks/useTodoDetail";
import {CreateTodoPayload} from "@/types/todo";
import Sidebar from "@/components/Sidebar";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoDetailDrawer from "@/components/TodoDetailDrawer";

export default function TodoPage() {
  const {todos, loading, error, createTodo, updateTodo, toggleTodo, deleteTodo} = useTodos();
  const {selectedTodo, loading: detailLoading, fetchTodo, clearSelection} = useTodoDetail();

  const handleCreate = async (payload: CreateTodoPayload) => {
    await createTodo(payload);
  };

  const handleToggle = async (id: number) => {
    const updated = await toggleTodo(id);
    if (selectedTodo && selectedTodo.id === id && updated) {
      await fetchTodo(id);
    }
  };

  const handleSelect = (id: number) => {
    if (selectedTodo?.id === id) {
      clearSelection();
    } else {
      fetchTodo(id);
    }
  };

  const handleUpdate = async (id: number, payload: Parameters<typeof updateTodo>[1]) => {
    const updated = await updateTodo(id, payload);
    await fetchTodo(id);
    return updated;
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    clearSelection();
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar todos={todos}/>

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-gray-200 bg-white px-8 py-6">
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-bold text-gray-900">All Todos</h2>
            </div>
            <p className="mt-1 text-sm text-gray-400">{todayDate}</p>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            <TodoForm onSubmit={handleCreate}/>
            <TodoList
                todos={todos}
                loading={loading}
                error={error}
                selectedTodoId={selectedTodo?.id ?? null}
                onToggle={handleToggle}
                onSelect={handleSelect}
            />
          </div>
        </main>

        <TodoDetailDrawer
            todo={selectedTodo}
            loading={detailLoading}
            onClose={clearSelection}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
      </div>
  );
}
