'use client'

import { useState } from 'react'
import Header from '../../components/Home/Header'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeletePopup from '../../components/Popups/Delete'
import EditNotePopup from '../../components/Popups/EditNote'

const allNotes = [
  {
    id: 1,
    content: 'Remember to finish the quarterly report by Friday. Need to include sales data and customer feedback analysis.',
    author: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '3h ago',
    createdAtDateTime: '2023-01-23T13:23Z',
  },
  {
    id: 2,
    content: 'Meeting notes: Discussed new product launch timeline. Marketing team needs 3 weeks for campaign preparation.',
    author: 'Michael Foster',
    email: 'michael.foster@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '5h ago',
    createdAtDateTime: '2023-01-23T11:23Z',
  },
  {
    id: 3,
    content: 'Ideas for the team building event: Escape room, Cooking class, Outdoor adventure, Board game night.',
    author: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: 'Yesterday',
    createdAtDateTime: '2023-01-22T09:00Z',
  },
  {
    id: 4,
    content: 'Bug fix deployed to production. Issue with user authentication has been resolved. Monitoring for any new issues.',
    author: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2 days ago',
    createdAtDateTime: '2023-01-21T14:30Z',
  },
  {
    id: 5,
    content: 'Overall positive response to the new UI design. Minor adjustments needed on mobile navigation.',
    author: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '3 days ago',
    createdAtDateTime: '2023-01-20T10:15Z',
  },
  {
    id: 6,
    content: 'Review of Q1 goals and progress. Need to schedule follow-up meetings with department heads.',
    author: 'Tom Cook',
    email: 'tom.cook@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '1 week ago',
    createdAtDateTime: '2023-01-16T16:45Z',
  },
]

export default function MyNotes() {
  const currentUser = 'Leslie Alexander'
  const myNotes = allNotes.filter((note) => note.author === currentUser)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)
  const [selectedNoteContent, setSelectedNoteContent] = useState('')

  const handleDeleteClick = (id: number) => {
    setSelectedNoteId(id)
    setShowDeletePopup(true)
  }

  const handleDeleteConfirm = () => {
    console.log('Delete note:', selectedNoteId)
    setShowDeletePopup(false)
    setSelectedNoteId(null)
  }

  const handleUpdateClick = (id: number, content: string) => {
    setSelectedNoteId(id)
    setSelectedNoteContent(content)
    setShowEditPopup(true)
  }

  const handleEditConfirm = (newContent: string) => {
    console.log('Update note:', selectedNoteId, 'New content:', newContent)
    setShowEditPopup(false)
    setSelectedNoteId(null)
    setSelectedNoteContent('')
  }

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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Notes</h1>
          <p className="text-gray-500 mb-6">You have {myNotes.length} notes</p>
          <ul role="list" className="divide-y divide-gray-100">
            {myNotes.map((note) => (
              <li
                key={note.id}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={note.imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {note.author}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{note.content}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-xs/5 text-gray-500">
                      <time dateTime={note.createdAtDateTime}>{note.createdAt}</time>
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
            ))}
          </ul>
        </main>
      </div>
    </>
  )
}
