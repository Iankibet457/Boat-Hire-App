import React from 'react'
import { Link } from 'react-router-dom'
import icon from './img/boat-rental-logo_29069-52.avif'




function Header() {
  return (
    <header className='header'>
        <div className='icon'>
            <img src={icon} alt="Boat Logo" />
        </div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <div>
            
            <input  type="text" placeholder='Search' />
        </div>
    </header>
  )
}

export default Header