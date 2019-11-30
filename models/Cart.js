const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  carts: {
    type: Schema.Types.ObjectId
  },

  products: [
    {
      cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number
      },
      currency: {
        type: String
      },
      price: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
