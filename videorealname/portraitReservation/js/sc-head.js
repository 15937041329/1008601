var i, sel, imgtag, fr, maxWidth, maxHeight, iddocName, idNo, addr, ua = navigator.userAgent.toLowerCase();

function is_app() {
  return "sjyyt" == ua.match(/sjyyt/i)
}

function is_android() {
  return "android" == this.ua.match(/android/i)
}

function fileChooseCbk(e) {
  if ("0" == e) {
    var t;
    t = window.stub.getBase64Data(), imgCaptureDone((imgtag = document.getElementById("J_open_camera")).src = t)
  }
}

function imgCaptureDone(e) {
  changeData(e, myRecodTime)
}

function changeData(e, t) {
  $("#J_front_wrap").show(), flagMaskZ && (flagMaskZ = !1), waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "52%"), $("#J_onload").click(), waitTipsStyleFun(), $(".mfp-bg").addClass("loading"), nextBtnFlag = !1, $("#userName").val(""), $("#idNum").html(""), waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "52%"), $("#J_onload").click(), waitTipsStyleFun();
  var a = {
    base64: e,
    base64Len: e.length
  };
  console.log(a), receivedData(a.base64, a.base64Len)
}
ZJ = window.ZJ || {}, ZJ.Photo = {
  getPhoto: function (e) {
    window.stub.chooseFile(e)
  },
  getCamara: function (e) {
    window.stub.openCapture(e)
  }
}, $("#fileselect,#fileselect1").click(function (e) {
  is_android() && is_app() && ((e = e || event).preventDefault(), ZJ.Photo.getCamara(2e3))
});
var supportPhotoSign, selF, frF, imgtagF, serverData, min, period, subVerifyFval, notCheckedFlag = !1,
  marginValue = "",
  flagMaskZ = !0,
  myRecodTime = (new Date).getTime();
srvMap.add("frontUpload", "../../data/frontUpload.json", "saleCardMiniAppointment/uploadOcrPic"), srvMap.add("subVerifyR", "../../data/frontUpload.json", "saleCardMiniAppointment/verifyPicture"), srvMap.add("isSupportAlbumZF", "", "saleCardMiniAppointment/isSupportAlbumZF");
var notCheckedFlagF = !1,
  marginValueF = "",
  flagMaskF = !0,
  nextBtnFlag = !1;

function receivedData(e, t) {
  var a = {
    sourceCode: sourceCode,
    provCode: provCode,
    channelId: channelId,
    billId: billId,
    busiType: busiType,
    inputTransactionId: inputTransactionId || "",
    transactionId: transactionId,
    uploadType: "0",
    picType: "M",
    fileData: e,
    fileLen: t
  };
  a = $.param(a), Util.ajax.postJson(srvMap.get("frontUpload"), a, function (e, t) {
    if ("0000" == e.returnCode) Util.ajax.postJson(srvMap.get("subVerifyR"), a, function (e, t) {
      if ("0000" == e.returnCode) {
        try {
          MtaH5.clickStat("yuyuerenzheng1", {
            scheadsuc: "true"
          })
        } catch (e) {
          try {
            console.log(e.name + ": " + e.message)
          } catch (e) {}
        }
        "" == e.bean.callbackURL ? window.location.href = "sc-result.html" : window.location.href = e.bean.callbackURL.replace('http://wap.ha.10086.cn','')
      } else {
        if (!e.bean) return notCheckedFlag = !0, laterMask($("#J_open_camera")), $(".rtnMsg").css({
          "text-align": "center"
        }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".rtnMsg").text("请求超时，请重新操作"), void $(".mfp-bg").removeClass("loading");
        if ("no" == e.bean.isPopup) window.location.href = "sc-result.html?isPopup=no";
        else {
          if ("SCRM-404" != e.returnCode) return "系统异常" == e.returnMessage ? ($(".rtnMsg0").text(e.returnMessage), $("#J_failure").click(), $(".rtnMsg").css({
            "text-align": "center"
          }), $(".rtnMsg").addClass("rtnMsg2")) : (notCheckedFlag = !0, laterMask($("#J_open_camera")), $(".rtnMsg").css({
            "text-align": "center"
          }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".rtnMsg").text(e.returnMessage)), void $(".mfp-bg").removeClass("loading");
          networkTimeout()
        }
      }
      Util.lStorage.setParam("callbackURL", e.bean.callbackURL), Util.lStorage.setParam("isPopup", e.bean.isPopup), Util.lStorage.setParam("returnMessage", e.returnMessage)
    });
    else {
      if ("SCRM-404" != e.returnCode) return "系统异常" == e.returnMessage ? ($(".rtnMsg0").text(e.returnMessage), $("#J_failure").click(), $(".rtnMsg").css({
        "text-align": "center"
      }), $(".rtnMsg").addClass("rtnMsg2")) : (notCheckedFlag = !0, laterMask($("#J_open_camera")), $(".rtnMsg").css({
        "text-align": "center"
      }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".rtnMsg").text(e.returnMessage)), void $(".mfp-bg").removeClass("loading");
      networkTimeout()
    }
  })
}

