import { useEffect } from 'react'
import Router from 'next/router'
import Navbar from './navbar'
import SearchBar from './searchbar'
import History from './history'
import $ from 'jquery'
import './header.css'

const Header = () => {
  useEffect(() => {
    const wrapper = $('#__next')
    const body = $('body')
    var scrollPrev = 0

    if (Router.route === '/' && $(window).scrollTop() === 0 && document.body.clientWidth > 768) {
      wrapper.addClass('show-float-header')
      wrapper.addClass('selectSearch')
    } else if (Router.route !== '/' && $(window).scrollTop() === 0 && document.body.clientWidth > 768) {
      wrapper.removeClass('show-float-header')
      wrapper.removeClass('selectSearch')
    }

    $(window).scroll(function() {
      var scrolled = $(window).scrollTop()

      if (scrolled > scrollPrev && document.body.clientWidth > 768) {
        body.removeClass('lock')
        wrapper.removeClass('show-float-header')
        wrapper.removeClass('selectSearch')
        wrapper.removeClass('selectHistory')
      } else if (Router.route === '/' && scrolled <= 0 && !wrapper.hasClass('selectHistory') && document.body.clientWidth > 768) {
        wrapper.addClass('show-float-header')
        wrapper.addClass('selectSearch')
        wrapper.removeClass('selectHistory')
      } 
      scrollPrev = scrolled
    })
  }, [])

  return (
    <header> 
      <Navbar />
      <div className='float-header'>
        <SearchBar />
        <History />
      </div>
    </header>   
  )
}

export default Header