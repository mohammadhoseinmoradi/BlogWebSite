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
                Set_Table(data)
            },
            error: function() {
                alert("Error")
            }
        })
    })
    $('body').on("click", ".Admin_setting", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "block")
        $("#AddArticle").css("display", "none")
    })
    $('body').on("click", "#Btn_Add_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "block")
        $("#AddArticle").css("display", "block")
    })
    $('body').on("click", "#Stage_Add_Avatar_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")

        $("#AddArticleData").css("display", "none")



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

                $("#AddName").css("display", "none")
                $("#AddAvatarArticle").css("display", "block")
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
    $('body').on("click", "#Stage_Add_Name_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "block")
        $("#AddAvatarArticle").css("display", "none")
        $("#AddArticleData").css("display", "none")
        $("#AddArticle").css("display", "block")
    })
    $('body').on("click", "#Stage_Add_Data_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "none")
        $("#AddArticle").css("display", "block")
        console.log($("#formFile")[0].files[0]);
        var data = new FormData();
        data.append('avatar', $("#formFile")[0].files[0]);

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
                $("#AddAvatarArticle").css("display", "none")
                $("#AddArticleData").css("display", "block")

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
    $('body').on("click", "#Submit_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "none")
        $("#AddAvatarArticle").css("display", "none")
        $("#AddArticleData").css("display", "block")
        $("#AddArticle").css("display", "block")
        var data = CKEDITOR.instances.editor3.getData();
        var dataText = CKEDITOR.instances.editor3.document.getBody().getText()

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
                $("#AddArticleData").css("display", "none")
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
    $('body').on("click", "#Stage_back_Avatar_Article", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "none")
        $("#AddAvatarArticle").css("display", "block")
        $("#AddArticleData").css("display", "none")
        $("#AddArticle").css("display", "block")
    })
    $('body').on("click", "#myArticles", function() {
        $("#Blogger_Crud").css("display", "none")
        $("#Admin_Curd").css("display", "none")
        $("#AddName").css("display", "none")
        $("#AddAvatarArticle").css("display", "none")
        $("#AddArticleData").css("display", "none")
        $("#AddArticle").css("display", "none")
        $.ajax({
            type: "GET",
            url: "../Articles/ArticlesUser",
            success: function(data) {
                Set_Curd(data)
            },
            error: function() {
                alert("Error")
            }
        })
    })

    function Set_Curd(data) {
        console.log(data);
        for (let i = 1; i < data.length; i++) {
            console.log(data);
            let row = `
            <div class="card col-sm-5 shadow p-2 p-md-4" style="margin-top:10px">
            <div class="card-header px-0">
                <div class="post-meta">
                    <div class="media d-flex align-items-center justify-content-between">
                        <div class="post-group">
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-original-title="23k followers" data-bs-original-title="23k followers"><img class="avatar-lg me-2 img-fluid rounded-circle" src="/images/avatars/${data[i].Article_Owner.User_Avatar}" alt="avatar"></a>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="author-name text-dark fw-bold font-small me-4 d-none d-lg-block">Posted by <a href="#" class="me-2">${data[i].Article_Owner.User_Name}</a>
                            <div class="btn-group"><button class="btn btn-link dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="icon icon-sm"><i class="fas fa-ellipsis-h icon-dark"></i> </span><span class="sr-only">Toggle Dropdown</span></button>
                                <div class="dropdown-menu py-0"><a class="dropdown-item rounded-top" href="#"><span class="fas fa-edit me-2"></span>Edit post</a> <a class="dropdown-item text-danger rounded-bottom" href="#"><span class="fa fa-trash me-2" aria-hidden="true"></span>Delete post</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body py-4 px-0">
                <a href="#" style="hight:200px;overflow:hidden"><img src="/images/ArticleAvatar/${data[i].Article_Avatar}" class="card-img-top rounded" style="hight:100px" alt="blog image">
                    <h4 class="my-4">${data[i].Article_Title} </h4>
                </a>
                <p class="card-text mb-4">${data[i].Article_Summary}...</p>
            </div>
            <div class="card-footer bg-white border-0 pt-0 px-0">
                <div class="d-flex flex-wrap flex-lg-nowrap align-items-center justify-content-between">
                    <div class="post-details mb-3 mb-lg-0">
                    <button class="btn me-3 btn-link text-primary"><i class="fas fa-share me-2"></i>آخرین تغییرات :${data[i].Article_LastUpdate.split("T")}</button>
                     </div>
                    <div class="post-meta">
                      <button class="btn btn-secondary"><i class="far fa-save me-2"></i>خواندن مقاله</button></div>
                </div>
            </div>
        </div>

            `
            $("#ArticlesAdmin").append(row);
        }

    }

    function Set_Table(data) {
        console.log(data);
        for (let i = 1; i < data.length; i++) {

            let row = `
            <tr>
            <td><span class="fw-normal">${i}</span></td>
            <td>
                <a href="#" class="d-flex align-items-center"><img src="/images/avatars/${data[i].User_Avatar}" class="user-avatar rounded-circle me-3" alt="Avatar">
                    <div class="d-block"><span class="fw-bold">${data[i].User_Name}</span>
                        <div class="small text-gray">${data[i].User_Role}</div>
                    </div>
                </a>
            </td>
            <td><span class="fw-normal">${data[i].User_First_Name}</span></td>
            <td><span class="fw-normal">${data[i].User_Last_Name}</span></td>
            <td><span class="fw-normal">${data[i].User_Gender}</span></td>
            <td><span class="fw-normal"><span class="fas fa-check-circle text-success me-2"></span>${data[i].User_Email}</span>
            </td>
            <td><span class="fw-normal text-success">${data[i].User_Number}</span></td>
            <td>
                <div class="btn-group"><button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="icon icon-sm pt-1"><span class="fas fa-ellipsis-h icon-dark"></span> </span><span class="sr-only">Toggle Dropdown</span></button>
                    <div class="dropdown-menu py-0"><a class="dropdown-item rounded-top" onclick="ResetPassword('${data[i]._id}')"><span class="fas fa-user-shield me-2"></span> تغییر پسور کاربر</a> 
                    <a class="dropdown-item text-danger rounded-bottom" onclick="DeleteCommentsUsers('${data[i]._id}')"><span class="fas fa-user-times me-2"></span>حذف نظرات کاربر</a></div>
                </div><span class="fas fa-times-circle text-danger ms-2" title="" data-bs-toggle="tooltip" data-bs-original-title="Delete" aria-label="Delete"></span></td>
        </tr>
            `
            $("#tableInfo").append(row);
        }
        getPagination('#tableInfo', data.length)
        $("#Blogger_Crud").css("display", "block")
        $("#Admin_Curd").css("display", "none")
        $("#AddArticle").css("display", "none")
    }

})
getPagination('#table-id');

