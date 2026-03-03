"use client";

import { Todo } from "@/types/todo";

interface SidebarProps {
  todos: Todo[];
}

export default function Sidebar({ todos }: SidebarProps) {
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center justify-center gap-3 border-b border-gray-200 px-6 py-5">
        <h1 className="text-lg font-semibold text-gray-800">Todo App</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Tasks
        </p>

        <div
          className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-800">
          <div className="flex items-center gap-2.5">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            All Todos
          </div>
          <span
            className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-200 px-1.5 text-xs font-bold text-amber-900">
            {totalCount}
          </span>
        </div>

        <p
          className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Overview
        </p>

        <div className="space-y-1">
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              Pending
            </div>
            <span className="text-xs font-medium text-gray-400">{pendingCount}</span>
          </div>
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Completed
            </div>
            <span className="text-xs font-medium text-gray-400">{completedCount}</span>
          </div>
        </div>
      </nav>

      <div className="border-t border-gray-200 px-3 py-3">
        <div
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-700">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </div>
      </div>
    </aside>
  );
}
