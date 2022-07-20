

$('.form-input').each(function(){
   if($(this).val()!=""){
       $(this).find("label").css("top","-12px");
    }
 });












var arid;
$(document).ready(function() {
     
  $(".add-element").draggable({
    //  use a helper-clone that is append to "body" so is not "contained" by a pane
  
    helper: function() {
      console.log(this.id);
       arid = this.id;
       $(".ar-co").css("display","none");
      $("#drag").addClass("drag-enter");
      return $(this).clone().removeClass("add-element").appendTo(".drag-target").css({
        "zIndex": 5
      }).show();
    },
    cursor: "move",
    containment: "document"
  });

  $(".drag-target, .drag-target *").droppable({
    accept: ".add-element",
    drop: function(event, ui) { 
        
        
      if (!ui.draggable.hasClass("dropped"))
        $(this).append($(ui.draggable).clone().removeClass("ui-draggable").removeClass("dropped"));
        $(".drag-target .add-element").css("display","none");
        $("#drag").removeClass("drag-enter");
         
         var box1 = "box1";
         var box2 = "box2";
         var box3 = "box3";
         var box4 = "box4";
         var box5 = "box5";
         var box6 = "box6";

        if (arid == box1 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co1").css("display","block");
						$(".property").css("display","none");
						$("#box1").addClass("e-active");
						$(".property").css("display","none");
        }
        else  if (arid == box2 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co2").css("display","block");
						$(".property").css("display","none");
						$("#box2").addClass("e-active");
						$(".property").css("display","none");
        }
        else  if (arid == box3 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co3").css("display","block");
						$(".property").css("display","none");
						$("#box3").addClass("e-active");
						$(".property").css("display","none");
        }
        else  if (arid == box4 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co4").css("display","block")
            $(".property").css("display","none");
						$("#btn-pro").css("display","block");
						$(".e-load").removeClass("e-active");
	        	$("#box4").addClass("e-active");
        }
        else  if (arid == box5 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co5").css("display","block");
						$(".property").css("display","none");
						$("#box5").addClass("e-active");
						$(".property").css("display","none");
        }
        else  if (arid == box6 ) {
            console.log("worked");
            $(".ar-co").css("display","none");
            $("#ar-co6").css("display","block");
						$(".property").css("display","none");
						$("#box6").addClass("e-active");
						$(".property").css("display","none");
        }
        
        else{
            console.log("not");
        }
    }
  }).sortable({
    placeholder: "sort-placer",
    cursor: "move",
    helper: function (evt, ui) {
      return $(ui).clone().appendTo(".drag-target").show();
    }
  });
});




$(document).ready(function(){   
	$("#box1").click(function(){
			console.log("gg");
			$(".ar-co").css("display","none");
		$("#ar-co1").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box1").addClass("e-active");
		$(".property").css("display","none");
	});
	$("#box2").click(function(){
			$(".ar-co").css("display","none");
		$("#ar-co2").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box2").addClass("e-active");
		$(".property").css("display","none");
	});
	$("#box3").click(function(){
			$(".ar-co").css("display","none");
		$("#ar-co3").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box3").addClass("e-active");
		$(".property").css("display","none");
	});
	$("#box4").click(function(){
			$(".ar-co").css("display","none");
		$("#ar-co4").css("display","block");
		$(".property").css("display","none");
		$("#btn-pro").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box4").addClass("e-active");
	
	});
	$("#box5").click(function(){
			$(".ar-co").css("display","none");
		$("#ar-co5").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box5").addClass("e-active");
		$(".property").css("display","none");
	});
	$("#box6").click(function(){
			$(".ar-co").css("display","none");
		$("#ar-co6").css("display","block");
		$(".e-load").removeClass("e-active");
		$("#box6").addClass("e-active");
		$(".property").css("display","none");
	});
	});












$(document).ready(function(){   
	$(".drt").click(function(){
	
			$(".e-load").animate({width: '60px', transition: 'all .2s ease-out'}, "400");
			$(".e-headleft").animate({width: '70px', transition: 'all .2s ease-out'}, "400");
			
			$(".e-sec").removeClass("e-sec-left", 1500);
			$(".menu-p").removeClass("d-see");
		
		$(".help-header").toggleClass("help-header2");
		
		// $(".e-sec").toggleClass("sec-width");
		
		
	});
});


