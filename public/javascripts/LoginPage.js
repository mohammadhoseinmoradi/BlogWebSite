$(document).ready(function() {




    $("body").on("click", "#Submit_User", () => {
        let User_Name = $("#Username").val()
        let Password = $("#UserPassword").val()
        if (User_Name == "" && Password == "") {
            Swal.fire({
                icon: 'خطا',
                title: 'اوپس...',
                text: ' لطفا ورودی های خود را چک کنین',
                footer: '<a href>رفتن به خانه?</a>'
            })
        }
        $.ajax({
            type: "POST",
            url: "/LoginUser/UserLogin",
            data: {
                User_Name: User_Name,
                User_Password: Password
            },
            success: function(data) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: ' به ناحیه کاربری خود خوش آمدید ',
                    showConfirmButton: false,
                    timer: 1500
                })

                console.log(data);
                window.location.replace(`../DashboardUser/DashboardPage`);
            },
            error: function() {
                Swal.fire({
                    icon: 'خطا',
                    title: 'اوپس...',
                    text: ' لطفا ورودی های خود را چک کنین',
                    footer: '<a href>رفتن به خانه?</a>',
                    timer: 1500

                })
                window.location.replace(`/LoginUser`);

            }
        })
    })




});
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');