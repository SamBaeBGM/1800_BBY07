// two days for leap years and not leap years
var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];

var my_cal=[
	[2021,'December',2,'do something you lazy bum.'],
	[2021,'October',1,'party'],
	[2021,'November',2,'movie']
];
var mark_cal="";
var mark_cal_msg="";

// initialize ids
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-month");
var cyear = document.getElementById("calendar-year");

// 初始化30天的ul及li
var oLi=holder.getElementsByTagName("li");
var oDayMsg=document.getElementById("days_msg");
// var oLi.length=0;

//create objects based on current time
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();

//get what day is it for the first day of that month
function dayStart(month, year) {
	var tmpDate = new Date(year, month, 1);
	return (tmpDate.getDay());
}

//calculate if it is a leap year
function daysMonth(month, year) {
	var tmp = year % 4;
	if (tmp == 0) {
		return (month_olympic[month]);
	} else {
		return (month_normal[month]);
	}
}

//show days for current month
function refreshDate(){
	var str = "";

    // get total day of that month
	var totalDay = daysMonth(my_month, my_year);

    //get what day is it for the first day of that month
	var firstDay = dayStart(my_month, my_year);
	var myclass;

    // the day before the first day should be empty
	// for(var i=1; i<firstDay; i++){ 
		// str += "<li></li>";
	// }
	for(var i=0;i<37;i++){
		oLi[i].innerHTML="";
		oLi[i].className="lightgrey";
	}

    //the day before today is light grey, the day after today is dark grey.
    //today is current menu colour
	for(var i=1; i<=totalDay; i++){
		var j=i+firstDay-2;
		if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
			oLi[j].className="lightgrey";
			// myclass = " class='lightgrey'";
		}else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
			oLi[j].className="userColorBlue";
		
			// myclass = "darkgrey";
		}else{
			oLi[j].className="lightgrey";
		
			// myclass = " class='darkgrey'";
		}
		oLi[j].innerHTML=i;
		// oLi[j].index=i;
		oLi[j].mark=false;
		// str += "<li"+myclass+">"+i+"</li>";
	}
    //show days, month, and year
	// holder.innerHTML = str;
	ctitle.innerHTML = month_name[my_month];
	cyear.innerHTML = my_year;
	for(var i=0; i<3; i++){
		if(my_cal[i][0]===my_year && my_cal[i][1]===month_name[my_month]){
			mark_cal=my_cal[i][2];
			mark_cal_msg=my_cal[i][3];
			oLi[mark_cal+firstDay-2].className="mark_cal";
			oLi[mark_cal+firstDay-2].mark=true;
		}
		// else{
			// oLi[my_cal[i][2]+firstDay-2].mark=false;
		// }
		
	}
	// alert(mark_cal+','+mark_cal_msg+firstDay+oLi[8].mark);
		
	

	oDayMsg.innerHTML=mark_cal;//ctitle.innerHTML;
	// alert(my_cal[2][0]+my_year+my_cal[2][1]+month_name[my_month]+my_cal[2][2]+my_cal[2][3]);
}

// run the above function
refreshDate();
// for(var i=0;i<37;i++){
// 	oLi[i].onmouseover=function(){
		
// 	oDayMsg.innerHTML = cyear.innerHTML+','+ctitle.innerHTML+','+oLi[i].innerHTML;
// 	//  myDaysClk(i);
// 	};
// }
// when click prev: month - 1, when month = 0, year -1, and month = December
// oppisite when click next
prev.onclick = function(){
	// e.preventDefault();
	my_month--;
	if(my_month<0){
		my_year--;
		my_month = 11;
	}
	refreshDate();

}
next.onclick = function(){
	// e.preventDefault();
	my_month++;
	if(my_month>11){
		my_year++;
		my_month = 0;
	}
	refreshDate();

}
//日志
function myDaysClk(liNum){
	// var li_day=oLi[liNum].innerHTML;
	// var daysMsg="meeting";

	if(oLi[liNum].mark==true){
		oDayMsg.innerHTML = mark_cal_msg;
	}
	else{
		oDayMsg.innerHTML="";
	}
	// li_day;
	
	// alert(oLi[liNum].mark);
}


oLi[0].onmouseover=function(){
	myDaysClk(0);
}

oLi[1].onmouseover=function(){
   myDaysClk(1);
}

oLi[2].onmouseover=function(){
   myDaysClk(2);
} 
oLi[3].onmouseover=function(){
	myDaysClk(3);
}

oLi[4].onmouseover=function(){
   myDaysClk(4);
}

oLi[5].onmouseover=function(){
   myDaysClk(5);
} 
oLi[6].onmouseover=function(){
	myDaysClk(6);
}

oLi[7].onmouseover=function(){
   myDaysClk(7);
}

oLi[8].onmouseover=function(){
   myDaysClk(8);
} 
oLi[9].onmouseover=function(){
	myDaysClk(9);
}

oLi[10].onmouseover=function(){
   myDaysClk(10);
}

oLi[11].onmouseover=function(){
   myDaysClk(11);
} 

