var ua = navigator.userAgent.toLowerCase();

function is_app() {
  return "sjyyt" == ua.match(/sjyyt/i)
}

function is_android() {
  return "android" == this.ua.match(/android/i)
}

function fileChooseCbk(e) {
  if ("0" == e) {
    var a;
    a = window.stub.getBase64Data(), imgCaptureDone((imgtag = card_flag ? document.getElementById("J_open_camera") : document.getElementById("J_open_cameraF")).src = a)
  }
}
ZJ = window.ZJ || {};
var i, sel, imgtag, fr, maxWidth, maxHeight, iddocName, idNo, addr, card_flag = !(ZJ.Photo = {
  getPhoto: function (e) {
    window.stub.chooseFile(e)
  },
  getCamara: function (e) {
    window.stub.openCapture(e)
  }
});

function imgCaptureDone(e) {
  card_flag ? changeData(e, myRecodTime) : changeDataF(e, myRecodTime)
}

function changeData(e, a) {
  $("#J_front_wrap").show(), waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "52%"), $("#J_onload").click(), waitTipsStyleFun(), $(".mfp-bg").addClass("loading"), nextBtnFlag = !1, $("#userName").val(""), $("#idNum").html("");
  var t = {
    base64: e,
    base64Len: e.length
  };
  console.log(t), receivedData(t.base64, t.base64Len)
}

function changeDataF(e, a) {
  waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "110%"), $("#J_onload").click(), waitTipsStyleFun(), $(".mfp-bg").addClass("loading"), nextBtnFlag = !1, Util.lStorage.setParam("dataF", ""), Util.lStorage.setParam("PICURLF", ""), $("#valid_period").html("");
  var t = {
    base64: e,
    base64Len: e.length
  };
  console.log(t), receivedDataF(t.base64, t.base64Len)
}
$("#fileselect,#fileselect1").click(function (e) {
  (card_flag = "fileselect" == $(this).attr("id"), is_android() && is_app()) && ((e = e || event).preventDefault(), ZJ.Photo.getCamara(2e3))
});
var selF, frF, imgtagF, serverData, min, period, subVerifyFval, reviseName, notCheckedFlag = !1,
  marginValue = "",
  flagMaskZ = !0,
  myRecodTime = (new Date).getTime();
srvMap.add("checkStepPage", "", "busiNoJump/checkStepApp"), srvMap.add("frontUpload", "../../data/frontUpload.json", "saleCardMiniAppointment/uploadOcrPic"), srvMap.add("verifyZF", "../../data/verifyZF.json", "saleCardMiniAppointment/verifyZF"), srvMap.add("isSupportAlbumZF", "", "saleCardMiniAppointment/isSupportAlbumZF");
var sourceCodeOk, notCheckedFlagF = !1,
  marginValueF = "",
  flagMaskF = !0;
srvMap.add("bhdUpload", "../../data/fan_test.json", "saleCardMiniAppointment/uploadOcrPic");
var nextBtnFlag = !1;

