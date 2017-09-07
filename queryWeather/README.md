这是一个天气查询的小demo

效果图可看：src的png照片，这个demo主要练习ajax获取数据并解析数据，使用的技术栈：js的ajax，jq的ajax

天气接口地址：'http://wthrcdn.etouch.cn/weather_mini?city='+城市

代码逻辑主线：
  1.第一次ajax请求，是在页面加载的时候，请求天气接口的数据，作为默认值为北京的所有数据，并解析到html文档中
  2.当点击查询某城市天气按钮，再次进行一次ajax请求，获取该城市的天气的数据，并解析到html文档中

文件说明：index.html,使用js的ajax的技术，而index_01.html,使用jquery的ajax的技术请求接口数据
