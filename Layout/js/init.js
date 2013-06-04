// Avoid `console` errors in browsers that lack a console.
(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();

$(document).ready(function(){
	var browserW = $(window).width();
	var browserH = $(window).height();
	
	
	
	/*MENU ##################################*/
	$('#menuTab a').click(function(e) {
        e.preventDefault();
		var subMenu = $($(this).attr("href"));
        
		if (subMenu.is(':hidden')) {
            subMenu.slideDown("200");
			$(this).parent().toggleClass('active');
			
        } else {
            subMenu.slideUp("100");
			$(this).parent().toggleClass('active');
        }
		return false;
    });
	
	
	
	
	/* CAROUSEL ##################################*/
	var instanceOne = new ImageFlow();
	instanceOne.init({ ImageFlowID: 'carousel', 
                   reflections: false, 
                   reflectionP: 0.4,
				   circular: true, 
                   slider: false,
                   captions: false });
	
	
	
});
