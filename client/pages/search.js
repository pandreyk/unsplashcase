import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchContext } from '../context/searchContext'
import Layout from '../components/layout'
import Gallery from '../components/gallery' 
import withPrivateRoute from '../components/withPrivateRoute'

function SearchPage() {
  const router = useRouter()
  const { images, searchImages, nextSearch } = useContext(SearchContext)

  useEffect (() => {
    const query = decodeURI(router.asPath.split('query=').pop())
    searchImages(query)
    window.scrollTo(0, 0)
  }, [router.query.query])

  return (
    <Layout title='Search Page'>
      <Gallery 
        images={images} 
        next={nextSearch}
      />
    </Layout>
  )
}

export default withPrivateRoute(SearchPage)
