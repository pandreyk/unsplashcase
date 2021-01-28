import Header from '../header'
import Loader from './small'
import './loader.css'

const LoaderForPage = () => {
  return (
    <>
      <Header />
      <div className='loader-wrapper'>
        <Loader />
      </div>
    </>
  )
}

export default LoaderForPage