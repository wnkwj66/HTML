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
	// 달력
	$( "#calender" ).datepicker({
        showOn: "both", 
        buttonImage: "../css/img/ico_calender.png", 
        buttonImageOnly: true,
        //날짜 선택 시 데이터 표기 방법 ex) yy.mm.dd = 2020.09.21
        dateFormat: "yy. m. d. D", // 2020.9.21.월
        //한글화
        dayNames: [ "일요일","월요일","화요일","수요일","목요일","금요일","토요일" ],
        dayNamesShort: [ "일","월","화","수","목","금","토" ],
	    dayNamesMin: [ "일","월","화","수","목","금","토" ],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        weekHeader: "주",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
		yearSuffix: ".",
	}).datepicker('setDate', new Date());
	$('.ui-datepicker ').css( {"margin":"15px 0 0 -15px"},{})
})