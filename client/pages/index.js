import { useFetch } from '../hooks/fetch.hook'
import withPrivateRoute from '../components/withPrivateRoute'
import Layout from '../components/layout' 
import Gallery from '../components/gallery' 

function HomePage({data: serverData}) {
  const { data, loader, next, errorMessage } = useFetch(serverData, '/api/random')

  if (!data) return loader
  if (data.error) return errorMessage

  return (
    <Layout title='Home Page'>
      <Gallery 
        images={data}
        next = {next} 
      />
    </Layout>
  )
}

HomePage.getInitialProps = async ({req}) => {
  let data = null

  if(req){
    await fetch(`${process.env.UNSPLASH}/photos/random?client_id=${process.env.ACCESS_KEY}&count=15`)
    .then(response => response.json())
    .then(json => data = json)
    .catch(e => data = { error: e.message })
  }
  
  return { data }
}

export default withPrivateRoute(HomePage)