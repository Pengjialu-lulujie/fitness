/**
 * 工具函数
 */


/**
 * @toast  页面的提示弹窗
 * @status number  0:失败 1：成功
 * @text   string  提示信息
 * @timer   Number  S
 */
const utils = {
    toast: function (status, timer, text) {
        let toast = document.createElement('div')
        toast.className = 'toast'
        let html = `
         <div class=" icon" >
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
window.utils = utils