function receivedData(e, a) {
  var t = {
    sourceCode: paramsJson.sourceCode,
    provCode: paramsJson.provCode,
    channelId: paramsJson.channelId,
    busiType: "33",
    inputTransactionId: paramsJson.inputTransactionId || "",
    transactionId: paramsJson.transactionId,
    uploadType: "0",
    picType: "Z",
    fileData: e,
    fileLen: a
  };
  t = $.param(t), Util.ajax.postJson(srvMap.get("frontUpload"), t, function (e, a) {
    if ("0000" == e.returnCode) {
      dataZ = JSON.stringify(e), Util.lStorage.setParam("dataZ", dataZ), Util.lStorage.setParam("picUrlZ", e.bean.picUrlZ);
      var t = e.bean.iddocName;
      reviseName = e.bean.iddocName;
      var n = e.bean.idNo;
      if ("身份证号为空" == e.bean.idNo || "" == e.bean.iddocName || "" == e.bean.idNo) magnificPopupClose(), $(".mfp-bg").removeClass("loading"), laterFail($("#J_open_camera"));
      else {
        $.magnificPopup.close(), setTimeout(function () {
          $("#J_front_check").find("section").addClass("tab_head_hide"), $("#J_front_check").find("ul").slideDown(300), $("#userName").val(t), n = n.substring(0, 3) + " " + n.substring(3, 6) + " " + n.substring(6, 10) + " " + n.substring(10, 14) + " " + n.substring(14), $("#idNum").html(n), $(".opacityBox").css("display", "none"), listenInfo()
        }, 500);
        try {
          MtaH5.clickStat("yuyuerenzheng1", {
            scportesuc: "true"
          })
        } catch (e) {
          try {
            console.log(e.name + ": " + e.message)
          } catch (e) {}
        }
      }
      laterMask($("#J_open_camera"))
    } else -1 != e.returnMessage.indexOf("系统繁忙") ? ($(".mfp-bg").removeClass("loading"), syestemBusy()) : "SCRM-404" == e.returnCode ? ($(".mfp-bg").removeClass("loading"), networkTimeout(), laterFail($("#J_open_camera"))) : (notCheckedFlag = !0, setTimeout(function () {
      $("#J_front_check").find("section").addClass("tab_head_hide"), $("#J_front_check").find("ul").slideDown(300), listenInfo()
    }, 500), laterFail($("#J_open_camera")), magnificPopupClose(), $(".mfp-bg").removeClass("loading"))
  })
}

function receivedDataF(e, a) {
  var t = {
    sourceCode: paramsJson.sourceCode,
    provCode: paramsJson.provCode,
    channelId: paramsJson.channelId,
    busiType: "33",
    inputTransactionId: paramsJson.inputTransactionId || "",
    transactionId: paramsJson.transactionId,
    picType: "F",
    uploadType: "0",
    fileData: e,
    fileLen: a
  };
  t = $.param(t), Util.ajax.postJson(srvMap.get("bhdUpload"), t, function (e, a) {
    if ("0000" == e.returnCode) {
      try {
        MtaH5.clickStat("yuyuerenzheng1", {
          scnationsuc: "true"
        })
      } catch (e) {
        try {
          console.log(e.name + ": " + e.message)
        } catch (e) {}
      }
      dataF = JSON.stringify(e), Util.lStorage.setParam("dataF", dataF), Util.lStorage.setParam("picUrlF", e.bean.picUrlF), $("#valid_period").html(e.bean.certValidExpdate), period = (period = e.bean.certValidExpdate).split("-"), min = period[0], certExpdate = period[1], "有效期为空" == e.bean.certValidExpdate || "" == e.bean.lssauth || "" == e.bean.certValidExpdate ? ($(".mfp-bg").removeClass("loading"), magnificPopupClose(), laterFail($("#J_open_cameraF"))) : ($.magnificPopup.close(), listenInfo()), $(".watermark2").removeClass("mfp-hide"), laterMask($("#J_open_cameraF"))
    } else -1 != e.returnMessage.indexOf("系统繁忙") ? ($(".mfp-bg").removeClass("loading"), syestemBusy()) : "SCRM-404" == e.returnCode ? ($(".mfp-bg").removeClass("loading"), networkTimeout(), laterFail($("#J_open_cameraF"))) : (notCheckedFlagF = !0, laterFail($("#J_open_cameraF")), magnificPopupClose(), $(".mfp-bg").removeClass("loading"))
  })
}

