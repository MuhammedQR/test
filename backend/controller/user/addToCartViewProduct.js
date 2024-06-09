const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await addToCartModel
      .find({ userId: currentUser })
      .populate("productId");
    res.json({
      data: allProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    req.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartViewProduct;
