$(document).ready(function() {
    // Маска для телефона
    $("[name=tel]").mask("+7(999) 999-99-99");
    //

    // Обработка форма на AJAX
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    },
                          "Введите полный номер.");
    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    },
                          "Это поле необходимо заполнить.");

	$("form").each(function(){
		$(this).validate({
			rules: {
                name: {
					required: true,
				},
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
							$('.popup').fadeOut();
							$('.popup_thank_you').centered_popup();
							$('.overlay').fadeIn();
							$('.popup_thank_you').fadeIn();

                            // Через 5 сек скрываем "спасибо"
							setTimeout(function(){
								$('.popup_thank_you').fadeOut(500);
								$('.overlay').fadeOut(500);
							}, 5 * 1000)
	   			}
	   		});
				return false;
	   	}
		});
	});
	//
});