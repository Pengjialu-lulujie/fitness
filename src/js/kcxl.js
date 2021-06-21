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






})