import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import './photoItem.css'

const PhotoComponent = ({urls}) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const image = useRef()

  useEffect(() => {
    setLoading(true)
  }, [router.query.id])
  
  useEffect(() => {
    if (image.current.complete) {
      setLoading(false)
    }
  }, [image])

  const handleOnLoad = () => {
    setLoading(false)
  }

  const fullScreen = () => {
    const wrapper = document.getElementsByClassName('photo-blur-wrapper')[0]
    wrapper.classList.toggle('fullscreeen')
  }

  return(
    <div className='photo-item'>
      <div className='photo-item-wrapper'>
        <img 
          ref={image}
          style={{visibility: isLoading && 'hidden'}}
          src={urls.regular}
          onLoad={handleOnLoad}
        /> 
        { isLoading && <label className='loading-text'>Wait, photo is loading...</label> }
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