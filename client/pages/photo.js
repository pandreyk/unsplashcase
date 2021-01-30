import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useСollections } from '../hooks/collections.hook'
import withPrivateRoute from '../components/withPrivateRoute'
import Layout from '../components/layout' 
import PhotoComponent from '../components/photoComponent'
import Gallery from '../components/gallery'

const Photo = ({data: serverData}) => {
  const router = useRouter()
  const [photo, setPhoto] = useState(serverData)
  const { photos, searchRelatedFromCollections, nextSearch, loader, errorMessage } = useСollections()

  useEffect(async () => {
    if(!serverData){
      await fetch(`/api/photo?id=${router.query.id}`)
      .then(response => response.json())
      .then(json => {
        setPhoto(json)
        searchRelatedFromCollections(json.related_collections)
      })
      .catch(e => setPhoto({ error: e.message }))
    } else {
      searchRelatedFromCollections(photo.related_collections)
    }
  }, [router.query.id])

  if (!photo) return loader
  if (photo.error) return errorMessage
  
  return(
    <Layout title='Photo'>
      <PhotoComponent photo={photo}/>

      <h1>Похожие фотографии</h1>
      <Gallery 
        images={photos} 
        next = {nextSearch}
      />
    </Layout>
  )
}

Photo.getInitialProps = async ({req, query}) => {
  let data = null

  if(req){
    await fetch(`${process.env.UNSPLASH}/photos/${query.id}?client_id=${process.env.ACCESS_KEY}`)
      .then(response => response.json())
      .then(json => data = json)
      .catch(e => data = { error: e.message })
  }
  
  return { data }
}

export default withPrivateRoute(Photo)