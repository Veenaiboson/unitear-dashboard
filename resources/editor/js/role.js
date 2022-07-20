



var datas = {
    
	profile: {
		user_version:2
	},
	no_of_notification_records:0,
	new_project_modal:false,
	selected_scans_option:"Image-based AR",
	chart_loaded:false,
	read_entire_status:false,
	read_count:0,
	notification:[],
	target_category_id:1,
	package_error_modal:false,
	mobile_menu:false,

	team_home:false,
    invite_people:false,
    team_members:false,
    member_delete:false,
	storage_limit:false,
	rollTab:true,
	create_roll:false,
	member_remove:false,
	invitation_sent:false,
	invite_cancel:false,
	Edit_roll:false,
	member_list:[],
	selected_member:{},
	role_list:[],
	selected_role:{},
	selected_role_index:0,
	edit_role_button_loader:false,
    remove_member_button_loader:false,
    role_index:1,
    permissions:{},
    send_permissions:{},
    primary_permissions:JSON.parse('[{"name":"Account Management","value":true},{"name":"Manage Team Members","value":true},{"name":"Manage image-tracking AR editor & dashboard","value":true},{"name":"Manage ground-tracking AR editor & dashboard","value":true},{"name":"Manage App Creator","value":true}]'),
    create_role_remissions:{},
    role_name:"",
    create_role_name:"",
    role_name_error:"",
    create_role_button_loader:false,
    remove_role_button_loader:false,
	role_id:1,
	campaign_category:5,

	//code added by Vishnu M R
	switch_team_name:"",
	switch_team_id:0,
	switch_team_list:[],
	remove_role_error:"",
	user_as_team_member_status:false,
	//code added by Vishnu M R

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
				this.create_role_remissions=this.primary_permissions;
				this.list_roles();
				this.check_team_exists();

				if (localStorage.selected_team_id) {
					this.switch_team_id = JSON.parse(localStorage.selected_team_id);
					this.switch_team_name=JSON.parse(localStorage.selected_team_name);
				}
			},	
	components: {
        'vueSlider': window['vue-slider-component'],

    },		
  methods :
  
  
			{
				change_project_category()
				{
					localStorage.campaign_category=datas.campaign_category;
					location.href=base_url+"editor";
				},
				list_roles()
				{
					list_roles();
				},
				update_roles()
				{
                    datas.send_permissions=datas.permissions;
                    datas.create_role_name=datas.selected_role.role_name;
                    datas.role_id=datas.selected_role.role_id;
                    insert_roles();
				},
				check_role_name()
				{
					field_type_validation("role_name",datas.role_name);
				},
                insert_roles()
				{
					if(datas.role_name=="")
					{
						datas.role_name_error="Please enter the role name.";
						datas.create_role_button_loader=false;
						return;
					}
					field_type_validation("role_name",datas.role_name);
					if(datas.role_name_error!="")
					{
						return;
					}
                    datas.send_permissions=datas.primary_permissions;
                    datas.create_role_name=datas.role_name;
                    datas.role_id="";
                   
					insert_roles();
					list_roles();
					datas.selected_role_index=datas.role_list.length;
					

					
				},
				create_roll_permissions()
				{
					datas.primary_permissions=JSON.parse('[{"name":"Account Management","value":true},{"name":"Manage Team Members","value":true},{"name":"Manage image-tracking AR editor & dashboard","value":true},{"name":"Manage ground-tracking AR editor & dashboard","value":true},{"name":"Manage App Creator","value":true}]');
					datas.create_roll=true;
				},
				remove_role()
				{
					datas.remove_role_button_loader=true;
					datas.role_id=datas.selected_role.role_id;
					// console.log(datas.role_id);
					

					$.ajax({
						url: base_urls_8085+"roles/is-role-used",
						type: "POST",
						headers: {
							'Content-Type': 'application/json',
							'Authorization': localStorage.getItem('token')
						},
						data: JSON.stringify({role_id:datas.role_id}),
						success: function(data, status) {  
							var resp_data=data;
							if(resp_data.status)
							{
								datas.role_id=datas.selected_role.role_id;
								datas.selected_role_index=0;
								// datas.selected_role_index<0?datas.selected_role_index=0:null;
								remove_role();
								list_roles();
								datas.remove_role_button_loader=false;
								datas.member_delete=false;
							}
							else
							{
								datas.remove_role_button_loader=false;
								datas.member_delete=false;
								app.$snotify.error(resp_data.message);
							}
							},
						error:function(data, status) {  
							   console.log(data)     
						},
							})
				},
				select_role(role,index)
				{
					// alert(index);
					datas.selected_role_index=index;
					datas.selected_role=role;
					
					datas.permissions=JSON.parse(datas.selected_role.permissions);
					list_roles();
				},

				//code added by Vishnu M R-2021-07-08
				change_team:function()
				{
			        
					$.ajax({
						url: base_urls_8087+"team/change-team/"+datas.switch_team_id,
						type: "PUT",
						headers: {
							'Authorization': localStorage.getItem('token')
						},
						data: {},
						success: function(data, status) {  
							var resp_data=JSON.parse(data);
							if(resp_data.status)
							{
								datas.switch_team_name=resp_data.team_name;
								// app.$snotify.success(resp_data.message);
								localStorage.selected_team_id=JSON.stringify(datas.switch_team_id);
								localStorage.selected_team_name=JSON.stringify(datas.switch_team_name);
								location.reload();
							}
							else
							{
								app.$snotify.error(resp_data.message);
							}
							},
						error:function(data, status) {  
							   console.log(data)     
						},
							})
				},
				check_team_exists:function()
				{
                    $.post(base_url+"unitear_team/check_team_exists",
					{
						team_header:1,
					},
					function(data,status){
						resp_data=JSON.parse(data);
						datas.switch_team_list=resp_data.data;
						datas.user_as_team_member_status=resp_data.user_as_team_member_status;
						if(datas.switch_team_list && !datas.switch_team_id)
						{
							datas.switch_team_name=datas.switch_team_list[0].team_name;
							datas.switch_team_id=datas.switch_team_list[0].id;
							localStorage.selected_team_id=JSON.stringify(datas.switch_team_id);
							localStorage.selected_team_name=JSON.stringify(datas.switch_team_name);
						}
						else if(datas.switch_team_list && datas.switch_team_id)
						{
							current_team_exists=false;
							datas.switch_team_list.forEach(function(item) {
								if(item.id == datas.switch_team_id)
								{
									current_team_exists=true;
								}
							})
							
							if(!current_team_exists)
							{
								datas.switch_team_id=datas.switch_team_list[0].id;
								app.change_team();
							}
						}
					});
				},
				//code added by Vishnu M R-2021-07-08

			
			} ,
  	
		});
