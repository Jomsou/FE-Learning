
# 安装相应的loader

默认情况下，webpack并不能对css文件进行打包，需要安装对应的loader后才能打包样式文件。可以使用`npm install css-loader style-loader --save-dev`命令来安装loader。

# css-loader的使用

例如，想在test.js文件中引用css文件，可以使用`require('css-loader!./test.css')`命令来引用，然后使用`webpack test.js test.bundle.js`即可成功打包和引用css文件。

# style-loader的使用
使用上述`require('css-loader!./test.css')`可以在js模块中引入样式文件，但是在html文件中引用最终生成的test.bundle.js文件时，test.css文件中的样式并不会生效！为了使样式生效，还必须使用到style-loader，做法是在引入css样式文件的前面加上style-loader，即`require('style-loader!css-loader!./test.css') `
