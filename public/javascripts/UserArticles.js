jQuery(function($) {


})

function DeleteArticle(event) {
    $.ajax({
        type: 'DELETE',
        url: `/Articles/${event}`,
        success: function() {
            alert('OK')
            window.location.reload()
        },
        error: function() {
            alert('Error')
        }
    })
}

function EditArticle(event) {
    $("#UserArticles").css("display", "none")
    $("#EditArticles").css("display", "block")
    let Data = event
    console.log("ID=========>");
    console.log(Data);
    $.ajax({
        type: 'GET',
        url: `../PersonalArticle/${Data}`,
        success: function(ArticleInfo) {
            console.log("getdata");
            setData(ArticleInfo)
        },
        error: function() {
            alert("Error")
        }
    })

    function setData(ArticleInfo) {
        let url = ArticleInfo.Article_File_Location.split('public')
        $.ajax({
            type: "GET",
            url: `../../${url[1]}`,
            success: function(data) {
                console.log("getpages");
                $("#Edit_Article_Name").attr("value", `${ArticleInfo.Article_Title}`)
                CKEDITOR.replace('editor9', {
                    uiColor: '#9AB8F3',

                    filebrowserUploadUrl: `/Articles/AddArticlesPhotos`,

                })
                CKEDITOR.instances.editor9.setData(data);
                $("body").on("click", "#UpdateNameArticle", function() {
                    alert("UpdateName")
                    let New_Name = $("#Edit_Article_Name").val();
                    console.log(New_Name);
                    $.ajax({
                        type: "PUT",
                        url: "../EditArticleTitle",
                        data: { Article_Title: New_Name },
                        success: function() {
                            Swal.fire({
                                icon: 'success',
                                title: 'انجام شد',
                                text: 'نام مقاله با موفقیت انجام شد',
                                footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                            })
                        },
                        error: function() {
                            Swal.fire({
                                icon: 'error',
                                title: 'با خطا مواجه شدید',
                                text: 'لطفا نام مقاله خود را دوباره وارد کنید',
                                footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                            })
                        }
                    })

                })
                $("body").on("click", "#updateAvatarArticle", function() {

                    console.log($("#formFileEdit")[0].files[0]);
                    var data = new FormData();
                    data.append('avatar', $("#formFileEdit")[0].files[0]);

                    $.ajax({
                        type: "POST",
                        url: '../UploadAvatarArticle',
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
                $("body").on("click", "#updateSubmitArticle", function() {

                    var data = CKEDITOR.instances.editor9.getData();
                    var dataText = CKEDITOR.instances.editor9.document.getBody().getText()

                    $.ajax({
                        type: "POST",
                        url: "../SubmitArticle",
                        data: { Data: data, Text_Summary: dataText },
                        success: function() {
                            Swal.fire({
                                icon: 'success',
                                title: ' با موفقیت انجام شد ',
                                text: 'مقاله با موقیت ویرایش شد',
                                footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                            })
                        },
                        error: function() {
                            Swal.fire({
                                icon: 'error',
                                title: 'با خطا مواجه شدید',
                                text: '  مقاله ویرایش نشد لطفا دوباره سعی کنید',
                                footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                            })
                        }
                    })
                })
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'با خطا مواجه شدید',
                    text: 'لطفا دوباره مقاله خود را انتخاب کنید',
                    footer: '<button  class="btn btn-sm btn-primary mr-2 ReloadDashboard">بازگشت به صفحه همه مقالات</button>'
                })
            }
        })
    }




}