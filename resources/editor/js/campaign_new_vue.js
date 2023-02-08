
$(document).ready(function() {
    jQuery.ajaxSetup({ async: true });
    $('[data-toggle="tooltip"]').tooltip();
    // var base_url='http://localhost/unitear-editor-live/';
    var base_url = base_url;
    var baseURL = baseURL
    var base_urls_8088 = base_urls_8088;
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
        user_version: 2
    },
    favorite_campaigns: [],
    filter_campaign: [],
    target_files: [],
    page: 1,
    per_page: 4,
    page_fav: 1,
    per_page_fav: 4,
    search_campaign: "",
    no_of_records: 0,
    no_of_fav_records: 0,
    sort_type: "Sort by date descending",
    show_target_upload_modal: false,
    show_delete_campaign_modal: false,
    show_delete_target_modal: false,
    show_target_upload_modal_class: "my-modal-display-hide",
    show_delete_campaign_modal_class: "my-modal-display-hide",
    show_delete_target_modal_class: "my-modal-display-hide",
    delete_campaign_id: 0,
    delete_target_id: 0,
    current_campaign_id: "",
    current_campaign_name: "",
    campaign_first_name: "",
    campaign_view_url: "view_campaign/",
    campaign_msg_status: true,
    notification: [],
    notification_read_status: false,
    no_of_notification_records: 0,
    read_entire_status: false,
    show_sort: true,
    show_search: true,
    pro_msg: "",
    pro_sub_msg: "Build an AR Experience to bring your ideas to life.",
    pro_gnd_msg: "Create your first project",
    pro_gnd_sub_msg: "Build an AR Experience to bring your ideas to life.",
    trial_expired: false,
    trial_modal: true,
    show_expiry_modal_class: "my-modal-display-hide",
    page_load: false,
    add_new_project_modal: false,
    //campaign category 1-image 2-ground
    campaign_category: 3,
    sort_analytic_area: false,
    read_count: 0,
    web_ar_experience:  "https://app.unitear.com/webscanner/",
    show_new_feature_info_modal: false,
    package_error_modal: false,
    delete_campaign_button_click: false,
    campaign_count_limit: 4,
    campaign_image_page_number: 1,
    search_flag: false,
    pagination_flag: false,
    add_new_image_project_button: false,
    add_new_image_project_button_top: true,
    add_new_ground_project_button: false,
    list_campaign_request: null,
    list_fav_campaign_request: null,
    mobile_menu: false,
    campaign_loader: true,
    fav_campaign_loader: true,
    total_image_campaign: 0,
    total_ground_campaign: 0,
    total_campaign_count_user: 0,

    //code added by Vishnu M R
    show_scan_count_limit_exceeded: false,
    show_scan_count_limit_data: "",
    embeded_webar_viewer_modal: false,
    //code added by Vishnu M R


    view_count_modal: false,
    target_image_modal: false,
    more_storage_modal: false,
    video_tuto1: false,
    // jijo 05-11-2020
    add_feature: 0,
    min_feature: 0,
    max_feature: 60000,
    selected_feature: "scans",
    feature_text: "Choose Your View Count",
    feature_sub_text: "This will add more views to your package based on your budget.",
    feature_button_text: "Views",
    feature_rate: 0.5,
    app_count_exeeded: false,
    main_loader: false,
    // jijo 05-11-2020



    // emmanual added

    video_tuto2: false,
    video_tuto3: false,
    // emmanual added

    //2021-04-21 Vishnu M R
    session_expired: false,
    video_tuto: false,
    video_link: "",
    ground_project_modal: false,
    new_campaign_name: "",
    new_campaign_name_error: "",
    new_campaign_thumbnail_file: "",
    new_campaign_thumbnail_error: "",
    new_campaign_thumbnail_preview: base_url + 'resources/editor_new/img/Réalité-augmentée-Apizee.png',
    switch_team_name: "",
    switch_team_id: 0,
    switch_team_list: [],
    user_as_team_member_status: false,
    //2021-04-21 Vishnu M R

    // emmanual added
    basic_or_advance_appfactory: true,
    // emmanual added
    // jijo added -19-11-2021
    app_factory_modal: false,
    // jijo added -19-11-2021
    ground_plane_link: base_url + "ground-based-webar/?campaign=",
    localcampaign_id:"",
    open_notification:false,
    open_profile:false
}

// Vue.component('file-upload',VueUploadComponent);

