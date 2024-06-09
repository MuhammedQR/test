const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productDetails: {
      type: Array,
      defualt: [],
    },
    email: {
      type: String,
      defualt: "",
    },
    userId: {
      type: String,
      defualt: "",
    },
    paymentDetails: {
      paymentId: {
        type: String,
        defualt: "",
      },
      payment_method_type: [],
      payment_status: {
        type: String,
        defualt: "",
      },
    },
    shipping_options: [],
    totalAmount: {
      type: Number,
      defualt: 0,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
