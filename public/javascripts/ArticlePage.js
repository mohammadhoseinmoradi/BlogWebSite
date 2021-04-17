jQuery(function($) {


    console.log("111111111111111111");


})

function setData(event) {
    console.log(event);
    $("#Summary").load(`../../${event}`)
}