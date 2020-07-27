/**
 * @Name：日历控件
 * @Description：手机日历控件
 * @author：Huayf
 * @date：2015年1月12日下午
 */
var evnClick ;
/*
 * 初始化时间控件，传入要渲染div的id与日历的点击事件
 */
function initCalendar(id,evn){
	var calendarHtml = '<div class="calendar"><p class="calendar-year" id="pcalyear">2015年</p><a href="javascript:setLastMonth();" class="calendar-btn calendar-btn-l"><span class="icon-triangle-w"></span></a><a href="javascript:setNextMonth();" class="calendar-btn  calendar-btn-r"><span class="icon-triangle-e"></span></a><div class="calendar-months"><ul class="calendar-months" id="calmonthli"><li>1月</li><li>2月</li><li>3月</li><li class="months-cur">4月</li><li>5月</li><li>6月</li><li>7月</li><input type="hidden" value="" id="hidyear0" /><input type="hidden" value="" id="hidyear1" /><input type="hidden" value="" id="hidyear2" /><input type="hidden" value="" id="hidyear3" /><input type="hidden" value="" id="hidyear4" /><input type="hidden" value="" id="hidyear5" /><input type="hidden" value="" id="hidyear6" /></ul></div><div class="calendar-day" ><ul class="week week-b week-hd" ><li>星期日</li><li>星期一</li><li>星期二</li><li>星期三</li><li>星期四</li><li>星期五</li><li>星期六</li></ul><ul class="week week-b week-day week-day-b" id="caldayli"><li></li><li></li><li></li><li></li><li></li><li></li><li class="duty-full"><span>2</span><p>全天</p></li></ul></div></div><div  class="title-full" id="disDate"></div><input type="hidden" value="" id="selectYear"><input type="hidden" value="" id="selectMonth"><input type="hidden" value="" id="selectDay"><input type="hidden" value="3" id="selectMonIndex">';
  	$("#"+id).html(calendarHtml);
	//evnClick = evn;
	initTime();
  	setCalendar();
  	$("#calmonthli li").click(function(){
  		setMonthStyle(this);
  	})
}

/*
 * 初始化时间
 */
function initTime(){
	var nowtime = new Date();
	var selectYear = nowtime.getYear()+1900;//当前选择年
	var selectMonth = nowtime.getMonth();//当前选择月
	var selectDay = nowtime.getDate();//当前选择日
	$("#selectYear").val(selectYear);
	$("#selectMonth").val(selectMonth);
	$("#selectDay").val(selectDay);
	$("#pcalyear").html(selectYear + "年");//改变显示年
	setDisDate();//改变显示日期
	var hidyear = selectYear;
	selectMonth += 1;
	//初始化月份列表，以及月份对应的年
	for(var i=0;i<7;i++){
		if(selectMonth-(3-i)>12){
			$("#calmonthli li").eq(i).html(selectMonth-(3-i+12)+"月");
			$("#hidyear"+i).val(hidyear+1);
		}
		else if(selectMonth-(3-i)<=0){
			$("#calmonthli li").eq(i).html(selectMonth-(3-i-12)+"月");
			$("#hidyear"+i).val(hidyear-1);
		}
		else{
			$("#calmonthli li").eq(i).html(selectMonth-(3-i)+"月");
			$("#hidyear"+i).val(hidyear);
		}
	}
}

/*
 * 选择月的日历
 */
function setCalendar(){
	clearCalendar();
	var selectYear = $("#selectYear").val();
	var selectMonth = $("#selectMonth").val();
	var selectDay = $("#selectDay").val();
	var dmonth = selectMonth*1 +1;//获取当月最后一天所用月份（下个月的第0天）
	var dayNum = new Date(selectYear,dmonth,0);//获取当月的最后一天
	dayNum = dayNum.getDate();
	var selectMonthDay = new Date(selectYear,selectMonth,1);//选择月份的第一天
	var firstDayWeek = selectMonthDay.getDay();//获取第一天的星期
	for(var i=firstDayWeek,j=1;i<=$(".week-day-b li").length&&j<=dayNum;i++,j++){
		$(".week-day-b li").eq(i).html("<span>"+j+"</span>");//填写日期
		if(j == selectDay)
			$(".week-day-b li").eq(i).addClass("duty-cur");
		if(i==$(".week-day-b li").length-1&&j!=dayNum){//如果日历格子不够再画一行
			for(var k=0;k<7;k++){
				$("#caldayli").append("<li></li>");
			}
		}
	}
	
	$("#caldayli li").click(function(){//绑定日历li点击事件
			setDayStyle(this);
			//evnClick();
			//自定义添加
//			if($(".week-day-b li").hasClass('duty-cur')){
//				$(this).append(
//				' <div class="dotDialg" style="">'+
//				'<div class="dotDialg_tit">2019年4月13日 (共两篇)'+
//				'<span class="closedotDialg">X</span>'+		
//				'</div>'+
//				' <div class="dotDialg_list">'+
//				'<div class="clearfix">'+
//				'<div class="dotDialg_time pull-left">13:14</div>'+
//				' <div class="dotDialg_notes pull-right">两学一做党员发展策略学习笔记</div>'+
//				' </div>'+
//				' <div class="clearfix" style="margin: 4% 0 7%;">'+
//				'<div class="dotDialg_time pull-left">08:16</div>'+
//				' <div class="dotDialg_notes pull-right">两学一做党员发展策略学习笔记</div>'+
//				' </div>'+
//				'<a href="javascript:;">更多笔记</a>'+
//				'</div>'+
//				' </div>'
//			)
//	}
		
	})
	$(".week-day-b li").click(function(){
			$(this).append(
				' <div class="dotDialg" style="">'+
				'<div class="dotDialg_tit">2019年4月13日 (共两篇)'+
				'<span class="closedotDialg">X</span>'+		
				'</div>'+
				' <div class="dotDialg_list">'+
				'<div class="clearfix">'+
				'<div class="dotDialg_time pull-left">13:14</div>'+
				' <div class="dotDialg_notes pull-right">两学一做党员发展策略学习笔记</div>'+
				' </div>'+
				' <div class="clearfix" style="margin: 4% 0 7%;">'+
				'<div class="dotDialg_time pull-left">08:16</div>'+
				' <div class="dotDialg_notes pull-right">两学一做党员发展策略学习笔记</div>'+
				' </div>'+
				'<a href="javascript:;">更多笔记</a>'+
				'</div>'+
				' </div>'
			)
			$(".closedotDialg").click(function(){
				$('.dotDialg').addClass('di-n');
				return false;
				
			})
	})
	
}

