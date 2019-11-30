"use strict";
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fetch = require("node-fetch");

// @route   POST api/convert
// @desc    Create a cart that stores out products
// @access  Private
router.post(
  "/",
  [
    check("products", "products is required!")
      .not()
      .isEmpty(),
    check("currency", "currency is required!")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let products = await req.body.products.map(el => transformCurrency(el));
      const currency = await req.body.currency;
      products = await convertValue(products, currency);
      let total = products.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);

      const response = {
        products: products,
        total: Math.floor(total * 100) / 100
      };
      res.json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

const transformCurrency = products => {
  return {
    name: products.name,
    quantity: products.quantity,
    currency: products.currency,
    price: products.price
  };
};

const convertValue = async (products, currency) => {
  try {
    let valute = await getData();

    products.map(val => {
      val.price = (val.price / valute[currency]["Value"]) * val.quantity;
    });
  } catch (error) {
    console.log(error);
  }

  return products;
};

// get exchange data
const getData = async () => {
  const url = "https://www.cbr-xml-daily.ru/daily_json.js";
  try {
    const response = await fetch(url);
    const json = await response.json();
    let answer = json["Valute"];
    return answer;
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;
