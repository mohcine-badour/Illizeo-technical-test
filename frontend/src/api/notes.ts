// src/api/notes.ts
import api from "./axios";

export type Note = { id: number; title: string; content?: string; user_id: number; company_id: number };

export async function fetchNotes() {
  const res = await api.get<Note[]>("/notes");
  return res.data;
};

export async function createNote(payload: { title: string; content?: string }) {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
};

export async function updateNote(id: number, payload: { title: string; content?: string }) {
  const res = await api.put<Note>(`/notes/${id}`, payload);
  return res.data;
};

export async function deleteNote(id: number) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

// import api from "./axios";

// export const getNotes = async () => {
//     const response = await api.get("/notes");
//     return response.data;
// };

// export const createNote = async (data: { title: string; content: string }) => {
//     const response = await api.post("/notes", data);
//     return response.data;
// };

// export const updateNote = async (id: string, data: { title: string; content: string }) => {
//     const response = await api.put(`/notes/${id}`, data);
//     return response.data;
// };

// export const deleteNote = async (id: string) => {
//     const response = await api.delete(`/notes/${id}`);
//     return response.data;
// };
