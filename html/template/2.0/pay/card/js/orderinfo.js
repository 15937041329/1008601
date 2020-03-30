// 添加抖音统计
(function(r,d,s,l){var meteor=r.meteor=r.meteor||[];meteor.methods=["track","off","on"];meteor.factory=function(method){return function(){
  var args=Array.prototype.slice.call(arguments);args.unshift(method);meteor.push(args);return meteor}};for(var i=0;i<meteor.methods.length;i++){
  var key=meteor.methods[i];meteor[key]=meteor.factory(key)}meteor.load=function(){var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);
  js.src="https://analytics.snssdk.com/meteor.js/v1/"+l+"/sdk";fjs.parentNode.insertBefore(js,fjs)};meteor.load();if(meteor.invoked){return}
  meteor.invoked=true;meteor.track("pageview")})(window,document,"script","1661113790764045");
// 添加抖音统计
/*订单填写页*/
$(function () {	 
	//实体卡默认支付方式为微信
	if($("#iccid").val()!="" || is_weixn()){
		$("#paytype").val("WXPAY");
		$("#wx").addClass("on-checked");
	}else{//默认支付方式为支付宝
		$("#paytype").val("ALIPAY");
		$("#zfb").addClass("on-checked");
	}
	
	//弹出归属地选择框
	$('.choice-area a,#rName').click(function(){
		var prettyNum=$("#prettyNum").val();
		if("Y"==prettyNum){
			return;	
		}
		$('#id-selectregion').removeClass("border-red");
		$('.selectregion-pop').show();
	});
	// 默认选中郑州
	// $("#region").val('A');
	// $("#rName").val('郑州');
	//选择地市
	$('.selCity').click(function () {
		if($(this).data("cityid")!=$("#region").val()){
			$("#region").val($(this).data("cityid"));
			$("#rName").val($(this).data("cityname"));
			$("#cardnum").val("");
			$("#cNum").val("");
            setOtherCitySendType();
		}
        setSendType();
		$('.selectregion-pop').hide();
	});
	
	var sumpage=0;//总页数
	var nowpage=1;//当前页
	var nomsg="";//无号码时显示信息
	//转向选号界面 
	$('.tocard,#cNum').click(function(){
		var plancode=$("#plancode").val();
		var prettyNum=$("#prettyNum").val();
		if("Y"==prettyNum){
			return;	
		}
		//选择号码归属地
		var region=$("#region").val();
		var rName=$("#rName").val();
		if(rName=="" && 'channel_jyxx'!=channelheader){
			showMsg("请选择号码归属地");
			$('#id-selectregion').addClass("border-red");
			return;	
		}
		
		if(nomsg=="正在加载，请稍后..."){
			return;
		}else{
			//1.先弹出号码展示层	
			nomsg="正在加载，请稍后...";
			sumpage=0;
			$(".svcnumdiv").empty();
			$(".select-num-list").empty();
			$(".no-num").hide();
			$('.select-num-pop').show();
			$('.poploading').show();
    		$('body').css("overflow","hidden");
		}
		var mId=$('#mealid').length>0?$("#mealid").val():"";
		//2.再加载号码
		$.ajax({
			type : "POST",
			url : '/pay/card-sale!queryCard.action',
			dataType : 'json',
			data : {mealid:mId,region:region,sourcetype:$("#sourcetype").val(),endStr:$("#endStr").val(),iccid:$("#iccid").val(),plancode:plancode},
			async: true,
			success : function(data) {
				nomsg="";
				$('.poploading').hide();
				var returnCode=data.returnCode;
				if(returnCode!=null && returnCode !=""){//无数据
					sumpage=0;
		        	nowpage=1;
		        	nomsg=data.returnMessage;
				}else{
		        	var obj = eval(data);
	                $(obj).each(function (index) {
	                	var val = obj[index];
	                    $(".svcnumdiv").append("<li data-plancode='"+val.plancode+"' data-rgname='"+val.regionName+"' data-cardsvcnum='"+val.cardsvcnum+"' data-pagenum='"+val.pagenum+"' data-cardregion='"+val.cardregion+"'>"+ val.cardsvcnum +"</li>");
	                });
	                sumpage=Math.ceil(data.length/10);
	                nowpage=1;
				}
                svcnumshow();
			},
			error : function(html) {
				nomsg="";
				$('.poploading').hide();
				svcnumshow();
				return;
			},
			timeout : function(html) {
				nomsg="";
				$('.poploading').hide();
				svcnumshow();
				return;
			}
		});	
	});
	//选择号码
 	$(".select-num-list").on("click",'li',function(){
		var cardnum=$(this).find('a:eq(0)').data("cardsvcnum");
		var cardregion=$(this).find('a:eq(0)').data("cardregion");
		var pcode=$(this).find('a:eq(0)').data("plancode");
		$("#cardnum").val(cardnum);
		$("#region").val(cardregion);
		$("#plancode").val(pcode);
		$("#cNum").val(cardnum);
		if('channel_jyxx'==channelheader){
            var rgname=$(this).find('a:eq(0)').data("rgname");
            $("#rName").val(rgname);
		}
		$('body').css("overflow","auto");
		$('.select-num-pop').hide();
		$("#endStr").val("");
	});
	//换一批
	$(".change").click(function (){
		if(nomsg=="正在加载，请稍后..."){
			return;
		}
		svcnumshow();
	});
	//分页显示号码
	function svcnumshow(){
		$(".select-num-list").empty();
		if(sumpage>0){//总页数大于0
			$(".svcnumdiv li").each(function () {
				var cardsvcnum=$(this).data("cardsvcnum");
				var pnum=$(this).data("pagenum");
				var pcode=$(this).data("plancode");
                var rgname=$(this).data("rgname");
				if(pnum==nowpage){
					$(".select-num-list").append("<li><a class='selsvc' data-plancode='"+pcode+"' data-rgname='"+rgname+"' data-cardsvcnum='"+cardsvcnum+"' data-cardregion='"+$(this).data("cardregion")+"'>"+cardsvcnum+"</a></li>");
				}
			});
			if (nowpage>=sumpage){//当前页数等于总页数
				nowpage=1;
			}else{
				nowpage++;
			}
		}else{//无数据
			if(nomsg=="") nomsg="抱歉没有匹配的号码";
			$(".no-num").html(nomsg);
			$(".no-num").show();
		}
	}
	//关闭选择号码弹出框
	$('.select-num-pop  .closecard').click(function(){
		$('body').css("overflow","auto");
		$('.select-num-pop').hide();
		$("#endStr").val("");
		return false;
	});
	
	//到在线公司验签
	$('.toonlinesign').click(function() {
        $("div").removeClass("border-red");
        $("p").removeClass("border-red");
        if ($("#cardnum").val() == "") {
            showMsg("请选择号码");
            $('#id-cardnum').addClass("border-red");
            return;
        }
        var params = "";
        if ($(this).hasClass("student")) {
            params = "?student=Y";
        } else {
            if ($("#mealFeatures").length > 0) {
                if ($("#mealFeatures").val() != "" && $("#mealFeatures").val().indexOf("5") >= 0 && $("#studentTransID").val() == "") {
                    showMsg("请先校验学生信息");
                    return;
                }
            }
        }
        //联系电话
        if ($("#txtPhone").length > 0 && $("#txtPhone").val().length > 0) {
            var phone = $("#txtPhone").val();
            if (!mobile_reg.test(phone) && !phone_reg.test(phone)) {
                showMsg("请输入正确的联系电话");
                $("#txtPhone").focus();
                $('#id-phone').addClass("border-red");
                return;
            }
            $("#phonestr").val(phone);
        }
        //省市县下拉
        if ($("#id-city").length > 0) {
			//省
			if ($("#citysf").length > 0 && $("#citysf").val().length > 0) {
				$("#citysfstr").val($("#citysf").val());
			}
			//市
			if ($("#citycs").length > 0) {
				var regionstr = $("#citycs").val();
				if (regionstr == "") {
					showMsg("请选择所在城市");
					$('#id-city').addClass("border-red");
					return;
				}
				$("#citycsstr").val(regionstr);
			}
			//县
			if ($("#cityxs").length > 0 && $("#cityxs").val().length > 0) {
				$("#cityxsstr").val($("#cityxs").val());
			}
			//镇
			if ($("#citytw").length > 0 && $("#citytw").val().length > 0) {
				$("#citytwstr").val($("#citytw").val());
			}
    	}
        //详细地址
        if($("#txtAddress").length>0 && $("#txtAddress").val().length>0){
			var address=$("#txtAddress").val();
            if(address.length <4){
                showMsg("您输入的地址过于简单，请重新输入");
                $("#txtAddress").focus();
                $('#id-address').addClass("border-red");
                return;
            }
            if(address.length >150){
                showMsg("您输入的地址过长，请重新输入");
                $("#txtAddress").focus();
                $('#id-address').addClass("border-red");
                return;
            }
            if(!checkSw(address)){
                $("#txtAddress").focus();
                $('#id-address').addClass("border-red");
                return;
            }
            $("#addressstr").val(address);
        }
        $("#checkForm").attr('action','/pay/card-sale!toOnlineSign.action'+params);
				// $("#checkForm").submit();
				$.ajax({
					url:'/pay/card-sale!toOnlineSign.action'+params,
					contentType:'application/x-www-form-urlencoded',
					type: 'post',
					data: $("#checkForm").serialize(),
					success:function(html){
						$html = $(html);
						sessionStorage.setItem('busiCode',$html.find('#busiCode').val());
						sessionStorage.setItem('requestSource',$html.find('#requestSource').val());
						sessionStorage.setItem('transactionID',$html.find('#transactionID').val());
						sessionStorage.setItem('signature',$html.find('#signature').val());
						sessionStorage.setItem('billId',$html.find('#billId').val());
						sessionStorage.setItem('channelId',$html.find('#channelId').val());
						window.location.href = '/reg.html';
					}
				})

		// if($("#mealid").length>0){
		// 	params=params+"&mealid="+$("#mealid").val();
		// }else{
		// 	params=params+"&activityId="+$("#activityId").val()+"&channelCode="+$("#channelCode").val()+"&planId="+$("#planId").val()+"&planActivityId="+$("#planActivityId").val();
		// }
		// //拼多多订单号
		// if($("#pddOrderId").length>0){
		// 	params=params+"&pddOrderId="+$("#pddOrderId").val();
		// }
		// window.location.href="/pay/card-sale!toOnlineSign.action?cardnum="+$("#cardnum").val()+"&region="+$("#region").val()+"&iccid="+$("#iccid").val()+"&mastercard="+$("#mastercard").val()+"&plancode="+$("#plancode").val()+params;
	});
	
	//未实名认证之前订单信息不可填写
	$('#schoolnumber1,#schoolnumber2,#txtRecsvcnum').bind('input propertychange', function() {
		//送货上门实名认证之前不允许填写订单信息
		if("1"==$("#sendtype").val() && ""==$("#transactionID").val()){
			$(this).val("");
			showMsg("请先实名认证");
		}
	});
	
	//选择支付方式
	$(".pay-way").click(function (){
		//送货上门实名认证之前不允许填写订单信息
		if("1"==$("#sendtype").val() && ""==$("#transactionID").val()){
			showMsg("请先实名认证");
			return;
		}
		var cssName=$(this).attr("class");
		if(cssName.indexOf("wx")>=0){//微信
			$("#wx").addClass("on-checked");
			$("#zfb").removeClass("on-checked");
			$("#paytype").val("WXPAY");
		}else if(cssName.indexOf("zfb")>=0){//支付宝
			$("#zfb").addClass("on-checked");
			$("#wx").removeClass("on-checked");
			$("#paytype").val("ALIPAY");
		}
	});
	
	//选中协议
	$('#mycheck1').click(function(){
	  	if($(this).is(':checked')){
	  	  $("#checkstr").val('1');
	  	}else{	  	  
	  	  $("#checkstr").val('');
	  	}
	});
	
	//送货上门
	if("2"==$('#sendtype').val()){
		$('.select-add input').attr('placeholder','请选择联系地址');
		$('.getorcomeobj').show();
		$('.getobj').show();
		$('.sendobj').hide();
		$('.zfdiv').css("margin-top","1rem");
	}

	//选择配送方式
	$('.sendmethod').click(function () {
		if($(this).hasClass("shsm")){//送货上门
			$(".shsm").addClass("on");
			$(".dtzq").removeClass("on");
			$(".smkh").removeClass("on");
			$('.select-add input').attr('placeholder','请选择收件地址');
			$('.sendobj').show();
			$('.getobj').hide();
            $('.comeobj').hide();
			$('.getorcomeobj').hide();
			$('#sendtype').val("1");
			$('.zfdiv').css("margin-top","0rem");
		}else if($(this).hasClass("dtzq")){//到厅自取
			$(".dtzq").addClass("on");
			$(".shsm").removeClass("on");
			$(".smkh").removeClass("on");
			$('.select-add input').attr('placeholder','请选择联系地址');
			$('.getorcomeobj').show();
			$('.getobj').show();
            $('.comeobj').hide();
			$('.sendobj').hide();
			$('#sendtype').val("2");
			$('.zfdiv').css("margin-top","1rem");
		}else if($(this).hasClass("smkh")){//上门开户
			$(".smkh").addClass("on");
			$(".shsm").removeClass("on");
			$(".dtzq").removeClass("on");
			$('.select-add input').attr('placeholder','请选择联系地址');
            $('.comeobj').show();
			$('.getorcomeobj').hide();
			$('.getobj').hide();
			$('.sendobj').hide();
			$('#sendtype').val("3");
			$('.zfdiv').css("margin-top","1rem");
		}
		
		//清空输入内容
		$('#txtName').val("");
		$('#txtCard').val("");
        $('#txtName1').val("");
        $('#txtCard1').val("");
		$('#schoolnumber1').val("");
		$('#schoolnumber2').val("");
		$('#txtAddress').val("");
		$('#txtRecsvcnum').val("");
		$('#txtPhone').val("");
		$('#citysf').val("河南省");
		$('#citycs').val("");
		$('#cityxs').val("");
        $('#citysf').trigger("change");
        $('.list .city').attr('value','');
		$('.business-hall').val("");
		$("div").removeClass("border-red");
		$("p").removeClass("border-red");
		//实体卡默认支付方式为微信
		if($("#iccid").val()!=""){
			$("#paytype").val("WXPAY");
			$("#wx").addClass("on-checked");
			$("#zfb").removeClass("on-checked");
		}else{//默认支付方式为支付宝
			$("#paytype").val("ALIPAY");
			$("#zfb").addClass("on-checked");
			$("#wx").removeClass("on-checked");
		}
	});
	/**重要须知弹框**/
	$('.rece-addr .mode a').click(function () {
		if("2"==$("#sendtype").val()){//到厅自取
			$('.send-dtzq').show();
		}else if ("3"==$("#sendtype").val()){//上门开户
			$('.send-shkh').show();
		}else{//送货上门
			$('.send-shsm').show();
		}
        $('html,body').addClass('lock-back');
	});

	//关闭弹出框
    $('.close-btn,.hallok').click(function(){
        $('html,body').removeClass('lock-back');
        $('.pop').hide();
    });
	
	
	/***********收货地址选择框*************/
	var addressIsShow=false;
	$('.list .city,.selectcity').click(function(){
		$('.to-top-pop .pop-overlay1').show();
		$('.top-pop-box').css('bottom','30%');
		addressIsShow=true;
	});
	$('.pop-overlay1').click(function () {
		if(addressIsShow==true){
			$('.top-pop-box').css('bottom','-50%');
			$('.pop-overlay1').hide();
			addressIsShow=false;
		}
	});
	$('.top-pop-box .btn-box a').click(function(){
		var text1 = $('#province option:selected').text();
		var text2 = $('#city option:selected').text();
		var text3 = $('#area option:selected').text();
		console.log(text1+text2+text3);
		$('.rece-addr .city').attr('value',text1+text2+text3);
		$('.top-pop-box').css('bottom','-50%');
		$('.pop-overlay1').hide();
		addressIsShow=false;
	});

	//推荐营业厅弹框
	$('.selecthall').click(function(){
		$(".select-hall-list").empty();//清空营业厅信息
		var pvinfo=$("#citysf").val();
		var cityinfo=$("#citycs").val();
		var countyinfo = $("#cityxs").val(); 
		if(cityinfo=="" || countyinfo==""){
	    	showMsg("请选择所在地区");
	    	return;
		}
		if(pvinfo!="河南省"){
			showMsg("河南省内可选择营业厅");
	    	return;
		}
		var nowhall=$("#busiHall").val();
		//获取营业厅信息
		$.ajax({
			type : "POST",
			url : '/pay/card-sale!queryBusihall.action',
			dataType : 'json',
			data : {citycsstr:cityinfo,cityxsstr:countyinfo},
			async: true,
			success : function(data) {
				var returnCode=data.returnCode;
				if(returnCode!=null && returnCode !=""){//无数据
			    	showMsg("所选地区无营业厅数据");
			    	return;
				}else{
		        	var obj = eval(data);
		        	var selectsign=true;
	                $(obj).each(function (index) {
	                	var val = obj[index];
	                	var classname="";
	                	if(nowhall==val.HALLNAME){
	                		classname="class=\"on\"";
	                		selectsign=false;
	                	}else{
	                		classname="";
	                	}
                    	$(".select-hall-list").append("<li>"+ "<b "+classname+" data-busihall='"+val.HALLNAME+"' data-busihalladdress='"+val.HALLADDRESS+"'></b><div class=\"hall-msg\"><p class=\"hall-name\">"+val.HALLNAME+"</p><p class=\"hall-add\">"+val.HALLADDRESS+"</p></div></li>");
	                });
	                if(selectsign) {
	                	$(".select-hall-list b").eq(0).addClass("on");
	                }
	                $('.select-business-hall-pop').show();
                    $('html,body').addClass('lock-back');
				}
			},
			error : function(html) {
				showMsg("暂无法获取营业厅数据");
		    	return;
			},
			timeout : function(html) {
				showMsg("暂无法获取营业厅数据");
		    	return;
			}
		});
	});
	//选择营业厅
	$(".select-hall-list").on("click",'li',function(){
		$('.select-hall-list b').removeClass('on');
		$(this).children('b').addClass('on');
	});
    //确定营业厅
    $('.hallok').click(function(){
    	$('.select-hall-list b').each(function () {
    		if($(this).hasClass('on')){
    			$("#busiHall").val($(this).data("busihall"));
    			$("#busiHallAddress").val($(this).data("busihalladdress"));
    			$(".business-hall").val($(this).data("busihall"));
    			$('.select-business-hall-pop').hide();
    			return;
    		}
    	});
    });
    
    /*输入推荐人显示隐藏*/
    $(".sell-telnum-order-fill .contact .tit").click(function(){
		$(".sell-telnum-order-fill .contact .list").toggle();
		return false;
	});
    
    //客户协议弹框
    $('#agree-btn1').click(function(){
    	//送货上门实名认证之前不允许填写订单信息
		if("1"==$("#sendtype").val() && ""==$("#transactionID").val()){
			showMsg("请先实名认证");
			return;
		}
		if(!setAgreeInfo()) return false;
		$(".agree-box1").show();
		return false;
	});
    //特需号码协议弹框
	$('#agree-btn-txkh').click(function(){
		//送货上门实名认证之前不允许填写订单信息
		if("1"==$("#sendtype").val() && ""==$("#transactionID").val()){
			showMsg("请先实名认证");
			return;
		}
		if(!setAgreeInfo()) return false;
		$("#agree-pop-txkh").show();
		return false;
	});
	//设置合同信息
	function setAgreeInfo(){
		if("1"==$("#sendtype").val()){//送货上门
			if(""==$("#transactionID").val()){
				showMsg("请先实名认证");
				return false;
			}
		}else if("2"==$("#sendtype").val() || "3"==$("#sendtype").val()){//到厅自取
			if($("#txtName").val()=="" || $("#txtCard").val()==""){
				showMsg("请先输入入网资料！");
				return false;
			}
		}
		if($("#cardnum").val()==""){
			showMsg("请先选择手机号码！");
			return false;
		}
		var mydate=new Date();
		var year =  mydate.getFullYear();
		var month =  mydate.getMonth()+1;
		var day =  mydate.getDate();
		if("2"==$("#sendtype").val() || "3"==$("#sendtype").val()){
			$(".agreeUserName").html($("#txtName").val());
		}
		$(".agreeCardnum").html($("#cardnum").val());
		$(".agreeSignDate").html(year+"年 "+month+" 月 "+day+" 日");
		$(".agreeRegionAdr").html(cityadrmap[$("#region").val()]);
		
		// 非配置类套餐
		if($("#mealid").length>0){
			//特需号码协议显示套餐名称及价钱
			var mId=$("#mealid").val();
			if(mId=='41' || mId=='46' || mId=='56' || mId=='49' || mId=='50' || mId=='51' || mId=='73' || mId=='74' || mId=='89' || mId=='90' || mId=='91'){//冰激凌套餐
				$(".agreeMealName").html(mealmap[mId+'_title']);
				$(".agreeMealFee").html(mealmap[mId+'_fee']);
			}
		}
		return true;
	}
	
    /*********关于礼品编码脚本开始****************/
  	//设置学校编码框宽度和高度一致
	var input_height=$('.school-number').height();
	$('.school-number').width(input_height);
	$(window).resize(function(){
		var input_height=$('.school-number').height();
		$('.school-number').width(input_height);
	});
	//判断输入的密码还是否为英文字母
	$('.school-number.fr-num').on("input propertychange",function(){
		var _this = $(this);
		inputFun(_this);
	});
	//判断输入的密码还是否为英文字母
	function inputFun(value){
		var reg = new RegExp("^[0-9]*$");
		//var reg= new RegExp("^[A-Za-z]+$");
		var val = value.val();
		if(!reg.test(val)){
			value.val('');
		}else{
			value.next().focus();
		}
	}
	//判断输入的密码还是否为数字
	$('.school-number.is-num').on("input propertychange",function(){
		var _this = $(this);
		inputFun2(_this);
	});
	//判断输入的密码还是否为数字
	function inputFun2(value){
		var reg = new RegExp("^[0-9]*$");
		var val = value.val();
		if(!reg.test(val)){
			value.val('');
		}else{
			value.next().focus();
		}
	}
    //监听backspace事件
	$('.school-number').on("keyup",function(e){
		var _this = $(this);
		var ev = e;
		keyupFun(_this,ev);
	});
    //监听backspace事件
	function keyupFun(value,e){
		var k = e.keyCode;
		var val = e.key;
		if(k == 8){             //8是backspace的keyCode
			value.prev().focus();
		}else{
			return false;
		}
	}
	/*********关于礼品编码脚本结束****************/
});
//显示提示信息
function showMsg(msg){
	$(".error").html(msg);
	$('.error-pop').show();
}

