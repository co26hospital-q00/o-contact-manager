// Path: src-frontend/src/api/bulk.api.ts

import apiClient from './client'
import type { ContactFormData, BulkImportResult, ImportJobStatus } from '@/types/contact.types'

/**
 * Start an async bulk import job
 */
export async function importContacts(
  contacts: ContactFormData[],
  sourceFile?: string
): Promise<BulkImportResult> {
  const { data } = await apiClient.post<{ data: BulkImportResult; meta: Omit<BulkImportResult, 'jobId'> }>(
    '/contacts/bulk/import',
    { contacts, sourceFile }
  )
  return { ...data.data, ...data.meta }
}

/**
 * Poll import job status
 */
export async function getImportJobStatus(jobId: string): Promise<ImportJobStatus> {
  const { data } = await apiClient.get<{ data: ImportJobStatus }>(
    `/contacts/bulk/import/${jobId}`
  )
  return data.data
}

/**
 * Export contacts as JSON or VCF blob
 */
export async function exportContacts(params: {
  format?: 'json' | 'vcf'
  limit?: number
  category?: string
}): Promise<Blob> {
  const response = await apiClient.get('/contacts/bulk/export', {
    params,
    responseType: 'blob',
  })
  return response.data as Blob
}