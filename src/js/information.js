require('../css/information.less');
document.ready(function () {

    // let userInfo = document.querySelector('.userInfo');
    // let user = JSON.parse(localStorage.getItem('user'))
    // console.log(user);

    let genderDom = document.querySelector('#gender');
    let genderText = document.querySelector('#genderText')
    let birthdayDom = document.querySelector('#birthday');
    let dataText = document.querySelector('#dataText');
    let provinceDom = document.querySelector('#province');
    let provinceText = document.querySelector('#provinceText');
    let cityDom = document.querySelector('#city');
    let cityText = document.querySelector('#cityText');
    let arrow1Dom = document.querySelector('.arrow1');
    let weuiTextareaInp = document.querySelector('.weui-textarea');
    //昵称input框
    let weuiInputDom = document.querySelector('.weui-input');
    let keepBtn = document.querySelector('.keep');
    // let dataTextDom = document.querySelector('#dataText')


    let user = JSON.parse(localStorage.getItem('user'))
    let userData = null
    $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
        userData = res.data
        // console.log(userData);
        weuiInputDom.value = userData.nickname;
        weuiTextareaInp.value = userData.sign;
        genderText.value = userData.gender;
        dataText.textContent = userData.birthday;
        provinceText.textContent = userData.address.split(",")[0];
        cityText.textContent = userData.address.split(",")[1];
    })
    // $http.get('/users/accountinfo?userId=' + user.userId, function (ev) {
    //     console.log(ev);
    //     userInfo.textContent = ev.data.nickname
    // })
    //全局默认数据
    //地区
    // let data = {
    //     nickname: '',
    //     gender: '',
    //     birthday: '',
    //     pro: '',
    //     city: '',
    //     sign: weuiTextareaInp.value
    // }

    //选择男女
    genderDom.addEventListener('click', function (ev) {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                // console.log(result);
                genderText.textContent = result[0].label
                // console.log(result[0].label);
                // console.log(result);
                data.gender = result[0].label
                // console.log(data);
                // data.gender = genderText.textContent
                // console.log(data.gender);
            },
            title: '性别选择'
        });
    })
    //选择日期
    birthdayDom.addEventListener('click', function () {
        weui.datePicker({
            start: 1900,
            end: new Date().getFullYear(),
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                dataText.textContent = result[0].value + '-' + result[1].value + '-' + result[2].value
                data.birthday = dataText.textContent
                // console.log(dataText.textContent);
            },
            title: '多列选择器'
        });
    })
    //选择省份
    provinceDom.addEventListener('click', function (ev) {
        $http.get('/address/province', function (res) {
            // console.log(res);
            let arr = res.data
            // console.log(res.data);
            let arr1 = arr.map(function (item) {
                // console.log(item);
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            // console.log(arr1);
            weui.picker(arr1, {
                onConfirm: function (result) {
                    data.city = ''
                    cityText.textContent = ''


                    // console.log(result);
                    provinceText.textContent = result[0].label
                    // console.log(result[0].label);
                    // console.log(result);
                    data.pro = result[0]
                    // console.log(data.pro);
                },
                title: '选择省份'
            });
        })
    })
    //选择城市
    cityDom.addEventListener('click', function (ev) {
        if (data.pro == '') {
            utils.toast(0, '请选选择省份');
            // return;
        }
        $http.get('/address/city/' + data.pro.value, function (res) {
            // console.log(res);
            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr, {
                onConfirm: function (result) {
                    // console.log(result);
                    cityText.textContent = result[0].label
                    // console.log(result[0].label);
                    // console.log(result);
                    data.city = result[0]
                    // console.log(data.city);
                },
                title: '选择城市'
            });
        })
    })

    arrow1Dom.addEventListener('click', function () {
        location.href = './userInfo.html'
    })



    function getUserInfo() {
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
            // console.log(res);
            if (res.status == 0) {
                if (res.data.nickname) {
                    //渲染页面input框
                    weuiInputDom.value = res.data.nickname
                    //渲染全局默认数据
                    data.nickname = res.data.nickname
                }
                if (res.data.gender) {
                    genderText.textContent = res.data.gender
                    data.gender = res.data.gender
                }
                if (res.data.birthday) {
                    birthdayDom.textContent = res.data.birthday
                    data.birthday = res.data.birthday
                }
            }
        })
    }
    getUserInfo()
    // console.log(data);
    let data = {
        nickname: '',
        gender: genderText.value,
        birthday: dataText.textContent,
        address: null,
        sign: weuiTextareaInp.value,
        userId: user.userId
    }
    console.log(data);
    keepBtn.addEventListener('click', function (ev) {
        data.nickname = weuiInputDom.value
        data.gender = genderText.value
        data.birthday = dataText.textContent
        data.sign = weuiTextareaInp.value
        data.address = [provinceText.textContent, cityText.textContent]


        // let xxx = JSON.stringify(localStorage.setItem('user',data))
        // console.log(xxx);
        // let a = {
        //     imgurl: "",
        //     nickname: weuiInputDom.value,
        //     gender: "女",
        //     birthday: new Date(),
        //     address: ["重庆", "渝北区"],
        //     sign: "我是露露姐111",
        //     userId: 1522
        // }
        $http.post("/users/userEdit", data, function (res) {
            console.log(res);
        })


    })




})
// console.log(weui);