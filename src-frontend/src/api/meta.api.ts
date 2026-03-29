// Path: src-frontend/src/api/meta.api.ts

import apiClient from './client'
import type { StatsData } from '@/types/contact.types'

/**
 * Get global stats (total contacts, emails, etc.)
 */
export async function getStats(): Promise<StatsData> {
  const { data } = await apiClient.get<{ data: StatsData }>('/contacts/meta/stats')
  return data.data
}