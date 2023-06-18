const Product = require("../models/product");
const Order = require("../models/order");

/* Products *******************************************************************/
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  try {
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

/* Cart ***********************************************************************/
exports.getCart = async (req, res, next) => {
  try {
    const products = await req.user.populate("cart.items.product");
    const cartProducts = products.cart.items;

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const product = await Product.findById(prodId);
    const result = await req.user.addToCart(product);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const result = await req.user.removeFromCart(prodId);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

/* Orders *********************************************************************/
exports.postOrder = async (req, res, next) => {
  try {
    const products = await req.user.populate("cart.items.product");

    const cartProducts = products.cart.items.map((item) => {
      return new Object({
        quantity: item.quantity,
        product: { ...item.product._doc },
      });
    });

    const order = new Order({
      user: {
        username: req.user.username,
        userId: req.user,
      },
      products: cartProducts,
    });
    await order.save();
    await req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
  }
};
