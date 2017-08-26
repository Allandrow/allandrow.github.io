// Permet d'obtenir la hauteur de la fenêtre pour assigner une min-height au header pour un bon affichage de l'image 

var x = $(window).height();
$('header').css('min-height', x + 'px');

// Gestion de la distance de scroll pour modifier la taille de la navbar une fois sticky

$(window).scroll(function() {
	var scrollTop     = $(window).scrollTop(),
    	elementOffset = $('#about').offset().top,
    	distance      = (elementOffset - scrollTop);

	if(distance < 0){
		$('.nav-wrap').addClass("stuck");
	}
	else {
		$('.nav-wrap').removeClass("stuck");
	}
});

// Fermeture du menu mobile quand clic sur lien de la nav ou scroll quand sur mobile

function menuClose() {
	$('.navbar-collapse').collapse('hide');
}

$('.nav-link').bind("touchstart", (function() {
	setTimeout(menuClose, 860);
}));

$(window).bind('touchmove', function() {
	// menuClose();
	setTimeout(menuClose, 200);
});

// Provoquer un scroll amenant à la section 

$(".scrollDown, .nav-link, .navbar-brand ").click(function() {
	var $this = $(this).attr('href');
    $('body').animate({
        scrollTop: $($this).offset().top
    }, 
    800);
});