"use client";

import { useState } from "react";
import Header from "../../components/Home/Header";
import CreateNewNote from "../../components/Notes/CreateNewNote";
import Avatar from "../../components/Avatar/Avatar";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeletePopup from "../../components/Popups/Delete";
import EditNotePopup from "../../components/Popups/EditNote";
import {
  useNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from "../../hooks/useNotes";
import { useGetUser } from "../../hooks/useAuth";
import { notify } from "../../utils/notifications";
import { Toaster } from "react-hot-toast";
import { formatDate } from "../../utils/formDate";
import AddNoteItemSkeleton from "../../components/skeleton/AddNoteItemSkeleton";
import UpdateNoteItemSkeleton from "../../components/skeleton/UpdateNoteItemSkeleton";
import AllNotesSkeleton from "../../components/skeleton/AllNotesSkeleton";

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

  console.log(user);
  console.log(notes);

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
            <div className="mt-8">
              <AllNotesSkeleton />
            </div>
          ) : notes.length === 0 ? (
            <div className="mt-8 text-center py-12">
              <p className="text-gray-500">
                No notes yet. Create your first note!
              </p>
            </div>
          ) : (
            <ul role="list" className="mt-8 divide-y divide-gray-100">
              {isCreating && <AddNoteItemSkeleton />}
              {notes.map((note) => {
                const isOwner = note.user_id === user?.id || note.user?.id === user?.id;
                const authorName = note.user?.name || "User";
                return isUpdating && selectedNoteId === note.id ? (
                  <UpdateNoteItemSkeleton key={note.id} />
                ) : (
                  <li
                    key={note.id}
                    className={`flex justify-between gap-x-6 py-5 px-4 rounded-lg`}
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="flex-none">
                        <Avatar username={authorName} />
                      </div>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {authorName}
                          {isOwner && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                              You
                            </span>
                          )}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {note.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="mt-1 text-xs/5 text-gray-500">
                          <time dateTime={note.created_at}>
                            {formatDate(note.created_at)}
                          </time>
                        </p>
                      </div>
                      {isOwner && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleModify(note.id)}
                            className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Update"
                          >
                            <PencilSquareIcon className="size-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <TrashIcon className="size-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}
