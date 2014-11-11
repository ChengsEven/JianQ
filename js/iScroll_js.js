
        var myScroll;
        var pullDownEl;
        var pullDownOffset;
        var pullUpEl;
        var pullUpOffset;
        var count = 0;
		var company = 1;	//集团总部
		var ncompany = 1;	//本公司新闻
		var ocompany = 1;	//分公司新闻
		
        function pullUpAction() {//上拉事件
//              setTimeout(function() {
//						
//						var addStaic = $("#add").attr("data-staic");
//						
//						if(addStaic == "1"){
//							newsList("1", ++company,"");
//						}else if(addStaic == "2"){
//							newsList("2", ++ncompany,"");
//						}else{
//							newsList("3", ++ocompany,"");
//						}
//						
//                      myScroll.refresh(); // 刷新
//              }, 300); //1秒
        }
		
        function pullDownAction() {//下拉事件
//              setTimeout(function() {
//						$("#add").html(" ");
//						var addStaic = $("#add").attr("data-staic");
//						if(addStaic == "1"){
//							newsList("1","1","");
//						}else if(addStaic == "2"){
//							newsList("2","1","");
//						}else{
//							newsList("3","1","");
//						}
//                      myScroll.refresh();
//              }, 300);
        }
		
        function loaded() {//加载完成
                pullDownEl = document.getElementById('pullDown');
                pullDownOffset = pullDownEl.offsetHeight;
                pullUpEl = document.getElementById('pullUp');
                pullUpOffset = pullUpEl.offsetHeight;
//				var myScroll2 = new iScroll('newsDiv',{checkDOMChanges:true,hScroll:true,vScroll :true,fadeScrollbar:true,hideScrollbar:true });
			
                myScroll = new iScroll(
                                'wrapper',
                                {
                                        useTransition : true,
                                        topOffset : pullDownOffset,
										checkDOMChanges:true,//是否自动检测内容变化
										fadeScrollbar:true,hideScrollbar:true,//滚动栏自动隐藏
                                        onRefresh : function() {
                                                if (pullDownEl.className.match('loading')) {
                                                        pullDownEl.className = '';
                                                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                                                } else if (pullUpEl.className.match('loading')) {
                                                        pullUpEl.className = '';
                                                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '显示更多...';
                                                }
                                        },
                                        onScrollMove : function() {
                                                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                                                        pullDownEl.className = 'flip';
                                                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '准备刷新...';
                                                        this.minScrollY = 0;
                                                } else if (this.y < 5
                                                                && pullDownEl.className.match('flip')) {
                                                        pullDownEl.className = '';
                                                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '准备刷新...';
                                                        this.minScrollY = -pullDownOffset;
                                                } else if (this.y < (this.maxScrollY - 5)
                                                                && !pullUpEl.className.match('flip')) {
                                                        pullUpEl.className = 'flip';
                                                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '准备刷新...';
                                                        this.maxScrollY = this.maxScrollY;
                                                } else if (this.y > (this.maxScrollY + 5)
                                                                && pullUpEl.className.match('flip')) {
                                                        pullUpEl.className = '';
                                                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉显示更多...';
                                                        this.maxScrollY = pullUpOffset;
                                                }
                                        },
                                        onScrollEnd : function() {
                                                if (pullDownEl.className.match('flip')) {
                                                        pullDownEl.className = 'loading';
                                                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                                                        pullDownAction(); // Execute custom function (ajax call?)
                                                } else if (pullUpEl.className.match('flip')) {
                                                        pullUpEl.className = 'loading';
                                                        pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                                                        pullUpAction(); // Execute custom function (ajax call?)
                                                }
                                        }
                                });

                setTimeout(function() {
                        document.getElementById('wrapper').style.left = '0';
                }, 800);
        }

        document.addEventListener('touchmove', function(e) {
                e.preventDefault();
        }, false);

        document.addEventListener('DOMContentLoaded', function() {
                setTimeout(loaded, 200);
        }, false);
