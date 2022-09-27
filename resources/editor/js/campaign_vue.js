$(document).ready(function() {
	jQuery.ajaxSetup({async:true});
    $('[data-toggle="tooltip"]').tooltip();

    var base_url = base_url;
    $(".add_campaign").click(function() {
        add_campaign(2).then(function() {
            list_campaign();
            list_favorite_campaign();
        });


    });
  
 // $("#tab-search").on("keyup", function() {
    // var value = $(this).val().toLowerCase();
	
    // $(".single-item").filter(function() {
		
      // $(this).toggle($(this).find('.box-bottom').text().toLowerCase().indexOf(value) > -1);
	  
    // });
  // });
 
});

var datas = {
    campaigns: [],
	profile: {
		user_version:2
	},
	favorite_campaigns: [],
	filter_campaign:[],
	target_files:[],
	page:1,
	per_page:4,
	page_fav:1,
	per_page_fav:4,
	search_campaign:"",
	no_of_records:0,
	no_of_fav_records:0,
	sort_type:"Sort by date descending",
	show_target_upload_modal:false,
	show_delete_campaign_modal:false,
	show_delete_target_modal:false,
	show_target_upload_modal_class:"my-modal-display-hide",
	show_delete_campaign_modal_class:"my-modal-display-hide",
	show_delete_target_modal_class:"my-modal-display-hide",
	delete_campaign_id:0,
	delete_target_id:0,
	current_campaign_id:"",
	current_campaign_name:"",
	campaign_first_name:"",
	campaign_view_url:"view_campaign/",
	campaign_msg_status:true,
	notification:[],
	notification_read_status:false,
	no_of_notification_records:0,
	read_entire_status:false,
	show_sort:true,
	show_search:true,
	pro_msg:"",
	pro_sub_msg:"Build an AR Experience to bring your ideas to life.",
	pro_gnd_msg:"Create your first project",
	pro_gnd_sub_msg:"Build an AR Experience to bring your ideas to life.",
	trial_expired:false,
	trial_modal:true,
	show_expiry_modal_class:"my-modal-display-hide",
	page_load:false,
	add_new_project_modal:false,
	//campaign category 1-image 2-ground
	campaign_category:3,
	sort_analytic_area:false,
	read_count:0,
	web_ar_experience:base_url+"webscanner/",
	show_new_feature_info_modal:false,
	package_error_modal:false,
	delete_campaign_button_click:false,
	campaign_count_limit:4,
	campaign_image_page_number:1,
	search_flag:false,
	pagination_flag:false,
	add_new_image_project_button:false,
	add_new_ground_project_button:false,
	list_campaign_request:null,
    list_fav_campaign_request:null,
    mobile_menu: false,
	campaign_loader: true,
	fav_campaign_loader: true,
	total_image_campaign:0,
	total_ground_campaign:0,
	total_campaign_count_user:0,
	
	//code added by Vishnu M R
	show_scan_count_limit_exceeded:false,
	show_scan_count_limit_data:"",
	//code added by Vishnu M R


	view_count_modal:false,
	target_image_modal:false,
	more_storage_modal:false,
	video_tuto1:false,
  }

Vue.component('file-upload',VueUploadComponent);

