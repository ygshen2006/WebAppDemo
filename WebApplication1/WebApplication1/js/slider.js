// JavaScript source code
$(document).ready(function () {

    var timer;
    $(".demo-wrap").hover(function () {
        clearTimeout(timer);
        setTimeout(function () {
            $(".demo-btn").stop().slideDown('fast');
        }, 100);
    }, function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            $(".demo-btn").stop().slideUp('fast');
        }, 600);
    });

    //current position
    var pos = 0;
    //number of slides
    var totalSlides = $('#slider-wrap ul li').length;
    // //get the slide width
    // var sliderWidth = $('#slider-wrap').width();

    var autoSlider;
    /*****************
     BUILD THE SLIDER
    *****************/
    //set width to be 'x' times the number of slides
    // $('#slider-wrap ul#slider').width(sliderWidth*totalSlides);

    //next slide  
    $('#next').click(function () {
        slideRight();
    });

    //previous slide
    $('#previous').click(function () {
        slideLeft();
    });



    /*************************
     //*> OPTIONAL SETTINGS
    ************************/
    //automatic slider
    autoTime();

    //for each slide 
    $.each($('#slider-wrap ul li'), function () {
        //set its color
        var c = $(this).attr("data-color");
        $(this).css("background", c);
    });

    //counter
    // countSlides();

    //pagination
    pagination();

    //hide/show controls/btns when hover
    //pause automatic slide when hover
    $('#slider-wrap').hover(
      function () { $(this).addClass('active'); clearInterval(autoSlider); },
      function () { $(this).removeClass('active'); autoTime(); }
    );

    function autoTime() {
        if (pos == 0) {
            clearInterval(autoSlider);
            autoSlider = setInterval(slideRight, 10000);
        } else {
            clearInterval(autoSlider);
            autoSlider = setInterval(slideRight, 5000);
        }

    }

    /***********
     SLIDE LEFT
    ************/
    function slideLeft() {
        pos--;
        if (pos == -1) { pos = totalSlides - 1; }
        $('#slider-wrap ul#slider li:eq(' + pos + ')').fadeIn('slow').siblings().fadeOut('slow');

        //*> optional
        // countSlides();
        pagination();
        autoTime();
    }


    /************
     SLIDE RIGHT
    *************/
    function slideRight() {
        pos++;
        if (pos == totalSlides) { pos = 0; }
        $('#slider-wrap ul#slider li:eq(' + pos + ')').fadeIn('slow').siblings().fadeOut('slow');

        //*> optional 
        // countSlides();
        pagination();
        autoTime();
    }




    /************************
     //*> OPTIONAL SETTINGS
    ************************/
    // function countSlides(){
    //   $('#counter').html(pos+1 + ' / ' + totalSlides);
    // }

    function pagination() {
        $('#pagination-wrap ul li').removeClass('active');
        $('#pagination-wrap ul li:eq(' + pos + ')').addClass('active');
    }

});//DOCUMENT READY




