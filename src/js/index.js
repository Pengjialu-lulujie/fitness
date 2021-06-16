require('../css/index.less')
document.ready(function () {
    let yzmText = '';
    //验证码
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha'), function (res) {
        yzmText = res;
        console.log(res);
    });

    //获取dom
    let telInp = document.querySelector('.telInp')
    let pawInp = document.querySelector('.pawInp')
    let conInp = document.querySelector('.conInp')
    let btn = document.querySelector('.btn')
    let yzmInp = document.querySelector('.yzmInp')
    let promptText = document.querySelector('.promptText')
    let jumpLoginDom = document.querySelector('.pawLog')
    //btn事件监听
    btn.addEventListener('click', function (ev) {
        if (telInp.value == '') {
            utils.toast(0, 1, '手机号格式错误');
            return;
        }
        if (pawInp.value == '') {
            utils.toast(0, 1, '密码格式错误');
            return
        }
        if (conInp.value != pawInp.value) {
            utils.toast(0, 1, '两次密码不一致');
            promptText.textContent = ''
            return
        }
        if (yzmInp.value.toLowerCase() != yzmText.toLowerCase()) {
            utils.toast(0, 1, '验证码错误');
            return;
        }


        let data = {
            account: telInp.value,
            password: pawInp.value

        };
        //请求注册接口
        $http.post('/users/add', data, function (res) {
            //判断请求是否成功
            if (res.status === 0) {
                //提醒用户  
                utils.toast(1, 1, '注册成功');
                //跳转登录页面
                setTimeout(function () {
                    location.href = './login.html';
                }, 1000)
            } else {
                utils.toast(0, 1, res.msg);
            }
        })
    })
    //点击跳转密码登录页面
    jumpLoginDom.addEventListener('click', function () {
        location.href = './login.html'
    })


    //电话事件监听
    telInp.addEventListener('blur', function () {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!reg.test(telInp.value)) {
            utils.toast()
        }
    })

    //密码事件监听
    pawInp.addEventListener('blur', function () {
        // (以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
        let reg = /^[a-zA-Z]\w{5,17}$/
        if (!reg.test(pawInp.value)) {
            utils.toast()
        }
    })















})