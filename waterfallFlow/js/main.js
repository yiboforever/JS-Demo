/*工具函数*/
//产生随机数  目的：为瀑布流里面的照片的高度随机产生
function randFn(min,max){
  return parseInt(Math.random()*(max-min)+min);
}
//获取页面可视的高度
function seeHeight(){
  return window.innerHeight || document.documentElement.clientHeight;
}
//获取页面的滚动的距离
function scrollHeight(){
  return document.body.scrollTop || document.documentElement.scrollTop;
}

//创建li标签的函数
function createLi(n){
  //获取需要操作的标签
  var ulTags=document.querySelectorAll('ul');

  for(var i=0;i<n;i++){
      //拼接一个照片时，就随机产生高度给li标签及img标签
      var height=randFn(300,500);
      //创建li标签
      var liTag=document.createElement('li');
      //配置li标签
      liTag.style.width='270px';
      liTag.style.height=height+'px';
      liTag.style.marginBottom='10px';
      liTag.style.backgroundColor='#E8E8E8';
      //创建并配置img标签    TODO:待做图片预加载
      var imgObj=(function(){
        //创建一个img对象,利用该对象帮程序请求正式的图片
        var imgObject=new Image();
        //创建页面上的img标签
        var imgTag=document.createElement('img');
        imgTag.style.width='270px';
        // imgTag.style.height=height+'px';
        imgTag.style.marginTop=height/2-150+'px';
        //将img标签拼接到li标签内
        liTag.appendChild(imgTag);
        //当img对象从服务器获取到了数据，则替代标签内的临时loading图片
        imgObject.onload=function(){
          imgTag.src=this.src;
          imgTag.style.marginTop='0px';
        }
        return {
          src:function(src){
            //给图片标签设置占位图
            // imgTag.src='http://ww1.sinaimg.cn/mw1024/64eeab82gw1f9bjahlklaj203k03kmwy.jpg';
            imgTag.src='./images/loading.gif';
            //给图片对象设置正式图
            imgObject.src=src;
          }
        }
      }());
      imgObj.src('https://unsplash.it/270/'+height+'/?random');

      // var imgTag=document.createElement('img');
      // imgTag.src='https://unsplash.it/270/'+height+'/?random';
      // //将img标签拼接到li标签内
      // liTag.appendChild(imgTag);

      //设置一个最短ul变量，存放最短的ul
      var minUlHeight=ulTags[0];
      for(var j=0;j<4;j++){
        if(minUlHeight.offsetHeight>ulTags[j].offsetHeight){
          minUlHeight=ulTags[j];
        }
      }
      //每次创建的li标签拼接在最短的ul中
      minUlHeight.appendChild(liTag);

  }
}


window.onload=function(){
    //页面加载时，就创建30个照片
    createLi(30);

}

window.onscroll=function(){
  //当用户的浏览高度》=页面的总高度
  var seeHei=seeHeight();
  var scrHei=scrollHeight();
  if(seeHei+scrHei>=document.documentElement.offsetHeight){
    createLi(20);
  }




}
