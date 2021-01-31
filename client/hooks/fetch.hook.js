import { useEffect, useState } from 'react'
import Loader from '../components/loader/forPage'
import ErrorMessage from '../components/errorMessage'

export const useFetch = (serverData, url) => {
  const [data, setData] = useState(serverData)

  useEffect(async () => {
    if(!serverData){
      const json = await fetch(url).then(res => res.json())
      setData(json)
    } 
  }, [])

  const next = async () => {
    const json = await fetch(url).then(res => res.json())
    setData([...data, ...json])
  }

  return {data, loader: <Loader />, next, errorMessage: <ErrorMessage />}
}
