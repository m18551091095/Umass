$(function () {
    var left = $('.left');
    var bg = $('.bgDiv');
    var leftNav = $('.leftNav');
    showNav(left, leftNav, "left");
    function showNav(btn, navDiv, direction) {
        btn.on('click', function () {
            bg.css({
                display: "block",
                transition: "opacity .5s"
            });
            if (direction == "right") {
                navDiv.css({
                    right: "0px",
                    transition: "right 1s"
                });
            } else if (direction == "left") {
                navDiv.css({
                    left: "0px",
                    transition: "left 1s"
                });
            } else if (direction == "up") {
                navDiv.css({
                    top: "0px",
                    transition: "top 1s"
                });
            } else if (direction == "down") {
                navDiv.css({
                    bottom: "0px",
                    transition: "bottom 1s"
                });
            }


        });
    }

    $('span').each(function () {
        var dom = $(this);
        dom.on('click', function () {
            hideNav();
            $("#IndexTopId span").text(dom.text());
            $("#iframMain").attr('src', dom.attr('data-href'));
        });
    });


    bg.on('click', function () {
        hideNav();
    });

    function hideNav() {
        leftNav.css({
            left: "-50%",
            transition: "left .5s"
        });
        bg.css({
            display: "none",
            transition: "display 1s"
        });
    }
});