import { useContext } from 'react'
import { SearchContext } from '../../../context/searchContext'
import './history.css'

const SearchBar = () => {
  const { historySearch, setSearchString, refSearch } = useContext(SearchContext)

  const handleClick = (item) => {    
    const wrapper =  document.getElementById('__next')
    wrapper.classList.add('selectSearch')
    wrapper.classList.remove('selectHistory')

    setSearchString(item)
    refSearch.current.focus()    
  }

  return (
    <div className='header-history container'>
        <h1>Ваши запросы</h1>
        <div className='history'>
          {
            historySearch.map((item, index) => (
              <label 
                className='history-item'
                onClick={() => handleClick(item)}
                key={index}
              >
                {item}
              </label>
            ))
          }
        </div>
    </div>
  )
}

export default SearchBar