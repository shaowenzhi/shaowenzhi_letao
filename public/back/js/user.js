$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("tmp", info);
        $('tbody').html(htmlStr);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  };

  //通过事件绑定给按钮绑定事件
  $('tbody').on('click','.btn', function () {
    $('#userModal').modal('show');
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })

  //禁用模态框点击事件
  $('#submitBtn').on("click", function() {
    console.log( currentId, isDelete );

    // 发送ajax请求, 需要用户 id, 和 isDelete(将用户改成什么状态)
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      
      }
    })

  })





})