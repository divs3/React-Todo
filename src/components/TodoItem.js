import React, { useState,} from "react";
import "./todo.css";

const TodoItem = ({ item, id,onDelete, consumeEditedValue}) => {
  const [editTodoItem, setEditTodoItem] = useState(false);
  const itemName = item
  const [editedText, setEditedText] = useState(itemName);

  function editClickHandler(e) {
    console.log('editedText',editedText)
      if (e.key === "Enter") {
        consumeEditedValue(id, editedText)
        setEditTodoItem(false)
      }
  }

  return (
    <div className="delete-list">
      {editTodoItem ? (
        <input
          onChange={(e) => setEditedText(e.target.value)}
          value={editedText}
          onKeyPress={editClickHandler}
        />
      ) : (
        <div>{item}</div>
      )}

      <button className="btn edit-list-item"
        onClick={() => setEditTodoItem((prevState) => !prevState)} 
      >
        EDIT
      </button>
      <button className="btn delete-list-item" onClick={onDelete}>
        x
      </button>
    </div>
  );
};

export default TodoItem;
