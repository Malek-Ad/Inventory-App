import React, { useState } from "react";
import { Link } from "react-router-dom";


const NavBar = ({items,setItems,setrefresh,refresh , setfiltred}) => {
const search=(elm)=>{
let filtered=items.filter((el)=>{
    console.log('here2',el.name,search)
    return el.name.toLowerCase().includes(elm.toLowerCase())
})
console.log('here',filtered)
setfiltred(filtered)
}



  return (
    <nav className="navbar">
      <h2 className="navbar-title">Inventory Management</h2>
      <div className="navbar-search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{
        search(e.target.value)
      }}/> <button >Search</button>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link" onClick={()=>setrefresh(!refresh)}>Home</Link>
        </li>
        <li>
          <Link to="/movement" className="navbar-link">Movement</Link>
        </li>
        <li>
          <Link to="/createItem" className="navbar-link">Create Item</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
