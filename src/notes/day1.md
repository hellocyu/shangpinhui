一、路由传参面试题

1.路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？
答：路由跳转传参的时候，对象的写法可以使 name、path 形式，但是需要注意的是，path 这种写法不能与 params 参数一起使用

2.如何指定 params 参数可传可不传？
答：如果路由要求传递 params 参数，但是你就不传递 params 参数，会发现 URL 有问题。但是当配置路由的时候，在占位的后面加上一个问号（params 可以传递或者不传递），可以指定 params 参数可传可不传

3.params 参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
答：可以使用 undefined 解决 params 参数可以传递、不传递（空的字符串）

(1)
(2)
(3)
(4)
(5)