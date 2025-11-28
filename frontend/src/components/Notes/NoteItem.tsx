'use client'

import { useState } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeletePopup from '../Popups/Delete'
import Avatar from '../Avatar/Avatar'

interface NoteItemProps {
  id: number
  content: string
  author: string
  avatar?: string
  createdAt: string
  onModify?: (id: number) => void
  onDelete?: (id: number) => void
  showActions?: boolean
}

export default function NoteItem({
  id,
  content,
  author,
  avatar,
  createdAt,
  onModify,
  onDelete,
  showActions = true,
}: NoteItemProps) {
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const handleDeleteClick = () => {
    setShowDeletePopup(true)
  }

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false)
    onDelete?.(id)
  }

  return (
    <>
      <DeletePopup
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Avatar username={author} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-900">{author}</span>
              <span className="ml-2 text-sm text-gray-500">{createdAt}</span>
            </div>
            {showActions && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onModify?.(id)}
                  className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                  title="Modify"
                >
                  <PencilSquareIcon className="size-5" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <TrashIcon className="size-5" />
                </button>
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
    </>
  )
}

