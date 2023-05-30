var express = require("express");
const http = require("http");
const path = require("path");
var expresshdb = require("express-handlebars");
var app = express();
// khai báo munter
var mt = require("multer");

// gọi body parser
var bodyparsert = require("body-parser");
// sử dụng body parser
app.use(bodyparsert.json());
app.use(
  bodyparsert.urlencoded({
    extended: true,
  })
);
let size = http.maxHeaderSize;
console.log("Max HTTP Header size is", size);

// lấy đường dẫn trang đến thư mục css
app.use(express.static("./public/css"));
app.use(express.static("./public/img"));
app.use(express.static("./public/js"));
app.use(express.static("./public/html"));

// kết nói với hande=ebar
app.engine("hbs", expresshdb.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

// muôn slaays ảnh ra thì như http://172.16.29.97:3000/static/a1.jpeg
app.use("/static", express.static("upload"));

app.get("/sigin", (req, res) => {
  res.sendFile(__dirname + "/public/html/singin.html");
});

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/cart", (req, res) => {
  res.render("carts");
});
app.get("/thongke", (req, res) => {
  res.render("thongke");
});
app.get("/manager", (req, res) => {
  res.render("manegeruser");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/login.html");
});

app.get("/trangcanhan", (req, res) => {
  res.render("presion");
});
app.get("/chitiet", (req, res) => {
  res.render("detail");
});
app.get("/xxxxx", (req, res) => {
  res.render("xxxxx");
});
// gọi hàm để kết nối với schema mongo

var mongo = require("./config");

require("./router/login.router")(app);
require("./router/product.router")(app, mt);
require("./router/cart.router")(app);
require("./router/game2d.router")(app);
require("./router/game2d.router1")(app);
//////////////-------------------------------------
// gọi cổng sever
app.listen(3000, function () {
  // đường daanc :3000 mói có thể sử dụng
  console.log("http://localhost:3000");
});

//============= cài đặt modun==============
// cài dăt node js
// npm init -y hoặc là npm init
// npm i express --save
// npm i body-parser --save
//real time
// npm install socket.io --save
// socket.io/socket.io.js

// để hjoox trọ kết nối
// npm i -s express-handlebars

// tự dộng chạy sever
//npm i nodemon -g

//============ kết nói sql==============
// mssql
//msnodesqlv8
