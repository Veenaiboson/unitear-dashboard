$(document).ready(function(){
  
  
	var base_url=base_url;
	var base_urls_8084=base_urls_8084;
	var base_urls_8095=base_urls_8095;
	var base_urls_8087=base_urls_8087;
	var base_urls_8088=base_urls_8088;
	$(".add_campaign").click(function(){
	 // add_campaign().then(function(){list_campaign();list_favorite_campaign();});
	  add_campaign();
	});
	
   
   
  });
  
  
  
  var datas = {
	  profile: [],
	  files:[],
	  target_files:[],
	  account_settings:{},
	  upload_url:base_urls_8084+"profile/profile-pic-upload",
	  old_password:"",
	  new_password:"",
	  confirm_password:"",
	  reset_password_message:"",
	  profile_message:"",
	  profile_pic_message:"",
	  current_campaign_id:"",
	  current_campaign_name :"",
	  campaign_first_name:"",
	  show_target_upload_modal:false,
	  show_delete_target_modal:false,
	  show_target_upload_modal_class:"my-modal-display-hide",
	  show_delete_target_modal_class:"my-modal-display-hide",
	  delete_file:null,
	  campaign_msg_status:true,
	  notification:[],
	  notification_read_status:false,
	  no_of_notification_records:0,
	  read_entire_status:false,
	  trial_expired:false,
	  trial_modal:true,
	  show_expiry_modal_class:"my-modal-display-hide",
	  newProject: false,
	  add_more_view_modal: false,
	  add_more_scan_count: 5000,
	  updateName: false,
	  profileSettings: false,
	  profileCategory: 'business',
	  settings: false,
	  delete1: true,
	  cancel_subscription_modal:false,
	   user_profile_settings:{"user_settings":{"business_industry":"","website":""},"category_id":"1","category_name":"business"},
	  //user_profile_settings:{},
	  user_profile_settings_status:false,
	  //profile onbord datas
	  profile_setting_category:"business",
	  profile_setting_category_id:1,
	  profile_setting_category_template:{},
	  profile_category_business:{
						  business_industry :"",  
						  //company_name :"",
						  website :"",
						  },
	  profile_category_education:{
						  profession:"",
						  institution_type :"",  
						  //institution_name :"",
						  //institution_location :"",
						  website :"",
						  },
	  profile_category_individual:{
						  profession:"",
						  industry :"",  
						  //reason :"",
						  },	
	  user_name_error	:"",
	  read_count:0,
	  package_error_modal:false,	
	  
	  //code added by Vishnu M R
	  reason_for_cancellation:"",
	  reason_for_cancellation_error:"",
	  subscription_cancel_mail_success_modal:false,
	  subscription_cancel_mail_message:"",
	  profile_purpose_account_page:"",
	  profile_purpose_account_page_error:"",
	  profile_category_account_page:"",
	  profile_category_account_page_error:"",
	  profile_demo_status_account_page:"",
	  profile_demo_status_account_page_error:"",
	  profile_company_name_account_page:"",
	  profile_company_name_account_page_error:"",
	  profile_website_account_page:"",
	  profile_website_account_page_error:"",
	  show_loader:false,
	  profile_customer_industry_account_page:"",
	  profile_customer_industry_account_page_error:"",
	  profile_customer_industry_account_page_div:false,
	  profile_update_status:"",
	  profile_company_size_account_page:"",
	  profile_company_size_account_page_error:"",
	  //code added by Vishnu M R

	  //emmanual added for account
	  mobile_menu: false,
	  tracking_data:1,
	  profile_sec:1,
	  coins_value:false,

	  //emmanual added for account
	  suc_ref:false,
	  refferal_emails:[],
		selected_refferal_email:[],
	  whole_refferal_error_status:false,
	  refferal_email_message:"",	
	  //jijo added 09-11-2020
	  promo_codes:[],
	  code_to_copy:"",
	  redeem_button_status:false,
	  points:'0',
	  campaign_category:3,
	  invite_button_loader:false,
	  photo_remove_button_loader:false,
	  photo_upload_button_loader:false,

	  //code added by Vishnu M R
	  switch_team_name:"",
	  switch_team_id:0,
	  switch_team_list:[],
	  user_as_team_member_status:false,
	  //code added by Vishnu M R
	  is_ultimate_package:""

	}
  Vue.component('file-upload', VueUploadComponent)
  app = new Vue({
	el: '#app',
	data:datas,
	computed:
			  {
				  
			  },
	  mounted:function(){
		if (localStorage.is_ultimate_package) {
            datas.is_ultimate_package = JSON.parse(localStorage.is_ultimate_package);
			console.log(datas.is_ultimate_package)
        }
				  // console.log("mounted");
				  
				  //code added by Vishnu M R
				  this.initialize_value();
				  //code added by Vishnu M R
			  },
	  created:function(){
				  // console.log("created");
				  this.add_refferal_email_template();
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
				remove_profile_pic()
				{
					remove_profile_pic();
				},
				change_project_category()
				{
					
					
					localStorage.campaign_category=datas.campaign_category;
					location.href=base_url+"editor.html";
				},		
		redeem_points(points)
		{
			redeem_points(points)
		},
		copy_code(code)
		{
			
			datas.code_to_copy=code;
			var input = document.getElementById("camp");
			input.setAttribute('type', 'text');
			
			input.value=datas.code_to_copy;
			input.select();
			input.setSelectionRange(0, 99999)
			document.execCommand("copy");
			app.$snotify.success('Copied Redeem Code');
			input.setAttribute('type', 'hidden');
			
		},
					//25-08-2020- adding refferals
		form_submit(e)
			{	// console.log("entered")
				app.check_emails();
				insert_refferal_email(e);
			},	
		check_emails()
		{
			var temp=datas.selected_refferal_email;
			for (i=0; i < datas.refferal_emails.length; i++)
			{
				datas.selected_refferal_email=datas.refferal_emails[i];
				validate_user_email();
				if(datas.refferal_emails[i].error!="")
				{

					datas.whole_refferal_error_status=true;break;
				}
				else
				{
					datas.whole_refferal_error_status=false;	
				}
				// console.log(datas.refferal_emails[i]);
			}
			datas.selected_refferal_email=temp;
		},
		add_refferal_email_template()
		  {
			 // console.log("new input added");
			var  single_reffreral_email={id:datas.refferal_emails.length,email:"",error:"Enter email address"};
			  datas.refferal_emails.push(single_reffreral_email);
		  },
		remove_refferal_email_template(index)
		  {
			  // console.log(" input"+index+" deleted");
			
			  datas.refferal_emails.splice(index,1);
		  },
		  form_validation:function(refferal_email)
		  {
			app.check_emails()
			//console.log(refferal_email);  
			datas.selected_refferal_email=refferal_email;
			validate_user_email();
									
			  
		  },



				  check_app_factory_access()
			  {
				  check_app_factory_status();
			  },	
			  //profile settings
			  pay_razor()
			  {
				  razor_payment();
			  },
			  validate_scancount()
			  {
				  //alert("keyup")
				  
				  // alert(datas.add_more_scan_count)
				  if(datas.add_more_scan_count>10000){
					  datas.add_more_scan_count=10000;
				  }
					  $("#more_view_button").attr("disabled", false);
			  },
			  validate_scancount_keydown()
			  {
				  //alert("key down")
				  $("#more_view_button").attr("disabled", true);
				  
			  },
			  select_category()
				  {
					  switch(datas.profile_setting_category)
					  {
						  case "business":
									  {
										  datas.profile_setting_category_id=1;
										  datas.profile_setting_category_template=datas.profile_category_business;
													  
										  break;
									  }
						  case "education":
									  {
										  datas.profile_setting_category_id=2;
										  datas.profile_setting_category_template=datas.profile_category_education;
													  
										  break;
									  }
						  case "individual":
									  {
										  datas.profile_setting_category_id=3;
										  datas.profile_setting_category_template=datas.profile_category_individual;
													  
										  break;
									  }
					  }
				  },
			  save_profile_settings()
				  {
					  app.select_category();
					  $.post(base_url+"editor/save_profile_settings",
							  {
								  profile_setting_category:datas.profile_setting_category,
								  profile_setting_category_id:datas.profile_setting_category_id,
								  profile_setting_category_template:datas.profile_setting_category_template
							  },
							  function(data,status){
							   var resp_data=JSON.parse(data);
								  if(resp_data.status)
								  {
									  
									  get_user_profile_settings();
									  datas.profileSettings=false;
								  }
								  else
								  {
									  
								  }
							  });
				  },	
				  
				  
			  //profile settings
				  
				  removeFileupload:function(file) {
				  
		 this.$refs.upload2.remove(file);
			  if(datas.target_files.length<=0)
			  {
				  $(".next-target").addClass("my-disabled-button");
				  $(".next-target").attr("disabled", true);
			  }
			  else
			  {
				  $(".next-target").removeClass("my-disabled-button");
				  $(".next-target").attr("disabled", false);
			  }	
			},
			view_campaign:function(campaign_name)
				  {
					  if(datas.trial_expired)
					  {
						  datas.trial_modal=true;
						  datas.show_expiry_modal_class='my-modal-display-show';
						  // $(".expiray_modal").show();
						  return;
					  }
					  else{

							$.ajax({
							url: base_urls_8088+"campaign/view-new-campaign",
							type: "POST",
							headers: {
								'Content-Type': 'application/json',
								'Authorization': localStorage.getItem('token')
							},
							data: JSON.stringify({
								campaign_id:datas.current_campaign_id,
								campaign_name:datas.current_campaign_name,
							}),
							success: function(data, status) {  
								var resp_data=JSON.parse(data);
								if(resp_data.status)
								{
									location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor/";
								}
								},
							error:function(data, status) {  
									console.log(data)     
							},
								})			  
					  }
				  },
  removeFile:function(target_id,file){
		
		datas.delete_file=file;
	   datas.delete_target_id=target_id;
	   datas.show_delete_target_modal_class="my-modal-display-show";
	   datas.show_delete_target_modal=true;
	},
	delete_target:function()
							  {
								  $(".loader-img").show();
								  $(".nonloader-img").hide();
								  scan_target_id=datas.delete_target_id;
								   if(scan_target_id=="" || scan_target_id==null||scan_target_id==0)
								   {
									   return;
								   }
									
									  $.ajax({
										url: base_urls_8097+"artarget/"+scan_target_id,
										type: "DELETE",
										headers: {
											'Authorization': localStorage.getItem('token')
										},
										data: {},
										success: function(data, status) {  
											$(".loader-img").hide();
											$(".nonloader-img").show();
											var resp_data=JSON.parse(data);
											if(resp_data.status)
												{
													datas.show_delete_target_modal_class="my-modal-display-hide";
													datas.show_delete_target_modal=false;
													
													app.removeFileupload(datas.delete_file);
													list_campaign();
													list_favorite_campaign();
													
													
												}
											},
										error:function(data, status) {  
													
										},
											})
							  },
				  openFile:function()
				  {
					  
					  this.$refs.upload.$children[0].$el.click()
				  },
				  opentargetFile:function()
				  {
					  
					  this.$refs.upload2.$children[0].$el.click()
				  },
				 
				  inputFile(newFile, oldFile) {
					  // this.$refs.upload.active = true
					  
					 console.log(datas.files)
					  console.log(oldFile)

					
  
						if (newFile && oldFile) 
						{
						  // Update file
						  console.log(newFile)
  
						  // Start upload
						  datas.photo_upload_button_loader=true;
						  if (newFile.active !== oldFile.active) {
							console.log('Start upload', newFile.active, newFile)
  
									  // min size
									  // console.log("FILE SIZE",newFile.size)
							// if (newFile.size >= 0 && newFile.size < 20*1024) {
							//   //newFile = this.$refs.upload.update(newFile, {error: 'size'})
									  // }
									  if(newFile.size > 2*1024*1024)
									  {
  
										  newFile = this.$refs.upload.update(newFile, {error: 'Image size should be below 2MB'})
										  datas.profile_pic_message="Image size should be below 2MB";
										  
									  }
									  if(!newFile.active)
									  {
										console.log("not active")
										if(!newFile.active && newFile.error!="")
										{
											app.$snotify.error(newFile.error);
										}
									  }
									
									
  
						  }
						  if(datas.files[0].size > 2*1024*1024)
						  {

							  newFile = this.$refs.upload.update(datas.files[0], {error: 'Image size should be below 2MB'})
							  datas.profile_pic_message="Image size should be below 2MB";
							  
						  }
						  // Upload progress
						//   if (newFile.progress !== oldFile.progress) {
						// 	// console.log('progress', newFile.progress, newFile)
						//   }
  
						//   // Upload error
						//   if (newFile.error !== oldFile.error) {
						// 	// console.log('error', newFile.error, newFile)
							
						//   }
  
						//   // Uploaded successfully
						//   if (newFile.success !== oldFile.success) {
						// 	  response=JSON.parse(newFile.response);
						// 	  if(response.status)
						// 	  {
						// 		datas.profile.user_image=datas.files[0].blob;
						// 		app.$snotify.success(response.message);
						// 	  }
						// 	  else
						// 	  {
						// 		  app.$snotify.error(response.message);
						// 	  }
						// 		datas.profile_pic_message=response.message;
								
							  
						// 	  /*
						// 			  // console.log('success', newFile.success, newFile)
						// 			  var data=JSON.parse(newFile.response);
						// 			  newFile.weakImage=!data.status;//image weak for augmenting or not
						// 			  if(data.status)
						// 			  {
						// 			  //	newFile.weakImage=true;
									  
  
									  
						// 			  }else{
  
						// 				  newFile = this.$refs.upload.update(newFile, {error: 'Image is too weak to augment'})//update error message shpw over image
						// 			  }
						// 				  */
						// 				 datas.photo_upload_button_loader=false;
						//   }
						}
  
  
		// Automatic upload
		const headers = {
    
			'Authorization': localStorage.getItem('token')
			// 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdiIsInVzZXJfZW1haWwiOiJwYXJ2YXRoeXZAaWJvc29uaW5ub3YuY29tIiwidXNlcl9pbWFnZSI6IiIsInVzZXJfY291bnRyeSI6IkluZGlhIiwiY3JlYXRlX2RhdGUiOiIyMDIzLTAyLTA2IDEzOjU0OjI1IiwiZXhwaXJ5X2RhdGUiOiIyMDIzLTAyLTExIDEzOjU0OjMwIiwiaWF0IjoxNjc1NjkxNjcwfQ.xCHBGXojY4avNmMWgnoY5P5bYwDrzd4pWcganxtvphE'
		
		  } 
		   let formdata = new FormData();  
		  //  console.log(f.files[0])
		  //       formdata.append("file", f.files[0]);
			  formdata.append("file",datas.files[0].file);
		  // console.log(formdata)
		
		 
		  return $.ajax({
			
			
			url: base_urls_8090+"profile/profile-pic-upload",
			type: 'put',
			headers: headers,
			data: formdata,
			processData: false,
			contentType: false,
			success: function(data, status) {  
				let resp_data=JSON.parse(data)
				datas.profile.user_image=datas.files[0].blob;
				app.$snotify.success(resp_data.message);
				datas.profile_pic_message=resp_data.message;
				datas.photo_upload_button_loader=false;

				
			},
			error: function(err, status) {  
				let resp_error=JSON.parse(data)

				app.$snotify.error(resp_error.message);
				datas.profile_pic_message=resp_error.message;
				datas.photo_upload_button_loader=false;

				
			}

		  })
	  },
	
		  
		   inputFilter: function (newFile, oldFile, prevent) {
		  
		  
					  if (newFile && !oldFile) {
							  // Add file
  
							  // Filter non-image file
							  // Will not be added to files
							  if (!/\.(jpeg|jpe|jpg|png)$/i.test(newFile.name)) {
								  datas.profile_pic_message="Invalid file format";
								 // console.log("Inavlid file format")
								  app.$snotify.error('Inavlid file format.');
								  return prevent()
							  }
  
							  // Create the 'blob' field for thumbnail preview
							  newFile.blob = ''
							  let URL = window.URL || window.webkitURL
							  if (URL && URL.createObjectURL) {
								  newFile.blob = URL.createObjectURL(newFile.file)
									  //newFile.active=true
							  }
						  }
		  
	},
	/******************************target file upload********/
	inputFile2(newFile, oldFile) {
		if (newFile && !oldFile) {
				  // Add file
				   // this.$store.state.showTargetImageUploader=true;//show target upload modal
  
				   newFile.weakImage=false;
		}
  
		if (newFile && oldFile) {
		  // Update file
  newFile.data.campaign_id=datas.current_campaign_id;
		  // Start upload
		  if (newFile.active !== oldFile.active) {
			// console.log('Start upload', newFile.active, newFile)
			  $(".next-target").addClass("my-disabled-button");
			  $(".next-target").attr("disabled", true);
					  // min size
					 // console.log("FILE SIZE",newFile.size)
			// if (newFile.size >= 0 && newFile.size < 20*1024) {
			//   //newFile = this.$refs.upload.update(newFile, {error: 'size'})
					  // }
					  if(newFile.size > 2*1024*1024)
					  {
  
						  newFile = this.$refs.upload2.update(newFile, {error: 'Image size should be below 2MB'})
  
					  }
  
  
		  }
  
		  // Upload progress
		  if (newFile.progress !== oldFile.progress) {
			// console.log('progress', newFile.progress, newFile)
		  }
  
		  // Upload error
		  if (newFile.error !== oldFile.error) {
			// console.log('error', newFile.error, newFile)
		  }
  
		  // Uploaded successfully
		  if (newFile.success !== oldFile.success) {
					  // console.log('success', newFile.success, newFile)
					  var data=JSON.parse(newFile.response);
					  // console.log(data);
					  newFile.weakImage=!data.status;//image weak for augmenting or not
					  // $(".next-target").removeClass("my-disabled-button");
					  // $(".next-target").attr("disabled", false);
					  app.check_campaign_name();
					  if(data.status)
					  {
					  //	newFile.weakImage=true;
					  $(".next-target").removeClass("my-disabled-button");
					  $(".next-target").attr("disabled", false);
					  datas.current_campaign_id=data.data.campaign_id;
  
					  var object		   =Object.assign({},JSON.parse(JSON.stringify(this.$store.state.arBundleStructure)));
					  object.target.id =data.scan_target_id;//from database row id
				  
					  object.target.url=newFile.blob;
					  object.state.gizmo=null;
					  object.state.scene=null;
  
  
					
					  this.$store.state.arBundle.push(object);//added target image to list
					  
					  
					  }else{
						  if(datas.target_files.length==1)
								  {
									  $(".next-target").addClass("my-disabled-button");
									  $(".next-target").attr("disabled", true);
								  }
								  else
								  {
									  $(".next-target").removeClass("my-disabled-button");
									  $(".next-target").attr("disabled", false);
								  }	
  
						  newFile = this.$refs.upload2.update(newFile, {error: data.message})//update error message shpw over image
					  }
						  
  
		  }
		}
  
		if (!newFile && oldFile) {
		  // Remove file
  
		  // Automatically delete files on the server
		  if (oldFile.success && oldFile.response.id) {
			// $.ajax({
			//   type: 'DELETE',
			//   url: '/file/delete?id=' + oldFile.response.id,
			// });
		  }
		}
  
		// Automatic upload
		if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
		  if (!this.$refs.upload2.active) {
			this.$refs.upload2.active = true
		  }
		}
	  }
		  
		  
		  , inputFilter2: function (newFile, oldFile, prevent) {
		  
		  
					  if (newFile && !oldFile) {
							  // Add file
  
							  // Filter non-image file
							  // Will not be added to files
							  if (!/\.(jpeg|jpg|png)$/i.test(newFile.name)) {
								  return prevent()
							  }
  
							  // Create the 'blob' field for thumbnail preview
							  newFile.blob = ''
							  let URL = window.URL || window.webkitURL
							  if (URL && URL.createObjectURL) {
								  newFile.blob = URL.createObjectURL(newFile.file)
								  //	newFile.active=true
							  }
						  }
		  
	},
	
   change_campaign_name:function()
					  {
						  if(datas.campaign_first_name==datas.current_campaign_name)
						  {
							  $(".next-target").addClass("my-disabled-button");
							  $(".next-target").attr("disabled", true);
							  datas.current_campaign_name="";
							  datas.campaign_msg_status=true;
						  }
						  else{
							  datas.campaign_msg_status=false;
						  }
						  // datas.campaign_msg_status=false;
						  if(datas.current_campaign_name=="")
						  {
							  datas.campaign_msg_status=true;
						  }
					  },
				  
				  check_campaign_name:function()
					  {
						  if(datas.current_campaign_name!="")
						  {
							  if(datas.current_campaign_id!=0)
							  {
							  $(".next-target").removeClass("my-disabled-button");
							  $(".next-target").attr("disabled", false);
							  }
							  datas.campaign_msg_status=false;
						  }
						  else{
							  datas.campaign_msg_status=true;
							  $(".next-target").addClass("my-disabled-button");
							  $(".next-target").attr("disabled", true);
						  }
					  },
	
	/******************************target file upload********/
	update_profile:function()
	{
	   
	// 	$.post(base_url+"profile/update_profile",
	//   {
	// 	  "user_name":datas.profile.user_name,
	// 	  "user_phone":datas.profile.user_phone,
	//   },
	//   function(data,status){
	//    var resp_data=JSON.parse(data);
	// 	  if(resp_data.status)
	// 	  {
			  
	// 		  datas.profile=resp_data.data;
	// 		  datas.profile_message=resp_data.message;
	// 	  }
	// 	  else
	// 	  {
	// 		  datas.profile_message=resp_data.message;
	// 	  }
	//   });
	    $.ajax({
		url: base_urls_8090+"profile/",
		type: "POST",
		headers: {
		  'Authorization':localStorage.getItem('token')
		},
		data: {
			"user_name":datas.profile.user_name,
			"user_phone":datas.profile.user_phone,
		},
		success: function(data, status) {  
			var resp_data=JSON.parse(data);
		  if(resp_data.status)
		  {
			  
			  datas.profile=resp_data.data;
			  datas.profile_message=resp_data.message;
		  }
		  else
		  {
			  datas.profile_message=resp_data.message;
		  }
		},
		error:function(data, status) {  
		  
		},
	})
	} ,
	change_settings:function()
	{
		var data = {monthly_bill:datas.account_settings.monthly_bill?1:0,
		news_letter:datas.account_settings.news_letter?1:0,
		notification:datas.account_settings.notification?1:0,
		save_popup:datas.account_settings.save_popup?1:0,}
		const form = new FormData()
		for (const key in data) {
			form.append(key, data[key]);
		}
		const headers = {
	
		 'Authorization': localStorage.getItem('token')
		//  'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdiIsInVzZXJfZW1haWwiOiJwYXJ2YXRoeXZAaWJvc29uaW5ub3YuY29tIiwidXNlcl9pbWFnZSI6IiIsInVzZXJfY291bnRyeSI6IkluZGlhIiwiY3JlYXRlX2RhdGUiOiIyMDIzLTAyLTA2IDEzOjU0OjI1IiwiZXhwaXJ5X2RhdGUiOiIyMDIzLTAyLTExIDEzOjU0OjMwIiwiaWF0IjoxNjc1NjkxNjcwfQ.xCHBGXojY4avNmMWgnoY5P5bYwDrzd4pWcganxtvphE'
	
	   }
	
	   axios(base_urls_8094+"account/update-account-settings", {
		 method: 'PUT',
		 headers: headers,
		 data: form
		 
	
	 }).then(function (data) {
		var resp_data=data;
		console.log(resp_data);
		if(resp_data.status)
		{	
			console.log(resp_data.data.message);
			datas.profile_message=resp_data.data.message;
			console.log(datas.profile_message);
		}
		else
		{
			datas.profile_message=resp_data.data.message;
		}
	 }).catch(function (err) {

	})
	  
	},
	
	reset_password:function()
	{
	   
	   if(datas.old_password==""||datas.new_password==""||datas.confirm_password=="")
	   {
		//    console.log("Please fill all fields");
		   datas.reset_password_message="Please fill all fields";
		   return;
	   }
	   if(datas.new_password.length<6)
	   {
		//    console.log("Your password must have at least 6 characters.");
		   datas.reset_password_message="Your password must have at least 6 characters.";
		   return;
	   }
		$.post(base_url+"profile/reset_password",
	  {
		  "old_password":datas.old_password,
		  "new_password":datas.new_password,
		  "confirm_password":datas.confirm_password,
	  },
	  function(data,status){
	   var resp_data=JSON.parse(data);
		  if(resp_data.status)
		  {
			  
			   datas.reset_password_message=resp_data.message;
		  }
		  else
		  {
			   datas.reset_password_message=resp_data.message;
		  }
	  });
	} ,
	
	delete_notification:function(id)
				  {

						$.ajax({
									url: base_urls_8095+"notification/"+id,
									type: "DELETE",
									headers: {
										'Authorization': localStorage.getItem('token')
									},
									data: {},
									success: function(data, status) {  
										var resp_data = data;
										if (resp_data.status) {
											list_notification();
										}
										},
									error:function(data, status) {  
											console.log(data)     
									},
						})
				  },
				  change_notification_read_status:function()
				  {
					  
		  
						  if (datas.notification_read_status) {
							  
							  $(".text").toggleClass("show");
							  
							  $(".close").toggleClass("mm");
							  
							  setTimeout(function() {
								  
								  $(".notification").toggleClass("open");
							  }, 50)

							  $.ajax({
								url: base_urls_8095+"notification/change-notification-read-status",
								type: "POST",
								headers: {
									'Authorization': localStorage.getItem('token')
								},
								data: {},
								success: function(data, status) {  
									var resp_data = data;
									if(resp_data.status)
										{
										   list_notification();
										}
										
								},
								error:function(data, status) {  
									console.log(data)     
								},
						})    
							 
							  datas.notification_read_status=false;
						  } else {
							  
							  $(".notification").toggleClass("open");
							  
							  $(".close").toggleClass("mm");
							  
							  datas.notification_read_status=true;
							  
							  setTimeout(function() {
								  // image.classList.toggle('show');
								  // text.classList.toggle('show');
								  $(".text").toggleClass("show");
							  }, 150)
							  
						  }
					  
					  
					  }
	
	,
				  start_campaign:function()
				  {
					  if(datas.trial_expired)
					  {
						  datas.trial_modal=true;
						  datas.show_expiry_modal_class='my-modal-display-show';
						  // $(".expiray_modal").show();
						  return;
					  }
					  $(".next-target").addClass("my-disabled-button");
					  $(".next-target").attr("disabled", true);
					  
					  datas.show_target_upload_modal=true;
					  datas.show_target_upload_modal_class='my-modal-display-show';
					  
					  
					  datas.campaign_msg_status=true;
					  datas.current_campaign_id=0;
					  datas.current_campaign_name='Unititled';
					  datas.campaign_first_name='Unititled';
					  $('#myModal').modal('show');
				  },
					update_profile_name:function(update_server_status)
					{
						//check username length
						if(update_server_status)
						{
							datas.profile.update_user_name=datas.profile.update_user_name.trim();
						}
						if(datas.profile.update_user_name=="")
						{
							datas.user_name_error="Please enter your name.";
							$("#user_name").addClass('error-input');
							return;
						}
						else
						{
							datas.user_name_error="";
							$("#user_name").removeClass('error-input');  
						}
						
						if(datas.profile.update_user_name.length<3)
						{
						  datas.user_name_error="Sorry, the name should have at least 3 alphabets.";
						  $("#user_name").addClass('error-input');
						  return;
						}
						else{
						  datas.user_name_error="";
						  $("#user_name").removeClass('error-input');
						}
  
						var patt = RegExp(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/);
											  
						if(patt.test(datas.profile.update_user_name))
						{
							datas.user_name_error="";
							$("#user_name").removeClass('error-input');
						}
						else
						{
							datas.user_name_error="Sorry, the name should contain only letters.";
							$("#user_name").addClass('error-input');
							return;
						}
  
						if(!update_server_status)
						{
							return true;
						}
						
						// $.post(base_url+"profile/update_profile",
						// {
						// 	"user_name":datas.profile.update_user_name,  
						// },
						// function(data,status){
						// 	var resp_data=JSON.parse(data);
						// 	if(resp_data.status)
						// 	{
						// 		$(".message-text").show();
						// 		$(".profile-message").html("Profile updated");
						// 		datas.profile=resp_data.data;
						// 		datas.profile_message=resp_data.message;
						// 		//hide modal
						// 		datas.updateName=false;
						// 		// get_profile();   
						// 	}
						// 	else
						// 	{
						// 		datas.profile_message=resp_data.message;
						// 		datas.updateName=false; 
						// 	}
						// });
						var data = {user_name:datas.profile.update_user_name}
						const form = new FormData()
						for (const key in data) {
							form.append(key, data[key]);
						}
						const headers = {
          
							'Authorization': localStorage.getItem('token')
							// 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdiIsInVzZXJfZW1haWwiOiJwYXJ2YXRoeXZAaWJvc29uaW5ub3YuY29tIiwidXNlcl9pbWFnZSI6IiIsInVzZXJfY291bnRyeSI6IkluZGlhIiwiY3JlYXRlX2RhdGUiOiIyMDIzLTAyLTA2IDEzOjU0OjI1IiwiZXhwaXJ5X2RhdGUiOiIyMDIzLTAyLTExIDEzOjU0OjMwIiwiaWF0IjoxNjc1NjkxNjcwfQ.xCHBGXojY4avNmMWgnoY5P5bYwDrzd4pWcganxtvphE'
					  
						  }
					  
						  axios( base_urls_8090+"profile/", {
							method: 'POST',
							headers: headers,
							data: form
							
					  
						}).then(function (data) {
							var resp_data=JSON.parse(data);
									if(resp_data.status)
									{
										$(".message-text").show();
										$(".profile-message").html("Profile updated");
										datas.profile=resp_data.data;
										datas.profile_message=resp_data.message;
										//hide modal
										datas.updateName=false;
										// get_profile();   
									}
									else
									{
										datas.profile_message=resp_data.message;
										datas.updateName=false; 
									}
						}).catch(function (err) {
						})
						   
					},
					
					
					  //code added by Vishnu M R
				  
					  cancel_subscription:function()
					  {
						  datas.reason_for_cancellation=datas.reason_for_cancellation.trim();
						  // console.log(datas.reason_for_cancellation);
						  if(!datas.reason_for_cancellation)
						  {
							  datas.reason_for_cancellation_error="Please fill the reason";
						  }
						  else
						  {
							  datas.reason_for_cancellation_error="";
							  datas.show_loader=true;
							  var user_email = localStorage.getItem('user_email');
							  $.ajax({
								url: base_urls_8093+"pricing/subscription-cancel-request-mail",
								type: "POST",
								headers: {
									'Content-Type': 'application/json',
									'Authorization': localStorage.getItem('token')
								},
								data: JSON.stringify({
									reason_for_cancellation:datas.reason_for_cancellation,  
									email:user_email
								}),
								success: function(data, status) {  
									var resp_data=data;
								  // console.log(resp_data);
								  datas.subscription_cancel_mail_message=resp_data.message;
								  datas.cancel_subscription_modal=false;
								  datas.show_loader=false;
								  datas.subscription_cancel_mail_success_modal=true;
								},
								error:function(data, status) {  
								
								},
							})
						  }
					  },
					  
						update_profile_data:function(update_server_status)
						{
							update_status=1;
							// console.log(datas.profile_purpose_account_page);
							if(datas.profile_purpose_account_page == "")
							{
								update_status=0;
								datas.profile_purpose_account_page_error="Please select a Industry.";
							}
							else
							{
								datas.profile_purpose_account_page_error="";
								
								if(parseInt(datas.profile_purpose_account_page) == 16)
								{
									datas.profile_customer_industry_account_page=datas.profile_customer_industry_account_page.trim();
									if(!datas.profile_customer_industry_account_page)
									{
										update_status=0;
										datas.profile_customer_industry_account_page_error="Please fill your Industry name.";
									}
									else
									{
										datas.profile_customer_industry_account_page_error="";
									}
								}
							}
							
							datas.profile_company_name_account_page=datas.profile_company_name_account_page.trim();
							if(!datas.profile_company_name_account_page)
							{
								update_status=0;
								datas.profile_company_name_account_page_error="Please fill Company name.";
							}
							else
							{
								datas.profile_company_name_account_page_error="";
							}
					  
							if(datas.profile_company_size_account_page == "")
							{
								update_status=0;
								datas.profile_company_size_account_page_error="Please select a Company size.";
							}
							else
							{
								datas.profile_company_size_account_page_error="";
							}
							
							//code commented by Vishnu M R-2021-01-12
							/* if(datas.profile_category_account_page == "")
							{
								update_status=0;
								datas.profile_category_account_page_error="Please select a Role.";
							}
							else
							{
								disabled_options = $('#profile_category_id_account_page option:disabled').map(function(i,v) {
									return this.value;
								}).get(); 
								// console.log(disabled_options);
								if(disabled_options.length > 0)
								{
									// console.log(datas.profile_category_account_page);
									if(disabled_options.includes(datas.profile_category_account_page))
									{
										update_status=0;
										datas.profile_category_account_page_error="Role doesnot belong to selected Industry.";
									}
									else
									{
										datas.profile_category_account_page_error="";
									}
								}
								else
								{
									datas.profile_category_account_page_error="";
								}
							} */
							//code commented by Vishnu M R-2021-01-12
					  
							//code commented by Vishnu M R-2021-02-08
							/* if(datas.profile_demo_status_account_page == "")
							{
								update_status=0;
								datas.profile_demo_status_account_page_error="Please select your choice.";
							}
							else
							{
								datas.profile_demo_status_account_page_error="";
							} */
							//code commented by Vishnu M R-2021-02-08
							
							if(!update_server_status)
							{
								if(update_status == 0)
								{
									return false;
								}
								else
								{
									return true;
								}
							}
							
							if(update_status == 1)
							{
								// console.log(datas.profile_company_name_account_page);
								// $.post(base_url+"editor/save_profile_data",
								// {
								// 	profile_purpose:datas.profile_purpose_account_page,
								// 	profile_customer_industry:datas.profile_customer_industry_account_page,
								// 	profile_category:datas.profile_category_account_page,
								// 	profile_demo_status:datas.profile_demo_status_account_page,
								// 	profile_company_name:datas.profile_company_name_account_page,
								// 	profile_website:datas.profile_website_account_page,
								// 	profile_company_size:datas.profile_company_size_account_page,
								// },
								// function(data,status){
								// 	resp_data=JSON.parse(data);
								// 	// console.log(resp_data);
								// 	if(resp_data.status)
								// 	{	
								// 		datas.profile_update_status="Changes Saved";
								// 	}
								// 	else
								// 	{
								// 		datas.profile_update_status="Your session seems to be expired.";
								// 	}
								// });

								$.ajax({
									url: base_urls_8090+"profile/",
									type: "PUT",
									headers: {
								'Content-Type': 'application/json',
									'Authorization': localStorage.getItem('token')
									},
									data:JSON.stringify({
										profile_purpose:datas.profile_purpose_account_page,
										profile_customer_industry:datas.profile_customer_industry_account_page,
										profile_category:datas.profile_category_account_page,
										profile_demo_status:datas.profile_demo_status_account_page,
										profile_company_name:datas.profile_company_name_account_page,
										profile_website:datas.profile_website_account_page,
										profile_company_size:datas.profile_company_size_account_page,
									}),
									success: function(data, status) {  
										resp_data=data;
										// console.log(resp_data);
										if(resp_data.status)
										{	
											datas.profile_update_status="Changes Saved";
										}
										else
										{
											datas.profile_update_status="Your session seems to be expired.";
										}
									},
									error:function(data, status) {  
									
									},
							});
							}
						},
						initialize_value:function()
						{
							 console.log(profile_data);
							profile_data_parsed=JSON.parse(profile_data);
							// console.log(profile_data_parsed);
  
							if(profile_data_parsed != null)
							{
								
								datas.profile_purpose_account_page=profile_data_parsed.user_profile_industry_id;
									
								if(parseInt(datas.profile_purpose_account_page) == 16)
								{
									datas.profile_customer_industry_account_page=profile_data_parsed.user_profile_customer_industry;
									datas.profile_customer_industry_account_page_div=true;
								}
									
								datas.profile_category_account_page=profile_data_parsed.user_profile_role_id;
								datas.profile_demo_status_account_page=profile_data_parsed.user_profile_demo_status;
								datas.profile_company_name_account_page=profile_data_parsed.user_profile_company_name;
								datas.profile_website_account_page=profile_data_parsed.user_profile_website;
								datas.profile_company_size_account_page=profile_data_parsed.user_profile_company_size;
									
								// code commented by Vishnu M R-2021-01-12
								// this.disable_options();
							}
						},
						disable_options:function()
						{
							$("#profile_category_id_account_page option").prop('disabled', false);
							options = $('#profile_category_id_account_page option');
							// console.log(options);
							if(parseInt(datas.profile_purpose_account_page) == 9) //checking whether purpose of user is "School or University"
							{
								$.map(options ,function(option) {
									// console.log(option.value);
									if(option.value != "" && parseInt(option.value) != 23 && parseInt(option.value) !=24)
									{
										option.disabled=true;
									}
								});
							}
							else
							{
								$.map(options ,function(option) {
									// console.log(option.value);
									if(option.value == 23 || option.value== 24)
									{
										option.disabled=true;
									}
								});
							}
						},
						show_profile_settings:function()
						{
							this.profileSettings=true;
							if(datas.profile_purpose_account_page != "")
							{
								this.disable_options();
							}
						},
						update_profile_and_onboard:function()
						{
							datas.profile_update_status="";
							name_validation_status=app.update_profile_name(false);
							onboard_validation_status=app.update_profile_data(false);
							if(name_validation_status && onboard_validation_status)
							{
								app.update_profile_name(true);
								app.update_profile_data(true);
							}
						},
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
// $.ajax({
                //     url: base_urls_8087+"team/check-team-exists",
                //     type: "POST",
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': localStorage.getItem('token')
                //     },
                //     data:  JSON.stringify({team_header: 1}),
                //     success: function(data, status) {  
					// resp_data=JSON.parse(data);
					// datas.switch_team_list=resp_data.data;
					// datas.user_as_team_member_status=resp_data.user_as_team_member_status;
					// if(datas.switch_team_list && !datas.switch_team_id)
					// {
					// 	datas.switch_team_name=datas.switch_team_list[0].team_name;
					// 	datas.switch_team_id=datas.switch_team_list[0].id;
					// 	localStorage.selected_team_id=JSON.stringify(datas.switch_team_id);
					// 	localStorage.selected_team_name=JSON.stringify(datas.switch_team_name);
					// }
					// else if(datas.switch_team_list && datas.switch_team_id)
					// {
					// 	current_team_exists=false;
					// 	datas.switch_team_list.forEach(function(item) {
					// 		if(item.id == datas.switch_team_id)
					// 		{
					// 			current_team_exists=true;
					// 		}
					// 	})
				
					// 	if(!current_team_exists)
					// 	{
					// 		datas.switch_team_id=datas.switch_team_list[0].id;
					// 		app.change_team();
					// 	}
					// }
                //         },
                //     error:function(data, status) {  
                //            console.log(data)     
                //     },
                //         })
							
						},
						//code added by Vishnu M R	
						Download:function(package_id)
						{
							$.ajax({
								url: base_urls_8093+"pricing/download-invoice",
								type: "POST",
								headers: {
									'Content-Type': 'application/json',
									'Authorization': localStorage.getItem('token')
								},
								data: JSON.stringify({
									package_id:691,
									purchase_id:11,
									payment_date:10-09-2021
								}),
								success: function(data, status) {  
									var resp_data=JSON.parse(data);
									if(resp_data.status)
									{
										console.log(resp_data.data);
									}
									else
									{
										
									}
									},
								error:function(data, status) {  
									   console.log(data);     
								},
									})
						},
					  
					  
			  },
			  reset_password:function()
				{
				   $(".message-text").hide();
				   if(datas.old_password==""||datas.new_password==""||datas.new_password=="")
				   {
					  // console.log("Please fill all fields");
					   datas.reset_password_message="Please fill all fields";
					   return;
				   }
					$.post(base_url+"profile/reset_password",
				  {
					  "old_password":datas.old_password,
					  "new_password":datas.new_password,
					  "confirm_password":datas.confirm_password,
				  },
				  function(data,status){
				   var resp_data=JSON.parse(data);
					  if(resp_data.status)
					  {
						  $(".message-text").show();
						  $(".profile-message").html("Password updated");
						   datas.reset_password_message=resp_data.message;
					  }
					  else
					  {
						   datas.reset_password_message=resp_data.message;
					  }
				  });

				//     $.ajax({
				// 		url: base_urls_8083+"user/change-password",
				// 		type: "PUT",
				// 		headers: {
					// 'Content-Type': 'application/json',
				// 		'Authorization': localStorage.getItem('token')
				// 		},
				// 		data: {
				// 			"old_password":datas.old_password,
				// 			"new_password":datas.new_password,
				// 			"confirm_password":datas.confirm_password,
				// 		},
				// 		success: function(data, status) {  
				// 			var resp_data=JSON.parse(data);
				// 			if(resp_data.status)
				// 			{
				// 				$(".message-text").show();
				// 				$(".profile-message").html("Password updated");
				// 				datas.reset_password_message=resp_data.message;
				// 			}
				// 			else
				// 			{
				// 				datas.reset_password_message=resp_data.message;
				// 			}
				// 		},
				// 		error:function(data, status) {  
						
				// 		},
				// });
				} ,
		
  })
   
	// check_trial_expiry();
	get_profile();
	get_account_settings();
	get_user_profile_settings();
	list_notification();
	get_promocodes();
	setInterval(function(){ list_notification(); }, 60*3000);
	
   function get_user_profile_settings()
   {
	// 	$.post(base_url+"editor/get_user_profile_settings",
	//   {
	//   },
	//   function(data,status){
	//    var resp_data=JSON.parse(data);
	//    datas.user_profile_settings_status=resp_data.status;
	// 	  if(resp_data.status)
	// 	  {
	// 		  datas.user_profile_settings=resp_data.data
	// 		  switch(datas.user_profile_settings.category_name)
	// 		  {
	// 			  case "business":{
	// 								  datas.profile_category_business=datas.user_profile_settings.user_settings;
	// 								  break;
	// 							  }
	// 			  case "education":
	// 							  {
	// 								  datas.profile_category_education=datas.user_profile_settings.user_settings;
	// 								  break;
	// 							  }
	// 			  case "individual":
	// 							  {
	// 								  datas.profile_category_individual=datas.user_profile_settings.user_settings;
	// 								  break;
	// 							  }
	// 		  }
	// 	  }
	// 	  else
	// 	  {
			  
	// 	  }
	//   });

			$.ajax({
				url: base_urls_8090+"profile/get-user-profile-settings",
				type: "GET",
				headers: {
				'Authorization': localStorage.getItem('token')
				},
				data: {},
				success: function(data, status) {  
					var resp_data=data;
					datas.user_profile_settings_status=resp_data.status;
					if(resp_data.status)
					{
						datas.user_profile_settings=resp_data.data
						switch(datas.user_profile_settings.category_name)
						{
							case "business":{
												datas.profile_category_business=datas.user_profile_settings.user_settings;
												break;
											}
							case "education":
											{
												datas.profile_category_education=datas.user_profile_settings.user_settings;
												break;
											}
							case "individual":
											{
												datas.profile_category_individual=datas.user_profile_settings.user_settings;
												break;
											}
						}
					}
					else
					{
						
					}
				},
				error:function(data, status) {  
				
				},
			})
   } 
	
	/*******************Check Expiry *********************/ 
  function check_trial_expiry()
	{
		$.ajax({
			url: base_url_8099+"editor/check-trial-expiry",
			type: "post",
			headers: {
			  'Authorization': localStorage.getItem('token')
			},
			data: {},
			success: function(data, status) { 
				var resp_data=JSON.parse(data);
					if(resp_data.status)
					{
						datas.trial_expired=resp_data.status
					}
					else
					{
						datas.trial_expired=resp_data.status
					}
				}
	});
	}
	
   /*******************Check Expiry*********************/ 
  
  /*******************List notification*********************/ 
  function list_notification()
	{

	  $.ajax({
		url: base_urls_8095+"notification/",
		type: "GET",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data=data;
		  if(resp_data.status)
		  {
			  datas.read_entire_status=resp_data.read_entire_status;
			  datas.notification=resp_data.data;
			  datas.no_of_notification_records=datas.notification.length;
			  datas.read_count=resp_data.read_count;
		  }
		  else
		  {
			  datas.read_entire_status=resp_data.read_entire_status;
			  datas.notification=[];
			  datas.no_of_notification_records=datas.notification.length;
		  }
		},
		error:function(data, status) {  
		  
		},
	})
		$.post(base_url+"editor/account",
	  {
	  },
	  function(data,status){
		  console.log(data)
	   var resp_data=JSON.parse(data);
		  
	  });
	}
	
   /*******************List notification*********************/  
	
  function get_profile()
	{
	// 	$.post(base_url+"profile/get_profile",
	//   {
	//   },
	//   function(data,status){
	// 	// console.log(data);
	//    var resp_data=JSON.parse(data);

	// 	  if(resp_data.status)
	// 	  {
			  
	// 		  datas.profile=resp_data.data;
	// 	  }
	// 	  else
	// 	  {
			  
	// 	  }
	//   });

	  $.ajax({
		url: base_urls_8090+"profile/",
		type: "GET",
		headers: {
			'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data = JSON.parse(data);
			console.log(data);

			if (resp_data.status) {
				console.log(resp_data.data);
				datas.profile = resp_data.data;
				datas.profile.user_image=resp_data.data.user_image
				console.log(datas.profile);
				console.log(resp_data.data.user_image);
			} else {

			}
		},
		error:function(data, status) {  
			console.log("error");
		},
	})
	}
  function get_account_settings()
	{

	  $.ajax({
		url: base_urls_8094+"account/get-account-settings",
		type: "GET",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data=data;
		  if(resp_data.status)
		  {
			datas.account_settings=resp_data.data;
		  }
		  else
		  {
			 
		  }
		},
		error:function(data, status) {  
		  console.log("error")
		},
	})
	}
	 /******************* Update User Settings*********************/  
   function update_user_settings()
	{
		$.post(base_url+"campaign/list_favorite_campaign",
	  {
	  },
	  function(data,status){
	   var resp_data=JSON.parse(data);
		  if(resp_data.status)
		  {
			  datas.no_of_fav_records=datas.favorite_campaigns.length;
			  datas.favorite_campaigns=resp_data.data;
		  }
		  else
		  {
			  
		  }
	  });
	} 
	 /******************* Update User Settings*********************/  
   
   
   
   /******************* Add Campaign*********************/ 
  async function add_campaign()
	{
		return new Promise(function(resolve, reject) {
	  //setTimeout(() => resolve("done!"), 1000)
	 

	  $.ajax({
		url: base_urls_8088+"campaign/",
		type: "POST",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data=data;
		  if(resp_data.status)
		  {
			  datas.read_entire_status=resp_data.read_entire_status;
			  datas.notification=resp_data.data;
			  datas.no_of_notification_records=datas.notification.length;
			  datas.read_count=resp_data.read_count;
		  }
		  else
		  {
			  datas.read_entire_status=resp_data.read_entire_status;
			  datas.notification=[];
			  datas.no_of_notification_records=datas.notification.length;
		  }
		},
		error:function(data, status) {  
		  
		},
	})
	});
	}
  /******************* Add Campaign*********************/ 
  
  /******************* RazorPay************************/
  function razor_payment(){
	  // var amount = (document.getElementById("scan_price").innerHTML).replace('$','');
	  var amount = Math.ceil(0.05*datas.add_more_scan_count);
	  // var scan_number = document.getElementById("scan_count").innerHTML;
	  var scan_number=datas.add_more_scan_count;
	  //console.log(amount);
	  $.post(base_url+'razorpay_onetime', {amount: amount}, function(result)
	  {
  
	  var options = {
		  "key": "rzp_live_Z0QTFFgeiISPfW", // Enter the Key ID generated from the Dashboard
		  "amount": "50", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
		  "currency": "USD",
		  "name": "UniteAR",
		  "description": scan_number+" scans",
		  "image": base_url+"resources/img/razor_logo1.jpg",
		  "order_id": result,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
		  "handler": function (response){
			  //alert("PAYMENT SUCCESSFUL");
			  newclose();
		  },
		  "prefill": {
			  "name": "",
			  "email": "",
			  "contact": ""
		  },
		  "notes": {
			  "user_id":user_id,
			  "scans": scan_number,
			  "one_time": "pay per scan"
		  },
		  "theme": {
			  "color": "#528FF0"
		  }
	  };
	  var rzp1 = new Razorpay(options);
		  rzp1.open();
		  //e.preventDefault();
	  });
  }
   /******************* RazorPay************************/
	/******************* Check app factory Status*********************/
  function check_app_factory_status()
  {

	  $.ajax({
		url: base_urls_8081+"app-factory/check-app-factory-access",
		type: "POST",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) { 
	
	   var resp_data=JSON.parse(data);
		  if(resp_data.status)
		  {
			  
		  datas.package_error_modal=false;
		  location.href = "https://unitear-node-html.ibosoninnovations.com/unitear-app-factory/";
		  }
		  else
		  {
		  datas.package_error_modal=true;		
		  }
	  }});
  }
  /******************* Check app factory Status*******************/

  /*******************Invite reffral section*******************/
  function validate_user_email()
  {
				 
										 
	  var patt = RegExp(/\S+@\S+\.\S+/);
	  if(patt.test(datas.selected_refferal_email.email))
		  {
			  datas.selected_refferal_email.error="";
			  // $("#user_email").removeClass('error-input');
		  }
	  else
		  {
			  datas.selected_refferal_email.error="Please enter a valid email address";
			  $("#user_email").addClass('error-input');
		  }
								  
						 
								 
  }
  
  function insert_refferal_email(e)
{
	if(datas.whole_refferal_error_status)
					{
						// console.log("email error");
						e.preventDefault();
						return false;
					}
	if(datas.invite_button_loader)
	{
		e.preventDefault();
		return false;
	}
	datas.invite_button_loader=true;
console.log(datas.refferal_emails)
	var data = {refferal_emails:JSON.stringify(datas.refferal_emails)}
	const form = new FormData()
	for (const key in data) {
		form.append(key, data[key]);
	}
	const headers = {

	 'Authorization': localStorage.getItem('token')
	//  'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NzQxLCJ1c2VyX25hbWUiOiJpYm9zb25pbm5vdiIsInVzZXJfZW1haWwiOiJwYXJ2YXRoeXZAaWJvc29uaW5ub3YuY29tIiwidXNlcl9pbWFnZSI6IiIsInVzZXJfY291bnRyeSI6IkluZGlhIiwiY3JlYXRlX2RhdGUiOiIyMDIzLTAyLTA2IDEzOjU0OjI1IiwiZXhwaXJ5X2RhdGUiOiIyMDIzLTAyLTExIDEzOjU0OjMwIiwiaWF0IjoxNjc1NjkxNjcwfQ.xCHBGXojY4avNmMWgnoY5P5bYwDrzd4pWcganxtvphE'

   }

   axios(base_urls_8089+"invite/", {
	 method: 'POST',
	 headers: headers,
	 data: form
	 

 }).then(function (data) {
	var resp_data=JSON.parse(data);
	if(resp_data.status)
	{
		datas.refferal_emails=[];
		app.add_refferal_email_template();
		app.$snotify.success="Invitation sent";
	}
	else
	{
		
	}
	datas.invite_button_loader=false;
 }).catch(function (err) {
})

	
}
  /*******************Invite reffral section*******************/
  /*******************get promocodes*******************/
