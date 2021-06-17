require('../css/userInfo.less');
document.ready(function () {
    utils.addFooter('userInfo')

    //获取dom
    let mcDom = document.querySelector('#mc');
    let logOutDom = document.querySelector('.logOut');
    let cancelDom = document.querySelector('#cancel');
    let confirmDom = document.querySelector('#confirm');
    //点击事件监听
    logOutDom.addEventListener('click', function () {
        mcDom.style.display = 'block';
    })
    cancelDom.addEventListener('click', function () {
        mcDom.style.display = 'none';
    })
    confirmDom.addEventListener('click', function () {
        localStorage.clear();
        location.href = './login.html';
    })

})