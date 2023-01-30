import React from 'react';

function Navbar() {
    return (
      <div className='navbar'>
        <a href='/home' className='nav-link'>
          About/ Home
        </a>
        <br />
        <a href='/post' className='nav-link'>
          Post Poem
        </a>
        <br />
        <a href='' className='nav-link'>
          Newsletter
        </a>
        <br />
        <a href='/digital' className='nav-link'>
          Digital Works
        </a>
        <br />
        <a href='/physical' className='nav-link'>
          Store/ Physical Works
        </a>
        <br />
        <a href='/contact' className='nav-link'>
          Contact
        </a>
      </div>
    );
  }
  
  export default Navbar;