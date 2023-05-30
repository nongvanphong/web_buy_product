const cart = require("../models/cart.model");
const product = require("../models/product.model");
const { ObjectId } = require("mongodb");
module.exports = (app) => {
  app.post("/api/add_cart", async function (req, res) {
    // const { id_product, id_user, number } = req.body;
    // insert usre
    let c = new cart(req.body);

    // // inser user

    try {
      // await user.save();
      c.save();
      res.status(200).send({ message: "Insert thành công!" });
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert cart!" });
    }
  });

  app.post("/api/getdatacart", async function (req, res) {
    try {
      let datacart = await cart
        .find({ id_user: new ObjectId(req.body.id_user) })
        .populate({
          // tên cốt có cùng dữ liệu
          path: "id_product",
          // đây là tên bảng
          model: "products",
          options: { strictPopulate: false },
        })
        .exec();

      res.status(200).send(datacart);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });

  app.post("/api/updatecart", async function (req, res) {
    try {
      await cart.findOneAndUpdate(
        { _id: new ObjectId(req.body.id_cart) },
        { number: req.body.number },
        { new: true }
      );

      res.status(200).send({ message: "thnahf công" });
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });
  app.post("/api/deletecart", async function (req, res) {
    try {
      let iddelete = { _id: new ObjectId(req.body.id) };

      await cart.deleteOne(iddelete);
      res.status(200).send({ message: "thanh công!" });
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });
};
