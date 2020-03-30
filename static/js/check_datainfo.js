/*工具函数*/
//校验手机号码正确性
function isCMCCNumber(mobileStr){
	var objRegExp  = new RegExp('^1[0-9]{10}$','g');
	return(objRegExp.test(mobileStr));
}