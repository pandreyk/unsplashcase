import { createContext } from 'react'

function noop() {}

export const SearchContext = createContext({
  images: null,
  historySearch: null,
  searchImages: noop,
  nextSearch: noop, 
  removeHistory: noop,
  searchString: '', 
  setSearchString: noop,
  refSearch: null, 
  setRefSearch: noop
})