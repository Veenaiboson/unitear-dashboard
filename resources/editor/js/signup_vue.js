$(document).ready(function(){
  
  
  
  var base_url="http://34.219.108.8/";
  
  
 
 
});


// var base_url="https://www.unitear.com/";
  var base_url="http://34.219.108.8/";
var datas = {
    user_name: "",
	user_email: "",
	user_password: "",
	user_name_error: "",
	user_email_error: "",
	user_password_error: "",
	validation_status_flag:true,
	password_field_type:"password",
	submit_button_click:false,
	password_show:false,
	f_button_click:false,
	g_button_click:false,
	captcha_validation_status:"false",
	captchavalue: ""
  }

app = new Vue({
  el: '#app',
  data:datas,
  computed:
			{
			},
	mounted:function(){
				// console.log("mounted");
				
			},
	created:function(){
				// console.log("created");
				
			},
watch: 
			{
				user_name: function () {
				  this.form_validation('user_name',datas.user_name)
				},
				user_email: function () {
				  this.form_validation('user_email',datas.user_email)
				}
				,
				user_password: function () {
				  this.form_validation('user_password',datas.user_password)
				}
			},			
  methods :
  
			{
				change_password_field_type()
				{
					if(datas.password_field_type=='password')
					{
						datas.password_field_type='text';
						$(".password").css("color", "black")
					}
					else{
						datas.password_field_type='password';
						$(".password").css("color", "#E8E8E8")
					}
				},
				signUp(){
					// alert("hi")
					console.log(localStorage.getItem('captcha'))
					var data = {user_name: datas.user_name,
						user_email: datas.user_email,
						user_password: datas.user_password,
						captcha:localStorage.getItem('captcha')}
						const form = new FormData()
						for (const key in data) {
							form.append(key, data[key]);
						}
						const headers = {
          
							'Authorization': localStorage.getItem('token')
							// 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdiIsInVzZXJfZW1haWwiOiJwYXJ2YXRoeXZAaWJvc29uaW5ub3YuY29tIiwidXNlcl9pbWFnZSI6IiIsInVzZXJfY291bnRyeSI6IkluZGlhIiwiY3JlYXRlX2RhdGUiOiIyMDIzLTAyLTA2IDEzOjU0OjI1IiwiZXhwaXJ5X2RhdGUiOiIyMDIzLTAyLTExIDEzOjU0OjMwIiwiaWF0IjoxNjc1NjkxNjcwfQ.xCHBGXojY4avNmMWgnoY5P5bYwDrzd4pWcganxtvphE'
					  
						  }
					  
						  axios( base_urls_8083+"user/register", {
							method: 'POST',
							headers: headers,
							data: form
							
					  
						}).then(function (data) {
							var resp_data = JSON.parse(data);
							console.log(resp_data);
						}).catch(function (err) {
						})
					
				},
				signUpGoogle(){
					var data = {client_id: '694411712911-474ph2p0gmcnq10o700dj5k5kj3ilblc.apps.googleusercontent.com',
						token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdnNkZmYiLCJ1c2VyX2VtYWlsIjoicGFydmF0aHl2QGlib3Nvbmlubm92LmNvbSIsInVzZXJfaW1hZ2UiOiIiLCJ1c2VyX2NvdW50cnkiOiJJbmRpYSIsImNyZWF0ZV9kYXRlIjoiMjAyMy0wMi0xMCAxMTowNDo1NCIsImV4cGlyeV9kYXRlIjoiMjAyMy0wMi0xNSAxMTowNDo1NSIsImlhdCI6MTY3NjAyNzA5NX0.eNYM1JKt-mQ_AVJ9ByHoFyyHDwl9Uoh41kdPYVWHhOc'}
						const form = new FormData()
						for (const key in data) {
							form.append(key, data[key]);
						}
						
					  
						  axios( base_urls_8083+"user/sign-in-google", {
							method: 'POST',
						
							data: form
							
					  
						}).then(function (data) {
							var resp_data = JSON.parse(data);
							console.log(resp_data);
						}).catch(function (err) {
						})
					
					
				},
				form_validation:function(field_name,field_value)
				{
					switch(field_name)
					{
						case "user_name"	:
									{
											
											validate_user_name(field_name,field_value);break;
									}
						case "user_email":
									{
											
											datas.user_email=field_value.toLowerCase();
											validate_user_email(field_name,field_value);break;
									}
						case "user_password":
									{
										
											validate_user_password(field_name,field_value);break;
									}			
					}
				},
				form_submit(e)
				{
					
					// if(datas.captcha_validation_status=="false")
					// {
					// 	console.log("Invalid captcha");
					// 	e.preventDefault();
					// 	return false;
					// }
					
					if(datas.user_name=="")
					{
						datas.user_name_error="Please enter your name";
						datas.validation_status_flag=false;
						$("#user_name").addClass('error-input');
					}
					if(datas.user_email=="")
					{
						datas.user_email_error="Please enter your email address";
						datas.validation_status_flag=false;
						$("#user_email").addClass('error-input');
					}
					if(datas.user_password=="")
					{
						datas.user_password_error="Please enter the password";
						datas.validation_status_flag=false;
						$("#user_password").addClass('error-input');
					}	
					if(complete_validation())
					{
						$("#user_name").removeClass('error-input');
						$("#user_password").removeClass('error-input');
						$("#user_email").removeClass('error-input');
						datas.submit_button_click=datas.validation_status_flag=true;
					}
					else{
						datas.submit_button_click=datas.validation_status_flag=false;
						
					}
					if(datas.validation_status_flag)
					{
						
						return true;
					}
					else{
						e.preventDefault();
						return false;
					}
					
				}
   		
			},
  	
})

 /***********************Validate Name************************************/
 
 function complete_validation()
 {
	 if(datas.user_name_error=="" && datas.user_email_error=="" && datas.user_password_error=="")
	 {
		 return true;
	 }
	 else{
		 return false;
	 }
 }
 
 function validate_user_name(field_name,field_value)
 {
	field_length_validation(field_name,field_value);
	
	if(datas.user_name_error=="")
	{
	  field_type_validation(field_name,field_value);
	}
 }
/***********************Validate Name************************************/

/***********************Validate email************************************/
 function validate_user_email(field_name,field_value)
 {
	 field_type_validation(field_name,field_value);
 }
/***********************Validate email************************************/
/***********************Validate password************************************/
 function validate_user_password(field_name,field_value)
 {
	 field_length_validation(field_name,field_value);
	
	if(datas.user_password_error=="")
	{
	  field_type_validation(field_name,field_value);
	}
 }
/***********************Validate password************************************/
 
 
 /***********************Common validation functions ************************************/
 function field_type_validation(field_name,field_value)
 {
				switch(field_name)
					{
						case "user_name"	:
									{
								

											var patt = RegExp(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/);
											
											if(patt.test(field_value))
											{
												datas.user_name_error="";
												$("#user_name").removeClass('error-input');
												
											}
											else
											{
												datas.user_name_error="Sorry, the name should contain only letters";
												$("#user_name").addClass('error-input');
											}
											break;
											
									}
						case "user_email":
									{
										
											var patt = RegExp(/\S+@\S+\.\S+/);
											
											if(patt.test(field_value))
											{
												datas.user_email_error="";
												$("#user_email").removeClass('error-input');
											}
											else
											{
												datas.user_email_error="Please enter a valid email address";
												$("#user_email").addClass('error-input');
											}
											break;
										break;
									}
						
					}			
 }
 
 function field_length_validation(field_name,field_value)
 {
				switch(field_name)
					{
						case "user_name"	:
									{
											if(field_value.length<3)
											{
												datas.user_name_error="Sorry, the name should have at least 3 alphabets";
												$("#user_name").addClass('error-input');
											}
											else if(field_value.length>30)
											{
												datas.user_name_error="Sorry, name only allows maximum 30 alphabets";
												$("#user_name").addClass('error-input');
											}
											else
											{
												datas.user_name_error="";
												$("#user_name").removeClass('error-input');
											}
											break;
											
									}
						
						case "user_password":
									{
											if(field_value.length<6)
											{
												datas.user_password_error="Your password must have at least 6 characters";
												$("#user_password").addClass('error-input');
											}
											else if(field_value.length>30)
											{
												datas.user_password_error="Password should not exceed 30 alphabets";
												$("#user_password").addClass('error-input');
											}
											else
											{
												datas.user_password_error="";
												$("#user_password").removeClass('error-input');
											}
											break;
									}	
					}			
 } 
 
// **********Captcha verified**********//
function captcha_validation()
{
	datas.captcha_validation_status="true";
	//alert("jijo");
	
}
function expired_captche()
{
	datas.captcha_validation_status="false";
	//alert("expired");
}
/***********************Common validation functions ************************************/
 
var loadCaptcha = function(){
	console.log("captcha")
	grecaptcha.render('copec__captcha',         {
		'sitekey' : '6LejGt0UAAAAAIRszCKDvzQQAAV780-7gCSAS7Nl'
	});
}
