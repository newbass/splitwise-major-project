('#createbutton').on('click',function(){
var firstname = $('#formfirst').value;
var lastname = $('#formlast').value;
var phone = $('#phoneform').value;
var email = $('#emailform').value;
var username = $('#usernameform').value;
var password = $('#passwordform').value;
var country = $('#countryform');
var counval = country.options[country.selectedIndex].text;
var date = $('#dateform');
var dateval = date.options[date.selectedIndex].text;
var month = $('#monthform');
var monthval = month.options[month.selectedIndex].text;
var year = $('#yearform');
var yearval = year.options[year.selectedIndex].text;
var gender = $("input:radio[name=gender]:checked").val();
var suc = document.getElementById('success');
var fai = document.getElementById('failure');
	$.ajax({
		url:"127.0.0.1:5000/addUser",
		method:"POST",
		data:{first_name:firstname,last_name:lastname,username:username,password:password,gender:gender,country:counval,mobile:phone,email:email,date:dateval,month:monthval,year:yearval},
		success:function(response)
		{
			suc.style.display="block";
			setTimeout(function(){suc.style.display="none";},5000);
		},
		error:function(response)
		{
			fai.style.display="block";
			setTimeout(function(){fai.style.display="none";},5000);
		},
});});

$('#loginbutton').on('click',function(){
var email = $('#email').val();
var pass = $('#pass').val();
	$.ajax({
		url:"http://127.0.0.1:5000/login",
		method:"POST",
		data:{email:email,password:pass},
		success:function(response){return response.text;},
		error:function(response){return response.text;},
});});
