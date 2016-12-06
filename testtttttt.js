var a = [];
a[0] = 'hello';
console.log(a.length);

a['12'] = '哈哈';
console.log(a.length);

var d = new Date();
d['first']='1';
console.log(d.first);