
//http://view.qq.com/a/20170807/006999.htm
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver 
var callback = function(){
	var articleAds = document.querySelectorAll('.article_ad');
	var adBox = document.querySelectorAll(".ad-box");
	var adboxTwo = document.getElementsByClassName("adbox");
	var main3Ad = document.getElementsByClassName("main3-ad")[0];
	var taobaoAd = document.querySelector("#taobaoADJS");
	var othersAd = document.querySelector("#gdt_72058763092022479");
	var LNFRectangle1 = document.getElementById("LN_F_Rectangle1");
	var qqTopAd = document.getElementsByClassName("qq_topAD")[0];
	var rAd2 = document.getElementsByClassName("r_ad_2")[0];
	var rAd3 = document.getElementsByClassName("r_ad_3")[0];
	var footAd = document.getElementById("footAd");
	var gaoqingFBottom = document.getElementById("gaoqing_F_bottom");
	var bodyTopAd = document.getElementsByClassName("body-Top-Ad");
	var centerAd = document.getElementById("centerAd");
	var LNFZQ1 = document.getElementById("LN_F_ZQ1");
	var LNFZQ2 = document.getElementById("LN_F_ZQ2");
	var BMtaobao = document.getElementById("BMtaobao");
	var adFoot = document.getElementsByClassName("ad-foot")[0];
	var mianAd = document.getElementsByClassName("mian-ad");
	var sidBoxNoborder = document.getElementById("F_ZQ_3");
	var sidBoxNoborder2  = document.getElementsByClassName("sidBoxNoborder "); 
	var rAd4 = document.getElementsByClassName("r_ad_4 ");
	//大燕网
	// var coupletAutoGen12 = document.getElementById("couplet_auto_gen_12");
	// var ywbigshow = document.getElementsByClassName("yw-big-show")[0];
	// if (ywbigshow != null) {
	// 	ywbigshow.style.display="none";
	// }
	// if (coupletAutoGen12 != null) {
	// 	coupletAutoGen12.style.display = "none";
	// }
	// //大燕网结束
	if (taobaoAd != null) { 
		taobaoAd.style.display = "none";
	}
	if (othersAd != null) {
		othersAd.style.display = "none";
	}
	if (main3Ad != null) {
		main3Ad.style.display = "none";
	}
	if (LNFRectangle1 != null) {
		LNFRectangle1.style.display = "none";
	}
	if (qqTopAd != null) {
		qqTopAd.style.display = "none"
	}
	if (rAd2 != null) {
		rAd2.style.display = "none";
	}
	if (rAd3 != null) {
		rAd3.style.display = "none";
	}
	if (gaoqingFBottom != null) {
		gaoqingFBottom.style.display = "none";
	}
	if (footAd != null) {
		footAd.style.display = "none";
	}
	if (LNFZQ1 != null) {
		LNFZQ1.style.display = "none";
	}
	if (LNFZQ2 != null) {
		LNFZQ2.style.display = "none";
	}
	if (centerAd != null) {
		centerAd.style.display = "none";
	}
	if (BMtaobao != null) {
		var BMtaobaoFather = BMtaobao.parentNode
		BMtaobaoFather.style.display = "none";
	}
	if (adFoot != null) {
		adFoot.style.display = "none";
	}
	for(var s = 0; s < sidBoxNoborder2.length; s++) {
		sidBoxNoborder2[s].style.display = "none";
	}
	for(var p = 0;p < rAd4.length; p++){
		rAd4[p].style.display = "none";
	}
	// if (sidBoxNoborder != null) {
	// 	sidBoxNoborder.style.position = "absolute";
	// 	sidBoxNoborder.style.display = "none";
	// }
	// if (topAd != null) {
	// 	topAd.style.display = "none";
	// }
	for (var l=0;l < mianAd.length; l++) {
		mianAd[l].style.display = "none";
	}
	for (var k = 0; k < bodyTopAd.length; k++ ) {
		bodyTopAd[k].style.display = "none";
	}
	for (var j = 0; j < adBox.length; j++) {
		adBox[j].style.display = "none";
	}
  	for(var i = 0; i < articleAds.length;i++){
    	articleAds[i].style.display = "none";
  	}
  	for (var q = 0; q < adboxTwo.length; q++) {
  		if (adboxTwo[q] != null) {
  			adboxTwo[q].style.display = "none";
  		}
  	}
};
var mutationObserver = new MutationObserver(callback);

var otpions={
  subtree:true,
  childList:true
};
mutationObserver.observe(document,otpions);