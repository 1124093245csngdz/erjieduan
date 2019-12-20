$(() => {
    //放大镜
    $('.jqzoom').mouseenter(function (param) {
        $('.zhezhao').css('display', 'block');
        $('.datu').css('display', 'block')
        $('.pic-l-b').css('display', 'none')
    })
    $('.jqzoom').mouseleave(function (param) {
        $('.zhezhao').css('display', 'none');
        $('.datu').css('display', 'none')
        $('.pic-l-b').css('display', 'block')
    })
    $('.jqzoom').mousemove(function (param) {
        var left = param.pageX - $('.gome-container')[0].offsetLeft - $('.zhezhao')[0].offsetWidth / 2;
        var top = param.pageY - $('.gome-container')[0].offsetTop - $('.zhezhao')[0].offsetHeight / 2;

        var moveX = $('.pic-big')[0].offsetWidth - $('.zhezhao')[0].offsetWidth;
        var moveY = $('.pic-big')[0].offsetHeight - $('.zhezhao')[0].offsetHeight;
        if (left >= moveX) {
            left = moveX;
        } else if (left <= 0) {
            left = 0
        }
        if (top >= moveY) {
            top = moveY
        } else if (top <= 0) {
            top = 0
        }
        $('.zhezhao').css('left', left + 'px')
        $('.zhezhao').css('top', top + 'px')
        var biliX = ($('.tupic')[0].offsetWidth - $('.datu')[0].offsetWidth) / moveX;
        var biliY = ($('.tupic')[0].offsetHeight - $('.datu')[0].offsetHeight) / moveY;
        $('.tupic').css('left', -left * biliX + 'px');
        $('.tupic').css('top', -top * biliY + 'px');
    })
    //切换
    $('.pic-small').find('ul').on('click', 'li', function (param) {
        let src = $(this).find('img').attr('src');
        $('.j-bpic-b').attr('src', src);
        $('.aaaaa').find('img').attr('src', src);
    })
    //选中的图片边框
    $('.pic-small').find('ul').on('mouseenter', 'li', function (param) {
        $(this).find('img').addClass('border1');
        $(this).siblings().find('img').removeClass('border1');
    })
    //左右切换

    $('.pic-btn-r').click(function (param) {
        let yd = $('.pic-small').find('ul')[0].offsetLeft;
        $('.pic-small').find('ul').css('left', yd - 54 + 'px');
    })
    $('.pic-btn-l').click(function (param) {
        let yd = $('.pic-small').find('ul')[0].offsetLeft;
        $('.pic-small').find('ul').css('left', yd + 54 + 'px');

    })
    //列表页数据
    var str = decodeURI(window.location.search.slice(1));
    // console.log(str);

    function f1(zfc) {
        //准备容器
        var o = {};
        //根据& 把字符串切割成数组
        var arr = zfc.split('&');
        //遍历数组  把数组的每一个元素根据 = 切割成新数组
        arr.forEach(function (ele) {
            var arr1 = ele.split('=');
            //取出数组中的每个元素 存入容器
            var kay = arr1[0];
            var val = arr1[1];
            o[kay] = val;
        });
        //返回数据
        return o;
    };
    var data = f1(str);
    $('.price')[0].innerText += data.title;
    $('.j-bpic-b')[0].src = data.src;
    $('.tupianl')[0].src = data.src;
    $('.tupic')[0].src = data.src;
    $('.hgroup').find('h1')[0].innerText = data.price;
    $('#service_bable').find('a')[0].innerText = data.name;
    //提取字符串中的数字
    var num = data.pinglun.replace(/[^0-9]/ig, "");
    $('#pincnt')[0].innerText = num;
    // console.log(data);



})