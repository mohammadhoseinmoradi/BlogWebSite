jQuery(function($) {


    $("#Submit_User").on("click", function() {
        let PasswordVerify = $("#PasswordVerify").val()
        let UserPassword = $("#UserPassword").val()
        let Gender = $("#UserGender").val()
        let UserNumber = $("#UserNumber").val()
        let UserEmail = $("#UserEmail").val()
        let LastName = $("#LastName").val()
        let FirstName = $("#FirstName").val()
        let Username = $("#Username").val()
        let User_Gender = "Other";
        if (Gender == 0) {
            User_Gender = "Other"
        } else if (Gender == 1) {
            User_Gender = "male"
        } else if (Gender == 2) {
            User_Gender = "female"
        } else if (Gender == 3) {
            User_Gender = "Other"
        }
        console.log(PasswordVerify, UserPassword, UserGender, UserNumber, UserEmail, LastName, FirstName, Username);

        if (PasswordVerify == "" || UserPassword == "" || UserGender == "" || UserNumber == "" || UserEmail == "" || LastName == "" || FirstName == "" || Username == "") {
            console.log(5345345);
            Swal.fire({
                icon: 'error',
                title: 'اوپس...',
                text: 'مشکلی پیش آمده است لطفاتمامی ورودی ها را چک کنید ',
                footer: '<a href="/">بازگشت به خانه</a>'
            })

        } else if (PasswordVerify != UserPassword) {
            Swal.fire({
                icon: 'error',
                title: 'اوپس...',
                text: 'مشکلی پیش آمده است لطفا تکرار رمز عبور خودرا چک کنید ',
                footer: '<a href="/">بازگشت به خانه</a>'
            })
        } else {

            $.ajax({
                type: 'POST',
                url: "../../SingUpUser/Register",
                data: {

                    User_Password: UserPassword,
                    User_Gender: User_Gender,
                    User_Number: UserNumber,
                    User_Email: UserEmail,
                    User_Last_Name: LastName,
                    User_First_Name: FirstName,
                    User_Name: Username,

                },
                success: function(data) {
                    console.log(data);
                    $(".row").css("display", "block")
                    $("#ModalLogin").css("display", "none")
                    $("#User_Avatar").attr("src", `/images/avatars/${data.User_Avatar}`)
                },
                error: function() { alert("ERROR") }
            })
        }

    })
    $("#Login_User").on("click", () => {
        let Password = $("#LoginPassword").val()
        let User_Name = $("#LoginUserName").val()
        if (User_Name == "" && Password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
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
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(data);
                $(".row").css("display", "block")
                $("#ModalLogin").css("display", "none")
                $("#User_Avatar").attr("src", `/images/avatars/${data.User_Avatar}`)
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
    $("body").on("click", "#Submit_Comment", function() {
        console.log(window.location.href);
        let ArticleId = window.location.href
        let Id = ArticleId.split('ArticlePage/')
        console.log(Id);
        console.log(ArticleId);
        let Text = $("#Comment_Text").val()
        $.ajax({
            type: "POST",
            url: "../SubmitComment",
            data: {

                Comment: Text,
                Article_Id: Id[1],


            },
            success: function() { alert("OK") },
            error: function() { alert("Error") }
        })
    })
})

function setData(event) {
    console.log(event);
    $("#Summary").load(`../../${event}`)
}