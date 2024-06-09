const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvillable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvillable) {
      return res.json({
        message: "Alredy exist in add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();
    res.json({
      data: saveProduct,
      message: "Product added in cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
