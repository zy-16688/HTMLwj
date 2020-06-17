window.addEventListener("load", function () {
    var usernum = document.querySelector("#usernumber");
    var syp = document.querySelector(".syp");
    var password = document.querySelector("password");
    var sb = document.querySelector("#sb");
    function show() {
        if (usernum.value === "") {
            syp.style.display = "none";
        } else {
            syp.style.display = "inline-block";
        }
    }

    usernum.onfocus = show;
    usernum.onblur = function () {
        syp.style.display = "none";
    }
    syp.onmouseover = function () {
        usernum.value = '';
    }

    usernum.addEventListener('change', function () {
        if (usernum.value != "") {
            console.log(1);
            sb.disabled = false;
            sb.style.backgroundColor = "red";
        } else {
            console.log(2);
            sb.disabled = true;
            sb.style.backgroundColor = "white";
        }
    });


})
