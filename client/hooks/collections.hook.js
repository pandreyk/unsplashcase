import { useState, useRef } from 'react'
import Loader from '../components/loader/forPage'
import ErrorMessage from '../components/errorMessage'

export const useСollections = () => {
  const [photos, setPhotos] = useState([])
  const [collections, setCollections] = useState([])
  const page = useRef(1)
  const idCollections = useRef(0)

  const search = async (idCollections, page, collections) => {
    const response = await fetch(`/api/collections?id=${collections.results[idCollections].id}&page=${page}`)
    const data = await response.json()

    return data
  }

  const nextSearch = async () => {
    const next = async () => {
      if (idCollections.current === 2) {
        idCollections.current = 0
        page.current++
      } else {
        idCollections.current++
      }
      return await search(idCollections.current, page.current, collections)
    }

    let data

    do {
     data = await next()
    } while (data.length === 0) 
    
    setPhotos([...photos, ...data])
  }

  const searchRelatedFromCollections = async (collections) => {
    setCollections(collections)

    const data = await search(idCollections.current, page.current, collections)
    setPhotos(data)
  }

  return { photos, searchRelatedFromCollections, nextSearch, loader: <Loader />, errorMessage: <ErrorMessage /> }
}
