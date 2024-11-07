import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ListItem = ({ element, setrefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/items/${element.id}`)
      .then(() => {
        setrefresh((prev) => !prev);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="card">
        <button
          className="delete-button"
          onClick={(e) => {
            setIsModalOpen(true);
          }}
        >
          X
        </button>
        <h5
          className="itemName"
          onClick={() => navigate("/oneProduct", { state: element })}
        >
          {element.name}
        </h5>
        <img
          className="img" 
          src={element.img + ""}
          alt="No image available"
          onClick={() => navigate("/oneProduct", { state: element })}
        />
        <p className="itemDescription">Ref: {element.ref}</p>
        <p className="itemDescription">Price: {element.price}</p>
        <p className="itemDescription">Quantity: {element.quantity}</p>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ListItem;
