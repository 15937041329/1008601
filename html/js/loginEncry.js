     var aftStr0=new Array("K","H","f","0","/","d","T","z","=","o");
	 var aftStr1=new Array("H","f","0","o","/","d","T","z","K","=");
	 var aftStr2=new Array("f","K","o","d","z","H","/","=","0","T");
	 var aftStr3=new Array("o","/","K","f","d","0","=","H","T","z");
	 var aftStr4=new Array("/","o","0","K","f","=","d","T","z","H");
	 var aftStr5=new Array("0","H","o","K","=","f","T","z","d","/");
	 var aftStr6=new Array("H","z","=","T","o","K","f","d","/","0");
	 var aftStr7=new Array("z","=","d","T","/","o","K","f","H","0");
	 var aftStr8=new Array("=","T","H","d","0","/","z","K","o","f");
	 var aftStr9=new Array("T","=","H","d","0","/","z","o","K","f");
function Encry04() {  
   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    } 
    
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }      
}  