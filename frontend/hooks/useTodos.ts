"use client";

import { useCallback, useEffect, useState } from "react";
import { CreateTodoPayload, Todo, UpdateTodoPayload } from "@/types/todo";
import { todoService } from "@/services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (payload: CreateTodoPayload) => {
    const newTodo = await todoService.create(payload);
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  };

  const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
    const updated = await todoService.update(id, payload);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteTodo = async (id: number) => {
    await todoService.delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    return updateTodo(id, { completed: !todo.completed });
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}