function getPagination(table, tableLength) {
    var lastPage = 1;

    $('#maxRows')
        .on('change', function(evt) {
            //$('.paginationprev').html('');						// reset pagination

            lastPage = 1;
            $('.pagination')
                .find('li')
                .slice(1, -1)
                .remove();
            var trnum = 0; // reset tr counter
            var maxRows = parseInt($(this).val()); // get Max Rows from select option
            console.log(maxRows);
            if (maxRows == 5000) {
                $('.pagination').hide();
            } else {
                $('.pagination').show();
            }

            var totalRows = tableLength // numbers of rows
            console.log(totalRows);
            $(table + ' tr:gt(0)').each(function() {
                // each TR in  table and not the header
                trnum++; // Start Counter
                if (trnum > maxRows) {
                    // if tr number gt maxRows

                    $(this).hide(); // fade it out
                }
                if (trnum <= maxRows) {
                    $(this).show();
                } // else fade in Important in case if it ..
            }); //  was fade out to fade it in
            if (totalRows > maxRows) {
                // if tr total rows gt max rows option
                var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
                //	numbers of pages
                for (var i = 1; i <= pagenum;) {
                    // for each page append pagination li
                    $('.pagination #prev')
                        .before(
                            '<li style="padding:5px ;border:2px solid #d8e3e7;border-radius:15px; margin:0px 5px 0px 5px" data-page="' +
                            i +
                            '">\
              <span>' +
                            i++ +
                            '<span class="sr-only">(current)</span></span>\
            </li>'
                        )
                        .show();
                } // end for i
            } // end if row count > max rows
            $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
            $('.pagination li').on('click', function(evt) {
                // on click each page
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var pageNum = $(this).attr('data-page'); // get it's number

                var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option

                if (pageNum == 'prev') {
                    if (lastPage == 1) {
                        return;
                    }
                    pageNum = --lastPage;
                }
                if (pageNum == 'next') {
                    if (lastPage == $('.pagination li').length - 2) {
                        return;
                    }
                    pageNum = ++lastPage;
                }

                lastPage = pageNum;
                var trIndex = 0; // reset tr counter
                $('.pagination li').removeClass('active'); // remove active class from all li
                $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
                // $(this).addClass('active');					// add active class to the clicked
                limitPagging();
                $(table + ' tr:gt(0)').each(function() {
                    // each tr in table not the header
                    trIndex++; // tr index counter
                    // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                    if (
                        trIndex > maxRows * pageNum ||
                        trIndex <= maxRows * pageNum - maxRows
                    ) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    } //else fade in
                }); // end of for each tr in table
            }); // end of on click pagination list
            limitPagging();
        })
        .val(5)
        .change();

    // end of on select change

    // END OF PAGINATION
}

function limitPagging() {
    // alert($('.pagination li').length)

    if ($('.pagination li').length > 7) {
        if ($('.pagination li.active').attr('data-page') <= 3) {
            $('.pagination li:gt(5)').hide();
            $('.pagination li:lt(5)').show();
            $('.pagination [data-page="next"]').show();
        }
        if ($('.pagination li.active').attr('data-page') > 3) {
            $('.pagination li:gt(0)').hide();
            $('.pagination [data-page="next"]').show();
            for (let i = (parseInt($('.pagination li.active').attr('data-page')) - 2); i <= (parseInt($('.pagination li.active').attr('data-page')) + 2); i++) {
                $('.pagination [data-page="' + i + '"]').show();

            }

        }
    }
}
$(function() {
    // Just to append id number for each row
    $('table tr:eq(0)').prepend('<th> ID </th>');

    var id = 0;

    $('table tr:gt(0)').each(function() {
        id++;
        $(this).prepend('<td>' + id + '</td>');
    });
});

function DeleteCommentsUsers(User_Id) {
    console.log(User_Id);
    $.ajax({
        type: 'GET',
        url: `../DashboardUser/DeleteCommentsUsers/${User_Id}`,
        success: function() {
            alert('ok')
        },
        error: function() {
            alert('error')
        }
    })
}

function ResetPassword(User_Id) {
    console.log(User_Id);
    $.ajax({
        type: 'PUT',
        url: `../DashboardUser/ResetPassword/${User_Id}`,
        success: function() {
            alert('ok')
        },
        error: function() {
            alert('error')
        }
    })
}