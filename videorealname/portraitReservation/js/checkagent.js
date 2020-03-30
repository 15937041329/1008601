(function () {
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    // console.log("userAgentInfo ", userAgentInfo);
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone", "RIM Tablet",
      "iPad", "iPod"
    ];
    var flag = true;
    if(!userAgentInfo) {
      // 获取不到  默认为手机端
      return false;
    }
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  var isPCflag = IsPC();
  if(isPCflag) {
    // document.querySelector("body").innerHTML = "<p style='text-align:center;font-size:14px;margin-top:20px;'>请使用手机操作</p>";
    window.location.href = "/errorPage.html";
  }
})();