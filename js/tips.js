var isTipsTopClick = false;
var isTipsBottomClick = false;
var isRBottomClick = false;
var isRMiddleClick = false;
var isRTopClick = false;
var isMBottomClick = false;
var isMMiddleClick = false;
var isMTopClick = false;
var isLBottomClick = false;
var isLMiddleClick = false;
var isLTopClick = false;
var E_BUBBLE_STATUS =
{
    CLOSE_BY_UNKNOWN_REASON : 0, //未知
    CLOSE_BY_CLICK_ICON : 1,     //点击打开网页
    CLOSE_BY_CLICK_TIPWND : 2,   //点击窗口打开网页
    CLOSE_BY_CLICK_CLOSE : 3,    //点击关闭
    CLOSE_WHEN_TIMEOUT : 4,      //超时
    CLOSE_BY_SHUTDOWN : 5,       //关机
    SHOW_BY_POP : 6,             //show出
    SHOW_BY_DENYBYPRIORITY : 7   //被优先级拒绝
};
var popCount = "";
var popCountBottom = "";
var winPopCount = "";
var urlHrefArr = window.location.host.split(".");
var urlHref = urlHrefArr[1] + "." + urlHrefArr[2];
var externalJSON = JSON.parse(external.getPopupConfig());
var retryCount = 0;
var startShowCallback = function(result){
    if ("0" == result)
        ready(showTips);
}
var ready = function(callBack){
    var bReady = true;
    if(document.addEventListener) { //高级浏览器
        document.addEventListener('DOMContentLoaded',function(){ //绑定DOMContentLoaded 方法
            if(!bReady)return;
            bReady = false;
            callBack && callBack();//回调函数，存在调用
        },false);

        window.addEventListener('load',function(){ // 绑定onload方法
            if(!bReady)return;
            bReady = false;
            callBack && callBack();//回调函数，存在调用
        },false);
    }else if(document.attachEvent){ //ie678浏览器处理
        document.attachEvent('onreadystatechange',function(){
            if(!bReady) return;
            if(document.readyState == 'complete'){
                bReady = false;
                callBack && callBack();//回调函数，存在调用
            }
        });
        window.attachEvent('onload',function(){
            if(!bReady)return;
            bReady = false;
            callBack && callBack();//回调函数，存在调用
        });

        (!window.frameElement) && next();
        function next(){
            if(!bReady)return;
            try{
                document.documentElement.doScroll('left');
                bReady = false;
                callBack && callBack();//回调函数，存在调用
            }catch(e){
                setTimeout(next,1);
            }
        }
    }
}
var showTips = function(){
	/********************顶部弹条**************************/
		var tipsTop = document.createElement("div");
		var firstNode = document.body.firstChild;
		document.body.insertBefore(tipsTop,firstNode);
		tipsTop.setAttribute("class","tips_top");
		tipsTop.style.display = "none";
	/*****************底部弹条(普通型)**********************/
		var tipsBottomDiv = document.createElement("div");
		tipsBottomDiv.style.position = "fixed";
		tipsBottomDiv.style.left = 0 + "px";
		tipsBottomDiv.style.bottom = 0 + "px";
		tipsBottomDiv.style.zIndex = 9999;
		document.body.appendChild(tipsBottomDiv);
		//tipsDetailDiv.style.backgroundColor = "red";
		tipsBottomDiv.style.display = "none";
		tipsBottomDiv.setAttribute("class","tips_bottom");
	/*******************左下角广告窗口******************/
		var tipsLeftBottom = document.createElement("div");
		tipsLeftBottom.style.position = "fixed";
		tipsLeftBottom.style.left = 0 + "px";
		tipsLeftBottom.style.bottom = 0 + "px";
		tipsLeftBottom.style.zIndex = 999999999;
		tipsLeftBottom.style.display = "none";
		document.body.appendChild(tipsLeftBottom);
	/*******************右下角广告窗口******************/
		var tipsRightBottom = document.createElement("div");
		tipsRightBottom.style.position = "fixed";
		tipsRightBottom.style.right = 0 + "px";
		tipsRightBottom.style.bottom = 0 + "px";
		tipsRightBottom.style.zIndex = 999999999;
		tipsRightBottom.style.display = "none";
		document.body.appendChild(tipsRightBottom);
	/***********************右中弹框窗口************************/
		var tipsRightMiddle = document.createElement("div");
		tipsRightMiddle.style.position = "fixed";
		tipsRightMiddle.style.right = 0 + "px";
		tipsRightMiddle.style.top ="40%";
		tipsRightMiddle.style.zIndex = 99999999999;
		tipsRightMiddle.style.display = "none";
		document.body.appendChild(tipsRightMiddle);
	/************************右上弹条窗口*************************/
		var tipsRightTop = document.createElement("div");
		tipsRightTop.style.position = "fixed";
		tipsRightTop.style.right = 0 + "px";
		tipsRightTop.style.top =0 + "px";
		tipsRightTop.style.zIndex = 999999999;
		tipsRightTop.style.display = "none";
		document.body.appendChild(tipsRightTop);
	/***************************中下弹条窗口********************/
		var tipsMiddleBottom = document.createElement("div");
		tipsMiddleBottom.style.position = "fixed";
		tipsMiddleBottom.style.right = "50%";
		tipsMiddleBottom.style.bottom = 0 + "px";
		tipsMiddleBottom.style.zIndex = 9999999999;
		tipsMiddleBottom.style.display = "none";
		document.body.appendChild(tipsMiddleBottom);
	/********************中中弹框窗口********************/
		var tipsMiddle = document.createElement("div");
		tipsMiddle.style.position = "fixed";
		tipsMiddle.style.right = "50%";
		tipsMiddle.style.top = "50%";
		tipsMiddle.style.zIndex = 9999999999999;
		tipsMiddle.style.display = "none";
		document.body.appendChild(tipsMiddle);
	/*********************中上弹框窗口*******************/
		var tipsMiddleTop = document.createElement("div");
		tipsMiddleTop.style.position = "fixed";
		tipsMiddleTop.style.right = "50%";
		tipsMiddleTop.style.top = 0+"px";
		tipsMiddleTop.style.zIndex = 9999999999999;
		tipsMiddleTop.style.display = "none";
		document.body.appendChild(tipsMiddleTop);
	/**************************左中弹框窗口****************************/
		var tipsLeftMiddle = document.createElement("div");
		tipsLeftMiddle.style.position = "fixed";
		tipsLeftMiddle.style.left = 0 + "px";
		tipsLeftMiddle.style.bottom = "40%";
		tipsLeftMiddle.style.zIndex = 999999999;
		tipsLeftMiddle.style.display = "none";
		document.body.appendChild(tipsLeftMiddle);
	/**************************左上弹框窗口****************************/
		var tipsLeftTop = document.createElement("div");
		tipsLeftTop.style.position = "fixed";
		tipsLeftTop.style.left = 0 + "px";
		tipsLeftTop.style.bottom = "40%";
		tipsLeftTop.style.zIndex = 999999999;
		tipsLeftTop.style.display = "none";
		document.body.appendChild(tipsLeftTop);
    if (0 == externalJSON.length){
        externalJSON = JSON.parse(external.getPopupConfig());
        if (0 == externalJSON.length && retryCount < 3) {
            setTimeout(showTips(), ++retryCount*100);
            return;
        }
    }
	for (var i = 0; i < externalJSON.length; i++) {
        if(getCookie("tipsTopStatus") == "true")
          return;
		if (!external.getPopupConfig()) {
			external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.CLOSE_WHEN_TIMEOUT)
		}
        //external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP);
        
		setCookie("TaskID" + i, externalJSON[i].TaskId,30);
		setCookie("version" + i, externalJSON[i].TaskVer,30);
		var taskID = Number(getCookie("TaskID" + i));
		var version = Number(getCookie("version" + i));
		var maxPopCount = externalJSON[i].TaskValue.maxPopCount;
		/************以下是根据后台回参做的逻辑判断*****************/
		if (externalJSON[i].TaskValue.blacklist.indexOf(urlHref) >= 0) {
			tipsBottomDiv.style.display = "none";
			//tipsBottomHuge.style.display = "none";
			tipsTop.style.display = "none";
			tipsRightBottom.style.display = "none";
			tipsLeftBottom.style.display = "none";
			tipsRightMiddle.style.display = "none";
			tipsLeftMiddle.style.display = "none";
			tipsRightTop.style.display = "none";
			tipsMiddleBottom.style.display = "none";
			tipsMiddle.style.display = "none";
			tipsMiddleTop.style.display = "none";
			tipsLeftTop.style.display = "none";
			tipsLeftBottom.style.display = "none";
			tipsLeftMiddle.style.display = "none";
		} else {
			if (externalJSON[i].TaskValue.popup_type == 0) {
				/********顶部弹条*******/
				if (externalJSON[i].TaskValue.popuplocationvalue == "0") {
					setTimeout(function(){
						tipsTop.style.display = "block";
					},1000)
					tipsTop.style.position = "relative";
					//console.log(externalJSON[i].TaskValue.action_kv.tipheight)
					this.p = i;
					var that = this
					window.onscroll = function(){
						//console.log(externalJSON[that.p].TaskValue.action_kv.tipheight)
						if (document.body.scrollTop > externalJSON[that.p].TaskValue.action_kv.tipheight) {
							tipsTop.style.position = "fixed";
							tipsTop.style.top = 0 + "px";
							tipsTop.style.zIndex = 99999;
						} else {
							tipsTop.style.position = "relative";
						}
					}
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					tipsTop.style.width = "100%";
					tipsTop.style.textAlign = "center";
					tipsTop.style.borderBottom = "1px solid rgba(0,0,0,0.15)";
					var tipsTopCloseTime = setTimeout(function(){
						tipsTop.style.display = "none";
					},externalJSON[i].TaskValue.closeTime * 1000)
					/*********如果为安装（httpTemplateType == 230）**************/
					if(externalJSON[i].TaskValue.action_kv.htmlTemplateType == 230){
						var updateBtn = document.createElement("img");
						var innerHTML = document.createElement("img");
						var divTop = document.createElement("div");
						var divHeight = document.createElement("div");
						divTop.appendChild(divHeight);
						divHeight.style.display = "inline-block";
						divHeight.style.height = "100%";
						divHeight.style.verticalAlign = "middle";
						var closeBtn230 = document.createElement("img");
						divTop.style.width="60%";
						divTop.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						divTop.style.lineHeight = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						//divTop.style.paddingLeft = "20%";
						divTop.style.position = "relative";
						divTop.style.left="17.4%"
						updateBtn.src = externalJSON[i].TaskValue.action_kv.btnimage;
						updateBtn.style.position = "relative";
						updateBtn.style.left = "4%";
						updateBtn.style.cursor = "pointer";
						updateBtn.style.verticalAlign = "middle";
						innerHTML.style.verticalAlign = "middle";
						updateBtn.style.display = "inline-block";
						innerHTML.style.display = "inline-block";
						closeBtn230.style.display = "inline-block";
						divTop.appendChild(innerHTML);
						divTop.appendChild(updateBtn);
						divTop.appendChild(closeBtn230);
						tipsTop.appendChild(divTop);
						innerHTML.src= externalJSON[i].TaskValue.action_kv.image;
						//innerHTML.style.width = "60%";
						tipsTop.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsTop.style.lineHeight = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsTop.style.backgroundColor = externalJSON[i].TaskValue.action_kv.bgcolor;
						this.j = i;
						var that = this
						updateBtn.onclick = function(){
                            isTipsTopClick = true;
							setCookie("isTipsTopClick", isTipsTopClick, 30)
                            external.statusReport(externalJSON[that.j].TaskId,externalJSON[that.j].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_ICON)
							//console.log(externalJSON[that.j])
							tipsTop.style.display = "none";
							external.nativeCall("installQB", [parseInt(externalJSON[that.j].TaskValue.action_kv.supplyid, 10)], callback)

						}
						closeBtn230.style.position = "relative";
						closeBtn230.style.cursor = "pointer";
						closeBtn230.style.verticalAlign = "middle";
						closeBtn230.style.left = "9%";
						//closeBtn230.style.bottom = 50 + "px";
						/************安装关闭按钮的点击事件***************/
						closeBtn230.src = externalJSON[i].TaskValue.action_kv.closebtn;
						closeBtn230.onclick = function(){
							external.statusReport(externalJSON[that.j].TaskId,externalJSON[that.j].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_CLOSE);
							tipsTop.style.display = "none";
							isTipsTopClick = true;
							setCookie("tipsTopStatus", isTipsTopClick,30);
							if(getCookie("popNum") != null && Number(getCookie("TaskID" + that.j)) == externalJSON[that.j].TaskId &&
								Number(getCookie("version" + that.j)) == externalJSON[that.j].TaskVer){
								popCount = Number(getCookie("popNum"))+1
								setCookie("popNum", popCount,30);
							}else{
								popCount = 1;
								setCookie("popNum", popCount, 30);
							}
						}
						if (Number(getCookie("popNum")) >= externalJSON[i].TaskValue.maxPopCount && externalJSON[i].TaskValue.maxPopCount != 0 &&
							getCookie("tipsTopStatus") == "true") {
							tipsTop.style.opacity = 0
							setTimeout(function(){
								tipsTop.style.display = "none";
							},900)
						}
					/**********如果为广告（httpTemplateType == 231）*********************/
					} else if (externalJSON[i].TaskValue.action_kv.htmlTemplateType == 231) {
						tipsTop.style.backgroundImage = "url("+externalJSON[i].TaskValue.action_kv.image+")";
						tipsTop.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsTop.style.backgroundColor = externalJSON[i].TaskValue.action_kv.bgcolor;
						var closeBtn231 = document.createElement("img")
						tipsTop.appendChild(closeBtn231);
						closeBtn231.style.position = "relative";
						closeBtn231.style.cursor = "pointer";
						closeBtn231.style.left = "35%";
						/************关闭按钮的点击事件***************/
						closeBtn231.src = externalJSON[i].TaskValue.action_kv.closebtn;
						closeBtn231.onclick = function(){
							external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_CLOSE)
							//tipsTops.tyle.transition = "all 2s";
							tipsTop.style.display = "none";
						}
						tipsTop.onclick = function(){
                            external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_ICON)
							window.location.href = externalJSON[i].TaskValue.action_kv.url
						}
					}
				/*********底部弹条***********/
				} else if (externalJSON[i].TaskValue.popuplocationvalue == 1) {
					//console.log(externalJSON[i].TaskValue.action_kv.tipheight)
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					tipsBottomDiv.style.width = "100%";
					tipsBottomDiv.style.display = "block";
					tipsBottomDiv.style.textAlign = "center";
					var tipsBottomCloseTime = setTimeout(function(){
						tipsBottomDiv.style.display = "none";
					},externalJSON[i].TaskValue.closeTime * 1000)
				/*******如果为安装（httpTemplateType == 230）*******/
					if (externalJSON[i].TaskValue.action_kv.htmlTemplateType == 230) {
						var updateBtnBottom = document.createElement("img");
						var innerHTMLBottom = document.createElement("img");
						var divBottom = document.createElement("div");
						var closeBtnBottom = document.createElement("img");
						var divHeight = document.createElement("div");
						divBottom.appendChild(divHeight);
						divHeight.style.display = "inline-block";
						divHeight.style.height = "100%";
						divHeight.style.verticalAlign = "middle";
						updateBtnBottom.style.display = "inline-block";
						innerHTMLBottom.style.display = "inline-block";
						closeBtnBottom.style.display = "inline-block";
						divBottom.style.width="100%";
						divBottom.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						divBottom.style.lineHeight = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						//divBottom.style.paddingLeft = "35%";
						divBottom.style.position = "relative";
						updateBtnBottom.src = externalJSON[i].TaskValue.action_kv.btnimage;
						updateBtnBottom.style.position = "relative";
						updateBtnBottom.style.left = "4%";
						updateBtnBottom.style.cursor = "pointer";
						updateBtnBottom.style.verticalAlign = "middle";
						innerHTMLBottom.style.verticalAlign = "middle";
						closeBtnBottom.style.verticalAlign = "middle";
						divBottom.appendChild(innerHTMLBottom);
						divBottom.appendChild(updateBtnBottom);
						divBottom.appendChild(closeBtnBottom);
						tipsBottomDiv.appendChild(divBottom);
						innerHTMLBottom.src= externalJSON[i].TaskValue.action_kv.image;
						//innerHTMLBottom.style.width = "60%";
						tipsBottomDiv.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsBottomDiv.style.lineHeight = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsBottomDiv.style.backgroundColor = externalJSON[i].TaskValue.action_kv.bgcolor;
						closeBtnBottom.src = externalJSON[i].TaskValue.action_kv.closebtn;
						closeBtnBottom.style.position = "relative";
						closeBtnBottom.style.cursor = "pointer";
						closeBtnBottom.style.left = "9%";
						this.o = i;
						var that = this
						closeBtnBottom.onclick = function(){
							external.statusReport(externalJSON[that.o].TaskId,externalJSON[that.o].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_CLOSE)
							tipsBottomDiv.style.display = "none";
							isTipsBottomClick = true;
							setCookie("tipsBottomStatus", isTipsBottomClick, 30)
							if(getCookie("popNumBottom") != null && Number(getCookie("TaskID" + that.o)) == externalJSON[that.o].TaskId &&
								Number(getCookie("version" + that.o)) == externalJSON[that.o].TaskVer){
								popCountBottom = Number(getCookie("popNumBottom"))+1
								setCookie("popNumBottom", popCountBottom, 30);
							}else{
								popCountBottom = 1;
								setCookie("popNumBottom", popCountBottom, 30);
							}
						}
						if (Number(getCookie("popNumBottom")) >= externalJSON[i].TaskValue.maxPopCount && externalJSON[i].TaskValue.maxPopCount != 0 &&
							getCookie("tipsBottomStatus") == "true") {

							tipsBottomDiv.style.opacity = 0;
							setTimeout(function(){
								tipsBottomDiv.style.display = "none";
							},900)
						}
						updateBtnBottom.onclick = function(){
                            isTipsBottomClick = true;
							setCookie("tipsBottomStatus", isTipsBottomClick, 30)
                            external.statusReport(externalJSON[that.o].TaskId,externalJSON[that.o].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_ICON)
							//window.location.href = externalJSON[i].TaskValue.action_kv.url
							external.nativeCall("installQB", [parseInt(externalJSON[that.o].TaskValue.action_kv.supplyid, 10)], callback)
							tipsBottomDiv.style.display = "none";

						}
				/************如果为广告（httpTemplateType == 231）******************/
					} else if (externalJSON[i].TaskValue.action_kv.htmlTemplateType == 231) {
						tipsBottomDiv.style.backgroundImage = "url("+externalJSON[i].TaskValue.action_kv.image+")";
						tipsBottomDiv.style.height = externalJSON[i].TaskValue.action_kv.tipheight + "px";
						tipsBottomDiv.style.backgroundColor = externalJSON[i].TaskValue.action_kv.bgcolor;
						tipsBottomDiv.onclick = function(){
                            external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_ICON)
							window.location.href = externalJSON[i].TaskValue.action_kv.url
						}
						var closeBtnBottom231 = document.createElement("img");
						tipsBottomDiv.appendChild(closeBtnBottom231);
						closeBtnBottom231.src = externalJSON.TaskValue.action_kv.closebtn;
						closeBtnBottom231.style.position = "relative";
						closeBtnBottom231.style.cursor = "pointer";
						closeBtnBottom231.style.left = "35%";
						closeBtnBottom231.onclick = function(){
							external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_CLOSE)
							//tipsTops.tyle.transition = "all 2s";
							tipsBottomDiv.style.display = "none";
						}
					}
				}
			} else if (externalJSON[i].TaskValue.popup_type == 1) {
				/*****************右下角弹窗*********************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 0) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					//tipsRightBottom.style.display = "block";
					createTipWidnow(tipsRightBottom, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isRBottomClick)
				}
				/******************右中弹窗******************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 1) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsRightMiddle, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isRMiddleClick)
				}
				/********************右上弹窗*******************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 2) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsRightTop, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isRTopClick)
				}
				/*********************中下弹窗******************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 3) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsMiddleBottom, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isMBottomClick)
				}
				/**********************中中弹窗************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 4) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsMiddle, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isMMiddleClick)
				}
				/**********************中上弹窗************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 5) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsMiddleTop, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isMTopClick)
				}
				/**********************左下弹窗************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 6) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsLeftBottom, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isLBottomClick)
				}
				/**********************左中弹窗************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 7) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP)
					createTipWidnow(tipsLeftMiddle, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isLMiddleClick)
				}
				/**********************左上弹窗************************/
				if (externalJSON[i].TaskValue.popuplocationvalue == 7) {
					external.statusReport(externalJSON[i].TaskId,externalJSON[i].TaskVer,E_BUBBLE_STATUS.SHOW_BY_POP )
					createTipWidnow(tipsLeftTop, externalJSON[i].TaskValue.action_kv.winwidth,
						externalJSON[i].TaskValue.action_kv.winheight,
						externalJSON[i].TaskValue.action_kv.image,
						externalJSON[i].TaskValue.action_kv.closebtn,
						externalJSON[i].TaskValue.action_kv.url,
						externalJSON[i].TaskId,externalJSON[i].TaskVer,
						isLTopClick)
				}
			}
		}
		external.dataReport(8888, 600, externalJSON[i].TaskId, externalJSON[i].TaskVer, E_BUBBLE_STATUS, '','minibrowser','')
		function createTipWidnow(tipsElement, winWidth, winHeight, bgcImg, closeImg, jumpUrl, isCloseBtn, TaskId, TaskVer){
			setTimeout(function(){
				tipsElement.style.display = "block";
			},1000)
			tipsElement.style.width = winWidth + "px";
			tipsElement.style.height = winHeight + "px";
			tipsElement.style.backgroundImage = "url("+bgcImg+")";
			tipsElement.style.backgroundRepeat = 'no-repeat';
			tipsElement.style.backgroundPosition = "0% 150%";
			tipsElement.style.cursor = "pointer";
			var closeBtn = document.createElement("div");
			tipsElement.appendChild(closeBtn);
			closeBtn.style.width = 30 + "px";
			closeBtn.style.height = 30 + "px";
			closeBtn.style.position = "absolute";
			closeBtn.style.right = 0 + "px";
			closeBtn.style.top = 0 + "px";
			closeBtn.style.cursor = "pointer";
			this.l = i;
			var _that = this
			closeBtn.onclick = function(ev){
				external.statusReport(TaskId,TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_CLOSE)
				tipsElement.style.display = "none";
				ev.stopPropagation();
				isCloseBtn = true;
				setCookie("closeStatus" + _that.l, isCloseBtn,1)
			}
			if (getCookie("closeStatus" + i) == "true") {
				tipsElement.style.display = "none";
			}
			tipsElement.onclick = function(){
                external.statusReport(TaskId,TaskVer,E_BUBBLE_STATUS.CLOSE_BY_CLICK_ICON)
				window.location.href = jumpUrl
			}
		}
	}
}
/*******设置cookie，判断点击关闭次数********/
function setCookie(key,value,days){
	var exp = new Date();
	exp.setTime(exp.getTime() + 60*60*24*1000*days);
	document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";domain=." + document.domain.split('.').slice(-2).join('.');
}
/*************获取cookie*******************/
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2]);
    }
    return null
}
function callback(){

}
function callbackBottom(){

}
//run
external.nativeCall("isQBInstalled", [""], startShowCallback);