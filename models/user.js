const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.product.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];

  // Not Found = -1
  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      product: product,
      quantity: 1,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  const result = await this.save();
  return result;
};

userSchema.methods.removeFromCart = async function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.product.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const getDb = require("../util/database").getDb;
// const { ObjectId } = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = new ObjectId(id);
//   }

//   async save() {
//     try {
//       const db = getDb();
//       const result = await db.collection("users").insertOne(this);
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     const updatedCartItems = [...this.cart.items];

//     // Not Found = -1
//     if (cartProductIndex >= 0) {
//       updatedCartItems[cartProductIndex].quantity += 1;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: 1,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };

//     try {
//       const db = getDb();
//       const result = await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: updatedCart } }
//         );
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getCart() {
//     try {
//       // Populate the cart with the products by merging
//       const db = getDb();
//       const productIds = this.cart.items.map((i) => i.productId);
//       const products = await db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();

//       return products.map((p) => {
//         return {
//           ...p,
//           quantity: this.cart.items.find((i) => {
//             return i.productId.toString() === p._id.toString();
//           }).quantity,
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });

//     try {
//       const db = getDb();
//       const result = await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: { items: updatedCartItems } } }
//         );
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async addOrder() {
//     try {
//       const db = getDb();
//       const products = await this.getCart();
//       const order = {
//         items: products,
//         user: {
//           _id: new ObjectId(this._id),
//           name: this.username,
//         },
//       };
//       await db.collection("orders").insertOne(order);
//       this.cart = { items: [] };
//       return await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: { items: [] } } }
//         );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getOrders() {
//     try {
//       const db = getDb();
//       const orders = await db
//         .collection("orders")
//         .find({ "user._id": new ObjectId(this._id) })
//         .toArray();
//       return orders;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async findById(userId) {
//     try {
//       const db = getDb();
//       const user = await db
//         .collection("users")
//         .findOne({ _id: new ObjectId(userId) });
//       return user;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = User;
