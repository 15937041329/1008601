/*详情标题切换*/
$(function(){
    //公告
    $('.tips-box .close-tip').click(function(){
        $('.tips-box').hide();
    });
    //其他资费说明
    $('.tar-sta-tit').click(function(){
        $('.tariff-statement').fadeToggle();
        return false;
    });
    //激活说明
    $('.act-tit').click(function () {
        if($('.active').css("display") == 'none'){
            var height=$(document).scrollTop();
            $('html,body').animate({scrollTop:height+300},1000);//向下滑动
            $('.active').fadeIn('50000');
            return false;
        }else{
            $('.active').hide();
            return false;
        }
    });
	 /**其他资费**/
    $('.post-intr').click(function () {
        $('.other-postage').fadeToggle();
    });
	 /**其他资费**/
    $('.tar-statement-entry').click(function () {
    	var mid=$("#mealid").val();
    	if('87'==mid){
    		$(".xxwkll").hide();
    		$('.xxwkyy').fadeToggle();
    	}else if('88'==mid){
    		$(".xxwkyy").hide();
    		$('.xxwkll').fadeToggle();
    	}else{
    		$(this).siblings('.tar-statement').fadeToggle();
    	}
    });
    /**激活说明**/
    $('.act-statement-entry').click(function () {
		if($('.active').css("display") == 'none'){
			var height=$(document).scrollTop(); 
			$('html,body').animate({scrollTop:height+300},1000);//向下滑动
			$('.active').fadeIn('50000');
			return false;
		}else{
			$('.active').hide();
			return false;
		}
    });
    
	/**新春营销激活说明弹出**/
	$('.active-method-btn-new a').click(function () {
		if($('.active-method-new').css("display") == 'none'){
			var height=$(document).scrollTop(); 
			$('html,body').animate({scrollTop:height+300},1000);//向下滑动
			$('.active-method-new').fadeIn('50000');
			return false;
		}else{
			$('.active-method-new').hide();
			return false;
		}
		
    })
	/**新春营销其他资费弹出**/
    $('.meal-postage').click(function () {
        $('.postage-pop').show();
    })
    /**新春营销其他资费弹出关闭**/
    $('.postage-pop-close').click(function () {
        $('.postage-pop').hide();
    })
    /**选择入网活动**/
    $('.newactive li').click(function(){
        $(this).addClass('on').siblings('li').removeClass('on');
        var mmid=$(this).data("code");
        $("#mealid").val(mmid);
        $("#mealPrice").html(mealmap[mmid+'_price']);
    })
    
    /**郑州校园活动激活说明**/
    $('.act-explain a').click(function () {
        $(this).toggleClass('on');
        if($('.active-method').css("display") == 'none'){
            var height=$(document).scrollTop();
            $('html,body').animate({scrollTop:height+300},500);//向下滑动
            $('.active-method').fadeIn('50000');
            return false;
        }else{
            $('.active-method').hide();
            return false;
        }
    })
    
	$('.pic-info .switch-title li').click(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
	})
	//切换移动尊享卡活动
	$(".text-select-list-zxk a").click(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		var indexstr = $(".text-select-list-zxk a").index(this);
		var mId=indexstr+3;
		$("#mealPrice").html('￥<b>'+mealmap[mId+'_price']+'</b>');
	    $("#mealid").val(mId);
	})
	//切换4G全国套餐
	$(".text-select-list-sgtc a").click(function(){
		$(".text-select-list-sgtc a").removeClass("on");
		$(this).addClass("on");
		var idName = $(this).attr("id");
		var indexstr=idName.replace("am_","");
		var mId=indexstr;
	    $("#mealid").val(mId);	
	    $("#mealPrice").html('￥<b>'+mealmap[mId+'_price']+'</b>');
	    $("#mealActive").html(mealmap[mId+'_active']);
	    $("#mealIntro").html(mealmap[mId+'_intro']);
	})
	//4G全国套餐展开或收起
	$('.country-4g .basic-info .item .more a').click(function () {
		var a = $('.text-select-list a');
		if($(this).hasClass('down-btn')){
			$(this).hide().siblings('.up-btn').show();
			$('.text-select-list .hide').slideDown();
		}
		if($(this).hasClass('up-btn')){
			$(this).hide().siblings('.down-btn').show();
			$('.text-select-list .hide').slideUp();
		}
	})
	//切换任我看活动
	$(".text-select-list-rwk a").click(function(){
		var cName=$(this).attr("class");
		if(cName.indexOf("disable")>=0){//当前项不可选
			return false;
		}else{
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var codeName=$(this).data("code");
			//针对9元套餐爱奇艺不可选
//			if(codeName=="code1"){
//				$(".casual-see-list-rwk a").eq(5).addClass("disable");
//			}else{
//				$(".casual-see-list-rwk a").eq(5).removeClass("disable");
//			}
			//设置选中套餐ID
			var mId="";
			$(".casual-see-list-rwk a").each(function(){
				var cssName=$(this).attr("class");
				if(cssName.indexOf("on")>=0){
					mId=$(this).data(codeName);					
					return false;
				}
		    });
			$("#mealid").val(mId);
		}
	})
	//切换任我看套餐
	$(".casual-see-list-rwk a").click(function(){
		var cssName=$(this).attr("class");
		if(cssName.indexOf("disable")>=0){//当前项不可选
			return false;
		}else{
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var code1=$(this).data("code1");
			var code2=$(this).data("code2");
			//设置9元套餐是否可选
			if(code1==""){
				$(".text-select-list-rwk a").eq(0).addClass("disable");
				$(".text-select-list-rwk a").eq(0).removeClass("on");
				$(".text-select-list-rwk a").eq(1).addClass("on");
			}else{
				$(".text-select-list-rwk a").eq(0).removeClass("disable");
			}
			//设置选中套餐ID
			var mId="";
			if($(".text-select-list-rwk a").eq(0).attr("class")=="on"){
				mId=code1;
			}else{
				mId=code2;
			}
		    $("#mealid").val(mId);
		}
	})
	//切换套餐(高校新生专享福利、移动流量王、交广卡)
	$(".text-select-list-tc a").click(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		var code = $(this).data("code");
		var mId=code;
	    $("#mealid").val(mId);
	    $("#mealPrice").html('￥<b>'+mealmap[mId+'_price']+'</b>');
	    if($("#mealIntro").length > 0) {$("#mealIntro").html(mealmap[mealid+'_intro']);}
	    
	    //活动选择
	    if($(".text-select-list-hd").length > 0){
	    	$(".text-select-list-hd a").each(function(){
	        	var code1=$(this).data("code");
	        	if(code1==mId){
	        		$(this).addClass("on");
	        		$(this).removeClass("disable");
	        	}else{
	        		$(this).addClass("disable");
	        		$(this).removeClass("on");
	        	}
	        });
	    }
	})
	//套餐页面 立即办卡
	$(".big-red-btn-select").click(function(){
		var mId=$("#mealid").val();
		var sType=$("#sourcetype").length>0?$("#sourcetype").val():'';
		var mName=mealmap[mId+'_title'];	
		//增加插码
		if(mId=="41" || mId=="56"){//冰欺凌98元套餐及188元套餐
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','SN_BQL','WT.event','SNBQL_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_SNBQL_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="73" || mId=="74" || mId=="99" || mId=="100"){//线上移动不限量
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','QG_BQL','WT.event','QGBQL_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_QGBQL_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="57" || mId=="58"){//18元日租卡
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','SBRZK','WT.event','SBRZK_LIBK','WT.si_n','CB_SB_RZK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="65" || mId=="66" || mId=="67" || mId=="68" || mId=="69" || mId=="70"){//18元日租卡C套餐
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','RZKCTC','WT.event','RZKCTC_LIBK','WT.si_n','CB_RZKCTC','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="46"){//冰欺凌188元套餐
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','GBBQL'+sdc_dymname,'WT.event','188LJBK'+sdc_dymname);}
		}else if(mId=="3" || mId=="4"){//冰欺凌188元套餐(尊享卡)
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','BQITC'+sdc_dymname,'WT.event','BQITC_LJBK'+sdc_dymname);}
		}else if(mName.indexOf("任我看")>=0){//任我看套餐
			if(sType=="3"){//腾讯日租卡
				if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','RWKRZK'+sdc_dymname,'WT.event','RWKRZK_LYBK'+sdc_dymname);}
			}else if(sType=="4"){//爱奇艺任我看会员版
				if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','KAQY_RWKHYB'+sdc_dymname,'WT.event','RWKHYB_LYBK'+sdc_dymname);}
			}else if(sType=="T"){//任我看腾讯版
			    if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','RWKTXB'+sdc_dymname,'WT.event','RWKTXB_LJTY'+sdc_dymname);}
			}else{//通用任我看
				if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','REKTK'+sdc_dymname,'WT.event','REKTK_LYBK_LJTY'+sdc_dymname);}
			}
		}else if(mId=="1" || mId=="6"){//移动流量王
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','YDLLW'+sdc_dymname,'WT.event','YDLLW_LJBK'+sdc_dymname);}	
		}else if(mId=="35" || mId=="36" || mId=="37"){//2017高校新生专享福利
			if(sType==""){
				if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','XYHD'+sdc_dymname,'WT.event','XYHD_LJBL'+sdc_dymname);}
			}
		}else if(mId=="49" || mId=="50" || mId=="51"){//双十一活动
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','SY_LHZQ','WT.event','SY_LJBK_'+$("#cardnum").val(),'WT.si_n','CB_SY_LHZQ_'+$("#cardnum").val(),'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_n','CB_SYKH_XHRW','WT.si_x','21');}
		}else if(mId=="0" || mId=="82"){//线上省内移动流量王
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDLLW_SNXS','WT.event','SNXS_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_SNXS_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="71" || mId=="72" || mId=="96"){//线上全国移动流量王
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDLLW_QGXS','WT.event','QGXS_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_QGXS_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="59"){//线下省内移动流量王
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDLLW_SNXX','WT.event','SNXX_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_SNXX_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="77" || mId=="78" || mId=="97"){//线下全国移动流量王
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDLLW_QGXX','WT.event','QGXX_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_QGXX_YDLLW_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="86" || mId=="143"){//线上移动大王卡
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDDWK_XS','WT.event','YDDWKXS_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_YDDWKXS_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="87" || mId=="88"){//线下移动大王卡
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','YDDWK_XX','WT.event','YDDWKXX_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_YDDWKXX_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="89" || mId=="90" || mId=="91"){//198靓号专区
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','SY_LHZQ','WT.event','SY_LJBK_'+$("#cardnum").val(),'WT.si_n','CB_SY_LHZQ_'+$("#cardnum").val(),'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
		}else if(mId=="101"){//抖音不限量29元
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','DY_XSSK','WT.event','DY_XSSK_LJBL_'+mealmap[mId+'_title'],'WT.si_n','CB_DY_XSSK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="111"){//校园王卡0元办卡
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XYWK','WT.event','XYWK_LJBK','WT.si_n','CB_XYWK_LJBL','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
		}else if(mId=="79" || mId=="80" || mId=="106" || mId=="107" || mId=="108" || mId=="109"){//线下移动不限量
			if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XZXX_QG_BQL','WT.event','XZXX_QGBQL_LJBK_'+mealmap[mId+'_title'],'WT.si_n','CB_XZXX_QGBQL_LJBK_'+mealmap[mId+'_title'],'WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
        }else if(mId=="148") {//移动王卡19元
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJDG_1','WT.si_n','CB_XHRW_YDWKE_LJDG_1','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
        }else if(mId=="146") {//移动王卡49元
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJDG_4','WT.si_n','CB_XHRW_YDWKE_LJDG_2','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
        }else if(mId=="147") {//移动王卡79元
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_YDWKE','WT.event','XHRW_YDWKE_LJDG_7','WT.si_n','CB_XHRW_YDWKE_LJDG_3','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
        }
		$("#checkForm").submit();
	});
	//套餐页面 立即办卡
	$(".plan-ok-ljbk").click(function(){
		var choosePlan=$("#choosePlan").val();
		var planName=$("#planName").val();
		$("#checkForm").submit();
	});
	//切换同心卡套餐
	$(".txk-tc a").click(function(){
		var cssName=$(this).attr("class");
		if(cssName.indexOf("disable")>=0){//当前项不可选
			return false;
		}else{
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var mId=$(this).data("code");
		    $("#mealid").val(mId);	
		}
	})
	//副卡页面变更号码
    $(".bghm").click(function(){
    	$('#phone').val("");
		$('#incode').val("");
		$('.subcard-check-p').val("&nbsp;");
		if (countTime<60) countTime=0;
		$('.pop2').show();
    });
	//副卡 套餐页面 立即办卡
    $(".icevice-ljbk").click(function(){
    	var mId=$('#mealid').val();
    	var mcard=$("#mastercard").val();
    	var btype=$("#blType").val();
    	if(mcard==null || mcard==""){//主卡号码为空
    		$('#phone').val("");
    		$('#incode').val("");
    		if (countTime<60) countTime=0;
    		$('.pop2').show();
    	}else{
    		if(btype=="-1" || btype==null || btype==""){
    			$('.pop1').show();
    		}else{
                if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_FKE','WT.event','XHRW_FKE_BK','WT.si_n','CB_XHRW_FKE_BK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','20');}
    			$("#smscode").val($("#incode").val());
    			$("#checkForm").submit();  
    		}
    	}
    });
});
/**选套餐**/
$(function () {
	$('.sell-telnum-select-pack .more').click(function () {
		$(this).hide().siblings('.less').show();
		$(this).parents('.package').find('.last2').removeClass('none');
	})
	$('.sell-telnum-select-pack .less').click(function () {
		$(this).hide().siblings('.more').show();
		$(this).parents('.package').find('.last2').addClass('none');
	})
})
/*首页*/
$(function(){
	//认证激活跳转
	$(".rzjh").click(function(){
		//高版本app直接调用客户端的内置js
//		if(isHigh!='' && isHigh=='1'){
//			var u = navigator.userAgent;;
		
		
//			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//			if(isiOS){				
//				iOSBridge.h5JumptoNativeByClassName('ECMCVideoIdenController');
//                return;
//			}else{				
//				nativeHelper.toNativeActivity("com.xinhang.mobileclient.ui.activity.CardNumberActivity");		
//				return;
//			}
//		}
		//客户端
		if(channelheader=="channel_app"){
			window.location.href="https://smz.cmcc-cs.cn:30026/edcreg-web/videorealname/realnameActive/realNameActivateM.html";
		}else{
		//微信
		if(is_weixn()){
			if ($('#telNum').length > 0 && $('#simNum').length > 0) {
				window.location.href="https://smz.cmcc-cs.cn:30026/edcreg-web/videorealname/realnameActive/realNameActivateM.html?telNum="+$('#telNum').val()+"&simNum="+$('#simNum').val();
			}else{
				window.location.href="https://smz.cmcc-cs.cn:30026/edcreg-web/videorealname/realnameActive/realNameActivateM.html";
			}
		}else{
			window.location.href="/intro/smrz/index.html";
		}
		}
	})
})
/*弹框*/
$(function(){
	$('.pop .close-btn').click(function(){
		$('.pop').hide();
	})
	$(".pop .close").click(function(){
		$('.pop').hide();
	})
})

