$(document).ready(function(){
 
 
});
var base_url="https://www.unitear.com/";
var datas = {
    contact_success_modal:false,
	name:"",
	email:"",
	requirement:"Product Demo Request",
	description:"",
  }


app = new Vue({
  el: '#app',
  data:datas,
  computed:{
			},
  methods:
		{
			contact_send:function()
			{
				
				
				if(datas.name=="")
				{
					this.$refs.name_error.innerHTML="Enter your name";
					return;
				}
				else{
					this.$refs.name_error.innerHTML="";
				}
				if(!validate_name(datas.name))
				{
					// console.log(validate_name(datas.name));
					this.$refs.name_error.innerHTML="Name only contains alphabets and space";
					return;
				}
				else{
					this.$refs.name_error.innerHTML="";
				}
				if(datas.email=="")
				{
					this.$refs.email_error.innerHTML="Enter your email";
					return;
				}
				else{
					this.$refs.email_error.innerHTML="";
				}
				if(!validate_email(datas.email))
				{
					// console.log(validate_email(datas.email));
					this.$refs.email_error.innerHTML="Invalid Email";
					return;
				}
				else{
					this.$refs.email_error.innerHTML="";
				}
				if(datas.description=="")
				{
					this.$refs.description_error.innerHTML="Message field is required";
					return;
				}
				else{
					this.$refs.description_error.innerHTML="";
				}	
				$(".progress-btn").addClass("active");
				$.post(base_url+"send-contact-data",
					{
						name:datas.name,
						email:datas.email,
						requirement:datas.requirement,
						description:datas.description,
					},
						function(data,status){
						 var resp_data=JSON.parse(data);
						 if(resp_data.status)
							 {
								clear_fields();
								 $(".progress-btn").removeClass("active");
								 datas.contact_success_modal=true;
							 }
							 
						});
			},
				
		},
  components: {
  
  },	
})

function clear_fields()
{
	datas.name=datas.email=datas.description="";
	
}
function validate_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 
function validate_name(name) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(String(name).toLowerCase());
}


 
