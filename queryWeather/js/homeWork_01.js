window.onload=function(){
  //获取需要操作的节点元素
  // 头部搜索区域节点
  var search=document.querySelector('.search>input[type="text"]');
  var btn=document.querySelector('.search>button');
  // 当日天气区域
  var address=document.querySelector('#address');
  var today=document.querySelector('#today');
  var min=document.querySelector('#min');
  var max=document.querySelector('#max');
  var status=document.querySelector('#status');
  // 未来6天气象
  var date=document.querySelectorAll('.date');
  var high=document.querySelectorAll('.high');
  var low=document.querySelectorAll('.low');
  var img=document.querySelectorAll('.list img');

  //设置一个对象承载一个天气图片
  var weatherObj=[
    {
      type:"大雨",
      imgUrl:"./images/1.ico"
    },
    {
      type:"多云",
      imgUrl:"./images/2.ico"
    },
    {
      type:"雷阵雨",
      imgUrl:"./images/3.ico"
    },
    {
      type:"晴",
      imgUrl:"./images/4.ico"
    },
    {
      type:"小雨",
      imgUrl:"./images/5.ico"
    },
    {
      type:"阴",
      imgUrl:"./images/6.ico"
    },
    {
      type:"阵雨",
      imgUrl:"./images/7.ico"
    },
    {
      type:"中雨",
      imgUrl:"./images/8.ico"
    }
  ];
// console.log(weatherObj);

  //第一步：先获取默认的北京的时间及天气数据
  //设置默认城市为北京
  address.innerHTML='北京';
  //当前日期
  var date1=new Date();
  // console.log(date1);
  var dateStr=date1.getFullYear()+'年'+(date1.getMonth()+1)+'月'+date1.getDate()+'日';
  today.innerHTML=dateStr;
  var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET','http://wthrcdn.etouch.cn/weather_mini?city=北京',true);
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4 && xhr.status==200){
      //设置默认北京今天的默认的天气信息
      var obj=JSON.parse(xhr.responseText);
      // console.log(obj);
      // console.log(obj.data);
      var forcecast=obj.data.forecast;
        //设置默认北京今天的默认的天气信息
        var lowStr=forcecast[0].low;
        var highStr=forcecast[0].high;
        var typeStr=forcecast[0].type;
        min.innerHTML=lowStr.slice(3);
        max.innerHTML=highStr.slice(3);
        status.innerHTML=typeStr;

        //设置默认北京未来的默认的天气信息（一周）
        //昨天情况
        date[0].innerHTML=obj.data.yesterday.date;
        var hight_01=obj.data.yesterday.high.slice(3);
        high[0].innerHTML=hight_01;
        var low_01=obj.data.yesterday.low.slice(3);
        low[0].innerHTML=low_01;
        //获取当天的天气type，来控制哪个图片
        var type_01=obj.data.yesterday.type;
        //TODO:待根据type值来表示不同的天气状态
        for(var i=0;i<weatherObj.length;i++){
          if(weatherObj[i].type==type_01){
            img[0].src=weatherObj[i].imgUrl;
          }
        }

        //加载今天一直5天的天气
        for(var i=1;i<forcecast.length+1;i++){
          date[i].innerHTML=forcecast[i-1].date;
          var high_01=forcecast[i-1].high.slice(3);
          high[i].innerHTML=high_01;
          var low_02=forcecast[i-1].low.slice(3);
          low[i].innerHTML=low_02;
          var type_02=forcecast[i-1].type;
          //TODO:待根据type值,来变化img的src的值
          for(var k=0;k<weatherObj.length;k++){
            if(weatherObj[k].type==type_02){
              img[i].src=weatherObj[k].imgUrl;
            }
          }

        }


      // console.log(forcecast);
    }
  }




  //第二步：点击按钮时，进行的主线交互
  btn.onclick=function(){
    // 获取输入框输入的值
    var txtValue=search.value;
    var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET','http://wthrcdn.etouch.cn/weather_mini?city='+txtValue,true);
    xhr.send(null);
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4 && xhr.status==200){
        // console.log(xhr.responseText);
        var obj=JSON.parse(xhr.responseText);
        // console.log(obj.data);
        //设置当天的天气状态
        //根据obj对象下的data里面的forecast是否是否存在，来判断城市是否存在
        if(obj.data){
              //设置当前城市的位置：
              address.innerHTML=txtValue;
              var forcecast=obj.data.forecast;
              var lowStr=forcecast[0].low;
              var highStr=forcecast[0].high;
              var typeStr=forcecast[0].type;
              min.innerHTML=lowStr.slice(3);
              max.innerHTML=highStr.slice(3);
              status.innerHTML=typeStr;

              //设置一周的天气状态
              //昨天情况
              date[0].innerHTML=obj.data.yesterday.date;
              var hight_01=obj.data.yesterday.high.slice(3);
              high[0].innerHTML=hight_01;
              var low_01=obj.data.yesterday.low.slice(3)
              low[0].innerHTML=low_01;
              //获取当天的天气type，来控制哪个图片
              var type_01=obj.data.yesterday.type;
              //TODO:待根据type值来表示不同的天气状态
              for(var i=0;i<weatherObj.length;i++){
                if(weatherObj[i].type==type_01){
                  img[0].src=weatherObj[i].imgUrl;

                }
              }

              //加载今天一直5天的天气
              for(var i=1;i<forcecast.length+1;i++){
                date[i].innerHTML=forcecast[i-1].date;
                var high_01=forcecast[i-1].high.slice(3);
                high[i].innerHTML=high_01;
                var low_02=forcecast[i-1].low.slice(3);
                low[i].innerHTML=low_02;
                var type_02=forcecast[i-1].type;
                //TODO:待根据type值,来变化img的src的值
                for(var k=0;k<weatherObj.length;k++){
                  if(weatherObj[k].type==type_02){
                    img[i].src=weatherObj[k].imgUrl;
                    // img[i].style.marginLeft=img[i].offsetWidth/2;
                    // img[i].style.marginTop=img[i].offsetHeight/2;
                  }
                }

              }
        }else{
          alert('输入城市有错！');
        }

  }else if(xhr.status ==404){
    alert('sorry,努力加载，但无法去访问！')
  }else if(xhr.status ==500){
    alert('炒蛋，居然服务器不行，唉');
  }
}









  }









}