/*协议对话框*/
$(function(){
	$('#agree-btn').click(function(){
		$("#agree-pop").show();
		return false;
	})
})

/*退款*/
$(function () {
	$('.refund-reason li').click(function () {
		$('.refund-reason li').removeClass('on');
		$(this).addClass('on');
		$('.refund-reason li:last-child').removeClass('on');		
	})
	//确定退款
	$('.big-blue-btn-refuse').click(function () {
		$(".error").html("");	
		$(".error").hide();	
		if($(".refund-reason .on").html()){
			$("#refuseinfo").val($(".refund-reason .on").attr("data-name"));							
		}else{			
			if($("#txtReason").val()){
				$("#refuseinfo").val($("#txtReason").val());		
			}else{
				$(".error").html("请填写退款原因");	
				$(".error").show();
				return;
			}
		}
		$("#refuseForm").submit(); 
	})
    $('.refund-reason-link').click(function(){
        $('.refund-reason-pop p').html($(this).data("msg"));
        $('.refund-reason-pop').show();
    })
    $('.refund-reason-pop .close-btn').click(function(){
        $('.refund-reason-pop').hide();
    })
})

/**选择号码**/
$(function () {
	$('.sell-num-picknum .tel-list li').click(function () {
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.sell-num-picknum .footer').fadeOut();
			$("#cardnum").val("");
//			$("#region").val("");
		}else{
			$('.sell-num-picknum .tel-list li').removeClass('on');
			$(this).addClass('on');
			$('.sell-num-picknum .footer').fadeIn();			
			$("#cardnum").val($(this).children("a").data("card"));
			$("#region").val($(this).children("a").data("region"));
		}

	})
	//卡号展开收起
    $('.zk-sq-box .zk').click(function(){
        $(this).removeClass('show').siblings('a').addClass('show');
        $('.index-con>ul').css('maxHeight','none');
        return false;
    });
    $('.zk-sq-box .sq').click(function(){
        $(this).removeClass('show').siblings('a').addClass('show');
        $('.index-con>ul').css('maxHeight','32rem');
        return false;
    });
    //搜索号码
    $('.search-btn-box').click(function(){       
    	if($("#endStr").val() && $("#endStr").val().length==1){
    		alert('尾号请输入2-11位数字');
    		return;
    	}
        $("#cardForm").submit();      
    });
    //选择号码
    $('.big-blue-btn-card').click(function(){  
    	if($("#cardnum").val() && $("#region").val()){
    		$("#checkForm").submit();
    	}    	     
    });    
})

