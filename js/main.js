$( document ).ready( function() {
	// ********************* MOBILE TAP *********************************************************************************************************************
	var tapClass = "";
	var hoverClass = "";
	var Hover = window.Hover = function (ele) {
		return new Hover.fn.init(ele);
	};
	Hover.fn = {
		//Hover Instance
		init : function (ele) {
			this.prop = ele;
		},
		bind : function (_hoverClass, _tapClass) {
			hoverClass = _hoverClass;
			tapClass = _tapClass;
			$(window).bind("touchstart", function(event) {
				var target = event.target || window.target;
				var bindElement = null;
				if (target.tagName == "A" || $(target).hasClass(tapClass)) {
				bindElement = $(target);
				} else if ($(target).parents("a").length > 0) {
				bindElement = $(target).parents("a");
				} else if ($(target).parents("." + tapClass).length > 0) {
				bindElement = $(target).parents("." + tapClass);
				}
				if (bindElement != null) {
				Hover().touchstartHoverElement(bindElement);
				}
			});
		},
		touchstartHoverElement : function (bindElement) {
			bindElement.addClass(hoverClass);
			bindElement.unbind("touchmove", Hover().touchmoveHoverElement);
			bindElement.bind("touchmove", Hover().touchmoveHoverElement);
			bindElement.unbind("touchend", Hover().touchendHoverElement);
			bindElement.bind("touchend", Hover().touchendHoverElement);
		},
		touchmoveHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		},
		touchendHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
	}
	Hover.fn.init.prototype = Hover.fn;
	Hover().bind("hover", "tap");
	// ********************* END OF MOBILE TAP ***************************************************************************************************

	// ********************* Window Load *********************************************************************************************************
	$(window).load(function() {

		// ********************* preloader
		$('.ROW-preloader').fadeOut();
		$('header').fadeIn(2000, function() {
			$('.row.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});

		// ********************* cut section
		$('section .cut').each(function() {
			if ($(this).hasClass('cut-top'))
				$(this).css('border-right-width', $(this).parent().width() + "px");
			else if ($(this).hasClass('cut-bottom'))
				$(this).css('border-left-width', $(this).parent().width() + "px");
		});

		// ********************* Navbar Init
		$('nav').clone().insertAfter('nav').addClass('navbar-fixed-top').removeClass('original');
		$('.mobile-nav ul').html($('nav .navbar-nav').html());

		// ********************* Onepage Nav
		$('.navbar.navbar-fixed-top .navbar-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpeed: 400
		});

		// ********************* jQuery-Validation-Engine
	  $("form").validationEngine('attach', {
			promptPosition : "topLeft",
			scroll: false,
			ajaxFormValidation: true
		});

		// ********************* Header parallax
		// var ratio = 2;
		// if ($(window).height() > $(window).width()) {
		// 	var ratio = $('.parallax').width() / $('.parallax').height();
		// 	$('.parallax img').css('height', ($(window).height()) + 'px');
		// 	$('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
		// }

		// // ********************* Popup Form Init
		// var i = 0;
		// var interval = 0.15;
		// $('.popup-form .dropdown-menu li').each(function() {
		// 	$(this).css('animation-delay', i + "s");
		// 	i += interval;
		// });
		// $('.popup-form .dropdown-menu li a').click(function(event) {
		// 	event.preventDefault();
		// 	$(this).parent().parent().prev('button').html($(this).html());
		// });
	});
	// ********************* END OF Window Load ****************************************************************************************************************

	// ********************* Window Scroll ********************************************************************************************************************
	function onScroll() {
		if ($(window).scrollTop() > 50) {
			$('nav.original').css('opacity', '0');
			$('nav.navbar-fixed-top').css('opacity', '1');
		} else {
			$('nav.original').css('opacity', '1');
			$('nav.navbar-fixed-top').css('opacity', '0');
		}
	}

	$(function() {
		$('.smscroll').click(function() {
			var target = $(this).attr('href');
			if (!target.length) return ;
			$("html,body").animate({scrollTop:$(target).offset().top}, 600, 'swing');
			return false;
		});
	});

	window.addEventListener('scroll', onScroll, false);

	// ********************* Window Resize ********************************************************************************************************************
	$(window).resize(function() {
		$('header').height($(window).height());
	});

	// ********************* Nav Click ********************************************************************************************************************
	$('body').on('click', 'nav.original .navbar-nav a:not([data-toggle])', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	// ********************* Mobile Nav Open ********************************************************************************************************************
	// Mobile Nav OPEN & LOCK SCROLL
	$('body').on('click', 'nav .navbar-toggle', function() {
		event.stopPropagation();
		$(window).on('touchmove.noScroll', function(e) {
      e.preventDefault();
	  });
		$('.mobile-nav').addClass('active');
	});

	// Mobile Nav TRNSITION & UN-LOCK SCROLL
	$('body').on('click', '.mobile-nav a', function(event) {
		$(window).off('.noScroll');
		$('.mobile-nav').removeClass('active');
		if(!this.hash) return;
		event.preventDefault();
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	// Mobile Nav CLOSE & UN-LOCK SCROLL
	$('body').on('click', '.mobile-nav a.close-link', function(event) {
		$(window).off('.noScroll');
		$('.mobile-nav').removeClass('active');
		event.preventDefault();
	});

	// ********************* Modal Open ********************************************************************************************************************
	$('.modal-popup .close-link').click(function(event){
		event.preventDefault();
		$('.modal').modal('hide');
	});

	// ********************* Modal Contact ********************************************************************************************************************
	var scrollpos;

	function lockScroll(){
		scrollpos = $(window).scrollTop();
		$('body').addClass('fixed-scroll').css({'top': -scrollpos});
	}
	function unlockScroll(){
		$('body').removeClass('fixed-scroll').css({'top': 0});
		window.scrollTo( 0 , scrollpos );
	}

	$('body').on('click', '#btn-contact', function() {
		lockScroll();
	});

	$('body').on('click', '.modal-popup a.close-link', function() {
		unlockScroll();
	});


	$(document).on('click','#btnFmCnfm',function(){
		$("#form-contact").validationEngine('validate')
		$("#form-contact-explain").html("以下の内容で送信しますが、よろしいですか？");
		$("#form-contact input:not([type='submit']), #form-contact textarea").attr('readonly',true);
		// $('form').validationEngine('hide');
		$(".form-contact-label, #btnFmCnfm, #btnFmSbmt, #btnFmCrrct").toggleClass("hidden");
		$("#form-contact").validationEngine("updatePromptsPosition");
	});
	$(document).on('click','#btnFmCrrct',function(){
		$("#form-contact-explain").html("全ての項目を入力してください。");
		$("#form-contact input:not([type='submit']), #form-contact textarea").attr('readonly',false);
		$(".form-contact-label, #btnFmCnfm, #btnFmSbmt, #btnFmCrrct").toggleClass("hidden");
		$("#form-contact").validationEngine("updatePromptsPosition");
	});
	$(document).on('click','#btnFmSbmt',function(){
		$("#form-contact-explain").html("正常に送信されました。ありがとうございました。<br>なお、内容によっては返信できかねる場合がございますのでご了承ください。");
		$("#form-contact").addClass("hidden");
		unlockScroll();
		setTimeout(function(){
	  	$('#modal-contact').modal('hide');
			$("#form-contact-explain").html("全ての項目を入力してください。");
			$("#form-contact input:not([type='submit']), #form-contact textarea").attr('readonly',false).val('');
			$(".form-contact-label, #btnFmCnfm, #btnFmSbmt, #btnFmCrrct").toggleClass("hidden");
			$("#form-contact").removeClass("hidden");
		},4000);
	});
	// ********************* END OF Modal Contact ********************************************************************************************************************
});
