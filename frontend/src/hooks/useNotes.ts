// src/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/notes";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    staleTime: 1000 * 60,
    retry: 1,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { title: string; content?: string } }) => updateNote(id, payload),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
