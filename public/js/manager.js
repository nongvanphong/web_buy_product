// conect api add produc

let id_user_manager = null;
let pms_user_manager = null;

const getApiDataUser = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/getdatauser");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      //phỉa sài bootrap mới dùng cách khai báo id thế này
      let listDatas = document.querySelector("#list-user");
      let userList = JSON.parse(xhr.responseText);

      // let showhtml = userList
      //   .map((item) => {
      //     return `
      // <div class="col mt-4 ">
      //       <div class="col rounded-2 border border-1 css-col">
      //           <div class="row align-items-start css-col">
      //               <div class="col-5 css-custom-cart-box-manager">
      //                   <div class="bd-placeholder-img rounded-circle
      //                       css-custom-cart-box-img-manager
      //                       text-center">
      //                       avt
      //                   </div>
      //               </div>
      //               <div class="col-7 css-custom-cart-box-manager">
      //                   <div>

      //                       <div>${item.name}</div>
      //                       <div>${item.email}</div>

      //                       <p></p>
      //                       <button type="button" id="premission-admin" style="display: ${
      //                         item.premission === true ? "block" : "none"
      //                       }"
      //                       onclick="updatePremission('${item._id}',false)"
      //                       class="btn
      //                           btn-outline-success">Admin</button>
      //                       <button type="button"
      //                       style="display: ${
      //                         item.premission === true ? "none" : "block"
      //                       }"
      //                       onclick="updatePremission('${item._id}',true)"
      //                       id="premission-user" class="btn
      //                           btn-outline-danger">User</button>
      //                   </div>
      //               </div>

      //           </div>
      //       </div>
      //   </div>

      // `;
      //   })
      //   .join("");

      let showhtml = userList
        .map((item) => {
          return `
          <tr class="fw-normal">
          <th>
              <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  class="shadow-1-strong
                  rounded-circle"
                  alt="avatar 1"
                  style="width: 55px;
                  height: auto;">
            
          </th>
          <th>
          <span class="ms-2">${item.name}</span>
      </th>
          <td class="align-middle">
              <span>${item.email}</span>
          </td>
          <td class="align-middle">
              <h6 class="mb-0"><span
                      class="${
                        item.premission === true
                          ? "badge bg-success"
                          : "badge bg-warning"
                      }">${
            item.premission === true ? "Admin" : "User"
          }</span></h6>
          </td>
          <td class="align-middle">
              <span 
                  data-mdb-toggle="tooltip"
                  title="Done"> 
              
                  <i  onclick="updatePremission('${item._id}',${
            item.premission === true ? false : true
          })"    class="size-icon ${
            item.premission === true
              ? "fa-regular fa-circle-up"
              : "fa-regular fa-circle-up fa-rotate-180 "
          }"
                  style="color:${
                    item.premission === true ? "  #37ff00" : "#ffd500"
                  }; "></i>
                  
                  </span>
              <span 
                  data-mdb-toggle="tooltip"
                  title="Remove"><i
                      class="size-icon fas
                      fa-trash-alt
                      text-danger"></i></span>
          </td>
      </tr>
    
    `;
        })
        .join("");

      listDatas.innerHTML = showhtml;
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
getApiDataUser();

updatePremission = async (id, a) => {
  id_user_manager = id;
  pms_user_manager = a;

  // let xhr1 = new XMLHttpRequest();
  // xhr1.open("POST", "http://localhost:3000/api/updatepremission");
  // xhr1.setRequestHeader("Content-Type", "application/json");
  // xhr1.onload = () => {
  //   if (xhr1.status === 200) {
  //     //phỉa sài bootrap mới dùng cách khai báo id thế này
  //   } else if (xhr1.status === 500) {
  //   } else {
  //     console.error(xhr1.statusText);
  //   }
  // };
  // xhr1.onerror = () => {
  //   console.error("Request failed");
  // };
  // xhr1.send(JSON.stringify({ id: id, premission: a }));

  if (pms_user_manager === false) {
    document.getElementById("manager-modal-body").innerHTML =
      "Bạn có chắc chắn cho người này làm Người Dùng không?";
  } else {
    document.getElementById("manager-modal-body").innerHTML =
      "Bạn có chắc chắn cho người này làm Quản Trị Viên không?";
  }
  $("#manager-exampleModal").modal("show");
};
changePremissionUser = async () => {
  if (id_user_manager != null && pms_user_manager != null) {
    let xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "http://localhost:3000/api/updatepremission");
    xhr1.setRequestHeader("Content-Type", "application/json");
    xhr1.onload = () => {
      if (xhr1.status === 200) {
        getApiDataUser();
      } else if (xhr1.status === 500) {
      } else {
        console.error(xhr1.statusText);
      }
    };
    xhr1.onerror = () => {
      console.error("Request failed");
    };
    xhr1.send(
      JSON.stringify({ id: id_user_manager, premission: pms_user_manager })
    );
  }
};
