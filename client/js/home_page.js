$(() => {
    class Rotation {
        constructor(data) {
            this.data = data
            this.index = 0;
        }
        init() {
            this.Rotation_chart();
            this.move();
            this.timer;
            this.timers();
            this.Click();
        }
        Rotation_chart() {
            // 轮播图图片
            let htmlA = this.data.map((param, index) => `<li class="${index == 0 ? 'block' : ''}"><a href="###"><img src="${param.src}" alt=""></a></li>`).join('')
            let main_pic = $(`<div class="focus"><ul class="focus_box">${htmlA}<ul></div>`)
            $('#gm_main').append(main_pic);
            // 小按钮         
            let htmlB = this.data.map((param, index) => `<li class="${index == 0 ? 'cur' : ''}"><a href="###"></a></li>`).join('')
            let ol = $(`<ol class="nav edit-mode ccccc">${htmlB}</ol>`);
            $('#gm_main').find('.focus').append(ol);
            //左右切换按钮
            let div = $(`<div class="slider-extra">
            <div class="btn pre"><span class="btnbg"></span><p class="go_l" id="go_l"></p></div>
            <div class="btn nex"><span class="btnbg"></span><p class="go_r" id="go_r"></p></div>
            </div>`)
            $('#gm_main').find('.focus').append(div);
        }
        move() {

            let lenght = Array.from(this.data).length;
            //自动轮播
            this.timer = setInterval(() => {
                this.index++;
                if (this.index == lenght) {
                    this.index = 0;
                }
                if (this.index < 0) {
                    this.index = lenght - 1;
                }
                $('.focus_box').find('li').eq(this.index).addClass('block').siblings().removeClass('block')
                $('.ccccc').find('li').eq(this.index).addClass('cur').siblings().removeClass('cur')
            }, 2000)
        }
        //鼠标移入暂停
        timers() {
            $('.focus').mouseenter(() => clearInterval(this.timer));
            $('.focus').mouseleave(() => this.move());
        }
        //点击切换
        Click() {
            let xb = this;
            $('.ccccc').on('mouseenter', 'li', function () {
                xb.index = $(this).index();
                $('.focus_box').find('li').eq(xb.index).addClass('block').siblings().removeClass('block')
                $('.ccccc').find('li').eq(xb.index).addClass('cur').siblings().removeClass('cur')
            })
            //左右切换
            $('#go_l').click(function (param) {
                xb.index--;
                if (xb.index < 0) {
                    xb.index = Array.from(xb.data).length - 1;
                }
                $('.focus_box').find('li').eq(xb.index).addClass('block').siblings().removeClass('block')
                $('.ccccc').find('li').eq(xb.index).addClass('cur').siblings().removeClass('cur')
            })
            $('#go_r').click(function (param) {
                xb.index++;
                if (xb.index == Array.from(xb.data).length) {
                    xb.index = 0;
                }
                $('.focus_box').find('li').eq(xb.index).addClass('block').siblings().removeClass('block')
                $('.ccccc').find('li').eq(xb.index).addClass('cur').siblings().removeClass('cur')
            })
            $('#keyLabel').click(function (param) {
                $(this).css('display', 'none')
            })
            $('#searchInput').blur(function (param) {
                $('#keyLabel').css('display', 'block')
            })
        }
    }
    let item = new Rotation(picdata);
    item.init();
})