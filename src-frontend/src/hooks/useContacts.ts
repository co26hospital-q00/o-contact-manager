// Path: src-frontend/src/hooks/useContacts.ts

import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getContacts } from '@/api/contacts.api'
import { queryKeys } from '@/constants/queryKeys'
import { STALE_TIME } from '@/constants/config'
import type { ContactsFilterParams } from '@/types/pagination.types'
import type { ContactIndex } from '@/types/contact.types'

/**
 * Single-page contacts list (for non-infinite use cases)
 */
export function useContacts(filters: ContactsFilterParams = {}) {
  return useQuery({
    queryKey: queryKeys.contacts.list(filters),
    queryFn: () => getContacts(filters),
    staleTime: STALE_TIME.CONTACTS_LIST,
  })
}

/**
 * Infinite-scroll contacts list with cursor pagination
 */
export function useInfiniteContacts(filters: ContactsFilterParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.contacts.list(filters),
    queryFn: ({ pageParam }) =>
      getContacts({ ...filters, cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? (lastPage.meta.nextCursor ?? undefined) : undefined,
    staleTime: STALE_TIME.CONTACTS_LIST,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      contacts: data.pages.flatMap((p) => p.data) as ContactIndex[],
    }),
  })
}