/******************* remove_member*********************/ 

function remove_member()
  {
	datas.remove_member_button_loader=true;

	$.ajax({
		url: base_urls_8086+"members/"+datas.selected_member.member_id,
		type: "DELETE",
		headers: {
			'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			datas.remove_member_button_loader=false;

			var resp_data=data;
			if(resp_data.status)
			{
				list_members();
			}
			else
			{
				
			}
			datas.member_remove = false;
			},
		error:function(data, status) {  
			   console.log(data)     
		},
			})
  }
/*******************remove_member*********************/ 

/*******************List roles*********************/ 

function list_roles()
  {

	$.ajax({
		url: base_urls_8085+"roles/",
		type: "GET",
		headers: {
			'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data=data;
		if(resp_data.status)
		{
			
			datas.role_list=resp_data.data;
			// alert(datas.selected_role_index);
            datas.selected_role=resp_data.data[datas.selected_role_index];
			console.log(datas.selected_role);
            datas.permissions=JSON.parse(datas.selected_role.permissions);
			
		}
		else
		{
			datas.role_list=[];
		}
			},
		error:function(data, status) {  
			   console.log(data)     
		},
			});
  }
/*******************List roles*********************/ 


/******************* insert_roles*********************/ 

function insert_roles()
  {
	datas.create_role_button_loader=true;
	console.log(datas.send_permissions);
	
	$.ajax({
		url: base_urls_8085+"roles/",
		type: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		data: JSON.stringify({
			role_name:datas.create_role_name,
			permissions:JSON.stringify(datas.send_permissions),
			role_id:datas.role_id,
		}),
		success: function(data, status) {  
			var resp_data=data;
			if(resp_data.status)
			{
				
				// datas.create_roll=false;

			}
			else
			{
				app.$snotify.error(resp_data.message);
			}
			list_roles();
			datas.create_role_button_loader=false;
			datas.role_name="";
			datas.create_roll=false;
			},
		error:function(data, status) {  
			   console.log(data)     
		},
			});
  }
/******************* insert_roles*********************/ 



/******************* insert_roles*********************/ 

function remove_role()
  {
	  datas.remove_role_button_loader=true;

	$.ajax({
		url: base_urls_8085+"roles/"+datas.role_id,
		type: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		data:{},
		success: function(data, status) {  
			var resp_data=data;
			if(resp_data.status)
			{
				list_roles();
			}
			else
			{
				app.$snotify.error(resp_data.message);
			}
			datas.remove_role_button_loader=false;
			datas.member_delete=false;
			},
		error:function(data, status) {  
			   console.log(data)     
		},
			})
  }
/******************* insert_roles*********************/
  function close_all()
  {
	datas.team_home=false;
    datas.invite_people=false;
    datas.team_members=false;
  }


  function validate_user_name(field_name,field_value)
  {
	 field_length_validation(field_name,field_value);
	 
	 if(datas.user_name_error=="")
	 {
	   field_type_validation(field_name,field_value);
	 }
  }
 
  function field_length_validation(field_name,field_value)
  {
				 switch(field_name)
					 {
						 case "role_name"	:
									 {
											 if(field_value.length<3)
											 {
												 datas.role_name_error="Sorry, the name should have at least 3 alphabets";
												 $("#user_name").addClass('error-input');
											 }
											 else if(field_value.length>30)
											 {
												 datas.role_name_error="Sorry, name only allows maximum 30 alphabets";
												 $("#user_name").addClass('error-input');
											 }
											 else
											 {
												 datas.role_name_error="";
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
  /***********************Common validation functions ************************************/
  function field_type_validation(field_name,field_value)
  {
				 switch(field_name)
					 {
						 case "role_name"	:
									 {
								 
 
											 var patt = RegExp(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/);
											 
											 if(patt.test(field_value))
											 {
												 datas.role_name_error="";
												 $("#user_name").removeClass('error-input');
												 
											 }
											 else
											 {
												 datas.role_name_error="Sorry, the name should contain only letters";
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
  function logout() {
    localStorage.removeItem('token');
	window.location.href = "login.html";
}