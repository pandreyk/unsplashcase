import { useState, useEffect } from 'react'
import { usePhoto } from '../../../hooks/photo.hook'
import { MdFileDownload, MdFavorite } from 'react-icons/md'
import './topBar.css'

const PhotoComponent = ({photo}) => {
  const { toggleFavorites, download, saved, isDownloading, isLiking } = usePhoto(photo)

  return(
    <div className='photo-topbar'>
      <div className='photo-user'>
        <img 
          className='photo-user-avatar'
          src={photo.user.profile_image.medium} 
        />
        <div className='photo-user-info'>
          <label>{photo.user.name}</label> 
          <label className='photo-user-username'>@{photo.user.username}</label>  
        </div>
      </div>
      <div className='photo-buttons'>
        <div className='photo-like'>
          <div
            className='photo-like-icon'
            onClick={toggleFavorites}
          >
            {saved ? <MdFavorite color='red' /> : isLiking ? <MdFavorite color='#474747' /> : <MdFavorite />}
          </div>
        </div>
           <div 
              className='photo-download'
              style={{backgroundColor: isDownloading && 'gray'}}
              onClick={download}
            >
            <div className='photo-download-icon'><MdFileDownload /></div>
            <label className='photo-download-txt'>
              {isDownloading ? 'Downloading...': 'Download'}
            </label>
          </div>
      </div>
    </div>
  )
}

export default PhotoComponent