$(function () {
	var defaultMenu = ['사전', '뉴스', '증권', '부동산', '지도', '영화', '뮤직', '책', '웹툰'];
	var defaultMenuLink
		= ['https://dict.naver.com/',
			'https://news.naver.com/',
			'https://finance.naver.com/',
			'https://land.naver.com/',
			'https://map.naver.com/v5/?c=14139734.6171725,4507639.6434387,15,0,0,0,dh',
			'https://movie.naver.com/',
			'https://vibe.naver.com/about',
			'https://book.naver.com/',
			'https://comic.naver.com/index.nhn'
		]
	var selectMenu = [];
	var selectMenuLink = [];
	var allMenuLink = ['모든 링크가 위에처럼 있어야함'];
	var tmpMenu = [];
	$('html').scrollTop(0);
	$('.btn-close-whale').click(function (e) {
		$('.box-whale').addClass('display-none');
		e.preventDefault();//버튼 클릭시 URL에 #붙는것 방지
	})
	// 자동 완성 기능 클릭 시 자동 완성 기능 이벤트 발생
	$('.btn-auto-search').click(function () {
		$('.box-auto-box').toggleClass('display-none'); //자동완성 기능 활성화
		$('.icon-auto-search').toggleClass('active'); //버튼 변경
	})
	// click(function(){})은 이벤트 등록
	$('.link-auto-close').click(function (e) {
		// click() 괄호 안이 비면 이벤트를 실행 하는 기능
		$('.btn-auto-search').click();
		e.preventDefault();
	})
	// 더보기/접기 버튼 클릭
	$('.btn-more').click(function () {
		$('.ly-service').toggleClass('display-none');
		$('.box-group-keyword').toggleClass('display-none');
		$('.box-service-menu').toggleClass('display-none');
		$('.btn-more').toggleClass('display-none');
		if ($(this).hasClass('fold')) {
			initMenu();
		}
	})
	// 메뉴설정에서 메뉴 선택시
	$('.service-data').click(function () {
		var selMenu = $(this).text();
		//이미 선택된 메뉴를 클릭해서 선택을 해제하는 경우
		if (tmpMenu.indexOf(selMenu) >= 0) {
			tmpMenu.splice(tmpMenu.indexOf(selMenu), 1);
			$(this).find('input').prop('checked', false);
		}
		// 메뉴 선택시
		else {
			if (tmpMenu.length == 5) {
				alert('최대 5개까지 설정할 수 있습니다.');
				return;
			}
			tmpMenu.push(selMenu);
			// 선택된 요소의 자손 중 input태그의 checked속성을 true로 설정
			$(this).find('input').prop('checked', true);
		}
		$(this).find('.icon-check').toggleClass('checked');
		var cnt = 0;
		var max = 5;
		$('.nav-item').each(function () {
			if (cnt < tmpMenu.length) {
				$(this).removeClass('bpx-empty select');
				$(this).find('nav').text(tmpMenu[cnt]);
			} else {
				if (cnt == tmpMenu.length && cnt < max) {
					$(this).addClass('select');
				} else {
					$(this).removeClass('select');
				}
				$(this).addClass('box-empty');
				$(this).find('.nav-item').text('');
			}
			cnt++;
		})
	})
	//메뉴 설정 버튼 클릭
	$('.btn-menu-set').click(function () {
		$('.box-service-menu.display').addClass('display-none');
		$('.box-service-menu.set').removeClass('display-none');
		$('.box-container-servicelist .container.display').addClass('display-none');
		$('.box-container-servicelist .container.set').removeClass('display-none');
		//검은색 메뉴 박스 부분
		var cnt = 0;
		var max = 5;
		$('.box-menu-black').each(function () {
			if (cnt < selectMenu.length) {
			}
			else if (cnt < max) {
				if (selectMenu.length == cnt)
					$(this).addClass('select');
				$(this).addClass('box-empty');
				$(this).find('.link-menu-black').text('');
				$(this).removeClass('display-none');
			} else {
				$(this).addClass('display-none')
			}
			cnt++;
		})
		$('.box-serivce-check input').each(function () {
			var isChecked = $(this).prop('checked');
			if (isChecked) {
				$(this).siblings('.icon-check').addClass('checked')
			}
		})
	})
	//저장 버튼
	$('.btn-service-save').click(function () {
		selectMenu = tmpMenu.slice();
		$('.fold').click();
	})
	$('.fold').click(function () {
		$('.box-menu-black').removeClass('box-empty select');
		var cnt = 0;
		var max = 5;
		$('.box-menu-black').each(function () {
			if (selectMenu.length != 0) {
				if (cnt >= selectMenu.length)
					$(this).addClass('display-none');
			} else {
				$(this).removeClass('display-none');
				$(this).find('.link-menu-black').text(defaultMenu[cnt]);
			}
			cnt++;
		});
		//기본 메뉴에서 메뉴 설정 클릭 후 메뉴를 선택 후 접기 버튼을 클릭하거나
		//메뉴 설정 클릭 후 메뉴를 선택하지 않고 접기 버튼을 클릭
	})
	$('.btn-service-init').click(function () {
		alert('초기설정으로 돌아갑니다.');
		selectMenu = [];
		$('.box-serivce-check>input').prop('checked', false);
		$('.fold').click();
	})

	// =====================================================
	$('btn-set').click(function () {
		if (!$(this).hasClass('not')) {
			$('.btn-set>i').removeClass('set');
			$(this).find('i').addClass('set');
		}
	})
	$('.btn-set').hover(function () {
		$(this).find('i').toggleClass('hover');
	})
	$('.box-thumb-area').hover(function () {
		$(this).find('img').toggleClass('display-none');
		$(this).find('.box-thumb').toggleClass('display-none');
	})
	$('.box-thumb>a').hover(function () {
		$(this).toggleClass('active');
		$(this).siblings().toggleClass('disable');
	})
	$('.btn-nav-prev').click(function () {
		if (!$('.rolling-panel>.card').is(':animated')) {
			$('.rolling-panel>.card').last().detach().prependTo('.rolling-panel').css('margin-left', '-281px');
			$('.rolling-panel>.card').first().animate({ 'margin-left': '0' }, 1000)
		}
	})
	$('.btn-nav-next').click(function () {
		if (!$('.rolling-panel>.card').is(':animated')) {
			$('.rolling-panel>.card').first().animate({ 'margin-left': '-281px' }, 1000, function () {
				$(this).detach().appendTo('.rolling-panel').removeAttr('style');
			})
		}
	})
	/*
	$(선택자).attr('속성명','값A') : 해당 요소의 속성의 값을 값A로 설정 
	$(선택자).attr('속성명') : 해당 요소의 속성의 값을 가져옴
	$(선택자).prop('속성명','값A') : 해당 요소의 속성의 값을 값A로 설정 
	$(선택자).prop('속성명') : 해당 요소의 속성의 값을 가져옴
	*/
	$('.category-item .tab').click(function (e) {
		e.preventDefault();
		$('.category-item .tab').attr('aria-selected', 'false');
		$(this).attr('aria-selected', true);
		themeBtnView();
		themeBodyView();
	})
	// ==========================================================================
	$('.tab-item .tab').click(function (e) {
		e.preventDefault();
		$('.tab-item .tab').attr('aria-selected', 'false');
		$(this).attr('aria-selected', true);
		shopContentsView();
	})
	// ==========================================================================
	$('.pm-btn-prev').click(function (e) {
		e.preventDefault();
		if ($('.tab[aria-selected=true]').hasClass('id-tech')) {
			$('.list-category').animate({ 'margin-left': '0' }, 1000)
		}
		if ($('.tab[aria-selected=true]').hasClass('id-business')) {
			$('.list-category').animate({ 'margin-left': '-750px' }, 1000)
		}
		if ($('.tab[aria-selected=true]').hasClass('id-parents')) {
			$('.list-category').animate({ 'margin-left': '-1500px' }, 1000)
		}
		$('.tab[aria-selected=true]').attr('aria-selected', 'false').parent()
			.prev().find('.tab').attr('aria-selected', 'true');
		themeBtnView();
		themeBodyView();
	})
	$('.pm-btn-next').click(function (e) {
		e.preventDefault();
		if ($('.tab[aria-selected=true]').hasClass('id-movie')) {
			$('.list-category').animate({ 'margin-left': '-750px' }, 1000)
		}
		if ($('.tab[aria-selected=true]').hasClass('id-riving')) {
			$('.list-category').animate({ 'margin-left': '-1500px' }, 1000)
		}
		if ($('.tab[aria-selected=true]').hasClass('id-farm')) {
			$('.list-category').animate({ 'margin-left': '-2250px' }, 1000)
		}
		$('.tab[aria-selected=true]').attr('aria-selected', 'false').parent()
			.next().find('.tab').attr('aria-selected', 'true');
		themeBtnView();
		themeBodyView();
	})

	themeBodyView();
	function themeBodyView() {
		var target = $('.tab[aria-selected=true]').attr('data-target');

		$('.box-theme-body .box-body').addClass('display-none');
		$('.box-theme-body>.' + target).removeClass('display-none');
	}
	// ==========================================================================
	shopContentsView();
	function shopContentsView() {
		var target = $('.tab-item .tab[aria-selected=true]').attr('data-target');
		$('.shop-contents .group-shop').addClass('display-none');
		$('.shop-contents>.' + target).removeClass('display-none');
	}
	// ==========================================================================
	themeBtnView();
	function themeBtnView() {
		$('.pm-btn-prev').removeClass('display-none');
		$('.pm-btn-next').removeClass('display-none');
		if ($('.tab').first().attr('aria-selected') == 'true') {
			$('.pm-btn-prev').addClass('display-none');
		}
		if ($('.tab').last().attr('aria-selected') == 'true') {
			$('.pm-btn-next').addClass('display-none');
		}
	}
	function initMenu() {
		$('.box-service-menu.display').addClass('display-none');
		$('.box-service-menu.set').addClass('display-none');
		$('.box-container-servicelist .container.display').removeClass('display-none');
		$('.box-container-servicelist .container.set').addClass('display-none');
		//메뉴 설정에서 선택된 체크박스를 전부 해제
		$('.icon-check').removeClass('checked');
	}
})




// ================================================================================================================================

// =====================================================================================================================
