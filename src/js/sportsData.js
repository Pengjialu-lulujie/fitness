require('../css/sportsData.less');
const echarts = require('echarts');
document.ready(function () {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    let data = [{
        Date: '11-15',
        time: 20
    }, {
        Date: '11-16',
        time: 40
    }, {
        Date: '11-17',
        time: 60
    }, {
        Date: '11-18',
        time: 80
    }, {
        Date: '11-19',
        time: 100
    }, {
        Date: '11-20',
        time: 120
    }, {
        Date: '11-21',
        time: 160
    }]
    let xArr = [];
    let yArr = [];
    data.forEach(function (item) {
        xArr.push(item.Date);
        yArr.push(item.time)
    })
    let option = {
        title: {
            text: '近七天数据'
        },
        xAxis: {
            type: 'category',
            data: xArr
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: yArr,
            type: 'bar'
        }]
    };

    option && myChart.setOption(option);




    //饼图
    var pieDom = document.getElementById('pieChart');
    var myChart = echarts.init(pieDom);

    let pirOption = {
        title: {
            text: '运动分类',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [{
                    value: 1048,
                    name: '跑步'
                },
                {
                    value: 735,
                    name: '骑行'
                },
                {
                    value: 580,
                    name: '训练'
                },

            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    option && myChart.setOption(pirOption);




    //渲染数据板块
    //获取dom
    let arrowReturnDom = document.querySelector('.arrowReturn');
    let sportsDataDOM = document.querySelector('#sportsData');
    let consumeDataDom = document.querySelector('#consumeData');
    let conDaDom = document.querySelector('#conDa');
    let numDom = document.querySelector('#num');

    //点击事件 ---跳转页面
    arrowReturnDom.addEventListener('click', function (ev) {
        location.href = './userInfo.html';
    })

    //获取user
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);
    //ajax请求
    $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
        console.log(res);
        if (res.status == 0) {
            if (res.data.sports.times) {
                sportsDataDOM.textContent = res.data.sports.times;
            }
            if (res.data.sports.calorie) {
                consumeDataDom.textContent = res.data.sports.calorie;
                conDaDom.textContent = res.data.sports.calorie;
            }
            if (res.data.sports.punchin) {
                numDom.textContent = res.data.sports.punchin;
            }
        }
    })







})