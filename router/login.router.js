const users = require("../models/user.model");
const { ObjectId } = require("mongodb");
const now = new Date();
const year = now.getFullYear(); // Lấy năm hiện tại
const month = now.getMonth() + 1; // Lấy tháng hiện tại, với getMonth() trả về giá trị từ 0-11, nên cần +1 để hiển thị đúng tháng
const date = now.getDate(); // Lấy ngày hiện tại
const cratedateussre = year + "-" + month + "-" + date;
module.exports = (app) => {
  app.post("/api/updatepremission", async (req, res) => {
    try {
      const objectId = new ObjectId(req.body.id);
      let idupdate = { _id: objectId };
      let newvalues = {
        premission: req.body.premission,
      };
      const options = { new: true };
      await users.findOneAndUpdate(idupdate, newvalues, options);
      res.status(200).send({ message: "thanh công" });
    } catch (err) {
      console.error(`Error updating user: ${err}`);
    }
  });

  //============================================================================
  app.post("/api/login", async function (req, res) {
    const { email, password } = req.body;

    let user = new users();
    user.email = email;
    user.pass = password;

    try {
      // Tìm kiếm bản ghi có email trùng với email cần kiểm tra
      const existingUser = await users.findOne({
        email: user.email,
        pass: user.pass,
      });

      if (existingUser) {
        // có dữ liệu thì trả vè hệ thống
        res.status(200).send([existingUser]);
      } else {
        // Email chưa tồn tại trong cơ sở dữ liệu
        res.status(500).send({ message: "Đăng nhập thất bại" });
      }
    } catch (err) {
      console.error(`Error getting users: ${err}`);
    }
  });

  app.post("/api/singinuser", async function (req, res) {
    const { email, username, password } = req.body;
    // insert usre3
    async function checkEmail(email) {
      // Tìm kiếm bản ghi có email trùng với email cần kiểm tra
      const existingUser = await users.findOne({ email: email });

      if (existingUser) {
        // Email đã tồn tại trong cơ sở dữ liệu
        res
          .status(409)
          .send({ message: "Email đã tồn tại trong cơ sở dữ liệu" });
        return true;
      } else {
        // Email chưa tồn tại trong cơ sở dữ liệu

        return false;
      }
    }
    // inser user
    async function insertUser(user) {
      try {
        // await user.save();
        user.save();
        res.status(200).send({ message: "Insert thành công!" });
      } catch (err) {
        console.error(`Error inserting user: ${err}`);
        res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
      }
    }

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập

    if ((await checkEmail(email)) == false) {
      let user = new users();
      user.email = email;
      user.name = username;
      user.pass = password;
      user.premission = false;
      user.cratedate = new Date();
      insertUser(user);
    }

    // Đóng kết nối đến MongoDB
    // Đóng kết nối đến MongoDB
  });

  app.post("/api/getdatauser", async function (req, res) {
    try {
      // await user.save();
      const result = await users.find({});

      res.status(200).send(result);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi insert dữ liệu!" });
    }
  });

  app.post("/api/getsingeruser", async function (req, res) {
    try {
      // Tìm kiếm bản ghi có email trùng với email cần kiểm tra
      const existingUser = await users.findOne({
        _id: new ObjectId(req.body.id),
      });

      if (existingUser) {
        // có dữ liệu thì trả vè hệ thống
        res.status(200).send([existingUser]);
      } else {
        // Email chưa tồn tại trong cơ sở dữ liệu
        res.status(500).send({ message: "mất kết nối vui lòng đăng nhập lại" });
      }
    } catch (err) {
      console.error(`Error getting users: ${err}`);
    }
  });

  app.post("/api/thongke", async function (req, res) {
    const pipeline = [
      {
        //lấy dữ  lệu trong khoảng
        $match: {
          cratedate: {
            $gte: new Date("2022-01-01T00:00:00.000Z"), // Ngày bắt đầu của tháng 01/2023
            $lte: new Date("2023-12-31T23:59:59.999Z"), // Ngày kết thúc của tháng 01/2024
          },
        },
      },
      {
        // group dữ liệu lại  theo năm và theo tháng
        $group: {
          _id: {
            year: { $year: "$cratedate" }, // Lấy năm từ trường created_at
            month: { $month: "$cratedate" }, // Lấy tháng từ trường created_at
          },
          count: { $sum: 1 }, // Đếm số lượng bản ghi
        },
      },
    ];

    // Thực hiện truy vấn và in kết quả
    try {
      const result = await users.aggregate(pipeline); // Truy vấn dữ liệu từ collection User
      res.status(200).send(result); // Trả về kết quả dưới dạng JSON
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }

    // In ra dạng "ngày/tháng/năm" hiện tại
    //res.status(409).send({ message: new Date(cratedateussre) });
  });
};
