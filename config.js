var mongoose = require("mongoose");
const url =
  "mongodb+srv://phongnvpk02133:p123456@cluster0.sycmglp.mongodb.net/nodejs";
var optionss = {};

const db = mongoose.connect(url, optionss).then(
  () => {
    console.log("connect sussec");
  },
  (err) => {
    console.log("unconnect ==> ", err);
  }
);
module.exports = {
  conn: db,
};
