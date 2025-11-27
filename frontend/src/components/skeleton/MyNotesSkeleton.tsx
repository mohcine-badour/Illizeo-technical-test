export default function MyNotesSkeleton() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 animate-pulse">
          <div className="flex min-w-0 gap-x-4">
            {/* Avatar skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="min-w-0 flex-auto">
              {/* Name skeleton */}
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              {/* Content skeleton */}
              <div className="h-3 w-64 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            {/* Date skeleton */}
            <div className="hidden sm:block h-3 w-16 bg-gray-200 rounded" />
            {/* Action buttons skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gray-200" />
              <div className="w-9 h-9 rounded-lg bg-gray-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

