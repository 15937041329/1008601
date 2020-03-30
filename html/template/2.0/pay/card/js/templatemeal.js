$(function () {
	/**页面初始化插码**/
	var activityId=$("#activityId").val();
	if(activityId=="4666912877049795557"){//线上好网放心用
		if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','DLLK','WT.event','DLLK','WT.si_n','CB_DLLK','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','10');}
	}
	/**选择入网活动**/
    $('.sel-act li').click(function(){
    	$(this).siblings('li').children('.is-checked').hide();
		$(this).siblings('li').children('.no-checked').show();
		$(this).children('.no-checked').hide();
		$(this).children('.is-checked').show();
        $("#planActivityId").val($(this).data("code"));
        $(".priceb").html($(this).data("price"));
        showcardnum($(this).data("numberFeatures"));
    });
    
    /**其他资费**/
    $('.tar-statement-entry').click(function () {
        $(this).siblings('.tar-statement').fadeToggle();
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
    
    /**立即办卡**/
    $('.toOrderfill').click(function(){
    	//插码
		var planName=$("#planName").val();//套餐名称
		if(activityId=="8255334385677994278"){//全球通69元体验套餐
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTYTCE','WT.event','XHRW_QQTTYTCE_BL','WT.si_n','CB_XHRW_QQTTYTCE','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
		}else if(activityId=="5993109194365736140"){//全球通99元
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_J','WT.event','XHRW_QQTTCE_JBL','WT.si_n','CB_XHRW_QQTTCE_J','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
		}else if(activityId=="4690360595586045763"){//全球通139元
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channelheader,'WT.nv','XHRW_QQTTCE_E','WT.event','XHRW_QQTTCE_EBL','WT.si_n','CB_XHRW_QQTTCE_E','WT.mobile',loginmobile,'WT.city',loginregion,'WT.si_x','21');}
		}
			$("#checkForm").submit();
		// 	var xhr=new XMLHttpRequest();
		// 	xhr.open('POST','/pay/card-sale!stepFinish.action',true);
		// 	xhr.onreadystatechange=function(){
		// 			if(xhr.readyState==4){
		// 				console.log(xhr);
		// 				window.location.href = '/sale.html'
		// 			}
		// 	}
		// 	xhr.send($("#checkForm").serialize());
		});
		// 跳过第一个页面
		
		// $('.toOrderfill').click();
});
//是否显示号码
function showcardnum(numberFeatures){
	var cardnum=$("#cardnum").val();
	if(numberFeatures==undefined){
		return;
	}
	if(numberFeatures.indexOf("2")>=0 && cardnum.indexOf("4")<0){
		$('.selected-num').hide();
	}else{
		$('.selected-num').show();
	}
}