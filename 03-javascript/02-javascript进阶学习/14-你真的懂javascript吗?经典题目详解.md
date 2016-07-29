## 你真的懂javascript吗?

## 题目1
```
if (!("a" in window)) {
    var a = 1;
}
alert(a);
```
代码看起来是想说：如果window不包含属性a，就声明一个变量a，然后赋值为1。
你可能认为alert出来的结果是1，然后实际结果是“undefined”。要了解为什么，我们需要知道JavaScript里的3个概念。
```
首先，所有的全局变量都是window的属性，语句 var a = 1;等价于window.a = 1; 
你可以用如下方式来检测全局变量是否声明：
"变量名称" in window

第二，所有的变量声明都在范围作用域的顶部，看一下相似的例子：
alert("a" in window);
var a;
此时，尽管声明是在alert之后，alert弹出的依然是true，这是因为JavaScript引擎首先会扫墓所有的变量声明，
然后将这些变量声明移动到顶部，最终的代码效果是这样的：
var a;
alert("a" in window);
这样看起来就很容易解释为什么alert结果是true了。

第三，你需要理解该题目的意思是，变量声明被提前了，但变量赋值没有，因为这行代码包括了变量声明和变量赋值。
你可以将语句拆分为如下代码：
var a;    //声明
a = 1;    //初始化赋值
当变量声明和赋值在一起用的时候，JavaScript引擎会自动将它分为两部以便将变量声明提前，
不将赋值的步骤提前是因为他有可能影响代码执行出不可预期的结果。

所以，知道了这些概念以后，重新回头看一下题目的代码，其实就等价于：
var a;
if (!("a" in window)) {
    a = 1;
}
alert(a);
这样，题目的意思就非常清楚了：首先声明a，然后判断a是否在存在，如果不存在就赋值为1，很明显a永远在window里存在，
这个赋值语句永远不会执行，所以结果是undefined。
```
注：提前这个词语显得有点迷惑了，其实就是执行上下文的关系，
因为执行上下文分2个阶段：进入执行上下文和执行代码，在进入执行上下文的时候，
创建变量对象VO里已经有了：函数的所有形参、所有的函数声明、所有的变量声明
```
VO(global) = {
    a: undefined
}
这个时候a已经有了；
```
注：相信很多人都是认为a在里面不可访问，结果才是undefined的吧，其实是已经有了，只不过初始值是undefined，而不是不可访问。

## 题目2
```
var a = 1,
b = function a(x) {
    x && a(--x);
};
alert(a);
```
这个题目看起来比实际复杂，alert的结果是1；这里依然有3个重要的概念需要我们知道。
```
首先，在题目1里我们知道了变量声明在进入执行上下文就完成了；
第二个概念就是函数声明也是提前的，所有的函数声明都在执行代码之前都已经完成了声明，和变量声明一样。

澄清一下，函数声明是如下这样的代码：
function functionName(arg1, arg2){
    //函数体
}

如下不是函数，而是函数表达式，相当于变量赋值：
var functionName = function(arg1, arg2){
    //函数体
};
澄清一下，函数表达式没有提前，就相当于平时的变量赋值。

第三需要知道的是，函数声明会覆盖变量声明，但不会覆盖变量赋值，为了解释这个，我们来看一个例子：

function value(){
    return 1;
}
var value;
alert(typeof value);    //"function"

尽快变量声明在下面定义，但是变量value依然是function，也就是说这种情况下，
函数声明的优先级高于变量声明的优先级，但如果该变量value赋值了，那结果就完全不一样了：

function value(){
    return 1;
}
var value = 1;
alert(typeof value);    //"number"
该value赋值以后，变量赋值初始化就覆盖了函数声明。
```
重新回到题目，这个函数其实是一个有名函数表达式，函数表达式不像函数声明一样可以覆盖变量声明，
但你可以注意到，变量b是包含了该函数表达式，而该函数表达式的名字是a；
不同的浏览器对a这个名词处理有点不一样，在IE里，会将a认为函数声明，所以它被变量初始化覆盖了，
就是说如果调用a(--x)的话就会出错，而其它浏览器在允许在函数内部调用a(--x)，因为这时候a在函数外面依然是数字。
基本上，IE里调用b(2)的时候会出错，但其它浏览器则返回undefined。

理解上述内容之后，该题目换成一个更准确和更容易理解的代码应该像这样：
```
var a = 1,
    b = function(x) {
        x && b(--x);
    };
alert(a);
```
这样的话，就很清晰地知道为什么alert的总是1了，详细内容请参考《深入理解JavaScript系列（2）：揭秘命名函数表达式》中的内容。

