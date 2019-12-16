$(() => {
    //验证格式
    //图形验证码
    let captcha1 = new Captcha();
    let yanzhengma;
    captcha1.draw(document.querySelector('#captcha1'), r => {
        console.log(r, '验证码1');
        //toUpperCase() 转成大写  不区分大小写功能
        yanzhengma = r.toUpperCase();
    });
    $('#identifying_code').blur(function (param) {
        if ($.trim($(this).val()).toUpperCase() != yanzhengma) {
            $(this).next().next().text('请输入正确的图形验证码');
            $(this).next().next().addClass('block');
        } else {
            $(this).next().next().text('');
            $(this).next().next().removeClass('block');
        }
    })
    //验证密码格式
    $("#password").blur(function () {
        let reg = /^[0-9a-zA-Z]{3,9}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).next().text('请输入正确的密码');
            $(this).next().addClass('block');
        } else {
            $(this).next().text('');
            $(this).next().removeClass('block');
        }
    })
    //验证账号
    $('#username').blur(function () {
        if ($(this).val() == '') {
            $(this).next().text('请输入正确的账号');
            $(this).next().addClass('block');
        } else {
            $(this).next().text('');
            $(this).next().removeClass('block');
        }
    })

    //发请求
    $('.form-group-submit').click(function (param) {
        $("#username,#password,#identifying_code").trigger("blur");
        //看有几个block名的元素
        if ($(".block").length != 0) {
            alert("请输入正确的注册信息");
        } else {
            //验证通过发送数据插入数据库
            $.ajax({
                type: "get",
                url: "../../server1/register_1.php",
                data: `username=${$('#username').val()}&password=${$('#password').val()}`,
                dataType: "json",
                success: function (data) {
                    if (data.status == "success") {
                        window.location.href = "http://127.0.0.1/index/guomei/client/html/Login.html";
                    } else {
                        alert(data.data.msg)
                    }
                }
            });

        }
    })


})