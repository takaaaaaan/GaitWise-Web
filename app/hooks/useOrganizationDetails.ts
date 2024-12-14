/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

import { Organization } from '@/app/types'

interface UseFetchOrganizationDetailsResult {
  data: Organization | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const useFetchOrganizationDetails = (organizationName: string): UseFetchOrganizationDetailsResult => {
  const [data, setData] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const url = `/api/organization/pagedetails?organizationName=${encodeURIComponent(organizationName)}`
      const response = await axios.get<Organization>(url)
      setData(response.data)
      setError(null)
    } catch (err: unknown) {
      // エラーの型ガード
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An unexpected error occurred')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (organizationName) {
      fetchData()
    }
  }, [organizationName])

  const refetch = () => {
    if (organizationName) {
      fetchData()
    }
  }

  return { data, loading, error, refetch }
}

export default useFetchOrganizationDetails
