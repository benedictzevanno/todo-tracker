"use client";

import { useCallback, useState } from "react";
import { Todo } from "@/types/todo";
import { todoService } from "@/services/todoService";

export function useTodoDetail() {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodo = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const todo = await todoService.getById(id);
      setSelectedTodo(todo);
      return todo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todo");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTodo(null);
    setError(null);
  }, []);

  return {
    selectedTodo,
    loading,
    error,
    fetchTodo,
    clearSelection,
    setSelectedTodo,
  };
}
