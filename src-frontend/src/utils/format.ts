// Path: src-frontend/src/utils/format.ts

/**
 * Format a display name — trim and fallback to 'Không tên'
 */
export function formatDisplayName(name: string | undefined | null): string {
  return name?.trim() || 'Không tên'
}

/**
 * Format a phone number — basic display formatting
 */
export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return ''
  // Vietnamese mobile: 0xxx xxx xxx
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }
  return phone
}

/**
 * Format an ISO date string to locale date
 */
export function formatDate(iso: string | undefined | null, locale = 'vi-VN'): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

/**
 * Relative time (e.g. "2 ngày trước")
 */
export function formatRelativeTime(iso: string | undefined | null, locale = 'vi-VN'): string {
  if (!iso) return ''
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    const seconds = Math.round(diff / 1000)
    const minutes = Math.round(seconds / 60)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    const months = Math.round(days / 30)
    const years = Math.round(months / 12)

    if (seconds < 60) return rtf.format(-seconds, 'second')
    if (minutes < 60) return rtf.format(-minutes, 'minute')
    if (hours < 24) return rtf.format(-hours, 'hour')
    if (days < 30) return rtf.format(-days, 'day')
    if (months < 12) return rtf.format(-months, 'month')
    return rtf.format(-years, 'year')
  } catch {
    return formatDate(iso, locale)
  }
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, max = 50): string {
  if (!str) return ''
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}