//jijo 09-11-2020
  function get_promocodes()
{
					
					$.ajax({
						url: base_urls_8084+"points/promo-code/9741",
						type: "GET",
						headers: {
							'Authorization': localStorage.getItem('token')
						},
						data: {},
						success: function(data, status) {  
							var resp_data=data;
							if(resp_data.status)
							{
								datas.promo_codes=resp_data.data;
							}
							else
							{
											
							}
							},
						error:function(data, status) {  
									
						},
							})
}


  /*******************get promocodes*******************/
  function redeem_points(points)
{
	datas.redeem_button_status=true;
	
					$.post(base_url+"payment_gateway/create_coupon",
					{
						redeem_points:points
					},
					function(data,status){
					 var resp_data=JSON.parse(data);
						if(resp_data.status)
						{
							datas.points=resp_data.data.balance;
							app.$snotify.success(resp_data.message);
							get_promocodes();
						}
						else
						{
							
						}
					});	
	datas.redeem_button_status=false;
}
  /*******************get promocodes*******************/
  /*******************Remove profile pic*******************/
  function logout() {
    localStorage.removeItem('token');
	localStorage.removeItem('user_email');
}

function remove_profile_pic()
{
	datas.photo_remove_button_loader=true;
	datas.redeem_button_status=true;
	
					// $.post(base_url+"profile/remove_profile_pic",
					// {
						
					// },
					// function(data,status){
					//  var resp_data=JSON.parse(data);
					// 	if(resp_data.status)
					// 	{
							
					// 		app.$snotify.success(resp_data.message);
					// 		datas.profile.user_image="";
					// 	}
					// 	else
					// 	{
					// 		app.$snotify.success(resp_data.message);
					// 	}
					// datas.photo_remove_button_loader=false;

					// });	

					$.ajax({
						url: base_urls_8081+"profile/remove-profile-pic",
						type: "DELETE",
						headers: {
						  'Authorization': localStorage.getItem('token')
						},
						data: {},
						success: function(data, status) {  
							var resp_data=data;
						if(resp_data.status)
						{
							
							app.$snotify.success(resp_data.message);
							datas.profile.user_image="";
						}
						else
						{
							app.$snotify.success(resp_data.message);
						}
					datas.photo_remove_button_loader=false;
						},
						error:function(data, status) {  
						  
						},
					})
	datas.redeem_button_status=false;
}
  /*******************Remove profile pic*******************/

