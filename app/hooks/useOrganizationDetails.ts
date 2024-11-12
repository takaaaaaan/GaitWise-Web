'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Organization } from 'types'

const useFetchOrganizationDetails = (organizationName: string) => {
  const [data, setData] = useState<Organization | null>(null) // 型を適用
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null) // エラーにも型を付ける

  const fetchData = async () => {
    setLoading(true)
    try {
      // API エンドポイント
      const url = `/api/organization/pagedetails?organizationName=${encodeURIComponent(organizationName)}`

      // Axios を使用して API を呼び出す
      const response = await axios.get(url) // Axios のジェネリクスに型を指定
      console.log('Response:', response.data)
      // 成功時の処理
      setData(response.data)
      setError(null) // エラーをリセット
    } catch (error: any) {
      if (error.response) {
        console.error('Error Response:', error.response.data)
      } else if (error.request) {
        console.error('No Response Received:', error.request)
      } else {
        console.error('Axios Error:', error.message)
      }
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    if (organizationName) {
      fetchData()
    }
  }, [organizationName])

  // 再取得用の関数
  const refetch = () => {
    if (organizationName) {
      fetchData()
    }
  }

  return { data, loading, error, refetch }
}

export default useFetchOrganizationDetails
