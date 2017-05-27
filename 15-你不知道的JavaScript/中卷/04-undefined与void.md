# undefined 与 void

#### undefined

非严格模式下，可以对undefined赋值，意味着可以声明一个undefined的局部变量，这会覆盖内置的undefined
类型！ 永远不要这么做！！！

#### void运算符

表达式`void`没有返回值，因此返回结果是undefined。void并不改变表达式的结果，只是让表达式不返回值。

    var a = 10;
    void a;   // undefined
    a;   // 10
    
通常我们使用 `void 0` 来获得undefined（这主要源自于c语言，实际上void 0 和 void 1 , void 2, void true没有实质上的区别）。
