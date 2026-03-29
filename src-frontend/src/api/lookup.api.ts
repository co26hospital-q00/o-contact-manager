// Path: src-frontend/src/api/lookup.api.ts

import apiClient from './client'
import type { EmailLookupResult, UdKeyEntry, UdKeyLookupResult } from '@/types/contact.types'

/**
 * Lookup a contact by email address
 */
export async function getContactByEmail(email: string): Promise<EmailLookupResult> {
  const { data } = await apiClient.get<{ data: EmailLookupResult }>(
    `/contacts/by-email/${encodeURIComponent(email)}`
  )
  return data.data
}

/**
 * Get all contacts that have a specific userDefined key
 */
export async function getContactsByUdKey(key: string): Promise<UdKeyLookupResult> {
  const { data } = await apiClient.get<UdKeyLookupResult>(
    `/contacts/by-ud-key/${encodeURIComponent(key)}`
  )
  return data
}

/**
 * List all userDefined keys across all contacts
 */
export async function getUdKeys(): Promise<{ data: UdKeyEntry[]; meta: { total: number } }> {
  const { data } = await apiClient.get<{ data: UdKeyEntry[]; meta: { total: number } }>(
    '/contacts/ud-keys'
  )
  return data
}