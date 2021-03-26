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

        let New_Avatar = $("#New_User_Avatar").val();

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
            type: "PUT",
            url: "/DashboardUser/DashboardAvatar",
            data: {
                New_Avatar: New_Avatar,

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
        $("#New_Article").css("display", "block")
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
});