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
var $gnb = $header_upper.find("#gnb");
var $gnb_li = $gnb.find("li");
var $sub = $gnb_li.find(".sub");
var $depth2_tit = $header_upper.find("#gnb>li.on .sub .depth2 h2 a");
var speed = 300;


//gnb li에 마우스엔터, 포커스인 했을 때
$gnb_li.on("mouseenter focusin", function(){
  openSub(this);
});

//gnb li에 마우스리브, 포커스아웃 했을 때
$gnb_li.on("mouseleave focusout", function(){
  closeSub(this);
});

function openSub(el){
  var wid = $("body").width();
  var gnb_wid = $gnb.width();
  var ht = $(el).find($sub).css("height");
  ht = parseInt(ht) + 100; //.sub padding값 고려
  var bg = $sub.css("background-color");

  var sub_depth = $(el).find(".depth2").length + 2;
  var isGnbBg = $(".gnbBg").length;
  $(el).find(".depth2").css({
    width: "calc(100% / "+sub_depth+")"
  });

  if(!isGnbBg) {
    $(el).prepend(
      $("<div class='gnbBg'>").css({
        width: wid,
        height: ht,
        position: "absolute",
        top: 70,
        left: (gnb_wid/2)-(wid/2),
        borderTop: "1px solid #ccc",
        boxShadow: "0px 10px 10px rgba(51, 51, 51, 0.08)",
        backgroundColor: bg,
        display: "none",
        zIndex: 2
      })
    );
  };

  $(".gnbBg").stop().slideDown(speed);

  $(el).children(".sub").stop().slideDown(speed);
}

function closeSub(el){
  $(el).children(".sub").stop().slideUp(speed / 2);
  $(".gnbBg").remove();
  // $(".gnbBg").stop().slideUp(speed / 2, function(){
  //   $(this).remove();
  // });

}

var btnCall = $header_upper.find(".btnCall");
var menuMo = $header_upper.find("#menu_mo");

btnCall.on("click", function () {
  btnCall.toggleClass("on");
  menuMo.toggleClass("on");
});

$(window).on("resize", function(){
  var wid = window.innerWidth;
  if(wid>=1180){
    btnCall.removeClass("on");
    menuMo.removeClass("on");
  }
});


$depth2_tit.each(function(index, items){  
  $(".header_lower .inner .fixed_menu").append(
    $("<li>").append(
      $("<a href='#'>").text(items.text)
    )
  )
});

// $bepth2_tit.each(function(index, items){
//   $(".fixed_menu")
//   .append(
//     $("<li>")
//     .append(
//       $("a")
//     )
//   )
// })


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

var faq_speed = 300;
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
  $boxs.slideUp(faq_speed);

  //만약 활성화 되어있다면 
  if(isOn){
    //버튼의 on 제거 - 비활성화, 버튼 다음의 dd도 감춤 - slideUp();
    $(self).removeClass("on");

    $(self).next("dd").slideUp(faq_speed, function(){
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
    $(self).next("dd").slideDown(faq_speed, function(){
      enableClick = true;
    });
  }
}
/* @@@ FAQ end @@@ */

/* @@@ board @@@ */
/*
var frame = $("#community .inner .f_board");
var url = "data/board.json";
console.log(frame);
callData(url);

//데이터 호출함수
function callData(url){
  $.ajax({
    url: url,
    dataType: "json"
  })
  .success(function(data){
    console.log(data)
    createTable(frame, data);
  })
  .error(function(err){
    console.error(err)
  })
}

//테이블 생성함수
function createTable(target, data){
  var items = data.data;

  //테이블 태그와 첫번째 고정영역인 thead, tbody 완성
  target.append(
    $("<table>")
    .attr({
      summary: "자유게시판"
    })
    .append(
      $("<cation class='h'>").text("순번, 제목, 날짜, 작성자, 조회수 순서의 자유게시판 입니다.")
      .append(
        $("<thead>")
        .append(
          $("<tr>")
          .append(
            "<th>NO</th>",
            "<th>제목</th>",
            "<th>날짜</th>",
            "<th>작성자</th>",
            "<th>조회수</th>"
          )
        ),
        $("<tbody>")
      )
    )
  );

  var wrap = frame.find("tbody");

  $(items).each(function(index, data){    
    var link = data.link;
    var title = data.title;
    var writer = data.writer;
    var date = data.date;
    var count_a = data.count_a;
    var count = ++index;
    //첫 숫자가 1부터 카운트 되야하기 때문에
    //전위연산자로 일단 index0값을 먼저 1증가 후 코드에 반영

    //tbody안에 데이터의 갯수만큼 tr생성
    wrap.prepend( //최신데이터가 윗쪽으로 출력되게 함
      $("<tr>")
      .append(
        $("<td>").text(count),
        $("<td>")
        .append(
          $("<a>").attr("href", link).text(title)
        ),
        $("<td>").text(writer),
        $("<td>").text(date),
        $("<td>").text(count_a)
      )
    )
  })
}
*/
/* @@@ board end @@@ */