require('../css/kcxl.less');



document.ready(function () {
    const BASE_URL = 'http://139.9.177.51:8099';
    //抓取http数据
    let dataStr = location.search;
    //通过utils转换截取数据
    let obj = utils.srtToObj(dataStr);
    console.log(obj);
    //获取dom
    let imgBox = document.querySelector('.img-box img');
    let title = document.querySelector('.title');
    //开始按钮
    let startBtn = document.querySelector('.start');
    //千卡数
    let kilocNumDom = document.querySelector('.kilocNum');
    //分钟数
    let mintimeDom = document.querySelector('.mintime');
    //用户名
    let userNameDom = document.querySelector('.userName');
    //关注按钮
    let followBtn = document.querySelector('.follow');
    //文字
    let textDom = document.querySelector('.text')



    //全局变量
    let data = null;

    function getCourseInfo() {
        $http.get('/sports/courseDetail?id=' + obj.id, function (res) {
            //渲染页面
            data = res.data;
            title.textContent = res.data.name;
            imgBox.src = BASE_URL + res.data.imgurl;
        })
    }
    getCourseInfo()

    imgBox.addEventListener('click', function (ev) {
        console.log(data);
        localStorage.setItem('videoList', JSON.stringify(data.fragments))
        location.href = './courseTraining.html'
    })
    //点击开始训练按钮跳转页面
    startBtn.addEventListener('click', function (ev) {
        location.href = './courseTraining.html'
    })

    let user = JSON.parse(localStorage.getItem('user'))
    $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
        console.log(res);
        if (res.status == 0) {
            if (res.data.sports.calorie) {
                kilocNumDom.textContent = res.data.sports.calorie;
            }
            if (res.data.sports.times) {
                mintimeDom.textContent = res.data.sports.times;
            }
            if (res.data.sports.account) {
                userNameDom.textContent = res.data.sports.account;
            }
            if (res.data.sports.describe) {
                userNameDom.textContent = res.data.sports.describe;
            }
            if (res.data.sports.describe) {
                textDom.textContent = res.data.sports.describe;
            }
        }

    })



})