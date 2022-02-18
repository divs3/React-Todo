import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCount from "./TodoCount";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")));
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
     console.log("todolist",todoList);
    //  console.log('set Todo List',setTodoList(todoList))
  }, [todoList]);

  //Handle Input change
  const handleInputListChange = (e) => {
    setTodoName(e.target.value);
  };

  //Add Todo Item by add button
  const addTodoListItem = () => {
    setTodoList((prevItems) => {
      return [
        ...prevItems,
        {
          id: prevItems.length + 1,
          name: todoName,
          complete: false,
        },
      ];
    });

    setTodoName("");
  };

  //Add Todo Item by Enter Key
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setTodoList((prevItems) => {
        return [
          ...prevItems,
          {
            id: Math.floor(Math.random() * 100),
            name: todoName,
            complete: false,
          },
        ];
      });
      setTodoName("");
    }
  };

  //Delete todo list items
  const deleteTodoListItem = (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  //Delete All todo items
  const deleteAll = () => {
    setTodoList([]);
  };

  const handleEditedValue = (key, val) => {
    // console.log("Here is the editedalue", key, val);
    //! find te todoitem with the incoming key
    const newtodo = todoList.find((item) => {
      return item.id === key;
    });
    newtodo.name = val;
    //! set the list state with the newly edited entry
    //! create a copy of te ex
    console.log(todoList)
    const copyTodoList = todoList;
    const todoIndex = copyTodoList.findIndex((item) => {
      return item.id === key;
    });
    copyTodoList[todoIndex] = newtodo;
    console.log(copyTodoList, todoList)
    // setTodoList(copyTodoList);
  };
 

  return (
    <div className="super-container">
      <div className="container">
        <div className="list-title">
          <p>Add Task</p>
        </div>
        <div className="input-list">
          <input
            className="input-list-item"
            type="text"
            value={todoName}
            onChange={handleInputListChange}
            onKeyPress={handleKeyPress}
          />

          <button className="btn add-list-item" onClick={addTodoListItem}>
            +
          </button>
        </div>
        {todoList.map((item) => {
          return (
            <div key={item.id}>
              <TodoItem
                id={item.id}
                item={item.name}
                onDelete={() => deleteTodoListItem(item.id)}
                consumeEditedValue={handleEditedValue}
              />
            </div>
          );
        })}
        <div className="footer-list">
          <div>
            <TodoCount todoList={todoList} />
          </div>
          <button className="btn delete-all" onClick={deleteAll}>
            Delete all Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
