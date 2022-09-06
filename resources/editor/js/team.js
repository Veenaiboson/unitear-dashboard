var datas = {

    profile: {
        user_version: 2
    },
    no_of_notification_records: 0,
    new_project_modal: false,
    selected_scans_option: "Image-based AR",
    chart_loaded: false,
    read_entire_status: false,
    read_count: 0,
    notification: [],
    target_category_id: 1,
    package_error_modal: false,
    mobile_menu: false,

    team_home: false,
    invite_people: false,
    team_members: true,
    member_delete: false,
    storage_limit: false,
    rollTab: true,
    create_roll: false,
    member_remove: false,
    invitation_sent: false,
    invite_cancel: false,
    Edit_roll: false,
    member_list: [],
    selected_member: {},
    role_list: [],
    selected_role: '1',
    edit_role_button_loader: false,
    remove_member_button_loader: false,
    invite_memeber_basic_model: { email: "", role_id: "1", role: {} },
    invite_member: [],
    roles: [],
    campaign_category: 3,
    whole_refferal_error_status: true,
    selected_refferal_email: [],
    refferal_email_message: "",



    //emmanual added
    create_team: false,
    switch_team: false,
    //emmanual added

    //jijo added
    campaign_category: 3,
    team_name: "",
    user_name_error: "",
    create_button_loader: false,
    invite_button_loader: false,
    teams: [],
    selected_team: "",
    selected_team_id: 0,
    switch_team_button_loader: false,
    invite_team_button_loader: false,
    user_current_email: "",
    first_role_id: 0,
    //jijo added

    //code added by Vishnu M R
    team_list: [],
    selected_team_members_count: "",
    show_invite_button: false,
    team_details: false,
    total_team_members_allowed: 0,
    team_requests: false,
    team_requests_data: [],
    reject_approval_team_id: 0,
    approval_team_id: 0,
    switch_team_name: "",
    switch_team_id: 0,
    switch_team_list: [],
    team_home_div_class: "active",
    team_requests_div_class: "",
    team_admin_id: 0,
    team_admin_email: "",
    user_temp_email: "",
    new_join_team_id: 0,
	user_as_team_member_status:false,
    //code added by Vishnu M R
    heading:'',
    sub_heading:''

}

