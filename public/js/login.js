const bntlogin = document.getElementById("bnt-login");
let iduser = null;
const validate = (email, pass) => {
  //   const erremail = (document.getElementById("login-emailHelp").innerHTML =
  //     text("lối"));
  //   const errtxtemail = (document.getElementById(
  //     "exampleInputPassword"
  //   ).innerHTML = text("lối"));
  // kiểm tả email có đúng định dạng
  let a,
    b = false;

  if (validator.isEmail(email) && validator.isEmpty(email) === false) {
    a = true;
    // document.getElementById("login-email-err").style = "display:none;";
  } else {
    a = false;

    // document.getElementById("login-email-err").style = style =
    //   "display:block; color:red;font-size:14px";
    // document.getElementById("login-email-err").innerHTML = "Lỗi mật email";
  }

  // kiểm tra pass
  if (validator.isEmpty(pass) === false) {
    b = true;
    //document.getElementById("login-pass-err").style = "display:none;";
  } else {
    b = false;
    // document.getElementById("login-pass-err").style = style =
    //   "display:block; color:red;font-size:14px";
    // document.getElementById("login-pass-err").innerHTML =
    //   "Lỗi mật khẩu: không lớn 10 kí tự";
  }

  if (a === true && b === true) {
    return true;
  }
  return false;
};

bntlogin.addEventListener("click", function () {
  const inputemail = document.getElementById("exampleInputEmail").value;
  const inputpass = document.getElementById("exampleInputPassword").value;

  // kiểm tra email và pass
  if (validate(inputemail, inputpass) == true) {
    // chuyenr vào trang chủ
    //window.location.href = "/home";
    checkLogin(inputemail, inputpass);
  } else {
    // Hiển thị modal do sủa dụng bosstrap nên phỉa viết như theess này
    document.getElementById("login-modal-body").innerHTML =
      "Tài khoản hoặc mật khẩu không chính xác";
    document.getElementById("bnt-login-success").style = "display:none";
    $("#login-exampleModal").modal("show");
  }
  // checkLogin(inputemail, inputpass);
});

const checkLogin = (email, password) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/login");

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      // cách chuyển từ dạng array json sang arr ọbej
      const arr = JSON.parse(xhr.responseText);

      // iduser = arr[0]._id;
      // nameusser = arr[0].name;
      // premissionuser = arr[0].premission;

      // document.getElementById("login-modal-body").innerHTML =
      //   "Đăng nhập thành công";
      // document.getElementById("bnt-login-success").style = "display:block";
      // document.getElementById("bnt-login-fail").style = "display:none";

      // $("#login-exampleModal").modal("show");

      // chuyển trang snag login
      const userObj = {
        iduser: arr[0]._id,
        nameusser: arr[0].name,
        premissionuser: arr[0].premission,
      };
      localStorage.setItem("id_user", JSON.stringify(userObj));
      window.location.href = "/home";
    } else if (xhr.status === 500) {
      document.getElementById("login-modal-body").innerHTML =
        "Mật khẩu hoặc tài khoản không chính xác";
      document.getElementById("bnt-login-fail").style = "display:block";
      document.getElementById("bnt-login-success").style = "display:none";
      $("#login-exampleModal").modal("show");
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };

  const data = {
    email: email,
    password: password,
  };

  xhr.send(JSON.stringify(data));
};
