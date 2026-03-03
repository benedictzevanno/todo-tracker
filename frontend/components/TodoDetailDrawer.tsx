"use client";

import { useEffect, useState } from "react";
import { Todo, UpdateTodoPayload } from "@/types/todo";

interface TodoDetailDrawerProps {
  todo: Todo | null;
  loading: boolean;
  onClose: () => void;
  onUpdate: (id: number, payload: UpdateTodoPayload) => Promise<unknown>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoDetailDrawer({
  todo,
  loading,
  onClose,
  onUpdate,
  onDelete,
}: TodoDetailDrawerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local state when a new todo is loaded
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setHasChanges(false);
    }
  }, [todo]);

  const handleSave = async () => {
    if (!todo) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    try {
      setSaving(true);
      await onUpdate(todo.id, {
        title: trimmedTitle,
        description: description.trim() || undefined,
      });
      setHasChanges(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!todo) return;
    await onDelete(todo.id);
    onClose();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setHasChanges(true);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setHasChanges(true);
  };

  const isOpen = todo !== null || loading;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-40 h-screen w-full max-w-sm transform border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:shadow-none ${
          isOpen ? "translate-x-0" : "translate-x-full lg:hidden"
        }`}
      >
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
          </div>
        ) : todo ? (
          <div className="flex h-full flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">Task Details</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close drawer"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Title */}
              <div className="mb-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  rows={4}
                  placeholder="Add a description..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </label>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    todo.completed ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      todo.completed ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                  />
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Created
                  </label>
                  <p className="text-sm text-gray-600">
                    {new Date(todo.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-600">
                    {new Date(todo.updatedAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <button
                onClick={handleDelete}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                Delete Task
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges || !title.trim()}
                className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
