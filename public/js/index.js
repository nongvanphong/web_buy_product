// hàm dropdown typer produuct
$(".nav li").hover(function () {
  $(this)
    .children("ul")
    .stop()
    .delay(200)
    .animate({ height: "toggle", opacity: "toggle" }, 200);
});

///==================slide

$(document).ready(function () {
  // Thời gian chuyển slide
  var slideInterval = 3000;

  // Chuyển đến slide tiếp theo
  function nextSlide() {
    // Tự động click vào button tương ứng
    let $activeIndicator = $(".carousel-indicators .active");
    if ($activeIndicator.next().length) {
      $activeIndicator.removeClass("active").next().addClass("active");
    } else {
      $activeIndicator.removeClass("active");
      $(".carousel-indicators button:first").addClass("active");
    }
    $activeIndicator.removeClass("active").next().addClass("active");
    $(".carousel-indicators button.active").trigger("click");
  }

  // Tự động chuyển slide
  setInterval(function () {
    nextSlide();
  }, slideInterval);
});

// lấy dữ liệu chjuyeenr trang

// conect api add produc
const getApiProducthome = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/getdataproduct");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      //phỉa sài bootrap mới dùng cách khai báo id thế này
      const containerproducthome = document.querySelector("#product-list-home");
      const productList = JSON.parse(xhr.responseText);

      const showhtml = productList
        .map((product) => {
          return `
          <div class="col col-cart-product" >
          <div class="card">
          <div class="box-card-img-top "id="next-detail-product" onclick="clicknextdetai('${product._id}')">
            <div class="card-item-menu">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <img
              src="http://localhost:3000/static/${product.imgproduct[0]}"
              class="card-img-top custom-card-img-top" alt="ảnh">
          </div>

          <div class="card-body">
            <div class="infor-product">
              <div class="name-product">${product.nameproduct}</div>
              <div class="price-product">$ ${product.priceproduct}</div>
            </div>
            <hr/>
              <div class="row row-cols-3">
                <div class="col">
                  <i class="fa-sharp fa-regular fa-heart"></i>
                </div>
                <div class="col">Buy now</div>
                <div class="col">
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
              </div>
            </div>
            </div>
          </div>`;
        })
        .join("");
      containerproducthome.innerHTML = showhtml;
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
getApiProducthome();

// chuyển màn hing
clicknextdetai = (id) => {
  // console.log(id);
  //chuyeenff tham số giwuax các trang web
  window.location.href = "/chitiet?id=" + id;
};
const onclicksearch = () => {
  searchProducthome();
};

const searchProducthome = () => {
  let q = document.getElementById("search-product").value;

  if (document.getElementById("search-product-1").value) {
    q = document.getElementById("search-product-1").value;
  }
  let type = [null, null, null, null, null];
  let cb1 = document.getElementById("cb1");
  if (cb1.checked) {
    type[0] = "Gia dụng";
  } else {
    type[0] = null;
  }
  let cb2 = document.getElementById("cb2");
  if (cb2.checked) {
    type[1] = "Thời trang";
  } else {
    type[1] = null;
  }
  let cb3 = document.getElementById("cb3");
  if (cb3.checked) {
    type[2] = "Điện tử";
  } else {
    type[2] = null;
  }
  let cb4 = document.getElementById("cb4");
  if (cb4.checked) {
    type[3] = "cá nhân";
  } else {
    type[3] = null;
  }
  let cb5 = document.getElementById("cb5");
  if (cb5.checked) {
    type[4] = "Khác";
  } else {
    type[4] = null;
  }

  let sortdown = document.getElementById("sort-1-down");
  let sortup = document.getElementById("sort-1-up");
  let sortprice = null;
  if (sortdown.checked) {
    sortprice = -1;
  } else if (sortup.checked) {
    sortprice = 1;
  } else {
    sortprice = null;
  }

  let pmax = document.getElementById("search-product-price-max").value;
  let pmin = document.getElementById("search-product-price-min").value;
  console.log(q, pmax, pmin, type);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/searchproduct");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      //phỉa sài bootrap mới dùng cách khai báo id thế này
      const containerproducthome = document.querySelector("#product-list-home");
      const productList = JSON.parse(xhr.responseText);
      if (productList.length <= 0) {
        document.getElementById("loadinghome").style = "display:flex;";
      } else {
        document.getElementById("loadinghome").style = "display:none;";
      }

      const showhtml = productList
        .map((product) => {
          return `
          <div class="col col-cart-product" >
          <div class="card">
          <div class="box-card-img-top "id="next-detail-product" onclick="clicknextdetai('${product._id}')">
            <div class="card-item-menu">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <img
              src="http://localhost:3000/static/${product.imgproduct[0]}"
              class="card-img-top custom-card-img-top" alt="ảnh">
          </div>

          <div class="card-body">
            <div class="infor-product">
              <div class="name-product">${product.nameproduct}</div>
              <div class="price-product">$ ${product.priceproduct}</div>
            </div>
            <hr/>
              <div class="row row-cols-3">
                <div class="col">
                  <i class="fa-sharp fa-regular fa-heart"></i>
                </div>
                <div class="col">Buy now</div>
                <div class="col">
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
              </div>
            </div>
            </div>
          </div>`;
        })
        .join("");
      containerproducthome.innerHTML = showhtml;
    } else if (xhr.status === 500) {
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };
  xhr.send(
    JSON.stringify({
      q: q,
      priceMin: pmin,
      priceMax: pmax,
      typeProduct: type,
      sortprice: sortprice,
    })
  );
};

const onclicksearchhome = (sortprice) => {
  searchProducthome(sortprice);
};

const onclickCheckBox = () => {
  // check box price
  let sortdown = document.getElementById("sort-1-down");
  let sortup = document.getElementById("sort-1-up");
  if (sortdown.checked) {
    sortup.checked = false;
  }
  if (sortup.checked) {
    sortdown.checked = false;
  }
};
