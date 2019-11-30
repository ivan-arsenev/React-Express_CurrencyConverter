import React, { Component } from "react";
import "./ItemAddForm.css";
export default class ItemAddForm extends Component {
  state = {
    name: "",
    price: 0,
    quantity: 1
  };

  onNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  onPriceChange = e => {
    this.setState({
      price: Number.parseFloat(e.target.value)
    });
  };
  onQuantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault(); // don't allow to reload page
    this.props.onItemCliked(this.state);
    this.setState({
      name: "",
      price: 0,
      quantity: 1
    });
  };

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <div className="item-add-form d-flex">
          <input
            type="text"
            required
            className="form-control text"
            placeholder="Название продукта"
            onChange={this.onNameChange}
            value={this.state.name}
          />
        </div>
        <div className="item-add-form d-flex">
          <input
            required
            type="number"
            className="form-control"
            placeholder="RUB"
            onChange={this.onPriceChange}
            value={this.state.price > 0 ? this.state.price : ""}
          />
          <select className="form-control" onChange={this.onQuantityChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button className="btn btn-outline-secondary ">Добавить</button>
        </div>
      </form>
    );
  }
}
