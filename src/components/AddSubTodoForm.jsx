import React from "react";

function AddSubTodoForm(props) {
  return (
    <>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={props.todoTitle}
          onChange={e => props.onTodoTitleChanged(e.target.value)}
        />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          id="content"
          value={props.todoContent}
          onChange={e => props.onTodoContentChanged(e.target.value)}
        />
        <label htmlFor="priority"> Priority:</label>
        <select
          id="priority"
          name="prioriy"
          onClick={e => props.onSelectPriority(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <label htmlFor="user"> Assign to:</label>
        <select
          id="user"
          name="user"
          onClick={e => props.onselectAssignedTo(e.target.value)}
        >
          {props.assignedUsers.map((user, index) => {
            return (
              <option key={index} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
        <button type="submit" onClick={e => props.handleSubmit(e)}>
          Add
        </button>
      </form>
    </>
  );
}

export default AddSubTodoForm;
