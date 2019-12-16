$(() => {
    $('.denglu').click(function (param) {
        // 获取输入框内容
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: "post",
            url: "../../server1/login_1.php",
            data: { username, password },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // {status:"ok",data:{msg:"登录成功"}}
                if (response.status == "success") {
                    window.location.href = "https://www.baidu.com/";
                } else {
                    alert(response.data.msg);
                }
            }
        });
    })
})