//是否从微信跳转
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
//号码搜索尾号限制长度
function checkTextLength(obj, length) {      
   if(obj.value.length > length){ 
	   obj.value = obj.value.substr(0, length);   
     }
}
//判断是否移动号码
function ValidateCallNumber(strCallNumber){
	 
	return isCMCCNumber(strCallNumber);
}
//订单查询
/*订单填写*/
$(function () {	
	//订单提交
	$('.big-blue-btn-query').click(function(){
		$("div").removeClass("border-red");
		$(".error").html("");	
		$(".error").hide();	
		var phone=$("#txtPhone").val();
		var card=$("#txtUsercard").val();//身份证
		if(phone==""){
			$(".error").html("请输入收件联系电话");	
			$(".error").show();
			$("#txtPhone").focus();
			$('#id-phone').addClass("border-red");
			return;
		}
		if(!mobile_reg.test(phone) && !phone_reg.test(phone)){
			$(".error").html("请输入正确的收件联系电话");	
			$(".error").show();
			$("#txtPhone").focus();
			$('#id-phone').addClass("border-red");
			return;
		}
		if(card==""){
			$(".error").html("入网身份证号后6位");	
			$(".error").show();
			$("#txtUsercard").focus();
			$('#id-card').addClass("border-red");
			return;
		}
		var reg = /(^\d{6}$)|(^\d{5}(\d|X|x)$)/;  
	    if(reg.test(card) === false)  
		{ 
	    	$(".error").html("入网身份证号后6位");	
	    	$(".error").show();
			$("#txtUsercard").focus();
			$('#id-card').addClass("border-red");
			return;	 
		}
	    
	    //验证码
	    var verCode=$("#validateCode").val();
	    if(verCode==""){
	    	$(".error").html("请输入验证码");	
			$(".error").show();
			$("#validateCode").focus();
			$('#id-veri').addClass("border-red");
			return;
	    }
	    if(verCode.length<4){
	    	$(".error").html("请输入正确的验证码");	
			$(".error").show();
			$("#validateCode").focus();
			$('#id-veri').addClass("border-red");
			return;
	    }
	    
	    //加插码
	    var lastUrl=document.referrer;
	    if(lastUrl.indexOf("/activity/phone-sale2017.action")>=0){//从2017高校新生专享福利活动页面过来
	    	if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.nv','XYHD'+sdc_dymname,'WT.event','XYHD_LJCX'+sdc_dymname);}
	    }
	    
		$("#queryForm").submit();  
	})
})
/************同心卡界面 短信码验证开始*****************/
//同心卡界面弹出提示信息
function showMsg(type,msg){
	if(type=="smscodefail"){
		$(".subcard-check-p").html(msg);
	}else if(type=="subcheckfail"){
		$('#pmsg').html(msg);
		$('.pop1').show();
	}
}
$(function(){
	//发送短信验证码
	$('#GETSMSPWD').click(function(){
		showMsg("smscodefail","&nbsp;");
		var reportNo = $("#phone").val(); //联系电话
		if (reportNo == undefined || reportNo == "" || reportNo.length != 11||!ValidateCallNumber(reportNo)) {
			$("#phone").focus();
			showMsg("smscodefail","请输入正确的手机号码！");
			return;
		}
		//增加插码
		if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.event','TXKTC_HQYZM'+sdc_dymname);}
		
		$.ajax({
			type : "POST",
			url : '/pay/card-sale!sendSmsCode.action',
			dataType : 'json',
			data : {linkMobileNo : reportNo},
			async: false,
			success : function(html) {
				if (html.returnCode == 'succ') {
					getMessTime();
					$(this).unbind('click');
					return;
				} else if (html.returnCode == 'info') {
					getMessTime();
					$(this).unbind('click');
					return;
				} else {
					showMsg("smscodefail","系统异常,请重试");
					return;
				}
			},
			error : function(html) {
				showMsg("smscodefail","系统异常,请重试");
				return;
			},
			timeout : function(html) {
				showMsg("smscodefail","调用超时,请重试");
				return;
			}
		});
	});
	
	//短信验证码校验
	$('.txk-smscheck').click(function(){
		checkSmsVerifyCode();
	});
});

window.countTime = 60;
//倒计时
function getMessTime() {
	if (countTime == 0) {
		countTime = 60;
		$('#GETSMSPWD').show();
		$('#tick').html("").hide();
	} else {
		$('#GETSMSPWD').hide();
		$('#tick').html('剩余'+countTime+'秒').show();
		countTime--;
		setTimeout(getMessTime, 1000);
	}
}


