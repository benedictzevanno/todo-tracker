"use client";

import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onToggle: (id: number) => Promise<void>;
  onSelect: (id: number) => void;
}

export default function TodoItem({ todo, isSelected, onToggle, onSelect }: TodoItemProps) {
  return (
    <div
      onClick={() => onSelect(todo.id)}
      className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
        isSelected
          ? "border-amber-300 bg-amber-50 shadow-sm"
          : "border-transparent hover:bg-gray-50"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(todo.id);
        }}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
          todo.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-gray-300 hover:border-amber-400"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && (
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            todo.completed ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {todo.title}
        </p>
      </div>

      {/* Arrow indicator */}
      <svg
        className={`h-4 w-4 shrink-0 text-gray-500 transition group-hover:text-gray-700 ${
          isSelected ? "text-amber-400" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
