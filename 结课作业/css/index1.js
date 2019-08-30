(function(){
    // 全局变量;
    let oUl = document.querySelector("#main ul.list")
        ,aLi = oUl.children
        ,aBtn = document.querySelectorAll("#btn li")
        ,num = 125
    ;

    //辅助函数 获取第i个li是第几层中的第几个
    function getLayer(i,arr){
        let sum = 0;
        let result = {};
        for(let j = 0; j < arr.length; j++) {
            sum += arr[j];
            if ( sum > i ){
                result.layer = j;
                result.index = arr[j] - (sum-i);
                return result;
            }
        }
    };

    // 各种布局合集
    let FnObj = {
        // 元素周期表布局
        Table(){
            let jX = 170;
            let jY = 210;

            let trX = 0;
            let trY = 0;
            let trZ = 0;

            // 求中心点
            let midX = 18/2 - 0.5;
            let midY = Math.ceil(num/18)/2+2-1.5;

            //定义前三行不规则布局的坐标
            let coordinate = [
                {x:0,y:0}
                ,{x:17,y:0}
                ,{x:0,y:1}
                ,{x:1,y:1}
                ,{x:12,y:1}
                ,{x:13,y:1}
                ,{x:14,y:1}
                ,{x:15,y:1}
                ,{x:16,y:1}
                ,{x:17,y:1}
                ,{x:0,y:2}
                ,{x:1,y:2}
                ,{x:12,y:2}
                ,{x:13,y:2}
                ,{x:14,y:2}
                ,{x:15,y:2}
                ,{x:16,y:2}
                ,{x:17,y:2}
            ];
            [...aLi].forEach(function(ele,i){
                let x = i<18?coordinate[i].x:i%18;
                let y = i<18?coordinate[i].y:Math.floor(i/18)+2;
                trX = (x-midX)*jX;
                trY = (y-midY)*jY;
                ele.style.transform = `translate3d(${trX}px,${trY}px,${trZ}px)`;
            });
        }
        // 球形布局
        ,Sphere(){
            let arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1]
                ,len = arr.length
            ;
            [...aLi].forEach(function(ele,i){
                //求出当前li是属于第 几 层
                let {layer,index} = getLayer(i,arr);

                //求出x的旋转角度
                let roX = -layer*180/(len-1)+90;
                let roY = 360/arr[layer]*index + layer*10;
                let trZ = 800;

                ele.style.transform = `rotateY(${roY}deg) rotateX(${roX}deg) translateZ(${trZ}px)`;
            });
        }
        // 螺旋布局
        ,Helix(){
            let cycNum = 4;
            let y = 0;
            let roY = 0;
            let trX = 0;
            let trY = 0;
            let trZ = 800;
            let midY = num*7/2;
            [...aLi].forEach(function(ele){
                roY += 360*cycNum/num;
                y += 7;
                trY = y - midY;
                ele.style.transform = `rotateY(${roY}deg) translate3d(${trX}px,${trY}px,${trZ}px)`;
            });
        }
        // 层叠布局
        ,Grid(){
            [...aLi].forEach(function(ele,i){
                let a = i%25%5;
                let b = Math.floor((i%25)/5);
                let c = Math.floor(i/25);

                let midX = 2;
                let midY = 2;
                let midZ = 2;
                let x = (a-midX)*260;
                let y = (b-midY)*240;
                let z = (c-midZ)*800;
    
                ele.style.transform = `translate3d(${x}px,${y}px,${z}px)`;
            });
        }
    };

    // 添加125个标签并以循环排列,并初始随机布局
    (function(){
        let html = "";
        for(let i=0;i<num;i++){
            let ranX = Math.floor(Math.random()*6000-3000);
            let ranY = Math.floor(Math.random()*6000-3000);
            let ranZ = Math.floor(Math.random()*10000-5000);
            html += `<li style="transform:translate3d(${ranX}px,${ranY}px,${ranZ}px);">
                        <p class="title">Css3</p>
                        <p class="author">516科技</p>
                        <p class="time">2019-07-02</p>
            </li>`;
        };
        oUl.innerHTML = html;
        oUl.offsetLeft;
        FnObj.Grid();
    })();

    // 给下方的四个按钮添加点击事件
    (function(){
        let controlArr = ["Table","Sphere","Helix","Grid"];
        [...aBtn].forEach(function(ele,index){
            ele.onclick = FnObj[controlArr[index]]
        });
    })();


    // 添加拖拽 滚轮 事件
    (function(){
        let trX=0
            ,trY=0
            ,trZ=0
            ,_X
            ,_Y
        ;
        document.onmousedown = function(e){
            let lastX = e.clientX;
            let lastY = e.clientY;

            // 取消还没有消失的惯性
            _X = 0;
            _Y = 0;

            this.onmousemove = function(e){
                let nowX = e.clientX;
                let nowY = e.clientY;

                _X = nowX - lastX;
                _Y = nowY - lastY;

                trX += _X*0.2;
                trY -= _Y*0.2;

                lastX = nowX;
                lastY = nowY;

                oUl.style.transform = `translateZ(${-2000+trZ}px) rotateX(${trY}deg) rotateY(${trX}deg)`;
            }
        }
        document.onmouseup = function(){
            this.onmousemove = null;

            // 惯性事件
            !function m(){
                _X *= 0.95;
                _Y *= 0.95;

                // 当_X和_Y 的绝对值小于0.5时不再衰减
                if(Math.abs(_X)<=0.5) _X=0;
                if(Math.abs(_Y)<=0.5) _Y=0;
               
                trX += _X*0.2;
                trY -= _Y*0.2;
                oUl.style.transform = `translateZ(${-2000+trZ}px) rotateX(${trY}deg) rotateY(${trX}deg)`;
                
                if(!_X && !_Y) return; // 当_X和_Y都为0时终止操作

                requestAnimationFrame(m);
            }();
        }

        // 添加滚轮事件
        /*
        @params:
            * dom 对象
            * 事件函数, 第一个形参为事件对象e,第二个形参代表方位
        @return:
            * undefined
        */
        //兼容标准浏览器和谷歌浏览器的滚轮时间函数
        function mousewheel(ele,eFn){
            if(document.createElement("div").onmousewheel === null){
                ele.addEventListener("mousewheel",function(e){
                    eFn.call(this,e,e.wheelDelta/120);
                });
            }else{
                ele.addEventListener("DOMMouseScroll",function(e){
                    eFn.call(this,e,-e.detail/3);
                });
            }
        };
        mousewheel(document,function(e,d){
            trZ += d*200;
            oUl.style.transform = `translateZ(${-2000+trZ}px) rotateX(${trY}deg) rotateY(${trX}deg)`;
        });
    })();

    
})();