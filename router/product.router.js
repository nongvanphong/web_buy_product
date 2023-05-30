const { conn, cl } = require("../mongodb");
const { ObjectId } = require("mongodb");
const product = require("../models/product.model");
const cart = require("../models/cart.model");
module.exports = (app, mt) => {
  // add produc

  const storage = mt.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, +Date.now() + "-" + file.originalname);
    },
  });

  const upload = mt({ storage: storage });

  // app.post("/upload", upload.single("file1"), function (req, res, next) {
  //   console.log(req.file);
  //   res.status(200).send({ message: "Upload successful" });
  // });

  // Khởi tạo middleware của multer======================

  // Xử lý route upload
  app.post("/upload", upload.array("file1", 5), async (req, res) => {
    // Lấy thông tin từ form

    // Lấy thông tin của file đã được upload
    const files = req.files;

    // Duyệt qua từng file và lấy tên của file
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fileNames.push(file.filename);
    }

    // // In ra thông tin của file và form
    // console.log(
    //   "==================",
    //   req.body.nameproduct,
    //   req.body.priceproduct,
    //   req.body.describeproduct,
    //   req.body.numberproduct,
    //   req.body.typeproduct
    // );
    // console.log(file);

    let pd = new product();
    pd.email = "p@gamil.com";
    pd.nameproduct = req.body.nameproduct;
    pd.priceproduct = req.body.priceproduct;
    pd.descriptionproduct = req.body.desritionproduct;
    pd.numberproduct = req.body.numberproduct;
    pd.typeproduct = req.body.typeproduct;
    pd.imgproduct = fileNames;

    // inser user

    try {
      await pd.save();
      res.status(200).send({ message: "upload product thành công!" });
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi khi upload product dữ liệu!" });
    }

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập
  });

  // Xử lý route upload
  app.post("/api/updateproduct", upload.array("file1", 5), async (req, res) => {
    // Lấy thông tin từ form
    // Lấy thông tin của file đã được upload
    const files = req.files;

    // Duyệt qua từng file và lấy tên của file
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fileNames.push(file.filename);
    }
    let pd = new product();

    pd.nameproduct = req.body.nameproductupdate;
    pd.priceproduct = req.body.priceproductupdate;
    pd.descriptionproduct = req.body.desritionproductupdate;
    pd.numberproduct = req.body.numberproductupdate;
    pd.typeproduct = req.body.typeproductupdate;
    pd.imgproduct = fileNames;
    // inser user

    try {
      const objectId = new ObjectId(req.body.idproductupdate);
      var idupdate = { _id: objectId };
      var newvalues = {
        nameproduct: pd.nameproduct,
        priceproduct: pd.priceproduct,
        imgproduct: fileNames,
        descriptionproduct: pd.descriptionproduct,
        typeproduct: pd.typeproduct,
        numberproduct: pd.numberproduct,
      };
      const options = { new: true };
      await product.findOneAndUpdate(idupdate, newvalues, options);

      res.status(200).send({ message: "thanh công!" });
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi update !" });
    }

    // console.log(
    //   "----->",
    //   req.body.nameproductupdate,
    //   req.body.priceproductupdate,
    //   imgproduct,
    //   req.body.priceproductupdate,
    //   req.body.numberproductupdate,
    //   req.body.typeproductupdate,
    //   req.body.idproductupdate
    // );a

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập
    // await updateproduc(
    //   req.body.idproductupdate,
    //   req.body.nameproductupdate,
    //   req.body.priceproductupdate,
    //   imgproduct,
    //   req.body.priceproductupdate,
    //   req.body.numberproductupdate,
    //   req.body.typeproductupdate
    // );
  });

  // Xử lý route upload
  app.post("/api/deleteproduct", async (req, res) => {
    // Lấy thông tin từ form

    // inser user
    async function deleteproduc(id) {
      try {
        const objectId = new ObjectId(id);
        let iddelete = { _id: objectId };

        await product.deleteOne(iddelete);
        await cart.deleteMany({ id_product: objectId });
        res.status(200).send({ message: "thanh công!" });
      } catch (err) {
        console.error(`Error inserting user: ${err}`);
        res.status(500).send({ message: "Lỗi xóa !" });
      }
    }

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập
    await deleteproduc(req.body.id);
    await cl.close();
    //console.log(req.body.id);
  });
  //===================================================================================
  // Xử lý route upload
  app.post("/api/getdataproduct", async (req, res) => {
    // Lấy thông tin từ form
    // inser user
    try {
      const result = await product.find({});

      res.status(200).send(result);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi truy vấn!" });
    }

    // Sử dụng hàm insertUser để thêm một tài liệu mới vào bộ sưu tập
  });
  app.post("/api/getdataproductdetail", async (req, res, next) => {
    // inser user

    try {
      const objectId = new ObjectId(req.body.id);
      const result = await product.find({ _id: objectId }).limit(1);

      res.status(200).send(result);
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
      res.status(500).send({ message: "Lỗi truy vấn!" });
    }
  });

  app.post("/api/searchproduct", async function (req, res) {
    // search theo  như sự nhiện nhập

    const query = req.body.q;
    const priceMin = req.body.priceMin;
    const priceMax = req.body.priceMax;
    const sortprice = req.body.sortprice;
    const type = req.body.typeProduct;

    //console.log(type[0]);

    const filter = {};

    // tìm kiếm theo chuỗi nhập vào
    // if (query) {
    //   filter.$or = [
    //     { nameproduct: { $regex: query, $options: "i" } },
    //     { descriptionproduct: { $regex: query, $options: "i" } },
    //   ];
    // }

    // // tìm kiếm theo loại
    // if (type) {
    //   let orArr = [];
    //   for (let i = 0; i < type.length; i++) {
    //     if (type[i] !== null) {
    //       orArr.push({ typeproduct: { $regex: type[i], $options: "i" } });
    //     }
    //   }

    //   if (orArr.length > 0) {
    //     filter.$or = orArr;
    //   }
    // }
    if (query || type) {
      const andArr = [];

      if (query) {
        andArr.push({
          $or: [
            { nameproduct: { $regex: query, $options: "i" } },
            { descriptionproduct: { $regex: query, $options: "i" } },
          ],
        });
      }

      if (type) {
        const orArr = [];
        for (let i = 0; i < type.length; i++) {
          if (type[i] !== null) {
            orArr.push({ typeproduct: { $regex: type[i], $options: "i" } });
          }
        }

        if (orArr.length > 0) {
          andArr.push({ $or: orArr });
        }
      }

      if (priceMin && priceMax) {
        andArr.push({ priceproduct: { $gte: priceMin, $lte: priceMax } });
      } else if (priceMin) {
        andArr.push({ priceproduct: { $gte: priceMin } });
      } else if (priceMax) {
        andArr.push({ priceproduct: { $lte: priceMax } });
      }

      if (andArr.length > 0) {
        filter.$and = andArr;
      }
    }

    // if (priceMin && priceMax) {
    //   filter.priceproduct = { $gte: priceMin, $lte: priceMax };
    // } else if (priceMin) {
    //   filter.priceproduct = { $gte: priceMin };
    // } else if (priceMax) {
    //   filter.priceproduct = { $lte: priceMax };
    // }
    // console.log(req.body);
    try {
      let products = null;

      if (sortprice == 1 || sortprice == -1) {
        products = await product
          .find(filter)
          .sort({ priceproduct: sortprice })
          .exec();
      } else {
        products = await product.find(filter);
      }
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
};
