// two days for leap years and not leap years
var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];

// initialize ids
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-month");
var cyear = document.getElementById("calendar-year");

// initialize ul and li in days
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
	for(var i=1; i<firstDay; i++){ 
		str += "<li></li>";
	}

    //the day before today is light grey, the day after today is dark grey.
    //today is current menu colour
	for(var i=1; i<=totalDay; i++){
		if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
			myclass = " class='lightgrey'";
		}else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
			myclass = " class='userColorBlue'";
		}else{
			myclass = " class='darkgrey'";
		}
		str += "<li"+myclass+">"+i+"</li>";
	}

    //show days, month, and year
	holder.innerHTML = str;
	ctitle.innerHTML = month_name[my_month];
	cyear.innerHTML = my_year;
}
// run the above function
refreshDate();

// when click prev: month - 1, when month = 0, year -1, and month = December
// oppisite when click next
prev.onclick = function(e){
	e.preventDefault();
	my_month--;
	if(my_month<0){
		my_year--;
		my_month = 11;
	}
	refreshDate();

}
next.onclick = function(e){
	e.preventDefault();
	my_month++;
	if(my_month>11){
		my_year++;
		my_month = 0;
	}
	refreshDate();

}
//Events
function myDaysClk(liNum){
	var li_day=oLi[liNum].innerHTML;
	var daysMsg="meeting";
	 oDayMsg.innerHTML = cyear.innerHTML+','+ctitle.innerHTML+','+li_day;
	// alert(li_day);
}


oLi[7].onclick=function(e){
	e.preventDefault();
	myDaysClk(7);
}
oLi[8].onclick=function(e){
	e.preventDefault();
	myDaysClk(8);
}
oLi[9].onclick=function(e){
	e.preventDefault();
	myDaysClk(9);
} 