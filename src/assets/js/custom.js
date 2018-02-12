$(document).ready(function() {
  $('.navicon').click(function() {
    $('.right-bar, .left-section, .navicon').toggleClass('active');
  });

  $('.navicon.active').click(function() {
    $(this).toggleClass('active');
  });

  $('.slider-range-1').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime1
  });

  $('.slider-range-2').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime2
  });

  $('.slider-range-3').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime3
  });

  $('.slider-range-4').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime4
  });

  $('.slider-range-5').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime5
  });

  $('.slider-range-6').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime6
  });

  $('.slider-range-7').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime7
  });

  $('.slider-range-8').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime8
  });

  $('.slider-range-9').slider({
    disabled: true,
    range: true,
    min: 0,
    max: 1439,
    values: [480, 1290],
    slide: slideTime9
  });

  function slideTime1(event, ui) {
    var val0 = $('.slider-range-1').slider('values', 0),
      val1 = $('.slider-range-1').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-1').text(startTime);
    $('.end-time-1').text(endTime);
  }

  function slideTime2(event, ui) {
    var val0 = $('.slider-range-2').slider('values', 0),
      val1 = $('.slider-range-2').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-2').text(startTime);
    $('.end-time-2').text(endTime);
  }

  function slideTime3(event, ui) {
    var val0 = $('.slider-range-3').slider('values', 0),
      val1 = $('.slider-range-3').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-3').text(startTime);
    $('.end-time-3').text(endTime);
  }

  function slideTime4(event, ui) {
    var val0 = $('.slider-range-4').slider('values', 0),
      val1 = $('.slider-range-4').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-4').text(startTime);
    $('.end-time-4').text(endTime);
  }

  function slideTime5(event, ui) {
    var val0 = $('.slider-range-5').slider('values', 0),
      val1 = $('.slider-range-5').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-5').text(startTime);
    $('.end-time-5').text(endTime);
  }

  function slideTime6(event, ui) {
    var val0 = $('.slider-range-6').slider('values', 0),
      val1 = $('.slider-range-6').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-6').text(startTime);
    $('.end-time-6').text(endTime);
  }

  function slideTime7(event, ui) {
    var val0 = $('.slider-range-7').slider('values', 0),
      val1 = $('.slider-range-7').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-7').text(startTime);
    $('.end-time-7').text(endTime);
  }

  function slideTime8(event, ui) {
    var val0 = $('.slider-range-8').slider('values', 0),
      val1 = $('.slider-range-8').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-8').text(startTime);
    $('.end-time-8').text(endTime);
  }

  function slideTime9(event, ui) {
    var val0 = $('.slider-range-9').slider('values', 0),
      val1 = $('.slider-range-9').slider('values', 1),
      hours0 = parseInt((val0 / 60) % 24, 10),
      hours1 = parseInt((val1 / 60) % 24, 10);
    startTime = getTime(hours0);
    endTime = getTime(hours1);
    $('.start-time-9').text(startTime);
    $('.end-time-9').text(endTime);
  }

  function getTime(hours) {
    var time = null;
    if (hours < 12) {
      time = 'AM';
    } else {
      time = 'PM';
    }
    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    return hours + ' ' + time;
  }

  slideTime1();
  slideTime2();
  slideTime3();
  slideTime4();
  slideTime5();
  slideTime6();
  slideTime7();
  slideTime8();
  slideTime9();

  $('.sr-1').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-1').slider({
      disabled: true
    });
  });

  $('.sr-1').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-1').slider({
        disabled: false
      });
    }
  });

  $('.sr-2').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-2').slider({
      disabled: true
    });
  });

  $('.sr-2').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-2').slider({
        disabled: false
      });
    }
  });

  $('.sr-3').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-3').slider({
      disabled: true
    });
  });

  $('.sr-3').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-3').slider({
        disabled: false
      });
    }
  });

  $('.sr-4').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-4').slider({
      disabled: true
    });
  });

  $('.sr-4').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-4').slider({
        disabled: false
      });
    }
  });

  $('.sr-5').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-5').slider({
      disabled: true
    });
  });

  $('.sr-5').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-5').slider({
        disabled: false
      });
    }
  });

  $('.sr-6').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-6').slider({
      disabled: true
    });
  });

  $('.sr-6').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-6').slider({
        disabled: false
      });
    }
  });

  $('.sr-7').click(function() {
    $(this).toggleClass('active');
    $('.slider-range-7').slider({
      disabled: true
    });
  });

  $('.sr-7').click(function() {
    if ($(this).hasClass('active')) {
      $('.slider-range-7').slider({
        disabled: false
      });
    }
  });

  $('.cs-1').click(function() {
    $(this).toggleClass('active');
    if ($('#cs-1').attr('checked', 'true')) {
      $('.slider-range-8').slider({
        disabled: false
      });
    }
  });

  $('.cs-2').click(function() {
    $(this).toggleClass('active');
    if ($('#cs-2').attr('checked', 'true')) {
      $('.slider-range-9').slider({
        disabled: false
      });
    }
  });
});
