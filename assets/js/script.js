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
	window.pageYOffset != 0 ? $(".scrollDown").addClass("hide") : $(".scrollDown").removeClass("hide");
});

// Ouverture et fermeture du menu mobile

function menuToggle() {
	$(".navbar-collapse").toggleClass("show");
}

$(".navbar-toggler").on("touchstart", function(){
	menuToggle();
});

// Fermeture quand clic sur lien de la nav ou scroll quand sur mobile

$(".nav-link").bind("touchstart", (function() {
	setTimeout(menuToggle, 200);
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
var quotesTotal = 0, quotesNum = 1;
$(".quote:first-child, .square:first-child").addClass("selected");

// Obtenir le nombre de quotes
$(".quote").each(function(){
	quotesTotal ++;
});

function slide(num, total, direction){
	if(direction === "left"){
		if(num === 1){
			$(".quote:last-child, .square:last-child").addClass("selected");
			return num = total;
		}
		else{
			num--;
			$(".quote[data-value="+num+"], .square[data-target="+num+"]").addClass("selected");
			return num;
		}
	}
	else{
		if(num === total){
			$(".quote:first-child, .square:first-child").addClass("selected");
			return num = 1;
		}
		else{
			num++;
			$(".quote[data-value="+num+"], .square[data-target="+num+"]").addClass("selected");
			return num;
		}
	}
}
//Changement de quote via les arrows
$(".arrow").bind("touchstart click", function(){

	// Empêcher le ghost click sur mobile
	$(this).on("touchend", function(){
		event.preventDefault();
	});

	// Retrait des classes selected
	$(".quote.selected, .square.selected").removeClass("selected");

	// Gestion de l'ordre croissant ou décroissant
	if ($(this).attr("data-direction") === "left") {
		quotesNum = slide(quotesNum, quotesTotal, "left");
	}
	else {
		quotesNum = slide(quotesNum, quotesTotal);
	}
});

// Changement de quote via clic des squares
$(".square").bind("touchstart click", function(){
	var $this = $(this).attr("data-target");
	$(".quote.selected, .square.selected").removeClass("selected")
	$(".quote[data-value="+$this+"]").addClass("selected");
	$(this).addClass("selected");
	quotesNum = Number($this);
});