import { useState, useEffect, useContext } from 'react'
import { SearchContext } from '../../../context/searchContext'
import './bottomBar.css' 

const PhotoComponent = ({tags}) => {
  const [photoTags, setTags] = useState([])
  const { setSearchString, refSearch } = useContext(SearchContext)

  useEffect(() => {
    setTags(tags.filter(item => item.type === 'landing_page'))
  }, [tags])

  const searchByTag = (item) => {
    const wrapper = document.getElementById("__next")
    wrapper.classList.add('show-float-header')
    wrapper.classList.add('selectSearch')
    wrapper.classList.remove('selectHistory')

    setSearchString(item)
    refSearch.current.focus()
  }

  return(
    <div className='photo-bottombar container'>
      <label className='photo-bottombar-txt'>Похожие теги</label>
      <div className='photo-tags'>
        <div className='photo-tags-overflow '>
          {
            photoTags.length !== 0 ? photoTags.filter(item => item.type === 'landing_page').map((item, index) => (
              <label 
                className='photo-tags-item'
                onClick={() => searchByTag(item.title)} 
                key={index}
              >
                {item.title}
              </label>
            )) : 
            <label>Пользователь не указал теги</label>
          }
        </div>
      </div>
    </div>
  )
}

export default PhotoComponent;