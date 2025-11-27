export default function AddNoteItemSkeleton() {
  return (
    <li className="flex justify-between gap-x-6 py-5 animate-pulse bg-amber-50/50 rounded-lg px-4">
      <div className="flex min-w-0 gap-x-4">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 rounded-full bg-amber-200" />
        <div className="min-w-0 flex-auto">
          {/* Name skeleton */}
          <div className="h-4 w-32 bg-amber-200 rounded mb-2" />
          {/* Content skeleton */}
          <div className="h-3 w-48 bg-amber-200 rounded" />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        {/* "Creating..." text */}
        <span className="text-xs text-amber-600 font-medium">Creating...</span>
      </div>
    </li>
  );
}

