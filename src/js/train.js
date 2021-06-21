require('../css/train.less');
document.ready(function () {
    utils.addFooter('train')
    let baseUrl = 'http://139.9.177.51:8099'
    let user = JSON.parse(localStorage.getItem('user'))
    // console.log(user);
    let userId = user.userId
    // console.log(userId);
    let courseBoxDom = document.querySelector('.courseBox')
    let trainBoxDom = document.querySelector('.pjlBox')

    function getCourse() {
        $http.get('/sports/courseList?id=' + userId, function (res) {
            // console.log(res);
            let newCourse = res.data.find(function (item) {
                // console.log(item);
                return item.latest == 1
            })
            console.log(newCourse);
            let newHtml = `
            <a href='./kcxl.html?id=${newCourse.courseId}'>
              <div class="curriculum mt8 bru15">
                <img src="${baseUrl+newCourse.imgurl}" alt="">
                <div class="text">
                    <span class="fs16">${newCourse.name}</span>
                    <p class="fs12">${newCourse.desc}</p>
                </div>
            </div>
            </a>
              
                `
            courseBoxDom.innerHTML = newHtml

            res.data.forEach(function (item) {
                let listHtml = `
                <a href='./kcxl.html?id=${item.courseId}'>
                   <div class="listBox">
                <img src="${baseUrl+item.imgurl}" alt="">
                <p class="textBox">${item.name}</p>
                <p class="textBox_1">${item.desc}</p>
                </div>
                </a>
                  `
                trainBoxDom.innerHTML += listHtml
            })



        })



    }
    getCourse()
})