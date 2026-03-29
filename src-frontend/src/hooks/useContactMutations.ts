// Path: src-frontend/src/hooks/useContactMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createContact, updateContact, patchContact, deleteContact } from '@/api/contacts.api'
import { queryKeys } from '@/constants/queryKeys'
import type { ContactFormData } from '@/types/contact.types'

export function useContactMutations() {
  const qc = useQueryClient()

  const create = useMutation({
    mutationFn: (data: ContactFormData) => createContact(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.contacts.lists() })
      toast.success('Đã tạo liên hệ')
    },
    onError: (err: Error) => toast.error(err.message || 'Tạo thất bại'),
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContactFormData }) =>
      updateContact(id, data),
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.contacts.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.contacts.lists() })
      toast.success('Đã cập nhật liên hệ')
    },
    onError: (err: Error) => toast.error(err.message || 'Cập nhật thất bại'),
  })

  const patch = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactFormData> }) =>
      patchContact(id, data),
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.contacts.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.contacts.lists() })
      toast.success('Đã cập nhật')
    },
    onError: (err: Error) => toast.error(err.message || 'Cập nhật thất bại'),
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: (_res, id) => {
      qc.removeQueries({ queryKey: queryKeys.contacts.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.contacts.lists() })
      toast.success('Đã xóa liên hệ')
    },
    onError: (err: Error) => toast.error(err.message || 'Xóa thất bại'),
  })

  return { create, update, patch, remove }
}