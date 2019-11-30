import React from "react";
import SearchPanel from "./components/SearchPanel";
import TodoList from "./components/TodoList";
import AppHeader from "./components/AppHeader";

import "./index.css";
import CartService from "./services/converter";
import ItemAddForm from "./components/ItemAddForm";
import Converter from "./components/Converter";
export default class App extends React.Component {
  maxId = 200;
  state = {
    cartData: [
      this.createCartItem("Apple", 130, 1),
      this.createCartItem("Chair", 220, 1)
    ],
    term: "",
    filter: "all", // active, all , done
    total: 0
  };

  cartService = new CartService();

  createCartItem(name, price, quantity) {
    return {
      name,
      price,
      quantity,
      id: this.maxId++
    };
  }
  deleteItem = id => {
    this.setState(({ cartData }) => {
      const idx = cartData.findIndex(el => el.id === id);
      // cartData.splice(idx, 1); // it's not correct becouse you change current state!

      let newArray = [...cartData.slice(0, idx), ...cartData.slice(idx + 1)];
      return { cartData: newArray };
    });
  };

  addItem = ({ name, price, quantity }) => {
    const newItem = this.createCartItem(name, price, quantity);
    this.setState(({ cartData }) => {
      let newArray = [...cartData, newItem];
      return { cartData: newArray };
    });
  };

  getTotal = async currency => {
    const data = {
      currency: currency,
      products: [...this.state.cartData]
    };
    const total = await this.cartService.getResultOfConvert(data);

    this.setState({
      total
    });
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const olditem = arr[idx];
    const newItem = { ...olditem, [propName]: !olditem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onSearchChange = term => {
    this.setState({
      term
    });
  };

  onStatusChanged = filter => {
    this.setState({
      filter
    });
  };

  search(items, term) {
    if (term.length === 0) return items;
    return items.filter(value =>
      value.name.toUpperCase().includes(term.toUpperCase())
    );
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;

      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { cartData, term, filter } = this.state;
    let visibleItems = this.filter(this.search(cartData, term), filter);

    const doneCount = cartData.filter(el => el.done).length;
    const todoCount = cartData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
        </div>
        <TodoList todos={visibleItems} onDeleted={this.deleteItem} />
        <ItemAddForm onItemCliked={this.addItem} />
        <Converter onTotalCliked={this.getTotal} total={this.state.total} />
      </div>
    );
  }
}
