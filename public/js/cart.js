// hàm hiển thị ra dnah sách sản phmar đã thêm vào giỏ hàng
dataListCart = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/getdatacart");

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      // cách chuyển từ dạng array json sang arr ọbej
      let containerlistcart = document.querySelector("#list-cart-user");
      let arr = JSON.parse(xhr.responseText);
      let i = 0;
      let sumall = 0;

      let datalist = arr

        .map((item) => {
          i++;
          let sump = item.id_product.priceproduct * item.number;
          sumall += sump;
          return `
        <tr>
        <th scope="row">${i}</th>
        <td><div 
        onclick="deleteCart('${item._id}')"
                class="text-danger"><i
                    class="ri-delete-bin-3-line"></i>
                    </div></td>
        <td><img
        src="http://localhost:3000/static/${item.id_product.imgproduct[0]}"
                class="img-fluid
                custom-img-cart
                "
              
               
                alt="product"></td>
        <td>${item.id_product.nameproduct}</td>
        <td>
            <div
                class="form-group
                mb-0">
  


                <div class="col-md-12 col-lg-12 col-xl-8 d-flex">
                <button class="btn btn-link px-2"
                onclick="updateNumberCart(${item.number},'${item._id}',-1)"
               >
                  <i class="fas fa-minus"></i>
                </button>


              
                <input id="form1" min="1" max="10" name="quantity" value="${item.number}" type="number"
                  class="form-control form-control-md" />


                <button class="btn btn-link px-2"
                onclick="updateNumberCart(${item.number},'${item._id}',1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              

            </div>
        </td>
        <td>$${item.id_product.priceproduct}</td>
        <td class="text-right">$${sump}</td>
    </tr>
        `;
        })
        .join("");
      containerlistcart.innerHTML = datalist;

      // hiển thị tổng tiênd
      let tak = sumall * parseFloat(5 / 100);
      let sumalls = sumall + tak;
      let statistical = document.querySelector("#sum-price-cart-user");
      statistical.innerHTML = ` <tr>
<td>Sub Total :</td>
<td>$${sumall}.00</td>
</tr>
<tr>
<td>Shipping :</td>
<td>$0.00</td>
</tr>
<tr>
<td>Tax(5%) :</td>
<td>$${tak}.00</td>
</tr>
<tr>
<td class="f-w-7
    font-18"><h4>Amount
        :</h4></td>
<td class="f-w-7
    font-18"><h4>${sumalls}.00</h4></td>
</tr>`;
    } else if (xhr.status === 500) {
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };

  let id = JSON.parse(localStorage.getItem("id_user")).iduser;

  xhr.send(JSON.stringify({ id_user: id }));
};

dataListCart();

// hàm update sô lượng
const updateNumberCart = async (a, b, c) => {
  if (c === 1) {
    a = a + 1;
  } else {
    a = a - 1;
  }
  if (a > 0 && a < 10) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/updatecart");

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        // cách chuyển từ dạng array json sang arr ọbej
        dataListCart();
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
        id_cart: b,
        number: a,
      })
    );
  }
};
// hàm delete
const deleteCart = async (a) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/deletecart");

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      // cách chuyển từ dạng array json sang arr ọbej
      dataListCart();
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
      id: a,
    })
  );
};
