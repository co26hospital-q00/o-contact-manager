// Path: src-frontend/src/hooks/useContact.ts

import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/api/contacts.api'
import { queryKeys } from '@/constants/queryKeys'
import { STALE_TIME } from '@/constants/config'

/**
 * Fetch a single contact (index + detail merged)
 */
export function useContact(id: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.contacts.detail(id ?? ''),
    queryFn: () => getContact(id!),
    enabled: !!id,
    staleTime: STALE_TIME.CONTACT_DETAIL,
  })
}