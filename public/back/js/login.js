$(function(){
  $('#form').bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
  //设置校验规则
  fields:{
    username:{
        validators:{
            notEmpty:{
                message:"用户名不能为空"
            },
          	stringLength:{
                min:2,
              	max:6,
              	message:"用户名长度必须是2-6位"
            },
            callback:{
              message:"用户名不存在"
            }
        }
    },
    password:{
        validators:{
          notEmpty:{
              message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
    }
    
  }
  
});

  $('#form').on("success.form.bv", function(e){
  //阻止表单的默认提交
  e.preventDefault();
  //使用ajax进行提交
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$('#form').serialize(),
    dataType:"json",
    success:function(info){
      if(info.success) {
        location.href = "index.html";
      }
      if(info.error === 1000) {
        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
      }
      if(info.error === 1001) {
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
      }
    }
  });
});

$('[type="reset"]').click(function(){
  $("form").data("bootstrapValidator").resetForm();
});
});