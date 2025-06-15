import React from 'react'
import { NavLink } from 'react-router-dom'

const Saidbar = () => {
  return (
    <div>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/groups">Groups</NavLink>
        
    </div>
  )
}

export default Saidbar