function getPlan(choosePlan,chooseOffer){
	if(choosePlan==""){
		return false;
	}
	$.ajax({
		type : "POST",
		url : '/pay/card-sale!gainPlan.action',
		data : "choosePlan=" + choosePlan + "&chooseOffer=" + chooseOffer,
		dataType : 'json',
		async: false,
		success : function(html) {
			if("Y"==html.returnCode){//查询成功
				$("#choosePlan").val(html.choosePlan);
				$("#chooseOffer").val(html.chooseOffer);
				$("#planName").val(html.planName);
				$("#free").val(html.free);
				return true;
			}else{
				return false;
			}
		},
		error : function(html) {
			return false;
		},
		timeout : function(html) {
			return false;
		}
	});
}

//校验短信验证码
function checkSmsVerifyCode() {
	showMsg("smscodefail","&nbsp;");
	var reportNo = $("#phone").val();//主卡号码
	if (reportNo == undefined || reportNo == "" || reportNo.length != 11||!ValidateCallNumber(reportNo)) {
		showMsg("smscodefail","请输入正确的主卡手机号码！");
		$("#phone").focus();
		return false; 
	}
	var incode=$("#incode").val();//短信验证码
	if(incode==""){
		showMsg("smscodefail","请输入短信验证码");
		$("#incode").focus();
		return false;
	}
	var mId=$("#mealid").val();
	var mealType="";
	var ret=false;
	$.ajax({
		type : "POST",
		url : '/pay/card-sale!checkSubCard.action',
		data : "verifyCode=" + incode + "&linkMobileNo=" + reportNo+ "&mealid=" + mId+ "&mealType=" + mealType,
		dataType : 'json',
		async: false,
		success : function(html) {
			if(!"55"==mId){//冰淇淋副卡
				//设置第一个套餐选中状态
				$(".txk-tc a").removeClass("disable");
				$(".txk-tc a").removeClass("on");
				$(".txk-tc a").eq(0).addClass("on");
				$("#mealid").val($(".txk-tc a").eq(0).data("code"));
			}
			//校验结果
			if (html.returnCode == 'succ') {
				ret=true;
				$("#blType").val(html.blType);
				$("#mastercard").val(reportNo);
				$("#mealid").val(html.mealinfo);
				$(".bghm").html(reportNo);
                $(".showzk").show();
                $(".nozk").hide();
                $('.pop2').hide();
			} else {
//				$("#blType").val("-1");
//				$("#mastercard").val("");
				if(html.returnMessage.indexOf("您不符合参与该活动的条件")>=0){
					$('.pop2').hide();
					showMsg("subcheckfail",html.returnMessage);
				}else{
					showMsg("smscodefail",html.returnMessage);
				}
			}
		},
		error : function(html) {
			showMsg("smscodefail","系统异常,请重试");
		},
		timeout : function(html) {
			showMsg("smscodefail","调用超时,请重试");
		}
	});
	return ret;
}
/************同心卡界面 短信码验证结束*****************/
//联系方式手机号码及固话正则表达式
var mobile_reg = /^1[0-9]{10}$/;  
var phone_reg = /^0\d{2,3}-?\d{7,8}$/;

