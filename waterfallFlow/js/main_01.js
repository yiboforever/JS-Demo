//获取承载瀑布流外部框架的div
var divTag=document.getElementsByClassName('wrap')[0];
//创建一个ul函数
function createUl(a){
  for(var z=0;z<a;z++){
      //产生一个每个ul的随机高度
      var randHeight=randFn(230,290);
      //产生每行产生多少个图片（3个，概率为30%，4个，概率为70%）
      var per=Math.random()>0.75?3:4;
      //创建ul标签
      var ulTag=document.createElement('ul');
      //配置ul标签
      ulTag.style.height=randHeight+'px';
      // 判断一行中产生3个照片还是4张照片
      if(per == 3){
          //核心代码：当产生3张照片时，让每张照片的宽度随机，但三张照片总和+其左边距等于外部框架
        var arr1=product(3);
        // console.log(arr1);
        //创建、配置、拼接li标签
        for(var i=0;i<per;i++){
          var liTag=document.createElement('li');
          //使用递归，随机产生宽度
          // console.log(divTag.offsetWidth);
            // var arr1=product();
            // console.log(arr1);
          //配置li标签
          liTag.style.width=arr1[i]+'px';
          liTag.style.height=randHeight+'px';
          liTag.style.marginLeft='10px';
          liTag.style.backgroundColor='#E8E8E8';
          //创建、配置、拼接img标签
          function pictureLoading(src,src1,parentNode){
              var imgObj=(function(){
                //创建img对象，帮助程序请求图片
                var imgObject=new Image();
                //创建img标签
                var imgTag=document.createElement('img');
                //配置img标签
                // imgTag.style.width=arr1[i]+'px';
                // imgTag.style.marginTop='10px';
                //给图片临时的图片地址：
                imgTag.src=src1;
                //拼接标签
                parentNode.appendChild(imgTag);
                imgObject.onload=function(){
                  imgTag.src=this.src;
                  imgTag.style.width=arr1[i]+'px';
                  imgTag.style.height='100%';
                  imgTag.style.marginTop='0px';
                }
                return {
                  src:function(src){
                      //给image图片对像给正式图
                      imgObject.src=src;
                  }
                }
              }());
              imgObj.src(src);
          }
          pictureLoading('https://unsplash.it/'+arr1[i]+'/'+randHeight+'/?random','./images/loading.gif',liTag);

          //将li标签拼接到ul标签内
          ulTag.appendChild(liTag);
        }
      }else{
        var arr2=product(4);
        //创建、配置、拼接li标签
        for(var j=0;j<per;j++){
          var liTag=document.createElement('li');
          //配置li标签
          liTag.style.width=arr2[j]+'px';
          liTag.style.height=randHeight+'px';
          liTag.style.marginLeft='10px';
          liTag.style.backgroundColor='#E8E8E8';

          //创建、配置、拼接img标签
          function pictureLoading(src,src1,parentNode){
              var imgObj=(function(){
                //创建img对象，帮助程序请求图片
                var imgObject=new Image();
                //创建img标签
                var imgTag=document.createElement('img');
                //配置img标签
                // imgTag.style.width=arr2[j]+'px';
                // imgTag.style.marginTop='10px';
                //给图片临时的图片地址：
                imgTag.src=src1;
                //拼接标签
                parentNode.appendChild(imgTag);
                imgObject.onload=function(){
                  imgTag.src=this.src;
                  imgTag.style.width=arr2[j]+'px';
                  imgTag.style.height='100%';
                  imgTag.style.marginTop='0px';
                }
                return {
                  src:function(src){
                      //给image图片对像给正式图
                      imgObject.src=src;
                  }
                }
              }());
              imgObj.src(src);
          }
          pictureLoading('https://unsplash.it/'+arr2[j]+'/'+randHeight+'/?random','./images/loading.gif',liTag);

          //将li标签拼接到ul标签内
          ulTag.appendChild(liTag);
        }
            // console.log('1');
      }

      //将ul标签拼接到div标签内
      divTag.appendChild(ulTag);
  }
}

/****************工具函数*******************/
  function randFn(min,max){
    return parseInt(Math.random()*(max-min)+min);
  }
  //可视区域的高度
  function seeFn(){
    return window.innerHeight || document.documentElement.clientHeight;
  }
  //滚动的高度
  function scrollFn(){
    return document.body.scrollTop || document.documentElement.scrollTop;
  }


//核心函数
//产生一个数组，3或4张照片的一个数组，描述：3张照片每一张照片宽度不一致，但它们的和是一致的
function product(n){
    var arr=[];
    var sum=0;
    for(var j=0;j<n;j++){
      arr[j]=randFn((divTag.offsetWidth-n*10)/(n+1),(divTag.offsetWidth-n*10)/(n-1));
    }
    for(var k=0;k<arr.length;k++){
      sum+=arr[k];
    }
    if(sum != (divTag.offsetWidth-n*10)){
      // console.log('13');
      return product(n);
    }else{
      return arr;
    }
  }



window.onload=function(){
  createUl(10);

}

window.onscroll=function(){
  if(seeFn()+scrollFn()>=document.body.offsetHeight){
    createUl(5);
  }
}
