import { useContext } from 'react'
import Link from 'next/link'
import { SearchContext } from '../../../context/searchContext'
import { logout } from '../../../services/auth'
import { MdSearch, MdFavorite, MdHistory } from 'react-icons/md'
import './navbar.css'

const Navbar = () => {
  const { removeHistory } = useContext(SearchContext)

  const showElement = (add, remove) => {
    const wrapper = document.getElementById('__next')
    const body = document.body

    if(wrapper.classList.contains(remove)) {
      wrapper.classList.remove(remove)
      wrapper.classList.add(add)
    } else {
      wrapper.classList.toggle('show-float-header')
      wrapper.classList.toggle(add)
    }

    if (document.body.clientWidth <= 768 && wrapper.classList.contains(add) || wrapper.classList.contains(remove)) {
      body.classList.add('lock-scroll')
    } else {
      body.classList.remove('lock-scroll')
    }
  }

  const showSearch = () => showElement('selectSearch', 'selectHistory')

  const showHistory = () => showElement('selectHistory', 'selectSearch')

  return (
    <nav className='navbar'>
      <div className='navbar-container container'>
        <div className='navbar-left-side'> 
          <div className='navbar-dropdown'>
            <div className='navbar-logo'><img src='unsplash.png' /></div>
            <Link href="/">
              <a><label className='navbar-title'>ImageStock</label> </a>
            </Link>
            <div className='navbar-dropdown-content'>
              <div>
                <Link href="/">
                  <a><label>Домашняя страница</label></a>
                </Link>
              </div>
              <hr />
              <div><label onClick={removeHistory}>Очистить историю</label></div>
              <hr />
              <div><label onClick={logout}>Выйти</label></div>
            </div>
          </div>
        </div>
        
        <div className='navbar-menu'>
          <div>
            <div className='navbar-menu-item js-btn-search'>
              <div className='navbar-menu-item-name' onClick={showSearch}>
                <div className='navbar-menu-item-icon'><MdSearch/></div>
                <label>Поиск</label>
              </div>
            </div>
          </div>
          <div>
            <div className='navbar-menu-item'>
              <Link href="/favorites">
                <a>
                  <div className='navbar-menu-item-name'>
                    <div className='navbar-menu-item-icon'><MdFavorite/></div>
                    <label>Избранное</label>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div>
            <div className='navbar-menu-item js-btn-history'>
              <div className='navbar-menu-item-name' onClick={showHistory}>
                <div className='navbar-menu-item-icon'><MdHistory/></div>
                <label>История поиска</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>    
  )
}

export default Navbar