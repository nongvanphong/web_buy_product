const game = require("../models/game2d.mode");
const { ObjectId } = require("mongodb");
module.exports = (app) => {
  app.post("/api/game/diem", async (req, res) => {
    try {
      const objectId = new ObjectId(req.body._id);
      let idupdate = { _id: objectId };
      let newvalues = {
        diem: req.body.diem,
        jarhp: req.body.jarhp,
        jarmp: req.body.jarmp,
      };
      const options = { new: true };
      await game.findOneAndUpdate(idupdate, newvalues, options);
      res.status(200).send({ message: "thanh công" });
    } catch (err) {
      console.error(`Error updating user: ${err}`);
    }
  });

  //============================================================================
  app.post("/api/game/login", async function (req, res) {
    // const { user, pass } = req.body;

    // console.log(req);

    // let user = new users();
    // user.email = email;
    //user.pass = password;
    try {
      // Tìm kiếm bản ghi có email trùng với email cần kiểm tra
      const existingUser = await game.findOne({
        username: req.body.username,
        pass: req.body.pass,
      });
      if (existingUser) {
        // có dữ liệu thì trả vè hệ thống

        res.status(200).send([existingUser]);
      } else {
        // Email chưa tồn tại trong cơ sở dữ liệu
        res.status(401).send({ message: "Đăng nhập thất bại" });
      }
    } catch (err) {
      console.error(`Error getting users: ${err}`);
    }
  });

  app.post(
    "/api/game/singinuser",
    async function (req, res) {
      const { username, pass } = req.body;
      let a = new game();
      a.username = username;
      a.pass = pass;
      a.diem = 0;
      a.jarhp = 3;
      a.jarmp = 3;
      try {
        // await user.save();
        a.save();
        res.status(200).send({ message: "Insert thành công!" });
      } catch (err) {
        console.error(`Error inserting user: ${err}`);
        res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
      }
    }

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập

    // Đóng kết nối đến MongoDB
    // Đóng kết nối đến MongoDB
  );

  app.post("/api/game/getdatauser", async function (req, res) {
    try {
      // await user.save();
      const result = await game.find({}).sort({ diem: -1 });

      res.status(200).send(result);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });

  app.post("/api/game/getdatauser1", async function (req, res) {
    try {
      // await user.save();
      const result = await game
        .find({ _id: new ObjectId(req.body._id) })
        .sort({ diem: -1 });
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });

  // app.post("/api/getsingeruser", async function (req, res) {
  //   try {
  //     // Tìm kiếm bản ghi có email trùng với email cần kiểm tra
  //     const existingUser = await users.findOne({
  //       _id: new ObjectId(req.body.id),
  //     });

  //     if (existingUser) {
  //       // có dữ liệu thì trả vè hệ thống
  //       res.status(200).send([existingUser]);
  //     } else {
  //       // Email chưa tồn tại trong cơ sở dữ liệu
  //       res.status(500).send({ message: "mất kết nối vui lòng đăng nhập lại" });
  //     }
  //   } catch (err) {
  //     console.error(`Error getting users: ${err}`);
  //   }
  // });

  app.post("/api/aaa1v", async function (req, res) {
    console.log("lll>", req.body);
    res.status(200).send({ message: "mấts kết nối vui lòng đăng nhập lại" });
  });
};
