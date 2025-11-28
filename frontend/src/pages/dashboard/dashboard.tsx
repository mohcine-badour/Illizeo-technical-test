"use client";

import { useState } from "react";
import Header from "../../components/Home/Header";
import CreateNewNote from "../../components/Notes/CreateNewNote";
import NoteItem from "../../components/Notes/NoteItem";
import DeletePopup from "../../components/Popups/Delete";
import EditNotePopup from "../../components/Popups/EditNote";
import { useNotes, useCreateNote, useUpdateNote, useDeleteNote } from "../../hooks/useNotes";
import { useGetUser } from "../../hooks/useAuth";
import { notify } from "../../utils/notifications";
import { Toaster } from "react-hot-toast";
import { formatDate } from "../../utils/formDate";

export default function Dashboard() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedNoteContent, setSelectedNoteContent] = useState("");
  
  const { data: notesData, isLoading } = useNotes();
  const { data: user } = useGetUser();
  const { mutate: createNote, isPending: isCreating } = useCreateNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
  
  const notes = notesData?.data || [];

  const handleCreateNote = (content: string) => {
    createNote(
      { content },
      {
        onSuccess: () => {
          notify("Note created successfully", "success");
        },
        onError: () => {
          notify("Failed to create note", "error");
        },
      }
    );
  };

  const handleModify = (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setSelectedNoteId(id);
      setSelectedNoteContent(note.content);
      setShowEditPopup(true);
    }
  };

  const handleEditConfirm = (newContent: string) => {
    if (selectedNoteId) {
      updateNote(
        { id: selectedNoteId, payload: { content: newContent } },
        {
          onSuccess: () => {
            notify("Note updated successfully", "success");
            setShowEditPopup(false);
            setSelectedNoteId(null);
            setSelectedNoteContent("");
          },
          onError: () => {
            notify("Failed to update note", "error");
          },
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    setSelectedNoteId(id);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId, {
        onSuccess: () => {
          notify("Note deleted successfully", "success");
          setShowDeletePopup(false);
          setSelectedNoteId(null);
        },
        onError: () => {
          notify("Failed to delete note", "error");
        },
      });
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <DeletePopup
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
      <EditNotePopup
        open={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onConfirm={handleEditConfirm}
        initialContent={selectedNoteContent}
        isLoading={isUpdating}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to your notes dashboard.
          </h1>

          <div className="mt-8">
            <CreateNewNote onCreate={handleCreateNote} isLoading={isCreating} />
          </div>

          {isLoading ? (
            <div className="mt-8 flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="mt-8 text-center py-12">
              <p className="text-gray-500">No notes yet. Create your first note!</p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {notes.map((note) => {
                const isOwner = note.user_id === user?.id;
                const authorName = isOwner ? (user?.name || "User") : "Username";
                return (
                  <NoteItem
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    author={authorName}
                    createdAt={formatDate(note.created_at)}
                    onModify={handleModify}
                    onDelete={handleDelete}
                    showActions={isOwner}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
