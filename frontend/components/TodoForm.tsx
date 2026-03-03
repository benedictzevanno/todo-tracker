"use client";

import { useState } from "react";
import { CreateTodoPayload } from "@/types/todo";

interface TodoFormProps {
  onSubmit: (payload: CreateTodoPayload) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({
        title: trimmedTitle,
        description: description.trim() || undefined,
      });
      setTitle("");
      setDescription("");
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-2 border-b border-gray-100 px-4 py-3.5 text-sm text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
      >
        <svg
          className="h-5 w-5 mx-2 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add New Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-100 px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="mt-1.5 flex mx-2 h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-dashed border-amber-300" />
        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-300 outline-none"
            disabled={submitting}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent text-xs text-gray-500 placeholder-gray-300 outline-none"
            disabled={submitting}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-gray-900 transition hover:bg-amber-500 disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTitle("");
                setDescription("");
                setError(null);
              }}
              className="rounded-lg px-3 py-1.5 text-xs text-gray-400 transition hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
