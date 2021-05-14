jQuery(function($) {

    $("#alertbtn").on("click", function() {
        alert("alert")
    })
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
        console.log(PasswordVerify, UserPassword, User_Gender, UserNumber, UserEmail, LastName, FirstName, Username);

        if (PasswordVerify == "" || UserPassword == "" || User_Gender == "" || UserNumber == "" || UserEmail == "" || LastName == "" || FirstName == "" || Username == "") {
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
                    Login(Username, UserPassword)
                },
                error: function() { alert("ERROR") }
            })
        }

    })
    $("#Login_User").on("click", () => {
        let Password = $("#LoginPassword").val()
        let User_Name = $("#LoginUserName").val()
        Login(User_Name, Password)
    })

    function Login(User_Name, Password) {
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
    }
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

            success: function(data) {
                alert("OK")
                set_Comment(data)

            },
            error: function() { alert("Error") }
        })
    })

    function set_Comment(data) {
        $("#addallcomment").html("")
        for (let i = 0; i < data.length; i++) {
            let Comments = `
            <div class="media" style="padding:10px;border: 2px solid black">
            <a class="pull-left" href="#"><img class="media-object" src="/images/avatars/${data[i].Comment_Owner.User_Avatar}" alt=""></a>
            <div class="media-body">
                <h4 class="media-heading">
                    ${data[i].Comment_Owner.User_Name}
                </h4>
                <p>
                    ${ data[i].Comment_Text }
                </p>
                <ul class="list-unstyled list-inline media-detail pull-left">
                    <li><i class="fa fa-calendar"></i>${data[i].Comment_CreatedAt.toISOString().slice(0,10)}</li>
               
                </ul>
            </div>
        </div>
            `
            $("#addallcomment").append(Comments)
        }
        $("#numberofcomments").append(`${data.length}`)

    }
})

function setData(event) {
    console.log(event);
    $("#Summary").load(`../../${event}`)
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}