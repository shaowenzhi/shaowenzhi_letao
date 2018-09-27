$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});

//二级菜单切换效果
$(function () {
  $('.lt_aside .category').click(function () {
    $('.lt_aside .child').stop().slideToggle();
  });

  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  });

  $('.icon_logout').click(function () {
    $('#logoutModal').modal("show");
  });

  $('#logoutBtn').click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  });
})