app = new Vue({
  el: '#app',
  data:datas,
  computed:{
	 
			/*filter_campaign(){
				// console.log("jijo");
				var campaigns=this.campaigns;
				
				if(datas.search_campaign.length>0)
				{
					// console.log(datas.search_campaign.length);
					
					campaigns=this.campaigns.filter(function(camp,index)
					{
						if(camp.campaign_name.toLowerCase().match(datas.search_campaign.toLowerCase()))
						{
							
							return true;
						}
					})
					
				}
				//datas.no_of_records=campaigns.length;
			
				return campaigns.filter(function(camp,index){
					if(index>=(datas.page-1)*datas.per_page && index<(datas.page*datas.per_page))
					{
						
						return true;
					}
					})
			},
			total_filtered_campaigns()
			{
				var campaigns=this.campaigns;
			    // console.log("search campaign");
				if(datas.search_campaign.length>0)
				{
					datas.page=1;
					// console.log(datas.search_campaign.length);
					
					campaigns=this.campaigns.filter(function(camp,index)
					{
						if(camp.campaign_name.toLowerCase().match(datas.search_campaign.toLowerCase()))
						{
							
							return true;
						}


					})
						if(campaigns.length==0)
							{
								
							}
					
				}
				
				return campaigns;
			},
			current_page_campaigns()
			{
				
				return this.total_filtered_campaigns.filter(function(camp,index){
					if(index>=(datas.page-1)*datas.per_page && index<(datas.page*datas.per_page))
					{
						
						return true;
					}
					})
			},
			filter_favorite_campaign(){
				var favorite_campaigns=this.favorite_campaigns;
				// console.log(favorite_campaigns);
				if(datas.search_campaign.length>0)
				{
					favorite_campaigns=this.favorite_campaigns.filter(function(camp,index)
					{
						if(camp.campaign_name.toLowerCase().match(datas.search_campaign.toLowerCase()))
						{
							
							return true;
						}
					})
				}
				
				datas.no_of_fav_records=favorite_campaigns.length;
				return favorite_campaigns.filter(function(camp,index){
					if(index>=(datas.page_fav-1)*datas.per_page_fav && index<(datas.page_fav*datas.per_page_fav))
					{
						
						return true;
					}
					})
			},
			filter_favorite_campaign2(){
				var favorite_campaigns=this.campaigns;
				// console.log(favorite_campaigns);
				if(datas.search_campaign.length>0)
				{
					favorite_campaigns=this.favorite_campaigns.filter(function(camp,index)
					{
						if(camp.campaign_name.toLowerCase().match(datas.search_campaign.toLowerCase()))
						{
							
							return true;
						}
					})
				}
				
				datas.no_of_fav_records=favorite_campaigns.length;
				return favorite_campaigns.filter(function(camp,index){
					if(index>=(datas.page_fav-1)*datas.per_page_fav && index<(datas.page_fav*datas.per_page_fav))
					{
						
						return true;
					}
					})
			},*/
  },
  methods:
		{
			check_app_factory_access()
			{
				check_app_factory_status();
			},
			 copy_link(link_share) {
								  /* Get the text field */
								  var copy_text = document.getElementById("camp");
									copy_text.value=link_share;
								  /* Select the text field */
								  copy_text.setAttribute('type', 'text');
								  copy_text.select();
								  copy_text.setSelectionRange(0, 99999); /*For mobile devices*/

								  /* Copy the text inside the text field */
								  document.execCommand("copy");
									 copy_text.setAttribute('type', 'hidden');
								  /* Alert the copied text */
								  app.$snotify.success('Link copied');
								},
			
			
			add_webar_campaign(category_id)
			{
				if(datas.profile.user_version==1 && category_id==2)
				{
					datas.add_new_project_modal=false;
					datas.show_new_feature_info_modal=true;
					return;
				}
				add_campaign(category_id);
			},
			opentargetFile:function()
				{
					// alert("lllll")
				
					this.$refs.upload2.$children[0].$el.click()
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
					// console.log(newFile.error)
					
          // if (newFile.size >= 0 && newFile.size < 20*1024) {
          //   //newFile = this.$refs.upload.update(newFile, {error: 'size'})
					// }
					if(newFile.size > 5*1024*1024)
					{

						newFile = this.$refs.upload2.update(newFile,{error: 'Image size should be below 2MB'})

					}


        }

        // Upload progress
        if (newFile.progress !== oldFile.progress) {
          // console.log('progress', newFile.progress, newFile)
        }

        // Upload error
        if (newFile.error !== oldFile.error) {
         // console.log('error', newFile.error, newFile)
		  // console.log(newFile.error)
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
			
					list_campaign();
					list_favorite_campaign();	
					// console.log('success', newFile.success, newFile)
					var data=JSON.parse(newFile.response);
					
					
					
					newFile.weakImage=!data.status;//image weak for augmenting or not
					
					
					app.check_campaign_name();
					// console.log(data.status)
					// console.log(data.message)
					if(data.status)
					{
						$(".next-target").removeClass("my-disabled-button");
						$(".next-target").attr("disabled", false);
						
						datas.current_campaign_id=data.data.campaign_id;
					//	newFile.weakImage=true;
					// datas.target_files.target_id=data.data.scan_target_id;

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
  removeFile:function(target_id,file){
	  
	  datas.delete_file=file;
	 datas.delete_target_id=target_id;
	 datas.show_delete_target_modal_class="my-modal-display-show";
	 datas.show_delete_target_modal=true;
  },
  remove_files:function()
  {
	  // alert("jijo");
	  // for(i=0;i<datas.target_files.length;i++)
	  // {this.$refs.upload2.remove(datas.target_files[i]);}

	  datas.target_files=[];
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
							},
  
  /******************************target file upload********/
			add_favorite:function(favorite_status,campaign_id)
							{
								
								 $(".message-text").hide();
								 if(campaign_id=="" || campaign_id==null)
								 {
									 return;
								 }
									$.post(base_url+"campaign/add_favorite",
									{
										favorite_status:favorite_status,
										campaign_id:campaign_id
									},
									function(data,status){
									 var resp_data=JSON.parse(data);
									 if(resp_data.status)
										 {
											 
											 $(".message-text").show();
											 if(favorite_status == '0')
											 {
											$(".profile-message").html("Added to Favorites");
											 }
											 else{
												 $(".profile-message").html("Remove from Favorites");
											 }
											list_campaign();
											list_favorite_campaign();
											
										 }
									});
							},
			clickCallback:function(page)
							{
								// console.log(page)
								// console.log(datas.campaigns.length);
								datas.campaign_count_limit=8;
								datas.campaign_image_page_number=page;
								
								datas.page_load=false;
								datas.pro_msg="";
								list_campaign();
								
								
							},
			clickCallback1:function(page_fav)
							{
								// console.log(page_fav)
								
								// console.log(datas.campaigns.length);
								datas.campaign_count_limit=8;
								datas.campaign_image_page_number=page_fav;

								
								datas.page_load=false;
								datas.pro_gnd_msg="";
								list_favorite_campaign();
							},
				search:function()
							{
								datas.campaigns.length=-1;
								datas.page_load=false;
								datas.pro_gnd_msg="";
								datas.pro_msg="";
								// console.log(datas.search_campaign)
							},
				sort_campaigns:function()
				{
					// alert(datas.sort_type);
					
					$.post(base_url+"campaign/sort_campaign",
									{
										sort_type:datas.sort_type
										
									},
									function(data,status){
									 var resp_data=JSON.parse(data);
									 if(resp_data.status)
										 {
											datas.campaigns=resp_data.data.campaigns; 
											datas.no_of_records=datas.campaigns.length;
											
											
											datas.favorite_campaigns=resp_data.data.favorite_campaigns;
											datas.no_of_fav_records=datas.favorite_campaigns.length;
											$("sort").html(datas.sort_type);
										 }
									});
					
					
					
				},
				sort_campaign:function(){
					datas.page_load=false;
					datas.pro_gnd_msg="";
					datas.pro_msg="";
					$("sort").html(datas.sort_type);
					list_campaign();
					list_favorite_campaign();
				},
				 search_campaigns(search_value)
				{
					//to avoid empty project image while searching
					datas.campaigns.length=1;
					datas.favorite_campaigns.length=1;
					//to avoid empty project image while searching

					datas.page_load=false;
					datas.pro_gnd_msg="";
					datas.pro_msg="";

					datas.campaign_count_limit=8;
					datas.campaign_image_page_number=1;
					datas.page=1;
					// console.log(datas.campaign_count_limit)
					// console.log(datas.campaign_image_page_number);
					datas.search_flag=true;
					list_campaign();
					list_favorite_campaign();
				},

				delete_campaign:function()
							{
								
								
								datas.delete_campaign_button_click=true;
								$(".loader1-img").show();
								$(".nonloader1-img").hide();
								campaign_id=datas.delete_campaign_id;
	
								 if(campaign_id=="" || campaign_id==null)
								 {
									 return;
								 }
									$.post(base_url+"campaign/delete_campaign",
									{
										campaign_id:campaign_id
									},
									function(data,status){
										$(".loader1-img").hide();
								$(".nonloader1-img").show();
									 var resp_data=JSON.parse(data);


									 datas.show_delete_campaign_modal=false;
									datas.delete_campaign_button_click=false;
									list_campaign();
									list_favorite_campaign();
									 if(resp_data.status)
										 {
											 
											 app.$snotify.success('Project deleted');
											
										 }
										 else{
											app.$snotify.success('Project can\'t delete right now');
										 }
									});
							},
				show_delete_modal:function(campaign_id)
				{
					// alert(campaign_id)
					datas.delete_campaign_id=campaign_id;
					 datas.show_delete_campaign_modal=true;
					 datas.show_delete_campaign_modal_class="my-modal-display-show";
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
											 if(datas.campaign_category==1)
											 {	if(datas.profile.user_version==1)
												{
													if(detect_mob())
													{
														location.href="https://unitear-node-html.ibosoninnovations.com/unitear-image-based-mobile-editor/";	
													}
													else
													{
														location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor2/";	

													}
												}
												else{
													if(detect_mob())
													{
														location.href="https://unitear-node-html.ibosoninnovations.com/unitear-image-based-mobile-editor/";	
													}
													else
													{
														location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor2/";	

													}			
												}
												
											 }
											 else
											 {
												if(detect_mob())
												{
													location.href="https://unitear-node-html.ibosoninnovations.com/unitear-webar-mobile-editor/";	
												}
												else
												{
													location.href="https://unitear-node-html.ibosoninnovations.com/webar-editor/";	
						
												}
											 }
										 }
								},
							error:function(data, status) {  
								   console.log(data)     
							},
								})
					
					}
				},
				
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
					}
				,
				start_campaign:function()
				{
					// console.log(datas.trial_expired);
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
				,
				update_new_version:function()
				{
					update_new_version();
				}
				,
				set_sort_analytic_area:function()
				{
					set_sort_analytic_area();
				}
				
				
		},
  components: {
    Pagination
  },	
})
 
