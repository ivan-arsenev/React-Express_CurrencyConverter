import React from "react";
import "./AppHeader.css";
const AppHeader = ({ todo, done }) => {
  return (
    <div className="app-header d-flex">
      <h1>Корзина 🛒</h1>
      <h2>{todo} товара в корзине</h2>
    </div>
  );
};

export default AppHeader;
