import React, { Component } from "react";
import "./ItemAddForm.css";
export default class ItemAddForm extends Component {
  state = {
    currency: "RUB",
    total: 0
  };
  currencyClass = `fa fa-${this.state.currency.toLowerCase()}`;
  onCurrencyChange = e => {
    this.setState({
      currency: e.target.value
    });
  };

  onButtonClick = e => {
    e.preventDefault(); // don't allow to reload page
    this.props.onTotalCliked(this.state.currency);
  };

  componentWillReceiveProps(prevProps, prevState) {
    if (prevProps.total !== prevState.total) {
      this.currencyClass = `fa fa-${this.state.currency.toLowerCase()}`;
    }
  }

  render() {
    const { total } = this.props;

    return (
      <div>
        <form className="converter-header d-flex my-5">
          <h4 className="mr-2">Валюта: </h4>
          <select
            className="form-control mr-2"
            onChange={this.onCurrencyChange}
            required
          >
            <option>RUB</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <button
            className="btn btn-outline-primary "
            onClick={this.onButtonClick}
          >
            Посчитать
          </button>
        </form>

        {total !== 0 && (
          <h3>
            Сумма: {total} <i className={this.currencyClass} />
          </h3>
        )}
      </div>
    );
  }
}
