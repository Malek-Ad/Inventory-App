import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar.jsx";
import List from "./components/List.jsx";
import OneItem from "./components/OneItem.jsx";
import CreateItem from "./components/CreateItem.jsx";
import Movement from "./components/Movement.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  const [items, setItems] = useState([]);
  const [refresh, setrefresh] = useState("");
  const [filtred, setfiltred] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/items")
      .then((result) => {
        setItems(result.data);
        console.log("data", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <BrowserRouter>
      <NavBar items={items} setItems={setItems} setrefresh={setrefresh} refresh={refresh} setfiltred= {setfiltred}/> 
      <Routes>
        <Route
          path="/"
          element={<List items={items} setrefresh={setrefresh} filtred={filtred} />}
        />
        <Route
          path="/oneProduct"
          element={<OneItem setrefresh={setrefresh} refresh={refresh}/>}
        />
        <Route
          path="/createItem"
          element={<CreateItem setrefresh={setrefresh} />}
        />
        <Route
          path="/movement"
          element={<Movement setrefresh={setrefresh} items={items} refresh={refresh} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
