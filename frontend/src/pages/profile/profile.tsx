import { useMemo } from 'react'
import Header from '../../components/Home/Header'
import { useGetUser } from '../../hooks/useAuth'
import { useNotes } from '../../hooks/useNotes'

export default function Profile() {
  const { data: user, isLoading } = useGetUser()
  const { data: notesData } = useNotes()
  
  const totalNotes = useMemo(() => {
    if (!user?.id || !notesData?.data) return 0
    return notesData.data.filter((note) => note.user_id === user.id || note.user?.id === user.id).length
  }, [notesData, user])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : user ? (
          <>
            <div className="px-4 sm:px-0 flex items-center gap-4">
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900">User Profile</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Your personal details and account information.</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Company</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.company?.name || "N/A"}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Total notes</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                      {totalNotes} {totalNotes === 1 ? 'note' : 'notes'}
                    </span>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Member since</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatDate(user.created_at)}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Unable to load profile information.</p>
          </div>
        )}
      </main>
    </div>
  )
}

