$(function(){
    var index = 0;//索引
    var timer;
    var clone = $('.banner .img li').first().clone();//克隆第一张图片，用于无缝轮播
    $('.banner .img').append(clone);//追加到列表最后
    var size = $('.banner .img li').size();//获取图片的个数
    // 根据图片的个数生成底部圆形按钮
    for(var i=0;i<size-1;i++){
        $('.banner .num').append('<li></li>');
    }
    // 给底部第一个圆形按钮默认的激活样式
    $('.banner .num li').first().addClass('on');

    // 封装一个共同的图片轮播方法
    function move(){
        if(index == size){//给index加以限制
            $('.banner .img').css({left:0});//重新归位
            index = 0;
        }

        if(index == -1){//给index加以限制
            $('.banner .img').css({left:-(size-1)*600});//重新归位
            index = size - 2;
        }

        $('.banner .img').stop().animate({left:-index*600},500);//移动
        
        //给底部相应的圆形按钮默认的激活样式
        if(index == size-1){//给index加以限制
            $('.banner .num li').eq(0).addClass('on').siblings().removeClass('on');
        }else{
            $('.banner .num li').eq(index).addClass('on').siblings().removeClass('on');
        }
    }

	// 左右箭头点击事件 图片轮播
    $('.btn_l').click(function(){
        // 1、索引自减
        index--;
        // 2、调用图片轮播方法
        move();
    })

     $('.btn_r').click(function(){
        // 1、索引自增
        index++;
        // 2、调用图片轮播方法
        move();
    })

    // 鼠标悬停到圆形按钮事件  图片轮播
    $('.banner .num li').hover(function(){
        // 1、获取当前索引,并赋值给index
        var myIndex = $(this).index();
        var index = myIndex;
        // 2、根据图片索引计算偏移量实现图片轮播
        $('.banner .img').stop().animate({left:-myIndex*600},500);
        // 3、给底部相应的圆形按钮默认的激活样式
        $(this).addClass('on').siblings().removeClass('on');
    })

    //  给banner容器加鼠标悬停事件
    $('.banner').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            index++;
            move();
        },3000);
    });

    // 自动轮播
    timer = setInterval(function(){
        index++;
        move();
    },3000);
});