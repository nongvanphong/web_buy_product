// Lấy giá trị của tham số trên URL
const urlParamsHome = new URLSearchParams(window.location.search);
// // Lấy giá trị của tham số name và hiển thị trên trang

// const getPresion = async (id) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "http://localhost:3000/api/getsingeruser");
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       //phỉa sài bootrap mới dùng cách khai báo id thế này

//       const listitem = JSON.parse(xhr.responseText);
//       listitem.map((item) => {
//         document.getElementById("name-user").innerText = item.name;

//         // hiển thị những người được làm admin
//         let elements = document.getElementsByClassName(
//           "yyy-show-admin-seen-xxx"
//         );
//         if (item.premission == true) {
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = "block";
//           }
//         } else {
//           for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = "none";
//           }
//         }
//       });
//     } else if (xhr.status === 500) {
//     } else {
//       console.error(xhr.statusText);
//     }
//   };
//   xhr.onerror = () => {
//     console.error("Request failed");
//   };
//   xhr.send(JSON.stringify({ id: id }));
// };

// const id_user = localStorage.getItem("id_user");
// if (id_user === null) {
//   console.log("nulll");
// } else {
//   getPresion(id_user);
// }

const userObj = JSON.parse(localStorage.getItem("id_user"));
if (userObj === null) {
  $(function () {
    document.getElementById("notification-err-login").innerHTML =
      "Cần xác minh lại tài khoản...!";
    document.getElementById("next-screen-login").style = "display:block";
    // document.getElementById("bnt-nextlogin-fail").style = "display:none";
    $("#main-exampleModal").modal("show");
  });
} else {
  document.getElementById("name-user").innerText = userObj.nameusser;

  // hiển thị những người được làm admin
  let elements = document.getElementsByClassName("yyy-show-admin-seen-xxx");
  if (userObj.premissionuser == true) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
}

// hàm chuyển lại đăng nhập
loginagain = () => {
  window.location.replace("/");
  // window.location.href = "/";
};
