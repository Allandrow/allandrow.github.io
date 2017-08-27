// Permet d'obtenir la hauteur de la fenêtre pour assigner une min-height au header pour un bon affichage de l'image 

var x = $(window).height();
$(".header-bg").css("min-height", x + "px");
$("header").css("min-height", x + "px");

// Fermeture du menu mobile quand clic sur lien de la nav ou scroll quand sur mobile

function menuClose() {
	$(".navbar-collapse").collapse("hide");
}

$(".nav-link").bind("touchstart", (function() {
	setTimeout(menuClose, 860);
}));

$(window).bind("touchmove", function() {
	// menuClose();
	setTimeout(menuClose, 200);
});

// Provoquer un scroll amenant à la section 

$(".scrollDown, .nav-link, .navbar-brand").click(function() {
	var $this = $(this).attr("href");
    $("body").animate({
        scrollTop: $($this).offset().top
    }, 
    800);
});

// Effet parralax entre le header et le h1

function parallax(){
	var scrolltop = window.pageYOffset;
	$("h1").css("top", scrolltop * 0.3 + "px");	
	$(".header-bg").css("top", scrolltop * 0.5 + "px");
}


$(window).scroll(function() {
	parallax();
});