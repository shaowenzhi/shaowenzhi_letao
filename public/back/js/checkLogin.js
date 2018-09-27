$.ajax({
  type: "get",
  url: "/employee/employeeLogout",
  dataType: "json",
  success: function(info) {
    if(info.error === 400) {
      location.href = "login.html";
    }
    if(info.success) {
      console.log("当前用户已经登录");
    }
  }
})