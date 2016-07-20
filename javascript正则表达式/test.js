/**
 * Created by Edgar.yjb on 16/7/20.
 */


var str = "longen and longen and yunxi";
console.log(/longen/g.exec(str));
// 打印 ["longen", index: 0, input: "longen and yunxi"]

// 假如没有找到的话，则返回null
console.log(/wo/.exec(str)); // null