var mealmap = {};
//套餐对应图片、价钱、名称及营销语
mealmap['0_proid']='100168000825';mealmap['0_price']='10';mealmap['0_title']='移动流量王-28元A套餐2017版';mealmap['0_fee']='28';
mealmap['1_proid']='100168000826';mealmap['1_price']='20';mealmap['1_title']='移动流量王-48元A套餐2017版';mealmap['1_fee']='48';
mealmap['2_proid']='100168000462';mealmap['2_price']='100';mealmap['2_title']='流量大王卡';
mealmap['3_proid']='100168001149_CS';mealmap['3_price']='1';mealmap['3_title']='移动大王卡-18元套餐';mealmap['3_fee']='18';
mealmap['4_proid']='100168000482';mealmap['4_price']='300';mealmap['4_title']='移动冰激凌套餐';
mealmap['5_proid']='100168000482';mealmap['5_price']='100';mealmap['5_title']='移动冰激凌套餐';
mealmap['6_proid']='100168000509';mealmap['6_price']='200';mealmap['6_title']='移动流量王2017版-98元';mealmap['6_fee']='98';
mealmap['7_proid']='100168000459_1';mealmap['7_price']='0';mealmap['7_title']='移动同心卡28元档';mealmap['7_fee']='28';
mealmap['8_proid']='100168000459_2';mealmap['8_price']='0';mealmap['8_title']='移动同心卡48元档';mealmap['8_fee']='48';
mealmap['9_proid']='100168000257';mealmap['9_price']='60';mealmap['9_title']='4G飞享套餐-18元套餐（100M）';mealmap['9_active']='存60送60+120分钟*12个月+2G';mealmap['9_fee']='18';
mealmap['10_proid']='100168000258';mealmap['10_price']='60';mealmap['10_title']='4G飞享套餐-28元A套餐（50分+100M）';mealmap['10_active']='存60送60+120分钟*12个月+2G';mealmap['10_fee']='28';
mealmap['11_proid']='100168000370';mealmap['11_price']='60';mealmap['11_title']='4G飞享套餐-28元B套餐（0分+300M）';mealmap['11_active']='存60送60+120分钟*12个月+2G';mealmap['11_fee']='28';
mealmap['12_proid']='100168000245';mealmap['12_price']='60';mealmap['12_title']='4G飞享套餐-38元A套餐（50分+300M）2015版新';mealmap['12_active']='存60送60+150分钟*12个月+2G';mealmap['12_fee']='38';
mealmap['13_proid']='100168000371';mealmap['13_price']='60';mealmap['13_title']='4G飞享套餐-38元B套餐（0分+500M）';mealmap['13_active']='存60送60+150分钟*12个月+2G';mealmap['13_fee']='38';
mealmap['14_proid']='100168000247';mealmap['14_price']='60';mealmap['14_title']='4G飞享套餐-48元A套餐（100分+300M）2015版新';mealmap['14_active']='存60送60+150分钟*12个月+2G';mealmap['14_fee']='48';
mealmap['15_proid']='100168000248';mealmap['15_price']='60';mealmap['15_title']='4G飞享套餐-58元A套餐（100分+500M）2015版新';mealmap['15_active']='存60送60+150分钟*12个月+2G';mealmap['15_fee']='58';
mealmap['16_proid']='100168000763';mealmap['16_price']='60';mealmap['16_title']='4G飞享套餐-68元套餐(80分钟+2G)2017版';mealmap['16_active']='存60送60+150分钟*12个月+2G';mealmap['16_fee']='68';
mealmap['17_proid']='100168000653';mealmap['17_price']='100';mealmap['17_title']='4G飞享套餐-78元套餐(150分钟+2G)2017版';mealmap['17_active']='存100送240+4108M*12个月';mealmap['17_fee']='78';
mealmap['18_proid']='100168000654';mealmap['18_price']='100';mealmap['18_title']='4G飞享套餐-88元套餐(220分钟+2G)2017版';mealmap['18_active']='存100送240+4108M*12个月';mealmap['18_fee']='88';
mealmap['19_proid']='100168000658';mealmap['19_price']='100';mealmap['19_title']='4G飞享套餐-108元套餐(220分钟+3G)2017版';mealmap['19_active']='存100送240+4108M*12个月';mealmap['19_fee']='108';
mealmap['20_proid']='100168000662';mealmap['20_price']='200';mealmap['20_title']='4G飞享套餐-138元B套餐(500分钟+3G)2017版';mealmap['20_active']='存200送480+6G*12个月';mealmap['20_fee']='138';
mealmap['21_proid']='100168000661';mealmap['21_price']='200';mealmap['21_title']='4G飞享套餐-158元套餐(700分钟+3G)2017版';mealmap['21_active']='存200送480+6G*12个月';mealmap['21_fee']='158';
mealmap['22_proid']='100168000772';mealmap['22_price']='200';mealmap['22_title']='4G飞享套餐-188元B套餐(700分钟+5G)2017版';mealmap['22_active']='存200送480+10G*12个月';mealmap['22_fee']='188';
mealmap['23_proid']='100168000773';mealmap['23_price']='200';mealmap['23_title']='4G飞享套餐-238元B套餐(1200分钟+5G)2017版';mealmap['23_active']='存200送480+10G*12个月';mealmap['23_fee']='238';
mealmap['24_proid']='100168000789';mealmap['24_price']='200';mealmap['24_title']='4G飞享套餐-388元B套餐(2000分钟+15G)2017版';mealmap['24_active']='存200送480+10G*12个月';mealmap['24_fee']='388';
mealmap['517_pic']='lh.jpg';mealmap['517_proid']='';mealmap['517_price']='188';mealmap['517_title']='188靓号';mealmap['517_intro']='【188靓号抢购】188尊享号段，尊贵之选。';
mealmap['25_proid']='100168000567';mealmap['25_price']='0';mealmap['25_title']='任我看套餐-9元-优酷';mealmap['25_fee']='9';
mealmap['26_proid']='100168000570';mealmap['26_price']='0';mealmap['26_title']='任我看套餐-9元-咪咕视频';mealmap['26_fee']='9';
mealmap['27_proid']='100168000571';mealmap['27_price']='0';mealmap['27_title']='任我看套餐-9元-咪咕直播';mealmap['27_fee']='9';
mealmap['28_proid']='100168000572';mealmap['28_price']='0';mealmap['28_title']='任我看套餐-9元-PPTV';mealmap['28_fee']='9';
mealmap['29_proid']='100168000574';mealmap['29_price']='0';mealmap['29_title']='任我看套餐-24元-腾讯';mealmap['29_fee']='24';
mealmap['30_proid']='100168000575';mealmap['30_price']='0';mealmap['30_title']='任我看套餐-24元-优酷';mealmap['30_fee']='24';
mealmap['31_proid']='100168000578';mealmap['31_price']='0';mealmap['31_title']='任我看套餐-24元-咪咕视频';mealmap['31_fee']='24';
mealmap['32_proid']='100168000579';mealmap['32_price']='0';mealmap['32_title']='任我看套餐-24元-咪咕直播';mealmap['32_fee']='24';
mealmap['33_proid']='100168000580';mealmap['33_price']='0';mealmap['33_title']='任我看套餐-24元-PPTV';mealmap['33_fee']='24';
mealmap['34_proid']='100168000508_ZYK';mealmap['34_price']='100';mealmap['34_title']='移动状元卡48元';mealmap['34_fee']='48';
mealmap['35_proid']='100168000814';mealmap['35_price']='0';mealmap['35_title']='校园任我用-18元套餐';mealmap['35_fee']='18';
mealmap['36_proid']='100168000812';mealmap['36_price']='0';mealmap['36_title']='校园任我用-38元套餐';mealmap['36_fee']='38';
mealmap['37_proid']='100168000813';mealmap['37_price']='0';mealmap['37_title']='校园任我用-58元套餐';mealmap['37_fee']='58';
mealmap['35_1_pic']='order_detail8.png';mealmap['35_1_proid']='100168000814';mealmap['35_1_price']='0';mealmap['35_1_title']='校园任我用-18元套餐';mealmap['35_1_intro']='河南考生免费领取！';
mealmap['36_1_pic']='order_detail8.png';mealmap['36_1_proid']='100168000812';mealmap['36_1_price']='0';mealmap['36_1_title']='校园任我用-38元套餐';mealmap['36_1_intro']='河南考生免费领取！';
mealmap['37_1_pic']='order_detail8.png';mealmap['37_1_proid']='100168000813';mealmap['37_1_price']='0';mealmap['37_1_title']='校园任我用-58元套餐';mealmap['37_1_intro']='河南考生免费领取！';
mealmap['35_2_pic']='order_detail9.jpg';mealmap['35_2_proid']='100168000814';mealmap['35_2_price']='0';mealmap['35_2_title']='校园任我用-18元套餐';mealmap['35_2_intro']='郑州新生免费领取！';
mealmap['36_2_pic']='order_detail9.jpg';mealmap['36_2_proid']='100168000812';mealmap['36_2_price']='0';mealmap['36_2_title']='校园任我用-38元套餐';mealmap['36_2_intro']='郑州新生免费领取！';
mealmap['37_2_pic']='order_detail9.jpg';mealmap['37_2_proid']='100168000813';mealmap['37_2_price']='0';mealmap['37_2_title']='校园任我用-58元套餐';mealmap['37_2_intro']='郑州新生免费领取！';
mealmap['38_proid']='100168000566';mealmap['38_price']='0';mealmap['38_title']='任我看套餐-9元-腾讯';mealmap['38_fee']='9';
mealmap['39_proid']='100168000565';mealmap['39_price']='0';mealmap['39_title']='任我看套餐-9元-爱奇艺';mealmap['39_fee']='9';
mealmap['40_proid']='100168000573';mealmap['40_price']='0';mealmap['40_title']='任我看套餐-24元-爱奇艺';mealmap['40_fee']='24';
mealmap['41_proid']='100168000942';mealmap['41_price']='50';mealmap['41_title']='移动冰激凌-98元套餐(副卡版)';mealmap['41_fee']='98';
mealmap['39_3_pic']='order_detail11.png';mealmap['39_3_proid']='100168000565';mealmap['39_3_price']='0';mealmap['39_3_title']='任我看套餐-9元-爱奇艺';mealmap['39_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['38_3_pic']='order_detail11.png';mealmap['38_3_proid']='100168000566';mealmap['38_3_price']='0';mealmap['38_3_title']='任我看日租卡-腾讯';mealmap['38_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['25_3_pic']='order_detail11.png';mealmap['25_3_proid']='100168000567';mealmap['25_3_price']='0';mealmap['25_3_title']='任我看日租卡-优酷';mealmap['25_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['26_3_pic']='order_detail11.png';mealmap['26_3_proid']='100168000570';mealmap['26_3_price']='0';mealmap['26_3_title']='任我看日租卡-咪咕视频';mealmap['26_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['27_3_pic']='order_detail11.png';mealmap['27_3_proid']='100168000571';mealmap['27_3_price']='0';mealmap['27_3_title']='任我看日租卡-咪咕直播';mealmap['27_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['28_3_pic']='order_detail11.png';mealmap['28_3_proid']='100168000572';mealmap['28_3_price']='0';mealmap['28_3_title']='任我看日租卡-PPTV';mealmap['28_3_intro']='1元500M省内通用流量，自动叠加，国内接听免费，每月赠送3G视频流量，激活即送15元话费。';
mealmap['42_proid']='100168000459_3';mealmap['42_price']='0';mealmap['42_title']='移动同心卡18元档';mealmap['42_fee']='18';
mealmap['43_proid']='100168001092_JGK';mealmap['43_price']='10';mealmap['43_title']='移动流量王全国版-38元B套餐(80分钟+3G)';mealmap['43_fee']='38';
mealmap['44_proid']='100168001096_JGK';mealmap['44_price']='20';mealmap['44_title']='移动流量王全国版-68元B套餐(180分钟+6G)';mealmap['44_fee']='68';
mealmap['45_proid']='100168001103_JGK';mealmap['45_price']='50';mealmap['45_title']='移动冰激凌全国版-138元套餐';mealmap['45_fee']='138';
mealmap['46_proid']='100168000823';mealmap['46_price']='100';mealmap['46_title']='移动冰激凌-188元A套餐';mealmap['46_fee']='188';
mealmap['47_proid']='100168000826_MDK';mealmap['47_price']='100';mealmap['47_title']='移动流量王-48元A套餐2017版';mealmap['47_fee']='48';
mealmap['48_proid']='100168000790';mealmap['48_price']='200';mealmap['48_title']='4G飞享套餐-488元B套餐(4000分钟+15G)2017版';mealmap['48_active']='存200送480+10G*12个月';mealmap['48_fee']='488';
mealmap['49_proid']='100168000942_HD1';mealmap['49_price']='500';mealmap['49_title']='移动冰激凌-98元套餐(副卡版)';mealmap['49_fee']='98';
mealmap['50_proid']='100168000942_HD2';mealmap['50_price']='300';mealmap['50_title']='移动冰激凌-98元套餐(副卡版)';mealmap['50_fee']='98';
mealmap['51_proid']='100168000942_HD3';mealmap['51_price']='100';mealmap['51_title']='移动冰激凌-98元套餐(副卡版)';mealmap['51_fee']='98';
mealmap['52_proid']='100168000506';mealmap['52_price']='10';mealmap['52_title']='4G飞享套餐-8元套餐（30分钟）';mealmap['52_active']='存10元';mealmap['52_fee']='8';
mealmap['53_proid']='100168000812_ZWY';mealmap['53_price']='0';mealmap['53_title']='校园任我用-38元套餐';mealmap['53_fee']='38';
mealmap['54_proid']='100168000813_ZWY';mealmap['54_price']='0';mealmap['54_title']='校园任我用-58元套餐';mealmap['54_fee']='58';
mealmap['55_proid']='100168000849';mealmap['55_price']='0';mealmap['55_title']='家和卡';mealmap['55_fee']='8';
mealmap['56_proid']='100168000850';mealmap['56_price']='100';mealmap['56_title']='移动冰激凌-188元B套餐';mealmap['56_fee']='188';
mealmap['57_proid']='100168001008';mealmap['57_price']='0';mealmap['57_title']='移动日租卡-18元A套餐';mealmap['57_fee']='18';
mealmap['58_proid']='100168001006';mealmap['58_price']='0';mealmap['58_title']='任我看日租卡-18元A套餐';mealmap['58_fee']='18';
mealmap['59_proid']='100168000826_SHQD';mealmap['59_price']='100';mealmap['59_title']='移动流量王-48元A套餐2017版';mealmap['59_fee']='48';
mealmap['60_proid']='100168000814_ZZ';mealmap['60_price']='20';mealmap['60_title']='校园任我用-18元套餐';mealmap['60_fee']='18';
mealmap['61_proid']='100168000812_ZZ';mealmap['61_price']='50';mealmap['61_title']='校园任我用-38元套餐';mealmap['61_fee']='38';
mealmap['62_proid']='100168000813_ZZ';mealmap['62_price']='100';mealmap['62_title']='校园任我用-58元套餐';mealmap['62_fee']='58';
mealmap['63_proid']='100168001008_HD1';mealmap['63_price']='30';mealmap['63_title']='移动日租卡-18元A套餐';mealmap['63_fee']='18';
mealmap['64_proid']='100168001008_HD2';mealmap['64_price']='50';mealmap['64_title']='移动日租卡-18元A套餐';mealmap['64_fee']='18';
mealmap['65_proid']='100168001050';mealmap['65_price']='0';mealmap['65_title']='移动日租卡-18元C套餐';mealmap['65_fee']='18';
mealmap['66_proid']='100168001051';mealmap['66_price']='0';mealmap['66_title']='任我看日租卡-18元C套餐';mealmap['66_fee']='18';
mealmap['67_proid']='100168001050_HD1';mealmap['67_price']='30';mealmap['67_title']='移动日租卡-18元C套餐';mealmap['67_fee']='18';
mealmap['68_proid']='100168001050_HD2';mealmap['68_price']='50';mealmap['68_title']='移动日租卡-18元C套餐';mealmap['68_fee']='18';
mealmap['69_proid']='100168001051_HD1';mealmap['69_price']='30';mealmap['69_title']='任我看日租卡-18元C套餐';mealmap['69_fee']='18';
mealmap['70_proid']='100168001051_HD2';mealmap['70_price']='50';mealmap['70_title']='任我看日租卡-18元C套餐';mealmap['70_fee']='18';
mealmap['71_proid']='100168001092';mealmap['71_price']='20';mealmap['71_title']='移动流量王全国版-38元B套餐(80分钟+3G)';mealmap['71_fee']='38';
mealmap['72_proid']='100168001552';mealmap['72_price']='30';mealmap['72_title']='移动流量王全国版-58元B套餐（180分钟+4G）';mealmap['72_fee']='58';
mealmap['73_proid']='100168001557';mealmap['73_price']='50';mealmap['73_title']='移动20G套餐-98元套餐';mealmap['73_fee']='98';
mealmap['74_proid']='100168001561';mealmap['74_price']='100';mealmap['74_title']='移动40G套餐-188元套餐';mealmap['74_fee']='188';
mealmap['75_proid']='100168001050_1';mealmap['75_price']='0';mealmap['75_title']='移动日租卡-18元C套餐';mealmap['75_fee']='18';
mealmap['76_proid']='100168001050_SHQD2';mealmap['76_price']='50';mealmap['76_title']='移动日租卡-18元C套餐';mealmap['76_fee']='18';
mealmap['77_proid']='100168001092_SHQD';mealmap['77_price']='100';mealmap['77_title']='移动流量王全国版-38元B套餐(80分钟+3G)';mealmap['77_fee']='38';
mealmap['78_proid']='100168001552_SHQD';mealmap['78_price']='100';mealmap['78_title']='移动流量王全国版-58元B套餐（180分钟+4G）';mealmap['78_fee']='58';
mealmap['79_proid']='100168001557_SHQD';mealmap['79_price']='100';mealmap['79_title']='移动20G套餐-98元套餐';mealmap['79_fee']='98';
mealmap['80_proid']='100168001561_SHQD';mealmap['80_price']='500';mealmap['80_title']='移动40G套餐-188元套餐';mealmap['80_fee']='188';
mealmap['81_proid']='100168001050_SHQD1';mealmap['81_price']='30';mealmap['81_title']='移动日租卡-18元C套餐';mealmap['81_fee']='18';
mealmap['82_proid']='100168000826_1';mealmap['82_price']='20';mealmap['82_title']='移动流量王-48元A套餐2017版';mealmap['82_fee']='48';
mealmap['83_proid']='100168000942_K';mealmap['83_price']='50';mealmap['83_title']='移动冰激凌-98元B套餐(副卡版)';mealmap['83_fee']='98';
mealmap['84_proid']='100168000850_K';mealmap['84_price']='100';mealmap['84_title']='移动冰激凌-188元B套餐';mealmap['84_fee']='188';
mealmap['85_proid']='100168000826_K';mealmap['85_price']='30';mealmap['85_title']='移动流量王-48元A套餐2017版';mealmap['85_fee']='48';
mealmap['86_proid']='100168001149';mealmap['86_price']='0';mealmap['86_title']='移动王卡18元套餐';mealmap['86_fee']='18';
mealmap['87_proid']='100168002199_SHQD1';mealmap['87_price']='50';mealmap['87_title']='移动王卡-19元套餐';mealmap['87_fee']='19';
mealmap['88_proid']='100168002199_SHQD2';mealmap['88_price']='50';mealmap['88_title']='移动王卡-19元套餐';mealmap['88_fee']='19';
mealmap['89_proid']='100168001557_HD1';mealmap['89_price']='500';mealmap['89_title']='移动20G套餐-98元套餐';mealmap['89_fee']='98';
mealmap['90_proid']='100168001557_HD2';mealmap['90_price']='300';mealmap['90_title']='移动20G套餐-98元套餐';mealmap['90_fee']='98';
mealmap['91_proid']='100168001557_HD3';mealmap['91_price']='100';mealmap['91_title']='移动20G套餐-98元套餐';mealmap['91_fee']='98';
mealmap['92_proid']='100168000814_X';mealmap['92_price']='0';mealmap['92_title']='校园任我用-18元套餐';mealmap['92_fee']='18';
mealmap['93_proid']='100168000812_X';mealmap['93_price']='0';mealmap['93_title']='校园任我用-38元套餐';mealmap['93_fee']='38';
mealmap['94_proid']='100168000813_X';mealmap['94_price']='0';mealmap['94_title']='校园任我用-58元套餐';mealmap['94_fee']='58';
mealmap['95_proid']='100168000834_X';mealmap['95_price']='0';mealmap['95_title']='校园任我用-78元套餐';mealmap['95_fee']='78';
mealmap['96_proid']='100168001088';mealmap['96_price']='10';mealmap['96_title']='移动流量王全国版-18元套餐(80分钟+200M)';mealmap['96_fee']='18';
mealmap['97_proid']='100168001088_SHQD';mealmap['97_price']='50';mealmap['97_title']='移动流量王全国版-18元套餐(80分钟+200M)';mealmap['97_fee']='18';
mealmap['98_proid']='100168001557_JK';mealmap['98_price']='100';mealmap['98_title']='移动不限量-98元套餐';mealmap['98_fee']='98';
mealmap['99_proid']='100168001553';mealmap['99_price']='30';mealmap['99_title']='移动10G套餐-68元B套餐';mealmap['99_fee']='68';
mealmap['100_proid']='100168001555';mealmap['100_price']='40';mealmap['100_title']='移动15G套餐-78元B套餐';mealmap['100_fee']='78';
mealmap['101_proid']='100168001557_YW';mealmap['101_price']='0';mealmap['101_title']='移动不限量-98元套餐';mealmap['101_fee']='98';
mealmap['102_proid']='100168001149_QMX';mealmap['102_price']='0';mealmap['102_title']='移动王卡18元套餐';mealmap['102_fee']='18';
mealmap['103_proid']='100168001149_TZS';mealmap['103_price']='0';mealmap['103_title']='移动王卡18元套餐';mealmap['103_fee']='18';
mealmap['104_proid']='100168001553_TZS';mealmap['104_price']='0';mealmap['104_title']='移动10G套餐-68元B套餐';mealmap['104_fee']='68';
mealmap['105_proid']='100168001557_TZS';mealmap['105_price']='0';mealmap['105_title']='移动20G套餐-98元套餐';mealmap['105_fee']='98';
mealmap['106_proid']='100168001553_SHQD';mealmap['106_price']='50';mealmap['106_title']='移动10G套餐-68元B套餐';mealmap['106_fee']='68';
mealmap['107_proid']='100168001555_SHQD';mealmap['107_price']='100';mealmap['107_title']='移动15G套餐-78元B套餐';mealmap['107_fee']='78';
mealmap['108_proid']='100168001553_H';mealmap['108_price']='50';mealmap['108_title']='移动不限量-68元B套餐';mealmap['108_fee']='68';
mealmap['109_proid']='100168001554_H';mealmap['109_price']='100';mealmap['109_title']='移动不限量-78元A套餐';mealmap['109_fee']='78';
mealmap['110_proid']='100168001149_QIY';mealmap['110_price']='0';mealmap['110_title']='移动王卡18元套餐';mealmap['110_fee']='18';
mealmap['111_proid']='100168002260';mealmap['111_price']='0';mealmap['111_title']='校园王卡-19元套餐';mealmap['111_fee']='19';
mealmap['112_proid']='100168001557_SHQD2';mealmap['112_price']='100';mealmap['112_title']='移动不限量-98元套餐';mealmap['112_fee']='98';
mealmap['113_proid']='100168001561_SHQD2';mealmap['113_price']='500';mealmap['113_title']='移动不限量-188元套餐';mealmap['113_fee']='188';
mealmap['114_proid']='100168000463';mealmap['114_price']='0';mealmap['114_title']='家和卡';mealmap['114_fee']='8';
mealmap['115_proid']='100168001875_SHQD';mealmap['115_price']='0';mealmap['115_title']='校园王卡-18元套餐';mealmap['115_fee']='18';
mealmap['116_proid']='100168001875_MA';mealmap['116_price']='0';mealmap['116_title']='校园王卡-18元套餐';mealmap['116_fee']='18';
mealmap['117_proid']='100168001876_MA';mealmap['117_price']='0';mealmap['117_title']='校园王卡-38元套餐';mealmap['117_fee']='38';
mealmap['118_proid']='100168001877_MA';mealmap['118_price']='0';mealmap['118_title']='校园王卡-58元套餐';mealmap['118_fee']='58';
mealmap['119_proid']='100168001555_MA';mealmap['119_price']='0';mealmap['119_title']='移动15G套餐-78元B套餐';mealmap['119_fee']='78';
mealmap['120_proid']='100168001875_ZA';mealmap['120_price']='20';mealmap['120_title']='校园王卡-18元套餐';mealmap['120_fee']='18';
mealmap['121_proid']='100168001876_ZA';mealmap['121_price']='50';mealmap['121_title']='校园王卡-38元套餐';mealmap['121_fee']='38';
mealmap['122_proid']='100168001877_ZA';mealmap['122_price']='100';mealmap['122_title']='校园王卡-58元套餐';mealmap['122_fee']='58';
mealmap['123_proid']='100168001555_ZA';mealmap['123_price']='100';mealmap['123_title']='移动15G套餐-78元B套餐';mealmap['123_fee']='78';
mealmap['124_proid']='100168001875_Q';mealmap['124_price']='20';mealmap['124_title']='校园王卡-18元套餐';mealmap['124_fee']='18';
mealmap['125_proid']='100168001876_Q';mealmap['125_price']='50';mealmap['125_title']='校园王卡-38元套餐';mealmap['125_fee']='38';
mealmap['126_proid']='100168001877_Q';mealmap['126_price']='100';mealmap['126_title']='校园王卡-58元套餐';mealmap['126_fee']='58';
mealmap['127_proid']='100168001876_MQ';mealmap['127_price']='0';mealmap['127_title']='校园王卡-38元套餐';mealmap['127_fee']='38';
mealmap['128_proid']='100168001877_MQ';mealmap['128_price']='0';mealmap['128_title']='校园王卡-58元套餐';mealmap['128_fee']='58';
mealmap['129_proid']='100168001553_Q';mealmap['129_price']='50';mealmap['129_title']='移动10G套餐-68元B套餐';mealmap['129_fee']='68';
mealmap['130_proid']='100168001555_Q';mealmap['130_price']='50';mealmap['130_title']='移动15G套餐-78元B套餐';mealmap['130_fee']='78';
mealmap['131_proid']='100168001149_ZZ';mealmap['131_price']='0';mealmap['131_title']='移动王卡18元套餐';mealmap['131_fee']='18';
mealmap['132_proid']='100168001553_ZZ';mealmap['132_price']='0';mealmap['132_title']='移动10G套餐-68元B套餐';mealmap['132_fee']='68';
mealmap['133_proid']='100168001555_ZZ';mealmap['133_price']='0';mealmap['133_title']='移动15G套餐-78元B套餐';mealmap['133_fee']='78';
mealmap['134_proid']='100168001557_MQ';mealmap['134_price']='0';mealmap['134_title']='移动20G套餐-98元套餐';mealmap['134_fee']='98';
mealmap['135_proid']='100168001557_Q';mealmap['135_price']='100';mealmap['135_title']='移动20G套餐-98元套餐';mealmap['135_fee']='98';
mealmap['136_proid']='100168001875_E';mealmap['136_price']='20';mealmap['136_title']='校园王卡-18元套餐';mealmap['136_fee']='18';
mealmap['137_proid']='100168001876_E';mealmap['137_price']='50';mealmap['137_title']='校园王卡-38元套餐';mealmap['137_fee']='38';
mealmap['138_proid']='100168001877_E';mealmap['138_price']='100';mealmap['138_title']='校园王卡-58元套餐';mealmap['138_fee']='58';
mealmap['139_proid']='100168001555_E';mealmap['139_price']='50';mealmap['139_title']='移动15G套餐-78元B套餐';mealmap['139_fee']='78';
mealmap['140_proid']='100168001875_G';mealmap['140_price']='20';mealmap['140_title']='校园王卡-18元套餐';mealmap['140_fee']='18';
mealmap['141_proid']='100168001876_G';mealmap['141_price']='50';mealmap['141_title']='校园王卡-38元套餐';mealmap['141_fee']='38';
mealmap['142_proid']='100168001877_G';mealmap['142_price']='100';mealmap['142_title']='校园王卡-58元套餐';mealmap['142_fee']='58';
mealmap['143_proid']='100168001149_LL';mealmap['143_price']='0';mealmap['143_title']='移动王卡18元套餐';mealmap['143_fee']='18';
mealmap['144_proid']='100168001149_ZZLL';mealmap['144_price']='0';mealmap['144_title']='移动王卡18元套餐';mealmap['144_fee']='18';
mealmap['145_proid']='100168002199_PDD';mealmap['145_price']='0';mealmap['145_title']='移动王卡-19元';mealmap['145_fee']='19';
mealmap['146_proid']='100168002100';mealmap['146_price']='40';mealmap['146_title']='移动王卡-49元';mealmap['146_fee']='49';
mealmap['147_proid']='100168002101';mealmap['147_price']='50';mealmap['147_title']='移动王卡-79元';mealmap['147_fee']='79';
mealmap['148_proid']='100168002199';mealmap['148_price']='30';mealmap['148_title']='移动王卡-19元';mealmap['148_fee']='19';
mealmap['149_proid']='100168002199_BH';mealmap['149_price']='0';mealmap['149_title']='移动王卡-19元';mealmap['149_fee']='19';
mealmap['150_proid']='100168002100_BH';mealmap['150_price']='0';mealmap['150_title']='移动王卡-49元';mealmap['150_fee']='49';
mealmap['151_proid']='100168002199_XXWL';mealmap['151_price']='50';mealmap['151_title']='移动王卡-19元套餐';mealmap['151_fee']='19';
mealmap['152_proid']='100168002199_PS';mealmap['152_price']='0';mealmap['152_title']='移动王卡-19元';mealmap['152_fee']='19';
mealmap['153_proid']='100168002199_WH';mealmap['153_price']='0';mealmap['153_title']='移动王卡-19元';mealmap['153_fee']='19';
mealmap['154_proid']='100168002162_WH';mealmap['154_price']='0';mealmap['154_title']='移动王卡-69元';mealmap['154_fee']='69';
mealmap['155_proid']='100168002100_WH';mealmap['155_price']='0';mealmap['155_title']='移动王卡-49元';mealmap['155_fee']='49';
mealmap['156_proid']='100168002101_WH';mealmap['156_price']='0';mealmap['156_title']='移动王卡-79元';mealmap['156_fee']='79';
mealmap['157_proid']='100168002100_CB';mealmap['157_price']='0';mealmap['157_title']='移动王卡-49元';mealmap['157_fee']='49';
mealmap['158_proid']='100168002101_CB';mealmap['158_price']='0';mealmap['158_title']='移动王卡-79元';mealmap['158_fee']='79';
mealmap['159_proid']='100168002101_BH';mealmap['159_price']='0';mealmap['159_title']='移动王卡-79元';mealmap['159_fee']='79';
mealmap['160_proid']='100168002199_XXT';mealmap['160_price']='0';mealmap['160_title']='移动王卡-19元';mealmap['160_fee']='19';
mealmap['161_proid']='100168002135';mealmap['161_price']='30';mealmap['161_title']='全球通体验套餐-69元套餐';mealmap['161_fee']='69';
//各地市分公司地址
var cityadrmap={};
cityadrmap['A']='郑州市北环路11号';cityadrmap['郑州']='郑州市北环路11号';
cityadrmap['C']='洛阳市洛龙区开元大道242号';cityadrmap['洛阳']='洛阳市洛龙区开元大道242号';
cityadrmap['B']='开封市宋城路西段1号';cityadrmap['开封']='开封市宋城路西段1号';
cityadrmap['D']='平顶山市建设路与东环路交叉口';cityadrmap['平顶山']='平顶山市建设路与东环路交叉口';
cityadrmap['J']='濮阳市中原路140号';cityadrmap['濮阳']='濮阳市中原路140号';
cityadrmap['K']='许昌市东城区八一东路1786号';cityadrmap['许昌']='许昌市东城区八一东路1786号';
cityadrmap['F']='鹤壁市淇滨区淇滨大道272号';cityadrmap['鹤壁']='鹤壁市淇滨区淇滨大道272号';
cityadrmap['L']='漯河市召陵区湘江路东段23号';cityadrmap['漯河']='漯河市召陵区湘江路东段23号';
cityadrmap['M']='三门峡市开发区黄河路与分陕路交汇处';cityadrmap['三门峡']='三门峡市开发区黄河路与分陕路交汇处';
cityadrmap['P']='周口市莲花大道东段';cityadrmap['周口']='周口市莲花大道东段';
cityadrmap['Q']='驻马店市开源大道139号';cityadrmap['驻马店']='驻马店市开源大道139号';
cityadrmap['G']='新乡市红旗区新中大道666号';cityadrmap['新乡']='新乡市红旗区新中大道666号';
cityadrmap['S']='信阳市羊山新区新七大道68号';cityadrmap['信阳']='信阳市羊山新区新七大道68号';
cityadrmap['N']='商丘市南京东路266号';cityadrmap['商丘']='商丘市南京东路266号';
cityadrmap['H']='焦作市迎宾路1589号';cityadrmap['焦作']='焦作市迎宾路1589号';
cityadrmap['R']='南阳市高新区两相路666号';cityadrmap['南阳']='南阳市高新区两相路666号';
cityadrmap['U']='济源市黄河大道中段205号';cityadrmap['济源']='济源市黄河大道中段205号';
cityadrmap['E']='安阳市中华路南段20号';cityadrmap['安阳']='安阳市中华路南段20号';