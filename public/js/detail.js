// const clickheart = document.getElementById("click-heart");
// clickheart.addEventListener("click", function () {
//   this.classList.add("animate");
//   setTimeout(() => this.classList.remove("animate"), 500);
// });

// const nextsceendetail = document.getElementById("next-detail-product");
// nextsceendetail.addEventListener("click", function () {
//   window.location.href = "/chitiet";
// });

showDetailProduct = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/getdataproductdetail");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      //phỉa sài bootrap mới dùng cách khai báo id thế này
      const containerproductdetail = document.querySelector(
        "#show-detail-product-container"
      );
      const productList = JSON.parse(xhr.responseText);

      const showhtml = productList
        .map((product) => {
          let ii = 0;
          const imgList = product.imgproduct
            .map((img) => {
              ii++;
              return `  <li class="${
                ii == 1 ? "active" : ""
              }" id="pic-${ii}""><a data-target="#pic-1"
            data-toggle="tab"><img style="object-fit: cover; width: 80%; height: 80% ;   "
               src="http://localhost:3000/static/${img}" /></a></li>`;
            })
            .join("");
          let i = 0;
          const imgList1 = product.imgproduct
            .map((img) => {
              i++;
              return `  <div class="tab-pane ${
                i == 1 ? "active" : ""
              }" id="pic-${i}"><img
              src="http://localhost:3000/static/${img}" /></div>`;
            })
            .join("");
          return `
          <div class="card card-detail " >
          <div class="container-fliud">
              <div class="wrapper row">
                  <div class="preview col-md-6">
  
                      <div class="preview-pic tab-content">
                         ${imgList1}
                      </div>
                      <ul class="preview-thumbnail nav nav-tabs">
                         ${imgList}
                         
                      </ul>
  
                  </div>
                  <div class="details col-md-6">
                      <h3 class="product-title">${product.nameproduct}</h3>
                      <div class="rating">
                          <div class="stars">
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star"></span>
                              <span class="fa fa-star"></span>
                          </div>
                          <span class="review-no">41 reviews</span>
                          <span class="review-no">|  number ${product.numberproduct}</span>
                      </div>
                      <p class="product-description">${product.descriptionproduct}</p>
                      <h4 class="price">current price: <span>$ ${product.priceproduct}</span></h4>
                      <p class="vote"><strong>${product.typeproduct}</strong></p>
                      <p class="vote"><strong>91%</strong> of buyers enjoyed this
                          product! <strong>(87 votes)</strong></p>
                      <h5 class="sizes">sizes:
                          <span class="size" data-toggle="tooltip" title="small">s</span>
                          <span class="size" data-toggle="tooltip" title="medium">m</span>
                          <span class="size" data-toggle="tooltip" title="large">l</span>
                          <span class="size" data-toggle="tooltip" title="xtra
                              large">xl</span>
                      </h5>
                      <h5 class="colors">colors:
                          <span class="color orange not-available"
                              data-toggle="tooltip" title="Not In store"></span>
                          <span class="color green"></span>
                          <span class="color blue"></span>
                      </h5>
                      <div class="action">
                          <button class="add-to-cart btn btn-default"
                             onclick="bntAddProductCar('${product._id}')" ">add to cart</button>
                          <button class="like btn btn-default" type="button"><span
                                  class="fa fa-heart"></span></button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
            `;
        })
        .join("");
      containerproductdetail.innerHTML = showhtml;
      clikimg();
    } else if (xhr.status === 500) {
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };
  xhr.send(JSON.stringify({ id: id }));
};

// Lấy giá trị của tham số trên URL
const urlParams = new URLSearchParams(window.location.search);
// Lấy giá trị của tham số name và hiển thị trên trang
const id = urlParams.get("id");

if (id != null) {
  showDetailProduct(id);
}

// bnt add product  cart
bntAddProductCar = async (id) => {
  const id_user = JSON.parse(localStorage.getItem("id_user")).iduser;
  if (id && id_user) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/add_cart");

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        $("#notification").text("Đã thêm vào giỏ hàng");
        $("#main-notifilecation").modal("show");
      } else {
        console.error(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed");
    };

    const data = {
      id_product: id,
      id_user: id_user,
      number: 1,
    };

    xhr.send(JSON.stringify(data));
  }
};

const clikimg = () => {
  // Lấy danh sách các thẻ ảnh nhỏ và thẻ ảnh lớn
  const thumbnailImgs = document.querySelectorAll(".preview-thumbnail img");
  const largeImgs = document.querySelectorAll(".preview-pic img");

  // Xử lý sự kiện click trên các thẻ ảnh nhỏ
  thumbnailImgs.forEach((thumbnailImg, index) => {
    thumbnailImg.addEventListener("click", () => {
      // Thay đổi class active của thẻ ảnh nhỏ và thẻ ảnh lớn tương ứng
      thumbnailImgs.forEach((img) => {
        img.parentElement.parentElement.classList.remove("active");
      });
      thumbnailImg.parentElement.parentElement.classList.add("active");
      largeImgs.forEach((img) => {
        img.parentElement.classList.remove("active");
      });
      largeImgs[index].parentElement.classList.add("active");
    });
  });
};
