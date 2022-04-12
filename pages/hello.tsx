import { useRouter } from 'next/router'
import useSWR from 'swr'
import Header from '../components/Header'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Person() {
  const { query } = useRouter()
  const { data, error } = useSWR('/api/hello',
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

    return (
      <><Header /><h1>Digamos {data.name}</h1></>
      
  )
}