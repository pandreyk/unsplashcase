import { useState, useEffect } from 'react'

export const usePhoto = (photo) => {
  const [saved, setSaved] = useState()
  const [isDownloading, setDownloading] = useState(false) 
  const [isLiking, setLiking] = useState(false) 

  useEffect(async () => {   
    if (photo) {
      const response = await fetch(`/api/favorites/getSaved?id=${photo.id}`)
      const data = await response.json()
      setSaved(data.isSaved)
    }
  }, [photo])

  const toggleFavorites = async (e) => {
    e.preventDefault()
    setLiking(true)

    if(!isLiking){
      const response = await fetch(`/api/favorites/toggleFavorites`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo,
          saved
        })
      })
      const data = await response.json()
  
      setLiking(false)
      setSaved(data.saved)
    }
  }

  const download = (e) => {
    e.preventDefault()
    setDownloading(true)

    if(!isDownloading) {
      fetch(photo.urls.full)
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = url
        a.download = `${photo.id}.jpg`
        document.body.appendChild(a)
        a.click()  
        a.remove()
        setDownloading(false)
      })
    }
  }

  return { toggleFavorites, download, saved, isDownloading, isLiking }
}
