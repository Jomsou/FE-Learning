2.jsonp原理和缺点：利用在页面中创建<script>节点的方法向不同域提交HTTP请求，代码如下：
var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.src = "跨域的url";
document.getElementByTaName("head")[0].appendChild(scriptElement);
jsonp只支持get请求不支持post等其他请求，不能解决不同域的两个页面之间进行javascript调用的问题。