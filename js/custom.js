/* ---  skipNavi --- */
var skip_a = $("#skipNavi a");

skip_a.on("focusin", function () {
	$(this).css({
		top: 0,
	});
});
skip_a.on("focusout", function () {
	$(this).css({
		top: -30,
	});
});

/* --- skipNavi end --- */

/* --- GNB --- */
var $header = $("#header");
var $header_upper = $header.find(".header_upper");
var $gnb = $header_upper.find("#gnb");
var $gnb_li = $gnb.find(">li");
var $sub = $gnb_li.find(".sub");
var $depth2_tit = $header_upper.find("#gnb>li.on .sub .depth2 h2 a");
var speed = 300;

create_gnbBg();

//gnb li에 마우스엔터, 포커스인 했을 때
$gnb_li.on("mouseenter focusin", function () {
	openSub(this);
});

//gnb li에 마우스리브, 포커스아웃 했을 때
$gnb_li.on("mouseleave focusout", function () {
	closeSub(this);
});

function openSub(el) {
	// var gnbBg_wid = $(".gnbBg").width();
	var ht = $(el).find($sub).height();
	var wid = window.innerWidth; //화면 전체 넓이(스크롤바 17px 제외)
	var subPos = (wid - 1180 + 17) / 2
	$(el).find($sub).css({
		// width: gnbBg_wid,
		left: -subPos
	});

	// $(el).children(".sub").stop().slideDown(speed);
	$(el).children(".sub").stop().fadeIn(speed);

	$(".gnbBg").css({
		height: ht
	});
}

function closeSub(el) {
	$(el).children(".sub").hide();
	$(".gnbBg").css({
		height: 0
	});
}

function create_gnbBg() {
	$header_upper.prepend(
		$("<div class=gnbBg>").css({
			width: "100%",
			height: 0,
			position: "absolute",
			top: 70,
			left: 0,
			borderTop: "1px solid #ccc",
			boxSizing: "border-box",
			boxShadow: "0px 10px 10px rgba(51, 51, 51, 0.08)",
			backgroundColor: "#fff",
			transition: "0.2s",
			zIndex: 1
		})
	);
}


var btnCall = $header_upper.find(".btnCall");
var menuMo = $header_upper.find("#menu_mo");

btnCall.on("click", function (e) {
	e.preventDefault();
	btnCall.toggleClass("on");
	menuMo.toggleClass("on");
});

$(window).on("resize", function () {
	var wid = window.innerWidth;
	if (wid >= 1180) {
		btnCall.removeClass("on");
		menuMo.removeClass("on");
	}
});

$depth2_tit.each(function (index, items) {
	$(".header_lower .inner .fixed_menu").append(
		$("<li>").append(
			$("<a href='#'>").text(items.text)
		)
	)
});

/* --- GNB end --- */

/* --- TAB --- */

$("#community .inner .btn a").on("click", function (e) {
	e.preventDefault();

	var target = $(this).attr("href");
	// console.log(target);

	$("#community .inner .btn a").removeClass("on");
	$(this).addClass("on");

	$("#community .inner .tabs").hide();
	$(target).show();

	var txt = $("#community .inner .btn a.on").text();
	var txt_ex = $("#community .inner .btn").children().hasClass("on");

	if (txt_ex) {
		$("#community .inner .site_map").children().eq(3).children().text(txt);
	}
});
/* --- TAB end --- */

/* --- FAQ --- */
/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/

var $frame = $(".faq");
var $btns = $frame.find("dt");
var $boxs = $frame.find("dd");

var faq_speed = 300;
var enableClick = true;

//버튼을 클릭했을 때
$btns.on("click", function (e) {
	e.preventDefault(); //링크이동금지

	//enableClick이 true
	if (enableClick) {
		//함수를 실행하고
		activation(this);
		//enableClick을 false로 바꿔서 재클릭을 못하게 함
		enableClick = false;
	}
});

