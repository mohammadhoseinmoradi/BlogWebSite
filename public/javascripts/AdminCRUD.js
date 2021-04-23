$(function() {

    $("body").on("click", "#Edit_Admin", function() {
        let New_User_Name = $("#User_name").val();
        let New_User_First_Name = $("#first_name").val();
        let New_User_Last_Name = $("#last_name").val();
        let New_User_Email = $("#email").val();
        let New_User_Number = $("#phone").val();
        let New_Gender = "";
        let Gender = $("#gender").val();
        if (Gender == 0) {
            New_Gender = "NoSelected";
        } else if (Gender == 1) {
            New_Gender = "male"
        } else if (Gender == 2) {
            New_Gender = "female"
        } else if (Gender == 3) {
            New_Gender = "other"
        }
        console.log(New_User_Name, New_User_First_Name, New_User_Last_Name, New_User_Email, New_User_Number, New_Gender);
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
    $("body").on("click", "#Edit_Admin_Password", function() {
        let Old_Password = $("#oldPassword").val();
        let New_Password = $("#NewPassword").val();
        let Verify_New_Password = $("#NewVerifyPassword").val();
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

    $("body").on("click", "#Edit_Admin_Avatar", function() {

        console.log($("#User_Avatar")[0].files[0]);
        var data = new FormData();
        data.append('avatar', $("#User_Avatar")[0].files[0]);

        $.ajax({
            type: "POST",
            url: '/DashboardUser/DashboardAvatar',
            data: data,
            contentType: false,
            processData: false,
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'تغییر انجام شد ',
                    text: '  عکس شاخص مقاله با موفقیت ویرایش شد',
                    footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                })
                window.location.reload("/Dashboard/DashboardPage")
            },
            error: function(jqXHR, textStatus, errorMessage) {
                Swal.fire({
                    icon: 'error',
                    title: 'با خطا مواجه شدید',
                    text: '  لطفا عکس خود را دوباره بارگزاری کنید',
                    footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                })
            }
        });

    })
    $("body").on("click", "#BloggerGetInfo", function() {
        $.ajax({
            type: "GET",
            url: "../DashboardUser/BloggerInfo",
            success: function(data) {
                console.log(data);
            },
            error: function() {
                alert("Error")
            }
        })
    })
})