import Header from '../components/Header'

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
    author: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    author: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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

export default function ListNotes() {
  const currentUser = 'Leslie Alexander' // Current logged in user

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Notes</h1>
          <div className="relative">
            <input
              type="text"
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
        <ul role="list" className="divide-y divide-gray-100">
          {allNotes.map((note) => {
            const isMyNote = note.author === currentUser
            return (
              <li
                key={note.id}
                className={`flex justify-between gap-x-6 py-5 px-4 rounded-lg ${
                  isMyNote ? 'bg-amber-50' : ''
                }`}
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={note.imageUrl}
                    className={`size-12 flex-none rounded-full ${
                      isMyNote ? 'ring-2 ring-amber-500' : 'bg-gray-50'
                    }`}
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {note.author}
                      {isMyNote && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          You
                        </span>
                      )}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{note.content}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xs/5 text-gray-500">
                    <time dateTime={note.createdAtDateTime}>{note.createdAt}</time>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
