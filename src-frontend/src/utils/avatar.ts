// Path: src-frontend/src/utils/avatar.ts

import { AVATAR_COLORS } from '@/constants/config'

/**
 * Get initials from a display name (max 2 chars)
 */
export function getInitials(name: string | undefined | null): string {
  if (!name?.trim()) return '?'
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Get a deterministic avatar background color from a name
 */
export function getAvatarColor(name: string | undefined | null): string {
  if (!name) return AVATAR_COLORS[0]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const idx = Math.abs(hash) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}