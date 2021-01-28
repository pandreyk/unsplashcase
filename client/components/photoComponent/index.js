import { useEffect } from 'react'
import { useRouter } from 'next/router'
import TopBar from './topbar'
import PhotoItem from './photoitem'
import BottomBar from './bottombar'
import $ from 'jquery'
import './photoComponent.css'

const PhotoComponent = ({photo}) => {
  const router = useRouter()

  useEffect(async () => {
    const body = $('body')
    const wrapper = $('#__next')
    const photoContainer = $('.photo-container')
    
    $(window).scroll(function() {
      var scrolled = $(window).scrollTop()

      if (router.route === '/photo' && scrolled <= document.body.clientHeight && photoContainer.hasClass('fullScreeen')) {
        body.removeClass('lock-scroll')
        wrapper.removeClass('show-float-header')
        wrapper.removeClass('selectSearch')
        wrapper.removeClass('selectHistory')
      }
    })
  
    if (photo) {
      $('.photo-blur-wrapper').css('background-image', `url(${photo.urls.small})`)
    }
  }, [photo])

  useEffect(() => {
    $('html, body').animate({scrollTop: 0},800)
  }, [router.query.id])

  if (!photo) return <h1>Loading...</h1>

  return(
    <div className='photo'>
      <div className='photo-blur-wrapper'>
        <div className='photo-blur'>
          <div className='photo-content container'>
            <TopBar photo={photo} />
            <PhotoItem urls={photo.urls} />
            <BottomBar tags={photo.tags} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoComponent