$(function(){
	// a태그의 aria-selected값이 true인 요소의 data-target과 일치하는 컨텐츠만 보여줌
	//.attr(attributeName) :선택한 요소의 속성의 값을 가져옵니다
	//.attr( attributeName, value ) :선택한 요소에 속성을 추가합니다.
	function viewContent(){
		var target = $(".side-menu a[aria-selected=true]").attr("data-target");
		$(".tic-box").addClass("display-none");
		$(target).removeClass("display-none");
	}
	viewContent();
	$(".side-menu li > a").click(function(e){
		e.preventDefault();
		$(".side-menu a").attr("aria-selected","false")
		$(this).attr("aria-selected","true");
		viewContent();
	})
	$(".place-box li").click(function(e){
		$(".remodal-is-opened").fadeIn();
		e.preventDefault();
	})
	$(".remodal-close").click(function(e){
		$(".remodal-is-opened").fadeOut();
		e.preventDefault();
	})
	$(".side-menu li").hover(function(){
		$(".side-menu ")
	})
	
	// focus
	$('.pop_place .place li').on('click',function(){
		$('.pop_place .place li').removeClass('focuson');
		$(this).addClass('focuson').parents('place').addClass('focus');
		//$(this).find('.val_txt').text('');
	});

	$('.pop_place .place .text').each(function(){
		if ( $(this).find('.val_txt').text() == "" ){
			$(this).addClass('empty');
		}
	});
	/* 지역별터미널 지역선택 */
	var placeList = $('.pop_place .start_wrap span, .pop_place .area_list li')
	placeList.on('click', function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	// 편도 / 왕복 
	$('.route-box li').click(function(){
		$('.one-way').click(function(){
			$(this).addClass('active');
			$('.round-trip').removeClass('active');
		})
		$('.round-trip').click(function(){
			$(this).addClass('active');
			$('.one-way').removeClass('active')
		})
	})
})