app = new Vue({
    el: '#app',
    data: datas,
    computed: {},
    mounted: function() {
        // console.log("mounted");
        if (localStorage.selected_team_id) {
            this.switch_team_id = JSON.parse(localStorage.selected_team_id);
            this.switch_team_name = JSON.parse(localStorage.selected_team_name);
        }
        this.user_current_email = user_current_email;
        this.user_temp_email = user_temp_email;
        this.heading = localStorage.getItem('heading');
        this.sub_heading = localStorage.getItem('sub_heading');
    },
    created: function() {
        // console.log("created");
        // this.get_profile();
        this.check_team_exists();
        // this.list_members();
        this.list_roles();
        // this.list_team();
        this.total_team_members_allowed = no_of_team_members;
        this.check_team_exists_header();
    },
    components: {
        'vueSlider': window['vue-slider-component'],

    },
    methods:


    {
        get_profile() {
            get_profile();
        },
        change_project_category() {
            localStorage.campaign_category = datas.campaign_category;
            location.href = base_url + "editor";
        },
        list_members() {
            list_members();
        },
        list_roles() {
            list_roles();
        },
        update_member_role() {
            update_member_role();
        },
        remove_member() {
            remove_member();
        },
        add_invite_member() {

            if (datas.invite_member.length == 0 || datas.invite_member[datas.invite_member.length - 1]['email'] != "") {

                var single_reffreral_email = { "id": datas.invite_member.length + 1, "email": "", "role_id": datas.first_role_id, "error": "Enter email address" };
                datas.invite_member.push(single_reffreral_email);
            } else {
                if (datas.invite_member.length != 0) {
                    datas.invite_member[datas.invite_member.length - 1]['error'] = "Please enter a valid email address";
                }
            }
        },
        remove_invite_member(index) {
            // alert(index);
            datas.invite_member.splice(index, 1);
        },
        form_validation: function(refferal_email) {
            datas.selected_refferal_email = refferal_email;
            // console.log(datas.selected_refferal_email.email);
            validate_user_email();
            app.check_emails()
        },
        check_emails() {
            // console.log(datas.invite_member);
            // console.log(datas.whole_refferal_error_status);
            for (i = 0; i < datas.invite_member.length; i++) {
                if (datas.invite_member[i].error != "") {
                    datas.whole_refferal_error_status = true;
                    break;
                } else {
                    datas.whole_refferal_error_status = false;
                }
                // console.log(datas.invite_member[i]);
            }
            // console.log(datas.whole_refferal_error_status);
        },
        form_submit(e) {
            // console.log("entered")
            this.check_emails();
            insert_refferal_email();
        },
        team_name_validation(field_name, field_value) {
            validate_user_name(field_name, field_value);
            return datas.user_name_error;
        },
        create_teams() {
            if (this.team_name_validation('user_name', datas.team_name) == "") {
                create_team();
            }
        },
        check_team_exists() {
            check_team_exists();
        },
        cancel_invite() {
            cancel_invite();
        },
        list_team() {
            list_team();
        },
        change_team() {
            // datas.selected_team_id=datas.selected_team.team_id;
            change_team();
        },
        remove_team(team_id) {

                $.ajax({
                    url: base_urls_8087+"team/"+team_id,
                    type: "DELETE",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data: {},
                    success: function(data, status) {  
                        var resp_data = JSON.parse(data);
                        // console.log(resp_data);
                        if (resp_data.status) {
                            // datas.team_list=resp_data.data;
                            //  datas.team_home=true;
                            app.check_team_exists();
                            datas.team_details = false;
                            datas.show_invite_button = false;
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
        check_whether_user_can_invite_people() {

                $.ajax({
                    url: base_urls_8087+"team/team-member-limit/"+datas.selected_team_id,
                    type: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data: {},
                    success: function(data, status) {  
                        var resp_data = JSON.parse(data);
                        // console.log(resp_data);
                        if (resp_data.status) {
                            datas.invite_people = true;
                        } else {
                            location.href = base_url + "exceeded";
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        leave_team(team_id) {
           
                $.ajax({
                    url: base_urls_8087+"team/"+team_id,
                    type: "PUT",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    data: {},
                    success: function(data, status) {  
                        var resp_data = JSON.parse(data);
                        // console.log(resp_data);
                        if (resp_data.status) {
                            app.check_team_exists();
                            datas.team_details = false;
                        } else {
                            app.$snotify.error(resp_data.message);
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        approve_invite() {
                $.ajax({
                    url: base_urls_8089+"invite",
                    type: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':localStorage.getItem('token')
                    },
                    data: JSON.stringify({team_id: datas.approval_team_id}),
                    success: function(data, status) {  
                        var resp_data = JSON.parse(data);
                        if (resp_data.status) {
                            datas.team_requests_data = resp_data.data;
                            app.check_team_exists();
                        } else {
                            app.$snotify.error(resp_data.message);
                        }
                        },
                    error:function(data, status) {  
                           console.log(data)     
                    },
                        })
        },
        make_team_request_active() {
            if (datas.team_list) {
                for (i = 0; i < datas.team_list.length; i++) {

                    datas.team_list[i].is_active = "tab-team-item";
                }
            }
            datas.team_home_div_class = "";
            datas.team_requests_div_class = "active";
            datas.team_home = false;
        },
        make_team_home_active() {
            if (!datas.team_list) {
                datas.team_home_div_class = "active";
                datas.team_requests_div_class = "";
                datas.team_home = true;
                datas.team_requests = false;
            }
        },
        check_team_exists_header() {
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
                    //     datas.switch_team_name=datas.switch_team_list[0].team_name;
                    //     datas.switch_team_id=datas.switch_team_list[0].id;
                    //     localStorage.selected_team_id=JSON.stringify(datas.switch_team_id);
                    //     localStorage.selected_team_name=JSON.stringify(datas.switch_team_name);
                    // }
                    // else if(datas.switch_team_list && datas.switch_team_id)
                    // {
                    //     current_team_exists=false;
                    //     datas.switch_team_list.forEach(function(item) {
                    //         if(item.id == datas.switch_team_id)
                    //         {
                    //             current_team_exists=true;
                    //         }
                    //     })
                                
                    //     if(!current_team_exists)
                    //     {
                    //         datas.switch_team_id=datas.switch_team_list[0].id;
                    //         app.change_team();
                    //     }
                    // }
                //         },
                //     error:function(data, status) {  
                //            console.log(data)     
                //     },
                //         })
        },
    },

});
/******************* list_team*********************/

function list_team() {//not using
    // datas.invite_button_loader=true;

    $.post(base_url + "unitear_team/list_team", {

        },
        function(data, status) {


            var resp_data = JSON.parse(data);
            if (resp_data.status) {

                datas.teams = resp_data.data;

            } else {


            }


        });
}
/******************* list_team*********************/
/******************* list_team*********************/

function change_team() {
    // datas.switch_team_button_loader=true;

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
                    // app.$snotify.success(resp_data.message);
                    localStorage.selected_team_id = JSON.stringify(datas.switch_team_id);
                    localStorage.selected_team_name = JSON.stringify(datas.switch_team_name);
                    location.reload();
                } else {
                    app.$snotify.error(resp_data.message);
                }
                // list_members();
                // list_roles();
                // datas.switch_team=false;
                // location.href=base_url+"editor/team";
                // datas.switch_team_button_loader=false;
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/******************* list_team*********************/
/******************* create_team*********************/

function cancel_invite() {
    datas.invite_button_loader = true;

        $.ajax({
            url: base_urls_8089+"invite/"+datas.reject_approval_team_id,
            type: "DELETE",
            headers: {
                'Authorization':localStorage.getItem('token')
            },
            data: {},
            success: function(data, status) {  
                var resp_data = JSON.parse(data);
                if (resp_data.status) {
                    datas.invite_cancel = false;
                    datas.team_requests_data = resp_data.data;
                    // console.log(resp_data.team_id);
                    // console.log(datas.team_list);
                    if (datas.team_list) {
                        for (i = 0; i < datas.team_list.length; i++) {
                            if (resp_data.team_id == datas.team_list[i].id) {
                                team_index_to_remove = i;
                                datas.team_list.splice(team_index_to_remove, 1);
                            }
                        }
                    }
                    // console.log(datas.team_list);
                } else {
                    app.$snotify.error(resp_data.message);
                }
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/*******************create_team*********************/

/******************* cancel invite*********************/


/*******************cancel*********************/
/******************* create_team*********************/

function check_team_exists() {
    $.post(base_url + "unitear_team/check_team_exists", {},
        function(data, status) {
            resp_data = JSON.parse(data);
            // console.log(resp_data);
            datas.team_list = resp_data.data;
            datas.team_requests_data = resp_data.team_requests;
            if (resp_data.status) {
                // console.log(datas.team_list[0].id);
                if (!datas.new_join_team_id) {
                    datas.selected_team_id = datas.team_list[0].id;
                } else {
                    datas.selected_team_id = datas.new_join_team_id;
                }
                datas.team_details = true;
                app.list_members();
                app.check_team_exists_header();
                if (!resp_data.user_team_status) {
                    datas.team_home = true;
                    $('.spinner-border').addClass("d-none");
                }
                datas.team_home_div_class = "";
                datas.team_requests_div_class = "";
                datas.team_requests = false;
                datas.new_join_team_id = 0;
                // close_all();
                // datas.team_members=true;
            } else {
                // close_all();
                datas.team_home_div_class = "active";
                datas.team_home = true;
                $('.spinner-border').addClass("d-none");
                datas.team_requests_div_class = "";
                datas.team_requests = false;
            }
        });

         // $.ajax({
                //     url: base_urls_+"",
                //     type: "POST",
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': localStorage.getItem('token')
                //     },
                //     data:  JSON.stringify({team_header: 1}),
                //     success: function(data, status) {  
                    // resp_data = JSON.parse(data);
                    // // console.log(resp_data);
                    // datas.team_list = resp_data.data;
                    // datas.team_requests_data = resp_data.team_requests;
                    // if (resp_data.status) {
                    //     // console.log(datas.team_list[0].id);
                    //     if (!datas.new_join_team_id) {
                    //         datas.selected_team_id = datas.team_list[0].id;
                    //     } else {
                    //         datas.selected_team_id = datas.new_join_team_id;
                    //     }
                    //     datas.team_details = true;
                    //     app.list_members();
                    //     app.check_team_exists_header();
                    //     if (!resp_data.user_team_status) {
                    //         datas.team_home = true;
                    //         $('.spinner-border').addClass("d-none");
                    //     }
                    //     datas.team_home_div_class = "";
                    //     datas.team_requests_div_class = "";
                    //     datas.team_requests = false;
                    //     datas.new_join_team_id = 0;
                    //     // close_all();
                    //     // datas.team_members=true;
                    // } else {
                    //     // close_all();
                    //     datas.team_home_div_class = "active";
                    //     datas.team_home = true;
                    //     $('.spinner-border').addClass("d-none");
                    //     datas.team_requests_div_class = "";
                    //     datas.team_requests = false;
                    // }
                //         },
                //     error:function(data, status) {  
                //            console.log(data)     
                //     },
                //         })
}
/*******************create_team*********************/

/******************* create_team*********************/

function create_team() {
    datas.create_button_loader = true;

        $.ajax({
            url: base_urls_8087+"team",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: JSON.stringify({team_name: datas.team_name}),
            success: function(data, status) {  
                var resp_data =data;
                // console.log(resp_data);
                datas.create_button_loader = false;
                if (resp_data.status) {
                    // close_all();
                    // datas.team_list=resp_data.data;
                    datas.create_team = false;
                    datas.team_home = false;
                    // datas.show_invite_button=true;
                    app.check_team_exists();
                    datas.team_home_div_class = "";
                } else {
                    // close_all();
                    // datas.team_home=true; vue snotify
                    // datas.create_team=false;
                    app.$snotify.error(resp_data.message);
                }
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/*******************create_team*********************/

/******************* remove_member*********************/

function remove_member() {
    datas.remove_member_button_loader = true;

        $.ajax({
            url: base_urls_8086+"members/"+datas.selected_member.member_id,
            type: "DELETE",
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: {},
            success: function(data, status) {  
                datas.remove_member_button_loader = false;

                var resp_data = JSON.parse(data);
                if (resp_data.status) {
                    list_members();
                } else {
                    app.$snotify.error(resp_data.message);
                }
                datas.member_remove = false;
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/*******************remove_member*********************/
/******************* update_member_role*********************/

function update_member_role() {
    datas.edit_role_button_loader = true;
        $.ajax({
            url: base_urls_8085+"roles/update-member-role",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: JSON.stringify({role_id:datas.selected_role,member_id: datas.selected_member.member_id}),
            success: function(data, status) {  
                datas.edit_role_button_loader = false;
                var resp_data = data;
                if (resp_data.status) {
                    list_members();
    
    
                } else {
                    app.$snotify.error(resp_data.message);
                }
                datas.Edit_roll = false;
            },
            error:function(data, status) {  
                   console.log(data)     
            },
        })   
}
/******************* update_member_role*********************/
/*******************List roles*********************/

function list_roles() {

        $.ajax({
            url: base_urls_8085+"roles/",
            type: "GET",
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: {},
            success: function(data, status) {  
                var resp_data = data;
                if (resp_data.status) {
                    datas.roles = [];
                    datas.role_list = resp_data.data;
                    datas.roles = datas.role_list;
                    datas.first_role_id = datas.role_list[0].role_id;
                    var single_reffreral_email = { "id": 1, "email": "", "role_id": datas.first_role_id, "error": "Enter email address" };
                    if (datas.invite_member.length == 0) {
                        datas.invite_member.push(single_reffreral_email);
                    }
                } else {
                    datas.roles = [];
                }
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/*******************List roles*********************/

/*******************List members*********************/

function list_members() {
    datas.team_details = true;
    // console.log(datas.selected_team_id);
    $('#team_requests_id').removeClass('active');
    if (datas.team_list) {
        for (i = 0; i < datas.team_list.length; i++) {
            if (datas.selected_team_id == datas.team_list[i].id) {
                datas.team_list[i].is_active = "tab-team-item active";
            } else {
                datas.team_list[i].is_active = "tab-team-item";
            }
        }
    }
    datas.selected_team = "";
    datas.selected_team_members_count = "";

        $.ajax({
            url: base_urls_8086+"members/list",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: JSON.stringify({id: datas.selected_team_id}),
            success: function(data, status) {  
                var resp_data = JSON.parse(data);
                // console.log(resp_data);
                $('.spinner-border').addClass("d-none");
                if (resp_data.status) {
                    // close_all();
                    datas.selected_team = resp_data.team_data.team_name;
                    datas.selected_team_members_count = resp_data.team_data.members_count;
                    datas.member_list = resp_data.members_data;
                    if (resp_data.user_team) {
                        datas.show_invite_button = true;
                    } else {
                        datas.show_invite_button = false;
                    }
                    datas.team_admin_id = resp_data.team_admin_id;
                    datas.team_admin_email = resp_data.team_admin_email;
                } else {
                    datas.member_list = [];
                    datas.show_invite_button = false;
                    //   close_all();  
                }
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}
/*******************List members*********************/

function validate_user_email() {
    var patt = RegExp(/\S+@\S+\.\S+/);
    datas.selected_refferal_email.email = datas.selected_refferal_email.email.trim();
    if (patt.test(datas.selected_refferal_email.email)) {
        datas.selected_refferal_email.error = "";

        if (datas.user_current_email == datas.selected_refferal_email.email) {
            datas.selected_refferal_email.error = "You can't invite yourself.";
        } else
        if (datas.team_admin_email == datas.selected_refferal_email.email) {
            datas.selected_refferal_email.error = "You can't invite your team admin.";
        }

        if (datas.user_temp_email && (datas.user_temp_email == datas.selected_refferal_email.email)) {
            datas.selected_refferal_email.error = "Entered email is already a member.";
        }
    } else {
        datas.selected_refferal_email.error = "Please enter a valid email address";
    }
}

function insert_refferal_email() {
    if (datas.whole_refferal_error_status) {
        // console.log("email error");
        // e.preventDefault();
        return false;
    }
    datas.invite_team_button_loader = true;

        $.ajax({
            url: base_urls_8089+"invite",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: JSON.stringify({"refferal_emails": datas.invite_member}),
            success: function(data, status) {  
                var resp_data = JSON.parse(data);
                if (resp_data.status) {
                    datas.invite_member = [];
                    app.add_invite_member();
                    app.$snotify.error(resp_data.message);
                    list_members();
                    datas.invite_people = false;
                } else {
                    app.$snotify.error(resp_data.message);
                }
                datas.invite_team_button_loader = false;

                // close_all();
                // datas.team_members=true;
                },
            error:function(data, status) {  
                   console.log(data)     
            },
                })
}

function close_all() {
    datas.team_home = false;
    datas.invite_people = false;
    datas.team_members = false;

    // datas.create_button_loader=false;
    // datas.member_remove = false;
    // datas.create_team=false;
}

function validate_user_name(field_name, field_value) {
    field_length_validation(field_name, field_value);

    if (datas.user_name_error == "") {
        field_type_validation(field_name, field_value);
    }
}

function field_length_validation(field_name, field_value) {
    switch (field_name) {
        case "user_name":
            {
                if (field_value.length < 3) {
                    datas.user_name_error = "Sorry, the name should have at least 3 alphabets";
                    $("#user_name").addClass('error-input');
                } else if (field_value.length > 30) {
                    datas.user_name_error = "Sorry, name only allows maximum 30 alphabets";
                    $("#user_name").addClass('error-input');
                } else {
                    datas.user_name_error = "";
                    $("#user_name").removeClass('error-input');
                }
                break;

            }

        case "user_password":
            {
                if (field_value.length < 6) {
                    datas.user_password_error = "Your password must have at least 6 characters";
                    $("#user_password").addClass('error-input');
                } else if (field_value.length > 30) {
                    datas.user_password_error = "Password should not exceed 30 alphabets";
                    $("#user_password").addClass('error-input');
                } else {
                    datas.user_password_error = "";
                    $("#user_password").removeClass('error-input');
                }
                break;
            }
    }
}
/***********************Common validation functions ************************************/
function field_type_validation(field_name, field_value) {
    switch (field_name) {
        case "user_name":
            {


                var patt = RegExp(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/);

                if (patt.test(field_value)) {
                    datas.user_name_error = "";
                    $("#user_name").removeClass('error-input');

                } else {
                    datas.user_name_error = "Sorry, the name should contain only letters";
                    $("#user_name").addClass('error-input');
                }
                break;

            }
        case "user_email":
            {

                var patt = RegExp(/\S+@\S+\.\S+/);

                if (patt.test(field_value)) {
                    datas.user_email_error = "";
                    $("#user_email").removeClass('error-input');
                } else {
                    datas.user_email_error = "Please enter a valid email address";
                    $("#user_email").addClass('error-input');
                }
                break;
                break;
            }

    }
}

function get_profile() {
    $.post(base_url + "profile/get_profile", {},
        function(data, status) {
            // console.log(data);
            var resp_data = JSON.parse(data);

            if (resp_data.status) {

                datas.profile = resp_data.data;
            } else {

            }
        });
}
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    window.location.href = "login.html";
}