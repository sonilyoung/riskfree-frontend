import React from "react";

// 쿠키 생성 함수
export function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    var cookies = cName + '=' + cValue + '; path=/ '; 
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기 함수
export function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start !== -1){
      start += cName.length;
      var end = cookieData.indexOf(';', start);
      if(end === -1)end = cookieData.length;
      cValue = cookieData.substring(start, end);
    }
    return cValue;
}

export function deleteCookie (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}