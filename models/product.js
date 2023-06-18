const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const { mongoConnection, getDb } = require("../util/database");
// class Product {
//   constructor(title, price, description, imageUrl, id = null, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id && new mongodb.ObjectId(id);
//     this.userId = userId;
//   }

//   async save() {
//     try {
//       const db = getDb();
//       if (this._id) {
//         const result = await db
//           .collection("products")
//           .updateOne({ _id: this._id }, { $set: this });
//         console.log("update");
//         console.log(result);
//         return result;
//       } else {
//         const result = await db.collection("products").insertOne(this);
//         console.log("insert");
//         console.log(result);
//         return result;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   static async fetchAll() {
//     try {
//       const db = getDb();
//       const products = await db.collection("products").find().toArray();
//       // console.log(products);
//       return products;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   static async findById(prodId) {
//     try {
//       const db = getDb();
//       const product = await db
//         .collection("products")
//         .find({ _id: new mongodb.ObjectId(prodId) })
//         .next();
//       console.log(product);
//       return product;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   static async deleteById(prodId) {
//     try {
//       const db = getDb();
//       const result = await db
//         .collection("products")
//         .deleteOne({ _id: new mongodb.ObjectId(prodId) });
//       console.log("DELETED");
//       // console.log(result);
//       return result;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

// module.exports = Product;
