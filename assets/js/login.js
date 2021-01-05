$(function () {
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      //通过形参难道的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于的判断
      //如果判断失败,则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "两次密码不一致!";
    },
  });
  //注册功能,监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://api-breakingnews-web.itheima.net/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      (res) => {
        if (res.status !== 0) {
          // return console.log("注册失败!" + res.message);
          return layer.msg(res.message);
        }
        // console.log(res.message);
        layer.msg("注册成功,请登录!");
        $("#link-login").click();
      }
    );
  });
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "http://api-breakingnews-web.itheima.net/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("登录失败!");
        }
        layer.msg("登录成功!");
        // 存储
        localStorage.setItem("token", res.token);
        // 跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
});
