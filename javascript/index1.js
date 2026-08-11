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

//SẢN PHẨM
addToCart = function (name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = { name, price, image, qty: 1 };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm " + name + " vào giỏ hàng!");
};

function showPage(page) {
  document
    .querySelectorAll(".product-page")
    .forEach((p) => (p.style.display = "none"));
  document.getElementById("page" + page).style.display = "block";
}

addToCart = function (name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  0;
  let item = { name, price, image, qty: 1 };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm " + name + " vào giỏ hàng!");
};

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbl = document.getElementById("tblResult");
  tbl.innerHTML = `
            <tr>
                <th>Hình</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Chức năng</th>
            </tr>
             `;
  let total = 0;
  cart.forEach((item, index) => {
    let row = document.createElement("tr");
    // HÌNH
    let td = document.createElement("td");
    td.innerHTML = `<img src="${item.image}" width="70" height="70" style="object-fit:cover;">`;
    row.appendChild(td);

    // TÊN
    td = document.createElement("td");
    td.innerHTML = item.name;
    row.appendChild(td);

    // GIÁ
    td = document.createElement("td");
    td.innerHTML = item.price.toLocaleString() + "đ";
    row.appendChild(td);

    // SỐ LƯỢNG
    td = document.createElement("td");
    td.innerHTML = item.qty;
    row.appendChild(td);

    // THÀNH TIỀN
    let thanhTien = item.qty * item.price;
    total += thanhTien;
    td = document.createElement("td");
    td.innerHTML = thanhTien.toLocaleString() + "đ";
    row.appendChild(td);

    // NÚT
    td = document.createElement("td");
    td.innerHTML = `
                <button onclick="buyItem(${index})">Mua</button>
                <button onclick="editItem(${index})">Sửa</button>
                <button onclick="deleteItem(${index})">Xóa</button>
            `;
    row.appendChild(td);

    tbl.appendChild(row);
  });
  // tổng tiền
  let row = document.createElement("tr");
  row.innerHTML = `
            <td colspan="5"><b>Tổng thành tiền</b></td>
            <td><b>${total.toLocaleString()}đ</b></td>
        `;
  tbl.appendChild(row);

  document.getElementById("total-money").innerHTML =
    "Tổng tiền: <b>" + total.toLocaleString() + "đ</b>";
}

function deleteItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function editItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sl = prompt("Nhập số lượng mới:", cart[i].qty);
  if (sl > 0) {
    cart[i].qty = parseInt(sl);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}
function buyItem(i) {
  alert("Bạn đã mua: " + JSON.parse(localStorage.getItem("cart"))[i].name);
}
loadCart();
