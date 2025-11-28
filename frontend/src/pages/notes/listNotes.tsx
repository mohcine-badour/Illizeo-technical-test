import { useState, useMemo } from 'react'
import Header from '../../components/Home/Header'
import Avatar from '../../components/Avatar/Avatar'
import { useGetUser } from '../../hooks/useAuth'
import { useNotes } from '../../hooks/useNotes'
import { highlightText } from '../../utils/search'
import { formatDate } from '../../utils/formDate'

export default function ListNotes() {
  const { data: user } = useGetUser()
  const { data: notesData, isLoading } = useNotes()
  const currentUser = user?.name || ''
  const [searchQuery, setSearchQuery] = useState('')

  const notes = notesData?.data || []

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes

    const query = searchQuery.toLowerCase()
    return notes.filter((note) => {
      const isMyNote = note.user_id === user?.id
      const authorName = isMyNote ? (currentUser || 'User') : 'Username'
      return (
        note.content.toLowerCase().includes(query) ||
        authorName.toLowerCase().includes(query)
      )
    })
  }, [searchQuery, notes, currentUser, user?.id])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Notes</h1>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery.trim() 
                ? `No notes found matching "${searchQuery}"`
                : 'No notes yet. Create your first note!'}
            </p>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {filteredNotes.map((note) => {
              const isMyNote = note.user_id === user?.id
              const authorName = isMyNote ? (currentUser || 'User') : 'Username'
              return (
                <li
                  key={note.id}
                  className={`flex justify-between gap-x-6 py-5 px-4 rounded-lg ${
                    isMyNote ? 'bg-amber-50' : ''
                  }`}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-none">
                      <Avatar username={authorName} />
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {highlightText(authorName, searchQuery)}
                        {isMyNote && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                            You
                          </span>
                        )}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {highlightText(note.content, searchQuery)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="mt-1 text-xs/5 text-gray-500">
                      <time dateTime={note.created_at}>{formatDate(note.created_at)}</time>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
