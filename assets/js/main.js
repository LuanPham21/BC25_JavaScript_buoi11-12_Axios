var service = new Services();
var validation = new Validation();
var edit = true;
var isValid = true;

function getEle(id) {
  return document.getElementById(id);
}
var arr = [];
//Api
function getListTeacher() {
  var promise = service.fetchData();
  promise
    .then(function (result) {
      renderHTML(result.data);
      arr = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return arr;
}
function danhSachTeacher(taiKhoan) {
  var index = -1;
  for (var i = 0; i < this.arr.length; i++) {
    var teacher = this.arr[i];
    if (teacher.taiKhoan === taiKhoan) {
      index = i;
      break;
    }
  }
  return index;
}
console.log(arr);
//
function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var teacher = data[i];
    let { id, taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND } = teacher;
    content += `
      <tr>
        <td>${i + 1}</td>
        <td>${taiKhoan}</td>
        <td>${matKhau}</td>
        <td>${hoTen}</td>
        <td>${email}</td>
        <td>${ngonNgu}</td>
        <td>${loaiND}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${id})">Edit</button>
          <button class="btn btn-danger" onclick="xoa(${id})">Delete</button>
        </td>
      </tr>
    `;
  }
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function layThongTinTeacher(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  //Tao co check valid(flag)
  isValid = true;
  // tai khoan
  isValid &=
    validation.KiemTraRong(
      taiKhoan,
      "tbTaiKhoan",
      "(*)Vui long nhap Tai khoan"
    ) &&
    validation.KiemTraTrungTaiKhoan(
      taiKhoan,
      "tbTaiKhoan",
      "(*)Tai Khoan da ton tai",
      arr
    );

  //ho ten
  isValid &=
    validation.KiemTraRong(hoTen, "tbHoTen", "(*)Vui long nhap Ho ten") &&
    validation.KiemTraChuaKiTu(
      hoTen,
      "tbHoTen",
      "(*) vui long nhap dung dinh dang"
    );

  //Mat khau
  isValid &=
    validation.KiemTraRong(matKhau, "tbMatKhau", "(*)Vui long nhap mat khau") &&
    validation.KiemTraPassword(
      matKhau,
      "tbMatKhau",
      "(*) vui long nhap dúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số)"
    ) &&
    validation.KiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui long nhap tu 6 den 8 ki tu",
      6,
      8
    );

  //Email
  isValid &=
    validation.KiemTraRong(email, "tbEmail", "(*)Vui long nhap email") &&
    validation.KiemTraEmail(
      email,
      "tbEmail",
      "(*) Vui long nhap dung dinh dang email"
    );

  //Hinh anh
  isValid &= validation.KiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*)Vui long nhap hinh anh"
  );

  //loai ng dung
  isValid &= validation.KiemTraKitu(
    loaiND,
    "tbloaiNguoiDung",
    "(*)Vui long Chọn loại người dùng",
    "Chọn loại người dùng"
  );

  //loai ngon ngu
  isValid &= validation.KiemTraKitu(
    ngonNgu,
    "tbloaiNgonNgu",
    "(*)Vui long Chọn ngôn ngữ",
    "Chọn ngôn ngữ"
  );

  //mo ta
  isValid &=
    validation.KiemTraRong(moTa, "tbMoTa", "(*)Vui long nhap mo ta") &&
    validation.KiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      "(*) Vui long nhap toi da 60 ki tu",
      0,
      60
    );
  if (isValid) {
    if (!edit) {
      //Tao doi tuong product tu lop doi tuong product
      var teacher = new Teacher(
        "",
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        taiKhoan,
        moTa,
        hinhAnh
      );
      return teacher;
    } else {
      //Tao doi tuong product tu lop doi tuong product
      var teacher = new Teacher(
        id,
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        taiKhoan,
        moTa,
        hinhAnh
      );
      return teacher;
    }
  }
  return teacher;
}
getListTeacher();
console.log(isValid);
/**
 * Xoa SP
 */

function xoa(id) {
  service
    .deleteTeacherById(id)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      getListTeacher();
    });
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  edit = false;
  //sua lai tieu de
  document.querySelector(".modal-title").innerHTML = "Them giao vien";
  //Them button "Add" vao footer cua model
  var footer = `<button class="btn btn-success" onclick = "addTeacher()">Add</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;
});

/**
 * Add product
 */

function addTeacher() {
  // var taiKhoan = getEle("TaiKhoan").value;
  // var hoTen = getEle("HoTen").value;
  // var matKhau = getEle("MatKhau").value;
  // var email = getEle("Email").value;
  // var hinhAnh = getEle("HinhAnh").value;
  // var loaiND = getEle("loaiNguoiDung").value;
  // var ngonNgu = getEle("loaiNgonNgu").value;
  // var moTa = getEle("MoTa").value;

  // //Tao doi tuong product tu lop doi tuong product
  // var teacher = new Teacher(
  //   "",
  //   hoTen,
  //   matKhau,
  //   email,
  //   loaiND,
  //   ngonNgu,
  //   taiKhoan,
  //   moTa,
  //   hinhAnh
  // );
  var id = 0;
  var teacher = layThongTinTeacher(id);
  if (teacher) {
    service
      .addTeacher(teacher)
      .then((res) => {
        //tat popup
        if (isValid) {
          document.querySelector(".close").click();
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getListTeacher();
      });
  }
}

/**
 * Sua SP
 */
function sua(id) {
  edit = true;
  //sua lai tieu de
  document.querySelector(".modal-title").innerHTML = "Sua giao vien";
  //Them button "Update" vao footer cua model
  var footer = `<button class="btn btn-success" onclick = "update(${id})">Edit</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;

  service
    .getTeacherById(id)
    .then(function (res) {
      console.log(res);
      let { hoTen, matKhau, email, loaiND, ngonNgu, taiKhoan, moTa, hinhAnh } =
        res.data;
      getEle("TaiKhoan").value = taiKhoan;
      getEle("HoTen").value = hoTen;
      getEle("MatKhau").value = matKhau;
      getEle("Email").value = email;
      getEle("HinhAnh").value = hinhAnh;
      getEle("loaiNguoiDung").value = loaiND;
      getEle("loaiNgonNgu").value = ngonNgu;
      getEle("MoTa").value = moTa;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Update
 */

function update(id) {
  // var taiKhoan = getEle("TaiKhoan").value;
  // var hoTen = getEle("HoTen").value;
  // var matKhau = getEle("MatKhau").value;
  // var email = getEle("Email").value;
  // var hinhAnh = getEle("HinhAnh").value;
  // var loaiND = getEle("loaiNguoiDung").value;
  // var ngonNgu = getEle("loaiNgonNgu").value;
  // var moTa = getEle("MoTa").value;

  // //Tao doi tuong product tu lop doi tuong product
  // var teacher = new Teacher(
  //   id,
  //   hoTen,
  //   matKhau,
  //   email,
  //   loaiND,
  //   ngonNgu,
  //   taiKhoan,
  //   moTa,
  //   hinhAnh
  // );
  var teacher = layThongTinTeacher(id);
  console.log(teacher);
  service
    .editTeacherById(teacher, id)
    .then((res) => {
      //tat popup
      if (isValid) {
        document.querySelector(".close").click();
      } else {
      }
    })
    .catch((error) => {})
    .finally(() => {
      getListTeacher();
    });
}