// setInterval(function(){ list_notification(); }, 3000);

// check_trial_expiry();
// is_new_user();
datas.search_flag=false;
get_profile();
list_campaign();
list_favorite_campaign();
list_notification();

//code added by Vishnu M R opening
check_whether_scan_limit_exceeded();

//code added by Vishnu M R closing

/*******************Check Expiry *********************/ 

function is_new_user()
  {
	  $.post(base_url+"campaign/is_new_user",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			
			datas.show_new_feature_info_modal=false;
		}
		else
		{
			datas.show_new_feature_info_modal=true;
		}
    });
  }


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
/*******************Update  new version*********************/ 
function update_new_version()
{
	$.post(base_url+"profile/update_new_version",
  {
  },
  function(data,status){
   var resp_data=JSON.parse(data);
	  if(resp_data.status)
	  {
		  get_profile();
		  app.$snotify.success('Succesfully updated to new version');
	  }
	  else
	  {
		  
	  }
  });
}
/*******************Update  new version*********************/ 
function get_profile()
  {
	//   $.post(base_url+"profile/get_profile",
    // {
    // },
    // function(data,status){
	// 	// console.log(data);
    //  	var resp_data=JSON.parse(data);
	// 	if(resp_data.status)
	// 	{
			
	// 		datas.profile=resp_data.data;
	// 		if(datas.profile.user_version==1)
	// 		{
	// 			datas.show_new_feature_info_modal=true;
	// 		}
	// 		else{
	// 		datas.show_new_feature_info_modal=false;
	// 		}
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

				datas.profile=resp_data.data;
			if(datas.profile.user_version==1)
			{
				datas.show_new_feature_info_modal=true;
			}
			else{
			datas.show_new_feature_info_modal=false;
			}
				
			} else {

			}
		},
		error:function(data, status) {  
			console.log("error");
		},
	})
  }

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
			datas.read_count=resp_data.read_count;
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
 
