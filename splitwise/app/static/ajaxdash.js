var expendstring = "";
var contristring = "";
var stateoftran = 0;
var listforitem = [];

var youequaldata = function()
{
	var expend = parseFloat(data['total_amount'])/count;
	for(i=0;i<list.length;i++)
	{
		expendstring = expendstring + String(list[i]) + ":" + String(expend) + ",";
	}
	contristring += String(myname) + ":" + String(data['total_amount']) + ",";
	for(i=0;i<list.length-1;i++)
	{
		contristring += String(list[i]) + ":" + "0" + ",";
	}
	console.log(expendstring);
	console.log(contristring);
	stateoftran = 1;
	finaldest();
}

var youmeme = function()
{
	for(i=0;i<list.length-1;i++)
	{
		contristring += String(list[i]) + ":" + "0" + ",";
	}
	contristring += String(myname) + ":" + String(data['total_amount']) + ",";
	return;
}

var finaldest = function()
{
	$.ajax({
		url:'http://127.0.0.1:5000/split',
		method:'POST',
		data:{contributors:contristring,expenditors:expendstring,description:data['description'],state:stateoftran,bill_amount:data['total_amount']},
		success:function(response){passto();dashload();},
	});
}

var checkmul = function()
{
	var partsum = 0;
	for(i=1;i<=count;i++)
	{
		var mul = document.getElementById('multiple'+String(i-1));
		if(mul.value==""||mul.value==null||mul.value==undefined)
		{
			document.getElementById('payeeform').style.display = "block";
			document.getElementById('errorinpayee').style.display = "block";
			setTimeout(
				function()
				{
					document.getElementById('errorinpayee').style.display = "none";
				},5000);
			return 1;
		}
		var value = parseFloat(mul.value);
		console.log("value: "+value);
		partsum += value;
		console.log("part: "+partsum);
	}
	if(partsum!=data['total_amount'])
	{
		document.getElementById('payeeform').style.display = "block";
		document.getElementById('errorinpayee').style.display = "block";
		setTimeout(
			function()
			{
				document.getElementById('errorinpayee').style.display = "none";
			},5000);
		return 1;
	}
	return 0;
}

var submitequal = function()
{
	stateoftran=1;
	for(i=1;i<=count;i++)
	{
		var iden = document.getElementById('userequal'+String(i));
		expendstring = expendstring + String(list[i-1]) + ":" + String(iden.value) + ",";	
	}
	if(you==1){youmeme();}
	
	else
	{
		if(checkmul())
		{
			expendstring="";
			contristring="";
			stateoftran=0;
			return;
		}
		for(i=1;i<=count;i++)
		{
			var mul = document.getElementById('multiple'+String(i-1));
			console.log(mul);
			console.log(mul.value);
			contristring = contristring + String(list[i-1]) + ":" + String(mul.value) + ",";
		}
	}
	console.log(expendstring);
	console.log(contristring);
	finaldest();
}

var cacheexact = function()
{
	var rem = document.getElementById('exactowed_remaining');
	if(rem.innerText=='0.00 left')return 0;
	else
	{
		document.getElementById('exacterror').style.display="block";
		setTimeout(
				function()
				{
					document.getElementById('exacterror').style.display="none";
				},3000
		)
	}	
	return 1;

}

var submitexact = function()
{
	stateoftran = 1;
	if(cacheexact())return;

	for(i=1;i<=count;i++)
	{
		var iden = document.getElementById('userexact'+String(i));
		expendstring = expendstring + String(list[i-1]) + ":" + String(iden.value) + ",";	
	}
	if(you==1){youmeme();}

	else
	{
		if(checkmul())
		{
			expendstring="";
			contristring="";
			stateoftran = 0;
			return;
		}
		for(i=1;i<=count;i++)
		{
			var mul = document.getElementById('multiple'+String(i-1));
			console.log(mul);
			console.log(mul.value);
			contristring = contristring + String(list[i-1]) + ":" + String(mul.value) + ",";
		}
	}
	console.log(expendstring);
	console.log(contristring);
	finaldest();
}

var cachepercent = function()
{
	var rem = document.getElementById('percentowed_remaining');
	if(rem.innerText=='0.00% left')return 0;
	else{
		document.getElementById('percenterror').style.display="block";
		setTimeout(
				function()
				{
					document.getElementById('percenterror').style.display="none";
				},3000
		)

	}
	return 1;	
}

var submitpercent = function()
{
	stateoftran = 2;
	if(cachepercent())return;
	for(i=1;i<=count;i++)
	{
		var iden = document.getElementById('userpercent'+String(i));
		expendstring = expendstring + String(list[i-1]) + ":" + String(iden.value) + ",";	
	}
	if(you==1){youmeme();}

	else
	{
		if(checkmul())
		{
			expendstring="";
			contristring="";
			stateoftran = 0;
			return;
		}
		for(i=1;i<=count;i++)
		{
			var mul = document.getElementById('multiple'+String(i-1));
			console.log(mul);
			console.log(mul.value);
			contristring = contristring + String(list[i-1]) + ":" + String(mul.value) + ",";
		}
	}
	console.log(expendstring);
	console.log(contristring);
	finaldest();
}

