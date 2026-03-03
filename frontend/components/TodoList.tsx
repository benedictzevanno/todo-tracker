"use client";

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  selectedTodoId: number | null;
  onToggle: (id: number) => Promise<void>;
  onSelect: (id: number) => void;
}

export default function TodoList({
  todos,
  loading,
  error,
  selectedTodoId,
  onToggle,
  onSelect,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg
          className="mb-3 h-12 w-12 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-sm font-medium">No todos yet</p>
        <p className="mt-1 text-xs">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="divide-y mx-2 divide-gray-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isSelected={todo.id === selectedTodoId}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
