
$(document).ready(function () {
    "use strict";

    /*--------------------- Main Slider ---------------------- */
    var MsMainSlider = new Swiper('.ms-slider.swiper-container', {
        loop: true,
        speed: 2000,
        effect: "slide",
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /*--------------------- Language and Currency Click to Active ---------------------- */
    $(document).ready(function () {
        $(".header-top-lan li").click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $(".header-top-curr li").click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    });

    /*--------------------- Day of the deal Slider (offer section) ---------------------- */
    $('.deal-owl-carousel').owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 1000,
        autoplay: true,
        items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            421: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
            1367: {
                items: 5
            }
        }
    });

    /*--------------------- Vendor slider (Home Page) ---------------------- */
    $('.ms-top-vendor').owlCarousel({
        margin: 24,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 1500,
        autoplay: false,
        items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
            1400: {
                items: 4
            }
        }
    });

    /*--------------------- Blog slider (Home Page) ---------------------- */
    $('.ms-blog-carousel').owlCarousel({
        margin: 24,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 1000,
        autoplay: false,
        items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            },
            1400: {
                items: 3
            }
        }
    });
    /*--------------------- Instagram slider & Category slider & Tooltips ---------------------- */
    $(function () {
        $('.insta-auto').infiniteslide({
            direction: 'left',
            speed: 50,
            clone: 10
        });
        $('[data-toggle="tooltip"]').tooltip();
    });

    /*--------------------- Newsletter popup Homepage ---------------------- */
    setTimeout( function(){ 
        $("#ms-popnews-bg").fadeIn();
        $("#ms-popnews-box").fadeIn();
    }, 5000);
    $("#ms-popnews-close").click(() => {
        $("#ms-popnews-bg").fadeOut();
        $("#ms-popnews-box").fadeOut();
    });

    $("#ms-popnews-bg").click(() => {
        $("#ms-popnews-bg").fadeOut();
        $("#ms-popnews-box").fadeOut();
    });
});