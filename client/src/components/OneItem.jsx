import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


function OneItem({ setrefresh,refresh }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setname] = useState(state.name);
  const [ref, setref] = useState(state.ref);
  const [desc, setdesc] = useState(state.description);
  const [category, setcategory] = useState(state.category);
  const [img, setimg] = useState(state.img);
  const [criticalStock, setcriticalStock] = useState(state.criticalStock);
  const [quantity, setquantity] = useState(state.quantity);
  const [price, setprice] = useState(state.price);
  const [show, setshow] = useState(false);
  const handleUpdate = () => {
    axios
      .patch("http://localhost:3000/api/items/" + state.id, {ref:ref, name: name,description:desc,category:category,img:img,criticalStock:criticalStock,quantity:quantity, price: price })
      .then((res) => {
        setrefresh(!refresh);
        navigate("/");
        console.log("updated")
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  return (
    <div className="oneCard">
        <h5 className="itemName">
          {name}
        </h5>
        <img className="img" src={img+""} alt="No image available" />
        <p className="itemDescription">Ref: {show? 
        <div className="input-container">
        <input
        defaultValue={ref}
        onChange={(e) => setref(e.target.value)}
      /> </div> : ref}</p>
        <p className="itemDescription">Description: {show?    
        <div className="input-container">
        <input
        defaultValue={desc}
        onChange={(e) => setdesc(e.target.value)}
      /> </div>: desc}</p>
        <p className="itemDescription">Category: {show? 
          <div className="input-container">
          <input
        defaultValue={category}
        onChange={(e) => setcategory(e.target.value)}
      /> </div>:category}</p>
        <p className="itemDescription">criticalStock: {show?  
          <div className="input-container">
          <input
          type="number"
          min="0"
        defaultValue={criticalStock}
        onChange={(e) => setcriticalStock(e.target.value)}
      /> </div>:criticalStock}</p>
        <p className="itemDescription">Price: {show ?   
           <div className="input-container">
          <input
         type="number"
          min="0"
        defaultValue={price}
        onChange={(e) => setprice(e.target.value)}
      /> </div>:price}</p>
        <p className="itemDescription">Quantity: {show ?
         <div className="input-container">
        <input
         type="number"
          min="0"
        defaultValue={quantity}
        onChange={(e) => setquantity(e.target.value)}
      /> </div>:quantity}</p>
        {show && (
          <button onClick={() => handleUpdate()}>Save</button>
      )}
      <button onClick={() => setshow(!show)}>
        {show ? "Cancel" : "Update"}
      </button>
     
      
    </div>
  );
}

export default OneItem;