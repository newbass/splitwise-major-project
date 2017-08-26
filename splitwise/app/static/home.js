$(document).ready(function()
{
	setTimeout
		(function(){
		console.log('hello');
		window.location = "http://127.0.0.1:5000/home";
//		$.get("/home",function(response){document.write(response);});
//		$.ajax({
//			url: '127.0.0.1:5000/homepage',
//			method: 'GET',
//			data: {},
//			success:function(response){document.write(response);}
//			});
	},7000);
});