$(document).ready(function(){   
	$(".menu-bar").click(function(){
		// $(".help-header").removeClass("help-header2");
		// $(".e-load").toggleClass("menu-width");
		// $(".e-headleft").toggleClass("sec-width");
		
		// $(".e-sec").toggleClass("e-sec-left");
		// $(".menu-p").toggleClass("d-see");
		// $(".menu-p").toggleClass("d-see", "3000");
		// $(".e-sec").toggleClass("sec-width");
		
		var x = $(".e-headleft").width();
		// var x = document.getElementsByClassName("e-headleft");
		      y=70;
		console.log(x);
		console.log(y);
    if (x === y) {

			console.log("ghgh");
			$(".help-header").removeClass("help-header2");
		$(".e-load").animate({width: '210px', transition: 'all .2s ease-out'}, "400");
		$(".e-headleft").animate({width: '200px'}, "400");
		
		$(".e-sec").toggleClass("e-sec-left",400);
		$(".menu-p").addClass("d-see");
		$(".menu-p").animate({display: 'block',opacity:'1'}, "11000");
			

    } else {
			console.log("gg");
			$(".help-header").removeClass("help-header2");
			$(".e-load").animate({width: '60px', transition: 'all .2s ease-out'}, "400");
			$(".e-headleft").animate({width: '70px', transition: 'all .2s ease-out'}, "400");
			
			$(".e-sec").toggleClass("e-sec-left", 1500);
			$(".menu-p").removeClass("d-see");
			$(".menu-p").animate({display: 'none',opacity:'0', transition: 'all .2s ease-out'}, "2000");
    }
		
	});
});
// $(document).ready(function(){   
// 	$(".e-load").mouseenter(function(){

// 		$(".menu-item ul li").toggleClass("menu-hover");
// 		// $(".e-sec").toggleClass("sec-width");
		
		
// 	});
// });


$(function() {
    $("#allFacets, #userFacets").sortable({
      connectWith: "ul",
      placeholder: "placeholder",
      delay: 150
    })
    .disableSelection()
    // .dblclick( function(e){
    //   var item = e.target;
    //   if (e.currentTarget.id === 'allFacets') {
    //     //move from all to user
    //     $(item).fadeOut('fast', function() {
    //       $(item).appendTo($('#userFacets')).fadeIn('slow');
    //     });
    //   } else {
    //     //move from user to all
    //     $(item).fadeOut('fast', function() {
    //       $(item).appendTo($('#allFacets')).fadeIn('slow');
    //     });
    //   }
    // });
	});
	


//  $(document).ready(function(){   
// 	$(".head-layer").click(function(){

// 		$(".head-layer").css("display","none");
//  $(".project-border").addClass("add-pborder");
		
// 	});
// });

$(document).ready(function(){   
	$(".project-name").click(function(){

		// $(".head-layer").css("display","block");
		$(".project-name").addClass("head-border");
		$(".project-border").addClass("add-pborder");
	});
});

$(document).ready(function(){   
	$(".project-name").blur(function(){

		// $(".head-layer").css("display","block");
		$(".project-name").removeClass("head-border");
		$(".project-border").removeClass("add-pborder");
	});
});


// $(document).ready(function(){   
// 	$("div:not(.head-layer)").click(function(){

// 		if($('.head-layer').css('display') == 'none')
// 			{
// 				$(".head-layer").css("display","block");
// 		$(".project-name").removeClass("head-border");
// 			}


		
		
// 	});
// });


	var initialOpen = true;
	var blip = document.querySelector('.blip')
	var button = document.querySelector('button');
	var notification = document.querySelector('.notification');
	var close = document.querySelector('.close');
	// var image = document.querySelector('.profile-img');
	var text = document.querySelector('.text')
	
	function toggleNotification() {
		if (initialOpen) {
			initialOpen = false;
			blip.classList.add('hide')
		}
		
		if (notification.classList.contains('open')) {
			// image.classList.toggle('show');
			text.classList.toggle('show');
			
			setTimeout(function() {
				notification.classList.toggle('open');
			}, 50)
		} else {
			notification.classList.toggle('open');
	
			setTimeout(function() {
				// image.classList.toggle('show');
				text.classList.toggle('show');
			}, 150)
		}
	}
	
	// button.addEventListener('click', toggleNotification);
	// close.addEventListener('click', toggleNotification);
	











var $element = $('input[type="range"]');
var $output = $('output');

function updateOutput(el, val) {
  el.textContent = val;
}

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      updateOutput($output[0], this.value);
    }
  })
  .on('input', function() {
    updateOutput($output[0], this.value);
  });



