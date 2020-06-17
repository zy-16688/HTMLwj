'use strict'
// 监控img攻防
var imgObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (m) {
    if (m.type === 'attributes' && m.oldValue) {
      m.target.setAttribute('data-osrc', m.oldValue)
// console.log(m.target, m.oldValue, m.target.src)
    }
  })
})
imgObserver.observe(document, {childList: true, subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['src']})
// 统一在写一起, 尽量基于es5语法
var cleanObj = {
  // 变量
  wrapperID: 'qrm1493625539248',
  cssPath: 'https://pcbrowser.dd.qq.com/pcbrowserbig/qb9/mbrm/clean.css',
  iframePath: 'https://pcbrowser.dd.qq.com/pcbrowserbig/qb9/mbrm/index.html',
  iframeElt: null,
  againNum: 0,
  // 各site的类别未必相同
  typeRule: null,
  // 先遮罩防止闪
  mask: function () {
    cleanObj.iframeElt = document.createElement('iframe')
    cleanObj.iframeElt.style.cssText = `position:fixed;top:0;bottom:0;left:0;right:0;
      z-index:999999;width:100%;height:100%;background:white;`
    cleanObj.iframeElt.src = cleanObj.iframePath + '?t=' + Date.now()
    document.documentElement.appendChild(cleanObj.iframeElt)
  },
  // 监控元素
  observer: function (elt, config, cb) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        cb(m)
      })
    })
    observer.observe(elt, config)
    return observer
  },
  // 引入样式
  injectCss: function (pElt) {
    var elt
    // 引入样式
    elt = document.createElement('link')
    elt.id = 'q1493538638421'
    elt.type = 'text/css'
    elt.rel = 'stylesheet'
    elt.href = cleanObj.cssPath + '?t=' + Date.now()
    pElt.appendChild(elt)
  },
  // 隐藏页面内的原有元素
  hide: function () {
    var eltArr
    // 隐藏所有
    eltArr = document.querySelectorAll('body > *')
    eltArr = Array.prototype.slice.call(eltArr)
    eltArr.forEach(function (n) {
      if (n.nodeType === 1 && n.nodeName !== 'SCRIPT' && n !== cleanObj.iframeElt &&
          n.id !== cleanObj.wrapperID) {
        n.style.cssText += ';display:none !important;'
      }
    })
    // 监听, 防止动态生成的
    cleanObj.observer(document.body, {childList: true, attributes: true, subtree: true, attributeFilter: ['style', 'class']}, function (m) {
      var arr
      // 一种是新增
      if (m.type === 'childList' && m.target === document.body && m.addedNodes.length) {
        Array.prototype.slice.call(m.addedNodes).forEach(function (n) {
          if (n.id !== cleanObj.wrapperID) {
            n.style.cssText += ';display:none !important;'
          }
        })
      }
      // 一种是改变style显示
      else if (m.type === 'attributes' && m.target.parentNode === document.body) {
        if (m.target.id !== cleanObj.wrapperID) {
          m.target.remove()
        }
      }
    })
  },
  // 防止多次init
  isInit: false,
  // 验证函数, 如果正常统一处理
  valid: function (isValid, docF) {
    if (!cleanObj.isInit && isValid) {
      document.body.appendChild(docF)
      cleanObj.hide()
      cleanObj.isInit = true
      setTimeout(function () {
        cleanObj.iframeElt.remove()
      }, 200)
    }
  },
  // 判断类别
  pickTypeRule: function () {
    // 投票
    if (/\.toutiao\.com$/i.test(location.host) && document.querySelector('#pagelet-vote')) {
      cleanObj.typeRule = 'toutiao_vote'
    }
    // 文章
    else if (/\.toutiao\.com$/i.test(location.host) && document.querySelector('.article-container, #article-main, .article')) {
      cleanObj.typeRule = 'toutiao_article'
    }
    // 头条视频
    else if (location.host === 'm.365yg.com' && document.querySelector('[class*=video-container]')) {
      cleanObj.typeRule = 'toutiao_video'
    }
    // 问答
    else if (location.host === 'wenda.toutiao.com' && document.querySelectorAll('.question, .answer').length === 2 ) {
      cleanObj.typeRule = 'toutiao_question'
    }
    // 网易新闻
    else if (location.host === 'c.m.163.com') {
      if (/^\/news\/(a|p)\//i.test(location.pathname)) {
        cleanObj.typeRule = '163_article'
      }
      // else if (/^\/news\/v\//i.test(location.pathname)) {
      //   cleanObj.typeRule = '163_video'
      // }
    }
  },
  // 清洗规则
  ruleMap: {
    'toutiao_vote': function () {
      cleanObj.iframeElt.remove()
    },
    'toutiao_video': function () {
      // 元素
      var docF, wElt, tElt, cElt, rlElt, rltElt, rllElt
      // 监控句柄
      var tOb, cOb
      // style
      cleanObj.injectCss(document.head)
      // 封装root
      docF = document.createDocumentFragment()
      wElt = document.createElement('div')
      wElt.id = cleanObj.wrapperID
      docF.appendChild(wElt)
      // 标题
      tElt = document.createElement('h1')
      tElt.className = 'rm-title'
      wElt.appendChild(tElt)
      tOb = cleanObj.observer(document.querySelector('.video-info'), {childList: true, subtree: true}, function (m) {
        tElt.textContent = document.querySelector('.video-info h1').textContent
        tOb.disconnect()
        cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
      })
      // 视频
      cElt = document.createElement('div')
      wElt.appendChild(cElt)
      cOb = cleanObj.observer(document.querySelector('.tt-video-box'), {childList: true}, function () {
        cElt.innerHTML = document.querySelector('.tt-video-box video').outerHTML
        cOb.disconnect()
        cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
      })
      // 推荐列表
      rlElt = document.createElement('div')
      rlElt.className = 'rm-video-recommend'
      rltElt = document.createElement('h2')
      rlElt.appendChild(rltElt)
      rllElt = document.createElement('div')
      rlElt.appendChild(rllElt)
      wElt.appendChild(rlElt)
      cleanObj.observer(document.querySelector('[class*=video-container]'), {childList: true, subtree: true, attributes: true, attributeFilter: ['src']}, function (m) {
        // 每次都遍历一遍
        var tmp = Array.prototype.slice.call(m.target.querySelectorAll('[data-group-id]'))
        tmp.forEach(function (n) {
          var tmp = rllElt.querySelector('[data-group-id="'+n.getAttribute('data-group-id')+'"]')
          // 更新
          if (tmp) {
            tmp.querySelector('img').src = n.querySelector('img').src
          }
          // 新增
          else {
            rllElt.innerHTML += `
              <a data-group-id="${n.getAttribute('data-group-id')}" href="${n.querySelector('a').href}">
                <img src="${n.querySelector('img').src}"/>
                <p>
                  <span>${n.querySelector('a').title}</span>
                  <span>${n.querySelector('.time').title}</span>
                </p>
              </a>
            `
          }
        })
        // 推荐列表title
        if (!rltElt.textContent &&
            document.querySelector('.list-header')) {
          rltElt.textContent = document.querySelector('.list-header').textContent
        }
      })
    },
    'toutiao_article': function () {
      // 元素
      var docF, wElt, tElt, cElt, sElt, rootElt
      // atElt是页面内的文章元素
      var buildContentHtmlFunc = function (atElt) {
        var eltArr, htmlStr = '', tmp
        // 嵌套遍历
        var nestFunc = function (pElt) {
          var eltArr = Array.prototype.slice.call(pElt.children)
          eltArr.forEach(function (n) {
            // 单纯包含img
            if (n.classList.contains('img-wrapper') || n.classList.contains('img-wrapper-embedded')) {
              htmlStr += `
                <p>
                  <img src="${n.querySelector('img').getAttribute('data-osrc') || n.querySelector('img').src}"/>
                </p>
              `
            }
            // 存在video
            else if (n.classList.contains('tt-video-box') && n.children.length === 1) {
              htmlStr += `
                <p class="rm-video">
                  ${n.innerHTML}
                </p>
              `
            }
            // 下面只有文本
            else if (n.nodeType === 1 && !n.children.length && !/script|style/i.test(n.nodeName)) {
              htmlStr += `
                <p>
                  ${n.textContent}
                </p>
              `
            }
            // 单独p的处理, 没有className
            else if (/p/i.test(n.nodeName) && n.children.length && !n.className) {
              // 下面包含文本和img
              if (n.querySelector('img')) {
                // 图文混合, 所以要子节点, 知识点啊
                tmp = Array.prototype.slice.call(n.childNodes)
                tmp.forEach(function (m) {
                  if (m.nodeType === 3 && m) {
                    htmlStr += `
                      <p>
                        ${m.textContent}
                      </p>
                    `
                  }
                  else if (m.nodeType === 1 && m.nodeName === 'IMG') {
                    htmlStr += `
                      <p>
                        <img src="${m.getAttribute('data-osrc') || m.src}"/>
                      </p>
                    `
                  }
                })
              }
              // 下面包含strong等修饰元素
              else {
                htmlStr += `
                  <p>
                    ${n.textContent}
                  </p>
                `
              }
            }
            // 还有嵌套
            else if (n.children.length) {
              nestFunc(n)
            }
          })
        }
        nestFunc(atElt)
        return htmlStr
      }
      // style
      cleanObj.injectCss(document.head)
      // 定位
      rootElt = document.querySelector('.article-container,  #article-main, .article')
      // 封装
      docF = document.createDocumentFragment()
      wElt = document.createElement('div')
      wElt.id = cleanObj.wrapperID
      docF.appendChild(wElt)
      // 标题
      tElt = document.createElement('h1')
      tElt.className = 'rm-title'
      wElt.appendChild(tElt)
      // 来源
      sElt = document.createElement('div')
      sElt.className = 'rm-source'
      wElt.appendChild(sElt)
      // 内容
      cElt = document.createElement('div')
      cElt.className = 'rm-content'
      wElt.appendChild(cElt)
      // 监控
      cleanObj.observer(rootElt, {childList: true, subtree: true}, function (m) {
        if (m.type === 'childList') {
          if (m.target.classList.contains('title') || m.target.classList.contains('article__title')) {
            tElt.textContent = m.target.textContent
          }
          // 文章
          else if ((m.target.classList.contains('article-content') || m.target.classList.contains('article__content')) && m.addedNodes.length) {
            cElt.innerHTML = buildContentHtmlFunc(m.target)
          }
          // 更新video
          else if (m.target.classList.contains('tt-video-box')) {
            cElt.querySelector('.rm-video').innerHTML = m.target.innerHTML
          }
          // 来源
          if (!sElt.textContent) {
            if (document.querySelector('.subtitle')) {
              sElt.textContent = document.querySelector('#mediaName').textContent + ' ' +
                document.querySelector('.subtitle .time span:last-child').textContent
            }
            else if (document.querySelector('.article__author')) {
              sElt.textContent = document.querySelector('.media-name').textContent + ' ' +
                document.querySelector('.publish-time').textContent
            }
          }
        }
        cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
      })
      // 小说类有时会直出
      tElt.textContent = rootElt.querySelector('.title, .article__title').textContent
      cElt.innerHTML = buildContentHtmlFunc(rootElt.querySelector('.article-content, .article__content'))
      // 来源
      if (!sElt.textContent) {
        if (document.querySelector('.subtitle')) {
          sElt.textContent = document.querySelector('#mediaName').textContent + ' ' +
            document.querySelector('.subtitle .time span:last-child').textContent
        }
        else if (document.querySelector('.article__author')) {
          sElt.textContent = document.querySelector('.media-name').textContent + ' ' +
            document.querySelector('.publish-time').textContent
        }
      }
      cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
    },
    'toutiao_question': function () {
      // 元素
      var docF, wElt, tElt, cElt, sElt, eltArr
      // style
      cleanObj.injectCss(document.head)
      // 封装root
      docF = document.createDocumentFragment()
      wElt = document.createElement('div')
      wElt.id = cleanObj.wrapperID
      docF.appendChild(wElt)
      // 标题
      tElt = document.createElement('div')
      tElt.className = 'rm-wenda-title'
      tElt.innerHTML = `
        <h1>${document.querySelector('.question .title').textContent}</h1>
        <p>${document.querySelector('.question .full-des').textContent}</p>
      `
      wElt.appendChild(tElt)
      // 来源
      sElt = document.createElement('div')
      sElt.className = 'rm-source'
      wElt.appendChild(sElt)
      // 内容
      cElt = document.createElement('div')
      cElt.className = 'rm-content'
      wElt.appendChild(cElt)

      eltArr = document.querySelectorAll('.answer li')
      eltArr = Array.prototype.slice.call(eltArr)
      eltArr.forEach(function (n) {
        cElt.innerHTML += `
          <div class="rm-wenda-answer">
            <p class="rm-wenda-author">
              <img class="rm-wenda-author-img" src="${n.querySelector('img.avatar').src}"/>
              <span class="rm-wenda-author-name">${n.querySelector('.author .name').textContent}</span>
              <span class="rm-wenda-author-count">${n.querySelector('.author .count').textContent}</span>
            </p>
            <div class="rm-wenda-content">
              ${n.querySelector('.con-words, .richtext').innerHTML}
            </div>
          </div>
        `
      })
      cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
    },
    '163_article': function () {
      // 元素
      var docF, wElt, tElt, cElt, sElt, rootElt
      var buildContentHtmlFunc = function (obj, type) {
        var eltArr, htmlStr = '', type = type || 'elt'
        switch (type) {
          case 'elt':
            eltArr = Array.prototype.slice.call(obj.children)
            eltArr.forEach(function (n) {
              if (n.querySelector('img')) {
                htmlStr += `
                  <p>
                    <img src="${n.querySelector('img').getAttribute('data-echo') || n.querySelector('img').src}"/>
                  </p>
                `
              }
              else if (/p/i.test(n.nodeName) && (!n.className || n.classList.contains('text'))) {
                htmlStr += `
                  <p>
                    ${n.textContent}
                  </p>
                `
              }
            })
            break
          case 'array':
            obj.forEach(function (n) {
              if (n.img) {
                htmlStr += `
                  <p>
                    <img src="${n.img}"/>
                  </p>
                `
              }
              if (n.note) {
                htmlStr += `
                  <p>
                    ${n.note}
                  </p>
                `
              }
            })
            break
        }
        return htmlStr
      }
      // style
      cleanObj.injectCss(document.head)
      // 定位
      rootElt = document.querySelector('article')
      // 封装
      docF = document.createDocumentFragment()
      wElt = document.createElement('div')
      wElt.id = cleanObj.wrapperID
      docF.appendChild(wElt)
      // 标题
      tElt = document.createElement('h1')
      tElt.className = 'rm-title'
      wElt.appendChild(tElt)
      // 来源
      sElt = document.createElement('div')
      sElt.className = 'rm-source'
      wElt.appendChild(sElt)
      // 内容
      cElt = document.createElement('div')
      cElt.className = 'rm-content'
      wElt.appendChild(cElt)
      // 直出
      tElt.textContent = rootElt.querySelector('.article-title, .title').textContent
      sElt.textContent = (rootElt.querySelector('.tname, .subtitle > span') ?
        rootElt.querySelector('.tname, .subtitle > span').textContent :
        rootElt.querySelector('.source').textContent) + ' ' +
        rootElt.querySelector('.time').textContent
      // 两种情况
      if (window.PHOTOS_INFO && Array.isArray(window.PHOTOS_INFO)) {
        cElt.innerHTML = buildContentHtmlFunc(PHOTOS_INFO, 'array')
      }
      else {
        cElt.innerHTML = buildContentHtmlFunc(rootElt.querySelector('.text, .js-photo-content'))
      }
      cleanObj.valid(tElt.textContent && cElt.innerHTML, docF)
    },
  },
  // 清洗
  clean: function () {
    if (cleanObj.isInit) {
      return
    }
    cleanObj.pickTypeRule()
    if (cleanObj.typeRule) {
      try {
        cleanObj.ruleMap[cleanObj.typeRule]()
      }
      catch (e) {
        console.log(e)
      }
    }
    else {
      // 失败后延时2s再试一次
      if (cleanObj.againNum < 10) {
        setTimeout(function () {
          cleanObj.clean()
        }, 200)
        cleanObj.againNum++
      }
      else {
        cleanObj.iframeElt.remove()
      }
    }
  },
  // 入口
  init: function () {
    cleanObj.mask()
    document.addEventListener('DOMContentLoaded', cleanObj.clean, false)
    // 容错
    setTimeout(function () {
      if (!cleanObj.isInit) {
        cleanObj.iframeElt.remove()
      }
    }, 1000 * 5)
  }
}

cleanObj.init()
