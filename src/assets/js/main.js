
(function ($) {
  "use strict";

  /*----------------------------- Site Loader & Popup --------------------*/
  $(window).on("load", function () {
    $("#ms-overlay").fadeOut("slow");
  });

  /*--------------------- Mobile menu sidebar JS -------------------------------- */
  $('.ms-site-menu-icon').on("click", function () {
    $('.ms-mobile-menu-overlay').fadeIn();
    $('.ms-mobile-menu').addClass("ms-menu-open");
  });

  $('.ms-mobile-menu-overlay, .ms-close-menu').on("click", function () {
    $('.ms-mobile-menu-overlay').fadeOut();
    $('.ms-mobile-menu').removeClass("ms-menu-open");
  });

  function ResponsiveMobilemsMenu() {
    var $msNav = $(".ms-menu-content, .overlay-menu"),
      $msNavSubMenu = $msNav.find(".sub-menu");
    $msNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

    $msNav.on("click", "li a, .menu-toggle", function (e) {
      var $this = $(this);
      if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
        e.preventDefault();
        if ($this.siblings("ul:visible").length) {
          $this.parent("li").removeClass("active");
          $this.siblings("ul").slideUp();
          $this.parent("li").find("li").removeClass("active");
          $this.parent("li").find("ul:visible").slideUp();
        } else {
          $this.parent("li").addClass("active");
          $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
          $this.closest("li").siblings("li").find("ul:visible").slideUp();
          $this.siblings("ul").slideDown();
        }
      }
    });
  }

  ResponsiveMobilemsMenu();

  /*--------------------- Replace all SVG images with inline SVG -------------------------------- */
  $(document).ready(function () {
    $('img.svg_img[src$=".svg"]').each(function () {
      var $img = $(this);
      var imgURL = $img.attr('src');
      var attributes = $img.prop("attributes");

      $.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Remove any invalid XML tags
        $svg = $svg.removeAttr('xmlns:a');

        // Loop through IMG attributes and apply on SVG
        $.each(attributes, function () {
          $svg.attr(this.name, this.value);
        });

        // Replace IMG with SVG
        $img.replaceWith($svg);
      }, 'xml');
    });
  });

  /*----------------------------- Category Sidebar js | Toggle Icon OnClick Open sidebar  -----------------------------------*/
  $(".ms-category-toggle").on("click", function () {
    $(".ms-side-cat-overlay").fadeIn();
    $(".ms-category-sidebar").addClass("ms-open-cat");
  });

  $(".ms-close").on("click", function () {
    $(".ms-category-sidebar").removeClass("ms-open-cat");
    $(".ms-side-cat-overlay").fadeOut();
  });

  $(".ms-side-cat-overlay").on("click", function () {
    $(".ms-category-sidebar").removeClass("ms-open-cat");
    $(".ms-side-cat-overlay").fadeOut();
  });

  /*--------------------- Category Sidebar Dropdowns js ---------------------- */
  $(document).ready(function () {
    $(".ms-sidebar-block .ms-sb-block-content ul li ul").addClass("ms-cat-sub-dropdown");

    $(".ms-sidebar-block .ms-sidebar-block-item").on("click", function () {
      var $this = $(this).closest('.ms-sb-block-content').find('.ms-cat-sub-dropdown');
      $this.slideToggle('slow');
      $('.ms-cat-sub-dropdown').not($this).slideUp('slow');
    });
  });

  /*--------------------- Cart sidebar JS -------------------------------- */
  $('.ms-cart-toggle').on("click", function (e) {
    e.preventDefault();
    $(".ms-side-cart-overlay").fadeIn();
    $('.ms-side-cart').addClass("ms-open-cart");
  });
  $('.ms-side-cart-overlay, .ms-cart-close').on("click", function (e) {
    e.preventDefault();
    $(".ms-side-cart-overlay").fadeOut();
    $('.ms-side-cart').removeClass("ms-open-cart");
  });

  /*--------------------- Wishlist sidebar JS -------------------------------- */
  $('.ms-wish-toggle').on("click", function (e) {
    e.preventDefault();
    $(".ms-side-wish-overlay").fadeIn();
    $('.ms-side-wish').addClass("ms-open-wish");
  });
  $('.ms-side-wish-overlay, .ms-wish-close').on("click", function (e) {
    e.preventDefault();
    $(".ms-side-wish-overlay").fadeOut();
    $('.ms-side-wish').removeClass("ms-open-wish");
  });

  /*--------------------- Get live location on menubar ---------------------- */

  $.getJSON('https://ipapi.co/json/', function (data) {
    // $.getJSON('', function(data){
    // console.log(data)
  })

    .then(function (data) {

      var el = document.getElementById('ms_location');

      el.style.display = 'block';

      if (data == 0) {
        // console.log("NO DATA!");
        el.innerText = "Select Location";
      } else {

        // alert(data.city +", "+ data.region +", "+ data.country);
        var is_all_empty = "NO";

        if (data.city == 0 && data.country == 0) {
          data.city = "";
          data.country = "";

          el.innerText = "Enter Your Location";

        } else {
          el.innerText = data.city + ", " + data.country;
        }

        $("#ms_location").parent().attr("title", data.city + ", " + data.country);

        // el.innerText = data.city +", "+ data.region +", "+ data.country; // If You want to add state remove comment

        // Optionally redirect to country specific subdomain
        // window.location.href = "http://country2.example.com";
        $('.ms-detail-current').on('click', function () {
          el.innerText = data.city + ", " + data.country;
          $("#ms_location").parent().attr("title", data.city + ", " + data.country);
        });
      }
    })

  /*--------------------- location Toggle MenuBar ---------------------- */
  jQuery(".ms-location-toggle").on("click", function () {
    jQuery(this).parent().toggleClass('active');
    var $locationItem = $(this).closest('.ms-location-menu').find('.ms-location-dropdown');
    $locationItem.slideToggle('slow');
  });

  $('.loc-list').on('click', function () {
    var mslocname = $(this).find('.ms-detail').html();
    $("#ms_location").html(mslocname);
    $("#ms_location").parent().attr("title", mslocname);
    $('.ms-location-dropdown').slideToggle('slow');
  });

  /*----------------------------- Qty Plus Minus Button  ------------------------------ */
  var QtyPlusMinus = $(".qty-plus-minus");
  QtyPlusMinus.prepend('<div class="dec ms-qtybtn">-</div>');
  QtyPlusMinus.append('<div class="inc ms-qtybtn">+</div>');

  $("body").on("click", ".ms-qtybtn", function () {

    var $qtybutton = $(this);
    var QtyoldValue = $qtybutton.parent().find("input").val();
    if ($qtybutton.text() === "+") {
      var QtynewVal = parseFloat(QtyoldValue) + 1;
    } else {

      if (QtyoldValue > 1) {
        var QtynewVal = parseFloat(QtyoldValue) - 1;
      } else {
        QtynewVal = 1;
      }
    }
    $qtybutton.parent().find("input").val(QtynewVal);
  });

  /*--------------------- Team (About Page) ---------------------- */
  $('.ms-team').owlCarousel({
    margin: 30,
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
      420: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 4
      },
      1400: {
        items: 4
      }
    }
  });

  /*--------------------- New product section Slider ---------------------- */
  $('.new-product-carousel').owlCarousel({
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

  /*--------------------- Category slider section (Home Page) ---------------------- */
  $('.ms-category-block').owlCarousel({
    margin: 24,
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 1500,
    autoplay: true,
    items: 3,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      420: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      },
      1400: {
        items: 6
      }
    }
  });

  /*--------------------- Add More Product slider section (Single Product Page) ---------------------- */
  $('.ms-add-more-slider').owlCarousel({
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
      575: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 2
      },
      1200: {
        items: 3
      },
      1400: {
        items: 3
      }
    }
  });

  /*--------------------- Testimonial Slider ---------------------- */
  $('#ms-testimonial-slider').owlCarousel({
    margin: 0,
    loop: true,
    dots: true,
    nav: false,
    animateOut: 'fadeOut',
    smartSpeed: 1000,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      1367: {
        items: 1
      }
    }
  });

  /*--------------------- Quick view modal images select js ---------------------- */
  $('.modal').on('shown.bs.modal', function (e) {
    $(".qty-product-cover").slick("setPosition");
    $(".qty-nav-thumb").slick("setPosition");
  });
  $('.qty-product-cover', this).not('.slick-initialized').slick({
    autoplay: false,
    lazyLoad: 'ondemand',
    fade: true,
    focusOnSelect: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.qty-nav-thumb',
    infinite: false
  });

  $('.qty-nav-thumb', this).not('.slick-initialized').slick({

    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.qty-product-cover',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    infinite: false,
    prevArrow: '<button class="slide-arrow prev-arrow"><</button>',
    nextArrow: '<button class="slide-arrow next-arrow">></button>',
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2,
        }
      }
    ]
  });

  /*----------------------------- Filter Icon OnClick Open filter Sidebar on shop page -----------------------------------*/
  $(".filter-toggle-icon").on("click", function () {
    $(".filter-sidebar-overlay").fadeIn();
    $(".ms-filter-sidebar").addClass("filter-sidebar-open");
  });

  $(".filter-close, .filter-sidebar-overlay").on("click", function () {
    $(".ms-filter-sidebar").removeClass("filter-sidebar-open");
    $(".filter-sidebar-overlay").fadeOut();
  });

  /*--------------------- Footer Toggle -------------------------------- */
  $(document).ready(function () {
    $(".ms-footer-links").addClass("ms-footer-dropdown");

    $('.ms-footer-heading').append("<div class='ms-heading-res'><i class='msicon msi-angle-down'></i></div>");

    $(".ms-footer-heading .ms-heading-res").click(function () {
      var $this = $(this).closest('.footer-top .col-sm-12').find('.ms-footer-dropdown');
      $this.slideToggle('slow');
      $('.ms-footer-dropdown').not($this).slideUp('slow');
    });
  });

  /*--------------------- Wishlist notify js ---------------------- */
  $('.wishlist').on("click", function () {
    $('.ms-wish-notify').fadeIn().append('<p class="wish-note">Add product in <a href="wishlist.html"> Wishlist</a> Successfully!</p>');
    setTimeout(function () {
      $('.wish-note').fadeOut()
    }, 1000);
  });

  /*--------------------- Compare notify js ---------------------- */
  $('.compare').on("click", function () {
    $('.ms-compare-notify').fadeIn().append('<p class="compare-note">Add product in <a href="compare.html"> Compare list</a> Successfully!</p>');
    setTimeout(function () {
      $('.compare-note').fadeOut()
    }, 2000);
  });

  /*--------------------- Add to cart button notify js ---------------------- */
  $('.add-to-cart').on("click", function () {
    $('.ms-cart-notify').fadeIn();
    setTimeout(function () {
      $('.ms-cart-notify').fadeOut()
    }, 2000);
  });

  /*----------------------------- Cart page Shipping Toggle -------------------------------- */
  $(document).ready(function () {
    $(".ms-sb-block-content .ms-ship-title").click(function () {
      $('.ms-sb-block-content .ms-cart-form').slideToggle('slow');
    });
  });

  /*----------------------------- Cart page Apply Coupen Toggle -------------------------------- */
  $(document).ready(function () {
    $(".ms-cart-coupan").click(function () {
      $('.ms-cart-coupan-content').slideToggle('slow');
    });
    $(".ms-checkout-coupan").click(function () {
      $('.ms-checkout-coupan-content').slideToggle('slow');
    });
  });

  /*----------------------------- Cart Page Qty Plus Minus Button  ------------------------------ */
  var CartQtyPlusMinus = $(".cart-qty-plus-minus");
  CartQtyPlusMinus.append('<div class="ms_cart_qtybtn"><div class="inc ms_qtybtn">+</div><div class="dec ms_qtybtn">-</div></div>');
  $(".cart-qty-plus-minus .ms_cart_qtybtn .ms_qtybtn").on("click", function () {
    var $cartqtybutton = $(this);
    var CartQtyoldValue = $cartqtybutton.parent().parent().find("input").val();
    if ($cartqtybutton.text() === "+") {
      var CartQtynewVal = parseFloat(CartQtyoldValue) + 1;
    } else {

      if (CartQtyoldValue > 1) {
        var CartQtynewVal = parseFloat(CartQtyoldValue) - 1;
      } else {
        CartQtynewVal = 1;
      }
    }
    $cartqtybutton.parent().parent().find("input").val(CartQtynewVal);
  });

  /*----------------------------- Sidebar Block Toggle (Checkout & Cart page) -------------------------------- */
  $(document).ready(function () {
    $(".ms-shop-sidebar .ms-sidebar-block .ms-sb-block-content, .ms-blogs-leftside .ms-sidebar-block .ms-sb-block-content, .ms-cart-rightside .ms-sidebar-block .ms-sb-block-content, .ms-checkout-rightside .ms-sidebar-block .ms-sb-block-content").addClass("ms-sidebar-dropdown");

    $('.ms-sidebar-title').append("<div class='ms-sidebar-res'><i class='msicon msi-angle-down'></i></div>");

    $(".ms-sidebar-title .ms-sidebar-res").click(function () {
      var $this = $(this).closest('.ms-shop-sidebar .ms-sidebar-block, .ms-blogs-leftside .ms-sidebar-block, .ms-cart-rightside .ms-sidebar-block, .ms-checkout-rightside .ms-sidebar-wrap').find('.ms-sidebar-dropdown');
      $this.slideToggle('slow');
    });
  });

  /*----------------------------- Remove Product (Compare page) -------------------------------- */
  $('.remove-compare-product').on("click", function () {
    $(this).parent().fadeOut();
  });

  /*----------------------------- Accordians toggle (faq page) -------------------------------- */
  $('.ms-accordion-header').on("click", function () {
    $(this).parent().siblings().children(".ms-accordion-body").slideUp();
    $(this).parent().find(".ms-accordion-body").slideToggle();
  });

  /*----------------------------- List Grid View -------------------------------- */
  $('.ms-gl-btn').on('click', 'button', function () {
    var $this = $(this);
    $this.addClass('active').siblings().removeClass('active');
  });

  // for 100% width list view
  function showList(e) {
    var $gridCont = $('.shop-pro-inner');
    var $listView = $('.pro-gl-content');
    e.preventDefault();
    $gridCont.addClass('list-view');
    $listView.addClass('width-100');
  }

  function gridList(e) {
    var $gridCont = $('.shop-pro-inner');
    var $gridView = $('.pro-gl-content');
    e.preventDefault();
    $gridCont.removeClass('list-view');
    $gridView.removeClass('width-100');
  }

  $(document).on('click', '.btn-grid', gridList);
  $(document).on('click', '.btn-list', showList);

  // for 50% width list view
  function showList50(e) {
    var $gridCont = $('.shop-pro-inner');
    var $listView = $('.pro-gl-content');
    e.preventDefault();
    $gridCont.addClass('list-view-50');
    $listView.addClass('width-50');
  }

  function gridList50(e) {
    var $gridCont = $('.shop-pro-inner');
    var $gridView = $('.pro-gl-content');
    e.preventDefault();
    $gridCont.removeClass('list-view-50');
    $gridView.removeClass('width-50');
  }

  $(document).on('click', '.btn-grid-50', gridList50);
  $(document).on('click', '.btn-list-50', showList50);

  /*----------------------------- Price Range slider ( Shop page ) -------------------------------- */
  const slider = document.getElementById('ms-sliderPrice');
  if (slider) {
    const rangeMin = parseInt(slider.dataset.min);
    const rangeMax = parseInt(slider.dataset.max);
    const step = parseInt(slider.dataset.step);
    const filterInputs = document.querySelectorAll('input.filter__input');

    noUiSlider.create(slider, {
      start: [rangeMin, rangeMax],
      connect: true,
      step: step,
      range: {
        'min': rangeMin,
        'max': rangeMax
      },

      // make numbers whole
      format: {
        to: value => value,
        from: value => value
      }
    });

    // bind inputs with noUiSlider 
    slider.noUiSlider.on('update', (values, handle) => {
      filterInputs[handle].value = values[handle];
    });

    filterInputs.forEach((input, indexInput) => {
      input.addEventListener('change', () => {
        slider.noUiSlider.setHandle(indexInput, input.value);
      })
    });
  }

  /*----------------------------- Product Image Zoom --------------------------------*/
  $('.zoom-image-hover').zoom();

  /*----------------------------- single product Slider  ------------------------------ */
  $('.single-product-cover').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '.single-nav-thumb',
  });

  $('.single-nav-thumb').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.single-product-cover',
    dots: false,
    arrows: true,
    focusOnSelect: true
  });

  /*----------------------------- Single Product Color and Size Click to Active -------------------------------- */
  $(document).ready(function () {
    $(".ms-pro-variation-content ul li").click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  });

  /*----------------------------- Back to top button  ------------------------------ */
  var btn = $('.ms-back-to-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  /*----------------------------- Template run directly --------------------*/
  $(window).on("load", function () {

    setTimeout(function () {
      switch (window.location.protocol) {
        case 'file:':
          var alertBody = '<div id="ms-direct-run" class="ms-direct-run"><div class="ms-direct-body"><h4>Template Run Directly</h4><p>As we seeing you are try to load template without Local | Live server. it will affect missed or lost content. Please try to use Local | Live Server. </p></div></div>';
          $("body").append(alertBody);

          break;
        default:
        //some other protocol
      }
    }, 3000);
  });

  /*----------------------------- Features sidebar ---------------------- */
  $(".ms-tools-sidebar-toggle").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("open-features")) {
      $(".ms-features-sidebar").stop().animate({ right: "0px" }, 100);
      $(".ms-features-sidebar-overlay").fadeIn();
      if ($(".ms-tools-sidebar-toggle").not("open-features")) {
        $(".ms-features-sidebar").stop().animate({ right: "-250px" }, 100);
        $(".ms-tools-sidebar-toggle").addClass("open-features");
      }
      if ($(".ms-tools-sidebar-toggle").not("open-features")) {
        $(".ms-features-sidebar").stop().animate({ right: "0" }, 100);
        $(".ms-tools-sidebar-toggle").addClass("open-features");
        $(".ms-features-sidebar-overlay").fadeIn();
      }
    } else {
      $(".ms-features-sidebar").stop().animate({ right: "-250px" }, 100);
      $(".ms-features-sidebar-overlay").fadeOut();
    }

    $(this).toggleClass("open-features");
    return false;

  });

  $(".ms-features-sidebar-overlay").on("click", function (e) {
    $(".ms-tools-sidebar-toggle").addClass("open-features");
    $(".ms-features-sidebar").stop().animate({ right: "-250px" }, 100);
    $(".ms-features-sidebar-overlay").fadeOut();
  });

  /*----------------------------- Change Template Color -------------------------------- */
  $('.ms-features-block').on('click', 'li', function () {
    $('link[href^="assets/css/color-"]').remove();
    var dataValue = $(this).attr('data-color');
    $('link.dark').remove();
    $("#ms-change-mode").removeClass('active');
    if ($(this).hasClass('active')) return;

    $(this).toggleClass('active').siblings().removeClass('active');

    if (dataValue != undefined) {
      $("link[href='assets/css/responsive.css']").before('<link rel="stylesheet" class="color-css" href="assets/css/color-' + dataValue + '.css" rel="stylesheet">');
    }

    return false;
  });

  /*----------------------------- Change Template Dark mode -------------------------------- */
  $(".ms-mode-switch").on("click", function (e) {
    e.preventDefault();
    $('link.color-css').remove();
    $(".ms-change-color li").removeClass('active');
    var $link = $('<link>', {
      rel: 'stylesheet',
      href: 'assets/css/dark-mode.css',
      class: 'dark'
    });
    $(this).parent().toggleClass('active');
    var modevalue = "light";
    if ($(this).parent().hasClass('ms-change-mode') && $(this).parent().hasClass('active')) {
      $("link[href='assets/css/responsive.css']").after($link);

    } else if ($(this).parent().hasClass('ms-change-mode') && !$(this).parent().hasClass('active')) {
      $('link.dark').remove();
      modevalue = "light";
    }
    if ($(this).parent().hasClass('active')){
      $("body").addClass("dark");
      modevalue = "dark";
    }else{
        $("body").removeClass("dark");
        $('link.dark').remove();
    }
  });

})(jQuery);
