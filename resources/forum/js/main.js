  $(document).ready(function() {
      $("#myModal").click(function() {
          console.log("jkl");
          document.querySelector('#video-play1').pause();
      });
  });

  function includeHTML() {

      var z, i, elmnt, file, xhttp;
      /*loop through a collection of all HTML elements:*/
      z = document.getElementsByTagName("*");
      for (i = 0; i < z.length; i++) {
          elmnt = z[i];
          /*search for elements with a certain atrribute:*/
          file = elmnt.getAttribute("w3-include-html");
          if (file) {
              /*make an HTTP request using the attribute value as the file name:*/
              xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                  if (this.readyState == 4) {
                      if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                      if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                      /*remove the attribute, and call this function once more:*/
                      elmnt.removeAttribute("w3-include-html");
                      includeHTML();
                  }
              }
              xhttp.open("GET", file, true);
              xhttp.send();
              /*exit the function:*/
              return;
          }
      }
  };



  $(document).ready(function() {
      // $(".nav-icon").click(function(){
      $('body').on('click', '.nav-icon', function() {
          console.log("hhh");
          $(".unite-tab-item").css("bottom", "0", 500);
          $(".unite-tab-item").css("top", "0", 1000);
          $(".unite-tab-item").css("display", "block", 500);
          $(".ul  a").css("opacity", "1", 2000);
      });
  });
  $(document).ready(function() {
      // $(".unite-nav-close").click(function(){
      $('body').on('click', '.unite-nav-close', function() {
          $(".unite-tab-item").css("bottom", "", 500);
          $(".unite-tab-item").css("top", "-100%", 1000);
          $(".unite-tab-item").css("display", "none", 500);
          $(".ul  a").css("opacity", "0", 2000);


      });
  });
  // var addX=-336,addY=-10;




  // $(function() {
  //     $(window).on("scroll", function() {
  //         if($(window).scrollTop() > 10) {
  //             $(".header").addClass("white");
  //         } else {
  //             //remove the background property so it comes transparent again (defined in your css)
  //            $(".header").removeClass("white");
  //         }
  //     });
  // });


  // window.onload = function(){ document.getElementById("preloader").style.display = "none" }