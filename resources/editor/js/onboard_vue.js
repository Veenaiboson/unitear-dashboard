$(document).ready(function(){
  
  
	var base_url=base_url;
	$(".add_campaign").click(function(){
	 // add_campaign().then(function(){list_campaign();list_favorite_campaign();});
	  add_campaign();
	  
	});
	
   
   
  });
  
  
  
  var datas = {
	  
	  
	  profile: {
		  user_version:2
	  },
	  business_company_name_error:"",
	  business_website_error:"",
	  education_website_error:"",
	  website:"",
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
	  no_of_notification_records:0,
	  new_project_modal:false,
	  create_profile_tab:"active",
	  start_augment_tab:"fade",
	  fnished_onboard_check:false,
	  
	  //code added by Vishnu M R
	  profile_purpose:"",
	  profile_category:"",
	  profile_demo_status:"",
	  profile_purpose_error:"",
	  profile_category_error:"",
	  profile_demo_status_error:"",
	  profile_company_name:"",
	  profile_company_name_error:"",
	  profile_website:"",
	  profile_website_error:"",
	  profile_demo_link_button:false,
	  profile_demo_link_button_error:"",
	  profile_customer_industry:"",
	  profile_customer_industry_error:"",
	  profile_customer_industry_div:false,
	  profile_company_size:"",
	  profile_company_size_error:"",
	  //code added by Vishnu M R
	}
  
  //push the object to your array
  
  app = new Vue({
	el: '#app',
	data:datas,
	computed:
			  {
			  },
	  mounted:function(){
				 // console.log("mounted");
				localStorage.campaign_category=1;

				  this.profile_setting_category_template=this.profile_category_business;
				  
				  //code added by Vishnu M R
				  this.initialize_value();
				  //code added by Vishnu M R
			  },
	  created:function(){
				 // console.log("created");
				  
			  },	
	  components: {
		  'vueSlider': window['vue-slider-component'],
  
	  },		
	methods :
	
			  {
				  add_webar_campaign(category_id)
			  {
				  add_campaign(category_id);
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
				  validation(field_name,field_value,min_length,max_length)
				  {
					  switch(field_name)
					  {
						  case "website":
						  {
							  webiste_validation(field_name,field_value,min_length,max_length);
										  break;
						  }
						  case "name":
						  {
							  webiste_validation(field_name,field_value,min_length,max_length);
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
									  
									  //datas.profile=resp_data.data;
									  app.skip_to_next('home','menu2');
								  }
								  else
								  {
									  
								  }
							  });
				  },
				  
				  //code added by Vishnu M R
				  
					save_profile_data()
					{
						update_status=1;
						// console.log(datas.profile_purpose);
						if(datas.profile_purpose == "")
						{
							update_status=0;
							datas.profile_purpose_error="Please select a Industry.";
						}
						else
						{
							datas.profile_purpose_error="";
							
							if(parseInt(datas.profile_purpose) == 16)
							{
								datas.profile_customer_industry=datas.profile_customer_industry.trim();
								if(!datas.profile_customer_industry)
								{
									update_status=0;
									datas.profile_customer_industry_error="Please fill your Industry name.";
								}
								else
								{
									datas.profile_customer_industry_error="";
								}
							}
						}
						
						datas.profile_company_name=datas.profile_company_name.trim();
						if(!datas.profile_company_name)
						{
							update_status=0;
							datas.profile_company_name_error="Please fill Company name.";
						}
						else
						{
							datas.profile_company_name_error="";
						}
						
						if(datas.profile_company_size == "")
						{
							update_status=0;
							datas.profile_company_size_error="Please select Company size.";
						}
						else
						{
							datas.profile_company_size_error="";
						}
						
						//code commented by Vishnu M R 2021-01-12
						/* if(datas.profile_category == "")
						{
							update_status=0;
							datas.profile_category_error="Please select a Role.";
						}
						else
						{
							disabled_options = $('#profile_category_id option:disabled').map(function(i,v) {
								return this.value;
							}).get(); 
							// console.log(disabled_options);
							if(disabled_options.length > 0)
							{
								// console.log(datas.profile_category);
								if(disabled_options.includes(datas.profile_category))
								{
									update_status=0;
									datas.profile_category_error="Role doesnot belong to selected Industry.";
								}
								else
								{
								  datas.profile_category_error="";
								}
							}
							else
							{
								datas.profile_category_error="";
							}
						} */
						//code commented by Vishnu M R 2021-01-12
						
						//code commented by Vishnu M R 2021-02-08
						/* if(datas.profile_demo_status == "")
						{
							update_status=0;
							datas.profile_demo_status_error="Please select your choice.";
						}
						else
						{
							datas.profile_demo_status_error="";
						} */
						//code commented by Vishnu M R 2021-02-08
						
						// console.log(update_status);
						if(update_status == 1)
						{
							$('#spinner').removeClass("d-none");
							$.post(base_url+"editor/save_profile_data",
							{
								profile_purpose:datas.profile_purpose,
								profile_customer_industry:datas.profile_customer_industry,
								profile_category:datas.profile_category,
								profile_demo_status:datas.profile_demo_status,
								profile_company_name:datas.profile_company_name,
								profile_website:datas.profile_website,
								profile_company_size:datas.profile_company_size,
							},
							function(data,status){
								resp_data=JSON.parse(data);
								// console.log(resp_data);
								if(resp_data.status)
								{	
									//code commented by Vishnu M R 2021-02-08
									/* datas.profile=resp_data.data;
									app.skip_to_next('home','menu2');
									
									datas.fnished_onboard_check=true;
									// console.log(base_url+"editor/index/1");
									location.href=base_url+"editor/index/1"; */
									//code commented by Vishnu M R 2021-02-08
									
									$("#onboard_form").submit();
								}
								else
								{
									$('#spinner').addClass("d-none");
								}
							});
						}
					},
					initialize_value:function()
					{
						profile_data_parsed=JSON.parse(profile_data);
						if(profile_data_parsed != null)
						{	
							datas.profile_purpose=profile_data_parsed.user_profile_industry_id;
							
							if(parseInt(datas.profile_purpose) == 16) //Others
							{
								datas.profile_customer_industry=profile_data_parsed.user_profile_customer_industry;
								datas.profile_customer_industry_div=true;
							}
							
							datas.profile_company_name=profile_data_parsed.user_profile_company_name;
							datas.profile_company_size=profile_data_parsed.user_profile_company_size;
							
							datas.profile_demo_status=profile_data_parsed.user_profile_demo_status; 
							datas.profile_category=profile_data_parsed.user_profile_role_id;
							datas.profile_website=profile_data_parsed.user_profile_website;
							
							//code commented by Vishnu M R 2021-01-12
							/* this.disable_options();
							this.demo_button_data(); */
							//code commented by Vishnu M R 2021-01-12
						}
					},
					disable_options:function()
					{
						options = $('#profile_category_id option');
						if(parseInt(datas.profile_purpose) == 9) //checking whether purpose of user is "School or University"
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
					demo_button_data:function()
					{
						// console.log(datas.profile_demo_status);
						if(parseInt(datas.profile_demo_status) == 1)
						{
							datas.profile_demo_link_button=true;
						}
						else
						{
							datas.profile_demo_link_button=false;
						}
					},
					book_your_demo:function()
					{
						if(parseInt(datas.profile_purpose))
						{
							datas.profile_demo_link_button_error="";
							// console.log(parseInt(datas.profile_purpose));
							if(parseInt(datas.profile_purpose) == 9) 	//if industry is "School or University"
							{
								window.open('https://calendly.com/rishikeshv/15min','_blank');
							}
							else
							{
								window.open('https://calendly.com/vineetha/15-minute','_blank');
							}
						}
						else
						{
							datas.profile_demo_link_button_error="Please select a Industry to book your demo.";
						}
					},
				  
				  //code added by Vishnu M R
				  
				  
				  skip_to_next(from_tab,to_tab)
				  {
					  datas.fnished_onboard_check=true;
					  $("."+from_tab).removeClass('active');
					  $("#"+from_tab).removeClass('active');
					  
					  
					  $("#"+from_tab).addClass('fade');
					  
					  
					  $("."+to_tab).addClass('active');
					  $("#"+to_tab).removeClass('fade');
					  $("#"+to_tab).addClass('active');
				  }
				  
			  } ,
		
  })
   
   
	check_trial_expiry();
   get_profile();
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
  
   function webiste_validation(field_name,field_value,min_length,max_length)
   {
	   // console.log(datas.profile_setting_category);
								  var patt = RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
											  
											  if(patt.test(field_value))
											  {
												  // console.log(field_value);
												  switch(datas.profile_setting_category)
														  {
														  case "business":datas.business_website_error="";break;	
														  case "education":datas.education_website_error="";break;	
														  }
												  
											  }
											  else
											  {
												  switch(datas.profile_setting_category)
														  {
														  case "business":datas.business_website_error="Please enter a valid website address";break;	
														  case "education":datas.education_website_error="Please enter a valid website address";break;	
														  }
												  
												  
											  }									
											  
	   
   }
  
   function get_profile()
	{
		$.post(base_url+"profile/get_profile",
	  {
	  },
	  function(data,status){
	   var resp_data=JSON.parse(data);
		  if(resp_data.status)
		  {
			  
			  datas.profile=resp_data.data;
			  if(datas.profile.user_version==1)
			  {
				  datas.show_new_feature_info_modal=true;
			  }
			  else{
			  datas.show_new_feature_info_modal=false;
			  }
		  }
		  else
		  {
			  
		  }
	  });
	}
   /******************* Add Campaign*********************/
  async function add_campaign(target_category_id) {
	  datas.target_files = [];
	  return new Promise(function(resolve, reject) {
		  //setTimeout(() => resolve("done!"), 1000)
		  // $.post(base_url + "campaign/create_campaign/1", { target_category_id: target_category_id },
		  $.ajax({
			url: base_urls_8097+"artarget/start-campaign-webar/",
			type: "POST",
			headers: {
			  'Authorization': localStorage.getItem('token')
			},
			data: JSON.stringify({target_category_id: target_category_id}),
			success: function(data, status) { 
		 
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
								location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor2/";	
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
				  resolve("done!")
			  }});
	  });
  }
  /******************* Add Campaign*********************/
  
  
  /******************* Check app factory Status*******************/
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
  