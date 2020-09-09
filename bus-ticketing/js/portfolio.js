$(function(){
	$('.remodal-close,.start,.arrival').click(function(){
		var target = $(this).attr('data-target');
		$(target).toggleClass('display-none')
	})

})