function toFixed2(e) {
  return parseFloat(+e.toFixed(2))
}
myObject = new myConstructFun, paramsJson = myObject.getQueryStringArgs(), Util.lStorage.setParam("sourceCode", paramsJson.sourceCode), Util.lStorage.setParam("inputTransactionId", paramsJson.inputTransactionId), Util.lStorage.setParam("provCode", paramsJson.provCode), Util.lStorage.setParam("billId", paramsJson.billId), Util.lStorage.setParam("busiType", "33"), Util.lStorage.setParam("channelId", "wechat"), Util.lStorage.setParam("transactionId", paramsJson.transactionId), $(function () {
  $(".bgdown").click(function () {
    $("#meng").hide(), $(".bgtop").hide(), $(".bgstep_1").hide(), $(".bgstep_2").hide(), $(".bgstep1_3").hide(), $(".bgstep2_3").hide(), $(".bgdown").hide()
  }), $("#edit_icon").click(function () {
    $("#userName").focus()
  });
  var e = {
    transactionId: paramsJson.transactionId,
    sourceCode: paramsJson.sourceCode
  };
  e = $.param(e), Util.ajax.postJson(srvMap.get("isSupportAlbumZF"), e, function (e, a) {
    "0000" == e.returnCode ? (sourceCodeOk = e.bean.sourceCodeOk, "1" == e.bean.sourceCodeOk && ($("#fileselect").removeAttr("capture", "camera"), $("#fileselect1").removeAttr("capture", "camera"))) : console.log(e.returnMessage)
  }), imgtag = document.getElementById("J_open_camera"), $("#J_open_camera,.watermark1,#sucz,#again,#Mongo,.fai1,.succ1,.takPic1").click(function () {
    $("#J_pcz").click();
    try {
      (sel = document.getElementById("fileselect")).addEventListener("change", function (e) {
        try {
          MtaH5.clickStat("yuyuerenzheng1", {
            scporte: "true"
          })
        } catch (e) {
          try {
            console.log(e.name + ": " + e.message)
          } catch (e) {}
        }
        $("#J_front_wrap").show(), flagMaskZ && (flagMaskZ = !1, $("#J_open_camera").attr("src", "./videorealname/portraitReservation/css/images/shenfenzheng_03.png")), waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "52%"), $("#J_onload").click(), waitTipsStyleFun();
        var a = this.files[0];
        if (a) {
          $(".mfp-bg").addClass("loading"), nextBtnFlag = !1, $("#userName").val(""), $("#idNum").html("");
          (new Date).getTime();
          if ("1" != sourceCodeOk && a.lastModifiedDate) a.lastModifiedDate.getTime();
          if (a.type) a.type && "image/jpeg" != a.type && "image/jpg" != a.type && "image/bmp" != a.type && "image/png" != a.type && "image/x-ms-bmp" != a.type ? (myRecodTime = (new Date).getTime(), $(".rtnMsg0").text("头像面照片格式不符，请重新拍摄"), laterFail($("#J_open_camera")), $("#Mongo").addClass("p_hide"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")) : 15728640 < a.size ? (myRecodTime = (new Date).getTime(), $(".rtnMsg0").text("头像面照片文件过大，请重新拍摄"), laterFail($("#J_open_camera")), $("#Mongo").addClass("p_hide"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")) : (a.type && ((fr = new FileReader).onload = function () {
            imgtag.src = fr.result
          }, fr.readAsDataURL(a)), console.log(a), lrz(a, {
            width: 1024
          }).then(function (e) {
            return receivedData(e.base64, e.base64Len), e
          }));
          else {
            var t = URL.createObjectURL(a);
            if (imgtag.src = t, imgtag.css("height", heightImg), imgtag.onload = function () {
                URL.revokeObjectURL(t)
              }, myRecodTime = (new Date).getTime(), 15728640 < a.size) return $(".rtnMsg0").text("头像面照片文件过大，请重新拍摄"), $("#J_failure").click(), !1;
            lrz(a, {
              width: 1024
            }).then(function (e) {
              var a = e.base64.split(";")[0];
              return -1 < a.indexOf("image/jpeg") || -1 < a.indexOf("image/jpg") || -1 < a.indexOf("image/bmp") || -1 < a.indexOf("image/png") || -1 < a.indexOf("image/x-ms-bmp") ? (receivedData(e.base64, e.base64Len), e) : ($(".rtnMsg0").text("头像面照片格式不符，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1)
            })
          }
          $(window).scrollTop(0)
        } else $.magnificPopup.close()
      })
    } catch (e) {
      alert("对不起，您的浏览器不支持拍照功能，请使用其他浏览器")
    }
  }), imgtagF = document.getElementById("J_open_cameraF");
  try {
    (selF = document.getElementById("fileselect1")).addEventListener("change", function (e) {
      try {
        MtaH5.clickStat("yuyuerenzheng1", {
          scnation: "true"
        })
      } catch (e) {
        try {
          console.log(e.name + ": " + e.message)
        } catch (e) {}
      }
      waitTipsStyle(), $("#J_onload-dialog").css("margin-top", "110%"), $("#J_onload").click(), waitTipsStyleFun(), flagMaskF && (flagMaskF = !1, $("#J_open_cameraF").attr("src", "./videorealname/portraitReservation/css/images/guohui_03.png"));
      var a = selF.files[0];
      if (a) {
        var t = (new Date).getTime(),
          n = myRecodTime;
        if ("1" != sourceCodeOk && a.lastModifiedDate) {
          var i = a.lastModifiedDate.getTime();
          if (i + 2e3 < n || t < i - 1e3) return myRecodTime = (new Date).getTime(), $(".rtnMsg0").text("不能选择相册文件，请重新拍摄"), $("#J_failure").click(), void $(".mfp-bg").removeClass("loading")
        }
        if ($(".mfp-bg").addClass("loading"), nextBtnFlag = !1, $("#valid_period").html(""), a.type)
          if ("image/jpeg" != a.type && "image/jpg" != a.type && "image/bmp" != a.type && "image/png" != a.type && "image/x-ms-bmp" != a.type) $(".rtnMsg0").text("国徽面照片格式不符，请重新拍摄"), laterFail($("#J_open_cameraF")), $("#Mongo2").addClass("p_hide"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), myRecodTime = (new Date).getTime();
          else if (15728640 < a.size) $(".rtnMsg0").text("国徽面照片文件过大，请重新拍摄"), laterFail($("#J_open_cameraF")), $("#Mongo2").addClass("p_hide"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), myRecodTime = (new Date).getTime();
        else {
          (frF = new FileReader).onload = function () {
            imgtagF.src = frF.result
          }, frF.readAsDataURL(a);
          lrz(this.files[0], {
            width: 1024,
            quality: .7
          }).then(function (e) {
            return receivedDataF(e.base64, e.base64Len), e
          })
        } else {
          var s = URL.createObjectURL(a);
          if (imgtagF.src = s, imgtagF.onload = function () {
              URL.revokeObjectURL(s)
            }, myRecodTime = (new Date).getTime(), 15728640 < a.size) return $(".rtnMsg0").text("国徽面照片文件过大，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1;
          lrz(a, {
            width: 1024
          }).then(function (e) {
            var a = e.base64.split(";")[0];
            return -1 < a.indexOf("image/jpeg") || -1 < a.indexOf("image/jpg") || -1 < a.indexOf("image/bmp") || -1 < a.indexOf("image/png") || -1 < a.indexOf("image/x-ms-bmp") ? (receivedDataF(e.base64, e.base64Len), e) : ($(".rtnMsg0").text("国徽面照片格式不符，请重新拍摄"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1)
          })
        }
      } else $.magnificPopup.close()
    })
  } catch (e) {
    alert("对不起，您的浏览器不支持拍照功能，请使用其他浏览器")
  }
  "370" < $("body").width() && ($(".ui-content-tipsInfo").css({
    "font-size": "14px"
  }), $(".ui-content-checkinfo").css({
    "font-size": "15px"
  })), $(window).width() < 330 && $(".ui-content-center-des").attr("style", "margin-left:-5%"), $(".popup-with-zoom-anim").magnificPopup({
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
  $(".zoom-anim-dialog p span").html("网络超时"), $(".rtnMsg0").text("网络超时，请稍候重试"), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), myRecodTime = (new Date).getTime(), $("#J_failure").click(), notCheckedFlag = !0
}

function syestemBusy() {
  $(".zoom-anim-dialog p span").html("系统繁忙"), $(".rtnMsg0").text("系统繁忙，请稍候重试"), $(".rtnMsg").css({
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
  e.parents(".id_show").find("img").eq(0).removeClass("p_hide"), e.parents(".id_show").find("img").eq(2).removeClass("p_hide"), e.parents(".id_show").find("img").eq(3).addClass("p_hide"), e.parents(".id_show").find("img").eq(4).removeClass("p_hide"), e.parents(".id_show").find(".p_position").eq(0).addClass("p_hide"), e.parents(".id_show").find(".p_position").eq(1).removeClass("p_hide"), e.parents(".id_show").find(".p_position").eq(2).addClass("p_hide")
}

function laterFail(e) {
  e.parents(".id_show").find("img").eq(0).addClass("p_hide"), e.parents(".id_show").find("img").eq(2).addClass("p_hide"), e.parents(".id_show").find("img").eq(3).removeClass("p_hide"), e.parents(".id_show").find("img").eq(4).removeClass("p_hide"), e.parents(".id_show").find(".p_position").eq(0).removeClass("p_hide"), e.parents(".id_show").find(".p_position").eq(1).addClass("p_hide"), e.parents(".id_show").find(".p_position").eq(2).addClass("p_hide")
}

function listenInfo() {
  return "" == $("#idNum").html() || "" == $("#valid_period").html() ? ($("#J_behind_check_next").css("background-color", "#b1c1c1"), nextBtnFlag = !1) : 0 == $("#userName").val().trim().length ? ($("#edit_icon").css("display", "none"), $("#J_behind_check_next").css("background-color", "#b1c1c1"), nextBtnFlag = !1) : ($("#edit_icon").css("display", "block"), $("#J_behind_check_next").css("background-color", "#05cbd8"), void(nextBtnFlag = !0))
}

function vilDate() {
  myRecodTime = (new Date).getTime();
  var e = !1;
  min = period[0];
  var a = period[1],
    t = CurentTime(),
    n = min.substring(0, 4) + min.substring(5, 7) + min.substring(8, 10),
    i = t.substring(0, 4) + t.substring(5, 7) + t.substring(8, 10); - 1 == a.indexOf("长期") ? e = i < a.substring(0, 4) + a.substring(5, 7) + a.substring(8, 10) : e = !0;
  if (n < i && e) {
    $("#J_oncheck").click();
    var s = JSON.parse(Util.lStorage.getParam("dataF")).bean.lssauth;
    if ("" == s || null == s) return $(".rtnMsg0").text("签发机关不能为空!"), $("#J_failure").click(), $(".rtnMsg").css({
      "text-align": "center"
    }), $(".rtnMsg").addClass("rtnMsg2"), void $(".mfp-bg").removeClass("loading")
  } else $(".rtnMsg0").text("证件不在有效期内，请重新核对!"), $("#J_failure").click(), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), $(".mfp-bg").removeClass("loading")
}

function getNumFormStr(e) {
  return e.replace(/[^0-9]/gi, "")
}

function CurentTime() {
  var e = new Date,
    a = e.getFullYear(),
    t = e.getMonth() + 1,
    n = e.getDate(),
    i = a + "-";
  return t < 10 && (i += "0"), i += t + "-", n < 10 && (i += "0"), i += n + " "
}

function verifyFailure() {
  $("#J_upload2").unbind("click"), $(".zoom-anim-dialog p span").html("识别失败"), $(".rtnMsg0").text("身份证有效期识别出错"), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")
}
$(".cancel").click(function () {
  magnificPopupClose()
}), $("#userName").bind("input propertychange", listenInfo), $("#J_behind_check_next").click(function (e) {
  var a = $("#userName").val().trim();
  if (reviseName != a) try {
    MtaH5.clickStat("namerevise")
  } catch (e) {
    try {
      console.log(e.iddocName + ": " + e.message)
    } catch (e) {}
  }
  try {
    MtaH5.clickStat("yuyuerenzheng1", {
      scverify: "true"
    })
  } catch (e) {
    try {
      console.log(e.name + ": " + e.message)
    } catch (e) {}
  }
  if (0 == nextBtnFlag) return !1;
  $("#J_behind_check_next").css("background-color", "#b1c1c1"), nextBtnFlag = !1, myRecodTime = (new Date).getTime();
  var t = Util.lStorage.getParam("dataZ");
  t = JSON.parse(t), console.log(t), "男" == t.bean.iddocGenCd ? t.bean.iddocGenCd = "男" : t.bean.iddocGenCd = "女";
  t.bean.birthDate;
  var n = getNumFormStr(t.bean.birthDate),
    i = n.substr(0, 4),
    s = n.substr(4, 2),
    o = n.substr(6, 2);
  if ("13" == (serverData = JSON.parse(dataF)).bean.certValidExpdate.length || "21" == serverData.bean.certValidExpdate.length) var r = !0;
  else r = !1;
  serverData.bean.lssauth && r ? vilDate() : ($(".rtnMsg0").text("国徽面信息识别出错，请重新识别"), $("#J_failure").click(), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"));
  var l = Util.date.dateTime2str(new Date, "hhmmss"),
    c = {
      specialTime: l,
      sourceCode: paramsJson.sourceCode,
      provCode: paramsJson.provCode,
      channelId: paramsJson.channelId,
      busiType: "33",
      billId: paramsJson.billId,
      inputTransactionId: paramsJson.inputTransactionId || "",
      transactionId: paramsJson.transactionId,
      iddocName: strEnc($("#userName").val().trim(), "zyzx2fyZ", l),
      idNo: strEnc(t.bean.idNo, "zyzx2fyZ", l),
      ethnicNm: t.bean.ethnicNm,
      iddocAddr: strEnc(t.bean.iddocAddr, "zyzx2fyZ", l),
      iddocGenCd: t.bean.iddocGenCd,
      birthDate: i + "年" + s + "月" + o + "日",
      lssauth: encodeURIComponent(serverData.bean.lssauth),
      certValiddate: min,
      certExpdate: certExpdate
    },
    d = c;
  c = $.param(c), Util.ajax.postJson(srvMap.get("verifyZF"), c, function (e, a) {
    if ("0000" == e.returnCode) {
      try {
        MtaH5.clickStat("yuyuerenzheng1", {
          scverifysuc: "true"
        })
      } catch (e) {
        try {
          console.log(e.name + ": " + e.message)
        } catch (e) {}
      }
      Util.lStorage.setParam("requestSource", d.requestSource), 
      Util.lStorage.setParam("requestType", d.dataZtemp),
       $.magnificPopup.close(), $("#J_success").trigger("click"), 
       $("#logonForm").attr("action", srvMap.get("checkStepPage")), 
       document.getElementById("transactionId").value = paramsJson.transactionId, document.getElementById("busiType").value = "33", document.getElementById("provCode").value = paramsJson.provCode, document.getElementById("jumpNum").value = "2", document.getElementById("sourceCode").value = paramsJson.sourceCode, document.getElementById("billId").value = paramsJson.billId, document.getElementById("inputTransactionId").value = paramsJson.inputTransactionId, document.getElementById("channelId").value = paramsJson.channelId;
      //  $("#logonForm").submit()

       var xhr=new XMLHttpRequest();
       xhr.open('POST',srvMap.get("checkStepPage"),true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
       xhr.onreadystatechange=function(){
           if(xhr.readyState==4){
             console.log(xhr);
             window.location.href = xhr.responseURL.replace('https://activate.online-cmcc.cn/edcreg-web/videorealname/portraitReservation','')
           }
       }
       xhr.send($("#logonForm").serialize());
    } else {
      if ("5555" == e.returnCode) return $(".rtnMsg0").text(e.returnMessage), $(".rtnMsg").css({
        "text-align": "center"
      }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading"), !1; - 1 != e.returnMessage.indexOf("系统繁忙") ? ($("#J_behind_check_next").css("background-color", "#05cbd8"), nextBtnFlag = !0, syestemBusy(), $(".mfp-bg").removeClass("loading")) : "SCRM-404" == e.returnCode ? ($("#J_behind_check_next").css("background-color", "#05cbd8"), nextBtnFlag = !0, networkTimeout()) : ("系统异常" == e.returnMessage && ($("#J_behind_check_next").css("background-color", "#05cbd8"), nextBtnFlag = !0), $(".rtnMsg0").text(e.returnMessage), $("#J_failure").click(), $(".rtnMsg").css({
        "text-align": "center"
      }), $(".rtnMsg").addClass("rtnMsg2"), $(".mfp-bg").removeClass("loading"))
    }
  })
}), String.prototype.trim = function () {
  return this.replace(/\s+/g, "")
}, $(".opacityBox").click(function () {
  myRecodTime = (new Date).getTime(), $("#J_upload2").unbind("click"), $(".zoom-anim-dialog p span").html(""), $(".rtnMsg0").text("请先拍摄身份证头像面照片"), $(".rtnMsg").css({
    "text-align": "center"
  }), $(".rtnMsg").addClass("rtnMsg2"), $("#J_failure").click(), $(".mfp-bg").removeClass("loading")
});