app = new Vue({
    el: '#app',

    data: datas,
    computed: {

    },
    mounted() {
        if (localStorage.campaign_category) {
            this.campaign_category = localStorage.campaign_category;
        }
        if (localStorage.basic_or_advance_appfactory) {
            this.basic_or_advance_appfactory = (localStorage.basic_or_advance_appfactory === 'true');
        }
        if (localStorage.selected_team_id) {
            this.switch_team_id = JSON.parse(localStorage.selected_team_id);console.log(localStorage.selected_team_id)
            this.switch_team_name = JSON.parse(localStorage.selected_team_name);
        }
        this.add_feature = this.min_feature + this.max_feature / 2;
        this.check_team_exists();
    },

    methods: {
        //jijo 23-11-2021
        view_advanced_app() {

            location.href = base_url + "advanced-app-factory/Editor/" + datas.current_campaign_id;
        },
        add_new_project() {
            switch (parseInt(datas.campaign_category)) {
                case 1:
                case 2:
                    app.add_webar_campaign(datas.campaign_category);
                    break;
                case 3:
                case 4:
                    app.create_app();
                    break;
            }
        },
        pay_razor() {
            razor_payment();
        },
        change_feature(feature) {
            datas.selected_feature = feature;
            datas.view_count_modal = true;
            switch (datas.selected_feature) {
                case "scans":
                    datas.max_feature = 60000;
                    datas.feature_sub_text = "This will add more views to your package based on your budget.";
                    datas.feature_button_text = "Views";
                    datas.feature_rate = 0.05;
                    datas.feature_text = "Choose Your View Count";
                    break;
                case "targets":
                    datas.max_feature = 100;
                    datas.feature_sub_text = "This will add more target images to your package based on your budget.";
                    datas.feature_button_text = "Targets";
                    datas.feature_rate = 5;
                    datas.feature_text = "Add More Target Images";
                    break;
                case "storage":
                    datas.max_feature = 2;
                    datas.feature_sub_text = "This will add more space to your package based on your budget.";
                    datas.feature_button_text = "Space";
                    datas.feature_rate = 100;
                    datas.feature_text = "Add More Storage";
                    break;
                case "android":
                    datas.max_feature = 2;
                    datas.feature_sub_text = "This will add more apps to your package based on your budget.";
                    datas.feature_button_text = "Apps";
                    datas.feature_rate = 200;
                    datas.feature_text = "Add More Android Apps";
                    break;
                case "ios":
                    datas.max_feature = 2;
                    datas.feature_sub_text = "This will add more apps to your package based on your budget.";
                    datas.feature_button_text = "Apps";
                    datas.feature_rate = 200;
                    datas.feature_text = "Add More iOS Apps";
                    break;

            }




            datas.add_feature = datas.min_feature + datas.max_feature / 2;
        },
        create_app() {
            check_app_factory_count();

        },

        check_app_factory_access() {
            check_app_factory_status();
        },
        change_project_category() {
            datas.mobile_menu ? datas.mobile_menu = false : null;
            datas.campaign_image_page_number = 1,
                datas.search_campaign = "";
            // datas.sort_type="Sort by date descending";
            datas.campaign_category = datas.campaign_category;
            localStorage.campaign_category = datas.campaign_category;
            localStorage.basic_or_advance_appfactory = datas.basic_or_advance_appfactory;
            list_campaign();
        },

        copy_link(link_share) {
            /* Get the text field */
            var copy_text = document.getElementById("camp");
            copy_text.value = link_share;
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


        add_webar_campaign(category_id, update_campaign_name_and_image = 0) {
            if (datas.profile.user_version == 1 && category_id == 2) {
                datas.add_new_project_modal = false;
                datas.ground_project_modal = false;
                datas.show_new_feature_info_modal = true;
                return;
            }
            add_campaign(category_id, update_campaign_name_and_image);
        },



        clickCallback: function(page) {
            // console.log(page)
            // console.log(datas.campaigns.length);
            // datas.campaign_count_limit=8;
            datas.campaign_image_page_number = page;

            datas.page_load = false;
            datas.pro_msg = "";
            list_campaign();


        },
        clickCallback1: function(page_fav) {
            // console.log(page_fav)

            // console.log(datas.campaigns.length);
            // datas.campaign_count_limit=8;
            datas.campaign_image_page_number = page_fav;


            datas.page_load = false;
            datas.pro_gnd_msg = "";
            list_favorite_campaign();
        },
        search: function() {
            datas.campaigns.length = -1;
            datas.page_load = false;
            datas.pro_gnd_msg = "";
            datas.pro_msg = "";
            // console.log(datas.search_campaign)
        },
        sort_campaigns: function() {//not using
            // alert(datas.sort_type);

            $.post(base_url + "campaign/sort_campaign", {
                    sort_type: datas.sort_type

                },
                function(data, status) {
                    var resp_data = JSON.parse(data);
                    if (resp_data.status) {
                        datas.campaigns = resp_data.data.campaigns;
                        datas.no_of_records = datas.campaigns.length;


                        datas.favorite_campaigns = resp_data.data.favorite_campaigns;
                        datas.no_of_fav_records = datas.favorite_campaigns.length;
                        $("sort").html(datas.sort_type);
                    }
                });



        },
        sort_campaign: function() {
            datas.page_load = false;
            datas.pro_gnd_msg = "";
            datas.pro_msg = "";
            $("sort").html(datas.sort_type);
            list_campaign();
            // list_favorite_campaign();
        },
        search_campaigns(search_value) {
            //to avoid empty project image while searching
            datas.campaigns.length = 1;
            datas.favorite_campaigns.length = 1;
            //to avoid empty project image while searching

            datas.page_load = false;
            datas.pro_gnd_msg = "";
            datas.pro_msg = "";

            // datas.campaign_count_limit=8;
            datas.campaign_image_page_number = 1;
            datas.page = 1;
            // console.log(datas.campaign_count_limit)
            // console.log(datas.campaign_image_page_number);
            datas.search_flag = true;
            list_campaign();
            // list_favorite_campaign();
        },
        delete_project: function() {


            datas.delete_campaign_button_click = true;
            $(".loader1-img").show();
            $(".nonloader1-img").hide();
            campaign_id = datas.delete_campaign_id;

            if (campaign_id == "" || campaign_id == null) {
                return;
            }
            

                $.ajax({
                    url: base_urls_8088+"campaign/"+campaign_id,
                    type: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    data: JSON.stringify({
                        campaign_id: campaign_id,
                        category: datas.campaign_category
                    }),
                    success: function(data, status) {  
                        $(".loader1-img").hide();
                        $(".nonloader1-img").show();
                        var resp_data = data;
                        datas.show_delete_campaign_modal = false;
                        datas.delete_campaign_button_click = false;
                        list_campaign();
                        // list_favorite_campaign();
                        if (resp_data.status) {
    
                            app.$snotify.success('Project deleted');
    
                        } else {
                            app.$snotify.success('Project can\'t delete right now');
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        delete_campaign: function() {


            datas.delete_campaign_button_click = true;
            $(".loader1-img").show();
            $(".nonloader1-img").hide();
            campaign_id = datas.delete_campaign_id;

            if (campaign_id == "" || campaign_id == null) {
                return;
            }

                $.ajax({
                    url: base_urls_8088+"campaign/"+campaign_id,
                    type: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    data: JSON.stringify({
                        campaign_id: campaign_id,
                        category: datas.campaign_category
                    }),
                    success: function(data, status) {  
                        $(".loader1-img").hide();
                        $(".nonloader1-img").show();
                        var resp_data = JSON.parse(data);


                        datas.show_delete_campaign_modal = false;
                        datas.delete_campaign_button_click = false;
                        list_campaign();
                        // list_favorite_campaign();
                        if (resp_data.status) {

                            app.$snotify.success('Project deleted');

                        } else {
                            app.$snotify.success('Project can\'t delete right now');
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        show_delete_modal: function(campaign_id) {
            // alert(campaign_id)
            datas.delete_campaign_id = campaign_id;
            datas.show_delete_campaign_modal = true;
            datas.show_delete_campaign_modal_class = "my-modal-display-show";
        },
        view_campaign: function(campaign_name) {
            if (datas.trial_expired) {
                datas.trial_modal = true;
                datas.show_expiry_modal_class = 'my-modal-display-show';
                // $(".expiray_modal").show();
                return;
            } else {

               
                    $.ajax({
                        url: base_urls_8088+"campaign/view-new-campaign",
                        type: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token')
                        },
                        data: JSON.stringify({
                            campaign_id: datas.current_campaign_id,
                            campaign_name: datas.current_campaign_name,
                            category: datas.campaign_category,
                        }),
                        success: function(data, status) {  
                            var resp_data =data;
                            if (resp_data.status) {
                                console.log("success");
                                console.log(datas.campaign_category);
                                if (datas.campaign_category == 1) {
                                    location.href = baseURL + "unitear-editor2/";
                                }
                                if (datas.campaign_category == 2) {
                                    if (detect_mob()) {
                                        location.href = baseURL + "unitear-webar-mobile-editor/";
                                    } else {
                                        location.href = baseURL + "webar-editor/";

                                    }
                                }
                                if (datas.campaign_category == 3) {
                                    location.href = baseURL + "unitear-app-factory/app-editor";
                                }
                            } else {
                                // location.href=resp_data.redirect_url;
                                if (typeof(resp_data.redirect_url) != undefined && resp_data.redirect_url) {
                                    datas.pro_msg = "Session expired.";
                                    datas.pro_sub_msg = "Please login again.";
                                    datas.session_expired = true;
                                    location.href = baseURL;
                                } else {
                                    list_campaign();
                                }
                            }
                            },
                        error:function(data, status) {  
                               console.log(data)     
                        },
                            })

            }
        },

        delete_notification: function(id) {

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
        change_notification_read_status: function() {


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
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token')
                        },
                        data: JSON.stringify({user_id:9741}),
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
                datas.notification_read_status = false;
            } else {

                $(".notification").toggleClass("open");

                $(".close").toggleClass("mm");

                datas.notification_read_status = true;

                setTimeout(function() {
                    // image.classList.toggle('show');
                    // text.classList.toggle('show');
                    $(".text").toggleClass("show");
                }, 150)

            }


        },

        change_campaign_name: function() {
            if (datas.campaign_first_name == datas.current_campaign_name) {
                $(".next-target").addClass("my-disabled-button");
                $(".next-target").attr("disabled", true);
                datas.current_campaign_name = "";
                datas.campaign_msg_status = true;
            } else {
                datas.campaign_msg_status = false;
            }
            // datas.campaign_msg_status=false;
            if (datas.current_campaign_name == "") {
                datas.campaign_msg_status = true;
            }
        },

        check_campaign_name: function() {
            if (datas.current_campaign_name != "") {
                if (datas.current_campaign_id != 0) {
                    $(".next-target").removeClass("my-disabled-button");
                    $(".next-target").attr("disabled", false);
                }
                datas.campaign_msg_status = false;
            } else {
                datas.campaign_msg_status = true;
                $(".next-target").addClass("my-disabled-button");
                $(".next-target").attr("disabled", true);
            }
        },
        start_campaign: function() {
            // console.log(datas.trial_expired);
            if (datas.trial_expired) {
                datas.trial_modal = true;
                datas.show_expiry_modal_class = 'my-modal-display-show';
                // $(".expiray_modal").show();
                return;
            }
            $(".next-target").addClass("my-disabled-button");
            $(".next-target").attr("disabled", true);

            datas.show_target_upload_modal = true;
            datas.show_target_upload_modal_class = 'my-modal-display-show';


            datas.campaign_msg_status = true;
            datas.current_campaign_id = 0;
            datas.current_campaign_name = 'Unititled';
            datas.campaign_first_name = 'Unititled';
            $('#myModal').modal('show');
        },
        update_new_version: function() {
            update_new_version();
        },
        set_sort_analytic_area: function() {
            set_sort_analytic_area();
        },

        //code added by Vishnu M R-2021-05-22
        get_new_campaign_default_name: function() {
            $('.spinner-border').removeClass('d-none');

                $.ajax({
                    url: base_urls_8088+"campaign/get-new-campaign-default_name",
                    type: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data: {},
                    success: function(data, status) {  
                        response_data = JSON.parse(data);
                        $('.spinner-border').addClass('d-none');
                        if (response_data.status) {
                            console.log("hii");
                            datas.new_campaign_name = response_data.new_campaign_default_name;
                            datas.new_campaign_thumbnail_file = "";
                            datas.new_campaign_thumbnail_preview = base_url + 'resources/editor_new/img/Réalité-augmentée-Apizee.png';
                            datas.new_campaign_name_error = "";
                            datas.new_campaign_thumbnail_error = "";
                            datas.ground_project_modal = true;
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        validate_campaign_name: function(submit = false) {
            // console.log(datas.new_campaign_name);
            campaign_name_validation = /^[a-zA-Z0-9 -]*$/; //letters number space -(hypon)
            // console.log(datas.new_campaign_name.length);
            // console.log(campaign_name_validation.test(datas.new_campaign_name));
            if (campaign_name_validation.test(datas.new_campaign_name)) {
                if (datas.new_campaign_name.length <= 20) {
                    if (submit) {
                        datas.new_campaign_name = datas.new_campaign_name.trim();
                        if (!datas.new_campaign_name) {
                            datas.new_campaign_name_error = "Project name required.";
                            return false;
                        }
                    }
                    datas.new_campaign_name_error = "";
                    return true;
                } else {
                    datas.new_campaign_name_error = "Sorry,project name only allows maximum 20 characters.";
                    return false;
                }
            } else {
                datas.new_campaign_name_error = "Sorry,project name should contain only alphabets, numbers, space and hyphen.";
                return false;
            }
        },
        validate_thumbnail: function(event) {
            thumbnail_file = event.target.files;
            // console.log(thumbnail_file);
            if (thumbnail_file.length > 0) {
                app.validate_thumbnail_type_and_size(thumbnail_file[0]);
            } else {
                datas.new_campaign_thumbnail_preview = base_url + 'resources/editor_new/img/Réalité-augmentée-Apizee.png';
                datas.new_campaign_thumbnail_file = "";
                datas.new_campaign_thumbnail_error = "";
            }
        },
        validate_thumbnail_type_and_size: function(thumbnail_file) {
            file_type = thumbnail_file.type;
            if (file_type == "image/jpg" || file_type == "image/png" || file_type == "image/jpeg") {
                if (thumbnail_file.size <= 1024 * 250) {
                    let img = new Image();
                    img.src = window.URL.createObjectURL(thumbnail_file);
                    img.onload = function() {
                        datas.new_campaign_thumbnail_preview = URL.createObjectURL(thumbnail_file);
                        datas.new_campaign_thumbnail_file = thumbnail_file;
                        datas.new_campaign_thumbnail_error = "";
                    };
                    img.onerror = function() {
                        datas.new_campaign_thumbnail_error = "Invalid image.";
                    };
                } else {
                    datas.new_campaign_thumbnail_error = "Thumbnail size cannot exceed 250 KB.";
                }
            } else {
                datas.new_campaign_thumbnail_error = "Only jpg,png,jpeg file accepted.";
            }
        },
        create_campaign_validation: function() {
            campaign_name_status = app.validate_campaign_name(true);

            //datas.new_campaign_thumbnail_file variable will only have file data if file is validated successfully
            if (campaign_name_status) {
                app.add_webar_campaign(2, 1);
            }
        },
        //code added by Vishnu M R-2021-05-22

        //code added by Vishnu M R-2021-07-08
        change_team: function() {

                $.ajax({
                    url: base_urls_8087+"team/change-team/"+datas.switch_team_id,
                    type: "PUT",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data: {},
                    success: function(data, status) {  
                        var resp_data = JSON.parse(data);
                        if (resp_data.status) {
                            datas.switch_team_name = resp_data.team_name;
                            localStorage.selected_team_id = JSON.stringify(datas.switch_team_id);
                            localStorage.selected_team_name = JSON.stringify(datas.switch_team_name);
                            location.reload();
                        } else {
                            app.$snotify.error(resp_data.message);
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        check_team_exists: function() {
            $.post(base_url + "unitear_team/check_team_exists", {
                    team_header: 1,
                },
                function(data, status) {
                    resp_data = JSON.parse(data);
                    datas.switch_team_list = resp_data.data;
                    datas.user_as_team_member_status = resp_data.user_as_team_member_status;
                    if (datas.switch_team_list && !datas.switch_team_id) {
                        datas.switch_team_name = datas.switch_team_list[0].team_name;
                        datas.switch_team_id = datas.switch_team_list[0].id;
                        localStorage.selected_team_id = JSON.stringify(datas.switch_team_id);
                        localStorage.selected_team_name = JSON.stringify(datas.switch_team_name);
                    } else if (datas.switch_team_list && datas.switch_team_id) {
                        current_team_exists = false;
                        datas.switch_team_list.forEach(function(item) {
                            if (item.id == datas.switch_team_id) {
                                current_team_exists = true;
                            }
                        })

                        if (!current_team_exists) {
                            datas.switch_team_id = datas.switch_team_list[0].id;
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
                //         resp_data = JSON.parse(data);
                //         datas.switch_team_list = resp_data.data;
                //         datas.user_as_team_member_status = resp_data.user_as_team_member_status;
                //         if (datas.switch_team_list && !datas.switch_team_id) {
                //             datas.switch_team_name = datas.switch_team_list[0].team_name;
                //             datas.switch_team_id = datas.switch_team_list[0].id;
                //             localStorage.selected_team_id = JSON.stringify(datas.switch_team_id);
                //             localStorage.selected_team_name = JSON.stringify(datas.switch_team_name);
                //         } else if (datas.switch_team_list && datas.switch_team_id) {
                //             current_team_exists = false;
                //             datas.switch_team_list.forEach(function(item) {
                //                 if (item.id == datas.switch_team_id) {
                //                     current_team_exists = true;
                //                 }
                //             })
    
                //             if (!current_team_exists) {
                //                 datas.switch_team_id = datas.switch_team_list[0].id;
                //                 app.change_team();
                //             }
                //         }
                //         },
                //     error:function(data, status) {  
                //            console.log(data)     
                //     },
                //         })
        },
        //code added by Vishnu M R-2021-07-08

    },
    components: {
        Pagination,
        vueSlider: window['vue-slider-component']
    },
})

setInterval(function() { list_notification(); }, 45000);

// check_trial_expiry();
// is_new_user();
datas.search_flag = false;
get_profile();
list_campaign();
// list_favorite_campaign();
list_notification();

//code added by Vishnu M R opening
check_whether_scan_limit_exceeded();

//code added by Vishnu M R closing

/*******************Check Expiry *********************/

function is_new_user() {//NOT USING
    $.post(base_url + "campaign/is_new_user", {},
        function(data, status) {
            var resp_data = JSON.parse(data);
            if (resp_data.status) {

                datas.show_new_feature_info_modal = false;
            } else {
                datas.show_new_feature_info_modal = true;
            }
        });
}


function check_trial_expiry() {//NOT USING
    $.ajax({
        url: base_url_8099+"editor/check-trial-expiry",
        type: "post",
        headers: {
          'Authorization': localStorage.getItem('token')
        
        },
        data: {},
        success: function(data, status) {
            var resp_data = JSON.parse(data);
            if (resp_data.status) 
            {
                datas.trial_expired = resp_data.status
            } 
            else 
            {
                datas.trial_expired = resp_data.status
            }
        }
    });
}

/*******************Check Expiry*********************/
/*******************Update  new version*********************/
function update_new_version() {

        $.ajax({
            url: base_urls_8090+"profile/update-new-version",
            type: "POST",
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: {},
            success: function(data, status) {  
                var resp_data = data;
                if (resp_data.status) {
                    get_profile();
                    app.$snotify.success('Succesfully updated to new version');
                } else {

                }
            },
            error:function(data, status) {  
                console.log("error");
            },
        })
}
/*******************Update  new version*********************/
function get_profile() {
    // $.post(base_url + "profile/get_profile", {},
    //     function(data, status) {
    //         // console.log(data);
    //         var resp_data = JSON.parse(data);
    //         if (resp_data.status) {

    //             datas.profile = resp_data.data;
    //             if (datas.profile.user_version == 1) {
    //                 datas.show_new_feature_info_modal = true;
    //             } else {
    //                 datas.show_new_feature_info_modal = false;
    //             }
    //         } else {

    //         }
    //     });
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
                    if (datas.profile.user_version == 1) {
                        datas.show_new_feature_info_modal = true;
                    } else {
                        datas.show_new_feature_info_modal = false;
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
function list_notification() {
   
        $.ajax({
            url: base_urls_8095+"notification/",
            type: "GET",
            headers: {
              'Authorization': localStorage.getItem('token')
            },
            data: {},
            success: function(data, status) {  
                var resp_data = data;
                if (resp_data.status) {
                    datas.read_entire_status = resp_data.read_entire_status;
                    datas.notification = resp_data.data;
                    datas.no_of_notification_records = datas.notification.length;
                    datas.read_count = resp_data.read_count;
                } else {
                    datas.read_entire_status = resp_data.read_entire_status;
                    datas.notification = [];
                    datas.no_of_notification_records = datas.notification.length;
                    if (typeof(resp_data.redirect_url) != undefined && resp_data.redirect_url) {
                        datas.pro_msg = "Session expired.";
                        datas.pro_sub_msg = "Please login again.";
                        datas.session_expired = true;
                        location.href = resp_data.redirect_url;
                    }
                }
            },
            error:function(data, status) {  
              
            },
        })
}

/*******************List notification*********************/

/*******************List Campaign*********************/
function list_campaign() {
    console.log(datas.campaign_category)
    var campaigns = datas.campaign_category
    if(typeof campaigns == 'number'){
        campaigns = campaigns.toString()
        console.log(campaigns)
    }
    else
    {
    }
    datas.campaign_loader = true;
    datas.search_flag ? datas.main_loader = false : datas.main_loader = true;
    datas.list_campaign_request != null ? datas.list_campaign_request.abort() : null;
        datas.list_campaign_request = $.ajax({
            url: base_urls_8088 + "campaign/list",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: JSON.stringify({
                campaign_count_limit: datas.campaign_count_limit,
                campaign_image_page_number: datas.campaign_image_page_number,
                campaign_search: datas.search_campaign,
                sort_type: datas.sort_type,
                category: campaigns,
            }),
            success: function(data, status) {  
                var resp_data = JSON.parse(data);
                if (resp_data.status) {
    
    
                    datas.campaigns = resp_data.data;
                    datas.no_of_records = resp_data.total_campaign_count.total_num;                    
    
    
    
                } else {
    
                    datas.no_of_records = 0;
                    datas.campaigns = [];
                    datas.sort_analytic_area = true;
    
                }
                console.log(resp_data)
                console.log(resp_data.total_campaign_count)
                console.log(resp_data.total_campaign_count.total_num)

                if (resp_data.total_campaign_count.total_num > 0) {
                    datas.add_new_image_project_button = false;
                    datas.sort_analytic_area = true;
                    datas.pro_msg = "Projects found";
                    datas.pro_sub_msg = "Try adjusting your search to find what you're looking for.";
    
                    if (datas.campaigns.length == 0) {
                        datas.pro_msg = "No projects found";
                        datas.pro_sub_msg = "Try adjusting your search to find what you're looking for.";
                    } else {
                        datas.pro_msg = "Projects found";
                        datas.pro_sub_msg = "";
                    }
                } else {
                    if (!resp_data.redirect_url) {
                        datas.add_new_image_project_button = true;
                        datas.add_new_image_project_button_top = true;
                        datas.sort_analytic_area = false;
                        datas.pro_msg = "Create your first project";
                        datas.pro_sub_msg = "Build an AR Experience to bring your ideas to life.";
                    } else {
                        datas.add_new_image_project_button = false;
                        datas.add_new_image_project_button_top = false;
    
                        datas.sort_analytic_area = false;
                        datas.pro_msg = "Your Permission Denied";
                        datas.pro_sub_msg = "Contact your team admin.";
                        datas.total_campaign_count_user = 0;
                        if (typeof(resp_data.redirect_url) != undefined && resp_data.redirect_url) {
                            datas.pro_msg = "Session expired.";
                            datas.pro_sub_msg = "Please login again.";
                            datas.session_expired = true;
                            location.href = resp_data.redirect_url;
                        }
                    }
                }
                $('.VuePagination').show();
                datas.page_load = true;
                datas.campaign_loader = false;
                datas.total_image_campaign = resp_data.total_campaign_count.total_num;
                datas.total_campaign_count_user = resp_data.total_campaign_count_user.total_num;
                if (!datas.add_new_image_project_button_top) { datas.total_campaign_count_user = 0; }
                datas.total_campaign_count_user > 0 ? datas.sort_analytic_area = true : datas.sort_analytic_area = false;
                datas.search_flag = false;
                datas.main_loader = false;
                // set_sort_analytic_area();
            },
            error:function(data, status) {  
              
            },
        })
         
}

function set_sort_analytic_area() {
    // console.log(datas.campaign_category);
    switch (datas.campaign_category) {
        case 1:
            datas.total_image_campaign > 0 ? datas.sort_analytic_area = true : datas.sort_analytic_area = false;
            break;
        case 2:
            datas.total_ground_campaign > 0 ? datas.sort_analytic_area = true : datas.sort_analytic_area = false;
            break;
    }
}
/*******************List Campaign*********************/

/*******************List Favorite Campaign*********************/
function list_favorite_campaign() {//NOT USING
    datas.fav_campaign_loader = true;
    // alert("jj");
    datas.list_fav_campaign_request != null ? datas.list_fav_campaign_request.abort() : null;
    datas.list_fav_campaign_request = $.post(base_url + "campaign/list_ground_campaign", {
            campaign_count_limit: datas.campaign_count_limit,
            campaign_image_page_number: datas.campaign_image_page_number,
            campaign_search: datas.search_campaign,
            sort_type: datas.sort_type,
        },
        function(data, status) {
            var resp_data = JSON.parse(data);
            if (resp_data.status) {

                // datas.no_of_fav_records=datas.favorite_campaigns.length;
                datas.no_of_fav_records = resp_data.total_campaign_count;
                datas.favorite_campaigns = resp_data.data;

            } else {

                datas.no_of_fav_records = 0;
                datas.favorite_campaigns = [];

            }

            if (resp_data.total_campaign_count > 0) {
                datas.add_new_ground_project_button = false;
                datas.sort_analytic_area = true;
                if (datas.favorite_campaigns.length == 0) {
                    datas.pro_gnd_msg = "No projects found";
                    datas.pro_gnd_sub_msg = "Try adjusting your search to find what you're looking for.";
                } else {
                    datas.pro_gnd_msg = "Projects found";
                    datas.pro_gnd_sub_msg = "";
                }
            } else {
                datas.add_new_ground_project_button = true;
                datas.sort_analytic_area = false;
                datas.pro_gnd_msg = "Create your first project";
                datas.pro_gnd_sub_msg = "Build an AR Experience to bring your ideas to life.";
            }
            datas.total_ground_campaign = resp_data.total_campaign_count;

            datas.page_load = true;
            datas.fav_campaign_loader = false;
            datas.total_ground_campaign = resp_data.total_campaign_count;
            datas.total_campaign_count_user = resp_data.total_campaign_count_user;

            set_sort_analytic_area();
            // datas.fav_campaign_loader=false;
        });
}
/*******************List Favorite Campaign*********************/

/******************* Add favorite*********************/
function add_favorite(favorite_status, campaign_id) {//NOT USING
    var base_url = "http://localhost/unitear_current_website/";
    if (campaign_id == "" || campaign_id == null) {
        return;
    }
    $.post(base_url + "campaign/add_favorite", {
            favorite_status: favorite_status,
            campaign_id: campaign_id
        },
        function(data, status) {
            var resp_data = JSON.parse(data);
            if (resp_data.status) {
                list_campaign();
                list_favorite_campaign();

            }
        });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    window.location.href="login.html"
}
/******************* Add favorite*********************/
/******************* Add Campaign*********************/
async function add_campaign_old() {//NOT USING
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
       
                var resp_data = JSON.parse(data);
                if (resp_data.status) {
                    datas.campaign_msg_status = true;
                    datas.current_campaign_id = resp_data.data.campaign_id;
                    datas.current_campaign_name = resp_data.data.campaign_name;
                    datas.campaign_first_name = resp_data.data.campaign_name;
                    $('#myModal').modal('show');

                }
                resolve("done!")
            }
    })
})
}
/******************* Add Campaign*********************/


/******************* Add Campaign*********************/
async function add_campaign(target_category_id, update_campaign_name_and_image) {
    datas.target_files = [];


    return new Promise(function(resolve, reject) {
        datas.main_loader = true;
        datas.ground_project_modal = false;
        //setTimeout(() => resolve("done!"), 1000)
        // $.post(base_url + "campaign/create_campaign/1", { target_category_id: target_category_id },

        //code added by Vishnu M R-2021-05-22
        let formData = new FormData();
        if (!update_campaign_name_and_image) {
            datas.new_campaign_thumbnail_file = "";
            datas.new_campaign_name = "";
        }
        formData.append("campaign_image", datas.new_campaign_thumbnail_file);
        formData.append("target_category_id", target_category_id);
        formData.append("campaign_name", datas.new_campaign_name);
        formData.append("update_campaign_name_and_image", update_campaign_name_and_image);
        //code added by Vishnu M R-2021-05-22

        $.ajax({
            headers: {
                'Authorization': localStorage.getItem('token')
              },
            url: base_urls_8097 + 'artarget/start-campaign-webar',
            data: formData,
            type: 'post',
            processData: false,
            contentType: false,
            success: function(data) {
                var resp_data = data;
                if (resp_data.status) {
                    datas.campaign_msg_status = true;
                    datas.current_campaign_id = resp_data.data.campaign_id;
                    datas.current_campaign_name = resp_data.data.campaign_name;
                    datas.campaign_first_name = resp_data.data.campaign_name;
                    localcampaign_id=resp_data.data.campaign_id;
					localStorage.setItem('campaign_id', localcampaign_id);
                    // location.href = base_url + "editor/webar-editor";
                    if (target_category_id == 1) {
                        if (datas.profile.user_version == 1) {
                            location.href = baseURL + "unitear-editor/";
                        } else {
                            location.href = baseURL + "unitear-editor2/";
                        }
                    } else {
                        if (detect_mob()) {
                            location.href = baseURL + "unitear-webar-mobile-editor/";
                        } else {
                            location.href = baseURL + "webar-editor/";
                        }
                    }
                } else {
                    if (typeof(resp_data.redirect_url) != undefined && resp_data.redirect_url) {
                        datas.pro_msg = "Session expired.";
                        datas.pro_sub_msg = "Please login again.";
                        datas.session_expired = true;
                        location.href = baseURL ;
                    } else {
                        datas.main_loader = false;
                        // datas.package_error_modal=true;	
                        datas.add_new_project_modal = false;
                        app.$snotify.error(resp_data.message);
                    }
                }
                resolve("done!")
                    // datas.main_loader=false;
            }
        })
    })
}
/******************* Add Campaign*********************/
/******************* Check app factory Status*********************/
function check_app_factory_status() {//not using
    $.ajax({
		url: base_urls_8081+"app-factory/check-app-factory-access",
		type: "POST",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) { 
            var resp_data = JSON.parse(data);
            if (resp_data.status) {
                datas.package_error_modal = false;
                // location.href = base_url + "unitear-app-factory/";
                location.href = baseURL + "unitear-app-factory/create-app-details";
            } else {
                datas.package_error_modal = true;
            }
        }});
}
/******************* Check app factory Status*********************/
function check_app_factory_count() {
    datas.main_loader = true;
    $.ajax({
		url: base_urls_8081+"app-factory/check-app-count",
		type: "POST",
		headers: {
		  'Authorization': localStorage.getItem('token')
		},
		data: {},
		success: function(data, status) { 
    
            var resp_data = data;
            if (resp_data.status) {
                datas.app_count_exeeded = false;
                // location.href = base_url + "unitear-app-factory/";
                var campaign_category = parseInt(datas.campaign_category);
                switch (campaign_category) {
                    case 3:
                        location.href = baseURL + "unitear-app-factory/create-app-details";
                        break;
                    case 4:
                        location.href = baseURL + "advanced-app-factory/";
                        break;

                }


            } else {
                if (typeof(resp_data.redirect_url) != undefined && resp_data.redirect_url) {
                    datas.pro_msg = "Session expired.";
                    datas.pro_sub_msg = "Please login again.";
                    datas.session_expired = true;
                    location.href = resp_data.redirect_url;
                } else {
                    datas.main_loader = false;
                    datas.app_count_exeeded = true;
                }
            }
        }});
}
/******************* Check app factory Status*******************/
/******************* Check app factory Status*******************/
/******************* Check app factory Status*******************/


//code added by Vishnu M R

function check_whether_scan_limit_exceeded() {
   
        
                $.ajax({
                    url: base_urls_8088+"campaign/check-whether-scan-limit-exceeded",
                    type: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data:{   },
                    success: function(data, status) {  
                        var resp_data = data;
                        if (resp_data.status) {
                            var user_data = resp_data.data;
                            if (user_data != null) {
                                if (parseInt(user_data.scan_in_account) <= parseInt(user_data.current_scan_count)) {
                                    if (parseInt(user_data.user_type) == 1) {
                                        datas.show_scan_count_limit_data = "Your package limit has finished. Please upgrade your plan or purchase additional views";
                                    } else {
                                        datas.show_scan_count_limit_data = "Your Free Trial has expired. Please upgrade your plan";
                                    }
                                    datas.show_scan_count_limit_exceeded = true;
                                } else {
                                    datas.show_scan_count_limit_exceeded = false;
                                }
                            } else {
                                datas.show_scan_count_limit_exceeded = false;
                            }
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                })
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

/******************* RazorPay************************/
function razor_payment() {
    // var amount = (document.getElementById("scan_price").innerHTML).replace('$','');
    var amount = Math.ceil(datas.feature_rate * datas.add_feature);
    // var scan_number = document.getElementById("scan_count").innerHTML;
    var feature_count = datas.add_feature;
    //console.log(amount);
    $.post(base_url + 'razorpay_onetime', { amount: amount }, function(result) {
        var resp_data = JSON.parse(result);
        var options = {
            "key": resp_data.api_key, // Enter the Key ID generated from the Dashboard
            "amount": "50", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
            "currency": "USD",
            "name": "UniteAR",
            "description": feature_count + " " + datas.feature_button_text,
            "image": base_url + "resources/img/razor_logo1.jpg",
            "order_id": resp_data.id, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
            "handler": function(response) {
                //alert("PAYMENT SUCCESSFUL");
                newclose();
            },
            "prefill": {
                "name": "",
                "email": "",
                "contact": ""
            },
            "notes": {
                "user_id": user_id,
                "feature_name": datas.selected_feature,
                "feature_count": feature_count,
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

function account(){
    // window.location.href = "account.html"; 
    $.ajax({
        url: base_urls_8093+"pricing/account/",
        type: "POST",
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        data:{},
        success: function(data, status) {  
            var resp_data = data;
            if (resp_data.status) {
                var user_data = resp_data.data;
                console.log(user_data)
//                 localStorage.setItem('active_package', JSON.stringify(user_data.active_package));
//                 localStorage.setItem('days_left', user_data.days_left);
//                 localStorage.setItem('is_ultimate_package', user_data.is_ultimate_package);
//                 localStorage.setItem('purchase_package_history', JSON.stringify(user_data.purchase_package_history));
//                 localStorage.setItem('storage_details', user_data.storage_details);
//                 localStorage.setItem('storage_details_percentage', user_data.storage_details_percentage);
//                 localStorage.setItem('target_details', user_data.target_details);
//                 localStorage.setItem('target_details_percentage', user_data.target_details_percentage);
//                 localStorage.setItem('user_type', user_data.user_type);
//                 console.log(user_data) ;
//                 window.location.href = "account.html" 
            }
            },
        error:function(data, status) {  
               console.log(data)     
        },
    })
}
 document.body.addEventListener("click", function (evt) {
     console.log(datas.open_notification);
    //  var notificationElement = evt.path[0].getAttribute("class");
    //  var profileElement = evt.path[1].getAttribute("class");
    //  console.log(profileElement)
     if(datas.open_notification==true)
     {console.log("evt1")
        //  if( datas.open_notification==false)
        // {
           document.getElementById("my-noty").style.display="block";
           datas.open_notification=false;
        // }
     }
     else
     {
        console.log("evt0")
       
        document.getElementById("my-noty").style.display="none";
        
     }
     if( datas.open_profile == true)
     {console.log("evt3")
        
           document.getElementById("my-menu").style.display="block";
            datas.open_profile=false;

        
     }
     else
     {
        console.log("evt4")
        document.getElementById("my-menu").style.display="none";
        
     }
    
   
 });