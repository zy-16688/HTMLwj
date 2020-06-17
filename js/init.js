;(function(window) {
  var internalID;
  var rNum, rMaxNum = 40;
  var internalRpl = setInterval(function () {
    var elt;
    if (document && (elt = document.querySelector('.title h1'))) {
      elt.innerHTML = elt.innerHTML.replace(/&amp;quot;/g, '"');
    }
    if (rNum++ < rMaxNum) {
      internalRpl = clearInterval(internalRpl);
    }
  }, 50);

  if (!document.head) {
    internalID = setInterval(addStyle, 50);
  }
  else {
    addStyle();
  }

  function addStyle() {

    var elt;

    if (!document.head) {
      return;
    }
    if (internalID) {
      internalID = clearInterval(internalID);
    }

    if (!document.querySelector('meta[name="MobileOptimized"]'))
       return;

    elt = document.getElementById('qb-style');
    if (!elt) {
      elt = document.createElement('style');
      elt.id = 'qb-style';
      document.head.appendChild(elt);
    }

    elt.innerHTML = getStyleText();
  }

  function getStyleText() {
    var arr = [];
    arr.push('body {');
    arr.push('  font-family: Microsoft YaHei !important;');
    arr.push('}');
    arr.push('.wrap {');
    arr.push('  width: 80% !important;');
    arr.push('  max-width: 640px !important;');
    arr.push('  margin: 40px auto 80px !important;');
    arr.push('}');
    arr.push('.title h1 {');
    arr.push('  font-size: 24px !important;');
    arr.push('  line-height: 32px !important;');
    arr.push('  font-weight: normal !important;');
    arr.push('}');
    arr.push('.time {');
    arr.push('  margin: 20px 0 !important;');
    arr.push('  padding: 10px 0 !important;');
    arr.push('  border-top: 1px solid rgba(0,0,0,.1) !important;');
    arr.push('  font-size: 14px !important;');
    arr.push('  color: #8c8c8c !important;');
    arr.push('}');
    arr.push('.news div {');
    arr.push('  font-size: 15px !important;');
    arr.push('  line-height: 26px !important;');
    arr.push('  color: #3e3e3e !important;');
    arr.push('}');
    arr.push('.news-img {');
    arr.push('  text-align: center !important;');
    arr.push('}');
    arr.push('.news img {');
    arr.push('  margin: 30px 0 !important;');
    arr.push('  max-width: 100% !important;');
    arr.push('  text-align: center !important;');
    arr.push('}');
    return arr.join('');
  }

  // mtt_source href modify
  setTimeout(function () {
    var msElt = document.querySelector('#mtt_source')
    if (msElt) {
      msElt.href = 'http://browser.qq.com/'
    }
  }, 1000)

})(window);
