/**
 * 工具函数
 */


/**
 * @toast  页面的提示弹窗
 * @status number  0:失败 1：成功
 * @text   string  提示信息
 * @timer   Number  S
 * @page string 传输的页面
 */
const utils = {
    //页脚
    addFooter: function (page) {
        let footer = document.createElement('div');
        let body = document.querySelector('body');
        footer.className = 'footer dpflex '
        let html = `
        <a href='./homePage.html'>
        <div class='${page==='homePage'?'active nav':'nav'}'>
        <div><i class="iconfont iconhome"></i></div>
        <p>首页</p>
       </div>
        </a>
        <a href='./train.html'>
        <div class='${page==='train'?'active nav':'nav'}'>
        <div><i class="iconfont iconsports"></i></div>
        <p>运动</p>
       </div>       
        </a>

        <a href='./userInfo.html'>
        <div class='${page==='userInfo'?'active nav':'nav'}'>
        <div><i class="iconfont iconmine"></i></div>
        <p>我的</p>
       </div>
       </a>
      
        `
        footer.innerHTML = html;
        body.appendChild(footer)
    },


    toast: function (status, text, timer = 1) {
        let toast = document.createElement('div')
        toast.className = 'toast'
        let html = `
         <div class="icon" >
               ${status === 0 ? '!' : '√'}
        </div>
        <div class="toast-text">
           ${text}
        </div>
        `
        toast.innerHTML = html;
        document.querySelector('body').appendChild(toast);
        // 定时删除自己
        setTimeout(function () {
            toast.remove();
        }, timer * 1000)
    }





}
/**
 *@strToObj  将url上的数据转换为对象 
 *@str   String  字符串： ?name=zhangsan&id=555
 *@return  Object   {name:'zhangsan',id:555}
 */
utils.srtToObj = function (str) {
    let obj = {}
    str = str.substr(1); //name=zhangsan&id=555
    let strArr = str.split('&'); // ['name=zhangsan','id=555'] 
    strArr.forEach(function (item) {
        let arr = item.split('='); // ['name','zhangsan']  ['id','555']
        obj[arr[0]] = arr[1];
    })
    return obj;
}

/**@addZero 添0补齐
 * @num 数值
 * @return
 */
utils.addZero = function (num) {
    let str = num;
    if (num < 10) {
        str = '0' + str
    }
    return str;
}




window.utils = utils