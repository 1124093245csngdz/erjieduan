$(() => {
    loadCart();

    function loadCart() {
        // $(".cartBox").remove();
        $.ajax({ //获取商品数据
            data: { type: "get", id: localStorage.userId },
            url: "../../server1/gouwuche.php",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $(res.data).each((index, ele) => {
                    renderUI(ele);
                    // console.log(ele);

                })
            }
        });
    }

    function renderUI(data) {
        let tmp = data.goods.map(item => {
            return `
            <ul class="order_lists order_item" gid=${item.good_id}>
                <li class="list_chk">
                  <input type="checkbox" id="checkbox_${item.good_id}" class="son_check">
                  <label for="checkbox_${item.good_id}"></label>
                </li>
                <li class="list_con">
                  <div class="list_img"><a href="./detail.html?product/${item.good_id}"><img src=${item.src} alt=""></a></div>
                  <div class="list_text"><a href="./detail.html?product/${item.good_id}">${item.title}</a></div>
                </li>
                <li class="list_price">
                  <p class="price">￥${item.price}</p>
                </li>
                <li class="list_amount">
                  <div class="amount_box">
                    <a href="javascript:;" class="reduce">-</a>
                    <input type="text" value="${item.num}" class="sum">
                    <a href="javascript:;" class="plus">+</a>
                  </div>
                </li>
                <li class="list_sum">
                  <p class="sum_price" data-price=${item.price}>￥${Math.round(item.price * item.num * 100) / 100}</p>
                </li>
                <li class="list_op">
                  <p class="del"><a href="" class="delBtn">移除商品</a></p>
                </li>
              </ul>`
        }).join('');
        let html = `
                <div class="cartBox">
                  <div class="shop_info">
                    <div class="all_check">
                      <input type="checkbox" id="shop_a" class="shopChoice">
                      <label for="shop_a" class="shop"></label>
                    </div>
                    <div class="shop_name">
                      店铺：<a href="">${data.store}</a>
                    </div>
                  </div>
                  <div class="order_content">${tmp}</div>
                </div>`;
        $(html).insertAfter('.cartMain_hd');
    }
    //
    $("body").on("click", "#all", function () {
        // $(this).next("label").toggleClass("mark");
        /* 设置页面中所有的复选框都选中 */
        $("body").find("input[type=checkbox]").next("label").toggleClass("mark");
        // console.log($("body").find("input[type=checkbox]").next("label").toggleClass("mark"));

    })

    $("body").on("click", ".plus,.reduce", function () {
        /* 更改数量|发送网络请求 */
        let count;
        if (this.className == "plus") {
            count = $(this).prev().val() * 1 + 1;
            $(this).prev().val(count);
        } else {
            count = $(this).next().val() * 1 - 1;
            $(this).next().val(count);
        }

        let price = $(this).parents(".order_item").find(".sum_price").data().price;
        console.log(price);

        $(this).parents(".order_item").find(".sum_price").text("￥" + price * count);

        let gid = $(this).parents(".order_item").attr("gid");
        updateCartData(this.className, gid, localStorage.id);
        totalMoney();
    });

    function updateCartData(flag, good_id, id) {
        $.ajax({
            url: "../../server1/gouwuche.php",
            data: {
                type: "update",
                flag,
                id,
                good_id
            }
        });
    }

    //删除
    /* 删除功能 */
    $("body").on("click", ".delBtn", function () {
        let good_id = $(this).parents(".order_item").attr("gid");
        $.ajax({
            url: "../../server1/gouwuche.php",
            data: { type: "del", good_id, id: localStorage.userId },
            dataType: "json",
            success: function (response) {
                console.log(response);
                loadCart();
            }
        });
    })

    //总价
    function totalMoney() {
        // console.log("计算总价");

        let total_count = 0;
        let total_price = 0;

        $(".order_item").each((index, ele) => {
            // console.log($(ele).find("input[type='checkbox']").next().hasClass("mark"));
            if ($(ele).find("input[type='checkbox']").next().hasClass("mark")) {
                let count = $(ele).find(".sum").val() * 1;
                let price = $(ele).find(".sum_price").text().substr(1) * 1;

                total_count += count;
                total_price += count * price;
            }

        });

        $(".piece_num").text(total_count);
        $(".total_text").text("￥" + total_price.toFixed(2));
    };
})