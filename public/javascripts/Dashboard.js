jQuery(function($) {

    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
            .parent()
            .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });
    $("body").on("click", "#Btn_Edit_Password_Submit", function() {
        let Old_Password = $("#OldPassword").val();
        let New_Password = $("#NewPassword").val();
        let Verify_New_Password = $("#VerifyNewPassword").val();
        if (Old_Password == "" && New_Password == "" && Verify_New_Password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else if (New_Password !== Verify_New_Password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
        console.log(Old_Password, New_Password);
        $.ajax({
            type: "PUT",
            url: "/DashboardUser/DashboardChangPassword",
            data: {
                New_Password: New_Password,
                Old_Password: Old_Password,
            },
            success: function() {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload("/Dashboard/DashboardPage")
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }

        })
    })
    $("body").on("click", "#Btn_Edit_Avatar_Submit", function() {

        // let New_Avatar = $("#New_User_Avatar").file()
        let New_Avatar = $('#New_User_Avatar').get(0).files;
        console.log(typeof New_Avatar);
        if (New_Avatar == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
        console.log(New_Avatar);
        $.ajax({
            type: "POST",
            url: "/DashboardUser/DashboardAvatar",
            datatype: "multipart/form-data",
            data: New_Avatar

            ,
            success: function() {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload("/Dashboard/DashboardPage")
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }

        })

    })
    $("body").on("click", "#Btn_Submit", function() {
        let New_User_Name = $("#User-Name").val();
        let New_User_First_Name = $("#User-FirstName").val();
        let New_User_Last_Name = $("#User-LastName").val();
        let New_User_Email = $("#User-Email").val();
        let New_User_Number = $("#User-Number").val();
        let New_Gender = "";
        let Gender = $("#Gender").val();
        if (Gender == 0) {
            New_Gender = "NoSelected";
        } else if (Gender == 1) {
            New_Gender = "male"
        } else if (Gender == 2) {
            New_Gender = "female"
        } else if (Gender == 3) {
            New_Gender = "other"
        }
        if (New_User_Name == "" && New_User_Number == "" && New_User_Email == "" && New_User_First_Name == "" && New_User_Last_Name == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else {
            if (New_Gender == "NoSelected") {
                $.ajax({
                    type: "PUT",
                    url: "/DashboardUser/DashboardEdit",
                    data: {
                        User_Name: New_User_Name,
                        User_First_Name: New_User_First_Name,
                        User_Last_Name: New_User_Last_Name,
                        User_Email: New_User_Email,
                        User_Number: New_User_Number
                    },
                    success: function() {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        window.location.reload("/Dashboard/DashboardPage")
                    },
                    error: function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Why do I have this issue?</a>'
                        })
                    }

                })
            } else {
                $.ajax({
                    type: "PUT",
                    url: "/DashboardUser/DashboardEdit",
                    data: {
                        User_Name: New_User_Name,
                        User_First_Name: New_User_First_Name,
                        User_Last_Name: New_User_Last_Name,
                        User_Email: New_User_Email,
                        User_Number: New_User_Number,
                        User_Gender: New_Gender
                    },
                    success: function() {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        window.location.reload("/Dashboard/DashboardPage")
                    },
                    error: function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Why do I have this issue?</a>'
                        })
                    }

                })
            }
        }

    })

    $("body").on("click", "#Btn_Edit_Password", function() {
        $("#Edit_Password").css("display", "block")
        $("#Edit_Info").css("display", "none")
        $("#New_Article").css("display", "none")
        $("#User_Articles").css("display", "none")
        $("#Edit_Avatar").css("display", "none")
    })
    $("body").on("click", "#Btn_Edit_Info", function() {
        $("#Edit_Info").css("display", "block")
        $("#Edit_Password").css("display", "none")
        $("#New_Article").css("display", "none")
        $("#User_Articles").css("display", "none")
        $("#Edit_Avatar").css("display", "none")
    })
    $("body").on("click", "#Articles", function() {
        $("#Edit_Info").css("display", "none")
        $("#Edit_Password").css("display", "none")
        $("#New_Article").css("display", "none")
        $("#User_Articles").css("display", "block")
        $("#Edit_Avatar").css("display", "none")
    })
    $("body").on("click", "#Add_Article", function() {
        $("#Edit_Info").css("display", "none")
        $("#Edit_Password").css("display", "none")
        $("#User_Articles").css("display", "none")
        $("#New_Article").css("display", "block")
        $("#Edit_Avatar").css("display", "none")
    })
    $("body").on("click", "#Btn_Edit_Avatar", function() {
            $("#Edit_Info").css("display", "none")
            $("#Edit_Password").css("display", "none")
            $("#User_Articles").css("display", "none")
            $("#New_Article").css("display", "none")
            $("#Edit_Avatar").css("display", "block")
        })
        // !========================================================================================================================================================================
    $("body").on("click", "#btn-AddArticle", function() {
        $("#AddArticle").css("display", "block")
        $("#AddName").css("display", "block")
        $("#btn-AddArticle").css("display", "none")

    })
    $("body").on("click", "#btn-submit-AddArticle", function() {
        var data = CKEDITOR.instances.editor1.getData();
        var dataText = CKEDITOR.instances.editor1.document.getBody().getText()

        $.ajax({
            type: "POST",
            url: "../Articles/SubmitArticle",
            data: { Data: data, Text_Summary: dataText },
            success: function() {
                Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // $("#User_Articles").css("display", "block")
                $("#AddArticle").css("display", "none")
                window.location.replace(`../DashboardUser/DashboardPage`);
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }
        })
    })
    $("body").on("click", "#Btn_Add_Avatar_Article", function() {
        let Article_Name = $("#Article_Name").val()
        if (Article_Name == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
        $.ajax({
            type: "POST",
            url: "/Articles/AddArticles",
            data: { Article_Name },
            success: function() {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })

                $("#ArticleAvatar").css("display", "block")
                $("#AddName").css("display", "none")
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }
        })

    })
    $("body").on("click", "#Btn_Back_Name_Article", function() {
        $("#AddName").css("display", "block")
        $("#ArticleAvatar").css("display", "none")
    })
    $("body").on("click", "#Btn_Add_Article", function() {

        console.log($("#ArticleAvatars")[0].files[0]);
        var data = new FormData();
        data.append('avatar', $("#ArticleAvatars")[0].files[0]);

        $.ajax({
            type: "POST",
            url: '../Articles/UploadAvatarArticle',
            data: data,
            contentType: false,
            processData: false,
            success: function(response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#TextEditor").css("display", "block")
                $("#ArticleAvatar").css("display", "none")
            },
            error: function(jqXHR, textStatus, errorMessage) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }
        });

    })
    $("body").on("click", "#Btn_Edit_Avatatr", function() {
        $("#TextEditor").css("display", "none")
        $("#ArticleAvatar").css("display", "block")

    })
    const chk = document.getElementById('chk');

    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    // SOCIAL PANEL JS
    const floating_btn = document.querySelector('.floating-btn');
    const close_btn = document.querySelector('.close-btn');
    const social_panel_container = document.querySelector('.social-panel-container');

    floating_btn.addEventListener('click', () => {
        social_panel_container.classList.toggle('visible')
    });

    close_btn.addEventListener('click', () => {
        social_panel_container.classList.remove('visible')
    });

});