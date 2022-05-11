function Validation() {
  //Ktra Rong
  this.KiemTraRong = function (value, divId, mess) {
    //ktra rong
    if (value === "") {
      //bi loi
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    } else {
      //khong bi loi
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
  };

  //Ktra do dai
  this.KiemTraDoDaiKiTu = function (value, divId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  //Phai chon
  this.KiemTraKitu = function (value, divId, mess, kitu) {
    if (value != kitu) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  //Ktra chua ki tu
  this.KiemTraChuaKiTu = function (value, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  //Ktra email
  this.KiemTraEmail = function (value, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  //Ktra pass
  this.KiemTraPassword = function (value, divId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  //Ktra trung tai khoan
  this.KiemTraTrungTaiKhoan = function (value, divId, mess, arr) {
    /**
     * 0. status = true;
     * 1. Duet arr ;
     * 2. Neu sv.maSV trung voi value
     *    ==> Cap nhat status = true
     *    ==> break
     * 3.check status
     */
    var status = false;
    for (var i = 0; i < arr.length; i++) {
      var nv = arr[i];
      if (nv.taiKhoan == value) {
        status = true;
        break;
      }
    }
    if (status) {
      // k hop le
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    }
    //Hop le
    getEle(divId).innerHTML = "";
    getEle(divId).style.display = "none";
    return true;
  };
}
