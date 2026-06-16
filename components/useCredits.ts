'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface CreditsData {
  credits: number
  plan: string
}

export function useCredits() {
  const { isSignedIn } = useUser()
  const [data, setData] = useState<CreditsData>({ credits: 0, plan: 'free' })
  const [loading, setLoading] = useState(true)

  const fetchCredits = async () => {
    if (!isSignedIn) {
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/credits')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits()
    const interval = setInterval(fetchCredits, 30000)
    return () => clearInterval(interval)
  }, [isSignedIn])

  return { ...data, loading, refresh: fetchCredits }
}
