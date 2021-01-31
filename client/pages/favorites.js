import Layout from '../components/layout' 
import Gallery from '../components/gallery' 
import { useFetch } from '../hooks/fetch.hook'
import withPrivateRoute from '../components/withPrivateRoute'

function FavoritesPage({data: serverData}) {
  const { data, loader } = useFetch(serverData, `/api/favorites/getFavorites`)

  if (!data) return loader

  return (
    <Layout title='Favorites Page'>
      {data.length === 0 && <h1 align='center'>Вы еще не добавили фото в избранное</h1>}
      <Gallery images={data} />
    </Layout>
  )
}

FavoritesPage.getInitialProps = async ({req, auth}) => {
  let data = null

  if(req) {
    let response = await fetch(
      `${process.env.API_ADRESS}/favorites/getFavorites`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.accessToken
      }
    })
    data = await response.json()
  }

  return { data }
}

export default withPrivateRoute(FavoritesPage)