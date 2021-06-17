require('../css/homePage.less');

document.ready(function () {
    //调用生成底部导航
    utils.addFooter('homePage')

    //获取dom
    let rankDom = document.querySelector('#rank');
    let punchInDom = document.querySelector('#punchIn');
    let insigniaNumDom = document.querySelector('#insigniaNum')
    let dayClockBtn = document.querySelector('.dayClock')

    // sessionStorage.getItem("user")  这样就得到userId了
    //请求ajax----首页默认数据
    let user = JSON.parse(localStorage.getItem('user'))
    // console.log(user);

    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // autoplay: true,
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

    })

    // console.log(Swiper);

    function getHomePageInfo() {
        $http.get('/headPageInfo?userId=' + user.userId, function (res) {
            console.log(res);
            //判断是否拿到数据
            rankDom.textContent = res.data.rank;
            punchInDom.textContent = res.data.punchIn;
            insigniaNumDom.textContent = res.data.insigniaNum;

            // 判断打卡按钮显示或隐藏
            // 已经打卡
            if (res.data.isPunch === "true") {
                console.log(res.data.isPunch);
                dayClockBtn.style.display = 'none'
            } else {
                dayClockBtn.style.display = 'block'
            }
        })
    }
    getHomePageInfo()

    // 打卡按钮事件监听
    dayClockBtn.addEventListener('click', function () {
        //请求后端打卡接口
        $http.get("/clockIn?userId=" + user.userId, function (res) {
            if (res.status === 0) {
                console.log(res.status);
                utils.toast(1, '打卡成功');
                //打卡成功之后 重新拉取首页数据 重新渲染首页的所有数据
                getHomePageInfo()
            } else if (res.status === 1) {
                utils.toast(0, res.msg)
                // getHomePageInfo()

                // console.log(res.msg);
            }
        })
    })





})