import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.css'

function Navbar() {
  return (
    <nav className="container flex mx-auto p-4 justify-between lg:w-screen-lg">
      <Link className="w-full" to="/">
        <img src="/hospital.svg" alt="EHR sharing" width="80" />
      </Link>
      <div className="flex">
        <NavLink to="/" exact>
          Provider
        </NavLink>
        <NavLink to="/requestor">Requestor</NavLink>
        {/* <NavLink to="/paginated">Requestor</NavLink> */}
        {/* <NavLink to="/infinite">Infinite</NavLink> */}
      </div>
    </nav>
  )
}

export default Navbar
