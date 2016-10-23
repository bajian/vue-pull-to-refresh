    import IScroll from './iscroll-probe.js'
    var _index_key_ = {};	

    var scrollObj = {};

    var extend=function(oldObj,newObj){
    	for(var key in newObj){
    		oldObj[key]=newObj[key];
    	}
    	return oldObj;
    };

    var Scroll = function(selector, opts){
    	var $scroll;
    	var options = {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
            scrollbars: 'custom',//有滚动条  
            mouseWheel: true,//允许滑轮滚动  
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
            bounce:true,//边界反弹 
            listenX: false, 
            interactiveScrollbars:true,//滚动条可以拖动  
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: true ,// 允许点击事件  
            momentum:true,// 允许有惯性滑动  
    		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/ }
    	};
    	options = extend(options, opts||{});

		IScroll.utils.isBadAndroid = false;//处理页面抖动
		$scroll = new IScroll(selector, options);

		$scroll.refresh();
		return $scroll
	};


	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = Scroll;
	} else {
		window.scroll = Scroll;
	}

// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
