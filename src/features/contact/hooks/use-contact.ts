'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ContactFormData } from '@/features/contact/validations/contact'
import { createContactAction, getContactsAction } from '@/lib/actions'
import { ApiResponse, ContactInfo } from '@/shared/types/api'

// Query Keys
export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (filters: string) => [...contactKeys.lists(), { filters }] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
}

// Hook for fetching contacts
export function useContacts() {
  return useQuery({
    queryKey: contactKeys.lists(),
    queryFn: getContactsAction,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook for creating a contact
export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ContactFormData) => createContactAction(data),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate and refetch contact queries
        queryClient.invalidateQueries({ queryKey: contactKeys.all })
        
        // Optionally add the new contact to the cache optimistically
        queryClient.setQueryData(
          contactKeys.lists(),
          (oldData: ApiResponse<ContactInfo[]> | undefined) => {
            if (oldData?.success && oldData.data && result.data) {
              return {
                ...oldData,
                data: [result.data, ...oldData.data]
              }
            }
            return oldData
          }
        )
      }
    },
    onError: (error) => {
      console.error('Error creating contact:', error)
    },
  })
}

// Hook for contact form with enhanced error handling and loading states
export function useContactForm() {
  const mutation = useCreateContact()

  const submitContact = async (data: ContactFormData) => {
    try {
      const result = await mutation.mutateAsync(data)
      return result
    } catch (error) {
      // Error is already handled in the mutation
      throw error
    }
  }

  return {
    submitContact,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}