/*******************List Campaign*********************/
function list_campaign()
  {
	  datas.campaign_loader=true;
	datas.list_campaign_request!=null?datas.list_campaign_request.abort():null;
	 datas.list_campaign_request=$.post(base_url+"campaign/list_campaign",
    {
		campaign_count_limit:datas.campaign_count_limit,
		campaign_image_page_number:datas.campaign_image_page_number,
		campaign_search:datas.search_campaign,
		sort_type:datas.sort_type,
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			
			
			datas.campaigns=resp_data.data;
			datas.no_of_records=resp_data.total_campaign_count;
			
			
			
		}
		else
		{
			
			datas.no_of_records=0;
			datas.campaigns=[];
			datas.sort_analytic_area=true;
			
		}
		if(resp_data.total_campaign_count>0)
			{
				datas.add_new_image_project_button=false;
				datas.sort_analytic_area=true;
				datas.pro_msg="Projects found";
				datas.pro_sub_msg="Try adjusting your search to find what you're looking for.";

				if(datas.campaigns.length==0)
				{
				datas.pro_msg="No projects found";
				datas.pro_sub_msg="Try adjusting your search to find what you're looking for.";
				}
				else{
					datas.pro_msg="Projects found";
					datas.pro_sub_msg="";
				}
			}
			else
			{
				datas.add_new_image_project_button=true;
				datas.sort_analytic_area=false;
				datas.pro_msg="Create your first project";
				datas.pro_sub_msg="Build an AR Experience to bring your ideas to life.";
			}
		 $('.VuePagination').show();
		datas.page_load=true;
		datas.campaign_loader=false;
		datas.total_image_campaign=resp_data.total_campaign_count;
		datas.total_campaign_count_user=resp_data.total_campaign_count_user;
		
		
		set_sort_analytic_area();
    });
  }
 function set_sort_analytic_area()
 {
	 // console.log(datas.campaign_category);
	switch(datas.campaign_category)
	{
		case 1:datas.total_image_campaign>0?datas.sort_analytic_area=true:datas.sort_analytic_area=false;break;
		case 2:datas.total_ground_campaign>0?datas.sort_analytic_area=true:datas.sort_analytic_area=false;break;
	}
 }
 /*******************List Campaign*********************/ 
 
 /*******************List Favorite Campaign*********************/ 
 function list_favorite_campaign()
  {
	datas.fav_campaign_loader=true;
	// alert("jj");
	datas.list_fav_campaign_request!=null?datas.list_fav_campaign_request.abort():null;
	datas.list_fav_campaign_request= $.post(base_url+"campaign/list_ground_campaign",
    {
		campaign_count_limit:datas.campaign_count_limit,
		campaign_image_page_number:datas.campaign_image_page_number,
		campaign_search:datas.search_campaign,
		sort_type:datas.sort_type,
    },
    function(data,status){
     var resp_data=JSON.parse(data);
		if(resp_data.status)
		{
			
			// datas.no_of_fav_records=datas.favorite_campaigns.length;
			datas.no_of_fav_records=resp_data.total_campaign_count;
			datas.favorite_campaigns=resp_data.data;
			
		}
		else
		{
			
			datas.no_of_fav_records=0;
			datas.favorite_campaigns=[];
			
		}
		
		if(resp_data.total_campaign_count>0)
			{
				datas.add_new_ground_project_button=false;
				datas.sort_analytic_area=true;
				if(datas.favorite_campaigns.length==0)
				{
				datas.pro_gnd_msg="No projects found";
				datas.pro_gnd_sub_msg="Try adjusting your search to find what you're looking for.";
				}
				else{
					datas.pro_gnd_msg="Projects found";
					datas.pro_gnd_sub_msg="";
				}
			}
			else
			{
				datas.add_new_ground_project_button=true;
				datas.sort_analytic_area=false;
				datas.pro_gnd_msg="Create your first project";
				datas.pro_gnd_sub_msg="Build an AR Experience to bring your ideas to life.";
			}
			datas.total_ground_campaign=resp_data.total_campaign_count;

		datas.page_load=true;
		datas.fav_campaign_loader=false;
		datas.total_ground_campaign=resp_data.total_campaign_count;
		datas.total_campaign_count_user=resp_data.total_campaign_count_user;
			
			set_sort_analytic_area();
			// datas.fav_campaign_loader=false;
    });
  } 
  /*******************List Favorite Campaign*********************/  
  
   /******************* Add favorite*********************/ 
 function add_favorite(favorite_status,campaign_id)
  {
	var base_url="http://localhost/unitear_current_website/";
	 if(campaign_id=="" || campaign_id==null)
	 {
		 return;
	 }
	  $.post(base_url+"campaign/add_favorite",
    {
		favorite_status:favorite_status,
		campaign_id:campaign_id
    },
    function(data,status){
     var resp_data=JSON.parse(data);
	 if(resp_data.status)
		 {
			list_campaign();
			list_favorite_campaign();
			
		 }
    });
  } 
  /******************* Add favorite*********************/ 
