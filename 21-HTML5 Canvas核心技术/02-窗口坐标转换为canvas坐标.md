# 窗口坐标转换为canvas坐标

当给canvas注册鼠标事件时，传递给监听器的鼠标坐标是窗口坐标，而不是相对于canvas的坐标。
为了将其转换为canvas坐标，可以使用如下方法：

    function window2canvas(canvas, x, y){
        // 获取canvas元素的边界框，该边界框的坐标是相对于整个窗口的
        var box = canvas.getBoundingClientRect(); 
        
        // 该方法不止是将canvas边界框的坐标从窗口坐标中减去，而且在canvas元素大小与绘图元素大小不相符时，
        // 还对这两个坐标进行了缩放
        return {
            x: x - box.left * ( canvas.width / box.width),
            y: y - box.top * (canvas.height / box.height)
        };
    }
    
使用方式如下：

    canvas.onmousedown= function(e){
        var loc = window2canvas(canvas, e.clientX, e.clientY);
        
        // your code goes here...
    }
    
注：
    
    在HTML5规范出来之前，对于鼠标事件坐标的传递非常混乱，有些浏览器将坐标放置在event的x、y属性中，
    有些则是放置在clientX、clientY属性中。这在HTML5规范中最终达成了一致，目前浏览器都支持clientX和clientY属性。