import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-auto mt-19">
        {/* Main content goes here */}
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
