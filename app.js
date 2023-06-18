const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("642c36bf905e5580f7a86f25");
    req.user = user;
    next();
  } catch (error) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://tz924:0924@cluster0.yolzrce.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((client) => {
    console.log("Connected correctly to server");
    // console.log(client);

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