//activation 함수정의
function activation(self) {
	//$(this)- dt를 클릭했을때 on이 있는지 판별
	var isOn = $(self).hasClass("on");

	//모든 버튼, 박스 비활성화
	$btns.removeClass("on");
	$boxs.slideUp(faq_speed);

	//만약 활성화 되어있다면
	if (isOn) {
		//버튼의 on 제거 - 비활성화, 버튼 다음의 dd도 감춤 - slideUp();
		$(self).removeClass("on");
		$(self).next("dd").slideUp(faq_speed, function () {
			//동작이 끝나면 클릭이 가능하도록 enableClick을 true값으로 바꿈
			enableClick = true;
		});
	} else {
		//만약 on이 없다면 (비활성화 상태)
		//버튼을 활성화 하며, 버튼 다음에 오는 dd도 활성화 - slideDown();
		$(self).addClass("on");
		$(self).next("dd").slideDown(faq_speed, function () {
			enableClick = true;
		});
	}
}
/* --- FAQ end --- */


/* --- join --- */

$("input[type=submit").on("click", function (e) {
	if (!isId("userid", 5)) e.preventDefault();
	if (!isPw("userpw1", "userpw2", 5)) e.preventDefault();
	if (!isname("user_name")) e.preventDefault();
	if (!isEmail("email1")) e.preventDefault();
	if (!isSelect("email2")) e.preventDefault();
});

function isId(name, len) {
	var userId = $("[name=" + name + "]").val();

	if (userId == "") {
		alert("아이디를 입력하세요.");
		return false;
	} else {
		if (userId.length < len) {
			alert("최소 " + len + "글자 이상 입력하세요.");
			return false;
		}
	}
};

//비밀번호와 재입력 모두 동일,
//특수문자, 영문, 숫자 포함
//아닐경우 경고창

//pw 인증
function isPw(name1, name2, len) {
	var $pw1 = $("input[name=" + name1 + "]");
	var $pw2 = $("input[name=" + name2 + "]");
	var pw1 = $pw1.val();
	var pw2 = $pw2.val();
	var isConfirm = false;
	var i = 0;

	var num = /[0-9]/;
	var eng = /[a-zA-Z]/;
	var spc = /[~!@#$%^&*()_+=\]\[-]/;

	if (pw1 === pw2) {

		//비번이 len의 갯수보다 큰지 확인
		if (pwd1.length >= len) {
			i++;
		} else {
			alert("비밀번호는 " + len + "자리 이상 입력하세요.");
		}

		//pw에 숫자 포함여부 확인
		if (num.test(pw1)) {
			i++;
		} else {
			alert("비밀번호에 숫자를 포함하세요.");
		}

		//pw에 문자 포함여부 확인
		if (eng.test(pw1)) {
			i++;
		} else {
			alert("비밀번호에 문자를 추가하세요.");
		}

		//pw에 특수문자 포함여부 확인
		if (spc.test(pw1)) {
			i++;
		} else {
			alert("비밀번호에 특수문자를 포함하세요.")
		}

		if (i === 4) {
			isConfirm = true;
			return isConfirm;
		} else {
			return isConfirm;
		}
	} else {
		alert("비밀번호를 동일하게 입력하세요.");
		return isConfirm;
	}
};

//이름 입력 확인
function isname(name) {
	var userName = $("[name=" + name + "]").val();

	if (userName == "") {
		alert("이름을 입력하세요.");
		return false;
	}
};

//email 인증 함수 정의
function isEmail(name) {
	var email1 = $("[name=" + name + "]").val();

	if (email1 == "") {
		alert("이메일을 입력하세요.");
		return false;
	}
}

function isSelect(name) {
	var sel = $("select[name=" + name + "]").children("option:selected").val();
	var msg = $("select[name=" + name + "]").children("option").eq(0).text();

	if (sel == "") {
		alert("이메일을 " + msg);
		return false;
	} else {
		return true;
	}
}

/* --- join end --- */
