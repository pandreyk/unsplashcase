import { useState, useEffect, useCallback, useRef } from 'react'

export const useSearch = () => {
  const [searchString, setSearchString] = useState('')
  const [images, setImages] = useState([])
  const [historySearch, setHistorySearch] = useState([])
  const [refSearch, setRefSearch] = useState()
  const page = useRef(1)

  const getHistory = useCallback(async () => {
    const response = await fetch(`/api/history/getHistory`)
    const data = await response.json()
    
    setHistorySearch(data)
  }, [])

  useEffect(async() => {
    getHistory()
  }, [])

  const search = async (searchString, page) => {
    const response = await fetch(`/api/search`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stringSearch: encodeURI(searchString), 
        page
      })
    })
    const data = await response.json()

    return data
  }

  const nextSearch = async () => {
    page.current++
    const data = await search(searchString, page.current)
    
    setImages([...images, ...data.results])
  }

  const searchImages = async (query) => {
    const data = await search(query, page)

    setImages(data.results)
    setSearchString(query)

    const res = await fetch(`/api/history/addToHistory?stringSearch=${encodeURIComponent(query)}`)
    if (res.status === 200) {
      getHistory()
    }
  }

  const removeHistory = async () => {
    const response = await fetch(`/api/history/removeHistory`)
    if (response.status === 200) {
      setHistorySearch([null])
    }
  }

  return { images, 
    historySearch, searchImages, 
    nextSearch, removeHistory, 
    searchString, setSearchString, 
    refSearch, setRefSearch 
  }
}
