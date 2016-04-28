
$(document).ready(function() {
  $('a[href="#"]').click(function(e){
    e.preventDefault();
  });

  $('#nav').onePageNav();

  $(window).scroll(function(){
    if ($(this).scrollTop() > 33) {
        $('header').addClass('small');
    } else {
        $('header').removeClass('small');
    }
  });
  $(".logo").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    return false;
  });



  var a = 0;
  for (; a < 15; a += 1) {
      setTimeout(function b() {
          var a = Math.random() * 1e3 + 5e3,
              c = $("<div />", {
                  "class": "smoke",
                  css: {
                      opacity: 0,
                      left: Math.random() * 200 + 80
                  }
              });
          $(c).appendTo("#viewport");
          $.when($(c).animate({
              opacity: 1
          }, {
              duration: a / 4,
              easing: "linear",
              queue: false,
              complete: function() {
                  $(c).animate({
                      opacity: 0
                  }, {
                      duration: a / 3,
                      easing: "linear",
                      queue: false
                  })
              }
          }), $(c).animate({
              bottom: $("#viewport").height()
          }, {
              duration: a,
              easing: "linear",
              queue: false
          })).then(function() {
              $(c).remove();
              b()
          })
      }, Math.random() * 3e3)
  };



  // MAP
   var map;
   function initialize()
   {
     map = new google.maps.Map(document.getElementById('map-canvas'), {
       center: new google.maps.LatLng(55.669894,37.515371),
       zoom: 13,
       scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
     });
     setMarkers(map);

   }
   var beaches = [
     ['Moscow2', 55.846133, 37.662596, 3],
     ['Moscow2', 55.756543, 37.560017, 2],
     ['Moscow1', 55.669894, 37.515371, 1]
   ];
   function setMarkers(map) {
     var image = {
       url: 'images/screen_5/marker.png',
       size: new google.maps.Size(60, 84),
       origin: new google.maps.Point(0, 0),
       anchor: new google.maps.Point(30, 84)
     };

     for (var i = 0; i < beaches.length; i++) {
       var beach = beaches[i];
       var marker = new google.maps.Marker({
         position: {lat: beach[1], lng: beach[2]},
         map: map,
         icon: image,
         title: beach[0],
         zIndex: beach[3]
       });
     }
   }




   function newLocation(newLat,newLng)
   {
     map.setCenter({
       lat : newLat,
       lng : newLng
     });
   }
   google.maps.event.addDomListener(window, 'load', initialize);
   //Setting Location with jQuery
   $(document).ready(function ()
   {
       $("#1").on('click', function ()
       {
       newLocation(55.669894,37.515371);
     });
     $("#2").on('click', function ()
       {
       newLocation(55.756543,37.560017);
     });
       $("#3").on('click', function ()
       {
       newLocation(55.846133,37.662596);
     });
   });
  var $mapTrigger = $('.maps-trigger .item');
  $mapTrigger.on('click', function(){
    $mapTrigger.removeClass('current');
    $(this).addClass('current');
  });


  //Carousel
  $('.carousel-initial').slick({
    fade: true,
    dots: true
  });

  $('.carousel-colors').each(function(){
    $(this).slick({
      fade: true,
      dots: true,
      arrows: false,
      draggable: false,
      infinite: false,
      swipe: false,
      dotsClass: 'color-dots',
      appendDots: $(this).parent().parent().find('.colors-nav')
    });
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false
  });

  $('#nav-catalog .right .title').each(function(){
    console.log($(this).text());
  });

  $('#nav-catalog .hook-btn').on('click', function(){
    var model = $(this).parent().parent().find('.title').text();
    $('#modal-type').val(model);
  });

  // FORM
  // Маска для телефона
  $("[name=tel]").mask("+7(999) 999-99-99");

  // Обработка форма на AJAX
  $.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
  }, "Введите полный номер.");
  $.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
  }, "Это поле необходимо заполнить.");

  $("form").each(function(){
    $(this).validate({
      rules: {
        name: { required: true },
        tel: {
          requiredphone: true,
          minlenghtphone: true
        }
      },
      submitHandler: function(form, event){
        event = event || window.event;
        $(form).ajaxSubmit({
          //dataType: 'script',
          error: function(){
            alert("Ошибка!");
          },
          success: function(responseText, statusText, xhr){
            // Отправка данных формы в Comagic
            /*
            Comagic.addOfflineRequest({
                name: $(form).find('[name="name"]').val(),
                phone: $(form).find('[name="tel"]').val(),
            });
            */
            // Цель на отправку формы
            /****  Поменять номер счетчика ****/
            //yaCounter29402220.reachGoal('ORDER');
            // Очистка форм после отправки
            $('.form-input').val('');
            // Появление "спасибо"
            $('#modal .default').fadeOut('300', function(){
              $('#modal').css('height', 'auto');
              $('.popup_thank_you').fadeIn(300);
            });



          }
        });
        return false;
      }
    });
  });
  //
});
$(window).load(function() {

  $('#preloader').fadeIn('0').delay(2000).fadeOut('1500');

  setTimeout(function(){
    $("#prelogo, .sk-folding-cube").addClass('move');
  }, 1500);

  setTimeout(function(){
    $('body').removeClass("loaded");
  }, 2000);
});