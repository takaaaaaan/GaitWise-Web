import { useEffect, useState } from 'react'

import { getToken } from '@/utils/getToken'

interface OrganizationData {
  organization_name: string
  projects: string[]
}

const useNavPage = () => {
  const [data, setData] = useState<OrganizationData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) {
        setError('Token not found')
        setLoading(false)
        return
      }

      const response = await fetch('/api/organization/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'API error occurred')
        setLoading(false)
        return
      }

      const result = await response.json()
      if (result.success && Array.isArray(result.data)) {
        setData(result.data)
        console.log('Filtered Data:', result.data)
      } else {
        setError('Invalid response format')
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      setError('An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Function to refetch data
  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useNavPage
