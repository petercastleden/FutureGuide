

$(document).ready(function () {
    var $content = $(".content").hide();
    $(".toggle").on("click", function (e) {
        $(this).toggleClass("expanded");
        $(this).next().slideToggle();

    });
});

$(document).ready(function () {
    var $content2 = $(".content2").show();
    $(".toggle2").on("click", function (e) {
        $(this).toggleClass("expanded");
        $(this).next().slideToggle();
        });
});