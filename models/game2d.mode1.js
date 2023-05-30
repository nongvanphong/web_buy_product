const mongoose = require("mongoose");

// khai báo các colection đểv tạo colection trên sever
// tạo bảng
var gameSchame = mongoose.Schema({
  username: { type: "string" },
  pass: { type: "string" },
  diem: { type: "number" },
});

// ánh sạ
const game = mongoose.model("gamestests", gameSchame);

// gắn vào modun
module.exports = game;
