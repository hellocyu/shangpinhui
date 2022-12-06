复习：
(1)商品分类的三级列表由静态变为动态形式（获取服务器数据：解决跨域问题）
(2)函数防抖与节流
(3)路由跳转：声明式导航、编程式导航
(4)编程式导航解决这个问题：自定义属性

1)开发 search 模块中的 TypeNav 商品分类菜单（过渡动画效果）
过渡动画：前提组件、元素务必要有 v-if、v-show 指令才可以进行过渡动画

2)商品分类三级可以进行优化。将 monted 中的方法放入到 app.vue 中，因为 app.vue 中的 mounted 只执行一次

3).合并 params 和 query 参数

4).开发 Home 首页当中的 ListContainer 组件与 Floor 组件
mock 数据（模拟）
使用步骤：(1)在项目当中 src 文件夹中创建 mock 文件夹
(2)准备 JSON 数据----格式化一下，一定不能留有空格
(3)把 mock 数据需要的图片放置到 public 文件中【public 文件夹在打包的时候，会把相应的资源原封不动打包到 dist 文件夹中】
(4)创建 mockServe.js，通过 mockjs 插件实现模拟数据
(5)mockServe.js 文件在入口文件中引入（至少执行一次，才能模拟数据）

5).ListContainer 组件开发重点
安装 Swiper 插件
(1)引包(响应的 js、css)
(2)页面中结构务必要有--重点
(3)new Swiper 实例（轮播图添加动态效果）
