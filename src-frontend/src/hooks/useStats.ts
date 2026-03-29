// Path: src-frontend/src/hooks/useStats.ts

import { useQuery } from '@tanstack/react-query'
import { getStats } from '@/api/meta.api'
import { getUdKeys } from '@/api/lookup.api'
import { queryKeys } from '@/constants/queryKeys'
import { STALE_TIME } from '@/constants/config'

/**
 * Global contact stats
 */
export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: getStats,
    staleTime: STALE_TIME.STATS,
  })
}

/**
 * All userDefined keys
 */
export function useUdKeys() {
  return useQuery({
    queryKey: queryKeys.udKeys,
    queryFn: getUdKeys,
    staleTime: STALE_TIME.UD_KEYS,
  })
}