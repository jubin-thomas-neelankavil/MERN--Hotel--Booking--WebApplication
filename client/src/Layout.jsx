import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className='py-4 px-8 flex flex-col min-h-screen max-w-xxl mx-auto' style={{width:"770px"}}>
          <Header />
          <Outlet/>
    </div>
  )
}

export default Layout