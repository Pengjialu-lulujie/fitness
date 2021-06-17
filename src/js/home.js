// const jquery = require('jquery')

/*导入home页面的css */
require('../css/home.less');

document.ready(function () {
    //获取dom
    let timeNum = document.querySelector('.times span');
    let timeBtn = document.querySelector('.time-btn');
    // 倒计时 自动跳转
    //间隔1s
    let timer = setInterval(function () {
        //将获取时间
        if (parseInt(timeNum.textContent) === 0) {
            clearInterval(timer);
            location.href = './index.html'
        } else {
            let num = parseInt(timeNum.textContent) - 1
            timeNum.textContent = num
        }
    }, 1000)
    timeBtn.addEventListener('click', function () {
        location.href = './index.html'
    })
})