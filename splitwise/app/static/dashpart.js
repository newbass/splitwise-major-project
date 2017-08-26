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
				console.log('hola');
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
	document.getElementById('bill').style.display='block';
}
