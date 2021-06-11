/* @@@  skipNavi @@@ */
var skip_a = $("#skipNavi a");

skip_a.on("focusin", function(){
  $(this).css({
    top: 0,
  });
});
skip_a.on("focusout", function(){
  $(this).css({
    top: -30,
  });
});

/* @@@ skipNavi end @@@ */

/* @@@ GNB @@@ */

var $header = $("#header");
var $header_upper = $header.find(".header_upper");
var $gnb_li = $header_upper.find("#gnb>li");
var $sub = $gnb_li.find(".sub");
var speed = 500;

//gnb li에 마우스엔터, 포커스인 했을 때
$gnb_li.on("mouseenter focusin", function(){
  openSub(this);
});

//gnb li에 마우스리브, 포커스아웃 했을 때
$gnb_li.on("mouseleave focusout", function(){
  closeSub(this);
});

function openSub(el){
  var ht = $(el).find($sub).css("height");
  ht = parseInt(ht) + 100;
  var bg = $sub.css("background-color");

  var sub_depth = $(el).find(".depth2").length + 2;

  $(el).find(".depth2").css({
    width: "calc(100% / "+sub_depth+")"
  });

  $header_upper.prepend(
    $("<div class='gnbBg'>").css({
      width: "100%",
      height: ht,
      position: "absolute",
      top: 70,
      left: 0,
      borderTop: "1px solid #ccc",
      boxShadow: "0px 10px 10px rgba(51, 51, 51, 0.08)",
      backgroundColor: bg,
      display: "none",
      zIndex: 2
    })
  )
  $(".gnbBg").slideDown(speed);

  $(el).children(".sub").stop().slideDown(speed);
}

function closeSub(el){
  $(el).children(".sub").stop().slideUp(speed / 2);
  $(".gnbBg").css({
    boxShadow: "none"
  }).slideUp(speed / 2, function(){
    $(this).remove();
  });
}

/* @@@ GNB end @@@ */

/* @@@ TAB @@@ */

$("#community .inner .btn a").on("click", function(e){
  e.preventDefault();

  var target = $(this).attr("href");
  // console.log(target);

  $("#community .inner .btn a").removeClass("on");
  $(this).addClass("on");

  $("#community .inner .tabs").hide();
  $(target).show();

  var txt = $("#community .inner .btn a.on").text();
  var txt_ex = $("#community .inner .btn").children().hasClass("on");

  if(txt_ex){
    $("#community .inner .site_map").children().eq(3).children().text(txt);
  }
});

/* @@@ TAB end @@@ */

/* @@@ FAQ @@@ */
/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/

var $frame = $(".faq");
var $btns = $frame.find("dt");
var $boxs = $frame.find("dd");

var speed = 300;
var enableClick = true;

//버튼을 클릭했을 때
$btns.on("click", function(e){
  e.preventDefault(); //링크이동금지

  //기본으로 초기화
  $btns.find(".fa-chevron-up").css({
    transform: "rotate(-180deg)"
  });
  //enableClick이 true
  if(enableClick){
    //함수를 실행하고
    activation(this);
    //enableClick을 false로 바꿔서 재클릭을 못하게 함
    enableClick = false;
  }
});

//activation 함수정의
function activation(self){
  //$(this)- dt를 클릭했을때 on이 있는지 판별
  var isOn = $(self).hasClass("on");

  //모든 버튼, 박스 비활성화
  $btns.removeClass("on");
  $boxs.slideUp(speed);

  //만약 활성화 되어있다면 
  if(isOn){
    //버튼의 on 제거 - 비활성화, 버튼 다음의 dd도 감춤 - slideUp();
    $(self).removeClass("on");

    $(self).next("dd").slideUp(speed, function(){
      //동작이 끝나면 클릭이 가능하도록 enableClick을 true값으로 바꿈
      enableClick = true;
    });
  }else{
    //만약 on이 없다면 (비활성화 상태)
    //버튼을 활성화 하며, 버튼 다음에 오는 dd도 활성화 - slideDown();
    $(self).addClass("on");
    $(self).find(".fa-chevron-up").css({
      transform: "rotate(0deg)"
    });
    $(self).next("dd").slideDown(speed, function(){
      enableClick = true;
    });
  }
}
/* @@@ FAQ end @@@ */