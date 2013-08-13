$(document).ready(function(){
	var browserW = $(window).width();
	var browserH = $(window).height();
	
	
	$('#btnAdSearch').click(function(){
		$(this).data('clicked',!$(this).data('clicked'));
			if ($(this).data('clicked')){
				$('#boxAdSearch').slideToggle('slow', function() {
					// Animation complete.
				});
			}else{
				$('#boxAdSearch').slideToggle('fast', function() {
					// Animation complete.
				});
			}
    });
	
});
