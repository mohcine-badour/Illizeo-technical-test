import api from "./axios";
import type { Note, NotesResponse } from "../types/global";

// export type Note = {
//   id: number;
//   content: string;
//   user_id: number;
//   created_at: string;
//   updated_at: string;
//   user?: {
//     id: number;
//     name: string;
//     email: string;
//     email_verified_at: string | null;
//     created_at: string;
//     updated_at: string;
//   };
// };

// export type NotesResponse = {
//   data: Note[];
//   total: number;
// };

export async function fetchNotes() {
  const res = await api.get<NotesResponse>("/notes");
  return res.data;
};

export async function createNote(payload: { content: string }) {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
};

export async function updateNote(id: number, payload: { content: string }) {
  const res = await api.put<Note>(`/notes/${id}`, payload);
  return res.data;
};

export async function deleteNote(id: number) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};