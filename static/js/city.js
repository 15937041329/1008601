var receiveProvince=addsf;
var receiveCity=addcs;
var receiveCounty=addxs;
var receiveTown=addtw;
function isShowAll(){
	if("channel_xmxw"==channelheader || "channel_nytx"==channelheader || "channel_tjfx"==channelheader || "channel_ljwy"==channelheader || "channel_zzqx"==channelheader || "channel_ytxl"==channelheader || "channel_tmqjd"==channelheader || "channel_zfbst"==channelheader || "channel_bhjh"==channelheader || "channel_zxgs"==channelheader){
		return true;
	}
	
	if($("#mealFeatures").length>0){
		var mealFeatures = $("#mealFeatures").val();
		if(mealFeatures!="" && mealFeatures.indexOf("2")>=0){
			return true;
		}
	}
	
	return false;
}
$(function(){
    if(receiveProvince=="") receiveProvince = "河南省";
	//初始化地市下拉列表框
    $.ajax({
          //请求方式为get
          type: "GET",
          //xml文件位置
          url: "./static/js/Area.xml",
          async : false,
          //返回数据格式为xml
          dataType: "xml",
          //请求成功完成后要执行的方法
          success: function (xml) {
              $(xml).find("province").each(function () {
                      var loc = $(this).attr('name');  
                      var text = $(this).attr('name'); //显示文字
                      var sendname="河南省";//配送范围为河南省省内
                      if(isShowAll()){
                    	  sendname=text;
                      }
                      if(text==sendname){
                      	//初始化省下拉列表框
	                    if(text==receiveProvince){//设置初始省
						  	$("#citysf").append("<option value='"+loc+"' selected='true'>"+text+"</option>");
	                    }else{
	                    	$("#citysf").append("<option value='"+loc+"'>"+text+"</option>");
	                    }

					  	//初始化城市下拉列表框			  	 		
			        	if(receiveProvince==text){
		        			$("#citycs").empty();
//		        			if("131"==nowmeal || "132"==nowmeal || "133"==nowmeal){
//		        				receiveCity="郑州市";
//		                    }else{
		                    	$("#citycs").append('<option value="">请选择</option>');
//		                    }
				        	$(xml).find("province[name='"+text+"']>city").each(function(){
					            var cityLoc = $(this).attr('name');
					            var cityText = $(this).attr('name');
					            var sendcity=cityText;
//					            //郑州校讯通活动仅可选择郑州
//					            if("131"==nowmeal || "132"==nowmeal || "133"==nowmeal){
//					            	sendcity="郑州市";
//			                    }
					            if(sendcity==cityText){
					            if(receiveCity!="" && cityText==receiveCity){//设置初始城市
									$("#citycs").append("<option value='"+cityLoc+"' selected='true'>"+cityText+"</option>");
								}else{
									$("#citycs").append("<option value="+cityLoc+">"+cityText+"</option>");
								}
								//初始化区县下拉列表框
								if(receiveCity!="" &&  receiveCity==cityText){
									$("#cityxs").empty();
									$("#cityxs").append('<option value="">请选择</option>');
									$(xml).find("city[name='"+cityText+"']>country").each(function(){
										var countryLoc = $(this).attr('name');
										var countryText = $(this).attr('name');
										if(countryText==receiveCounty){//设置初始区县
									  		$("#cityxs").append("<option value='"+countryLoc+"' selected='true'>"+countryText+"</option>");
										}else{
									  		$("#cityxs").append("<option value="+countryLoc+">"+countryText+"</option>");
										}
										//初始化乡镇下拉列表框
									    if(receiveCounty!="" && receiveCounty==countryText && text=='河南省'){
									    	$("#citytw").empty();
											$("#citytw").append('<option value="">请选择</option>');
											$(xml).find("country[name='"+countryText+"']>town").each(function(){
												var townLoc = $(this).attr('name');
												var townText = $(this).attr('name');
												if(townText==receiveTown){//设置初始化乡镇
											  		$("#citytw").append("<option value='"+townLoc+"' selected='true'>"+townText+"</option>");
												}else{
											  		$("#citytw").append("<option value="+townLoc+">"+townText+"</option>");
												}
											});
									    }
									});
								}
					            }
				        	});
			        	}
					  }							  						  
              });
              if(receiveProvince!="河南省"){
                  if($("#town").length>0) {
                      $("#citytw").val("");
                      $("#town").hide();
                  }
              }else{
                  if($("#town").length>0){$("#town").show();}
			  }
          }
    });
    //省份绑定改变事件
	$("#citysf").bind('change',function(){
		var cur=$("#citysf").val();
		$("#citycs").empty();
		$.ajax({
			type:'get',
			url:'./static/js/Area.xml',
			dataType:'xml',
            async: true,
			success:function(xml){
				$("#citycs").append('<option value="">请选择</option>');
				$(xml).find("province[name='"+cur+"']>city").each(function(){
					//if($(this).attr("sig")==cur){
	                    var loc = $(this).attr('name');
	                    //显示文字
	                    var text = $(this).attr('name');
						$("#citycs").append("<option value="+loc+">"+text+"</option>");
					//}
				});
				$("#cityxs").empty();
				$("#cityxs").append('<option value="">请选择</option>');
                setCityInfo();
			}
		});
		if($("#town").length>0){
			if(cur!="河南省") {
            	$("#citytw").val("");
            	$("#town").hide();
        	}else{
                $("#citytw").val("");
                $("#citytw").empty();
                $("#citytw").append('<option value="" selected="true">请选择</option>');
            }
		}
	});
	//城市绑定改变事件
	$("#citycs").bind('change',function(){
		var cur=$("#citycs").val();
		$("#cityxs").empty();
		$.ajax({
			type:'get',
			url:'./static/js/Area.xml',
			dataType:'xml',
			success:function(xml){
				$(xml).find("city[name='"+cur+"']>country").each(function(){
					var loc = $(this).attr('name');
					var text = $(this).attr('name');
					$("#cityxs").append("<option value="+loc+">"+text+"</option>");
				});
			}
		});
		$("#CITYNAME").val(cur);
		$("#cityxs").append('<option value="" selected="true">请选择</option>');
		if($("#citysf").val()=="河南省"){
			$("#citytw").val("");
			$("#citytw").empty();
			$("#citytw").append('<option value="" selected="true">请选择</option>');
		}
        setCityInfo();
        if($("#town").length>0){
			setSendType();
		}
	});		
	//区/县绑定改变事件
	$("#cityxs").bind('change',function(){
		if($("#town").length>0){
			if($("#citysf").val()=="河南省"){
				$("#town").show();
				var city=$("#citycs").val();
				var cur=$("#cityxs").val();
				$("#citytw").empty();
				$.ajax({
					type:'get',
					url:'./static/js/Area.xml',
					dataType:'xml',
					success:function(xml){
						$(xml).find("city[name='"+city+"']>country[name='"+cur+"']>town").each(function(){
							var loc = $(this).attr('name');
							var text = $(this).attr('name');
							$("#citytw").append("<option value="+loc+">"+text+"</option>");
						});
					}
				});
				$("#citytw").append('<option value="" selected="true">请选择</option>');
			}else{
				$("#citytw").val("");
				$("#town").hide();
			}
        }
        setCityInfo();
	});
	//设置地市信息
	function setCityInfo(){
		var sf=$("#citysf").val();//所选省份
		var cs=$("#citycs").val();//所选城市
		var xs=$("#cityxs").val();//所选区/县
		var tw=$("#town").length>0?$("#citytw").val():"";//所选乡镇
		var cInfo="";//所选地市信息
		if(sf!=null && sf!="" && sf!="请选择") cInfo=cInfo+sf;
		if(cs!=null && cs!="" && cs!="请选择") cInfo=cInfo+cs;
		if(xs!=null && xs!="" && xs!="请选择") cInfo=cInfo+xs;
		if(tw!=null && tw!="" && tw!="请选择") cInfo=cInfo+tw;
		$('.list .city').attr('value',cInfo);
	}
	 //选择号码
    $('.big-blue-btn-info').click(function(){  
    	setCityInfo();
    	//意向单页面
    	if($('#provinceTxt').length > 0){
            $("#provinceTxt").val($("#citysf").val());
            $("#cityTxt").val($("#citycs").val());
            $("#districtTxt").val($("#cityxs").val());
		}
    	
    	//删除所选营业厅
    	if ($('.business-hall').length > 0) {
    		$(".business-hall").val("");
    		$("#busiHall").val("");
    		$("#busiHallAddress").val("");
    	}

    	//网络故障申报页面
        if($('#txtRegion').length > 0){
            setRegion($("#citycs").val());
        }
    });
});