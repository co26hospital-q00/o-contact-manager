// Path: src-frontend/src/utils/groupContacts.ts

import type { ContactIndex } from '@/types/contact.types'

export interface ContactGroup {
  letter: string
  contacts: ContactIndex[]
}

const collator = new Intl.Collator('vi', { sensitivity: 'base' })

function getGroupLetter(name: string): string {
  const first = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .charAt(0)
    .toUpperCase()
  return /[A-Z]/.test(first) ? first : '#'
}

/**
 * Group contacts alphabetically (A-Z + '#' for non-alpha)
 * Sorts within each group using Vietnamese Intl.Collator
 */
export function groupByAlphabet(contacts: ContactIndex[]): ContactGroup[] {
  const map = new Map<string, ContactIndex[]>()

  const sorted = [...contacts].sort((a, b) =>
    collator.compare(a.displayName || '', b.displayName || '')
  )

  for (const c of sorted) {
    const letter = getGroupLetter(c.displayName || c.primaryEmail || '')
    if (!map.has(letter)) map.set(letter, [])
    map.get(letter)!.push(c)
  }

  // Sort keys: A-Z first, then '#'
  const keys = [...map.keys()].sort((a, b) => {
    if (a === '#') return 1
    if (b === '#') return -1
    return a.localeCompare(b)
  })

  return keys.map((letter) => ({ letter, contacts: map.get(letter)! }))
}