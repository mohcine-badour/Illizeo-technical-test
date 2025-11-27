import { type ReactNode, createElement } from 'react'

export function highlightText(text: string, query: string): ReactNode {
  if (!query.trim()) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    // When splitting with capturing group, odd indices are matches
    if (index % 2 === 1) {
      return createElement(
        'mark',
        {
          key: index,
          className: 'bg-amber-200 text-amber-900 rounded px-0.5',
        },
        part
      )
    }
    return part
  })
}

