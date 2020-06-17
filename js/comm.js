document.addEventListener('DOMContentLoaded', function () {

  if (!/\.qq\.com$/i.test(location.host) && location.host !== '3g.k.sohu.com') {
    return
  }

  document.documentElement.style.cssText += `
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
  `
  document.body.style.cssText += `
    margin: 0 !important;
    padding: 0 !important;
    width: 80% !important;
    max-width: 640px !important;
    margin: 40px auto 80px !important;
  `
  if (location.host === 'mp.weixin.qq.com') {
      document.body.style.cssText += `background: none;`
  }

  if (location.host === '3g.k.sohu.com' && document.querySelector('.ui-delivery')) {
    document.querySelector('.ui-delivery').remove()
  }

}, false)