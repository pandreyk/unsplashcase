import { useEffect } from 'react'
import $ from 'jquery'
import './anchor.css'

export const Anchor = () => {
  useEffect(() => {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
        $('.anchor').addClass('show')
      } else if ($(this).scrollTop() <= 300) {
        $('.anchor').removeClass('show')
      }
    })
  }, [])

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div 
        className='anchor'
        onClick={handleClick}
      >
        <div className='anchor-icon'><img src='arrowUp.png' /></div>
      </div>
    </div>
  )
}

export default Anchor