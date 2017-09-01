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

// Disparition de l'élément scrollDown du header quand scroll mobile

$(window).bind("touchmove", function(){
	if(window.pageYOffset != 0){
		$(".scrollDown").addClass("hide");
	}
	else {
		$(".scrollDown").removeClass("hide");
	}
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

// slider références

// Init
var quotesTotal = 0;
var quotesNum = 1;
$(".quote").first().addClass("selected");
$(".square").first().addClass("selected");

// Obtenir le nombre de quotes
$(".quote").each(function(){
	quotesTotal ++;
});

// Changement de quote dans l'ordre croissant
$(".arrowRight").bind("touchstart click", function(){
	
	var $this = $(".quote.selected");

	// Retrait et ajout de la classe selected
	$this.removeClass("selected");
	$(".square.selected").removeClass("selected");

	// Gestion du cas dernière quote du bloc > retour à la première
	if (quotesNum === quotesTotal){
		quotesNum = 1;
		$(".quote").first().addClass("selected");
		$(".square").first().addClass("selected");
	}
	else{
		$this.next().addClass("selected");
		quotesNum ++;
		$(".square[data-target="+quotesNum+"]").addClass("selected");
	}
});

// Changement de quote dans l'ordre décroissant
$(".arrowLeft").bind("touchstart click", function(){
	var $this = $(".quote.selected");

	// Retrait et ajout de la classe selected
	$this.removeClass("selected");
	$(".square.selected").removeClass("selected");

	// Gestion du cas de première quote du bloc > retour à la dernière
	if (quotesNum === 1){
		quotesNum = quotesTotal;
		$(".quote").last().addClass("selected");
		$(".square").last().addClass("selected");
	}
	else{
		$this.prev().addClass("selected");
		quotesNum --;
		$(".square[data-target="+quotesNum+"]").addClass("selected");
	}
});

// Changement de quote via clic des squares
$(".square").bind("touchstart click", function(){
	var $this = $(this).attr("data-target");
	
	$(".quote.selected").removeClass("selected")
	$(".quote").each(function(){
		if($(this).attr("data-value") === $this){
			$(this).addClass("selected");
			quotesNum = $this;
		}
	});
	$(".square.selected").removeClass("selected");
	$(this).addClass("selected");

});