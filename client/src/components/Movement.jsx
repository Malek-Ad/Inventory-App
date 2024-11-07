import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function Movement({ setrefresh , items,refresh}) {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [criticalStock, setcriticalStock] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [ele, setele] = useState("");


  
  const email = async (ele,quantity) => {
    const data = {
      service_id: "service_oumt4dn",
      template_id: "template_ab741rb",
      user_id: "Yk8YVzu0LfpyF4zQ7",
      template_params: {
        from_name: "IM app",
        message: "Item ref: "+ele.ref+" Name: "+ele.name+" Remaining quantity : "+quantity,
      }
    };

    // Send the email using EmailJS
    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log("Email sent",res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlemovement = (e) => {
    e.preventDefault();
    let obj={}
if (criticalStock) {
    obj.criticalStock=criticalStock
}
if (quantity) {
    obj.quantity=quantity
}
if (price) {
    obj.price=price
}

    axios
      .patch("http://localhost:3000/api/items/"+ele.id, obj)
      .then((result) => {
        if (ele.criticalStock>quantity) {
            Swal.fire({
                title: "Restock alert!",
                text: "This item has reached below the critical stock limit. A reminder email has been sent to you",
                icon: "warning"
              });
              email(ele,quantity)
        }else{
             setrefresh(!refresh);
         navigate("/");}
      })
      .catch((err) => {
        console.log(err);
      });



  }

const handleclick=(el)=>{
    setele(el)
    setshow(true)
}


  return (
    <div className="form">
        <h2>Stock movement</h2>

        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
{show? ele.ref : "Item reference"}  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
{   items.map((el,i)=>{
   return <li key={i} class="dropdown-item" onClick={()=>{
    handleclick(el)
   }}>{el.ref}</li>
})
}  </ul>
</div>

    <form onSubmit={(e) => handlemovement(e)}>
       {show ? <>
        <label >Critical Stock :</label>
        <input
        
        placeholder={ele.criticalStock}
        onChange={(e) => setcriticalStock(e.target.value)}
      />
      <label >Quantity :</label>
         <input
         
         placeholder={ele.quantity}
        onChange={(e) => setquantity(e.target.value)}
      />
      <label >Price :</label>
      <input
      
        placeholder={ele.price}
        onChange={(e) => setprice(e.target.value)}
      />
      <button> Submit </button> </>: null }
    </form>
    </div>
  );
}

export default Movement;