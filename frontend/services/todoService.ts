import { CreateTodoPayload, Todo, UpdateTodoPayload } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`);
    return handleResponse<Todo[]>(response);
  },

  async getById(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`);
    return handleResponse<Todo>(response);
  },

  async create(payload: CreateTodoPayload): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<Todo>(response);
  },

  async update(id: number, payload: UpdateTodoPayload): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<Todo>(response);
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    return handleResponse<{ message: string }>(response);
  },
};
