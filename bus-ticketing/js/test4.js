/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */

$(document).ready(function() {
	//alert($("#deprCd").val()+" <> "+$("#deprNm").val());
	//alert($("#arvlCd").val()+" <> "+$("#arvlNm").val());
	// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
	if($("#deprCd").val() == "358"){
		$("#deprCd").val("352");
	}
	if($("#arvlCd").val() == "358"){
		$("#arvlCd").val("352");
	}
	// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	if($("#deprCd").val() == "173"){
		$("#deprCd").val("170");
	}
	if($("#arvlCd").val() == "173"){
		$("#arvlCd").val("170");
	}

	if($("#abnrData").val() == "abnr"){
		alert("조회되는 배차가 없습니다. 배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
		$("#loading").hide();
		return;
	}
	if($("#pathDvs").val() != "" && $("#pathDvs").val() != null){
		fnPathDvsChk($("#pathDvs").val());
	} else{
		fnPathDvsChk("sngl");
	}
	if($("#deprDtmAll").val() != "" && $("#deprDtmAll").val() != null){
		fnYyDtmStup(2,'text_date1',$("#deprDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date1','0');
	}
	if($("#arvlDtmAll").val() != "" && $("#arvlDtmAll").val() != null){
		fnYyDtmStup(2,'text_date2',$("#arvlDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date2','0');
	}
	if($("#deprCd").val() != "" && $("#deprCd").val() != null){
		$("#deprNmSpn").text($("#deprNm").val());
	} 
	if($("#arvlCd").val() != "" && $("#arvlCd").val() != null){
		$("#arvlNmSpn").text($("#arvlNm").val());
		fnEmptyCssStup();
		$("#alcnSrchBtn .btn_confirm").removeClass("ready");
	}
	
	//$("#oGradeAll").attr("checked",true);//버스등급 설정
	$("input[name=busClsCdR]").change(function() {
		$("#busClsCd").val(this.value);
	});
	if($("#busClsCd").val() != "" && $("#busClsCd").val() != null){
		$("input[name=busClsCdR][value=" + $("#busClsCd").val() + "]").trigger("click");
	} else {
		$("input[name=busClsCdR][value=0]").trigger("click");
	}
	

});



function fnYyDtmStup(ddChk,txtFld,dtVal){
	var dt0 = new Date();
	var dt1 = new Date();
	dt1.setDate(dt1.getDate()+1);
	var dt = new Date();
	if(ddChk < 2){
		dt.setDate(dt.getDate()+ddChk);
	}
	var yyyy = dt.getFullYear();
	var mm   = dt.getMonth()+1;
	var week = new Array('일','월','화','수','목','금','토');
	var dd   = dt.getDate();
	var wkdy = week[dt.getDay()];
	var yyDtm = yyyy+". "+mm+". "+dd+". "+wkdy;
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;
	var dd2Len = Number(dd) < 10 ? "0"+dd : dd;
	var dd0    = Number(dt0.getDate()) < 10 ? "0"+dt0.getDate() : dt0.getDate();
	var dd1    = Number(dt.getDate()) < 10 ? "0"+(dt.getDate()) : (dt.getDate());
	
	var yymmdd = yyyy+""+mm2Len+""+dd2Len;
	var yymmddD0 = yyyy+""+mm2Len+""+dd0;
	if(ddChk == 2){//datepicker를 통해서 들어온 데이터인지 화면에서 자동설정된 데이터인지 구분
		var yyDtmDvs = dtVal.split(".");  //.substring(dtVal.length-3,dtVal.length);
		yyDtm = dtVal;
		mm2Len = (Number(yyDtmDvs[1].trim()) < 10?"0"+yyDtmDvs[1].trim():yyDtmDvs[1].trim());
		dd1 = (Number(yyDtmDvs[2].trim()) < 10 ? "0"+yyDtmDvs[2].trim():yyDtmDvs[2].trim());
		yymmdd = yyDtmDvs[0].trim()+""+mm2Len+""+dd1;
	}
	var yymmddD1 = yyyy+""+mm2Len+""+dd1;
	var bscYymmddD1 = dt1.getFullYear()+(Number(dt1.getMonth()+1) < 10 ? "0"+(dt1.getMonth()+1):(dt1.getMonth()+1))+(Number(dt1.getDate()) < 10 ? "0"+(dt1.getDate()) : (dt1.getDate()));
	
	if(txtFld == 'text_date1'){
		
		$('.'+txtFld).text(yyDtm);
		$("#deprDtm").val(yymmdd);
		$("#deprDtmAll").val(yyDtm);
		
		
		if(Number(yymmdd) > Number($("#arvlDtm").val())){
			fnYyDtmStup(ddChk,'text_date2',dtVal);
		}
		if(Number(yymmdd) <= Number(bscYymmddD1)){
			if(yymmdd == yymmddD0){
				$("#deprThddChc").addClass("active");
				$("#deprNxdChc").removeClass("active");
			}else if(yymmdd == yymmddD1){
				$("#deprThddChc").removeClass("active");
				$("#deprNxdChc").addClass("active");
			}else{
				$("#deprThddChc").removeClass("active");
				$("#deprNxdChc").removeClass("active");
			}
		}else{
			$("#deprThddChc").removeClass("active");
			$("#deprNxdChc").removeClass("active");
		}
		if(ddChk < 2){
			$("#datepicker1").datepicker().datepicker('setDate',dt);
		}
	}else if(txtFld == 'text_date2'){
		
		if(Number($("#deprDtm").val()) <= Number(yymmdd)){
			
			$('.'+txtFld).text(yyDtm);
			$("#arvlDtm").val(yymmdd);
			$("#arvlDtmAll").val(yyDtm);
		
			if(Number(yymmdd) <= Number(bscYymmddD1)){
				if(yymmdd == yymmddD0){
					$("#arvlThddChc").addClass("active");
					$("#arvlNxdChc").removeClass("active");
				}else if(yymmdd == yymmddD1){
					$("#arvlThddChc").removeClass("active");
					$("#arvlNxdChc").addClass("active");
				}else{
					$("#arvlThddChc").removeClass("active");
					$("#arvlNxdChc").removeClass("active");
				}
			}else{
				$("#arvlThddChc").removeClass("active");
				$("#arvlNxdChc").removeClass("active");
			}
			
			if(ddChk < 2){
				$("#datepicker2").datepicker().datepicker('setDate',dt);
			}else{
				var dpChk1 = $("#datepicker1").datepicker().datepicker('getDate');
				$("#datepicker2").datepicker().datepicker('setDate',dpChk1);
			}
		}else{
			
			if(Number($("#deprDtm").val()) > Number(yymmdd)){
				$(this).removeClass("active");
				var dpChk1 = $("#datepicker1").datepicker().datepicker('getDate');
				$("#datepicker2").datepicker().datepicker('setDate',dpChk1);
			}
		}
	}
}






function fnPathDvsChk(Dvs){ //메인화면에서 탭클릭시
	$("#pathDvs").val(Dvs);
	
	if( Dvs == "rtrp"){
		$("#rtrpYnAll").addClass("round");
		$("#snglRotAll").removeClass("active");
		$("#rtrpRotAll").addClass("active");
		if($("#deprNmSpn").text().length > 0 && $("#arvlNmSpn").text().length > 0){ // 기존 출도착지가 모두 선택되어 있을경우
			
			var deprCd = $("#deprCd").val();
			var arvlCd = $("#arvlCd").val();
			fnDerpListArvlYn(deprCd,arvlCd); //변경된 출발지에 기존 도착지 정보가 있는지 확인값
		}
		$("#chgDeprArvl").css("display","block");
		$("#imptDepr").css("display","block");
	}else{
		$("#rtrpYnAll").removeClass("round");
		$("#snglRotAll").addClass("active");
		$("#rtrpRotAll").removeClass("active");
		if(Dvs == "sngl"){
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			$("#imptDepr").css("display","block");
		}else if(Dvs == "trtr"){
			$("#r1").prop("checked",false);
			$("#r2").prop("checked",true);
			$("#chgDeprArvl").css("display","none");
			if($("#pathStepRtn").val() != "2"){
				fnDeprInfDlt();//출발지 초기화
		 		fnArvlInfDlt();//도착지 초기화
			}
	 		//$("#imptDepr").css("display","none");
		}else{
			$("#pathDvs").val("sngl");
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			//$("#imptDepr").css("display","block");
		}
	}
}





function fnAlcnSrch(){ //배차목록 조회하기 최종확인변수:모든 변수에 접미사cfm 
	var deprDtmChk = $("#deprDtm").val();
	var deprDtmChkYn = "N";
	
	var dt = new Date();		//오늘날짜 전체
	var yyyy  = dt.getFullYear();		//선택한 년도
	var mm    = dt.getMonth()+1;		//선택한 월
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택ㅡㅜ?ㅌ월 ex:01 두글자로 변환
	var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
	var yymmddD0 = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
	
	if(deprDtmChk != null && deprDtmChk != "" && deprDtmChk.length == 8){
		deprDtmChkYn = "Y";
	}
	if(deprDtmChkYn == "N"){
		alert("출발일을 다시 한번 확인해주세요.");
		fnYyDtmStup(0,'text_date1','0');
		return;
	}
	if(!$("#alcnSrchBtn .btn_confirm").hasClass("ready")){
		var crchDeprArvlYnCfm = $("#crchDeprArvlYn").val(); // 스왑버튼이 클릭이 된 경우가 있는지 확인
		var deprCdCfm =  $("#deprCd").val();
		var arvlCdCfm =  $("#arvlCd").val();
		var deprCdChcCfm = "N";
		if(crchDeprArvlYnCfm == "Y"){ // 스왑이 있었을 경우 출도착지 정보가 전체 출발지에 있는지 확인. 없으면 실패 리턴
			if(allDeprList == null || allDeprList.length <= 0){
				fnDerpList("Y","all");
			}
			for(var inx = 0 ; inx < allDeprList.length ; inx++){ 
				if(deprCdCfm == allDeprList[inx][0]){
					deprCdChcCfm = "Y";
				}
			}
		}else{
			deprCdChcCfm = "Y";
		}
		
		if(deprCdChcCfm != "Y"){
			alert("해당 노선은 예매 불가한 노선입니다.");
			fnRotIntz();
			$("#alcnSrchBtn .btn_confirm").addClass("ready");
			
			fnEmptyCssStup();
			
		}else{
			
			
			//인천공항 출발노선 
			if( deprCdCfm == "105" && (arvlCdCfm == "500" || arvlCdCfm == "505"|| arvlCdCfm == "510"|| arvlCdCfm == "516"|| arvlCdCfm == "525"|| arvlCdCfm == "520"|| arvlCdCfm == "801")) {
				if (confirm("인천공항 출발 노선은 코버스 노선이 아니라 시외버스 통합예매시스템(https://txbus.t-money.co.kr)에서 운행 하는 노선입니다. 시외버스 통합예매시스템 홈페이지로 이동합니다. 인천공항 출발 관련 문의는 시외버스 통합예매시스템(☎1644-3070)으로 하시기 바랍니다."))
				{
					var openNewWindow = window.open("about:blank");
					openNewWindow.location.href="https://txbus.t-money.co.kr/intro/intro.html";
					return false;
				}
			}else{
				
				/**
				 * =============================
				 * deprCdCfm : 출발지
				 * arvlCdCfm : 도착지
				 * =============================
				 */
				

				if(
						(deprCdCfm == "010" && arvlCdCfm == "449") ||  
						(deprCdCfm == "010" && arvlCdCfm == "450")){
						alert("제천하소행 고객께서는 ‘서울-제천하소＇로 조회하여 에매해주시길 바랍니다.\n" +
								"\n" +
								"1. 제휴할인 서비스\n" +
								"　▶청풍호반케이블카 : 1,000원 할인\n" +
								"　▶청풍랜드 : 2,000~3,000원 할인\n" +
								"　▶청풍나루(유람선) : 2,000원 할인\n" +
								"\n" +
								"2. 이용방법\n" +
								"　▶고속버스 모바일 티켓 또는 승차권 소지\n" +
								"　▶출발일 기준 30일 이내에 방문하여야 할인 적용 가능\n" +
								"\n" +
								"3. 관련 노선\n" +
								"　▶제천↔서울(경부)\n" +
								"\n" +
								"4. 이용방법 및 업체 상세정보 ‘코버스‘홈페이지(웹) 공지사항 참조\n" +
								"\n" +
								"※ 자세한 사항은 제천고속버스터미널 문의");
					}

				// 20200902 yahan
				// 서울(010)-양양(270), 동서울(032)-양양(270)
				/*
				if (
						yymmddD0 <= 20200903 && 
						(
							(deprCdCfm == "010" && arvlCdCfm == "270") || 
							(deprCdCfm == "032" && arvlCdCfm == "270")
						)
					) {
					alert("★양양터미널 침수로 인해 9/2~9/3 양양을 운행하지 않습니다.");
				}
				*/

				// 20200831 yahan
				// 서울(010)-속초(230), 서울(010)-양양(270)
				// 동서울(032)-속초(230), 동서울(032)-양양(270)
				if(
						(deprCdCfm == "010" && arvlCdCfm == "270") || 
						(deprCdCfm == "010" && arvlCdCfm == "230") ||
						(deprCdCfm == "032" && arvlCdCfm == "270") || 
						(deprCdCfm == "032" && arvlCdCfm == "230") 
						){
					alert("[속초서핑 속초바다서프 제휴할인]\n\n" +
							"속초행 노선 이용시\n" +
							"서핑 입문강습 10% 할인\n" +
							"서핑보드 렌탈 10% 할인\n" +
							"바다서프카페 음료 10% 할인\n\n" +
							"예약문의 : 033-633-1611\n" +
							"속초해수욕장 남문 앞 바다서프");
				}

				// 20200803 yahan 도로침수로 인한 미운행 안내
				// 배방정류소337, 아산서부341, 아산온양340
				if (
						yymmddD0 == 20200803 && 
						(
							(deprCdCfm == "337" || arvlCdCfm == "337") || 
							(deprCdCfm == "341" || arvlCdCfm == "341") || 
							(deprCdCfm == "340" || arvlCdCfm == "340")
						)
					) {
					alert("[아산서부(휴), 배방정류소 운행 일시 중단 알림]\n\n" +
							"1. 중단사유 : 도로침수로 인한 정류장 미운행\n" +
							"2. 대상노선 : 서울~아산, 인천~아산\n" +
							"3. 적용일자 : 2020년 8월 3일(월)\n" +
							" ※ 단, 도로사정 호전시 정상운행");
				}
				
				// 20200730 yahan 아산탕정사무소(342), 천안3공단(346), 선문대(347), 탕정삼성LCD(349)
				if(
						(deprCdCfm == "342" || arvlCdCfm == "342") ||
						(deprCdCfm == "346" || arvlCdCfm == "346") ||
						(deprCdCfm == "347" || arvlCdCfm == "347") ||
						(deprCdCfm == "349" || arvlCdCfm == "349")
					){
					alert("기존 아산탕정-서울남부 노선의 종착지가 서울경부와 서울남부로 분할되어 운행되오니 " +
							"목적지와 시간을 다시한번 확인하여 주십시오.\n\n" +
							"적용일자: 2020년 8월 10일 (월) 출발시간부터");
				}
				
				// 20200724 yahan 광양터미널 사업자 및 터미널 위치 변경
				if( deprCdCfm == "520" ){
					alert("[안내]\n" +
							"광양터미널 위치가 8.3(월)부터 변경 됩니다.\n\n" +
							"현재 : 인동숲 공영주차장 內(광양읍 인서리 238)\n" +
							"변경 : 광양버스터미널 건물(광양읍 순광로 688)");
							//20200804 yahan - 삭제요청
							//"터미널 운영 사업자 변경에 따라 8.3(월)이후 예매는 8.3(월)부터 가능합니다.");
				}
				
				// 20200629 yahan
				// 서울~마장택지지구 증회 운행
				if(
						(deprCdCfm == "010" && arvlCdCfm == "171") || (deprCdCfm == "171" && arvlCdCfm == "010")
					){
					alert("[서울~마장택지지구 증회 운행]\n\n" +
							"운행횟수 : 일 4회 -> 8회 (4회 증회)\n" +
							"증회운행 : 2020년 7월 1일 (수) 부터");
				}
				
				// 20200626 yahan
				// '20년 7월 11일(토) 부터 '김제' 노선 감회(7회->6회) 및 일부 배차시간 조정
				if(deprCdCfm == "020" && arvlCdCfm == "620"){
					alert("[알림] '센트럴시티' -> '김제' 노선 배차 시간이 조정되오니\n" +
							"예매 시 참고하시기 바랍니다.\n\n" +
							"*시행일 : 7/11(토)부터\n\n" +
							"<조정전>\n" +
							"06:40, 08:20, 10:50, 12:40, 15:10, 17:20, 19:30\n\n" +
							"<조정후>\n" +
							"06:40, 09:10, 11:40, 13:50, 16:30, 19:30");
				}

				
				// 20200528 yahan
				// 서울010 -> 원주240 노선팝업
				if(deprCdCfm == "010" && arvlCdCfm == "240"){
					alert("※원주문막행 고객께서는 '서울-원주문막'으로\n\n" +
							"조회하여 예매해주시기를 바랍니다.");
				}
				
// 20200521 삭제요청
//				// 20200520 안성 -> 서울
//				if(deprCdCfm == "130" && arvlCdCfm == "010"){
//					alert("[출퇴근 고객 주중 할인 이벤트]\n\n" +
//							"출퇴근 이용객의 교통편의 증진을 위하여, " +
//							"6월 3일부터 안성발 서울행 노선의 06시 35분과 06시 50분 차량의 요금을 " +
//							"아래와 같이 할인하오니, 많은 이용 바랍니다.\n" +
//							"- 노선 : 안성→서울 / 06시 35분, 06시 50분(월~금, 2회)\n" +
//							"- 요금할인 : 6,600원 -> 5,300원 (20% 할인)\n" +
//							"- 할인방법 : 대학생요금 선택하여 예매\n" +
//							"- 시행일자 : 6.3(월)\n" +
//							"※ 현장발권 적용 불가");
//				}
				
				// 20200504
				// 배방정류소337, 아산서부341, 천안아산역343 -> 서울010
				if (
						(deprCdCfm == "337" && arvlCdCfm == "010") || (deprCdCfm == "341" && arvlCdCfm == "010") || (deprCdCfm == "343" && arvlCdCfm == "010") 
					) {
					alert("※중간정류장 승차시 교통상황에 따라 예정된 출발시간이 다소 지연 될 수 있는점 양해 부탁드립니다.");
				}
				
				// 20200428
				// 동광양525 -> 동서울030 032, 광양520 -> 동서울030 032, 동광양525 -> 센트럴020, 광양520 -> 센트럴020
				// 4월30일 23시59분까지 
				if (
						yymmddD0 < 20200501 && 
						(
							(deprCdCfm == "525" && arvlCdCfm == "030") || (deprCdCfm == "525" && arvlCdCfm == "032") || (deprCdCfm == "525" && arvlCdCfm == "020") || 
							(deprCdCfm == "520" && arvlCdCfm == "030") || (deprCdCfm == "520" && arvlCdCfm == "032") || (deprCdCfm == "520" && arvlCdCfm == "020")
						)
					) {
					alert("저희 동광양터미널은 2020년 5월 1일자로 터미널운영사업자의 변경사유로 인해 " +
							"5월 1일 이후 승차권의 인터넷, 모바일 예매를 일시 중지하게 되었습니다.\n" +
							"고객님들께 불편을 끼쳐드리게 된 점 널리 양해하여 주시기 바랍니다. \n\n" +
							"승차권 인터넷, 모바일 예매는 5월 1일 00시부터 가능하오니 많은 이용바랍니다.");
				}
				

				// yahan 20200401
				// 인천공항 105, 117 -> 김해 735 / 김해 장유 736 / 양산 745 / 선산 812 813
				if (
						deprCdCfm == "105" || deprCdCfm == "117"
					) {
					alert("[인천공항 온라인 매표 금지안내]\n\n" +
							"코로나19로 인하여 인천공항(T1,T2) 출발 노선은 해당 터미널 매표 창구에서만 가능합니다.");
				}
								
				// yahan 20200401
				// 광주 500 -> 인천공항 105, 117 
				if (
						(deprCdCfm == "500" && arvlCdCfm == "105") ||
						(deprCdCfm == "500" && arvlCdCfm == "117") 
					) {
					alert("[코로나19 관련 미운행노선 안내]\n\n" +
							"코로나 19 예방과 차단을 위해 4월 1일부터 인천공항의 운행이 임시중단됩니다");
				}
				
				// yahan 20200415
				// 세종연구단지 -> 서울, 세종연구단지 351 -> 죽전 118
				// 세종연구단지 정류장 위치 변경
				if (
						(deprCdCfm == "351" && arvlCdCfm == "010") || (deprCdCfm == "351" && arvlCdCfm == "118")
					) {
					alert("[세종연구단지 중간정류장 위치변경 안내]\n\n" +
							"변경전 : 세종국책연구단지 버스정류장(51-094)\n" +
							"변경후 : 수루배마을 1단지 103동 앞 간이 버스정류장\n" +
							"            (기존 정류장에서 300m 이내)"
							);
				}

				
				// yahan 2020-03-25
				// 서울～세종(연구단지노선) 경로변경 안내
				if (
						(deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "351") || (deprCdCfm == "351" && arvlCdCfm == "010")
					) {
					alert("[ 서울～세종(연구단지노선) 경로변경 안내 ]\n\n" +
							"◦ 운송개시 : '20. 4. 1(수)\n" +
							"◦ 노선경로 : 서울TR~죽전~국무조정실~세종연구단지~세종시청~세종TR");
				}

				// yahan 20200826
				// 백암온천 등등 추가
				// yahan 20200317
				// 구인사-463, 영월-272, 영덕-843, 경북도청-852, 백암온천-856
				if (
						// 구인사
						//(deprCdCfm == "463" || arvlCdCfm == "463") ||
						
						//20200422 yahan 영월, 경북도청 삭제
						//(deprCdCfm == "852" || arvlCdCfm == "852") ||
						//(deprCdCfm == "272" || arvlCdCfm == "272") ||
						
						//20200327 yahan 영덕노선 삭제
						//(deprCdCfm == "843" || arvlCdCfm == "843") ||
						
						// 20200529 yahan 백암온천 삭제
						//(deprCdCfm == "856" || arvlCdCfm == "856")
						
						(deprCdCfm == "010" && arvlCdCfm == "463") || (deprCdCfm == "463" && arvlCdCfm == "010") || // 구인사
						
						(deprCdCfm == "010" && arvlCdCfm == "844") || (deprCdCfm == "844" && arvlCdCfm == "010") || // 평해
						(deprCdCfm == "010" && arvlCdCfm == "853") || (deprCdCfm == "853" && arvlCdCfm == "010") || // 울진
						(deprCdCfm == "010" && arvlCdCfm == "854") || (deprCdCfm == "854" && arvlCdCfm == "010") || // 광비
						(deprCdCfm == "010" && arvlCdCfm == "855") || (deprCdCfm == "855" && arvlCdCfm == "010") || // 삼근
						(deprCdCfm == "010" && arvlCdCfm == "856") || (deprCdCfm == "856" && arvlCdCfm == "010") || // 백암온천
						(deprCdCfm == "010" && arvlCdCfm == "857") || (deprCdCfm == "857" && arvlCdCfm == "010") || // 후포
						(deprCdCfm == "010" && arvlCdCfm == "458") || (deprCdCfm == "458" && arvlCdCfm == "010") || // 평동
						(deprCdCfm == "010" && arvlCdCfm == "459") || (deprCdCfm == "459" && arvlCdCfm == "010") || // 단양상진
						(deprCdCfm == "010" && arvlCdCfm == "460") || (deprCdCfm == "460" && arvlCdCfm == "010") || // 단양
						(deprCdCfm == "010" && arvlCdCfm == "461") || (deprCdCfm == "461" && arvlCdCfm == "010") || // 사평리
						(deprCdCfm == "010" && arvlCdCfm == "462") || (deprCdCfm == "462" && arvlCdCfm == "010")    // 영춘
					) {
					alert("[코로나19 관련 미운행노선 안내]\n\n" +
							"현재 코로나19 장기화로 인하여 한시적으로 미운행을 하오니\n" +
							"이용에 참고하시기 바랍니다.");
							//"대상노선 : 구인사");
							//"대상노선 : 구인사, 영월, 영덕, 경복도청, 백암온천");
				}

				
				// yahan 2020-03-16
				if (
						// 인천-100, 속초-230 경유지추가-양양
						(deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "100")
					) {
					alert("[인천-속초 노선 양양 경유 안내]\n\n" +
							"노선운행경로 : 인천-양양-속초\n" +
							"운송개시 : 2020.04.01(수)");
				}
				
				// yahan 2020-01-21
				// 아산서부(호서대) 출발시간 변경안내
				if(deprCdCfm == "341"){
					alert("[아산서부(호서대) 출발시간 변경안내]\n\n" +
							  "기존 아산고속TR 출발시간 기준에서 정류소 출발시간으로 변경되어 " +
							  "예매하신 시간은 아산서부 정류장 출발시간입니다. 출발시간을 다시 한번 확인 부탁드립니다.\n\n" +
							  "적용일자 : 2020. 02. 01(토) 출발시간부터");
				}

				
				// yahan 2020-01-17
				if(
						// 영통--> 횡성(휴)하행, 동해, 삼척 112 --> 238, 210, 220
						// 신갈시외 --> 횡성(휴)하행, 동해, 삼척 114 --> 238, 210, 220
						(deprCdCfm == "112" || deprCdCfm == "114") &&
						(arvlCdCfm == "238" || arvlCdCfm == "210" || arvlCdCfm == "220")
					){
					alert("[출발시간 지연안내]\n\n" +
							  "해당노선은 교통체증으로 인하여 출발 시간이 다소 늦어질 수 있습니다.\n" +
							  "양해 바랍니다.");
				}

				
				// 센트럴시티 - 충주 (yahan 2020-01-07)
				if(deprCdCfm == "020" && arvlCdCfm == "420" && yymmddD0 < 20200208){
					alert("< '충주' 노선 중간 정차지 운행>\n\n" +
							"1.정차지명 : 충주기업도시\n" +
							"2.운행횟수 : 1일/4회\n" +
							"3.운행시간 : 9:00 / 12:50 / 14:20 / 20:05\n\n" +
							"※상기 시간의 경우 '교통대' 중간 정차를 하지 않습니다.\n" +
							"  예매시 참고하시기 바랍니다.");
				}


				// yahan 2019-12-26
				if(
						//서울(010)-아산온양(340),서울(010)-아산서부(341),서울(010)-천안아산(343)
						(deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "010") ||
						// 아산온양(340)→인천(100), 아산서부(341)→인천(100), 천안아산(343)→인천(100)
						(deprCdCfm == "100" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "100") ||
						(deprCdCfm == "100" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "100") ||
						(deprCdCfm == "100" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "100")
					){
					alert("[정류장 명칭 변경 안내]\n\n" +
							  "2020. 1. 10(금)부로 정류장 명칭이 변경되오니 이용시 확인 부탁드립니다.\n" +
							  "변경전 : 아산서부 → 변경후 : 아산서부(호서대)\n" +
							  "※기존 정류장 위치 변동없음");
				}
				
				
				if(deprCdCfm == "830" || deprCdCfm == "828") {
					//alert("2017년 6월 30일 부터\n\n <포항시청 앞 고속버스 간이 승차장 이용 일부 변경>\n\n1. 정류장 명칭 : 포항시청\n\n2. 정류장 코드 : 828\n\n3. 정류장 위치 : 포항시 남구 대이동 우체국 옆\n\n4. 분리 사유 : 인터넷 예매, 모바일 이용 편리\n\n5. 운행노선  : 포항시청 ↔ 서울경부\n\n                   포항시청 ↔ 대전복합\n\n                   포항시청 ↔ 광주전남\n\n                   포항시청 ↔ 선산휴게소 -운행중단(X)\n\n6. 출발시간  : 출발터미널 기준으로 약10 - 15분 후 승차\n\n7. 출발지 구분 안내\n\n   ┗ 포항       : 포항고속버스터미널(해도동)\n\n   ┗ 포항시청 : 포항시청 앞 간이 승차장\n\n8. 2016년 3월 31일 부\n\n   승차권 취소, 환불 약관 수수료 개정\n\n   ┗ 출발 2일전                 :         없음\n\n   ┗ 출발 1일전 ~ 1시간 전  :    5% 공제\n\n   ┗ 출발 전 1시간 이내      :   10% 공제\n\n   ┗ 출발 후 목적지 도작 전 :   30% 공제\n\n   ┗ 출발 후 목적지 도착 후 : 100% 공제");
					alert("[포항시청 앞 고속버스 간이 승차장 이용안내]\n\n1. 간이 승차장 명칭 :  포항시청\n\n2. 간이 승차장 코드 : 828\n\n3. 운행노선\n- 포항시청 → 서울경부\n- 포항시청 → 대전복합\n- 포항시청 → 전남광주\n- 포항시청 → 낙동강(상)휴게소 / 환승\n    환승지역 : 동서울, 인천, 용인, 성남, 청주\n\n4. 포항시청 간이 승차장 위치 → 포항시 남구 대이동 우체국 옆\n\n5. 승차권 구입방법\n- 차량 단말기의 교통신용카드 즉시 결재 승차\n- 스마트폰 앱'고속버스모바일' → 조회, 구입, 취소 편리\n\n6. 경로우대 20% 할인\n - 포항→서울경부 / 포항시청→서울경부 우등에 한하며\n- 모바일, 종이승차권→포항고속버스터미널→신분증 확인→할인매표\n\n7. 승차시간\n승차권의 출발시간은 출발 터미널 기준으로 약 10분 후 승차\n\n8. 승차지 구분\n- 포항고속버스터미널 출발지 승차권으로 간이 경유지 승차는 불가 \n└> 출발지 : 포항 → 서울경부\n└> 경유지 : 포항시청 → 서울경부는 구분 승차 됩니다.\n\n9. 임시차는 포항고속버스터미널 만 승차되며 포항시청 앞 간이 승차장을 경유하지 않습니다.\n\n10. 운송약관 요약\n다음의 경우는 승차를 거절 할 수 있습니다.\n가. 만취자 또는 신변이 불결한 자\n나. 인화성 물질과 승객에게 불쾌감을 주는 물품 소지자\n다. 중환자의 단독여행 또는 전염성 환자\n라. 안전 운행을 위한 승무원 요구에 불응하는 자\n");
				}
				
				if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){
				//->	alert("[공지]서울~청주 우등요금변경 안내\n\n\n◎변경일시 : 2017년 6월30일(금)\n\n◎변경(적용) 우등 요금\n   -변경전 : 주간 8,800원(정상요금11,200원의 21.4%할인) /\n               심야  9,800원(정상요금의22.0%할인)\n   -변경후 : 주간 9,800원(정상요금11,200원의 12.5%할인) /\n               심야 10,700원(정상요금의 13.0%할인)");
				}
				/*
				if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010")){
					alert("[서울-진주 우등형 할인율 조정 안내]\n2018.2.1(목)부로 현 고속업계는 운용비용 지속상승[인권비, 유류비]과\n고속열차[KTX, SRT]확대개통 등 전반적인 영업환경이 악화되어\n부득이하게 서울-진주 노선 우등형 할인요금 조정이 시행하게 되었습니다.\n이점 해량하여 주시기 바라며, 더 나은 고객서비스와 안전운행으로 보답하겠습니다.\n\n※ 인상내용(정상요금: 29,000원) ※\n- 할인율: 20%(변경 전) → 7% (변경후) \n- 할인요금: 23,000원(변경 전) → 27,000원(변경후)\n- 시행일자 : 2018.2.1 부터\n\n[서울-진주 프리미엄 요금 안내]\n프리미엄 버스에 대해서는 정상요금에서 주중, 주말 할인요금을 상시 적용하오니 많은 이용 부탁드립니다.\n프리미엄 : 주중, 주말 15% 상시 할인시행(2017.11.1 부터)\n- 주중 37,700원→29,000원\n- 주말 37,700원→32,000원​");
				}			*/	
				if(
						(deprCdCfm == "312" && arvlCdCfm == "700") || (deprCdCfm == "388" && arvlCdCfm == "700") ||
						(deprCdCfm == "312" && arvlCdCfm == "020") || (deprCdCfm == "388" && arvlCdCfm == "020") ||	
						(deprCdCfm == "312" && arvlCdCfm == "716") || (deprCdCfm == "388" && arvlCdCfm == "716") ||
						(deprCdCfm == "312" && arvlCdCfm == "715") || (deprCdCfm == "388" && arvlCdCfm == "715") ||
						(deprCdCfm == "389" && arvlCdCfm == "020") || (deprCdCfm == "390" && arvlCdCfm == "020") ||
						(deprCdCfm == "398" && arvlCdCfm == "020") || (deprCdCfm == "399" && arvlCdCfm == "020") ||
						(deprCdCfm == "396" && arvlCdCfm == "020") || (deprCdCfm == "397" && arvlCdCfm == "020")
					){
					alert("[예매 시 주의사항]\n예매 승차권은 예매 시 출발지로 선택한 곳에서만 발권과 승차가 가능함을 알려드립니다.");
				}
				
				if((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010") ||
				   (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")){
				//->	alert("* 서울-세종 요금할인율 조정 : 17% -> 9%\n  8.21(월)부터 시행\n* 정상요금(우등) : 12,100원\n  변경전 할인요금(17%) :10,000원\n  변경후 할인요금(9%) : 11,000원\n  심야 : 11,000원 -> 12,100원\n* 타 노선은 조정 없습니다.");
				}
				
				if((deprCdCfm == "150" && arvlCdCfm == "010") || (deprCdCfm == "149" && arvlCdCfm == "010")){
					if(deprDtmChk < 20180108){
						alert("[용인유림동 중간정류소 매표소 업무 중단 안내]\n서울-용인 노선 중간정류소인 용인유림동 매표소 업무가 중단됨에 따라\n모바일 승차권과 차량내 단말기를 이용한 발권과 탑승이 가능하오니\n이용에 참조하시기 바랍니다.");
					}
				}
				

				if((deprCdCfm == "020" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "020") 
					|| (deprCdCfm == "020" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "020")
					|| (deprCdCfm == "032" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "032")
					|| (deprCdCfm == "032" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "032")){
//					alert("[공지] 정읍노선 요금할인 안내\n\n" +
//							"노선 : 서울-정읍, 동서울-정읍 / 태인포함\n" +
//							"대상 : 중.고.대학생, 경로(만65세이상) 20%\n" +
//							"시행일자 : 2018년 2월 1일부터\n" +
//							"할인 승차 시 신분증(학생증)을 제시하시기 바랍니다.");
					
					// yahan 2020-01-21
					// [중앙고속] 서울・동서울-정읍노선 할인대상 변경
					alert("[공지] 정읍노선 할인대상 변경안내\n\n" +
							"노선 : 서울-정읍, 동서울-정읍 / 태인포함\n" +
							"대상 : 중.고등학생 20%\n" +
							"등급 : 일반고속\n" +
							"시행일자 : 2020년 2월 1일부터\n" +
							"할인 승차 시 신분증(학생증)을 제시하시기 바랍니다.");
				}
				
				// 서울경부 - 천안 (18.02.28)
				if((deprCdCfm == "010" && arvlCdCfm == "310") || (deprCdCfm == "310" && arvlCdCfm == "010")){
				//->	alert("[우등고속 추가 운행 안내]\n\n◎ 운행개시 : 2018.2.28(수)부터\n◎ 운행회수 : 일 19회 운행\n◎ 운임 : 7,100원(청소년,대학생 30%할인)\n◎ 운행업체 : 동양고속");
				}
				
				// 서울-아산탕정 (18.5.4)-18.12.18 변경
				if((deprCdCfm == "342" && arvlCdCfm == "050") || (deprCdCfm == "342" && arvlCdCfm == "119") || (deprCdCfm == "342" && arvlCdCfm == "118") 
						|| (deprCdCfm == "119" && arvlCdCfm == "342") || (deprCdCfm == "119" && arvlCdCfm == "347") || (deprCdCfm == "119" && arvlCdCfm == "346")
						|| (deprCdCfm == "119" && arvlCdCfm == "343") || (deprCdCfm == "119" && arvlCdCfm == "349")
						|| (deprCdCfm == "118" && arvlCdCfm == "342") || (deprCdCfm == "118" && arvlCdCfm == "347") || (deprCdCfm == "118" && arvlCdCfm == "346")
						|| (deprCdCfm == "118" && arvlCdCfm == "349") || (deprCdCfm == "118" && arvlCdCfm == "343")
						|| (deprCdCfm == "349" && arvlCdCfm == "050") || (deprCdCfm == "349" && arvlCdCfm == "119") || (deprCdCfm == "349" && arvlCdCfm == "118")
						|| (deprCdCfm == "346" && arvlCdCfm == "050") || (deprCdCfm == "346" && arvlCdCfm == "119") || (deprCdCfm == "346" && arvlCdCfm == "118")
						|| (deprCdCfm == "343" && arvlCdCfm == "050") || (deprCdCfm == "343" && arvlCdCfm == "119") || (deprCdCfm == "343" && arvlCdCfm == "118")
						|| (deprCdCfm == "347" && arvlCdCfm == "050") || (deprCdCfm == "347" && arvlCdCfm == "119") || (deprCdCfm == "347" && arvlCdCfm == "118")){
					//alert("[운행시간 변경안내]\n시간표가 아래와 같이 변경되오니 이용에 참고하시기 바랍니다.\n◎변경일자: 2018.5.18(금)\n◎변경시간: \n- 서울남부 출발(19:40 -> 20:00)\n- 아산탕정 출발(16:30 -> 17:00)");
					alert("[중간정차 추가안내]\n중간정류장이 아래와 같이 추가되오니 이용에 참고하시기 바랍니다.\n변경일자 : 2018.12.27(목)\n변경내용 : 서울남부-죽전-신갈-천안3공단-천안아산역-선문대-아산탕정사무소-탕정삼성LCD");
				}
				
				// 센트럴시티 - 정읍(태인) (18.05.21)
				if((deprCdCfm == "020" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "020") || (deprCdCfm == "020" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "020")){
					alert("2018.6.11(월)부터 센트럴시티~정읍(태인) 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다.\n○ 조정내용 : 첫차/막차 및 일부 배차시간 조정\n＊첫차 : 06:20 → 07:00\n＊막차 : 22:30 → 21:30 / 금,토,일(22:30 동일)");
				}
				
				// 센트럴시티 - 영산포(나주) (18.05.21)
				if((deprCdCfm == "020" && arvlCdCfm == "565") || (deprCdCfm == "565" && arvlCdCfm == "020") || (deprCdCfm == "020" && arvlCdCfm == "530") || (deprCdCfm == "530" && arvlCdCfm == "020")){
					alert("2019.10.21(월)부터 센트럴시티~영산포(나주) 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다. ");
				}
				
				// 센트럴시티 - 영광 (18.05.21)
				if((deprCdCfm == "020" && arvlCdCfm == "560") || (deprCdCfm == "560" && arvlCdCfm == "020")){
					alert("2018.6.1(금)부터 센트럴시티~영광 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다.");
				}
				
				// 광주 <-> 마산내서 (18.08.09)
				if(((deprCdCfm == "500" && arvlCdCfm == "706")||(deprCdCfm == "706" && arvlCdCfm == "500")) && yymmddD0 < 20180823){					
					alert("2018.8.14(화)자로 마산내서 운행시간이 변경되오니, 이용에 차질이 없도록 변경된 시간을 확인하여 주시기 바랍니다.");
				}
				
				// 고양백석 -> 동대구 (18.08.29)
				if(deprCdCfm == "116" && arvlCdCfm == "801"){					
					alert("2018.10.1 일자로 고양백석발 동대구행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
				}
				
				// 부천 -> 동대구 (18.08.29)
				if(deprCdCfm == "101" && arvlCdCfm == "801"){					
					alert("2018.10.1 일자로 부천발 동대구행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
				}
				
				// 동대구 -> 부천 (18.08.29)
				if(deprCdCfm == "801" && arvlCdCfm == "101"){					
					alert("2018.10.1 일자로 동대구발 부천행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
				}
				
				// 동대구 -> 고양백석 (18.08.29)
				if(deprCdCfm == "801" && arvlCdCfm == "116"){					
					alert("2018.10.1 일자로 동대구발 고양백석행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
				}
				
				// 동대구 -> 제천 (18.08.27)
				if(deprCdCfm == "801" && arvlCdCfm == "450"){					
					alert("2018.9.1 일자로 동대구발 제천행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
				}
				
				// 부천 <-> 정안(휴)하행, 부천->논산, 부천->연무대 (18.08.29)
				if((deprCdCfm == "101" && arvlCdCfm == "315") || (deprCdCfm == "101" && arvlCdCfm == "370") || (deprCdCfm == "101" && arvlCdCfm == "380")){					
					alert("김포공항 출발차량의 도로사정에 따라 부천 출발시간이 지연될 수 있습니다.");
				}
				
				// 인천->익산, 센트럴 -> 익산 (18.09.21)
				if((deprCdCfm == "100" && arvlCdCfm == "615") || (deprCdCfm == "020" && arvlCdCfm == "615")){					
					alert("익산공단에서 하차 불가하오니 이용에 참고하시기 바랍니다.");
				}
				
				// 인천-> 정안(휴)하행, 정안(휴)상행 -> 인천 (18.10.24)
				/*if((deprCdCfm == "100" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "100")){					
					alert("해당 노선은 안산을 경유하여 추가 소요시간(30분 이상)이 발생하오니,\n확인 후 이용하시기 바랍니다.");
				}*/
				
				// 서울<->속초, 동서울<->강릉, 고양(화정,백석)<->강릉, 동서울<->속초, 인천<->속초 (18.11.15)
				if(
					//	(deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "010")
					//	|| (deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032")
						(deprCdCfm == "115" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "115")
						|| (deprCdCfm == "116" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "116")
					//	|| (deprCdCfm == "032" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "032")
					//	|| (deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "100")
					){					
					alert("■ 롯데렌터카 업무제휴(할인) 안내\n동부고속, 중앙고속이 운행하는고속버스 노선을 이용 시\n이용객에 한해 롯데렌터카를 할인가격으로 이용 하실 수 있으니\n많은 이용 바랍니다.\n\n○ 당일 이용승차권(종이,모바일) 제시 시 50% 할인\n○ 롯데렌터카 할인 이용방법\n   1. 롯데렌터카 예약매체(홈페이지, 모바일 앱)를 통해\n      사전예약 후 지점 방문하면 할인율 제공\n   2.예약 없이 당일 지점 방문하여 현장에서 대여 시에도\n      할인율 제공\n  (※ 보유차량이 모두 대여될 경우 대여가 불가하니 사전 예약 권장)\n   3.롯데렌터카 강릉 또는 속초 지점 방문 시 대상노선 당일\n    이용승차권(종이,모바일) 제시\n○ 롯데렌터카 이용안내\n - 강릉지점:033-642-8000│속초지점:033-632-8000");
				}
				
				// 서울 <-> 강릉 (18.12.18 변경)
				/*if((deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010")){
					if(deprDtmChk < 20190101){
						alert("[서울-강릉 노선 해돋이 임시차 투입안내]\n- 일시 : 2019년 1월 1일 \n- 시간 : 00:05 ~ 02:00\n많은 이용 부탁드립니다.");
					}else{
						alert("■ 롯데렌터카 업무제휴(할인) 안내\n동부고속이 운행하는고속버스 노선을 이용 시 이용객에 한해 \n롯데렌터카를 할인가격으로 이용 하실 수 있으니 많은 이용 바랍니다.\n\n○ 당일 이용승차권(종이,모바일) 제시 시 50% 할인\n○ 롯데렌터카 할인 이용방법\n   1. 롯데렌터카 예약매체(홈페이지, 모바일 앱)를 통해 사전예약 후\n      지점 방문하면 할인율 제공\n   2.예약 없이 당일 지점 방문하여 현장에서 대여 시에도 할인율 제공\n      (※ 보유차량이 모두 대여될 경우 대여가 불가하니 사전 예약 권장)\n   3.롯데렌터카 강릉 또는 속초 지점 방문 시 대상노선 당일\n      이용승차권(종이,모바일) 제시\n○ 롯데렌터카 이용안내\n - 강릉지점:033-642-8000│속초지점:033-632-8000");
					}
				}*/
				
				// 센트럴시티-> 부안 (18.12.5)
				if(deprCdCfm == "020" && arvlCdCfm == "640"){					
					alert("[운행 변경 공지 안내]\n- 시행일자 : 2018.12.17(월)부터\n- 1일/16회 운행\n조정전 : 31석(9회), 41석(7회) 일반고속 운행\n조정후 : 41석 일반고속(7회), 28석 우등고속(9회)\n- 일반고속(41석) : 14,300(변경없음)\n- 우등고속(28석) : 19,500원(신규운행)");
				}
				
				//서울- 동해, 동서울 - 동해(18.12.12)
				/*if((deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010") || (deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "032")){
					alert("[동해고속버스터미널 통합 이전]\n○ 터미널 : 동해고속버스터미널(강원도 동해시 부곡로 1) \n    → 동해시종합버스터미널(강원도 동해시 동해대로 5443)\n○ 운행개시 : 2018.12.27(목)부터\n○ 노선문의 : 033-572-7444, 033-532-3800");
				}*/
				
				//동해-> 동서울, 삼척 -> 동서울(18.12.26)
				if((deprCdCfm == "210" && arvlCdCfm == "032") || (deprCdCfm == "220" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "032" && arvlCdCfm == "220")){
					alert("[운행공지]\n○ 내용 : 동서울 행 첫차 변경\n○ 시간 : 삼척-동서울 06:00 → 05:50\n           동해-동서울 06:25 → 06:15\n○ 변경일 : 2018.12.27\n○ 노선문의 : 033-531-3400");
				}
				
				//서울-평택-안중(18.12.27)
				if((deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") || (deprCdCfm == "180" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "180")){
					alert("[서울-평택 노선 종점연장 안내]\n○ 운행노선 : 서울-평택-안중\n○ 변경사항 : 안중TR 종점연장\n○ 운행개시 : 2019.1.2(수)부터\n○ 운행회수 : 일 8회 운행");
				}
				
				//평택용이동-서울, 평택대-서울(19.01.03)
				if((deprCdCfm == "175" && arvlCdCfm == "010") || (deprCdCfm == "174" && arvlCdCfm == "010")){
					//alert("[노선 운행 안내]\n안중출발 차량은 예매하신 시간 10분전에 평택터미널에서 출발 합니다.\n평택출발 차량은 예매하신 시간이 평택터미널 출발시간 입니다.");
					alert("[노선 운행 안내]\n평택대, 용이동에서 예매하신 시간은 평택터미널 출발시간입니다.\n반영일자 : 2019.3.1 부터");
				}
				
				//광주-인천공항 T1,T2, 부산사상(19.01.07)
				if((deprCdCfm == "500" && arvlCdCfm == "105") || (deprCdCfm == "500" && arvlCdCfm == "117") || (deprCdCfm == "500" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "500")){
					alert("해당노선은 프리미엄 마일리지 적립 및 사용불가 노선입니다.");
				}
				
				//센트럴시티->청주(19.01.08) ~1/31 까지
				if(deprCdCfm == "020" && arvlCdCfm == "401" && yymmddD0 < 20190201){
					alert("노선: 센트럴시티(서울)→청주(센트럴)\n회사: 서울,새서울고속\n내용\n- 조정전: 1일/19회(월~일)\n- 조정후: 1일/24회(월~목)\n            1일/26회(금~일)\n* 일부 시간 조정 및 22:00 심야 운행\n일자: 2019.1.11(금)부터");
				}
				
				//여수
				if(deprCdCfm == "510"){
					alert("여수터미널 출발 승차권을 가지고 중간(여천)경유지 승차는 불가합니다.");
				}
				
				//서울(010)<->청주(400) : 190329 삭제
				/*if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){
					alert("서울~청주 대학생 할인요금 제도를 3/1부로 종료됩니다.\n고속버스 업계에서는 타 할인 제도를 시행예정이오니, 양해하여 주시기 바랍니다.");
				}*/
				
				// 20200908 yahan 삭제
				//서울(010)-제천(450),서울(010)-제천하소(449) : 190314
				/*
				if((deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "449" && arvlCdCfm == "010") 
					|| (deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010")){
					alert("[제천 하소동 현장 발권 임시 중단]\n1) 중단기간 : 2019.3.14.(목) ~ 3.28(목) 15일간\n2) 내용 : 제천 하소동 현장 발권 임시 중단에 따라 고속버스 모바일 앱 또는 코버스 홈페이지에서 예매를 해주시기 바랍니다.\n3) 현장발권 : 2019.3.29.(금)부터 가능");
				}
				*/
				
				//동대구(801)-울산(715): 190314
				/*if((deprCdCfm == "801" && arvlCdCfm == "715") || (deprCdCfm == "715" && arvlCdCfm == "801")){
					alert("[공지사항]\n대구~울산 노선의 시간이 변경 되어 안내드리오니, 참고하시\n이용하여 주시기 바랍니다.\n1. 변경적용일자: 2019.3.15~\n2. 변경 내용\n- 22시 30분 -> 22시 20분 \n- 23시 30분 -> 23시 20분");
				}*/
				
				//서울(010)-구미(810) : 190314
				if((deprCdCfm == "010" && arvlCdCfm == "810") || (deprCdCfm == "810" && arvlCdCfm == "010")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 23,100원 → 22.000원(5% 할인요금 적용)");
				}
				
				//서울(010)-진주(722) : 190314				
				if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "010")){
					alert("​2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 40,600원 → 34.000원(16% 할인요금 적용)");
				}	
				
				//서울(010)-창원(710), 서울(010)-창원역(711) : 190314				
				if((deprCdCfm == "010" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "010")
					|| (deprCdCfm == "010" && arvlCdCfm == "711") || (deprCdCfm == "711" && arvlCdCfm == "010")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 43,400원 → 36,900원(15% 할인요금 적용)\n프리(주말) : 43,400원 → 39,100원(10% 할인요금 적용)");
				}
				
				//서울(010)-마산(706), 서울(010)-마산내서(706): 190314
				if((deprCdCfm == "010" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "010")
					|| (deprCdCfm == "010" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "010")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 42,900원 → 36,500원(15% 할인요금 적용)\n프리(주말) : 42,900원 → 38,600원(10% 할인요금 적용)");
				}
				
				//동서울(032)-진해(704) : 190314
				if((deprCdCfm == "032" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "032")){
					alert("2019. 3. 8(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 44,700원 → 38.000원(15% 할인요금 적용)\n프리(주말) : 44,700원 → 40.000원(10% 할인요금 적용)");
				}
				
				//동서울(032)-마산(705) : 190314
				if((deprCdCfm == "032" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "032")
					|| (deprCdCfm == "032" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "032")){
					alert("2019. 3. 8(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 43,600원 → 37.000원(15% 할인요금 적용)\n프리(주말) : 43,600원 → 39.000원(10% 할인요금 적용)");
				}
				
				//인천(100)-진주(722) : 190314
				if((deprCdCfm == "100" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "100")
						 || (deprCdCfm == "100" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "100")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 33,000원 → 31,500원(4.5% 할인요금 적용)");
				}
				
				//수원(110)-서부산(703) : 190314
				if((deprCdCfm == "110" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "110")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 35,500원 → 33,800원(4.7% 할인요금 적용)");
				}
				
				//고양화정(115)-진주(722), 고양백석(116)-진주(722) : 190314
				if((deprCdCfm == "115" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "115")
					|| (deprCdCfm == "116" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "116")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 35,900원 → 33,000원(8% 할인요금 적용)");
				}
				
				//전주(602)-부산(700) : 190314
				if((deprCdCfm == "602" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "602")){
					alert("우등 3.1(금)/프리미엄 3.11(월)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 26,200원 → 24,900원(5% 할인요금 적용)\n프리(주중) : 32,300원 → 27,500원(15% 할인요금 적용)\n프리(주말) : 32,300원 → 29,100원(10% 할인요금 적용)");
				}
				
				//동대구(801)-진해(704) : 190314
				if((deprCdCfm == "801" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "801")){
					alert("현재 할인요금을 적용중이나 운영의 어려움으로 3.1(금)부로 할인율을 조정하고 운수사업법 제8조에 의거 시외직행 우등요금을 적용합니다.\n대구-진해(우등) : 13,500원 → 12,000원(11% 할인요금 적용)");
				}
				
				//동대구(801)-마산(705) : 190314
				if((deprCdCfm == "801" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "801")){
					alert("현재 할인요금을 적용중이나 운영의 어려움으로 3.1(금)부로 할인율을 조정하고 운수사업법 제8조에 의거 시외직행 우등요금을 적용합니다.\n대구-마산(우등) : 11,100원 → 10,500원(5.4% 할인요금 적용)");
				}
				
				//인천공항T1(105)-김해(735),인천공항T2(117)-김해(735) : 190314
				if((deprCdCfm == "105" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "105")
					|| (deprCdCfm == "117" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "117")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중/주말) : 58,100원 → 52.300원(10% 상시할인요금 적용)");
				}
				
				//인천(100)-김해(735) : 190314
				if((deprCdCfm == "100" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "100")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중/주말) : 48,800원 → 43.900원(10% 상시할인요금 적용)");
				}
				
				//서울(010)-아산온양(340),서울(010)-아산서부(341) : 190314
				if((deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010")
					|| (deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010")){
					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n고속 : 8,200원 → 7,400원(9.8% 할인요금 적용)");
				}
				
				//서대구(805) : 190329
				if(deprCdCfm == "805"){
					alert("해당시간은 동대구(기점) 출발시간입니다.\n서대구(중간정차지)에서는 약 10~20분 후 출발 예정입니다.\n도로사정에 따라 출발시간이 지연될 수 있습니다.");
				}
				
				//강릉(200), 속초(230), 동해(210), 삼척(220) : 190405
				/*if(arvlCdCfm == "200" || arvlCdCfm == "210" || arvlCdCfm == "220" || arvlCdCfm == "230"){
					alert("강원도 산불화재 관련하여 속초, 강릉, 동해, 삼척 고속버스노선 정상 운행 중입니다.");
				}*/

				/*
				 * 2020-03-06 yahan 동부고속 노선팝업 삭제
				//서울(010)-제천하소(449),서울(010)-제천(450),서울(010)-용인유림(149),서울(010)-용인(150),서울(010)-이천부발(신하리)(172),서울(010)-여주대(139),서울(010)-여주(140)
				if((deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "010" && arvlCdCfm == "149") 
						|| (deprCdCfm == "010" && arvlCdCfm == "150") || (deprCdCfm == "010" && arvlCdCfm == "172")
						|| (deprCdCfm == "010" && arvlCdCfm == "139") || (deprCdCfm == "010" && arvlCdCfm == "140")
						|| (deprCdCfm == "449" && arvlCdCfm == "010") || (deprCdCfm == "450" && arvlCdCfm == "010") || (deprCdCfm == "149" && arvlCdCfm == "010") 
						|| (deprCdCfm == "150" && arvlCdCfm == "010") || (deprCdCfm == "172" && arvlCdCfm == "010")
						|| (deprCdCfm == "139" && arvlCdCfm == "010") || (deprCdCfm == "140" && arvlCdCfm == "010")){
					alert("[레드캡렌터카 업무제휴]\n\n해당 노선 이용 시 레드캡 렌트비 90%할인!\n(어린이날 5월3일~5일 제외! | 85% 할인)\n일시: 2019년 4월 1일~ 5월 31일\n문의: 1544-4599(레드캡렌터카)\n\n많은 이용 바랍니다. 감사합니다.");
				}
				*/
				
				// 광주 <-> 마산내서 (18.08.09)
				if(((deprCdCfm == "801" && arvlCdCfm == "400")||(deprCdCfm == "805" && arvlCdCfm == "400")||(deprCdCfm == "700" && arvlCdCfm == "400")) && yymmddD0 < 20190501){					
					alert("[고속도로 낙석사고로 인한 환승지 임시 미경유 안내]\n1. 대상노선: \n   가) 대구(동대구, 서대구) → 청주고속터미널(상행)노선, 선산 미경유\n   나) 부산 → 청주고속터미널(상행)노선, 낙동강 미경유\n2. 기간 : 2019.04.29 ~ 30");
				}
				
				//서울(010)-아산온양(340),서울(010)-아산둔포(344) : 190507
				if((deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "010" && arvlCdCfm == "344") || (deprCdCfm == "340" && arvlCdCfm == "010") || (deprCdCfm == "344" && arvlCdCfm == "010")){
					alert("[중간정류장 추가안내]\n- 운행노선 : 서울-아산테크노벨리-아산둔포-아산온양\n- 변경사항 : 아산테크노벨리 중간정차, 아산둔포 정류장 위치변경 (둔포파리바게트앞)\n- 운행개시 : 2019.05.20(월)부터\n- 운행회수 : 일 3회 운행");
				}
				
				//청주(센트럴)(401)-센트럴시티(020) : 190513
				if((deprCdCfm == "020" && arvlCdCfm == "401") || (deprCdCfm == "401" && arvlCdCfm == "020")){
					alert("청주(센트럴)은 청주시외버스 터미널입니다. 착오 없으시길 바랍니다.");
				}
				
				//서울(010)-공주(320) : 190517
				if((deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")){		//서울-공주
					//alert("* 할인율 조정 안내*\n\n서울~공주 노선의 우등요금이 10,800원에서 11,900원으로\n프리미엄 요금이 13,800원에서 14,700원(주중12,900원)으로\n'19.6.1일자로 조정되오니, 이용에 참고하여 주시기 바랍니다.");
				}
				
				// 센트럴 -> 전주 (19.05.24)
				if((deprCdCfm == "020" && arvlCdCfm == "602") && yymmddD0 < 20190530){					
					alert("센트럴시티(서울)→전주 노선이 5월 27일 22시이후\n배차부터 승차홈이 변경되오니 이용에 참고하시기 바랍니다.\n* 기존: Gate9 →변경: Gate 8");
				}
				
				// 안성 -> 서울 (19.05.29)
//				if(deprCdCfm == "130" && arvlCdCfm == "010"){
//					alert("[출퇴근 고객 주중 할인 이벤트]\n\n출퇴근 이용객의 교통편의 증진을 위하여, 6월 3일부터 안성발 서울행 노선의 06시 40분과 07시 05분 차량의 요금을 아래와 같이 할인하오니, 많은 이용 바랍니다.\n- 노선 : 안성→서울 / 06시 40분, 07시 05분(월~금, 2회)\n- 요금할인 : 6,600원 -> 5,300원 (20% 할인)\n- 할인방법 : 대학생요금 선택하여 예매\n- 시행일자 : 6.3(월)\n※ 현장발권 적용 불가");
//				}
				
				// 서울->동해, 동서울->동해 (19.06.26)
				if((deprCdCfm == "010" && arvlCdCfm == "210" || deprCdCfm == "032" && arvlCdCfm == "210") && (deprDtmChk == 20190720 || deprDtmChk == 20190721)){
					alert("[그린플러그드2019 동해] 이용 고객은 동해그린으로 조회 후 예매해 주시길 바랍니다.");
				}
				
				// 서울->동해그린, 동서울->동해그린 (19.06.26)
				if((deprCdCfm == "010" && arvlCdCfm == "211" || deprCdCfm == "032" && arvlCdCfm == "211") && (deprDtmChk == 20190720 || deprDtmChk == 20190721)){
					alert("* 운행기간 : 2019년 7월 20일 ~ 21일\n해당 노선은 [그린플러그드2019 동해] 행사를 위한 임시 노선입니다.\n기존 동해 고객님서는 동해그린이 아닌 동해를 선택해 주시기 바랍니다.");
				}
				
				// 성남(120)-내서(706) : 190705
				if(((deprCdCfm == "120" && arvlCdCfm == "706")||(deprCdCfm == "706" && arvlCdCfm == "120")) && deprDtmChk >= 20190729){		//성남-내서
					alert("<노선안내>\n성남↔내서 구간은 2019년 7월 29일(월) 부로 운행이 종료되었으니\n기존 고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");
				}
				
				// 서울(010)-속초(230), 서울(010)-양양(270) : 190708
				if((deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "270" && arvlCdCfm == "010") || (deprCdCfm == "230" && arvlCdCfm == "010")){
					alert("[서울-속초 프리미엄버스 운행 개시]\n- 운송개시일: 2019년 7월 19일 금요일\n- 요금: 서울-양양 23,500원 | 서울-속초 26,300원\n프리미엄버스 신규 운행되오니 고객 여러분의 많은 이용 바랍니다.\n감사합니다.");	
				}
				
				// 성남(120)-마산(705): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "120")){
					alert("[노선연장안내]\n- 변경사항: 성남-선산-마산-진해 연장운행\n- 운행일자: 2019.7.29(월)\n내서정류장은 미경유 하오니 착오없으시길 바라며 기존 성남-내서 구간 이용고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");	
				}
				
				// 성남(120)-진해(704): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "120")){
					alert("[노선연장안내]\n- 변경사항: 성남-선산-마산-진해 연장운행\n- 운행일자: 2019.7.29(월)\n내서정류장은 미경유 하오니 착오없으시길 바라며 기존 성남-내서 구간 이용고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");	
				}
				
				// 성남(120)-진해(704): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "120")){
					alert("[노선안내]\n성남-내서 구간은 2019년 7월 29일(월) 부로 운행이 종료되오니 기존 이용객께서는 성남-선산, 선산-내서 환승을 통하여 이용하시기 바랍니다.");	
				}
				
				// 아산온양(340)→인천(100), 아산서부(341)→인천(100), 천안아산(343)→인천(100): 190716
				if((deprCdCfm == "340" && arvlCdCfm == "100") || (deprCdCfm == "341" && arvlCdCfm == "100") || (deprCdCfm == "343" && arvlCdCfm == "100")){
					alert("[정류장추가안내]\n- 변경사항 : 아산-아산서부-천안아산역-천안-인천\n- 운행일자 : 2019. 8. 5(월) \n아산서부, 천안아산역을 중간정차함에 따라 운행시간이 약 10분 추가소요 되오니 이점 양지하여 주시기 바랍니다.");	
				}
				
				// 양양(270)→인천공항T1,T2(105,117): 190731
				if((deprCdCfm == "270" && arvlCdCfm == "105") || (deprCdCfm == "270" && arvlCdCfm == "117") || (deprCdCfm == "105" && arvlCdCfm == "270") || (deprCdCfm == "117" && arvlCdCfm == "270")){
					alert("인천공항 ↔ 양양노선을 이용하시는 고객님께 안내 말씀 드립니다.\n2019년 8월 26일부터 부득이한 사정으로 상기 노선을 운행중단 하오니 참고하시기 바라며, 그 동안 인천공항↔양양 노선을 이용해주신\n고객님께 감사의 말씀 드립니다.\n문의전화 : 중앙고속 02)3479～9528, 동부고속 02)3483～6113");	
				}
				
				// 20200602 yahan 수정
				//센트럴시티->군산 (19.07.31)
				if(deprCdCfm == "020" && arvlCdCfm == "610"){
					alert("[동군산(대야) 경유시간 안내]\n" +
							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
							"- 센트럴시티(서울) → 군산 (총 3회) : 08:00 / 12:20 / 17:20\n" +
							"- 운행고속사 : 금호, 중앙, 천일\n" +
							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
				}	
				
				// 20200602 yahan 수정
				//군산->센트럴시티 (19.07.31)
				if(deprCdCfm == "610" && arvlCdCfm == "020"){
					alert("[동군산(대야) 경유시간 안내]\n" +
							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
							"- 군산 → 센트럴시티(서울) (총 3회) : 08:00 / 13:00 / 17:40\n" +
							"- 운행고속사 : 금호, 중앙, 천일\n" +
							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
				}	
				
				//서울->천안 (19.12.12)
				if(deprCdCfm == "010" && arvlCdCfm == "310" && yymmddD0 < 20200128){
					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 14, 15번 홈 -> 변경 후 : 14번");
				}
				
				//서울->김해 (19.12.12)
				if(deprCdCfm == "010" && arvlCdCfm == "735" && yymmddD0 < 20200128){
					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 6번 홈 -> 변경 후 : 15번");
				}
				
				//서울->통영 (19.12.12)
				if(deprCdCfm == "010" && arvlCdCfm == "730" && yymmddD0 < 20200128){
					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 6번 홈 -> 변경 후 : 15번");
				}
				
				//동서울->청주 (19.09.02)
				if((deprCdCfm == "032" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "032")){
					alert("2019.09.01(일) 부터 아래와 같이 할인요금을 적용합니다.\n우등 : 11,700원 → 10,700원(1,000원 / 8.5% 할인요금 적용)");
				}
				
				//서울경부->이천 (19.11.14)
				if((deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010")){
					alert("[서울-이천 노선 첫차 시간 변경 안내]\n1) 변경 일시 : 2019년 12월 1일\n2) 화요일-금요일 첫차 시간 변경 : 06:00 → 06:30\n3) 월요일, 토요일-일요일 기존 시간 동일 ");
				}
				
				//서울경부->이천 (19.11.12)
				if((deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010")){
					alert("서울-마장택지지구 노선이 신규로 운행됩니다.\n마장택지지구로 가시는 고객께서는 서울-마장택지지구로 조회 바랍니다.");
				}
				
				//센트럴시티->순천 (19.11.13)
				if((deprCdCfm == "020" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "020")){
					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 10:10 / 17:05 (1일/2회)\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
				}
				
				//인천->순천 (19.11.15)
				if((deprCdCfm == "100" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "100")){
					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 11:20 / 18:10 (1일/2회)\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
				}
				
				//정안(휴)하행->순천 (19.11.19)
				if((deprCdCfm == "315" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "315")){
					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 11:40, 13:00, 18:35, 19:50 배차\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
				}
				
				// 센트럴시티 <-> 광주 (19.11.28)
				if(((deprCdCfm == "020" && arvlCdCfm == "500")||(deprCdCfm == "500" && arvlCdCfm == "020")) && yymmddD0 < 20200101){					
					alert("1. KT Super VR 서비스 이용 안내 \n - 서울~광주 금호고속 프리미엄 버스\n - [월~목] 서울발 11:00, 광주발 16:30\n - [금~일] 서울발 11:00, 광주발 17:30\n - 통신사 상관없이 누구나 무료로 이용 가능\n2. 이용 좌석\n - 6번, 9번, 10번, 11번, 12번, 13번, 14번, 15번, 18번, 21번 \n3. 시행일자\n - 2019.11.28(목) ~ 12.31(화)");
				}
				
				//해돋이 팝업 (강릉,속초,동해,삼척) 
//				if(((deprCdCfm == "010" && arvlCdCfm == "200")||(deprCdCfm == "010" && arvlCdCfm == "230")||(deprCdCfm == "010" && arvlCdCfm == "210")||(deprCdCfm == "010" && arvlCdCfm == "220")) && yymmddD0 < 20200101){	
//					alert("서울-강릉/속초/동해/삼척 노선 해돋이 임시차 투입안내\n\n■ 일시 : 2020년 1월 1일\n■ 시간 : 00:05 ~ 01:00\n\n많은 이용 부탁드립니다.");
//				}
				//yahan
				//해돋이 팝업 (강릉,동해,삼척) 2019-12-31 속초삭제 
				if((
					(deprCdCfm == "010" && arvlCdCfm == "200")||
					(deprCdCfm == "010" && arvlCdCfm == "210")||
					(deprCdCfm == "010" && arvlCdCfm == "220")) && yymmddD0 < 20200101){	
					alert("서울-강릉/동해/삼척 노선 해돋이 임시차 투입안내\n\n■ 일시 : 2020년 1월 1일\n■ 시간 : 00:05 ~ 01:00\n\n많은 이용 부탁드립니다.");
				}
				
				//센트럴시티 -> 고창/흥덕 
				if((deprCdCfm == "020" && arvlCdCfm == "634")||(deprCdCfm == "020" && arvlCdCfm == "635")){	
					alert("[고창(흥덕)노선 우등고속 신설]\n- 운수회사 : 호남, 전북, 대한\n- 시행일자 : 2020년 1월 8일(수)\n* 2주간 일반 요금이 적용되며, 1월 22일(수)부터 정상 요금");
				}
				
				//$("#rotInfFrm").submit();
				var prmmDcYn = $("#prmmDcYn").val(); //Y:시외우등할인대상, N:비대상
				if(prmmDcYn == "Y"){
					//시외할인대상여부로 모달창체크
					var popGradeinfo = $('[data-remodal-id=popGradeinfo]').remodal();
					popGradeinfo.open();
				}else{
					fnRotAdPopup();
				}
			}
			
					
			
			/*if(yymmddD0 < 20181206){
				var confirmMsg = "[프리미엄 고속버스 고객만족도 설문조사]\n- 기간 : 2018.11.28(수)~12.05(수)\n설문조사를 하시겠습니까?";
				//설문조사 팝업(신규)
				if((deprCdCfm == "010" && arvlCdCfm == "300") || (deprCdCfm == "300" && arvlCdCfm == "010")){			//서울-대전
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/yqDIXWWzvjHvYNrC2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "815") || (deprCdCfm == "815" && arvlCdCfm == "010")){		//서울-경주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/R8pqJZUCZX0wwlas2");
						return true;
					}	
				}else if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){		//서울-청주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/psMthwc9xYBI7ZHM2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")){		//서울-공주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/ZnEQiNAvCZzNrDlQ2");
						return true;
					}
				}else if((deprCdCfm == "020" && arvlCdCfm == "615") || (deprCdCfm == "615" && arvlCdCfm == "020")){		//서울-익산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/LhVFVTFbZIiSLjcU2");
						return true;
					}
				}else if((deprCdCfm == "700" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "700")){		//부산-광주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/wQRplEG8nIxYhTOD3");
						return true;
					}
				}else if((deprCdCfm == "602" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "602")){		//전주-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/CVOpK6kiMxZkElc83");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "010")){		//서울-삼척
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/yYNglQ0o2bBhOby93");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010")){		//서울-동해
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/0e98z44Lcer9tLJn1");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "010")){		//서울-서부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/zCaalx1NDJCqCG1o1");
						return true;
					}
				}else if((deprCdCfm == "032" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "032")){		//동서울-진해
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/N6TQnRMMIXKcJIB52");
						return true;
					}
				}else if((deprCdCfm == "032" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "032")){		//동서울-마산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/GZKtPLkZBc3PtBu52");
						return true;
					}
				}else if((deprCdCfm == "400" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "400")){		//청주-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/ODGfkKPdFpKA7j5q1");
						return true;
					}
				}else if((deprCdCfm == "100" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "100")){		//인천-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/NvhLzVwwYh72swk82");
						return true;
					}
				}
				
				//설문조사 팝업(확대)
				if((deprCdCfm == "010" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "010")){			//서울-마산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/eS2dOGJIKsGMtLkB3");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "010")){		//서울-창원
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/pvkeOIi2fCpvIU0e2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010")){		//서울-진주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/T91dReA2PbgmdUjX2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010")){		//서울-강릉
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/AMtJ73ad14UzivO13");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")){		//서울-세종
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/HUAd5JCCXmLwiaKX2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010")){		//서울-세종
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/HUAd5JCCXmLwiaKX2");
						return true;
					}
				}else if((deprCdCfm == "500" && arvlCdCfm == "801") || (deprCdCfm == "801" && arvlCdCfm == "500")){		//광주-동대구
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/RlGIeUBwFe46Hkrl1");
						return true;
					}
				}else if((deprCdCfm == "500" && arvlCdCfm == "805") || (deprCdCfm == "805" && arvlCdCfm == "500")){		//광주-서대구
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/RlGIeUBwFe46Hkrl1");
						return true;
					}
				}else if((deprCdCfm == "020" && arvlCdCfm == "610") || (deprCdCfm == "610" && arvlCdCfm == "020")){		//서울-군산				
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/Vr8VdIDRaxsQmwp92");
						return true;
					}
				}
			}*/
		}
	}else{
		alert("예매하실 노선을 선택하세요.");
		return;
	}
}



function fnCloseGradePop(){
	$(document).off('closed').on('closed','.pop_gradeinfo',function(e){
		fnRotAdPopup();
	});
	
}



function fnBusClsCd(obj){
	$("#busClsCd").val(obj.value);
}



function fnRotAdPopup(){
	var deprCdCfm =  $("#deprCd").val();
	var arvlCdCfm =  $("#arvlCd").val();
	
	
	// 20200724 yahan 사업자및 터미널위치 변경으로 삭제요청
//	// 광양 임시터미널 안내
//	if(deprCdCfm == "520"){
//		var popTmpTml = $('[data-remodal-id=popTmpTml]').remodal();
//		popTmpTml.open();
//	}else
	{
		// 노선 조회 (제휴할인 레이어팝업 노출) 2019.02.27
		// 서울경부(010)-강릉(200)
		if((deprCdCfm == "010" && arvlCdCfm == "200") || 
				(deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032") ||
				(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "010" && arvlCdCfm == "230") || 
				(deprCdCfm == "032" && arvlCdCfm == "270") || (deprCdCfm == "032" && arvlCdCfm == "230") || 
				(deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "105" && arvlCdCfm == "270") || 
				(deprCdCfm == "117" && arvlCdCfm == "270") || (deprCdCfm == "110" && arvlCdCfm == "220") || 
				(deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "032" && arvlCdCfm == "220") || 
				(deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "010" && arvlCdCfm == "220") || 
				(deprCdCfm == "010" && arvlCdCfm == "240")){
			if(deprCdCfm == "010" && arvlCdCfm == "200"){
				var popRoute1 = $('[data-remodal-id=popRoute1]').remodal();
				popRoute1.open();
			}

			// 동서울(032)-강릉(200)
			// 20200706 yahan 상하행 모두적용
			if(
				(deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032")
				){
				var popRoute2 = $('[data-remodal-id=popRoute2]').remodal();
				popRoute2.open();
			}
			
			// 6개노선(서울(010)-양양(270), 서울(010)-속초(230), 동서울(032)-양양(270), 동서울(032)-속초(230), 인천(100)-속초(230), 인천공항T1(105)-양양(270), 인천공항T2(117)-양양(270))
			if((deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "032" && arvlCdCfm == "270") 
				|| (deprCdCfm == "032" && arvlCdCfm == "230") || (deprCdCfm == "100" && arvlCdCfm == "230")  || (deprCdCfm == "105" && arvlCdCfm == "270") || (deprCdCfm == "117" && arvlCdCfm == "270")){			
				var popRoute5 = $('[data-remodal-id=popRoute5]').remodal();
				popRoute5.open();
			}
			
			// 수원(110)-삼척(220)
			if(deprCdCfm == "110" && arvlCdCfm == "220"){
				$("#arvlNmSpan3").html("삼척");
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 동서울(032)-동해(210)
			if(deprCdCfm == "032" && arvlCdCfm == "210"){
				$("#arvlNmSpan3").html("동해");
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 동서울(032)-삼척(220)
			if(deprCdCfm == "032" && arvlCdCfm == "220"){
				$("#arvlNmSpan3").html("삼척");	
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 서울경부(010)-동해(210)
			if(deprCdCfm == "010" && arvlCdCfm == "210"){
				$("#arvlNmSpan4").html("동해");	
				var popRoute4 = $('[data-remodal-id=popRoute4]').remodal();
				popRoute4.open();
			}
			
			// 서울경부(010)-삼척(220)
			if(deprCdCfm == "010" && arvlCdCfm == "220"){
				$("#arvlNmSpan4").html("삼척");			
				var popRoute4 = $('[data-remodal-id=popRoute4]').remodal();
				popRoute4.open();
			}
			
			// 서울경부 - 원주
			if(deprCdCfm == "010" && arvlCdCfm == "240"){
				var popRoute6 = $('[data-remodal-id=popRoute6]').remodal();
				popRoute6.open();
			}
			
		}else{
			fnRotVldChc();
		}
	}
}

function fnRotVldChc(){	
	var deprCdCfm =  $("#deprCd").val();
	var arvlCdCfm =  $("#arvlCd").val();
	
	var dt = new Date();		//오늘날짜 전체
	var yyyy  = dt.getFullYear();		//선택한 년도
	var mm    = dt.getMonth()+1;		//선택한 월
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택월 ex:01 두글자로 변환
	var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
	var yymmddD0 = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
	
	$("#loading").show();
	var rotInfFrm = $("form[name=rotInfFrm]").serialize() ;
	$.ajax({	
        url      : "/mrs/readAlcnSrch.ajax",
        type     : "post",
        data : rotInfFrm,
        dataType : "json",
        async    : true,
        success  : function(alcnInfMap){
        	if(alcnInfMap.pathDvsCd == "rtrp"){
        		if(alcnInfMap.rotVldChc == "N"){
        			//alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
        			
        			//서울-세종 예매오픈일 공지 (190304)
	        		if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
	        			|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
	        			|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
	        			&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
	        		
        			$("#loading").hide();
        			return;
        		}else if(alcnInfMap.rotVldChc1 == "N"){
        			//alert("오늘날 배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
        			//서울-세종 예매오픈일 공지 (190304)
        			if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
    	        		|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
    	        		|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
    	        		&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("오는날 조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
        			
        			$("#loading").hide();
        			return;
        		}else{
        			if($("#mainYn").val() == null || $("#mainYn").val() == ""){
        				if(confirm("승차권 예매에 따른 취소수수료 내용에 동의하십니까?")){
        					$("#loading").hide();
        					$("#rotInfFrm").submit();
        				} else {
            				$("#loading").hide();
        				}
        			} else {
        				$("#loading").hide();
       					$("#rotInfFrm").submit();
        			}
        		}
        	}else{
	        	if(alcnInfMap.rotVldChc == "N"){
	        		//alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
	        		
	        		//서울-세종 예매오픈일 공지 (190304)
	        		if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
		        		|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
		        		|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
		        		&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
	        		
	        		$("#loading").hide();
	        		return;
	        	}else{
	        		if($("#mainYn").val() == null || $("#mainYn").val() == ""){
        				if(confirm("승차권 예매에 따른 취소수수료 내용에 동의하십니까?")){
        					$("#loading").hide();
        					$("#rotInfFrm").submit();
        				} else {
            				$("#loading").hide();
        				}
        			} else {
        				$("#loading").hide();
       					$("#rotInfFrm").submit();
        			}
	        	}
        	}
        }
	});
}




function fnEmptyCssStup(){
	//empt css 추가
	if($("#readDeprInfoList").find('.val_txt').text() == ""){
		$("#readDeprInfoList").find('p').addClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() == ""){
		$("#popDeprChc").find('p').addClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() == ""){
		$("#readArvlInfoList").find('p').addClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() == ""){
		$("#popArvlChc").find('p').addClass('empty');
	}
	
	//empt css 삭제
	if($("#readDeprInfoList").find('.val_txt').text() != ""){
		$("#readDeprInfoList").find('p').removeClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() != ""){
		$("#popDeprChc").find('p').removeClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() != ""){
		$("#readArvlInfoList").find('p').removeClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() != ""){
		$("#popArvlChc").find('p').removeClass('empty');
	}
}