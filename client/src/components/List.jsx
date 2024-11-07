import React from "react";
import ListItem from "./ListItem.jsx";


const List = ({ items, setrefresh  , filtred}) => {
  return (
    <div>
      <div  className="listContainer">
      {(filtred.length ? filtred :  items).map((element,i) => {
        return (
          <div key={i}>
            <ListItem element={element} setrefresh={setrefresh} />
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default List;