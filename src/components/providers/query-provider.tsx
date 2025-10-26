'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // How long to cache data in memory before it's considered stale
        staleTime: 60 * 1000, // 1 minute
        // How long to keep unused data in memory
        gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
        // Retry failed requests
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (error instanceof Error && error.message.includes('4')) {
            return false
          }
          // Retry up to 3 times for other errors
          return failureCount < 3
        },
        // Refetch on window focus
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Retry failed mutations
        retry: (failureCount, error) => {
          // Don't retry on validation errors (usually 4xx)
          if (error instanceof Error && error.message.includes('Invalid')) {
            return false
          }
          // Retry up to 2 times for other errors
          return failureCount < 2
        },
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools 
        initialIsOpen={false} 
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  )
}