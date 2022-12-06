(1)路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效

(2)打包上线
项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
有了 map 就可以像为加密的代码一样，准确的输出是哪一行有错
所有该文件如果项目不需要可以去除掉：vue.config.js 配置 productionSourceMap:false

(3)linux / 根目录
常用命令：cd 跳转目录 ls 查看 mkdir 创建目录 pwd 查看绝对路径

(4)nginx 配置
1).xshell 进入根目录/etc
2).进入 etc 目录，这个目录下有一个 nginx 目录，进入该目录 3)安装完 nginx 服务器以后，会发现 nginx 目录下，多一个 nginx.conf 文件，在这个文件中进行配置
4)vim nginx.conf 进行编辑，主要添加如下两项
location / {
root /root/jch/www/shangpinhui/dist;
index index.html;
try_files $url/ /index.html
}

location /api {
proxy_pass http://39.98.123.211
}
(5)ngnix 服务器跑起来 service nginx start