var submitshare = function()
{
	stateoftran = 3;
	for(i=1;i<=count;i++)
	{
		var iden = document.getElementById('usershare'+String(i));
		expendstring = expendstring + String(list[i-1]) + ":" + String(iden.value) + ",";	
	}
	if(you==1){youmeme();}

	else
	{
		if(checkmul())
		{
			expendstring="";
			contristring="";
			stateoftran = 0;
			return;
		}
		for(i=1;i<=count;i++)
		{
			var mul = document.getElementById('multiple'+String(i-1));
			console.log(mul);
			console.log(mul.value);
			contristring = contristring + String(list[i-1]) + ":" + String(mul.value) + ",";
		}
	}
	console.log(expendstring);
	console.log(contristring);
	finaldest();
}

var checkitem = function()
{
	if((document.getElementById('glvalue')).value==""||parseFloat((document.getElementById('glvalue')).value)>0)return 0;
	var x = document.getElementById('tablebody');
	for(i=0;i<x.childElementCount;i++)
	{
		if(x.childNodes[i].childNodes[0].childNodes[0].value=="" && x.childNodes[i].childNodes[1].childNodes[0].value!="" && parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value)!=0){console.log("0error");return 0;}
		
		if(parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value)==0 && x.childNodes[i].childNodes[0].childNodes[0].value!=""){console.log("1error");return 0;}
		
		if(x.childNodes[i].childNodes[2+count].childNodes[0].value!="" && parseFloat(x.childNodes[i].childNodes[2+count].childNodes[0].value)!=0){console.log(i+"2error");return 0;}
	}
	return 1;
}

var checkmulitem = function(includingtip)
{
        var partsum = 0;
        for(i=1;i<=count;i++)
        {
                var mul = document.getElementById('multiple'+String(i-1));
                if(mul.value==""||mul.value==null||mul.value==undefined)
                {
                        document.getElementById('payeeform').style.display = "block";
                        document.getElementById('errorinpayee').style.display = "block";
                        setTimeout(
                                function()
                                {
                                        document.getElementById('errorinpayee').style.display = "none";
                                },5000);
                        return 1;
                }
                var value = parseFloat(mul.value);
                console.log("value: "+value);
                partsum += value;
                console.log("part: "+partsum);
        }
        if(partsum!=includingtip)
        {
                document.getElementById('payeeform').style.display = "block";
                document.getElementById('errorinpayee').style.display = "block";
                setTimeout(
                        function()
                        {
                                document.getElementById('errorinpayee').style.display = "none";
                        },5000);
                return 1;
        }
        return 0;
}


var submititem = function()
{
	if(checkitem()==0)
	{
		document.getElementById('erroritem').style.display = "block";
		setTimeout(function(){document.getElementById('erroritem').style.display = "none";},5000);		
		return;
	}

	else
	{
		tiplist=[];

		for(j=0;j<count;j++)listforitem[j]=0;
		for(j=0;j<count;j++)tiplist[j]=0;

		var x = document.getElementById('tablebody');
		for(i=0;i<x.childElementCount;i++)
		{
			console.log(i);
			if(x.childNodes[i].childNodes[0].childNodes[0].value=="" && (parseFloat(x.childNodes[i].childNodes[1].childNodes[0].value)==0||x.childNodes[i].childNodes[1].childNodes[0].value==""))continue;
			for(j=0;j<count;j++)
			{
				listforitem[j]+=parseFloat(x.childNodes[i].childNodes[2+j].childNodes[0].value);
			}
		}
		if(document.getElementById('tipvalue').value!=""){
		for(j=0;j<count;j++){
			tiplist[j]=((listforitem[j]*document.getElementById('tipvalue').value)/total_amount);
		}}	

	
		if(document.getElementById('taxvalue').value!=""){
		for(j=0;j<count;j++)
		{
			listforitem[j]=listforitem[j]+((document.getElementById('taxvalue').value*listforitem[j])/100);
		}}
		if(document.getElementById('tipvalue').value!=""){
		for(j=0;j<count;j++)
		{
			listforitem[j]=listforitem[j]+tiplist[j];
		}}	
	}

	var includingtip = parseFloat(document.getElementById('tipvalue').value)+parseFloat(data['total_amount']);	
	stateoftran=1;

	if(you==1)
	{
		for(i=0;i<list.length-1;i++)
		{
			contristring += String(list[i]) + ":" + "0" + ",";
		}
		contristring += String(myname) + ":" + String(includingtip) + ",";
	}
	else
	{
		if(checkmulitem(includingtip)){contristring="";expendstring="";stateoftran=0;return;}
		
	
		for(i=1;i<=count;i++)
                {
                        var mul = document.getElementById('multiple'+String(i-1));
                        console.log(mul);
                        console.log(mul.value);
                        contristring = contristring + String(list[i-1]) + ":" + String(mul.value) + ",";
                }
	}
	
	for(i=0;i<count;i++)
		expendstring = expendstring + String(list[i]) + ":" + String(listforitem[i]) + ",";	
	
	console.log(expendstring);
	console.log(contristring);
	finaldest();
}
