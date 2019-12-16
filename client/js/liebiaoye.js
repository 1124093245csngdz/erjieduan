$(() => {
    //进来就加载第一页的商品
    getDataWithPageCount(1);
    $.ajax({
        type: "get",
        url: "../../server/getPageCount.php",
        dataType: "json",
        success: function (response) {
            //取出页码
            let count = response.count;
            let html = "";
            for (let i = 0; i < count; i++) {
                html += `<a href="javascript:;" class=${i == 0 ? "active" : ""}>${i + 1}</a>`;
            }
            $("#page").html(html);
            //分页
            $("#page a").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                getDataWithPageCount($(this).index() + 1);
            })
        }
    });

    /* 发送网络请求获取服务器三十个商品数据 */
    function getDataWithPageCount(index) {
        $.ajax({
            type: "get",
            url: "../../server/getGoodData.php",
            data: "page=" + index,
            dataType: "json",
            success: function (data) {
                renderUI(data);
            }
        });
    }
    //排序
    function getDataWithPage(page, type) {
        $.ajax({
            type: "get",
            url: "../../server/paixu.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }
    //
    $(".filter-order-box > li").click(function (e) {
        getDataWithPage(1, $(this).index());
    })
    //渲染页面
    function renderUI(_data) {
        let htmlA = _data.map(function (ele) {
            return `<li class="product-item"><div class="item-tab-warp">
            <p class="item-pic"><a href=""><img src="${ele.src}" alt=""></a></p>
            <p class="item-price"><span class="price">${ele.price}</span></p>
            <p class="item-name"><a href="" class="item-link">${ele.title}</a></p>
            <p class="item-comment-dispatching"><a href="" class="comment">${ele.discuss}</a></p>
            <p class="item-shop"><a href="" class="nname">${ele.selle}</a></p>
            <p class="item-promotion"></p>
            <p class="item-option">
            <span class="add-contrast"><i class="icon"></i></span> 
            <span class="add-collection"><i class="icon"></i></span>
            <a href="" class="add-cart"><i class="icon"></i></a>
            <span class="online-server"><i class="icon"></i></span>       
            </p>
            </div></li>`
        }).join('');
        //大盒子
        $('.oDiv_ul').html(htmlA);
        Dynamic()
    }

    function Dynamic() {
        //鼠标滑过显示图标
        $('.product-item').mouseenter(function (param) {
            $(this).find('.item-option').css('visibility', 'visible')
        })
        $('.product-item').mouseleave(function (param) {
            $(this).find('.item-option').css('visibility', 'hidden')
        })
        //鼠标滑过筛选标签
        $('.filter-order-box').find('li').click(function (param) {
            $(this).addClass('cur').siblings().removeClass('cur');
        })
    }
})