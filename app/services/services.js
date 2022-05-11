function Services() {
  this.fetchData = function () {
    var promise = axios({
      url: "https://625bc0d150128c5702070712.mockapi.io/api/teacher",
      method: "GET",
    });
    return promise;
  };

  this.deleteTeacherById = function (id) {
    return axios({
      url: "https://625bc0d150128c5702070712.mockapi.io/api/teacher/" + id,
      method: "DELETE",
    });
  };

  this.addTeacher = function (teacher) {
    return axios({
      url: "https://625bc0d150128c5702070712.mockapi.io/api/teacher",
      method: "POST",
      data: teacher,
    });
  };

  this.getTeacherById = function (id) {
    return axios({
      url: `https://625bc0d150128c5702070712.mockapi.io/api/teacher/${id}`,
      method: "GET",
    });
  };

  this.editTeacherById = function (teacher, id) {
    return axios({
      url: `https://625bc0d150128c5702070712.mockapi.io/api/teacher/${id}`,
      method: "PUT",
      data: teacher,
    });
  };
}
