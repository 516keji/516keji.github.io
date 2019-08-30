(function(){
    // 全局变量;
    let oUl = document.querySelector("#main ul.list");

    // 添加125个标签并以循环排列的方式布局
    (function(){
        let num = 125
            ,html = ""
        ;
        for(let i=0;i<num;i++){
            let a = i%25%5;
            let b = Math.floor((i%25)/5);
            let c = Math.floor(i/25);
    
            let x = (a-2)*260;
            let y = (b-2)*240;
            let z = (c-2)*800;
            html += `<li style="transform:translate3d(${x}px,${y}px,${z}px);">
                        <p class="title">Css3</p>
                        <p class="author">516科技</p>
                        <p class="time">2019-07-02</p>
            </li>`;
        }
        oUl.innerHTML = html;
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

