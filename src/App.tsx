import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import './App.css'
import Users from './components/users'

function App () {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <Users />
    </QueryClientProvider>
  )
}

export default App
