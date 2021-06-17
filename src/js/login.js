require('../css/login.less');

document.ready(function () {
    //点击账号注册实现页面跳转
    let pawDl = document.querySelector('.pawDl')
    pawDl.addEventListener('click', function (ev) {
        location.href = './index.html'
    })
    //获取dom
    let accountInp = document.querySelector('.accountInp');
    let pawInp = document.querySelector('.pawInp');
    let btn = document.querySelector('.btn');
    console.log(btn);

    //事件监听
    btn.addEventListener('click', function () {
        btn.addEventListener('click', function (ev) {
            let data = {
                account: accountInp.value,
                password: pawInp.value
                
            }
            $http.post('/users/login', data, function (res) {
                console.log(res);
                if (res.status === 0) {
                    // alert('登录成功');
                    utils.toast(1, '登录成功')
                    //数据存到本地存储
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    //跳转页面
                    setTimeout(function () {
                        location.href = './homePage.html'
                    }, 1000)
                } else {
                    utils.toast(0, '用户密码错误，请重新登录')
                }
            })
        })
    })

    // //账号事件监听
    // accountInp.addEventListener('blur', function () {
    //     let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    //     console.log(accountInp.value);
    //     if (!reg.test(accountInp.value)) {
    //         utils.toast()
    //     }
    // })
    // pawInp.addEventListener('blur', function () {
    //     // (以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
    //     let reg = /^[a-zA-Z]\w{5,17}$/
    //     if (!reg.test(pawInp.value)) {
    //         utils.toast()
    //     }
    // })
})