const mongoose = require("mongoose");

// khai báo các colection đểv tạo colection trên sever
// tạo bảng
var productSchame = mongoose.Schema({
  email: { type: "string" },
  nameproduct: { type: "string" },
  priceproduct: { type: "number" },
  imgproduct: { type: "array" },
  descriptionproduct: { type: "string" },
  numberproduct: { type: "number" },
  typeproduct: { type: "string" },
});

// ánh sạ
const product = mongoose.model("products", productSchame);

// gắn vào modun
module.exports = product;
