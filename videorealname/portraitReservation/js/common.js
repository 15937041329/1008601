var myConstructFun=function(){this.imageChange=imageChange,this.btnInitFun=btnInitFun};myConstructFun.prototype.getQueryStringArgs=function(){var e=0<location.search.length?location.search.substring(1):"",n={},t=e.length?e.split("&"):[],i=null,o=null,a=null,r=0,u=t.length;for(r=0;r<u;r++)i=t[r].split("="),o=decodeURIComponent(i[0]),a=decodeURIComponent(i[1]),o.length&&(n[o]=a);return n};var btnInitFun=function(e){var n=e.commonObj;n.selectBtnInitFun(e),n.sureBtnInitFun(e),n.nextBtnInitFun(e),n.editInitFun(e),n.paramJson=e};myConstructFun.prototype.selectBtnInitFun=function(n){var t=n.commonObj,e="object"==typeof n.selectElem?n.selectElem:$(n.selectElem);if(!e)return!1;e.unbind("change").bind("change",function(e){t.imageChange(n,this)})};var imageChange=function(n,t){var e=n.elem,i=n.commonObj,o=null,a="object"==typeof e.imgElem?e.imgElem:$(e.imgElem),r=a[0];n.imgChangeFun(),o=t.files[0];var u=null;if(!o)return!1;i.uploadDiag(),o.type?o.type&&$.inArray(o.type,["image/jpeg","image/jpg","image/bmp","image/png","image/x-ms-bmp"])<0?i.failureDiag("<p>照片格式不符，</p><p>请重新上传</p>"):5242880<o.size?i.failureDiag("<p>照片超过5M，</p><p>请重新上传</p>"):(o.type&&((u=new FileReader).onload=function(){var e=a.height(),n=a.width();r.src=u.result,a.attr("height",e),a.attr("width",n)},u.readAsDataURL(o)),lrz(o,{width:1024}).then(function(e){t=o=null,i.receivedData(e,n)})):i.failureDiag("<p>照片格式不符，</p><p>请重新上传</p>")};function changeDiagWidth(){var e=$("body").width();$(".mfp-content").width(e-8)}function getNumFormStr(e){return e.replace(/[^0-9]/gi,"")}function getStrFromJson(e){if(!e||"object"!=typeof e)return"";var t="";return $.each(e,function(e,n){"object"!=typeof n&&(t+="&"+e+"="+n)}),t&&(t=t.substr(1)),t}function setLocalStorageFromJson(e){if(!e)return!1;$.each(e,function(e,n){if(!e||"null"==e||"undefined"==e)return!1;n&&"null"!=n&&"undefined"!=n||(n=""),window.localStorage.setItem(e,n)})}function diagInitFun(){$(".popup-with-zoom-anim").magnificPopup({type:"inline",fixedContentPos:!1,fixedBgPos:!0,overflowY:"auto",closeBtnInside:!1,preloader:!1,midClick:!0,modal:!0,removalDelay:300,mainClass:"my-mfp-zoom-in"})}function styleChangeFun(){var e=$(window).height(),n=$(window).width(),t=$("body").height();if(e<550)$(".ui-content .ui-top-bg img").attr("src","css/images/top_bg_02.png"),$(".ui-content .ui-top-icon").addClass("shortView"),$(".ui-content .ui-top-bg img").on("load",function(){var e=$(".ui-top-bg img").height();$(".ui-top-bg").height(e)});else{var i=$(".ui-top-bg img").height();0<i&&$(".ui-top-bg").height(i)}370<n&&$(".ui-content-tips").addClass("left-align"),t<e&&$("body").height(e),document.body.addEventListener("touchstart",function(){}),document.body.addEventListener("touchend",function(){})}function diagInfoStyleChang(e,n){var t=n.match(/<p>/g);t&&1<t.length||n&&0<n.indexOf("<br>")?e.removeClass("singleRow"):e.addClass("singleRow")}function btnOffsetFun(e){if(e[0]){var n=e.offset().top;e.attr("style","top:"+n+"px")}}myConstructFun.prototype.receivedData=function(e,t){var n=e.base64,i=e.base64Len;e=null;var o={};$.each(t.data,function(e,n){o[e]=n});var a=t.commonObj;$.extend(o,{uploadType:"0",fileData:encodeURIComponent(n),fileLen:i});var r=getStrFromJson(o);a.sureEnabledFlag=!1,a.successFlag=!1,a.nextEnabledFlag=!1,Util.ajax.postJson(srvMap.get("uploadOcrPic"),r,function(e,n){if("object"!=typeof e)return!1;"0000"==e.returnCode?t.successFun(e,a):a.failureDiag("<p>"+e.returnMessage+"</p>"),a.successFlag||"function"==typeof t.failureFun&&t.failureFun(),a.sureEnabledFlag?(a.diagClose(),a.sureBtnEnable(t)):a.sureBtnDisable(t),a.nextEnabledFlag?(a.diagClose(),a.nextBtnEnable(t)):a.nextBtnDisable(t)})},myConstructFun.prototype.sureBtnInitFun=function(e){var n=e.elem.sureElem,t="object"==typeof n?n:$(n);if(!t)return!1;t.addClass("disabled"),t.unbind("click").bind("click",function(){if($(this).hasClass("disabled"))return!1;"function"==typeof e.sureFun&&e.sureFun()})},myConstructFun.prototype.sureBtnEnable=function(e){var n=e.elem.sureElem,t="object"==typeof n?n:$(n);if(!t)return!1;t.removeClass("disabled")},myConstructFun.prototype.sureBtnDisable=function(e){var n=e.elem.sureElem,t="object"==typeof n?n:$(n);if(!t)return!1;t.addClass("disabled")},myConstructFun.prototype.nextBtnInitFun=function(t){var e=t.elem.nextElem,n="object"==typeof e?e:$(e);if(!n)return!1;n.addClass("disabled");var i=t.elem.nextUrl,o=this;n.unbind("click").bind("click",function(e){if($(this).hasClass("disabled"))return!1;if("function"==typeof t.nextFun){var n=t.nextFun();if("object"==typeof n&&null!=n)return void(n.nextUrlFlag&&o.nextStepFun(n,t))}i&&-1<i.indexOf("html")&&(window.location.href=i)})},myConstructFun.prototype.nextBtnEnable=function(e){var n=e.elem.nextElem,t="object"==typeof n?n:$(n);return!!t&&("0"!=this.imgUploadFlag&&void t.removeClass("disabled"))},myConstructFun.prototype.nextBtnDisable=function(e){var n=e.elem.nextElem,t="object"==typeof n?n:$(n);if(!t)return!1;t.addClass("disabled")},myConstructFun.prototype.diagClose=function(){$.magnificPopup.close(),diagInitFun()},myConstructFun.prototype.failureDiag=function(e){var n=$("#J_failure-dialog .rtnMsg");"string"==typeof e&&n.html(e),diagInfoStyleChang(n,e),$("#J_failure").trigger("click"),changeDiagWidth();var t=this,i=t.paramJson;i.selectElem="#refileselect_diag",t.selectBtnInitFun(i),$("#J_failure-dialog .cancel").unbind("click").bind("click",function(e){t.diagClose()})},myConstructFun.prototype.uploadDiag=function(e){var n=$("#J_onload-dialog .showInfo");"string"==typeof e&&n.html(e),$("#J_onload").trigger("click"),changeDiagWidth()},myConstructFun.prototype.successDiag=function(e){$("#J_success").trigger("click"),changeDiagWidth()},myConstructFun.prototype.oncheckDiag=function(e){$("#J_oncheck").trigger("click"),changeDiagWidth()},myConstructFun.prototype.ensureDiag=function(e,n){var t=$("#J_ensure-dialog .rtnMsg");"string"==typeof e&&t.html(e),diagInfoStyleChang(t,e),$("#J_ensure").trigger("click"),$(".mfp-bg").attr("style","opacity:0.6"),changeDiagWidth();var i=this;$("#J_ensure-dialog .sure_diag").unbind("click").bind("click",function(e){i.diagClose(),$(".mfp-bg").attr("style","opacity:0.6"),"function"==typeof n&&n()})},myConstructFun.prototype.editInitFun=function(e){if(!(!!e.otherInfo&&e.otherInfo.editInfoFlag))return!1;this.editElemClickFun(e)},myConstructFun.prototype.editElemClickFun=function(o){$("li .edit").unbind("click").bind("click",function(e){var n=$(e.currentTarget);if(n.hasClass("disabled"))return!1;var t=n.siblings("input"),i=n.siblings("textarea");t&&t.removeAttr("disabled"),i&&i.removeAttr("disabled"),(t=0<t.length?t:i).focus(),o.editFinishFun&&"function"==typeof o.editFinishFun&&o.editFinishFun()})},myConstructFun.prototype.saveElemClickFun=function(r){var e=$("li .save"),u=this;e.unbind("click").bind("click",function(e){var n=$(e.currentTarget),t=n.siblings("input"),i=n.siblings("textarea");t=0<t.length?t:i;var o=n.siblings(".edit"),a="";n.addClass("fn-hide"),o.removeClass("fn-hide"),t&&(a=t.val().trim(),-1<["输入姓名","输入行驶证车辆识别代码"].indexOf(a)&&t.val(""),t.attr("disabled","disabled")),u.editElemEnableFun(!0),u.nextBtnEnable(r),r.editFinishFun&&"function"==typeof r.editFinishFun&&r.editFinishFun()})},myConstructFun.prototype.editElemEnableFun=function(e){if(e)$("li .edit").removeClass("cur disabled"),$("li .edit").attr("src","css/images/icon_edit.png");else{var n=$("li .edit");n.addClass("disabled"),n.attr("src","css/images/icon_edit_disabled.png")}},myConstructFun.prototype.nextStepFun=function(u,s){var l=this;l.oncheckDiag(),Util.ajax.postJson(u.ajaxUrl,u.data,function(e,n){var t=!0,i="",o=s.data,a=!1;if(o.picType&&"R"==o.picType&&(a=!0),"0000"==e.returnCode)l.successDiag(),u.successFun(e),setTimeout(function(){var e=s.elem.nextUrl;e&&-1<e.indexOf("html")&&(l.diagClose(),window.location.href=e)},600);else if(-1!=e.returnMessage.indexOf("系统繁忙"))i="<p>系统繁忙，请稍候重试</p>",a?l.failureDiag(i):l.ensureDiag(i);else if("SCRM-404"==e.returnCode)i="<p>网络超时，请稍候重试</p>",a?l.failureDiag(i):l.ensureDiag(i);else{t=!1;var r=u.defaultTipsInfo||"";r||(r=""),"null"!=e.returnMessage&&"undefined"!=e.returnMessage||(e.returnMessage=""),i=r||"<p>提交失败，请您稍候重试</p>",a?l.failureDiag(e.returnMessage||i):l.ensureDiag(e.returnMessage||i)}t||u.failureFun(e)})},String.prototype.trim=function(){return this.replace(/\s+/g,"")},$(function(){diagInitFun();var e=window.navigator.userAgent.toLowerCase();-1<e.indexOf("QQBrowser")&&"micromessenger"!=e.match(/MicroMessenger/i)&&$("form input").removeAttr("capture"),styleChangeFun(),"function"==typeof onload&&onload()});