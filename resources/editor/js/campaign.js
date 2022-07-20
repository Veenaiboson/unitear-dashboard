$(document).ready(function(){
  
  
  var base_url="http://localhost/unitear_current_website/";
  $(".add_campaign").click(function(){
    add_campaign().then(function(){list_campaign();list_favorite_campaign();});
	
	
  });
  
 $("#tab-search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
	
    $(".single-item").filter(function() {
		
      $(this).toggle($(this).find('.box-bottom').text().toLowerCase().indexOf(value) > -1);
	  
    });
  });

 //Pagination
	
   
   

});
var base_url="http://localhost/unitear_current_website/";
  /***************Add Campaign********************/
  
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
			 datas.current_campaign_id=resp_data.data.campaign_id;
			 $("#campaign_name").val(resp_data.data.campaign_name);
			 
			 $('#myModal').modal('show');
			 
		 }
		 resolve("done!")
    });
  });

 
	  
	
  }
  /***************Add Campaign********************/
  
   /***************List Campaign********************/
   function list_campaign()
  {
	  $.post(base_url+"campaign/list_campaign",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
	 var campaign_list_text="";
	 var fav_image=""
	 var data_status="";
	 if(resp_data.status)
		 {
			 var campaign_array=resp_data.data;
			$("#campaign_list").html("");
			 for(i=0;i<campaign_array.length;i++)
			 {
				 if(campaign_array[i].favorite_status=="1")
				 {
					fav_image=base_url+'resources/editor/images/i-5.svg';
				 }
				 else
				 {
					 
					fav_image=base_url+'resources/editor/images/i-6.svg';
				 }
				 campaign_list_text='<div class="col-sm-4 single-item"><div class="box-outer mt-5"><div class="box "><img src="'+base_url+'resources/editor/images/upload.jpg" class="img-fluid box-img"><div class="overlay-box"><a href="'+base_url+campaign_array[i].campaign_id+'" class="box-link">View Project</a><div class="dropdown2"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class=""><img src="'+base_url+'resources/editor/images/i-4.svg" alt=""></i></button><ul class="dropdown-menu"><li><a href="#">Value 1</a></l><li><a href="#">Value 2</a></li><li><a href="#">Value 3</a></li></ul></div></div><div class="eye"><span><i class="far fa-eye"></i> 12</span></div></div><div class="box-bottom"><p>'+campaign_array[i].campaign_name+'<span class="fav-hover" style="float:right"><i class="fav" onclick="add_favorite('+campaign_array[i].favorite_status+','+campaign_array[i].campaign_id+');"><img src="'+fav_image+'" alt=""></i></span></p><div class="clearfix"></div><span>'+campaign_array[i].campaign_date+'</span></div></div></div>';
				 $("#campaign_list").append(campaign_list_text);
			 }
			 
			 
		 }
		 else{
			 $("#campaign_list").html("");
		 }
    });
  }
/***************List Campaign********************/

  /***************List Campaign********************/
   function list_favorite_campaign()
  {
	  $.post(base_url+"campaign/list_favorite_campaign",
    {
    },
    function(data,status){
     var resp_data=JSON.parse(data);
	 var favorite_campaign_list_text="";
	 var fav_image=""
	 var data_status="";
	 if(resp_data.status)
		 {
			 var campaign_array=resp_data.data;
			$("#campaign_favorite_list").html("");
			 for(i=0;i<campaign_array.length;i++)
			 {
				 if(campaign_array[i].favorite_status=="1")
				 {
					fav_image=base_url+'resources/editor/images/i-5.svg';
				 }
				 else
				 {
					 
					fav_image=base_url+'resources/editor/images/i-6.svg';
				 }
				
				 favorite_campaign_list_text='<div class="col-sm-4 single-item1"><div class="box-outer mt-5"><div class="box "><img src="'+base_url+'resources/editor/images/upload.jpg" class="img-fluid box-img"><div class="overlay-box"><a href="'+base_url+campaign_array[i].campaign_id+'" class="box-link">View Project</a><div class="dropdown2"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class=""><img src="'+base_url+'resources/editor/images/i-4.svg" alt=""></i></button><ul class="dropdown-menu"><li><a href="#">Value 1</a></l><li><a href="#">Value 2</a></li><li><a href="#">Value 3</a></li></ul></div></div><div class="eye"><span><i class="far fa-eye"></i> 12</span></div></div><div class="box-bottom"><p>'+campaign_array[i].campaign_name+'<span class="fav-hover" style="float:right"><i class="fav" onclick="add_favorite('+campaign_array[i].favorite_status+','+campaign_array[i].campaign_id+');"><img src="'+fav_image+'" alt=""></i></span></p><div class="clearfix"></div><span>'+campaign_array[i].campaign_date+'</span></div></div></div>';
				 $("#campaign_favorite_list").append(favorite_campaign_list_text);
			 }
			 
			 
		 }
		 else{
			 $("#campaign_favorite_list").html("");
		 }
    });
  }
/***************List Campaign********************/

  /****************Add Favorite********************/

  
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
			$(".page_container").pagify(6, ".single-item");
			$(".page_container1").pagify(6, ".single-item1");
		 }
    });
  }

  /**************************Pagination*************/

	//Pagination

  
  
  
  
  
  
  