//设置送货方式
function setSendType(){
	var sendtype=$("#sendtype").val();
	var regionId=$("#region").val();
	if("A"==regionId) {
        if ("2" != sendtype) {//非到厅自取
            if (isSmkh()) {
                $("#sendtype").val("3");
                $('.sendobj').hide();
                $('.comeobj').show();
            } else {
                $("#sendtype").val("1");
                $('.sendobj').show();
                $('.comeobj').hide();
            }
        }
    }
}
//上门开户
function isSmkh(){
	if($("#mealFeatures").length>0) {
        var mF = $("#mealFeatures").val();
        if (mF.indexOf("1") >= 0) {//支持上门开户
            var rName = $("#rName").val() + '市';//号码归属地
            var regionstr = $("#citycs").val();
            if ("郑州市" == rName && rName == regionstr) {
                return true;
            }
        }
    }
    return false;
}

//设置配送方式
function setOtherCitySendType() {
    var regionId=$("#region").val();
    //支持上门开户
    if(isOtherCitySmkh()) {
        $('.shsm').click();
        if ("A" == regionId) {
            $('.smkh').hide();
            $('.send-method').removeClass("send-method2");
        }else{
            // $("#sendtype").val("1");
            // $('.sendobj').show();
            // $('.comeobj').hide();
            $('.smkh').show();
            $('.send-method').addClass("send-method2");
        }
    }
}

