import { ToastProvider } from 'react-toast-notifications'
import { SearchContext } from '../context/searchContext'
import { useSearch } from '../hooks/search.hook'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { images, historySearch, searchImages, nextSearch, 
    removeHistory, searchString, setSearchString, refSearch, setRefSearch } = useSearch()

  return (
    <SearchContext.Provider value={{
      images, historySearch, searchImages, nextSearch, 
      removeHistory, searchString, setSearchString, refSearch, setRefSearch
    }}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SearchContext.Provider>
  )
}

export default MyApp