function toFixed2(e) {
  return parseFloat(+e.toFixed(2))
}
sourceCode = Util.browser.getParameterjm("sourceCode") || Util.lStorage.getParam("sourceCode"), provCode = Util.browser.getParameterjm("provCode") || Util.lStorage.getParam("provCode"), channelId = Util.browser.getParameterjm("channelId") || Util.lStorage.getParam("channelId") || "wechat", transactionId = Util.browser.getParameterjm("transactionId") || Util.lStorage.getParam("transactionId"), inputTransactionId = Util.browser.getParameterjm("inputTransactionId") || Util.lStorage.getParam("inputTransactionId"), billId = Util.browser.getParameterjm("billId") || Util.lStorage.getParam("billId"), busiType = Util.browser.getParameterjm("busiType") || Util.lStorage.getParam("busiType"), $(function () {
  var e = {
    transactionId: transactionId,
    sourceCode: sourceCode
  };
  e = $.param(e), Util.ajax.postJson(srvMap.get("isSupportAlbumZF"), e, function (e, t) {
    if ("0000" != e.returnCode) return $(".rtnMsg").text(e.returnMessage), void $("#J_failure").click();
    supportPhotoSign = e.bean.supportPhotoSign, "1" != e.bean.supportPhotoSign || $("#fileselect").removeAttr("capture", "camera")
  }), imgtag = document.getElementById("J_open_camera"), "370" < $("body").width() && ($(".ui-content-tipsInfo").css({
    "font-size": "14px"
  }), $(".ui-content-checkinfo").css({
    "font-size": "15px"
  })), $(window).width() < 330 && $(".ui-content-center-des").attr("style", "margin-left:-5%");
  try {
    (sel = document.getElementById("fileselect")).addEventListener("change", function (e) {
      try {
        MtaH5.clickStat("yuyuerenzheng1", {
          schead: "true"
        })
      } catch (e) {
        try {
          console.log(e.name + ": " + e.message)
        } catch (e) {}
      }
      $("#J_front_wrap").show(), flagMaskZ && (flagMaskZ = !1), waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "52%"), $("#J_onload").click(), waitTipsStyleFun();
      var t = this.files[0];
      if (t) {
        $(".mfp-bg").addClass("loading"), nextBtnFlag = !1, $("#userName").val(""), $("#idNum").html("");
        var a = (new Date).getTime(),
          n = myRecodTime;
        if ("1" != supportPhotoSign && t.lastModifiedDate) {
          var i = t.lastModifiedDate.getTime();
          // if (i + 2e3 < n || a < i - 1e3) return myRecodTime = (new Date).getTime(), $(".rtnMsg").text("不能选择相册文件，请重新拍摄"), $("#J_failure").click(), void $(".mfp-bg").removeClass("loading")
        }
        if (t.type) t.type && "image/jpeg" != t.type && "image/jpg" != t.type && "image/bmp" != t.type && "image/png" != t.type && "image/x-ms-bmp" != t.type ? (myRecodTime = (new Date).getTime(), $(".rtnMsg").text("照片格式不符，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")) : 15728640 < t.size ? (laterMask($("#J_open_camera")), $("#J_open_camera").attr("src", "css/images/sc_head_figure.png"), myRecodTime = (new Date).getTime(), $(".rtnMsg").text("照片文件过大，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")) : (t.type && ((fr = new FileReader).onload = function () {
          imgtag.src = fr.result
        }, fr.readAsDataURL(t)), lrz(t, {
          width: 1024
        }).then(function (e) {
          return receivedData(e.base64, e.base64Len), e
        }));
        else {
          var r = URL.createObjectURL(t);
          if (imgtag.src = r, imgtag.css("height", heightImg), imgtag.onload = function () {
              URL.revokeObjectURL(r)
            }, myRecodTime = (new Date).getTime(), 15728640 < t.size) return $(".rtnMsg").text("照片文件过大，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1;
          lrz(t, {
            width: 1024
          }).then(function (e) {
            var t = e.base64.split(";")[0];
            return -1 < t.indexOf("image/jpeg") || -1 < t.indexOf("image/jpg") || -1 < t.indexOf("image/bmp") || -1 < t.indexOf("image/png") || -1 < t.indexOf("image/x-ms-bmp") ? (receivedData(e.base64, e.base64Len), e) : ($(".rtnMsg").text("照片格式不符，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1)
          })
        }
        $(window).scrollTop(0)
      } else $.magnificPopup.close()
    })
  } catch (e) {
    alert("对不起，您的浏览器不支持拍照功能，请使用其他浏览器")
  }
  $(".popup-with-zoom-anim").magnificPopup({
    type: "inline",
    fixedContentPos: !1,
    fixedBgPos: !0,
    overflowY: "auto",
    closeBtnInside: !1,
    preloader: !1,
    midClick: !0,
    modal: !0,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in"
  })
});
var magnificPopupClose = function () {
  $.magnificPopup.close(), notCheckedFlag && (notCheckedFlag = !1, setTimeout(function () {
    $(".zoom-anim-dialog p span").html(""), $(".rtnMsg").css({
      "text-align": "center"
    }), $(".rtnMsg").removeClass("rtnMsg2")
  }, 500))
};

function networkTimeout() {
  $(".zoom-anim-dialog p span").html("网络超时"), $(".rtnMsg").text("网络超时，请稍候重试"), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), myRecodTime = (new Date).getTime(), $("#J_failure").click(), notCheckedFlag = !0
}

function syestemBusy() {
  $(".zoom-anim-dialog p span").html("系统繁忙"), $(".rtnMsg").text("系统繁忙，请稍候重试"), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), myRecodTime = (new Date).getTime(), notCheckedFlag = !0
}

function waitTipsStyle() {
  marginValue = "60%"
}

function waitTipsStyleFun() {
  $("div#J_oncheck-dialog").css({
    "margin-top": marginValue
  })
}

function laterMask(e) {
  $(".p_position").removeClass("fn-hide"), $(".again").removeClass("fn-hide")
}
$(".cancel").click(function () {
  magnificPopupClose()
});