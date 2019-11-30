import React, { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItem extends Component {
  render() {
    const {
      name,
      price,
      quantity,
      onDeleted,

      done,
      important
    } = this.props;

    let classNames = "todo-list-item";

    return (
      <span className={classNames}>
        <span className="todo-list-item-quantity"> {quantity}</span>
        <span className="todo-list-item-name">{name}</span>
        <span className="todo-list-item-price">
          {price} <span className="fa fa-rub" />
        </span>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
