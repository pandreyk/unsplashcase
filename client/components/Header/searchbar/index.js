import { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchContext } from '../../../context/searchContext'
import './searchBar.css'

const SearchBar = () => {
  const [quickSearch, setQuickSearch] = useState([])
  const searchInput = useRef()
  const { searchString, setSearchString, setRefSearch } = useContext(SearchContext)
  const router = useRouter()

  useEffect(async () => {
    setRefSearch(searchInput)

    const data = await fetch('/api/search/quick').then(res => res.json())
    setQuickSearch(data)

    if (router.route !== '/search') {
      setSearchString('')
    }
  }, [])

  const handleChange = (event) => {
    setSearchString(event.target.value)
  }

  const handleClick = (item) => {
    setSearchString(item)
    searchInput.current.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchString !== '' && searchString.trim().length !== 0) {
      router.push(`/search?query=${searchString.trim()}`)

      if (document.body.clientWidth <= 768) {
        const wrapper = document.getElementById('__next')
        const body = document.body

        body.classList.remove('lock-scroll')
        wrapper.classList.remove('show-float-header')
        wrapper.classList.remove('selectSearch')
      } 
    }
  }

  return (
    <div className='header-search container'>
      <input 
        type='text'
        placeholder='Поиск'
        ref={searchInput}
        value={searchString}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className='search-quick'>
        <div className='search-quick-overflow'>
          {
            quickSearch.map((item, index) => (
              <label 
                className='search-quick-item'
                key={index}
                onClick={() => handleClick(item)}
              >
                {item} 
              </label>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SearchBar