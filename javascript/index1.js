function DangKy(event) {
  event.preventDefault();

  let usernameDK = document.getElementById("dangkyusername").value;
  let emailDK = document.getElementById("dangkyemail").value;
  let password1 = document.getElementById("dangkymatkhau1").value;
  let password2 = document.getElementById("dangkymatkhau2").value;
  let dkError = document.getElementById("DKError");

  if (!usernameDK || !emailDK || !password1 || !password2) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    document.getElementById("formDK").reset();
    return false;
  }

  if (password1 != password2) {
    alert("Vui Lòng Kiểm Tra Lại Mật Khẩu");
    document.getElementById("dangkymatkhau1").value = "";
    document.getElementById("dangkymatkhau2").value = "";
    return false;
  }

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!regex.test(password1)) {
    dkError.hidden = false;
    document.getElementById("dangkymatkhau1").value = "";
    document.getElementById("dangkymatkhau2").value = "";
    return false;
  }
  dkError.hidden = true;

  localStorage.setItem("email", emailDK);
  localStorage.setItem("password", password1);

  alert("Đăng ký tài khoản thành công!");
  window.location.href = "../html/dangnhap.html";
  return true;
}

function DangNhap(event) {
  event.preventDefault();

  let emailDN = document.getElementById("dangnhapemail").value;
  let passwordDN = document.getElementById("dangnhapmatkhau").value;
  let dnError1 = document.getElementById("DNError1");
  let dnError2 = document.getElementById("DNError2");

  if (!emailDN || !passwordDN) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    document.getElementById("formDN").reset();
    return false;
  }

  let savedemail = localStorage.getItem("email");
  let savepassword = localStorage.getItem("password");

  if (emailDN != savedemail) {
    dnError1.hidden = false;
    return false;
  }
  dnError1.hidden = true;

  if (passwordDN != savepassword) {
    dnError2.hidden = false;
    return false;
  }

  dnError2.hidden = true;
  alert("Đăng nhập thành công, trở về trang chủ");
  window.location.href = "trangchu.html";
  return true;
}

function KhoiPhucTaiKhoan(event) {
  event.preventDefault();
  let emailKPTK = document.getElementById("emailKPTK").value;

  if (!emailKPTK) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    document.getElementById("formDK").reset();
    return false;
  }

  window.location.href = "khoiphuctaikhoan1.html";
  return true;
}

function LienHe(event) {
  event.preventDefault();

  let Chude = document.getElementById("chude").value;
  let PhanHoi = document.getElementById("feedback").value;

  if (!Chude || !PhanHoi) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  }

  window.location.href = "trangchu.html";
  alert("Gửi thông tin thành công");
  return true;
}

window.addToCart = function (name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let numericPrice = Number(price) || 0;

  let existingIndex = cart.findIndex((item) => item.name === name);

  if (existingIndex !== -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ name, price: numericPrice, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm " + name + " vào giỏ hàng!");
};

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbl = document.getElementById("tblResult");
  if (!tbl) return;

  tbl.innerHTML = `
    <tr>
      <th>Hình</th><th>Tên SP</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th><th>Chức năng</th>
    </tr>`;

  cart.forEach((item, index) => {
    let row = document.createElement("tr");
    let price = Number(item.price) || 0;
    let qty = Number(item.qty) || 0;

    row.innerHTML = `
      <td><img src="${item.image}" width="50"></td>
      <td>${item.name}</td>
      <td>${price.toLocaleString("vi-VN")}đ</td>
      <td>${qty}</td>
      <td>${(price * qty).toLocaleString("vi-VN")}đ</td>
      <td>
        <button onclick="buyItem(${index})">Mua</button>
        <button onclick="editItem(${index})">Sửa</button>
        <button onclick="deleteItem(${index})">Xóa</button>
      </td>
    `;
    tbl.appendChild(row);
  });
}

function buyItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    alert("Bạn đã mua thành công: " + cart[index].name);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function deleteItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function editItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sl = prompt("Nhập số lượng mới:", cart[i].qty);

  if (sl !== null) {
    let newQty = parseInt(sl);
    if (!isNaN(newQty) && newQty > 0) {
      cart[i].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    } else {
      alert("Số lượng không hợp lệ!");
    }
  }
}

// Gọi hàm loadCart khi tải xong trang
document.addEventListener("DOMContentLoaded", loadCart);