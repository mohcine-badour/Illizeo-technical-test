"use client";

import { useState, useMemo } from "react";
import Header from "../../components/Home/Header";
import Avatar from "../../components/Avatar/Avatar";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import DeletePopup from "../../components/Popups/Delete";
import EditNotePopup from "../../components/Popups/EditNote";
import AddNotePopup from "../../components/Popups/AddNote";
import { useNotes, useDeleteNote, useCreateNote } from "../../hooks/useNotes";
import { useUpdateNote } from "../../hooks/useNotes";
import { useGetUser } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formDate";
import { notify } from "../../utils/notifications";
import { Toaster } from "react-hot-toast";
import MyNotesSkeleton from "../../components/skeleton/MyNotesSkeleton";
import AddNoteItemSkeleton from "../../components/skeleton/AddNoteItemSkeleton";
import UpdateNoteItemSkeleton from "../../components/skeleton/UpdateNoteItemSkeleton";

export default function MyNotes() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedNoteContent, setSelectedNoteContent] = useState("");
  const { data: user } = useGetUser();
  const { data: notesData, isLoading } = useNotes();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  const { mutate: createNote, isPending: isCreating } = useCreateNote();
  
  const notes = useMemo(() => {
    if (!user?.id || !notesData?.data) return [];
    return notesData.data.filter((note) => note.user_id === user.id || note.user?.id === user.id);
  }, [notesData, user]);
  
  const totalNotes = notes.length;


  const handleDeleteClick = (id: number) => {
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
      });
    }
  };

  const handleUpdateClick = (id: number, content: string) => {
    setSelectedNoteId(id);
    setSelectedNoteContent(content);
    setShowEditPopup(true);
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
        }
      );
    }
  };

  const handleAddConfirm = (content: string) => {
    createNote(
      { content },
      {
        onSuccess: () => {
          notify("Note created successfully", "success");
          setShowAddPopup(false);
        },
      }
    );
  };

  return (
    <>
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
      <AddNotePopup
        open={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onConfirm={handleAddConfirm}
        isLoading={isCreating}
      />
      <div className="min-h-screen bg-white">
      <Toaster position="bottom-right" reverseOrder={false} />
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              <p className="text-gray-500 mt-1">You have {totalNotes} notes</p>
            </div>
            <button
              onClick={() => setShowAddPopup(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <PlusIcon className="size-5" />
              Add new note
            </button>
          </div>
          {isLoading ? (
            <MyNotesSkeleton />
          ) : notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No notes yet. Create your first note!
              </p>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
              {isCreating && <AddNoteItemSkeleton />}
              {notes.map((note) => (
                isUpdating && selectedNoteId === note.id ? (
                  <UpdateNoteItemSkeleton key={note.id} />
                ) : (
                <li key={note.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <Avatar username={user?.name || "User"} />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {note.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-xs/5 text-gray-500">
                        <time dateTime={note.created_at}>
                          {formatDate(note.created_at)}
                        </time>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateClick(note.id, note.content)}
                        className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="Update"
                      >
                        <PencilSquareIcon className="size-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(note.id)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </div>
                  </div>
                </li>
                )
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}
