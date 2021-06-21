require('../css/courseTraining.less');
document.ready(function () {
    let videoList = JSON.parse(localStorage.getItem('videoList'));
    console.log(videoList);
    const BASE_URL = 'http://139.9.177.51:8099';
    //获取dom
    let picDom = document.querySelector('.pic'); //video
    let currentDom = document.querySelector('.current'); //数字上一个
    let allDom = document.querySelector('.all'); //数字下一个
    let courseNameDom = document.querySelector('.courseName'); //标题
    let preDom = document.querySelector('.pre');
    let nextDom = document.querySelector('.next');
    let stopBtn = document.querySelector('.stop');
    let modalDom = document.querySelector('.modal');
    let continueBtn = document.querySelector('.continue');
    let endBtn = document.querySelector('.end');
    let progressDom = document.querySelector('.progress')

    //修改视频总数
    allDom.textContent = videoList.length;
    console.log(allDom.textContent);

    //当前播放的视频是第几个 ---数组索引
    let index = 0;

    //播放视频
    function play(index) {
        //更改video标签 src属性值
        picDom.src = BASE_URL + videoList[index].videoUrl;
        //更改当前播放的第几个
        currentDom.textContent = index + 1;
        //更换标题
        courseNameDom.textContent = videoList[index].title;
    }
    play(index)

    //上一节视频
    preDom.addEventListener('click', function (ev) {
        //索引不等于0，进行却换
        if (index != 0) {
            index--
            play(index)
        }
    })
    //下一节视频
    nextDom.addEventListener('click', function (ev) {
        //如果索引没有到video的最后一个，进行切换
        if (index < videoList.length - 1) {
            index++
            play(index)
        }
    })
    //视频自动播放下一节
    picDom.addEventListener('ended', function (ev) {
        //如果索引没有到video的最后一个，进行切换
        if (index < videoList.length - 1) {
            index++
            play(index)
        }
    })

    //进度条
    //进度条宽度=(当前播放时间/总时间)*100%
    setInterval(function () {
        //当前播放时间 currentTime   总时间 duration
        let proWidth = (picDom.currentTime / picDom.duration) * 100
        proWidth = proWidth + '%'
        progressDom.style.width = proWidth
    }, 60)



    //暂停按钮
    stopBtn.addEventListener('click', function (ev) {
        //停止视频播放
        picDom.pause()
        //蒙层显示
        modalDom.style.display = 'block';
    })
    //取消按钮
    endBtn.addEventListener('click', function (ev) {
        //跳转页面---列表页
        location.href = './train.html';
    })
    //继续播放按钮
    continueBtn.addEventListener('click', function (ev) {
        //视频继续播放
        picDom.play()
        //蒙层隐藏
        modalDom.style.display = 'none';
    })
})