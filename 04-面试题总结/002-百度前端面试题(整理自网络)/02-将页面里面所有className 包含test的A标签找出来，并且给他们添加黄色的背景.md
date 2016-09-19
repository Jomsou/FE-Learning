window.onload = function getLable(){
　　        var oLable = document.getElementsByTagName("a");
　　        var len = oLable.length;
　　        for(var i = 0;i < len;i ++){
　　                if(/^test /.test(oLable[i].className) || / test /.test(oLable[i].className) || / test$/.test(oLable[i].className) || /^test$/.test(oLable[i].className)){
　　                        oLable[i].style.backgroundColor = "yellow";
　　                }
　　        }
};


regexp = /(^(test)$)|(\s+test\s+)|(\s+(test)$)/;