import Masonry from 'react-masonry-css'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './card'
import Loader from '../loader/small'
import './gallery.css'

const Gallery = ({ images, next }) => {
  const router = useRouter()

  const breakpointColumns = {
    default: 3,
    768: 2,
    576: 1
  }

  return(
    <InfiniteScroll 
      className='gallery'
      dataLength = {images.length}
      loader = {router.pathname !== '/favorites' ? <Loader /> : ''}
      hasMore = {true}
      next = {next}
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {
          images.map((item, index) => (
            <Card
              item={item}  
              key={index}  
            />
          ))
        }
      </Masonry>
    </InfiniteScroll>
  )
}

export default Gallery
