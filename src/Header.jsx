import React from 'react'
import icon from './img/boat-rental-logo_29069-52.avif'


function Header() {
  return (
    <header className='header'>
        <div className='icon'>
            <img src={icon} alt="Boat Logo" />
        </div>
        <div>Home</div>
        <div>About</div>
        <div>Services</div>
        <div>
            
            <input  type="text" placeholder='Search' />
        </div>
    </header>
  )
}

export default Header