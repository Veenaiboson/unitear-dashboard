$(document).ready(function(){
  
  
  var base_url=base_url;
  $(".add_campaign").click(function(){
   // add_campaign().then(function(){list_campaign();list_favorite_campaign();});
	add_campaign();
	
  });
  
 
 
});



var datas = {
	base_url:base_url,
    profile: [],
	files:[],
	target_files:[],
	account_settings:{},
	upload_url:base_url+"profile/profile_pic_upload",
	old_password:"",
	new_password:"",
	confirm_password:"",
	reset_password_message:"",
	profile_message:"",
	profile_pic_message:"",
	show_target_upload_modal:false,
	current_campaign_id:"",
	current_campaign_name :"",
	campaign_first_name:"",
	show_target_upload_modal:false,
	show_delete_target_modal:false,
	show_target_upload_modal_class:"my-modal-display-hide",
	show_delete_target_modal_class:"my-modal-display-hide",
	campaign_msg_status:true,
	delete_account_text:"",
	delete_account_message:"",
	notification:[],
	notification_read_status:false,
	no_of_notification_records:0,
	read_entire_status:false,
	trial_expired:true,
	trial_modal:true,
	show_expiry_modal_class:"my-modal-display-hide",
	user_name_update:"",

  }
Vue.component('file-upload', VueUploadComponent)
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
  methods :
			{
				removeFileupload(file) {
					
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
										location.href=base_url+"unitear-editor";
									}
								},
							error:function(data, status) {  
									console.log(data)     
							},
								})						
					}
				},
				openFile:function()
				{
					
					this.$refs.upload.$children[0].$el.click()
					
				},
				opentargetFile:function()
				{
					
					this.$refs.upload2.$children[0].$el.click()
				},/******************************target file upload********/
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
					
					newFile.weakImage=!data.status;//image weak for augmenting or not
					
					// $(".next-target").removeClass("my-disabled-button");
					// $(".next-target").attr("disabled", false);
					app.check_campaign_name();
					if(data.status)
					{
						$(".next-target").removeClass("my-disabled-button");
						$(".next-target").attr("disabled", false);
					//	newFile.weakImage=true;
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
						newFile = this.$refs.upload2.update(newFile, {error:data.message})//update error message shpw over image
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
									$.post(base_url+"artarget/delete_target",
									{
										scan_target_id:scan_target_id,
										
									},
									function(data,status){
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
									});

									// $.ajax({
									// 	url: base_urls_8097+"artarget/"+scan_target_id,
									// 	type: "DELETE",
									// 	headers: {
									// 		'Authorization': localStorage.getItem('token')
									// 	},
									// 	data: {},
									// 	success: function(data, status) {  
									// 		$(".loader-img").hide();
									// 		$(".nonloader-img").show();
									// 		var resp_data=JSON.parse(data);
									// 		if(resp_data.status)
									// 			{
									// 				datas.show_delete_target_modal_class="my-modal-display-hide";
									// 				datas.show_delete_target_modal=false;
													
									// 				app.removeFileupload(datas.delete_file);
									// 				list_campaign();
									// 				list_favorite_campaign();
													
													
									// 			}
									// 		},
									// 	error:function(data, status) {  
													
									// 	},
									// 		})
							},
							deactivated(){
								$.ajax({
									url: base_urls_8094+"account/deactivated",
									type: "POST",
									headers: {
										'Authorization': localStorage.getItem('token')
									},
									data:{},
									success: function(data, status) {  
										var resp_data=JSON.parse(data);
										if(status){
											window.location.href="upgradenow.html";
											localStorage.setItem('heading')=resp_data.data.heading;
											localStorage.setItem('sub-heading')=resp_data.data.sub_heading
										}
										else{
											window.location.href="editor.html";
										}
										
									},
									error:function(data, status) {  
									
									},
								})
							},
							logout() {
								localStorage.removeItem('token');
								localStorage.removeItem('user_email');
								window.location.href="login.html";
							},
  delete_account:function()
  {
	  
	  if(datas.delete_account_text!="DEACTIVATE")
	  {
		  datas.delete_account_message="Sorry, please enter the text exactly as displayed to deactivate";
		  return;
	  }

									$.ajax({
										url: base_urls_8094+"account/delete-account",
										type: "POST",
										headers: {
											'Authorization': localStorage.getItem('token')
										},
										data: JSON.stringify({
										user_email:localStorage.getItem('user_email')
									}),
										success: function(data, status) {  
											 var resp_data=JSON.parse(data);
											if(resp_data.status)
											{
												deactivated();
												
												
											}
											else{
												logout();
											}
											},
										error:function(data, status) {  
													
										},
											})
	  
  },
  delete_notification:function(id)
				{
					$.post(base_url+"campaign/delete_notification",
									{
										id:id,
									
										
									},
									function(data,status){
									 var resp_data=JSON.parse(data);
									 if(resp_data.status)
										 {
											list_notification();
										 }
										 
									});
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
									var resp_data=JSON.parse(data);
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
					
					
					},
  /******************************target file upload********/
				inputFile(newFile, oldFile) {
					// this.$refs.upload.active = true
					
					
					$(".message-text").hide();
					  if (newFile && !oldFile) {
								// Add file
								// this.$store.state.showTargetImageUploader=true;//show target upload modal

								 //newFile.weakImage=false;
					  }

					  if (newFile && oldFile) 
					  {
						// Update file

						// Start upload
						if (newFile.active !== oldFile.active) {
							$(".loader-img").show();
						  // console.log('Start upload', newFile.active, newFile)

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
							$(".loader-img").hide();
							datas.profile.user_image=datas.files[0].blob;
							datas.profile_pic_message="Profile Image Updated";
							 $(".message-text").show();
							/*
									// console.log('success', newFile.success, newFile)
									var data=JSON.parse(newFile.response);
									newFile.weakImage=!data.status;//image weak for augmenting or not
									if(data.status)
									{
									//	newFile.weakImage=true;
									

									
									}else{

										newFile = this.$refs.upload.update(newFile, {error: 'Image is too weak to augment'})//update error message shpw over image
									}
										*/

						}
					  }

					  if (!newFile && oldFile)
						{
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
					if (!this.$refs.upload.active) {
					  this.$refs.upload.active = true
					}
				  }
    },
		
		
		 inputFilter: function (newFile, oldFile, prevent) {
		
		
					if (newFile && !oldFile) {
							// Add file

							// Filter non-image file
							// Will not be added to files
							if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
								datas.profile_pic_message="Invalid file format";
								// console.log("Inavlid file format")
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
  
  update_profile:function()
  {
	  if(isNaN(datas.profile.user_phone))
	  {
		  datas.profile_message="Please enter valid number";
		  return;
	  }
	 $(".message-text").hide();
	  $.post(base_url+"profile/update_profile",
    {
		"user_name":datas.profile.user_name,
		"user_phone":datas.profile.user_phone,
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			$(".message-text").show();
			$(".profile-message").html("Profile updated");
			datas.profile=resp_data.data;
			datas.profile_message=resp_data.message;
			// get_profile();
		}
		else
		{
			datas.profile_message=resp_data.message;
		}
    });
  } ,
  
  //update profile name
  update_profile_name:function()
  {
	  alert("jijo");
	  /*
	  $.post(base_url+"profile/update_profile",
    {
		"user_name":datas.profile.user_name,
		
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			$(".message-text").show();
			$(".profile-message").html("Profile updated");
			datas.profile=resp_data.data;
			datas.profile_message=resp_data.message;
			// get_profile();
		}
		else
		{
			datas.profile_message=resp_data.message;
		}
    });*/
  } ,
  change_settings:function()
  {
	  $(".message-text").hide();
	  //alert(datas.account_settings.monthly_bill)
	 $.post(base_url+"profile/update_account_settings",
    {
		"monthly_bill":datas.account_settings.monthly_bill?1:0,
		"news_letter":datas.account_settings.news_letter?1:0,
		"notification":datas.account_settings.notification?1:0,
		"sms":datas.account_settings.sms?1:0,
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			$(".message-text").show();
			$(".profile-message").html("Settings saved");
			datas.profile=resp_data.data;
			datas.profile_message=resp_data.message;
		}
		else
		{
			datas.profile_message=resp_data.message;
		}
    });
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
  } ,
  
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
				}
  
  
   		
			},
  	
})
 
  check_trial_expiry();
  get_profile();
  get_account_settings();
  
