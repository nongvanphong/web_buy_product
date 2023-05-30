const mongoose = require("mongoose");

// khai báo các colection đểv tạo colection trên sever
// tạo bảng
var cartSchame = mongoose.Schema({
  // định nghãi như này mới có thể kết bảng được
  id_product: { type: "objectId", ref: "products" },
  id_user: { type: "objectId" },
  number: { type: "number" },
  // chỏ đến product
});

// ánh sạ
const cart = mongoose.model("carts", cartSchame);

// gắn vào modun
module.exports = cart;