注：按照ECMAScript规范，作者对函数声明覆盖变量声明的解释其实不准确的，正确的理解应该是如下：
```
进入执行上下文： 这里出现了名字一样的情况，一个是函数申明，一个是变量申明。
那么，根据深入理解JavaScript系列（12）：变量对象（Variable Object）介绍的，
填充VO的顺序是: 函数的形参 -> 函数申明 -> 变量申明。

上述例子中，变量a在函数a后面，那么，变量a遇到函数a怎么办呢？
还是根据变量对象中介绍的，当变量申明遇到VO中已经有同名的时候，不会影响已经存在的属性。
而函数表达式不会影响VO的内容，所以b只有在执行的时候才会触发里面的内容。
```

## 题目3
```
function a(x) {
    return x * 2;
}
var a;
alert(a);
```
这个题目也就是函数声明和变量声明的关系和影响，遇到同名的函数声明，VO不会重新定义，所以这时候全局的VO应该是如下这样的：
```
VO(global) = {
    a: 引用了函数声明“a”
}
而执行a的时候，相应地就弹出了函数a的内容了。
```

## 题目4
```
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
```
关于这个题目，NC搬出了262-3的规范出来解释，其实从《深入理解JavaScript系列（12）：变量对象（Variable Object）》
中的函数上下文中的变量对象一节就可以清楚地知道，活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。
arguments属性的值是Arguments对象：
```
AO = {
  arguments: <ArgO>
};
```
Arguments对象是活动对象的一个属性，它包括如下属性：
```
callee — 指向当前函数的引用
length — 真正传递的参数个数
properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 
properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。
```
这个共享其实不是真正的共享一个内存地址，而是2个不同的内存地址，使用JavaScript引擎来保证2个值是随时一样的，
当然这也有一个前提，那就是这个索引值要小于你传入的参数个数，也就是说如果你只传入2个参数，
而还继续使用arguments[2]赋值的话，就会不一致，例如：
```
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2);
```
这时候因为没传递第三个参数a，所以赋值10以后，alert(a)的结果依然是undefined，而不是10，
但如下代码弹出的结果依然是10，因为和a没有关系。
```
function b(x, y, a) {
    arguments[2] = 10;
    alert(arguments[2]);
}
b(1, 2);
```

## 题目5
```
function a() {
    alert(this);
}
a.call(null);
```
这个题目可以说是最简单的，也是最诡异的，因为如果没学到它的定义的话，打死也不会知道结果的，关于这个题目，我们先来了解2个概念。
```
首先，就是this值是如何定义的，当一个方法在对象上调用的时候，this就指向到了该对象上，例如：
var object = {
    method: function() {
        alert(this === object);    //true
    }
}
object.method(); 

上面的代码，调用method()的时候this被指向到调用它的object对象上，
但在全局作用域里，this是等价于window（浏览器中，非浏览器里等价于global），
在如果一个function的定义不是属于一个对象属性的时候（也就是单独定义的函数），
函数内部的this也是等价于window的，例如：

function method() {
    alert(this === window);    //true
}
method(); 

了解了上述概念之后，我们再来了解一下call()是做什么的，call方法作为一个function执行代表该方法可以让另外一个对象作为调用者来调用，
call方法的第一个参数是对象调用者，随后的其它参数是要传给调用method的参数（如果声明了的话），例如：

function method() {
    alert(this === window);
}
method();    //true
method.call(document);   //false
第一个依然是true没什么好说的，第二个传入的调用对象是document，自然不会等于window，所以弹出了false。

另外，根据ECMAScript262规范规定：如果第一个参数传入的对象调用者是null或者undefined的话，
call方法将把全局对象（也就是window）作为this的值。
所以，不管你什么时候传入null，其this都是全局对象window，所以该题目可以理解成如下代码：

function a() {
    alert(this);
}
a.call(window);
所以弹出的结果是[object Window]就很容易理解了。
```

## 总结
这5个题目虽然貌似有点偏，但实际上考察的依然是基本概念，只有熟知了这些基本概念才能写出高质量代码。


## 更多题目

如果大家有兴趣，可以继续研究下面的一些题目，详细通过这些题目也可以再次加深对JavaScript基础核心特性的理解。

- 找出数字数组中最大的元素（使用Match.max函数）
- 转化一个数字数组为function数组（每个function都弹出相应的数字）
- 给object数组进行排序（排序条件是每个元素对象的属性个数）
- 利用JavaScript打印出Fibonacci数（不使用全局变量）
- 实现如下语法的功能：var a = (5).plus(3).minus(6); //2
- 实现如下语法的功能：var a = add(2)(3)(4); //9