// ==UserScript==
// @name         HTTP 请求编辑器
// @namespace    http://your-namespace.com
// @version      1.0
// @description  拦截并编辑用于Web开发测试的HTTP请求
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义要检查的URL子字符串
    const urlSubstring = "example.com"; // 用所需的子字符串替换

    // 检查当前URL是否包含指定的子字符串
    if (window.location.href.includes(urlSubstring)) {
        // 拦截XMLHttpRequest
        const originalOpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(method, url) {
            if (confirm(
                "是否要编辑此请求？\n\n" +
                `方法：${method}\n` +
                `URL：${url}`
            )) {
                const newUrl = prompt("输入新的URL：", url);
                if (newUrl !== null) {
                    url = newUrl;
                }
            }
            return originalOpen.apply(this, arguments);
        };
    }
})();
