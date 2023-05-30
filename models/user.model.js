const mongoose = require("mongoose");

// khai báo các colection đểv tạo colection trên sever
// tạo bảng
var userSchame = mongoose.Schema({
  email: { type: "string" },
  pass: { type: "string" },
  name: { type: "string" },

  premission: { type: "boolean" },
  cratedate: { type: "date" },
});

// ánh sạ
const user = mongoose.model("users", userSchame);

// gắn vào modun
module.exports = user;