/******************* Add Campaign*********************/ 
async function add_campaign_old()
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

 
/******************* Add Campaign*********************/
async function add_campaign(target_category_id) {
	datas.target_files = [];
	
	
    return new Promise(function(resolve, reject) {
        //setTimeout(() => resolve("done!"), 1000)
        // $.post(base_url + "campaign/create_campaign/1", { target_category_id: target_category_id },
        $.post(base_url + "artarget/start_campaign_webar/", { target_category_id: target_category_id },
            function(data, status) {
                var resp_data = JSON.parse(data);
                if (resp_data.status) {
                    datas.campaign_msg_status = true;
                    datas.current_campaign_id = resp_data.data.campaign_id;
                    datas.current_campaign_name = resp_data.data.campaign_name;
                    datas.campaign_first_name = resp_data.data.campaign_name;
                    // location.href = base_url + "editor/webar-editor";
					if(target_category_id==1)
					{
						if(datas.profile.user_version==1)
												{
													location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor/";	
												}
												else
												{
												
														if(detect_mob())
														{
															location.href="https://unitear-node-html.ibosoninnovations.com/unitear-image-based-mobile-editor/";	
														}
														else
														{
															location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor2/";	

														}


												}
					}
					else
					{
						
						if(detect_mob())
						{
							location.href="https://unitear-node-html.ibosoninnovations.com/unitear-webar-mobile-editor/";	
						}
						else
						{
							location.href="https://unitear-node-html.ibosoninnovations.com/webar-editor/";	

						}
					}

				}
				else{
					datas.package_error_modal=true;	
					datas.add_new_project_modal=false;
				}
                resolve("done!")
            });
    });
}
/******************* Add Campaign*********************/
/******************* Check app factory Status*********************/
function check_app_factory_status()
{
	$.post(base_url+"App_factory_api/check_app_factory_access",
    {
    },
    function(data,status){
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
    });
}
/******************* Check app factory Status*******************/
/******************* Check app factory Status*******************/
/******************* Check app factory Status*******************/


//code added by Vishnu M R

function check_whether_scan_limit_exceeded()
{
	$.post(base_url+"campaign/check_whether_scan_limit_exceeded",
	{
	},
	function(data,status){
		// console.log(data);
		var resp_data=JSON.parse(data);
		// console.log(resp_data);
		if(resp_data.status)
		{
			var user_data=resp_data.data;
			if(user_data !=null)
			{
				if(parseInt(user_data.scan_in_account) <= parseInt(user_data.current_scan_count))
				{
					if(parseInt(user_data.user_type) == 1)
					{
						datas.show_scan_count_limit_data="Your package limit has finished. Please upgrade your plan or purchase additional views";
					}
					else
					{
						datas.show_scan_count_limit_data="Your Free Trial has expired. Please upgrade your plan";
					}
					datas.show_scan_count_limit_exceeded=true;
				}
				else
				{
					datas.show_scan_count_limit_exceeded=false;
				}
			}
			else
			{
				datas.show_scan_count_limit_exceeded=false;
			}
		}
	});
}

//code added by Vishnu M R


function detect_mob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
/******************* Check app factory Status*******************/