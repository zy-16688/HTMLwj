window.addEventListener("load", function () {
    var phonereg = document.querySelector(".phonereg");
    var emailreg = document.querySelector(".emailreg");
    var phoneregbody = document.querySelector(".phoneregbody");
    var emailregbody = document.querySelector(".emailregbody");
    var ttip = document.querySelector(".ttip");
    var password = document.querySelector(".password");
    var teltip = document.querySelector(".teltip");
    var pdtip = document.querySelector(".pdtip");
    var sb = document.querySelector(".sb");
    var mg = document.querySelector(".message");
    var etip = document.querySelector(".etip");
    var epassword = document.querySelector(".epassword");
    var pmg = document.querySelector(".pmessage");
    phonereg.onclick = function () {
        phoneregbody.style.display = "block";
        emailregbody.style.display = "none";
    }
    emailreg.onclick = function () {
        phoneregbody.style.display = "none";
        emailregbody.style.display = "block";
    }
    var regex = /^1[358][0-9]{9}$/;
    ttip.onfocus = function () {
        teltip.className = "teltip";
        teltip.style.display = "inline-block";
        teltip.innerHTML = "请输入11位号码"
    }
    ttip.onblur = function () {
        if (!regex.test(ttip.value)) {
            teltip.className = "wrong";
            teltip.innerHTML = "请输入正确的号码"
        } else {
            teltip.className = "right";
            teltip.innerHTML = "输入正确";

        }
    }
    password.onfocus = function () {
        pdtip.className = "teltip";
        pdtip.style.display = "inline-block";
        pdtip.innerHTML = "6-16位字符(字母,数字,符号),区别大小写"
    }
    password.onblur = function () {
        if (!regex.test(ttip.value)) {
            pdtip.className = "wrong";
            pdtip.innerHTML = "请输入正确格式的密码"
        } else {
            pdtip.className = "right";
            pdtip.innerHTML = "密码可用";

        }
    }
    etip.onfocus = function () {
        mg.className = "message";
        mg.style.display = "inline-block";
        mg.innerHTML = "请输入正确的邮箱"
    }
    etip.onblur = function () {
        if (etip.value == "") {
            mg.className = "wrong";
            mg.innerHTML = "请输入邮箱"
        } else {
            mg.className = "message";
            mg.innerHTML = "请输入正确的邮箱"
        }
    }
    epassword.onfocus = function () {
        pmg.className = "pmessage message";
        pmg.style.display = "inline-block";
    }
    epassword.onblur = function () {
        pmg.className = "pmessage wrong";
        pmg.style.display = "inline-block";
        pmg.innerHTML = "请输入密码";

    }
    sb.addEventListener("click", function (e) {
        if (password.value === "" || ttip.value === "") {
            e.preventDefault();

        }
    })
})
