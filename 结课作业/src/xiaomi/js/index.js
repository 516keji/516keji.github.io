// 下拉菜单开始
(function(){
    let $li = $("#nav .nav-center > ul > .drop")
        ,$spinner = $("#nav .nav-center .hide .spinner")
        ,$hide = $("#nav .nav-center .hide")
        ,index = 0
    ;

    // 展示函数
    function showing(index){
        $hide.stop().slideDown(300);
        $spinner.eq(index).show().siblings().hide();
    }
    // 隐藏函数
    function hiding(){
        $hide.stop().slideUp(300);
    }
    // 分别注册 hover 事件
    $li.hover(
        function(){
            index = $(this).index();
            showing(index);
        }
        ,hiding
    );
    // 确保鼠标移入 hide 时产品不消失
    $hide.hover(function(){
        showing(index);
    },hiding);
})();
// 下拉菜单结束

// banner轮播开始
(function(){
    let $banner = $("#banner")
        ,$li = $("#banner .banner-img li")
        ,$prev = $("#banner .btn-prev")
        ,$next = $("#banner .btn-next")
        ,$btn = $("#banner .btn-bottom li")
        ,len = $li.length
        ,lastTime = 0
        ,index = 0
        ,timer = ""
        
    ;

    // 图片切换函数
    function change(index){
        $li.eq(index).fadeIn(500).siblings().fadeOut(500);
        $btn.eq(index).addClass("active").siblings().removeClass("active");
    };
    
    // 左边按钮注册点击事件
    $prev.click(function(){
        if(new Date()-lastTime<=500) return;
        lastTime = new Date();
        index--;
        if(index<0) index = len-1;
        change(index);
    });

    // 右边按钮注册点击事件
    $next.click(function(){
        if(new Date()-lastTime<=500) return;
        lastTime = new Date();
        index++;
        if(index>len-1) index = 0;
        change(index);
    });
    
    // 底部按钮注册点击事件
    $btn.click(function(){
        index = $(this).index();
        change(index);
    });

    // 添加自动轮播
    function auto(){
        timer = setInterval(function(){
            index++;
            if(index>len-1) index = 0;
            change(index);
        },2000);
    }
    auto();
    $banner.hover(function(){
        clearInterval(timer);
    },auto);
})();
// banner轮播结束

// 选项卡构造函数开始
function Tab($left,$right,$ul,len,index){
    // 类名 disable 控制函数
    function control(){
        $left.removeClass("disabled");
        $right.removeClass("disabled");
        if(index>=len-1){
            $right.addClass("disabled");
        }else if(index<=0){
            $left.addClass("disabled");
        }
    }

    // 右侧按钮注册点击事件
    $right.click(function(){
        if($right.hasClass("disabled")) return;
        index ++;
        control();
        if(index>len-1) index = len-1;
        $ul.animate({
            left: -index*982
        },300);
    });

    // 左侧按钮注册点击事件
    $left.click(function(){
        if($left.hasClass("disabled")) return;
        index --;
        control();
        if(index<0) index = 0;
        $ul.animate({
            left: -index*982
        },300);
    });
}
// 选项卡构造函数结束

// 小米闪购开始
(function(){
    // 左侧倒计时开始
    (function(){
        let setTime = new Date(2019,6,28,21,00,00,00)
            ,$hour = $("#flash-purchase .time .hour")
            ,$branch = $("#flash-purchase .time .branch")
            ,$second = $("#flash-purchase .time .second")
        ;
        setInterval(function(){
            let timeSpace = Math.floor((setTime - new Date())/1000);
            if(parseInt($hour.html())<=19){
                $second.html(timeSpace%60);
                $branch.html(Math.floor(timeSpace/60)%60);
                $hour.html(Math.floor(timeSpace/3600)%24);
            }
        },1000);
    })();
    // 左侧倒计时结束

    // 右侧选项卡开始
    (function(){
        let $left = $("#flash-purchase .btn .btn-left")
            ,$right = $("#flash-purchase .btn .btn-right")
            ,$ul = $("#flash-purchase .flash-goods ul")
            ,$li = $("#flash-purchase .flash-goods li")
            ,len = Math.ceil($li.length/4)
            ,index = 0
        ;

        let tab1 = new Tab($left,$right,$ul,len,index);
        
    })();
    // 测选项卡结束
})();
//小米闪购结束

// 家电开始
(function(){
    let $a = $("#goods-show .hea-area h2 a")
        ,$ul = $("#goods-show .hea-area .right ul")
        ,len = $a.length
        ,index = 0
    ;

    // 分类标签注册 mouseenter 事件
    $a.mouseenter(
        function(){
            index = len-1 - $(this).index();
            $(this).addClass("first").siblings().removeClass("first");
            $ul.eq(index).css("display","block").siblings().css("display","none");
        }
    );
})();
//家电结束

// 为你推荐开始
(function(){
    let $left = $("#goods-show .recommend .btn-left")
        ,$right = $("#goods-show .recommend .btn-right")
        ,$ul = $("#goods-show .recommend .rec-body ul")
        ,$li = $("#goods-show .recommend .rec-body li")
        ,len = Math.ceil($li.length/5)
        ,index = 0
    ;
    
    let tab2 = new Tab($left,$right,$ul,len,index);
})();
// 为你推荐结束

// 内容开始
(function(){
    let $borderLi = $("#goods-show .sub-body > ul > li");
    $borderLi.each(function(item){
        let $ul = $borderLi.eq(item).children("ul")
            ,$left = $borderLi.eq(item).children(".btn-left")
            ,$right = $borderLi.eq(item).children(".btn-right")
            ,$dotted = $borderLi.eq(item).children(".dotted").find("li")
            ,len = $dotted.length
            ,index = 0;
        
        // 初始化,给每个栏目中的第一个小圆点加上样式
        $dotted.eq(0).addClass("active");

        // 图片变换函数
        function change(index){
            $ul.animate({
                left: -index*296
            },300);
            $dotted.eq(index).addClass("active").siblings().removeClass("active");
        }

        // 左侧按钮点击
        $left.click(function(){
            if(index===0) return;
            index--;
            change(index);
        });

        // 右侧按钮点击
        $right.click(function(){
            if(index===len-1) return;
            index++;
            change(index);
        });
        // 下方小圆点点击
        $dotted.click(function(){
            index = $(this).index();
            $dotted.eq(index).addClass("active").siblings().removeClass("active");
            change(index);
        });
    });

})();
// 内容结束

// 回到顶部 构造函数
function ToTop($li,timer){
    // 判断 显示隐藏的函数
    function judge(){
        let $scrollTop = $(window).scrollTop();
        if($scrollTop>900){
            $li.show();
        }else{
            $li.hide();
        }
    }
    
    // 监听 scrollTop 的值
    $(window).scroll(function(){
        // 由于scroll是一个持续性触发事件,因此会浪费性能
        // 这里使用定时器 来达到优化性能的作用
        clearTimeout(timer); 
        timer = setTimeout(judge,300);
    });
    
    // 点击回到顶部
    $li.click(
        function(){
            //$(window).scrollTop(0);
            $("html,body").animate({
                scrollTop: 0
            },300)
        }
    )
}

// 回到顶部 开始
(function(){
    // big
    (function(){
        let $li = $("#sidebar .sidebar-big .to-top");
        let timer = null;
        let big = new ToTop($li,timer);

    })();
    // small
    (function(){
        let $li = $("#sidebar .sidebar-small .to-top");
        let timer = null;
        let small = new ToTop($li,timer);
    })();
})();
// 回到顶部 结束