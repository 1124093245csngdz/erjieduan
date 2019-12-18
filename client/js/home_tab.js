$(() => {
    class Tab {
        constructor(data, datas) {
            this.data = data;
            this.datas = datas;
        }
        init() {
            this.lefttab();
            this.rigtab();
        }
        lefttab() {
            //ul
            let htmlB = this.data.map(function (param, index) {
                let htmlA = param.map(function (param) {
                    return ` <a href="">${param.innerText}</a>`
                }).join('')
                return ` <li class="edit-mode nav-item ${index == 0 ? 'first' : ''}"><h3>${htmlA}</h3></li>`
            }).join('')
            let ul = $(`<ul class="lisnav-ul">${htmlB}</ul>`);
            $('#navBox').append(ul);

            //鼠标事件
            $('.lisnav-ul').on('mouseenter', 'li', function (param) {
                $('#navBox').css('width', '1200px');
                $(this).css('background', '#fff').siblings().css('background', 'none');
                $(this).find('a').css('color', '#000');
                $(this).siblings().find('a').css('color', '#fff');
                $('#subnav').css('display', 'block');
                $('.fullcategory').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
            })
            $('#navBox').mouseleave(function (param) {
                $('.nav-item').css('background', 'none');
                $('.nav-item').find('a').css('color', '#fff');
                $('#subnav').css('display', 'none');
                $(this).css('width', '200px');
            })
            $('.lisnav-ul').find('a').mouseenter(function (param) {
                $(this).css('color', 'red');
            })
            $('.lisnav-ul').find('a').mouseleave(function (param) {
                $(this).css('color', '#000');
            })
        }
        rigtab() {
            let htmlD = this.datas.map(function (param) {
                let html1 = param.redword.map(function (param) {
                    return `<a href="">${param}</a>`
                }).join('')
                let html2 = param.goodsTitle.map(function (param, index) {
                    let html3 = param.link.map(function (param) {
                        return `<a href="">${param}</a>`
                    }).join('');
                    return `<div class="fullcategory-content">
                    <ul class="fullcategory-list">
                    <div class="title">${param.listTitle}</div>
                    <div class="list">${html3}</div>
                    </ul>
                    </div>`
                }).join('')
                return `<div class="fullcategory">
                    <div class="fullcategory-left">
                    <div class="fullcategory-title">${html1}</div>
                    <div class="fullcategory-content-box">${html2}</div>
                    </div>
                    <div class="fullcategory-right"></div>
                </div>`
            }).join('')
            let oDiv = $(`<div class="subnav" id="subnav">
            <div class="loading1-sync" id="loading1-sync">${htmlD}</div>
            </div>`)
            $('#navBox').append(oDiv);

            //鼠标事件
            $('.fullcategory').find('a').mouseenter(function (param) {
                $(this).addClass('redcolo');
            })
            $('.fullcategory').find('a').mouseleave(function (param) {
                $(this).removeClass('redcolo');
            })
        }
    }
    let tabs = new Tab(xxkdata, xxkdatas);
    tabs.init();
})