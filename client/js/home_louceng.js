$(() => {
    class louceng {
        constructor(data) {
            this.data = data;
        }
        init() {
            this.biaoqian();
            this.jiaohu();
        }
        biaoqian() {
            let top = Array.from(this.data).map(function (param) {
                //头部
                let htmlA = param.tab.map(function (param, index) {
                    return `<li class="${index == 0 ? 'cur' : ''}"><a href="">${param}</a></li>`
                }).join('')
                //手机充值电器城
                let htmlB = param.a1.map(function (param) {
                    return `<a href="">${param}</a>`
                }).join('')
                //ul
                let htmlC = param.ul1.map(function (param) {
                    return `<li><a href="">${param}</a></li>`
                }).join('')
                let htmlD = param.ul2.map(function (param) {
                    return `<li><a href="">${param}</a></li>`
                }).join('')
                let htmlF = param.ul3.map(function (param) {
                    return `<li><a href="">${param}</a></li>`
                }).join('')
                let htmlG = param.centsrc.map(function (param, index) {
                    return `<li class="${index == 0 ? 'chuxian' : ''}"><a href=""><img src="${param}" alt=""></a></li>`
                }).join('')
                //右边列表
                let htmlH = param.rigpic.map(function (param) {
                    return `<li><a href=""><img src="${param}" alt=""></a></li>`
                }).join('')
                //五个列表
                let htmlI = param.listpic.map(function (param) {
                    let htmlJ = param.listarr.map(function (param) {
                        return `<li><a href=""><img src="${param}" alt=""></a></li>`
                    }).join('')
                    return `<div class="main"><ul class="main_inner">${htmlJ}</ul></div>`
                }).join('')
                return `<div class="floor wbox edit-mode floor-current">
            <div class="ct temp0">
            <div class="mt">
            <div class="mtTop"><span class="h2_text">${param.louceng}</span></div>
            <div class="tab">${htmlA}</div>
            </div>
            <div class="mc">
             <div class="mc_l"><a href="" class="mc_l_img edit-mode"><img src="${param.src1}" alt=""></a>
             <div class="keyAll">
             <div class="channelbg"><div class="channel"><ul class="channel_inner">
             <li class="edit-mode">${htmlB}</li>
             </ul></div></div>
             <div class="keywords edit-mode"><ul class="w55">${htmlC}</ul>
             <ul class="w43">${htmlD}</ul><ul class="w62">${htmlF}</ul></div>
             </div></div> 
             <div class="main_warp"><div class="main ccccc">
                <div class="mc_c "><ul class="slider edit-mode">${htmlG}</ul></div>
                <div class="mc_r"><ul class="mc_r_inner edit-mode">${htmlH}</ul></div>
                </div>${htmlI}
             </div>
            </div>

            </div>
            </div>`
            }).join('')
            // console.log(top);
            $('.lazy-fn-wrap').append(top);
        }
        jiaohu() {
            $('.clearfix ').on('mouseenter', '.floor-current', function (param) {
                let xb = this;
                $(this).find('.tab').on('mouseenter', 'li', function (param) {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $(xb).find('.main').eq($(this).index()).addClass('ccccc').siblings().removeClass('ccccc');
                })

            })
        }
    }
    let loucengs = new louceng(loucengdata)
    loucengs.init();
})