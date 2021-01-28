import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import './PhotoItem.css'

const PhotoComponent = ({urls}) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)

  useEffect(async () => {
    setLoading(true)
  }, [router.query.id])

  const fullScreen = () => {
    const wrapper = document.getElementsByClassName('photo-blur-wrapper')[0]
    wrapper.classList.toggle('fullscreeen')
  }

  const handleOnLoad = () => {
    setLoading(false)
  }

  return(
    <div className='photo-item'>
      <div className='photo-item-wrapper'>
        { isLoading && <label className='loading-text'>Wait, photo is loading...</label> }
        <img 
          style={{visibility: isLoading && 'hidden'}}
          onLoad={handleOnLoad} 
          src={urls.regular}
        /> 
        <div
          style={{display: isLoading && 'none'}}
          className='btn-fullscreen'
          onClick={fullScreen}
        >
          <img src='maxisize.png' />
        </div>             
      </div>
    </div> 
  )
}

export default PhotoComponent














// {
//   isLoading &&
//    <Blurhash 
//       hash={photo.blur_hash}
//       width='100%'
//       height='100%'
//     />            
// }   