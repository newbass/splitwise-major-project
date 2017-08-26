var count=1;
var flag=0;
var usernames=[];
var myname = "";
var dash={}
var you = 1;
var mysettle=[];
var mytrans=[];
var paysineach = [];
var paysinzero = [];
var myhistory=[];
$.get('http://127.0.0.1:5000/friends',function(response){usernames = response;console.log(usernames);})
$.get('http://127.0.0.1:5000/user',function(response){myname = response;console.log(myname);})
$.get('http://127.0.0.1:5000/dashing',function(response){dash=response;console.log(dash);}).done(function(){dashload();})
$.get('http://127.0.0.1:5000/settle',function(response){mysettle=response;console.log(mysettle);})
$.get('http://127.0.0.1:5000/getusertrans',function(response){paysineach=response;console.log(paysineach);})
$.get('http://127.0.0.1:5000/getusertranszero',function(response){paysinzero=response;console.log(paysinzero);})
$.get('http://127.0.0.1:5000/history',function(response){myhistory=response;console.log("hellohist", myhistory);})

var passto = function()
{
$.get('http://127.0.0.1:5000/friends',function(response){usernames = response;console.log(usernames);})
$.get('http://127.0.0.1:5000/settle',function(response){mysettle=response;console.log(mysettle);})
$.get('http://127.0.0.1:5000/getusertrans',function(response){paysineach=response;console.log(paysineach);})
$.get('http://127.0.0.1:5000/getusertranszero',function(response){paysinzero=response;console.log(paysinzero);})
$.get('http://127.0.0.1:5000/history',function(response){myhistory=response;console.log("hellohist", myhistory);})
}

