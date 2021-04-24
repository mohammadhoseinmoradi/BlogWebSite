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
                    <div class="dropdown-menu py-0"><a class="dropdown-item rounded-top" href="#"><span class="fas fa-user-shield me-2"></span> تغییر پسور کاربر</a> <a class="dropdown-item text-danger rounded-bottom"
                            href="#"><span class="fas fa-user-times me-2"></span>حذف نظرات کاربر</a></div>
                </div><span class="fas fa-times-circle text-danger ms-2" title="" data-bs-toggle="tooltip" data-bs-original-title="Delete" aria-label="Delete"></span></td>
        </tr>
            `
            $("#tableInfo").append(row);
        }
        getPagination('#tableInfo', data.length)
    }

})
getPagination('#table-id');
//getPagination('.table-class');
//getPagination('table');

/*					PAGINATION 
- on change max rows select options fade out all rows gt option value mx = 5
- append pagination list as per numbers of rows / max rows option (20row/5= 4pages )
- each pagination li on click -> fade out all tr gt max rows * li num and (5*pagenum 2 = 10 rows)
- fade out all tr lt max rows * li num - max rows ((5*pagenum 2 = 10) - 5)
- fade in all tr between (maxRows*PageNum) and (maxRows*pageNum)- MaxRows 
*/


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

//  Developed By Yasser Mas
// yasser.mas2@gmail.com