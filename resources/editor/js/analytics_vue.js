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

	team_home:true,
    invite_people:false,
    team_members:false,
    member_delete:false,
	storage_limit:false,
	rollTab:false,
	create_roll:false,
	member_remove:false,
	invitation_sent:false,
	invite_cancel:false,
	Edit_roll:false,

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
	components: {
        'vueSlider': window['vue-slider-component'],

    },		
  methods :
  
  
			{
				
				check_app_factory_access()
				{
					check_app_factory_status();
				},
				add_webar_campaign(category_id)
					{
						add_campaign(category_id);
					},
				scan_details_chart_vue(chart_type,date,target_category,option_value)
				{
					datas.target_category_id=target_category;
					get_last_seven_day_scan();
					datas.selected_scans_option=option_value;
					$('#demo').removeClass("show");
					scan_details_chart(chart_type,date,target_category);//global function
				},
				allTeamClose()
				{
					datas.team_home=false;
					datas.invite_people=false;
					datas.team_members=false;
					datas.member_delete=false;
					datas.storage_limit=false;
					datas.rollTab=false;
				  },
				delete_notification:function(id)
				{
					
						$.ajax({
										url: base_urls+"notification/"+id,
										type: "DELETE",
										headers: {
											'Authorization': localStorage.getItem('token')
										},
										data: {},
										success: function(data, status) {  
											var resp_data=data;
											if(resp_data.status)
												{
												   list_notification();
												}
												
										},
										error:function(data, status) {  
											console.log(data)     
										},
								})
				},
			} ,
  	
})
 
  check_trial_expiry();
  get_profile();
  list_notification();
  setInterval(function(){ list_notification(); }, 3000);

  
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
		url: base_urls+"notification/",
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

				datas.profile=resp_data.data;
		
			} else {

			}
		},
		error:function(data, status) {  
			console.log("error");
		},
	})
  }


 
/******************* Add Campaign*********************/
async function add_campaign(target_category_id) {
    datas.target_files = [];
    return new Promise(function(resolve, reject) {
        //setTimeout(() => resolve("done!"), 1000)
        // $.post(base_url + "campaign/create_campaign/1", { target_category_id: target_category_id },
		$.ajax({
			url: base_urls+"artarget/start-campaign-webar/",
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
							// location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor/";	
						}
						else
						{
							// location.href="https://unitear-node-html.ibosoninnovations.com/unitear-editor2/";	
						}
					}
					else
					{
						if(detect_mob())
						{
							// location.href="https://unitear-node-html.ibosoninnovations.com/unitear-webar-mobile-editor/";	
						}
						else
						{
							// location.href="https://unitear-node-html.ibosoninnovations.com/webar-editor/";	
						}
					}
                }
                resolve("done!")
            }});
    });
}
/******************* Add Campaign*********************/
 /******************* Check app factory Status*********************/
function check_app_factory_status()
{
	$.ajax({
		url: base_urls+"app-factory/check-app-factory-access",
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