var list=[];
var month={'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}
var flageq=0;
var flagex=0;
var flagpc=0;
var flagsh=0;
var flagit=0;
var total_amount=0;

function isEmpty( obj ) { 
   for ( var prop in obj ) { 
      return false; 
   } 
   return true; 
}

var data = {};
var autocom = function(){$(function(){
    $(".user").autocomplete({
      source: usernames
    });
  });};

$(function(){
    $('[data-toggle="tooltip"]').tooltip({placement:top}); 
});

//$.get('http://127.0.0.1:5000/friends',function(response){usernames=response;});

var dashload = function()
{
	$.get('http://127.0.0.1:5000/dashing',function(response){dash=response;console.log(dash);}).done(function(data){dashboardload();})
}

var settleuptable = function()
{
	document.getElementById('settleup_content').style.display = "block";
	document.getElementById('allactive_content').style.display = "none";
	document.getElementById('recentactive_content').style.display = "none";
	var setbody = document.getElementById('settlebody');
	var temp = setbody.childElementCount;
	for(i=0;i<temp;i++)
		setbody.deleteRow(0);
	for(i=0;i<mysettle.length;i++)
	{
	        var row = document.createElement('tr');
                row.setAttribute('style','border-top:1px solid black;');
                row.setAttribute('class','dark');
                row.setAttribute('id',"closea-"+mysettle[i]['tid']);
                row.addEventListener('click',showchild2);
                var desc = document.createElement('td');
                desc.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                desc.innerHTML = mysettle[i]['description'];
                row.appendChild(desc);

                var by = document.createElement('td');
                by.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
                by.innerHTML = "Created by "+mysettle[i]['creator'];
                row.appendChild(by);

                var time = document.createElement('td');
                time.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                var date = mysettle[i]['date'];
                date = date.split('-');
                time.innerHTML = date[0]+" "+month[date[1]]+"'"+date[2].slice(2);

                var span = document.createElement('span');
                span.setAttribute('style','text-align:center;vertical-align:middle;font-size:15px;');
                if(parseFloat(date[3])<12)
                        span.innerHTML = date[3]+":"+date[4]+"AM";
                else if(parseFloat(date[3])==12)
                        span.innerHTML = date[3]+":"+date[4]+"PM";
                else
                        span.innerHTML = String(parseFloat(date[3])-12)+":"+date[4]+"PM";


                time.appendChild(span);
                row.appendChild(time);

                var billamt = document.createElement('td');
                billamt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                billamt.innerHTML = "Bill( "+mysettle[i]['bill_amount']+" )";

                row.appendChild(billamt);

                var billa = document.createElement('td');
                row.appendChild(billa);
		
                setbody.appendChild(row);


                console.log("loop start");
                for(j=0;j<paysinzero[i].length;j++){

                if(paysinzero[i][j]['status']==0){
                var nrow = document.createElement('tr');
                nrow.setAttribute('style','border-bottom:1px solid black;display:none');
                nrow.setAttribute('id',"childa"+String(paysinzero[i][j]['t_id']));
                nrow.setAttribute('class','light');

                var from = document.createElement('td');
                from.innerHTML = paysinzero[i][j]['pay_by'];
                from.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(from);

                var arr = document.createElement('td');
                arr.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
                var ic = document.createElement('span');
                ic.setAttribute('class','glyphicon glyphicon-hand-right');
                ic.setAttribute('style','color:#7094db');
                arr.appendChild(ic);
                nrow.appendChild(arr);

                var to = document.createElement('td');
                to.innerHTML = paysinzero[i][j]['pay_to'];
                to.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(to);

                var amt = document.createElement('td');
                amt.innerHTML = (parseFloat(paysinzero[i][j]['amount'])).toFixed( 2 );
                amt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(amt);

		var sett = document.createElement('td');
		if(paysinzero[i][j]['pay_by']==myname||paysinzero[i][j]['pay_to']==myname){
                var ic = document.createElement('span');
                ic.setAttribute('class','glyphicon glyphicon-thumbs-up');
                ic.setAttribute('id',mysettle[i]['tid']+" "+paysinzero[i][j]['pay_by']+" "+paysinzero[i][j]['pay_to']);
                ic.addEventListener('click',clickfunc);
                ic.setAttribute('style','margin-left:20px;vertical-align:middle;font-size:130%;color:green;');
                sett.appendChild(ic);}

                nrow.appendChild(sett);

                setbody.appendChild(nrow);
		}}
	}
}

var showchild = function()
{
	x = this.id;
	w = x.split('-');
	console.log(w[0]);
	console.log(w[1]);
	if(String(w[0])=="close")
	{
		a = document.querySelectorAll("#child"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="";}

		var q = document.getElementById('close-'+w[1]);
		q.setAttribute('id','open-'+w[1]);
	}
	else
	{
		a = document.querySelectorAll("#child"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="none";}

		var q = document.getElementById('open-'+w[1]);
		q.setAttribute('id','close-'+w[1]);
	}
}

var showchild2 = function()
{
	x = this.id;
	w = x.split('-');
	console.log(w[0]);
	console.log(w[1]);
	if(String(w[0])=="closea")
	{
		a = document.querySelectorAll("#childa"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="";}

		var q = document.getElementById('closea-'+w[1]);
		q.setAttribute('id','opena-'+w[1]);
	}
	else
	{
		a = document.querySelectorAll("#childa"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="none";}

		var q = document.getElementById('opena-'+w[1]);
		q.setAttribute('id','closea-'+w[1]);
	}
}

var showchild1 = function()
{
	x = this.id;
	w = x.split('-');
	console.log(w[0]);
	console.log(w[1]);
	if(String(w[0])=="closeabc")
	{
		a = document.querySelectorAll("#childabc"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="";}

		var q = document.getElementById('closeabc-'+w[1]);
		q.setAttribute('id','openabc-'+w[1]);
	}
	else
	{
		a = document.querySelectorAll("#childabc"+String(w[1]));
		console.log(a);
		for(i=0;i<a.length;i++)
		{a[i].style.display="none";}

		var q = document.getElementById('openabc-'+w[1]);
		q.setAttribute('id','closeabc-'+w[1]);
	}
}

function clickfunc()
{
	a = this.id.split(' ');
	console.log(a[0],a[1],a[2])
//	alert(a[0],a[1],a[2]);
	settleprocess(a[0],a[1],a[2]);
}

function deletfunc()
{
	a = this.id;
	console.log('in delete');
//	alert(a);
	deleteprocess(a);
}

var settleprocess = function(tid,pay_by,pay_to)
{
	$.ajax({
		url:'http://127.0.0.1:5000/settleup',
		method:'POST',
		data:{tid:tid,pay_by:pay_by,pay_to:pay_to,},
		success:function(){passto();dashload();},		
	});
}

var deleteprocess = function(tid)
{
	$.ajax({
		url:'http://127.0.0.1:5000/deleteup',
		method:'POST',
		data:{tid:tid,},
		success:function(){passto();dashload();},		
	});
}

var allexpensestable = function()
{
	document.getElementById('allactive_content').style.display = "block";
	document.getElementById('settleup_content').style.display = "none";
	document.getElementById('recentactive_content').style.display = "none";
	var allbody1 = document.getElementById('allbody');
//	allbody1.style.border = "1px solid black";
	var temp = allbody1.childElementCount;
	for(i=0;i<temp;i++)
		allbody1.deleteRow(0);

	for(i=myhistory.length-1;i>=0;i--)
	{
		var row = document.createElement('tr');
		row.setAttribute('style','border-top:1px solid black;');
		row.setAttribute('id',"close-"+myhistory[i]['tid']);
		row.setAttribute('class','dark');
		row.addEventListener('click',showchild);
		var desc = document.createElement('td');
		desc.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		desc.innerHTML = myhistory[i]['description'];
		row.appendChild(desc);

		var by = document.createElement('td');
		by.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
		by.innerHTML = "Created by "+myhistory[i]['creator'];
		row.appendChild(by);

		var time = document.createElement('td');
		time.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		var date = myhistory[i]['date'];
		date = date.split('-');
		time.innerHTML = date[0]+" "+month[date[1]]+"'"+date[2].slice(2);
		
		var span = document.createElement('span');
		span.setAttribute('style','text-align:center;vertical-align:middle;font-size:15px;');
		if(parseFloat(date[3])<12)
			span.innerHTML = date[3]+":"+date[4]+"AM";
		else if(parseFloat(date[3])==12)
			span.innerHTML = date[3]+":"+date[4]+"PM";
		else
			span.innerHTML = String(parseFloat(date[3])-12)+":"+date[4]+"PM";
		
	
		time.appendChild(span);
		row.appendChild(time);

		var billamt = document.createElement('td');
		billamt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		billamt.innerHTML = "Bill( "+myhistory[i]['bill_amount']+" )";
		row.appendChild(billamt);

		var dela = document.createElement('td');
		if(myhistory[i]['creator']==myname)
		{
			var delet = document.createElement('span');
			delet.setAttribute('class','glyphicon glyphicon-trash');
			delet.setAttribute('style','vertical-align:middle;margin-left:40px;color:red;font-size:95%;');
			delet.setAttribute('id',myhistory[i]['tid']);
			delet.addEventListener('click',deletfunc);
			dela.appendChild(delet);
		}	
		row.appendChild(dela);
		allbody1.appendChild(row);


		console.log("loop start");	
		for(j=0;j<paysineach[i].length;j++){
		
		var nrow = document.createElement('tr');
		nrow.setAttribute('style','border-bottom:1px solid black;display:none');
		nrow.setAttribute('id',"child"+String(paysineach[i][j]['t_id']));
		nrow.setAttribute('class','light');
		
		var from = document.createElement('td');
		from.innerHTML = paysineach[i][j]['pay_by'];
		from.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		nrow.appendChild(from);

		var arr = document.createElement('td');
		arr.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
		var ic = document.createElement('span');				
		ic.setAttribute('class','glyphicon glyphicon-hand-right');
		ic.setAttribute('style','color:#7094db');
		arr.appendChild(ic);
		nrow.appendChild(arr);
		
		var to = document.createElement('td');
		to.innerHTML = paysineach[i][j]['pay_to'];
		to.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		nrow.appendChild(to);
		
		var amt = document.createElement('td');
		amt.innerHTML = (parseFloat(paysineach[i][j]['amount'])).toFixed( 2 );
		amt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
		nrow.appendChild(amt);

		var stat = document.createElement('td');
		var ic = document.createElement('span');
		if(paysineach[i][j]['status']==1){				
		ic.setAttribute('class','glyphicon glyphicon-thumbs-up');
		ic.setAttribute('style','margin-left:40px;vertical-align:middle;font-size:140%;color:green;');}
		
		else
		{ic.setAttribute('class','glyphicon glyphicon-thumbs-down');
		ic.setAttribute('style','margin-left:40px;vertical-align:middle;font-size:140%;color:red;');}
		stat.appendChild(ic);
		nrow.appendChild(stat);

		allbody1.appendChild(nrow);
		
		}
	}
}

var recentexpensestable = function()
{
	document.getElementById('recentactive_content').style.display = "block";
	document.getElementById('settleup_content').style.display = "none";
	document.getElementById('allactive_content').style.display = "none";
	var recentbody1 = document.getElementById('recentbody');
	var temp = recentbody1.childElementCount;
	for(i=0;i<temp;i++)
		recentbody1.deleteRow(0);

	for(i=myhistory.length-1; i>=0 && i>myhistory.length-6 ;i--)
	{
	        var row = document.createElement('tr');
                row.setAttribute('style','border-top:1px solid black;');
                row.setAttribute('id',"closeabc-"+myhistory[i]['tid']);
		row.setAttribute('class','dark');
                row.addEventListener('click',showchild1);
                var desc = document.createElement('td');
                desc.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                desc.innerHTML = myhistory[i]['description'];
                row.appendChild(desc);

                var by = document.createElement('td');
                by.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
                by.innerHTML = "Created by "+myhistory[i]['creator'];
                row.appendChild(by);

                var time = document.createElement('td');
                time.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                var date = myhistory[i]['date'];
                date = date.split('-');
                time.innerHTML = date[0]+" "+month[date[1]]+"'"+date[2].slice(2);

                var span = document.createElement('span');
                span.setAttribute('style','text-align:center;vertical-align:middle;font-size:15px;');
                if(parseFloat(date[3])<12)
                        span.innerHTML = date[3]+":"+date[4]+"AM";
                else if(parseFloat(date[3])==12)
                        span.innerHTML = date[3]+":"+date[4]+"PM";
                else
                        span.innerHTML = String(parseFloat(date[3])-12)+":"+date[4]+"PM";


                time.appendChild(span);
                row.appendChild(time);

                var billamt = document.createElement('td');
                billamt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                billamt.innerHTML = "Bill( "+myhistory[i]['bill_amount']+" )";
                row.appendChild(billamt);

		var bila = document.createElement('td');
                if(myhistory[i]['creator']==myname)
                {
                        var delet = document.createElement('span');
                        delet.setAttribute('class','glyphicon glyphicon-trash');
                        delet.setAttribute('id',myhistory[i]['tid']);
                        delet.setAttribute('style','margin-left:40px;color:red;font-size:95%;');
                        delet.addEventListener('click',deletfunc);
                        bila.appendChild(delet);
                }
                row.appendChild(bila);
                recentbody1.appendChild(row);


                for(j=0;j<paysineach[i].length;j++){

                var nrow = document.createElement('tr');
                nrow.setAttribute('style','border-bottom:1px solid black;display:none;');
                nrow.setAttribute('id',"childabc"+String(paysineach[i][j]['t_id']));
		nrow.setAttribute('class','light');

                var from = document.createElement('td');
                from.innerHTML = paysineach[i][j]['pay_by'];
                from.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(from);

                var arr = document.createElement('td');
                arr.setAttribute('style','text-align:center;vertical-align:middle;font-size:17px;');
                var ic = document.createElement('span');
                ic.setAttribute('class','glyphicon glyphicon-hand-right');
                ic.setAttribute('style','color:#7094db');
                arr.appendChild(ic);
                nrow.appendChild(arr);

                var to = document.createElement('td');
                to.innerHTML = paysineach[i][j]['pay_to'];
                to.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(to);

                var amt = document.createElement('td');
                amt.innerHTML = (parseFloat(paysineach[i][j]['amount'])).toFixed( 2 );
                amt.setAttribute('style','text-align:center;vertical-align:middle;font-size:25px;');
                nrow.appendChild(amt);

		var stat = document.createElement('td');
                var ic = document.createElement('span');
                if(paysineach[i][j]['status']==1){
                ic.setAttribute('class','glyphicon glyphicon-thumbs-up');
                ic.setAttribute('style','margin-left:40px;vertical-align:middle;font-size:140%;color:green;');}

                else
                {ic.setAttribute('class','glyphicon glyphicon-thumbs-down');
                ic.setAttribute('style','margin-left:40px;vertical-align:middle;font-size:140%;color:red;');}
		stat.appendChild(ic);
                nrow.appendChild(stat);
                recentbody1.appendChild(nrow);
		}
	}
}

var dashboardload = function()
{
	document.getElementById('dash').style.display='block';
	document.getElementById('dashboard_content').style.display='block';
	document.getElementById('recentact').style.display='none';
	document.getElementById('allexpense').style.display='none';
	document.getElementById('allactive_content').style.display='none';
	document.getElementById('recentactive_content').style.display = "none";
	document.getElementById('bill').style.display='none';
	document.getElementById('addbill_content').style.display='none';
	document.getElementById('settleup').style.display='none';
	document.getElementById('settleup_content').style.display='none';
	var nebody = document.getElementById('netbody');
	var temp = nebody.childElementCount;
	for(i=0;i<temp;i++)
		nebody.deleteRow(0);
	tempflag=0;
	for(i=0;i<usernames.length;i++)
	{
		if(dash[usernames[i]]){console.log(dash[usernames[i]]);tempflag=1;break;}
	}
	if(tempflag==0){
		document.getElementById('settle_message').style.display = "block";
		document.getElementById('nettran').style.display = "none";}
	
	else
	{
		console.log('in dash load');
		document.getElementById('settle_message').style.display = "none";
		document.getElementById('nettran').style.display = "block";
		var dashbo = document.getElementById('netbody');
		for(i=0;i<dashbo.childNodes;i++)
			dashbo.deleteRow(i);
	
		var tablecount=0;

		for(i=0;i<usernames.length;i++)
		{
			if(dash[usernames[i]])
			{
				console.log(dash[usernames[i]]);
				var row = document.createElement('tr');
				
				var data = document.createElement('td');
				data.setAttribute('style','text-align:center;vertical-align:middle;font-size:27px;');
				if(dash[usernames[i]]>0)
				data.innerHTML = myname;

				else
				data.innerHTML = usernames[i];

				row.appendChild(data);
				var arr = document.createElement('td');
				arr.setAttribute('style','text-align:center;vertical-align:middle;font-size:27px;');
				var ic = document.createElement('span');				
				ic.setAttribute('class','glyphicon glyphicon-hand-right');
				arr.appendChild(ic);
				row.appendChild(arr);

				var to = document.createElement('td');
				to.setAttribute('style','text-align:center;vertical-align:middle;font-size:27px;');
				if(dash[usernames[i]]>0)
				to.innerHTML = usernames[i];

				else
				to.innerHTML = myname;
				row.appendChild(to);

				var amt = document.createElement('td');
				amt.setAttribute('style','text-align:center;vertical-align:middle;font-size:27px;');
				if(dash[usernames[i]]<0)amt.innerHTML = (parseFloat(-dash[usernames[i]])).toFixed( 2 );
				else amt.innerHTML = (parseFloat(dash[usernames[i]])).toFixed( 2 );
				row.appendChild(amt);
				dashbo.appendChild(row);
			}
		}
	}
}

$('#dashboard_link').on('click',function()
				{
					$('a').removeClass('open');
					$('#dashboard_link').addClass('open');
					document.getElementById('dashboard_link').style.textDecoration = "none";
				});

$('#notification_link').on('click',function()
				{
					$('a').removeClass('open');
					$('#notification_link').addClass('open');
					document.getElementById('notification_link').style.textDecoration = "none";
				});

$('#allnotification_link').on('click',function()
				{
					$('a').removeClass('open');
					$('#allnotification_link').addClass('open');
					document.getElementById('allnotification_link').style.textDecoration = "none";
				});

var duplicate = function()
{
	var i = 0;
	var check = document.getElementById("username"+String(count));
	for(i=1;i<count;i++)
	{
		var tobe = document.getElementById("username"+String(i)).value;
		if(check.value==tobe)
		{
			check.value=null;
			$('#username'+String(count)).attr('placeholder','Enter New Name');
		}
	}
}

var logout = function()
{
	console.log('where am i');
	$.get('/logout',function(response){console.log(response);window.location="http://127.0.0.1:5000/home";});
}

var addfriend = function()
{
	console.log('friend add');
	document.getElementById('add_friend').style.display="block";	
}

var add = function()
{
	console.log('to be added');
	email = document.getElementById('addemail').value;
	$.ajax({
		url:'http://127.0.0.1:5000/addFriend',
		method:'POST',
		data:{friend:email},
		success:function(response)
			{
				console.log(response);
				if(response=="Unsuccessful")
				{
					console.log('tohola');
					document.getElementById('addemail').setAttribute('placeholder','Wrong Entry');
				}
				document.getElementById('addemail').value=null;
				console.log('hola');
				passto();
			},
		});
}

var addbill = function()
{
	console.log('addBill');
	
/*	$.ajax({
		url:'http://127.0.0.1:5000/bill',
		method:'GET',
		data:{},
		success:function(response)
			{
				console.log('vanish');
				document.getElementById('dash').style.display='none';
				document.getElementById('bill').style.display='block';
			},
		});*/
	document.getElementById('dash').style.display='none';
	document.getElementById('dashboard_content').style.display='none';
	document.getElementById('recentact').style.display='none';
	document.getElementById('allexpense').style.display='none';
	document.getElementById('bill').style.display='block';
	document.getElementById('addbill_content').style.display='block';
}

var settle = function()
{
	console.log('settling');
	document.getElementById('dash').style.display='none';
	document.getElementById('dashboard_content').style.display='none';
	document.getElementById('recentact').style.display='none';
	document.getElementById('allexpense').style.display='none';
	document.getElementById('bill').style.display='none';
	document.getElementById('addbill_content').style.display='none';
	document.getElementById('settleup').style.display='block';

	settleuptable();
}

var recentactivity = function()
{
	console.log('recent');
	document.getElementById('dash').style.display='none';
	document.getElementById('dashboard_content').style.display='none';
	document.getElementById('recentact').style.display='block';
	document.getElementById('allexpense').style.display='none';
	document.getElementById('bill').style.display='none';
	document.getElementById('addbill_content').style.display='none';
	document.getElementById('settleup').style.display='none';

	recentexpensestable();	
}

var allexpenses = function()
{
	console.log('allexpense');
	document.getElementById('dash').style.display='none';
	document.getElementById('dashboard_content').style.display='none';
	document.getElementById('recentact').style.display='none';
	document.getElementById('allexpense').style.display='block';
	document.getElementById('bill').style.display='none';
	document.getElementById('addbill_content').style.display='none';
	document.getElementById('settleup').style.display='none';

	allexpensestable();
}

/*
var exists = function()
{
	console.log('inside');
	var username = $(this).val();
	var id = $(this).attr('id');
	$.ajax({
		url: 'http://127.0.0.1:5000/user',
		method: 'POST',
		data: {user:username},
		success:function(response)
			{
				if(response=="False")
	    			{document.getElementById(String(id)).style.border = "2px solid green";}
				else
				{
	    				document.getElementById(String(id)).style.border = "2px solid red";
	    				document.getElementById(String(id)).value = null;
				}
			},
		error:function(response)
			{
				console.log('error');
	    			document.getElementById('usernameform').style.border = "2px solid red";
	    			document.getElementById('usernameform').value = null;
			}
		});
*/

var extra = function()
{
	if(document.getElementById('description').value!="")
	{data['description'] = document.getElementById('description').value;}
	
	else
	{$('#description').attr('placeholder','Empty Field Not Allowed');return;}

	
	if(isNaN(document.getElementById('totalamount').value))
	{
		document.getElementById('totalamount').value=null;
		$('#totalamount').attr('placeholder','Re-enter');
		return;
	}
	else if(document.getElementById('totalamount').value!="")
	{data['total_amount'] = document.getElementById('totalamount').value;}
	else
	{$('#totalamount').attr('placeholder','Empty Field Not Allowed');return;}
	document.getElementById('meta_add').style.display = "none";	
	document.getElementById('status').style.display = "block";
	total_amount = data['total_amount'];	
}

var makelist = function()
{
	var i = 0;
	var x = count;
	for(i=1;i<=x;i++)
	{
		if(document.getElementById('username'+String(i)).value==undefined)count--;
		else if(document.getElementById('username'+String(i)).value=="")count--;
	}
	console.log(count);
	for(i=1;i<=count;i++)
	{
		if(document.getElementById('username'+String(i)).value!=undefined)
		list.push(document.getElementById('username'+String(i)).value);
	
		else count--;
	}
//	list.push(/*Enter Username*/);
	list.push(myname);
//	count++;
	count++;	
	console.log(list);
	document.getElementById('adding').style.display = "none";
	document.getElementById('meta_add').style.display = "block";
}

var addmore = function(){
	var check = document.getElementById("username"+String(count));
	console.log(check.value);
	if(check.value=="")
	{
		console.log('1');
		check.value=null;
		$('#username'+String(count)).attr('placeholder','Enter Here First');
		return;
	}
	count++;
	var input = document.createElement('input');
	input.setAttribute('type','text');
	input.setAttribute('id','username'+String(count));
	input.setAttribute('name','username');
	input.setAttribute('class','user');
	input.setAttribute('onblur','duplicate()');
	input.setAttribute('onkeypress','autocom()');
	input.setAttribute('placeholder','Enter Username');
	var div = document.getElementById('addfriend');
	div.appendChild(input);
	var stl = document.getElementById('username'+String(count));
	stl.style.fontSize = '27px';
	var linebreak = document.createElement('br');
	div.appendChild(linebreak);
}

var multiple = function()
{
	you = 0;
	var div = document.getElementById('payeeform');
	if(document.getElementById('itemizedbill').style.display="block")
	{document.getElementById('itemizedbill').style.display="none";}
	div.style.display = "inline"; 
	if(flag==0){
	for(var i = 0 ; i < list.length ; i++)
	{
		var input = document.createElement('input');	
		input.setAttribute('type','text');
		input.setAttribute('id','multiple'+String(i));
		input.setAttribute('placeholder',String(list[i])+"'s Contribution");
		div.appendChild(input);
		var d = document.getElementById('multiple'+String(i));
		d.style.width = '300px';
		d.style.height = '28px';
		d.style.fontSize = '23px';
		d.style.marginBottom = '15px';
		d.style.marginRight = '40px';
	
		var linebreak = document.createElement('br');
		div.appendChild(linebreak);
	}}
	flag=1;
}

var single = function()
{
	you = 1;
	var div = document.getElementById('payeeform');
	div.style.display = "none"; 
}

var equal = function()
{
	var div = document.getElementById('expenseform');
	div.style.display = "none";
} 

var unequal = function()
{
	var div = document.getElementById('expenseform');
	div.style.display = "inline"; 
	$('button').addClass('active');
	$('#equal').removeClass('active');
	document.getElementById('expenseform').style.width="40%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('splitequal').style.display="block";
	document.getElementById('equalbutton').style.marginTop=String(45*count)+'px';
	document.getElementById('equalbutton').style.float="left";
	var totalstr = data['total_amount'];
	console.log(totalstr);
	total = parseFloat(totalstr).toFixed( 2 );
	var equal = total/count;
	divleft = document.getElementById('equaldetailleft');
	divright = document.getElementById('equaldetailright');
	if(flageq==0){
	console.log(count);
	for(i=1;i<=count;i++)	
	{
		var label = document.createElement('label');	
		label.setAttribute('for','username');
		label.setAttribute('id','labelequal'+String(i));
		label.innerHTML = String(list[i-1]);
		divleft.appendChild(label);
		var linebreak = document.createElement('br');
		divleft.appendChild(linebreak);
		var lbl = document.getElementById('labelequal'+String(i));
		lbl.style.fontSize = '27px';
		var input = document.createElement('input');	
		input.setAttribute('type','text');
		input.setAttribute('class','usrequal');
		input.setAttribute('id','userequal'+String(i));
		console.log(equal.toFixed( 2 ))
		input.setAttribute('value',equal.toFixed( 2 ));
		divright.appendChild(input);
		var linebreak = document.createElement('br');
		divright.appendChild(linebreak);
		var update = document.getElementById('userequal'+String(i));
		update.readOnly = true;
		update.style.width = '70px';
		update.style.marginBottom = '15px';
		update.style.marginRight = '40px';
		total=total-equal;
		equal = (total)/(count-i);
	}
	flageq=1;}
	return;
}

var equalform = function()
{
	$('button').addClass('active');
	$('#equal').removeClass('active');
	var totalstr = data['total_amount'];
	total = parseFloat(totalstr).toFixed( 2 );
	var equal = total/count;
	document.getElementById('expenseform').style.width="40%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('splitequal').style.display="block";
	document.getElementById('equalbutton').style.marginTop=String(45*count)+'px';
	document.getElementById('equalbutton').style.float="left";
	divleft = document.getElementById('equaldetailleft');
	divright = document.getElementById('equaldetailright');
	if(flageq==0){
	for(i=1;i<=count;i++)	
	{
		var label = document.createElement('label');	
		label.setAttribute('for','username');
		label.setAttribute('id','labelequal'+String(i));
		label.innerHTML = String(list[i-1]);
		divleft.appendChild(label);

		var linebreak = document.createElement('br');
		divleft.appendChild(linebreak);

		var lbl = document.getElementById('labelequal'+String(i));
		lbl.style.fontSize = '27px';
		
		var input = document.createElement('input');	
		input.setAttribute('type','text');
		input.setAttribute('class','usrequal');
		input.setAttribute('id','userequal'+String(i));
		console.log(equal.toFixed( 2 ))
		input.setAttribute('value',equal.toFixed( 2 ));
		divright.appendChild(input);
	
		var linebreak = document.createElement('br');
		divright.appendChild(linebreak);

		var update = document.getElementById('userequal'+String(i));
		update.readOnly = true;
		update.style.width = '70px';
		update.style.marginBottom = '15px';
		update.style.marginRight = '40px';
		total = total-equal;
		equal = (total)/(count-i);
	}}
	return;
}

var shareform = function()
{
	$('button').addClass('active');
	$('#share').removeClass('active');
	document.getElementById('expenseform').style.width="40%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('splitshare').style.display="block";
	document.getElementById('sharebutton').style.marginTop=String(53*count)+'px';
	divleft = document.getElementById('sharedetailleft');
	divright = document.getElementById('sharedetailright');
	if(flagsh==0){
	for(i=1;i<=count;i++)	
	{
		console.log(list[i-1]);
		var label = document.createElement('label');	
		label.setAttribute('for','username');
		label.setAttribute('id','labelshare'+String(i));
		label.innerHTML = String(list[i-1]);
		divleft.appendChild(label);
		
		var linebreak = document.createElement('br');
		divleft.appendChild(linebreak);
		
		var lbl = document.getElementById('labelshare'+String(i));
		lbl.style.fontSize = '27px';
		
		var input = document.createElement('input');	
		input.setAttribute('type','text');
//		input.setAttribute('onkeyup','checkpercent()');
		input.setAttribute('class','usrshare');
		input.setAttribute('id','usershare'+String(i));
		input.setAttribute('value',0);
		divright.appendChild(input);
		
		var update = document.getElementById('usershare'+String(i));
		update.style.width = '40px';
		update.style.marginBottom = '15px';
		var span = document.createElement('span');	
		span.setAttribute('id','add-on'+String(i));
		span.innerHTML = 'share(s)';
		divright.appendChild(span);
		var y = document.getElementById('add-on'+String(i));
		y.style.fontSize = '22px';
		y.style.marginRight = '20px';

		var linebreak = document.createElement('br');
		divright.appendChild(linebreak);
	}flagsh=1;}
	return;
}

var checkexact = function()
{
	console.log('inside');
	var totalstr = data['total_amount'];
	total = parseFloat(totalstr);
	var subval=0;
	for(i=1;i<=count;i++)
	{
		var inp = document.getElementById('userexact'+String(i));
		if(isNaN(inp.value)){inp.value="";}
		else{
		var val = parseFloat(inp.value);
		if(inp.value=="")val=0.00;
		console.log(val);
		
		if(val>total){inp.value=total;}
		
		if(subval+val>total){inp.value = (total-subval);subval=total;}
		else{subval+=val;}

		var left = document.getElementById('exactowed_remaining');
		left.innerHTML = (total-subval).toFixed( 2 )+' left';}		
	}
	return;
}

var exactform = function()
{
	$('button').addClass('active');
	$('#exact').removeClass('active');
	var totalstr = data['total_amount'];
	total = parseFloat(totalstr);
	document.getElementById('expenseform').style.width="40%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('splitexact').style.display="block";
	divleft = document.getElementById('exactdetailleft');
	divright = document.getElementById('exactdetailright');
	if(flagex==0){
	for(i=1;i<=count;i++)	
	{
		var label = document.createElement('label');	
		label.setAttribute('for','username');
		label.setAttribute('id','labelexact'+String(i));
		label.innerHTML = String(list[i-1]);
		divleft.appendChild(label);
		
		var linebreak = document.createElement('br');
		divleft.appendChild(linebreak);
		
		var lbl = document.getElementById('labelexact'+String(i));
		lbl.style.fontSize = '27px';
		
		var input = document.createElement('input');	
		input.setAttribute('type','text');
		input.setAttribute('onkeyup','checkexact()');
		input.setAttribute('class','usrexact');
		input.setAttribute('id','userexact'+String(i));
		input.setAttribute('value',0.00);
		divright.appendChild(input);
		
		var update = document.getElementById('userexact'+String(i));
		update.style.width = '70px';
		update.style.marginBottom = '15px';
		update.style.marginRight = '40px';
		
		var linebreak = document.createElement('br');
		divright.appendChild(linebreak);
	}
	var x = document.getElementById('exactdetail');
	x.style.marginBottom = String(count*43)+'px';
	var tot = document.getElementById('exactowed_total');
	tot.innerHTML = total.toFixed( 2 );
	var rem = document.getElementById('exactowed_remaining');
	rem.innerHTML = total.toFixed( 2 )+' left';
	flagex=1;
	}
}

var percentform = function()
{
	$('button').addClass('active');
	$('#percentage').removeClass('active');
	document.getElementById('expenseform').style.width="40%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('splitpercent').style.display="block";
	divleft = document.getElementById('percentdetailleft');
	divright = document.getElementById('percentdetailright');
	if(flagpc==0){
	for(i=1;i<=count;i++)	
	{
		var label = document.createElement('label');	
		label.setAttribute('for','username');
		label.setAttribute('id','labelpercent'+String(i));
		label.innerHTML = String(list[i-1]);
		divleft.appendChild(label);
		
		var linebreak = document.createElement('br');
		divleft.appendChild(linebreak);
		
		var lbl = document.getElementById('labelpercent'+String(i));
		lbl.style.fontSize = '26px';

		var input = document.createElement('input');	
		input.setAttribute('type','text');
		input.setAttribute('onkeyup','checkpercent()');
		input.setAttribute('class','usrpercent');
		input.setAttribute('id','userpercent'+String(i));
		input.setAttribute('value',String(0.00));
		divright.appendChild(input);
		
		var update = document.getElementById('userpercent'+String(i));
		update.style.width = '60px';
		update.style.marginBottom = '13px';
		update.style.marginTop = '3px';

		var span = document.createElement('span');
		span.setAttribute('id','add-on'+String(i));
		divright.appendChild(span);
		var y = document.getElementById('add-on'+String(i));
		y.style.marginRight = '40px';
		y.innerHTML = '%';
	
		var linebreak = document.createElement('br');
		divright.appendChild(linebreak);
	}
	var x = document.getElementById('percentdetail');
	x.style.marginBottom = String(count*50)+'px';
	var tot = document.getElementById('percentowed_total');
	tot.innerHTML = 100.00+'%';
	var rem = document.getElementById('percentowed_remaining');
	rem.innerHTML = 100.00+'% left';
	flagpc=1;
	}
}

var checkpercent = function()
{
	var total = 100;
	var subval = 0;

	for(i=1;i<=count;i++)
	{
		var inp = document.getElementById('userpercent'+String(i));
		if(isNaN(inp.value)){inp.value="";}
		else{
		var val = parseFloat(inp.value);
		if(inp.value=="")val=0.00;
		console.log(val);
		
		if(val>total){inp.value=total;}
		
		if(subval+val>total){inp.value = total-subval;subval=total;}
		else{subval+=val;}

		var left = document.getElementById('percentowed_remaining');
		left.innerHTML = (total-subval).toFixed( 2 )+'% left';}		
	}
}

var itemizedbill = function()
{
	$('button').addClass('active');
	$('#itemize').removeClass('active');
	document.getElementById('expenseform').style.width="94%";
	document.getElementById('splitequal').style.display="none";
	document.getElementById('splitexact').style.display="none";
	document.getElementById('splitpercent').style.display="none";
	document.getElementById('splitshare').style.display="none";
	document.getElementById('itemizedbill').style.display="none";
	document.getElementById('payeeform').style.display="none";
	document.getElementById('itemizedbill').style.display="block";
	var hd = document.getElementById('tablehead');
	var bdy = document.getElementById('tablebody');
	if(flagit==0){
	var row = document.createElement('tr');
	var desc = document.createElement('td');
	desc.setAttribute('style','text-align:center;width:80px');
	desc.innerHTML = "Item";
	row.appendChild(desc);
	var amt = document.createElement('td');
	amt.setAttribute('style','text-align:center;width:60px');
	amt.innerHTML = "Amount";
	row.appendChild(amt);
	for(i=1;i<=count;i++)
	{
		var name = document.createElement('td');
		name.setAttribute('style','text-align:center;width:60px');
		name.innerHTML = String(list[i-1]);
		row.appendChild(name);
	}
	var name = document.createElement('td');
	name.setAttribute('style','text-align:center;width:60px');
	name.innerHTML = "Left";
	row.appendChild(name);
	hd.appendChild(row);
	
	var row = document.createElement('tr');
	var des = document.createElement('td');
	var inp = document.createElement('input');
	inp.setAttribute('type','text');
	inp.setAttribute('style','text-align:center;width:80px');
	inp.setAttribute('onblur','addanother()');
	inp.setAttribute('placeholder','Description');
	des.appendChild(inp);
	row.appendChild(des);
	var amo = document.createElement('td');
	var am = document.createElement('input');
	am.setAttribute('type','text');
	am.setAttribute('style','text-align:center;width:60px');
	am.setAttribute('onkeyup','checkNum()');
	am.setAttribute('placeholder','0.00');
	amo.appendChild(am);
	row.appendChild(amo);
	for(i=1;i<=count;i++)
	{
		var value = document.createElement('td');
		var vam = document.createElement('input');
		vam.setAttribute('type','text');
		vam.setAttribute('onkeyup','checkleft()');
		vam.setAttribute('style','text-align:center;width:60px');
		vam.setAttribute('placeholder','0.00');
		value.appendChild(vam);
		row.appendChild(value);
	}	
	var value = document.createElement('td');
	var vam = document.createElement('input');
	vam.setAttribute('type','text');
	vam.setAttribute('readonly','true');
	vam.setAttribute('style','text-align:center;width:60px');
	vam.setAttribute('placeholder','0.00');
	value.appendChild(vam);
	row.appendChild(value);
	bdy.appendChild(row);

	var extra = document.getElementById('tableleft');
	var eta = document.getElementById('extratable');
	eta.style.marginTop = "20px";
	var row = document.createElement('tr');
	var tax = document.createElement('td');
	tax.innerHTML = "  Tax  ";
	row.appendChild(tax);
	var txval = document.createElement('td');
	var txvalue = document.createElement('input');
	txvalue.setAttribute('type','text');
	txvalue.setAttribute('placeholder','6.5 (In percentage)');
	txvalue.setAttribute('id','taxvalue');
	txvalue.setAttribute('onkeyup','tax()');
	txvalue.setAttribute('style','text-align:center;width:150px');
	txval.appendChild(txvalue);
	row.appendChild(txval);
	extra.appendChild(row);
	
	var newrow = document.createElement('tr');
	var tip = document.createElement('td');
	tip.innerHTML = "  Tip  ";
	newrow.appendChild(tip);
	
	var tpval = document.createElement('td');
	var tpvalue = document.createElement('input');
	tpvalue.setAttribute('type','text');
	tpvalue.setAttribute('placeholder','100Rs. (In numeric)');
	tpvalue.setAttribute('id','tipvalue');
	tpvalue.setAttribute('style','text-align:center;width:150px');
	tpval.appendChild(tpvalue);
	newrow.appendChild(tpval);
	extra.appendChild(newrow);
	
	var anorow = document.createElement('tr');
	var left = document.createElement('td');
	left.innerHTML = "Amount Left";
	anorow.appendChild(left);
	var grandleft = document.createElement('td');
	var glvalue = document.createElement('input');
	glvalue.setAttribute('type','text');
	glvalue.setAttribute('id','glvalue');
	glvalue.setAttribute('readonly','true');
	glvalue.setAttribute('style','text-align:center;width:150px');
	glvalue.setAttribute('placeholder',String(data['total_amount']));
	grandleft.appendChild(glvalue);
	anorow.appendChild(grandleft);
	extra.appendChild(anorow);
	flagit=1;
	}
}

var tax = function()
{
	var tx = document.getElementById('taxvalue');
	if(tx.value=="")tx.value="0";
	tx.value = tx.value.split('%')[0];
	if(parseFloat(tx.value)>100)
	{
		tx.value = 100;
	}
	total_amount = ((100*parseFloat(data['total_amount']))/(100+parseFloat(tx.value)));
	console.log(total_amount);
	total_amount = total_amount.toFixed( 2 );
	checkNum();
}

var addanother = function()
{
	var bdy = document.getElementById('tablebody');
	var row = document.createElement('tr');
	var des = document.createElement('td');
	var inp = document.createElement('input');
	inp.setAttribute('type','text');
	inp.setAttribute('style','text-align:center;width:80px');
	inp.setAttribute('onblur','addanother()');
	inp.setAttribute('placeholder','Description');
	des.appendChild(inp);
	row.appendChild(des);
	var amo = document.createElement('td');
	var am = document.createElement('input');
	am.setAttribute('type','text');
	am.setAttribute('onkeyup','checkNum()');
	am.setAttribute('style','text-align:center;width:60px');
	am.setAttribute('placeholder','0.00');
	amo.appendChild(am);
	row.appendChild(amo);
	for(i=1;i<=count;i++)
	{
		var value = document.createElement('td');
		var vam = document.createElement('input');
		vam.setAttribute('type','text');
		vam.setAttribute('onkeyup','checkleft()');
		vam.setAttribute('style','text-align:center;width:60px');
		vam.setAttribute('placeholder','0.00');
		value.appendChild(vam);
		row.appendChild(value);
	}	
	var value = document.createElement('td');
	var vam = document.createElement('input');
	vam.setAttribute('type','text');
	vam.setAttribute('readonly','true');
	vam.setAttribute('style','text-align:center;width:60px');
	vam.setAttribute('placeholder','0.00');
	value.appendChild(vam);
	row.appendChild(value);
	bdy.appendChild(row);
}

var checkNum = function()
{
	var x = document.getElementById('tablebody');
	for(i=0;i<x.childNodes.length;i++)
	{
		if((isNaN(x.childNodes[i].childNodes[1].childNodes[0].value))||x.childNodes[i].childNodes[1].childNodes[0].value==undefined||x.childNodes[i].childNodes[1].childNodes[0].value=="")
			x.childNodes[i].childNodes[1].childNodes[0].value=0.00;
	
			x.childNodes[i].childNodes[2+count].childNodes[0].value=parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value);
	}

	var y = document.getElementById('glvalue');
	var tempsum=0;
	
	for(i=0;i<x.childNodes.length;i++)
	{
		console.log('here');
		if(tempsum+parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value)>total_amount)
		{
			console.log("glvalue");
			console.log(parseFloat(total_amount)-tempsum);
			x.childNodes[i].childNodes[1].childNodes[0].value = parseFloat((parseFloat(total_amount)-tempsum).toFixed( 2 ));
			console.log(x.childNodes[i].childNodes[1].childNodes[0].value);
		}
		
		tempsum += parseFloat((parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value)).toFixed( 2 ));
		console.log(tempsum);	
		y.value = parseFloat((parseFloat(total_amount)-tempsum).toFixed( 2 ));
	}
	
	for(i=0;i<x.childNodes.length;i++)
	{
		if((isNaN(x.childNodes[i].childNodes[1].childNodes[0].value))||x.childNodes[i].childNodes[1].childNodes[0].value==undefined||x.childNodes[i].childNodes[1].childNodes[0].value=="")
			x.childNodes[i].childNodes[1].childNodes[0].value=0.00;
	
			x.childNodes[i].childNodes[2+count].childNodes[0].value=parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value);
	}
}

var checkleft = function()
{	
	var x = document.getElementById('tablebody');
	checkNum();
	for(i=0;i<x.childNodes.length;i++)
	{
		var amt = parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value);
		var sum = 0.00;
		for(j=2;j<count+2;j++)
		{
			if((isNaN(x.childNodes[i].childNodes[j].childNodes[0].value))||x.childNodes[i].childNodes[j].childNodes[0].value==""||(x.childNodes[i].childNodes[j].childNodes[0].value)==undefined)
				x.childNodes[i].childNodes[j].childNodes[0].value=0.00;
			
			if(sum+parseFloat(x.childNodes[i].childNodes[j].childNodes[0].value)>amt) x.childNodes[i].childNodes[j].childNodes[0].value=parseFloat(amt-sum);

			sum+=parseFloat(x.childNodes[i].childNodes[j].childNodes[0].value);
		}
		x.childNodes[i].childNodes[j].childNodes[0].value=parseFloat(amt-sum);
	}
}
