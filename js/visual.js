/* --- main_visual --- */
var $main_visual = $("#main_visual");
var $main_slide_bg = $main_visual.find(".slide_bg");
var $slide_bg = $main_slide_bg.children("article");
var $inner_contents = $main_visual.find(".inner_contents");
var $slide_pagination = $inner_contents.find(".slide_pagination");
var $slide_pagination_btn = $slide_pagination.find("li");
var $inner_slide = $inner_contents.find(".inner_slide");
// var $inner_slide_boxs = document.getElementsByClassName("slide_tit");
var $inner_slide_boxs = $inner_slide.find(".slide_tit");
var $btn_prev = $inner_contents.find(".btn_prev");
var $btn_next = $inner_contents.find(".btn_next");

slide_pagination($slide_pagination_btn);

function slide_pagination(el) {
  el.on("click", function (e) {
    e.preventDefault();

    if (!$(this).hasClass("on")) {
      el.removeClass("on");
      $(this).addClass("on");
      // var idx = $(this).index();
      // $slide_bg.removeClass("on");
      // $inner_slide_boxs.removeClass("on");
      // $slide_bg.eq(idx).addClass("on");
      // $inner_slide_boxs.eq(idx).addClass("on");
      acti(this);
    };
  });
}

function acti(self) {
  var idx = $(self).index();
  $inner_slide_boxs.removeClass("on");
  $inner_slide_boxs.eq(idx).addClass("on");

  $slide_bg.removeClass("on");
  $slide_bg.eq(idx).addClass("on");

  // $slide_bg.eq(idx).animate({
  //   width: "100%",
  //   zIndex: 2
  // }, 0, function () {
  //   $slide_bg.eq(idx - 1).animate({
  //     width: "0%",
  //     zIndex: 1
  //   })
  // }, 1000)
} ////// 내일 1번째 4번째 슬라이드 위치 겹쳐서 이전 슬라이드 방식으로 재구성 하기!!!

$btn_prev.on("click", function () {
  // prev($inner_slide_boxs);
});

$btn_next.on("click", function () {
  // next($inner_slide_boxs);
});

console.log($inner_slide_boxs);


function prev(el) {

}

function next(el) {

}

/* --- main_visual end --- */