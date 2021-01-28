import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePhoto } from '../../../hooks/photo.hook'
import { Blurhash } from "react-blurhash";
import { MdFileDownload, MdFavorite } from 'react-icons/md'
import { FiMaximize2 } from 'react-icons/fi'
import './card.css'

const Card = ({ item }) => {
  const [isLoading, setLoading] = useState(true)
  const { toggleFavorites, download, saved, isDownloading } = usePhoto(item)
  const image = useRef()

  useEffect(async () => {
    if (image.current.complete) {
      setLoading(false)
    }
  }, [image])

  const handleOnload = () => {
    setLoading(false)
  }

  return(
    <div>
      <Link href={`/photo?id=${item.id}`}>
        <a>
          <div className='card'>
            <img 
              ref={image}
              style={{display: isLoading && 'none'}}
              src={item.urls.small} 
              onLoad={handleOnload} 
            />
            {
              isLoading && item.blur_hash &&
                <Blurhash 
                  hash={item.blur_hash}
                  width='100%'
                  height='400px'
                />
            }
            <div className='card-info'>
              <div className='card-user'>
                <div className='card-user-avatar' >
                  <img src={item.user.profile_image.medium} />
                </div>
                <div className='card-user-info'>
                  <label>{item.user.name}</label> 
                  <label className='card-user-username'>@{item.user.username}</label>  
                </div>
              </div>
              <div className='card-buttons'>
                <div 
                  className='card-buttons-icons'
                  onClick={toggleFavorites}
                >
                  {saved ? <MdFavorite size={30} color='red' /> : <MdFavorite size={30} />}
                </div>
                <div className='card-buttons-icons'>
                  <FiMaximize2 size={30} />
                </div>
                <div 
                  className='card-buttons-icons'
                  onClick={download}
                >
                  {isDownloading ? <MdFileDownload color='gray' title='Downloading...' size={35} /> : <MdFileDownload size={35} />}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card;