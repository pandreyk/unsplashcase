import Head from 'next/head'
import Header from '../header'
import Anchor from './anchor'

export const Layout = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />  
      <main>
        <div className='container'>
          {children}
        </div>
        <Anchor />
      </main>
    </>
  )
}

export default Layout