setInterval(function(){ list_notification(); }, 3000);
/*******************Check Expiry *********************/ 
function check_trial_expiry()
  {
	  $.post(base_url+"editor/check_trial_expiry",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			datas.trial_expired=resp_data.status
		}
		else
		{
			datas.trial_expired=resp_data.status
		}
    });
  }
  
 /*******************Check Expiry*********************/ 
/*******************List notification*********************/ 
function list_notification()
  {
	  $.post(base_url+"campaign/list_notification",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			datas.read_entire_status=resp_data.read_entire_status;
			datas.notification=resp_data.data;
			datas.no_of_notification_records=datas.notification.length;
		}
		else
		{
			datas.read_entire_status=resp_data.read_entire_status;
			datas.notification=[];
			datas.no_of_notification_records=datas.notification.length;
		}
    });
  }
  
 /*******************List notification*********************/  
  
  
function get_profile()
  {
	//   $.post(base_url+"profile/get_profile",
    // {
    // },
    // function(data,status){
    //  var resp_data=JSON.parse(data);
	// 	if(resp_data.status)
	// 	{
			
	// 		datas.profile=resp_data.data;
	// 	}
	// 	else
	// 	{
			
	// 	}
    // });
	$.ajax({
		url: base_urls_8090+"profile/",
		type: "GET",
		headers: {
			'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) {  
			var resp_data = data;
			if (resp_data.status) {

				datas.profile = resp_data.data;
				
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
	  $.post(base_url+"profile/get_account_settings",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			
			datas.account_settings=resp_data.data;
		}
		else
		{
			
		}
    });
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
	$.post(base_url+"campaign/create_campaign",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
	 if(resp_data.status)
		 {
			 datas.campaign_msg_status=true;
			 datas.current_campaign_id=resp_data.data.campaign_id;
			 datas.current_campaign_name=resp_data.data.campaign_name;
			 datas.campaign_first_name=resp_data.data.campaign_name;
			 $('#myModal').modal('show');
			 
		 }
		 resolve("done!")
    });
  });
  }
/******************* Add Campaign*********************/ 

 
