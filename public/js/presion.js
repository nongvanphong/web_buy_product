const bntaddproduct = document.getElementById("add-product");

// chọn ảnh từ file
const input = document.getElementById("file");
const preview = document.getElementById("image-preview");

input.addEventListener("change", () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);
});

const input2 = document.getElementById("file1");
const preview2 = document.getElementById("image-preview1");

input2.addEventListener("change", () => {
  const file2 = input2.files[0];
  const reader2 = new FileReader();

  reader2.addEventListener("load", () => {
    preview2.src = reader2.result;
  });

  reader2.readAsDataURL(file2);
});

// hàm thêm  sản phẩm
bntaddproduct.addEventListener("click", function (event) {
  let ipfile = document.getElementById("file");
  let ipname = document.getElementById("input-name-product").value;
  let ipprice = document.getElementById("input-price-product").value;
  let ipnumber = document.getElementById("input-number-product").value;
  let ipndesride = document.getElementById("input-descride-product").value;
  let iptype = document.getElementById("input-type-product").value;

  if (checkvalidate(ipname, ipprice, ipnumber, ipndesride, iptype) === false) {
    document.getElementById("id-delete-xxx").value = id;
    // Hiển thị modal do sủa dụng bosstrap nên phỉa viết như theess này
    $("#presion-exampleModal").modal("show");
    document.getElementById("notification-delete-product").innerHTML =
      "Vui lòng nhập đủ các thông tin yêu cầu";
    document.getElementById("showbntdelete").style = "display: none";
    document.getElementById("showbntxacnhan").style = "display: block";
    document.getElementById("showbntxacnhanupdate").style = "display: none";
    document.getElementById("showbntxacnhanadd").style = "display: none";
  } else {
    // event.preventDefault();

    connectApiProduct(ipfile, ipname, ipprice, ipnumber, ipndesride, iptype);
  }

  // $("#collapseExample").collapse("hide");
});

// check validate

const checkvalidate = (ipname, ipprice, ipnumber, ipndesride, iptype) => {
  let a,
    b,
    c,
    d,
    f = false;

  if (validator.isEmpty(ipname) === false) {
    a = true;
  } else {
    a = false;
  }
  if (validator.isEmpty(ipprice) === false) {
    b = true;
  } else {
    b = false;
  }
  if (validator.isEmpty(ipnumber) === false) {
    c = true;
  } else {
    c = false;
  }
  if (validator.isEmpty(ipndesride) === false) {
    d = true;
  } else {
    d = false;
  }
  if (iptype !== "Danh mục") {
    f = true;
  } else {
    f = false;
  }

  if (a === true && b === true && c === true && d === true && f === true) {
    return true;
  }
  return false;
};

// conect api add produc
const getApiProduct = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/getdataproduct");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      //phỉa sài bootrap mới dùng cách khai báo id thế này
      const container = document.querySelector("#product-list");
      const productList = JSON.parse(xhr.responseText);

      const showhtml = productList
        .map((product) => {
          return `
          <div class="col col-cart-product">
              <div class="card">
                  <div class="box-card-img-top " data-bs-toggle="collapse" href="#collapseExampleupdate" onclick="bntupdateproduct('${product._id}','${product.nameproduct}',${product.priceproduct},${product.numberproduct},'${product.descriptionproduct}','${product.typeproduct}')">
                      <div class="card-item-menu">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                      <img src="http://localhost:3000/static/${product.imgproduct[0]}" class="card-img-top custom-card-img-top" alt="ảnh">
                  </div>
                  <div class="card-body">
                      <div class="infor-product text-center">
                          <div class="name-product">${product.nameproduct}</div>
                          <div class="price-product">$ ${product.priceproduct}</div>
                      </div>
                      <hr/>
                          <div class="row ">
                              <div class="col">
                                  <div class="delete-product">
                                      <button id="delete-product" onclick="bntdeleteproduct('${product._id}')" class="btn btn-danger">Delete</button>
                                  </div>
                              </div>
                          </div>
                  </div>
              </div>
          </div>`;
        })
        .join("");
      container.innerHTML = showhtml;
    } else if (xhr.status === 500) {
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };
  xhr.send();
};
getApiProduct();

bntupdateproduct = (id, ipname, ipprice, ipnumber, ipdescription, iptype) => {
  console.log(
    "bntupdateproduct",
    id,
    ipname,
    ipnumber,
    ipdescription,
    iptype,
    ipprice
  );
  document.getElementById("input-id-product-update").value = id;
  document.getElementById("input-name-product-update").value = ipname;
  document.getElementById("input-price-product-update").value = ipprice;
  document.getElementById("input-number-product-update").value = ipnumber;
  document.getElementById("input-desrition-product-update").value =
    ipdescription;
  document.getElementById("input-type-product-update").value = iptype;
};

