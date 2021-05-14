$(document).ready(function() {




    $("body").on("click", "#Submit_User", () => {
        let User_Info = Get_User_Info()
        $.ajax({
            type: "POST",
            url: "/SingUpUser/Register",
            data: {
                User_Name: User_Info.User_Name,
                User_First_Name: User_Info.User_First_Name,
                User_Last_Name: User_Info.User_Last_Name,
                User_Password: User_Info.User_Password,
                User_Gender: User_Info.User_Gender,
                User_Email: User_Info.User_Email,
                User_Number: User_Info.User_Number
            },
            success: function() {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })

                window.location.replace("/LoginUser")
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
                console.log("ERROR");
            }
        })
    })

    function Get_User_Info() {

        let User_Name = $("#Username").val()
        let First_Name = $("#FirstName").val()
        let Last_Name = $("#LastName").val()
        let Password = $("#UserPassword").val()
        let Number = $("#UserNumber").val()
        let Gender = $("#UserGender").val()
        let Email = $("#UserEmail").val()
        let verify = $("#PasswordVerify").val()

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

        if (verify == "" || User_Name == "" || First_Name == "" || Last_Name == "" || Password == "" || Email == "" || Number == "") {
            console.log(5345345);
            Swal.fire({
                icon: 'error',
                title: 'اوپس...',
                text: 'مشکلی پیش آمده است لطفاتمامی ورودی ها را چک کنید ',
                footer: '<a href="/">بازگشت به خانه</a>'
            })

        } else if (Password != verify) {
            Swal.fire({
                icon: 'error',
                title: 'اوپس...',
                text: 'مشکلی پیش آمده است لطفا تکرار رمز عبور خودرا چک کنید ',
                footer: '<a href="/">بازگشت به خانه</a>'
            })
        } else {
            let User = {
                User_Name: User_Name,
                User_First_Name: First_Name,
                User_Last_Name: Last_Name,
                User_Password: Password,
                User_Gender: User_Gender,
                User_Email: Email,
                User_Number: Number
            }
            return User
        }

    }


});
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
container.classList.add("right-panel-active");
// signUpButton.addEventListener('click', () => {
//     container.classList.add("right-panel-active");
// });
// function validatePhoneNumber(input_str) {
//     var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//     return re.test(input_str);
// }

// function validateForm(event) {
//     var phone = document.getElementById('UserNumber').value;
//     if (!validatePhoneNumber(phone)) {
//         document.getElementById('phone_error').classList.remove('hidden');
//     } else {

//         alert("validation success")
//     }
//     event.preventDefault();
// }

// document.getElementById('formLogin').addEventListener('Submit_User', validateForm);