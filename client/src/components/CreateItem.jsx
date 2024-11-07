import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateItem({ setrefresh }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [ref, setref] = useState("");
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("");
  const [criticalStock, setcriticalStock] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage ] = useState("");
  const [ url, setUrl ] = useState("");

  const uploadImage = () => {
    
  const data = new FormData()
  data.append("file", image)
  data.append("upload_preset", "emijls20")
  data.append("cloud_name","dbzkxd4wk")
  fetch("https://api.cloudinary.com/v1_1/dbzkxd4wk/image/upload",{
  method:"post",
  body: data
  })
  .then(resp => resp.json())
  .then(data => {
    console.log("url",data.url)
  setUrl(data.url)
  })
  .catch(err => console.log(err))
  }

  const handleCreate = (e) => {
    e.preventDefault();
    console.log('obj',{ref:ref, name: name,description:desc,category:category,img:url,criticalStock:criticalStock,quantity:quantity, price: price })
    axios
      .post("http://localhost:3000/api/items/add", {ref:ref, name: name,description:desc,category:category,img:url,criticalStock:criticalStock,quantity:quantity, price: price })
      .then((result) => {
        navigate("/");
        setrefresh(name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="form">
        <h2>Create an Item</h2>
    <form onSubmit={(e) => handleCreate(e)}>
            <input
        required
        placeholder="Reference"
        onChange={(e) => setref(e.target.value)}
      />
      <input
        required
        placeholder="Name"
        onChange={(e) => setname(e.target.value)}
      />
          <input
        placeholder="Description"
        onChange={(e) => setdesc(e.target.value)}
      />
      <input
        required
        placeholder="Category"
        onChange={(e) => setcategory(e.target.value)}
      />
<input type="file" placeholder="Image" onChange= {(e)=> {setImage(e.target.files[0])}}/>
<button onClick={uploadImage}>Upload</button>
       <input
        required
        placeholder="Critical Stock"
        onChange={(e) => setcriticalStock(e.target.value)}
      />
         <input
        required
        placeholder="Quantity"
        onChange={(e) => setquantity(e.target.value)}
      />
      <input
        required
        placeholder="Price"
        onChange={(e) => setprice(e.target.value)}
      />
      <button> Add </button>
    </form>
    </div>
  );
}

export default CreateItem;