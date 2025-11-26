'use client'

import { useState } from 'react'

export default function CreateNewNote() {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      console.log('New note:', content)
      setContent('')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add your note..."
              rows={3}
              className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-base"
            />
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                type="submit"
                disabled={!content.trim()}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

