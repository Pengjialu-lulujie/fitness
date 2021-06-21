require('../css/userInfo.less');
document.ready(function () {
    //页脚
    utils.addFooter('userInfo')

    let baseUrl = 'http://139.9.177.51:8099' // 接口请求的 URL
    //获取dom
    let mcDom = document.querySelector('#mc');
    //退出登录按钮
    let logOutDom = document.querySelector('.logOut');
    //取消按钮
    let cancelDom = document.querySelector('#cancel');
    //确认按钮
    let confirmDom = document.querySelector('#confirm');
    //总运动数据dom
    let sportsDataDom = document.querySelector('#sportsData');
    //总消耗数据dom
    let consumeDataDom = document.querySelector('#consumeData');
    //获取用户名
    let uesrNameDom = document.querySelector('.uesrName');
    //获取img
    let imgBoxDom = document.querySelector('.imgBox')
    //获取个性签名
    let autographDom = document.querySelector('.autograph');
    //获取input框
    let fileBtnDom = document.querySelector('.fileBtn');
    //头像框
    let headerIconDom = document.querySelector('.headerIcon')
    //点击事件监听
    //退出登录按钮监听
    logOutDom.addEventListener('click', function () {
        //点击退出登录按钮后mc显示
        mcDom.style.display = 'block';
    })
    //监听取消按钮
    cancelDom.addEventListener('click', function () {
        //点击取消按钮mc隐藏
        mcDom.style.display = 'none';
    })
    //监听确认按钮
    confirmDom.addEventListener('click', function () {
        //点击确认按钮清除本地数据并跳转登录页面
        localStorage.clear();
        location.href = './login.html';
    })
    // let user = localStorage.getItem('user')
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    //请求用户基本数据
    function getUserInfo() {
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
            // console.log(res);
            //判断请求成功---通过状态码查询
            if (res.status == 0) {
                //判断后台是否有值，有值就给页面渲染后台数据，没值就显示页面的默认数据
                if (res.data.account) {
                    uesrNameDom.textContent = res.data.nickname
                }
                if (res.data.sign) {
                    autographDom.textContent = res.data.sign
                }
                if (res.data.imgurl) {
                    imgBoxDom.textContent = res.data.imgurl
                }

            }
        })
    }
    getUserInfo()
    //请求运动数据
    function getSportsData() {
        $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
            console.log(res);
            if (res.status == 0) {
                if (res.data.sports.times) {
                    sportsDataDom.textContent = res.data.sports.times
                }
                if (res.data.sports.calorie) {
                    consumeDataDom.textContent = res.data.sports.calorie
                }
            }
        })
    }
    getSportsData()

    //监听input  file事件
    function changeHeadImg() {
        fileBtnDom.addEventListener('change', function (ev) {
            // console.log(this.files[0]);
            $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
                console.log(res);
                if (res.status == 0) {
                    imgBoxDom.src = baseUrl + res.data
                }
            })
        })
    }
    changeHeadImg()
    imgBoxDom.addEventListener('click', function (ev) {
        fileBtnDom.click()
        ev.stopPropagation()
    })

    //监听input的change事件
    // fileBtnDom.addEventListener('change', function (ev) {
    //     //获取文件流
    //     // console.log(fileBtnDom.file[0]);
    //     // console.log(this.files[0]);
    //     $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
    //         //判断上传成功重新渲染头像
    //         console.log(res);
    //         if (res.status == 0) {

    //             imgBoxDom.src = baseUrl + res.data
    //             let data = {
    //                 userId: user.userId,
    //                 imgurl: baseUrl + res.data
    //             }
    //             changeHead(data)
    //         }
    //     })
    // })
    // //点击头像更换图片
    // imgBoxDom.addEventListener('click', function (ev) {
    //     fileBtnDom.click()
    //     //阻止默认
    //     ev.stopPropagation()
    // })



    //监听点击头像跳转
    headerIconDom.addEventListener('click', function (ev) {
        location.href = './information.html'
    })


    function changeHead(data) {
        $http.post('/users/userEdit', data, function (res) {
            // console.log(res);
            // imgBoxDom.src = BASE_URL + res.data
            console.log(res);
            imgBoxDom.src = data.imgurl;
            utils.toast(1, '上传成功')
        })
    }

})