//其它地市上门开户
function isOtherCitySmkh(){
    if($("#mealFeatures").length>0) {
        var mF = $("#mealFeatures").val();
        if (mF.indexOf("1") >= 0) {//支持上门开户
            return true;
        }
    }
    return false;
}

///敏感词校验
function checkSw(str){
	var ref=false;
	//敏感词校验
	$.ajax({
		type : "POST",
		url : '/pay/card-sale!checkSensitiveWord.action',
		dataType : 'json',
		data : {checkStr:encodeURI(str)},
		async: false,
		success : function(data) {
			var returnCode=data.returnCode;
			if(returnCode=="success"){
				ref=true;
			}else{
				showMsg("您输入的地址包含有敏感词，请重新输入");
			}
		},
		error : function(html) {
			showMsg("地址校验出错，请重试");
		},
		timeout : function(html) {
			showMsg("地址校验出错，请重试");
		}
	});
	return ref;
}

// 转移js
$(function(){
	$('body script')[6].remove();
})
$(function () {
    //微信浏览器屏蔽支付宝
    if(is_weixn()){
        $('.zfb').hide();
    }
    var isShow=true;
	var prettyNum="N";
	var activityId=$("#activityId").val();//配置ID
	var choosePlan=$("#choosePlan").val();//选择套餐
	
	//订单提交
	$('.big-blue-btn-zhifu').click(function(){	
	    if(!isShow){
	    	return;
	    }				
		$("div").removeClass("border-red");
		$("p").removeClass("border-red");
		var iccid=$("#iccid").val();//实体卡ICCID
		var cardnum=$("#cardnum").val();
		var province=$("#citysf").val();
		var regionstr=$("#citycs").val();
		var phone=$("#txtPhone").val();
		var city = $("#cityxs").val();
		var town = $("#citytw").val();
		var address=$("#txtAddress").val();	
		var recsvcnum=$("#txtRecsvcnum").val();
		var checkstr = $("#checkstr").val();
		var paytype = $("#paytype").val();
		var sendtype=$("#sendtype").val();//配送方式
		
		//配送方式为空
		if(sendtype==null || sendtype==""){
			showMsg("请选择配送方式");
			$('#id-sendtype').addClass("border-red");
			return;
        }
		
	    //仅邮寄配送必选入网协议
		if(checkstr=="" && "1"==sendtype){
			if("Y"==prettyNum){//特需号码
		    	showMsg("请阅读并同意《中国移动通信客户服务协议》《中国移动通信“特需号码”客户服务协议》");
			}else{
				showMsg("请阅读并同意《中国移动通信客户服务协议》");
			}
		    $("#mycheck1").focus();
		    return;
		}
		
		if(cardnum=="" || !ValidateCallNumber(cardnum)){
			showMsg("请选择号码");
			$("#cardnum").focus();
			$('#id-cardnum').addClass("border-red");
			return;
		}
		if($("#plancode").val()==""){
			showMsg("号码类型有误");	
			$("#cardnum").focus();
			$('#id-cardnum').addClass("border-red");
			return;
		}
	    
		//到厅自取
		if("2"==sendtype || "3"==sendtype){
            var nameStr="txtName";
            var cardStr="txtCard";
            var divNameStr="id-name";
            var divCardStr="id-card";
		    if("3"==sendtype){//上门开户
                nameStr="txtName1";
                cardStr="txtCard1";
                divNameStr="id-name1";
                divCardStr="id-card1";
                // if($("#region").val()!="A") {
                //     showMsg("上门开户仅限郑州");
                //     $('.send-method').addClass("border-red");
                //     return;
                // }
			}
            var name=$("#"+nameStr).val();
            var card=$("#"+cardStr).val();//身份证
			if(name==""){
				showMsg("请输入身份证件姓名");
                $("#"+nameStr).focus();
                $("#"+divNameStr).addClass("border-red");
				return;
			}
			if(card==""){
				showMsg("请输入身份证号");
                $("#"+cardStr).focus();
                $("#"+divCardStr).addClass("border-red");
				return;
			}
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		    if(reg.test(card) === false){ 
		    	showMsg("请输入正确的身份证号码");
                $("#"+cardStr).focus();
                $("#"+divCardStr).addClass("border-red");
				return;	 
			}
		    var encry = new Encry04();		
			$("#cardstr1").val(encry.encode(card).substring(0,4));	
			$("#cardstr2").val(encry.encode(card).substring(4));
			$("#namestr").val(name);
		}else{//邮寄配送
			if(""==$("#transactionID").val()){
				showMsg("请前往实名认证");
				return;
			}
			if("1"==$("#hnUser").val()){
			    if($("#mastercard").val()!="" && $("#mastercard").val().length >0){
                    showMsg("非河南省用户请到营业厅办理");
                    return;
                }else{
                    showMsg("非河南用户请选择到厅自取办理开户");
                    return;
                }
			}
			if("2"==$("#hnUser").val()){
                showMsg("50周岁以上客户请选择到厅自取办理开户");
                return;
            }
            if("3"==$("#hnUser").val()){
                showMsg("尊敬客户您好，校园政策仅限16周岁以上25周岁以下用户办理，请关注其他入网活动。");
                return;
            }
		}
	    
	  	//针对通知书夹寄活动验证码
		var vericode="";
		if("XWAPCARDNEW4"==activityId){
			var schoolnumber1=$("#schoolnumber1").val();
			var schoolnumber2=$("#schoolnumber2").val();
			if(schoolnumber1=="" || schoolnumber2==""){
				showMsg("请输入礼包编码");
				$("#schoolnumber1").focus();
				$('#id-schoolnumber').addClass("border-red");
				return;
			}
			vericode=schoolnumber1+""+schoolnumber2;
		}
		
		if(phone==""){
			showMsg("请输入联系电话");
			$("#txtPhone").focus();
			$('#id-phone').addClass("border-red");
			return;
		}	
		if(!mobile_reg.test(phone) && !phone_reg.test(phone)){
			showMsg("请输入正确的联系电话");
			$("#txtPhone").focus();
			$('#id-phone').addClass("border-red");
			return;
		}
		if(iccid==""){//非实体卡验证收货地址
			if(province==""){
				showMsg("请选择所在省份");
				$('#id-city').addClass("border-red");
				return;
			}
			if(regionstr==""){
				showMsg("请选择所在城市");
				$('#id-city').addClass("border-red");
				return;
			}
			if(city==""){
				showMsg("请选择所在县区");
				$('#id-city').addClass("border-red");
				return;
			}
			if(province=="河南省" && town==""){
				showMsg("请选择所在乡镇");
				$('#id-city').addClass("border-red");
				return;
			}
			//到厅自取/上门开户
			if("2"==sendtype || "3"==sendtype){
				var rName=$("#rName").val()+'市';//号码归属地
				var sendtext="2"==sendtype?'到厅自取':'上门开户';
				if(rName!=regionstr){
					showMsg(sendtext+"所在地区必须选择号码归属地");
					$('#id-city').addClass("border-red");
					return;
				}
			}
			if(address==""){
				showMsg("请输入街道/镇+/小区/写字楼+门牌号");
				$("#txtAddress").focus();
				$('#id-address').addClass("border-red");
				return;
			}
			if(address.length <4){
				showMsg("您输入的地址过于简单，请重新输入");
				$("#txtAddress").focus();
				$('#id-address').addClass("border-red");
				return;
			}
			if(address.length >150){
				showMsg("您输入的地址过长，请重新输入");
				$("#txtAddress").focus();
				$('#id-address').addClass("border-red");
				return;
			}
			if(!checkSw(address)){
				$("#txtAddress").focus();
				$('#id-address').addClass("border-red");
				return;
			}
		}
		
		if(recsvcnum.length>0){
			if(!mobile_reg.test(recsvcnum)){
				showMsg("请输入正确的推荐人手机号");
				$("#txtRecsvcnum").focus();
				$('#id-recsvcnum').addClass("border-red");
				return;
			}
		}
		
		if(paytype==""){
			showMsg("请选择支付方式");
			$('#id-paytype').addClass("border-red");
			return;
		}
		
	    //到厅自取设置选中入网协议
	    if("2"==sendtype || "3"==sendtype){
			$("#checkstr").val('1');
		}
	    //邮寄配送设置选中入网协议个数
	    if("1"==sendtype){
	    	$("#netPro").val($("#proStr").val());
	    }
		$("#vericode").val(vericode);
		$("#phonestr").val(phone);
		$("#citysfstr").val(province);
		$("#citycsstr").val(regionstr);
		$("#cityxsstr").val(city);
		$("#citytwstr").val(town);
		$("#addressstr").val(address);
		$("#recsvcnumstr").val(recsvcnum);
		$("#havecardtype").val(sendtype);
		isShow = false;

		//立即支付按钮增加插码
        webTrends("ljzf","");

        $.ajax({
            type:"POST",
            url:'/pay/card-sale!submit.action',
            dataType:'json',
            data: $("#checkForm").serialize(),
            async:false,
            success:function(htmlMsg){
                if(htmlMsg.returnCode=='SUCCESS'){
                    $("#orderId").val(htmlMsg.orderId);
                    $("#signStr").val(htmlMsg.signStr);
										// 抖音成功统计一次
										meteor.track("form", {convert_id: "1661558208083972"})
                    //办理成功增加插码
                    webTrends("success","");
                }else{
                    $("#errMsg").val(htmlMsg.returnMessage);
                    //办理失败增加插码
                    webTrends("fail",htmlMsg.returnMessage);
                }
                $("#turnOrderForm").submit();
            },
            error : function(htmlMsg) {
                showMsg("订单提交异常，请重试");
                return;
            },
            timeout : function(htmlMsg) {
                showMsg("订单提交超时，请重试");
                return;
            }
        });
	});

	function webTrends(nType,msg){
	    //立即支付
	    if("ljzf"==nType){
	        //页面配置类套餐
            if(activityId=="8255334385677994278"){//全球通69元体验套餐
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTYTCE','WT.event','XHRW_QQTTYTCE_ZF','WT.si_n','CB_XHRW_QQTTYTCE','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','22');}
            }else if(activityId=="5993109194365736140"){//全球通99元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_J','WT.event','XHRW_QQTTCE_JZF','WT.si_n','CB_XHRW_QQTTCE_J','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','22');}
            }else if(activityId=="4690360595586045763"){//全球通139元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_E','WT.event','XHRW_QQTTCE_EZF','WT.si_n','CB_XHRW_QQTTCE_E','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','22');}
            }
            //页面非配置类套餐
            if("1"==choosePlan || "2"==choosePlan){//副卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_FKE','WT.event','XHRW_FKE_ZF','WT.si_n','CB_XHRW_FKE_BK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
			}else if("758"==choosePlan){//19元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJZF_2','WT.si_n','CB_XHRW_YDWKE_LJDG_1','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
            }else if("759"==choosePlan){//49元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJZF_42','WT.si_n','CB_XHRW_YDWKE_LJDG_2','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
            }else if("760"==choosePlan) {//79元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJZF_72','WT.si_n','CB_XHRW_YDWKE_LJDG_3','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
            }
		}else if("success"==nType){//办理成功
            //页面配置类套餐
            if(activityId=="8255334385677994278"){//全球通69元体验套餐
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTYTCE','WT.si_n','CB_XHRW_QQTTYTCE','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }else if(activityId=="5993109194365736140"){//全球通99元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_J','WT.si_n','CB_XHRW_QQTTCE_J','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }else if(activityId=="4690360595586045763"){//全球通139元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_E','WT.si_n','CB_XHRW_QQTTCE_E','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }
            //页面非配置类套餐
            if("1"==choosePlan || "2"==choosePlan){//副卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_FKE','WT.si_n','CB_XHRW_FKE_BK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }else if("758"==choosePlan){//19元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_1','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }else if("759"==choosePlan){//49元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_2','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }else if("760"==choosePlan) {//79元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_3','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','99');}
            }

        }else if("fail"==nType){//办理失败
            //页面配置类套餐
            if(activityId=="8255334385677994278"){//全球通69元体验套餐
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTYTCE','WT.si_n','CB_XHRW_QQTTYTCE','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }else if(activityId=="5993109194365736140"){//全球通99元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_J','WT.si_n','CB_XHRW_QQTTCE_J','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }else if(activityId=="4690360595586045763"){//全球通139元
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_E','WT.si_n','CB_XHRW_QQTTCE_E','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }
            //页面非配置类套餐
            if("1"==choosePlan || "2"==choosePlan){//副卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_FKE','WT.si_n','CB_XHRW_FKE_BK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }else if("758"==choosePlan){//19元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_1','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }else if("759"==choosePlan){//49元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_2','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }else if("760"==choosePlan) {//79元移动王卡
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.si_n','CB_XHRW_YDWKE_LJDG_3','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','-99','WT.errCode',msg);}
            }
        }
	}

    let timer=null;
    let num=2;
    timer=setInterval(function(){
        if(num==0){
            clearInterval(timer);
            $('.time').hide();
            $('.police-tips-pop  .police-btn-box').removeClass('gray');
            $('.police-tips-pop  .police-btn-box').addClass('close');
            $('.police-tips-pop .close').click(function(){
                $('.police-tips-pop').hide();
            })
        }
        $('.time b').text(num);
        num--;
    },1000);
});