const bntupdate = document.getElementById("update-products");
// // // hàm cập hhap  sản phẩm
bntupdate.addEventListener("click", function (event) {
  let ipfile = document.getElementById("file1");
  let ipname = document.getElementById("input-name-product-update").value;
  let ipprice = document.getElementById("input-price-product-update").value;
  let ipnumber = document.getElementById("input-number-product-update").value;
  let ipndesride = document.getElementById(
    "input-desrition-product-update"
  ).value;
  let iptype = document.getElementById("input-type-product-update").value;
  let id = document.getElementById("input-id-product-update").value;
  if (checkvalidate(ipname, ipprice, ipnumber, ipndesride, iptype) === false) {
    document.getElementById("id-delete-xxx").value = id;
    // Hiển thị modal do sủa dụng bosstrap nên phỉa viết như theess này
    $("#presion-exampleModal").modal("show");
    document.getElementById("notification-delete-product").innerHTML =
      "Vui lòng nhập đủ các thông tin yêu cầu";
    document.getElementById("showbntdelete").style = "display: none";
    document.getElementById("showbntxacnhan").style = "display: block";
    document.getElementById("showbntxacnhanupdate").style = "display: none";
    document.getElementById("showbntxacnhanadd").style = "display: none";
  } else {
    updatetApiProduct(
      ipfile,
      ipname,
      ipprice,
      ipnumber,
      ipndesride,
      iptype,
      id
    );
  }

  // $("#collapseExample").collapse("hide");
});

// // hàm xóa  sản phẩm
bntdeleteproduct = (id) => {
  document.getElementById("id-delete-xxx").value = id;
  // Hiển thị modal do sủa dụng bosstrap nên phỉa viết như theess này
  $("#presion-exampleModal").modal("show");
  document.getElementById("notification-delete-product").innerHTML =
    "Bạn có muốn xóa sản phẩm này không?";
  document.getElementById("showbntdelete").style = "display: block";
  document.getElementById("showbntxacnhan").style = "display: none";
  document.getElementById("showbntxacnhanupdate").style = "display: none";
  document.getElementById("showbntxacnhanadd").style = "display: none";
};

//

deleteProductApi = () => {
  let id = document.getElementById("id-delete-xxx").value;

  document.getElementById("showbntdelete").style = "display: none";
  // document.getElementById("showbntxacnhan").style = "display: block";

  document.getElementById("notification-delete-product").innerHTML =
    "Đang xử lí vui lòng đợi ...!";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/deleteproduct");

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      $("#presion-exampleModal").modal("hide");
      getApiProduct();
    } else if (xhr.status === 500) {
      document.getElementById("notification-delete-product").innerHTML =
        "xóa thất bại";
      document.getElementById("showbntxacnhan").style = "display: block";
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };

  const data = {
    id: id,
  };

  xhr.send(JSON.stringify(data));
  // $("#presion-exampleModal").modal("hide");
};

const connectApiProduct = async (
  file,
  ipname,
  ipprice,
  ipnumber,
  ipndesride,
  iptype
) => {
  const formData = new FormData();

  // Thêm thông tin sản phẩm vào FormData object
  formData.append("nameproduct", ipname);
  formData.append("priceproduct", ipprice);
  formData.append("numberproduct", ipnumber);
  formData.append("desritionproduct", ipndesride);
  formData.append("typeproduct", iptype);

  // Lặp qua mảng các files ảnh
  for (let i = 0; i < file.files.length; i++) {
    // Thêm cặp giá trị (tên sản phẩm, file ảnh) vào FormData object
    formData.append("file1", file.files[i]);
  }
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status == 200) {
        document.getElementById("showbntxacnhan").style = "display: none";
        document.getElementById("showbntxacnhanupdate").style = "display: none";
        $("#presion-exampleModal").modal("show");
        document.getElementById("notification-delete-product").innerHTML =
          "Thêm thành công";
        document.getElementById("showbntxacnhanadd").style = "display: block";
        getApiProduct();
      } else if (response.status == 500) {
        $("#presion-exampleModal").modal("show");
        document.getElementById("notification-delete-product").innerHTML =
          "Thêm thất bại";
        document.getElementById("showbntxacnhanadd").style = "display: block";
      }
    })
    .then((data) => {
      //console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updatetApiProduct = async (
  file,
  ipname,
  ipprice,
  ipnumber,
  ipndesride,
  iptype,
  id
) => {
  const formData = new FormData();

  // Thêm thông tin sản phẩm vào FormData object
  formData.append("idproductupdate", id);
  formData.append("nameproductupdate", ipname);
  formData.append("priceproductupdate", ipprice);
  formData.append("numberproductupdate", ipnumber);
  formData.append("desritionproductupdate", ipndesride);
  formData.append("typeproductupdate", iptype);

  // Lặp qua mảng các files ảnh
  for (let i = 0; i < file.files.length; i++) {
    // Thêm cặp giá trị (tên sản phẩm, file ảnh) vào FormData object
    formData.append("file1", file.files[i]);
  }
  fetch("/api/updateproduct", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status == 200) {
        document.getElementById("showbntxacnhan").style = "display: none";
        document.getElementById("showbntxacnhanadd").style = "display: none";
        $("#presion-exampleModal").modal("show");
        document.getElementById("notification-delete-product").innerHTML =
          "Cập nhập thành công";
        document.getElementById("showbntxacnhanupdate").style =
          "display: block";
        getApiProduct();
      } else if (response.status == 500) {
        $("#presion-exampleModal").modal("show");
        document.getElementById("notification-delete-product").innerHTML =
          "Cập nhập thất bại";
        document.getElementById("showbntxacnhanupdate").style =
          "display: block";
      }
    })
    .then((data) => {
      //console.log("----", data);
    })
    .catch((error) => {
      console.error("----", error);
    });
};