/*
 * 清空日历
 */
function clearCalendar(){
	$("#caldayli").html("");
	for(var k=0;k<7;k++){
		$("#caldayli").append("<li></li>");
	}
}
/*
 * 选择日期
 */
function setDayStyle(dom){
	$(".week-day-b li").removeClass("duty-cur");
	$(dom).addClass("duty-cur");
	var v = dom.firstChild.innerHTML;//获取点击结点日期
	$("#selectDay").val(v);//改变当前选择日期
	setDisDate();//改变显示日期
}
/*
 * 选择月份
 */
function setMonthStyle(dom){
	$(".calendar-months li").removeClass("months-cur");
	$(dom).addClass("months-cur");
	$("#selectMonIndex").val($(dom).index());//设置选中月下标
	var v = $(dom).html();//获取选择月份
	if(v.length==3)
		v = v.substring(0,2);
	else
		v = v.substring(0,1);
	v = v-1;
	$("#selectMonth").val(v);//改变选择月
	var index = $(dom).index();//获取月份li对应索引
	var selectYear = $("#hidyear" + index).val();//获得选择年
	$("#selectYear").val(selectYear);//改变选择年
	$("#pcalyear").html(selectYear+ "年");//改变显示年
	setDisDate();//变更显示日期
	setCalendar();//变更日历
	
}
/*
 * 设置下一页月份，点一下翻半年
 */
function setNextMonth(){ 
	for(var i=0;i<7;i++){
		var m = $("#calmonthli li").eq(i).html();
		m = m.substring(0,m.length-1);
		if((m*1+6)>12){//设置对应月份的年份
			var hidyear = $("#hidyear"+i).val();
			$("#hidyear"+i).val(hidyear*1+1);
		}
		if((m*1+6) == 12)
			$("#calmonthli li").eq(i).html(12+"月");
		else
			$("#calmonthli li").eq(i).html((m*1+6)%12+"月");//设置当月li
	}
	//改变选择月
	var selectMonth = $("#selectMonth").val();
	$("#selectMonth").val((selectMonth*1+6)%12);
	//改变选择年
	var index = $("#selectMonIndex").val();//获取选中月下标
	var syear = $("#hidyear"+index).val();//获取选中月对应年
	$("#selectYear").val(syear);//设置选中年
	$("#pcalyear").html(syear+ "年");//改变显示年
	//改变日历
	setCalendar();
	setDisDate();//改变显示日期
}
/*
 * 设置上一页月份,点一下翻半年
 */
function setLastMonth(){
	for(var i=0;i<7;i++){
		var m = $("#calmonthli li").eq(i).html();
		m = m.substring(0,m.length-1);
		if((m*1-6)<0){//设置对应月份的年份
			var hidyear = $("#hidyear"+i).val();
			$("#hidyear"+i).val(hidyear*1-1);
		}
		if((m*1-6+12) == 12)
			$("#calmonthli li").eq(i).html(12+"月");
		else
			$("#calmonthli li").eq(i).html((m*1-6+12)%12+"月");//设置当月li
	}
	//改变选择月
	var selectMonth = $("#selectMonth").val();
	$("#selectMonth").val((selectMonth*1-6+12)%12);
	//改变选择年
	var index = $("#selectMonIndex").val();//获取选中月下标
	var syear = $("#hidyear"+index).val();//获取选中月对应年
	$("#selectYear").val(syear);//设置选中年
	$("#pcalyear").html(syear+ "年");//改变显示年
	//改变日历
	setCalendar();
	setDisDate();//改变显示日期
}
/*
 * 设置显示日期
 */
function setDisDate(){
	var selectYear = $("#selectYear").val();//获取选中年月日
	var selectMonth = $("#selectMonth").val();
	var selectDay = $("#selectDay").val();
	var now = new Date(selectYear,selectMonth,selectDay);
	var selectWeek = now.getDay();//获取选中天数日期
	selectWeek = getweek(selectWeek);
	//设置年月日
	$("#disDate").html(selectYear + "年 " + (selectMonth * 1 + 1) + "月 " + selectDay + "日  星期" + selectWeek);

	evn(selectYear + "年 " + (selectMonth * 1 + 1) + "月 " + selectDay + "日  星期" + selectWeek);
}

/*
 * 获得星期
 */
function getweek(day){
	  var week = "";
	  switch(day){
	     case 0:week="日";break;
	     case 1:week="一";break;
	     case 2:week="二";break;
	     case 3:week="三";break;
	     case 4:week="四";break;
	     case 5:week="五";break;
	     case 6:week="六";break;
	  }
	  return week;
}