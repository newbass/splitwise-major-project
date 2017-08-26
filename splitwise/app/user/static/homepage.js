	setTimeout
		(function(){
			document.getElementById("despair").style.visibility="hidden";
			$("#sideleft").css("background-image","url('/static/styles/bluelogo.jpg')");
			document.getElementById("sideleft").style.backgroundSize = "100%";
			document.getElementById("sideleft").style.backgroundRepeat = "no-repeat";
			document.getElementById("sideleft").style.backgroundColor = "white";
//			document.getElementsByTagName("body").style.backgroundColor = "white";
	},19000);

function isNum(str) {
        return /^[0-9]+$/.test(str);
}

var colorChange = function()
{
	var phone = document.getElementById('phoneform').value;
	
	if(!isNum(document.getElementById('phoneform').value))
    	{
	    if(phone.length==0)return;
	    document.getElementById('phoneform').style.border = "2px solid red";
	    document.getElementById('phoneform').value = null;
    	}
	else
	{
	    document.getElementById('phoneform').style.border = "2px solid green";
	}
}

var splitEmail = function()
{
	var email = document.getElementById('emailform').value;
	var domain = email.split('@');
	if(domain.length==2 && domain[1].split('.').length>=2)
	{
	    document.getElementById('emailform').style.border = "2px solid green";
	}
	else
	{
	    document.getElementById('emailform').style.border = "2px solid red";
	    document.getElementById('emailform').value = null;
	}
	return;
}

var checkAvail = function()
{
	var username = document.getElementById('usernameform').value;
	$.ajax({
		url: '127.0.0.1:5000/user',
		method: 'GET',
		data: {user:username},
		success:function(response)
			{
				if(response=="true")
	    			{document.getElementById('usernameform').style.border = "2px solid green";}
				else
				{
	    				document.getElementById('usernameform').style.border = "2px solid red";
	    				document.getElementById('usernameform').value = null;
				}
			},
		});
}

var checkLength = function()
{
	var password = document.getElementById('passwordform').value;
	if(password.length<=8)
	{
	    	document.getElementById('passwordform').style.border = "2px solid red";
	    	document.getElementById('passwordform').value = null;
	    	$('#passwordform').attr("placeholder","Use More Characters");
	}
	else
	{
	    	document.getElementById('passwordform').style.border = "2px solid green";
	}

}
