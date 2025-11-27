"use client";

import { useState } from "react";
import Header from "../../components/Home/Header";
import CreateNewNote from "../../components/Notes/CreateNewNote";
import NoteItem from "../../components/Notes/NoteItem";
import DeletePopup from "../../components/Popups/Delete";
import EditNotePopup from "../../components/Popups/EditNote";

const initialNotes = [
  {
    id: 1,
    content:
      "Remember to finish the quarterly report by Friday. Need to include sales data and customer feedback analysis.",
    author: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    content:
      "Meeting notes: Discussed new product launch timeline. Marketing team needs 3 weeks for campaign preparation.",
    author: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    content:
      "Ideas for the team building event:\n- Escape room\n- Cooking class\n- Outdoor adventure\n- Board game night",
    author: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    createdAt: "Yesterday",
  },
  {
    id: 4,
    content:
      "Bug fix deployed to production. Issue with user authentication has been resolved. Monitoring for any new issues.",
    author: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    createdAt: "2 days ago",
  },
  {
    id: 5,
    content:
      "Client feedback summary: Overall positive response to the new UI design. Minor adjustments needed on mobile navigation.",
    author: "Lisa Thompson",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    createdAt: "3 days ago",
  },
];

export default function Dashboard() {
  const [notes, setNotes] = useState(initialNotes);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedNoteContent, setSelectedNoteContent] = useState("");

  const handleModify = (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setSelectedNoteId(id);
      setSelectedNoteContent(note.content);
      setShowEditPopup(true);
    }
  };

  const handleEditConfirm = (newContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, content: newContent } : note
      )
    );
    setShowEditPopup(false);
    setSelectedNoteId(null);
    setSelectedNoteContent("");
  };

  const handleDelete = (id: number) => {
    setSelectedNoteId(id);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== selectedNoteId)
    );
    setShowDeletePopup(false);
    setSelectedNoteId(null);
  };

  return (
    <>
      <DeletePopup
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
      />
      <EditNotePopup
        open={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onConfirm={handleEditConfirm}
        initialContent={selectedNoteContent}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to your notes dashboard.
          </h1>

          <div className="mt-8">
            <CreateNewNote />
          </div>

          <div className="mt-8 space-y-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                content={note.content}
                author={note.author}
                avatar={note.avatar}
                createdAt={note.createdAt}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
