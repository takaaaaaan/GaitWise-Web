'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryState] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryState}>{children}</QueryClientProvider>
}
