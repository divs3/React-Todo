import React from "react";

const TodoCount = ({ todoList}) => {
  return (
    <>
      <div>Total Tasks: {todoList.length}</div>

    </>
  );
};

export default TodoCount;
