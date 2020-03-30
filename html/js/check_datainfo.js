/*工具函数*/
//校验手机号码正确性
function isCMCCNumber(mobileStr){
	var objRegExp  = new RegExp('^1[0-9]{10}$','g');
	return(objRegExp.test(mobileStr));
}
$("title").text('中国移动掌上营业厅');
$(function(){
	$('.tar-statement').attr('src','/html/images/role.jpg')
})

// 添加客服图标
$(function(){
	var html = '<div class="tally">'+
								'<a href="tel:15108261201" rel="nofollow"><img src="/html/images/tel.png"><span>电话</span></a>'+
								'<a href="https://webim.bytedance.com/h5/normal/40133/93e4673f29915433"><img src="/html/images/service.png"><span>客服</span></a>'+
							'</div>';
	$('body').append(html);
})

