const bntsingin = document.getElementById("bnt-singin");
const bntnextlogin = document.getElementById("bnt-nextlogin");

const validatesingin = (email, nameuser, pass1, pass2) => {
  //   const erremail = (document.getElementById("login-emailHelp").innerHTML =
  //     text("lối"));
  //   const errtxtemail = (document.getElementById(
  //     "exampleInputPassword"
  //   ).innerHTML = text("lối"));
  // kiểm tả email có đúng định dạng

  let a,
    b,
    c,
    d = false;

  if (validator.isEmail(email) && validator.isEmpty(email) === false) {
    a = true;
    document.getElementById("singin-email-err").style = "display:none;";
  } else {
    a = false;
    document.getElementById("singin-email-err").style = style =
      "display:block; color:red;font-size:14px";
    document.getElementById("singin-email-err").innerHTML =
      "Lỗi địa email: phải đúng định dạng email";
  }

  // kiểm tra pass
  if (
    validator.isEmpty(nameuser) === false &&
    validator.isLength(nameuser, { min: 2, max: 30 })
  ) {
    b = true;
    document.getElementById("singin-name-err").style = "display:none;";
  } else {
    b = false;
    document.getElementById("singin-name-err").style = style =
      "display:block; color:red;font-size:14px";
    document.getElementById("singin-name-err").innerHTML =
      "Lỗi tên: không bé hơn 2 hoặc lớn 20 kí tự";
  }

  if (
    validator.isEmpty(pass1) === false &&
    validator.isLength(pass1, { min: 1, max: 10 })
  ) {
    c = true;
    document.getElementById("singin-pass1-err").style = "display:none;";
  } else {
    c = false;
    document.getElementById("singin-pass1-err").style = style =
      "display:block; color:red;font-size:14px";
    document.getElementById("singin-pass1-err").innerHTML =
      "Lỗi mật khẩu: không lớn 10 kí tự";
  }
  if (validator.isEmpty(pass2) === false && pass2 === pass1) {
    d = true;
    document.getElementById("singin-pass2-err").style = "display:none;";
  } else {
    d = false;
    document.getElementById("singin-pass2-err").style = style =
      "display:block; color:red;font-size:14px";
    document.getElementById("singin-pass2-err").innerHTML =
      "Lỗi mật khẩu: không giống nhau";
  }

  if (a === true && b === true && c == true && d === true) {
    return true;
  }
  return false;
};

bntsingin.addEventListener("click", function () {
  const inputemail = document.getElementById("singin-exampleInputEmail").value;
  const inputname = document.getElementById("singin-exampleInputName").value;
  const inputpass1 = document.getElementById(
    "singin-exampleInputPassword1"
  ).value;
  const inputpass2 = document.getElementById(
    "singin-exampleInputPassword2"
  ).value;
  // kiểm tra email và pass
  if (!validatesingin(inputemail, inputname, inputpass1, inputpass2)) {
  } else {
    //$("#singin-exampleModal").modal("show");

    insertusser(inputemail, inputname, inputpass1);
  }
});

// ki bấm closss thì chuyên qua đăng nhập
bntnextlogin.addEventListener("click", function () {
  // chuyển trang snag login
  window.location.href = "/";
});

const insertusser = (email, username, password) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/singinuser");

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      document.getElementById("modal-body").innerHTML = "Đăng kí thành công";
      document.getElementById("bnt-nextlogin").style = "display:block";
      document.getElementById("bnt-nextlogin-fail").style = "display:none";
      $("#singin-exampleModal").modal("show");
    } else if (xhr.status === 409) {
      document.getElementById("modal-body").innerHTML =
        "Email đã có người sử dụng";
      document.getElementById("bnt-nextlogin").style = "display:none";
      document.getElementById("bnt-nextlogin-fail").style = "display:block";
      $("#singin-exampleModal").modal("show");
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error("Request failed");
  };

  const data = {
    email: email,
    username: username,
    password: password,
  };

  console.log("=======");
  console.log(JSON.stringify(data));

  xhr.send(JSON.stringify(data));
};
