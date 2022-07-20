$(document).ready(function() {
    $('.input-text').focus(function() {
        $(this).parents('.form-group').addClass('focused');
        console.log("2");
    });

    $('.input-text').blur(function() {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    })
    $('.user').click(function() {
        $(".my-noty").removeClass("menu-dropdown");
        $(".my-menu").toggleClass("menu-dropdown");

    });
    $('.noty').click(function() {
        $(".my-noty").toggleClass("menu-dropdown");
        $(".my-menu").removeClass("menu-dropdown");

    });
    $(".help-start").click(function() {
        $(".help-tuto").css("display", "block")
    });
    $(".help-q img").click(function() {
        $(".help-tuto").css("display", "none");
    });
    // $(".help-tuto").mouseleave(function() {
    //     $(".help-tuto").hide();
    // });

    // $(".help-start").mouseleave(function() {
    //     $(".help-tuto").hide();
    // });

    $('.input-s').focus(function() {
        console.log("d");
        $(".line-line").addClass("ool");


    });
    $('.input-s').blur(function() {
        console.log("d");
        $(".line-line").removeClass("ool");


    });
    $(".select-item").click(function() {
        var x = "Both Image & Ground AR",
            x = $(this).text();
        console.log(x)

        $("#selected-option").text(x);
    });
});
$(document).ready(function() {
    $('a[data-toggle="tab "]').on('show.bs.tab', function(e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        $('#myTab a[href=" ' + activeTab + ' "]').tab('show');
    }
});
/*
var app = new Vue({
    el: '#app',
    data: {
        newProject: false,
        viewCount: false,
        value: 3000,
        updateName: false,
        profileSettings: false,
        profileCategory: 'busi',
        settings: false,
        delete1: true,
    },

    components: {
        'vueSlider': window['vue-slider-component'],

    }

})*/