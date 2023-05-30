const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://phongnvpk02133:p123456@cluster0.sycmglp.mongodb.net/test";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectt() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    // tên đa tabse kết nối
    const db = client.db("nodejs");
    return db;
  } catch (err) {
    console.error("err==>", err);
  }
}

module.exports = {
  conn: connectt,
  cl: client,
};
