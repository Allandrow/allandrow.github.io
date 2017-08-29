// Permet d'obtenir la hauteur de la fenêtre pour assigner une min-height au header pour un bon affichage de l'image 

var x = $(window).height();
$("header").css("min-height", x + "px");

// Effet parralax entre le header et le h1

function parallax(){
	var scrolltop = window.pageYOffset;
	$("h1").css("top", scrolltop * 0.3 + "px");	
	$(".header-bg").css("top", scrolltop * 0.5 + "px");
}


$(window).scroll(function() {
	parallax();
});

// Ouverture et fermeture du menu mobile

function menuToggle() {
	$(".navbar-collapse").toggleClass("show");
}

$(".navbar-toggler").click(function(){
	menuToggle();
});

// Fermeture quand clic sur lien de la nav ou scroll quand sur mobile

$(".nav-link").bind("touchstart", (function() {
	menuToggle();
	// setTimeout(menuToggle, 900);
}));

$(window).bind("touchmove", function() {
	if($(".navbar-collapse").hasClass("show")){
		setTimeout(menuToggle, 200);
	}
});

// Provoquer un scroll amenant à la section 

$(".scrollDown, .nav-link, .navbar-brand").click(function() {
	var $this = $(this).attr("href");
    $("body").animate({
        scrollTop: $($this).offset().top
    }, 
    800);
});

// Affichage du message prévenant de scroll ou click pour voir le contenu dans le header

function checkHidden() {
	if(!$(".scroll-msg").hasClass("hidden")){
		$(".scroll-msg").addClass("hidden");
	};
}

var scrollClick = false;
$(window).scroll(function(){
	scrollClick = true;
	checkHidden();
});

$(".scrollDown").click(function(){
	scrollClick = true;
	checkHidden();
});
	
setTimeout(function(){
	if(!scrollClick) {
		$(".scroll-msg").removeClass("hidden");
	}
}, 5000);

