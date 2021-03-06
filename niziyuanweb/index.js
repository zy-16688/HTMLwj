var canvas = document.querySelector("canvas");
canvas.style.background = "blue";
var g = canvas.getContext("2d");
//绘制转盘时钟
function drawArcClock() {
    g.clearRect(0, 0, 100, 100);
    var data = new Date();
    var sec = data.getSeconds();
    var min = data.getMinutes();
    var hour = data.getHours();
    g.save();
    g.translate(50, 50);
    g.rotate(-Math.PI / 2);
    //分钟刻度线
    for (var i = 0; i < 60; i++) {//画60个刻度线                   g.beginPath();                  
        g.strokeStyle = "white"; g.lineWidth = 1; g.moveTo(50, 0);
        g.lineTo(45, 0);
        g.stroke();
        g.rotate(Math.PI / 30); //每个6deg画一个时钟刻度线                   g.closePath();               }               //时钟刻度线
        for (var i = 0; i < 12; i++) {//画12个刻度线                   g.beginPath();                  
            g.strokeStyle = "white";
            g.lineWidth = 2;
            g.moveTo(50, 0);
            g.lineTo(40, 0);
            g.stroke();
            g.rotate(Math.PI / 6); //每个30deg画一个时钟刻度线                   g.closePath();               }                             //画时针
            hour = hour > 12 ? hour - 12 : hour;

            g.beginPath();

            g.save();

            g.rotate(Math.PI / 6 * hour + Math.PI / 6 * min / 60 + Math.PI / 6 * sec / 3600);

            g.strokeStyle = "white";

            g.lineWidth = 3;

            g.moveTo(-10, 0);

            g.lineTo(30, 0);

            g.stroke();

            g.restore();

            g.closePath();

            //画分针

            g.beginPath();

            g.save();

            g.rotate(Math.PI / 30 * min + Math.PI / 30 * sec / 60);

            g.strokeStyle = "white";

            g.lineWidth = 2;

            g.moveTo(-5, 0);

            g.lineTo(30, 0);

            g.stroke();

            g.restore();

            g.closePath();

            //画秒针

            g.beginPath();

            g.save();

            g.rotate(Math.PI / 30 * sec);

            g.strokeStyle = "red";

            g.lineWidth = 1;

            g.moveTo(-10, 0);

            g.lineTo(35, 0);

            g.stroke();

            g.restore();

            g.closePath();

            g.restore();

        }
    }
}
//绘制数字时钟
function drawNumClock() {

    g.clearRect(100, 0, 1200, 200);

    var data = new Date();

    var str = data.getFullYear() + "年" + (data.getMonth() + 1) + "月" + data.getDate() + "日";

    var sec = data.getSeconds();

    var min = data.getMinutes();

    var hour = data.getHours();

    var day = data.getDay();         //获取当前星期

    if (day == 0) {

        day = "日";

    }

    else if (day == 1) {

        day = "一";

    }

    else if (day == 2) {

        day = "二";

    }

    else if (day == 3) {

        day = "三";

    }

    else if (day == 4) {

        day = "四";

    }

    else if (day == 5) {

        day = "五";

    }

    else if (day == 6) {

        day = "六";

    }

    g.fillStyle = "white";

    g.font = "100px '楷体'";

    g.lineWidth = "bolder";//字体加粗

    g.beginPath();

    g.fillText(hour, 200, 120);

    g.fillText(":", 300, 110);

    g.fillText(min, 340, 120);

    g.font = "70px '楷体'";

    g.fillText(sec, 470, 120);

    g.font = "70px '楷体'";

    g.fillText("星期", 580, 120);

    g.fillText(day, 730, 120);

    g.font = "50px '楷体'";

    g.fillText(str, 580, 180);

}

drawArcClock();

drawNumClock();

setInterval(drawArcClock, 1000);

setInterval(drawNumClock, 1000);


