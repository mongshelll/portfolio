/* --- scroll move ---  */

const $navi_btns = $("#navi li");
const $main_boxs = $("section");
const $footer = $("footer");
const $main_last_box = $main_boxs.last();
let posArr = []; //0, 937, 1874, 2811, 3748, 4685, 5622
const enable = false;
const baseline = -300;


//처음 로딩시 해당박스의 세로 위치값을 구하는 함수 호출
setPos();

// console.log(posArr);

//브라우저 리사이즈시 다시 세로 위치값 갱신
$(window).on("resize", setPos);

//스크롤시 해당버튼 활성화
$(window).on("scroll", function () {
  var scroll = $(this).scrollTop();//내가 스크롤 한 거리
  navi_activation(scroll);
});

//버튼 클릭시 해당박스 위치로 자동으로 이동
$navi_btns.on("click", function (e) {
  e.preventDefault();

  var i = $(this).index();
  moveScroll(i);
});

//마우스휠을 위, 아래로 움직였을 때
$main_boxs.on("mousewheel", function (e) {
  // console.log(e.originalEvent.deltaY);
  //-100은 마우스휠을 올렸을 때
  //100은 마우스휠을 내렸을 때
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) { //마우스 휠을 올린다면
    if ($(this).index != 0) {//첫번째 박스가 아니라면
      var i = $(this).index() - 3; //visual 이전에 skipNavi, header, navi가 있음으로 3가지 제외
      moveScroll(i - 1); // i - 1 은 해당박스 전에 있는 박스의 세로 위치값
    }
    //첫번째 박스에서는 올라갈 필요없음
    //첫번째 박스 = 0
    //마지막 박스 = 변동가능 -> $main_boxs.length 이용
    //length = 7, 이용 할 값은 index(0부터 시작) 그러므로 length에서 -1을 함
  } else {//마우스 휠을 내린다면
    if ($(this).index != $main_boxs.length - 1) {
      var i = $(this).index() - 3;
      moveScroll(i + 1); // i + 1 은 해당박스 다음에 있는 박스의 세로 위치값
    }
  }
});

//마지막 section에서 mousewheel 내렸을때 동작하기
$main_last_box.on("mousewheel", function (e) {
  e.preventDefault();
  if (e.originalEvent.deltaY > 0) {
    moveScroll($main_boxs.length - 1);
  }
});

//footer에서 mousewheel 올렸을때 동작하기
$footer.on("mousewheel", function (e) {
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) {
    moveScroll($main_boxs.length - 2);
  }
});

//버튼 클릭이나 박스 스크롤시 해당 버튼이나 박스의 순번을 인수로 받아서 배열에 담긴
//해당 요소의 세로 위치값으로 이동하는 함수 정의
function moveScroll(index) {
  $("html, body").stop().animate({ //.stop() 큐가 쌓이면 이전꺼 무시 마지막만 실행
    scrollTop: posArr[index]
  }, 500);
}

//현재 스크롤 위치값을 인수로 받아서 스크롤값과 박스의 위치를 비교해서 
//해당하는 버튼만 활성화 하는 함수정의
function navi_activation(scroll) {
  for (var i = 0; i < $main_boxs.length; i++) {
    if (scroll >= posArr[i] + baseline) { //baseline 추가해서 미리 적용하기
      $navi_btns.children("a").removeClass("on");
      $navi_btns.eq(i).children("a").addClass("on");
      $main_boxs.removeClass("on");
      $main_boxs.eq(i).addClass("on");
    }
  }
}

//posArr 배열에 각 박스의 세로 위치값 저장 함수 정의
function setPos() {
  posArr = []; // 초기화값, 리사이즈시 해당 배열을 비워 새로운 값 4개만 받게 함 
  for (var i = 0; i < $main_boxs.length; i++) {
    posArr.push($main_boxs.eq(i).offset().top);
  }
  // console.log(posArr);
}

/* --- scroll move End ---  */

/* ---  main visual --- */


const menu = ["01", "02", "03", "04"];

const swiper = new Swiper("#main_visual", {
  loop: true,
  slidesPerView: "auto", //슬라이더 사이즈 커스텀 사이즈로
  centeredSlides: true, //슬라이더 가운데 배치
  spaceBetween: 0, //슬라이더 간격조절
  // mousewheel: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${menu[index]}</span>`
    }
  },
  speed: 1000,
  simulateTouch: false, //drag false
  // grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-20%", 0, -1]
    },
    next: {
      translate: ["100%", 0, 0]
    }
  }
});

//Dom Caching
const inner_tit_slide = document.querySelectorAll(".inner_tit_slide article");
const inner_pic_slide = document.querySelectorAll(".inner_pic_slide article");
const prev = document.querySelector(".swiper-button-prev");
const next = document.querySelector(".swiper-button-next");
const navi = document.querySelectorAll(".swiper-pagination span");

next.addEventListener("click", activation);
prev.addEventListener("click", activation);
// window.addEventListener("mousewheel", activation); //마우스 휠 적용

swiper.on("slideChangeTransitionStart", activation); //swiper 애니메이션 시작시 작동
// swiper.on("slideChangeTransitionEnd", activation); //swiper 애니메이션 후 작동

for (let el of navi) {
  // el.addEventListener("click", function (e) {
  //   const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");
  //   if (isOn) return;
  //   swiper.on("slideChangeTransitionStart", activation);
  // });

  el.addEventListener("click", e => { //navi의 el(span)클릭시
    //특정클래스 확인하기 classList.contains()
    //활성화된 span
    const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");
    if (isOn) return;
    swiper.on("slideChangeTransitionStart", activation); //비활성화 span 클릭시 함수 시작
  })
}

function activation() {
  let item = document.querySelector(".swiper-slide-active");
  let i = item.getAttribute("data-swiper-slide-index");

  for (let el of inner_tit_slide) {
    el.classList.remove("on");
  }
  inner_tit_slide[i].classList.add("on");

  for (let el of inner_pic_slide) {
    el.classList.remove("on");
  }
  inner_pic_slide[i].classList.add("on");
}

/* ---  main visual End--- */

/* --- visual2 hover 조정 --- */

const $box_content1 = $("#box_content1");
const $pic_boxs = $box_content1.find(".pic_box div");
hasOn($box_content1);
function hasOn(self) {
  const isOn = $(self).hasClass("on");

  if (!isOn) {
    setTimeout(function () {
      $pic_boxs.css({
        transitionDelay: "0s"
      })
    }, 2000);
  }
}

/* --- visual2 hover 조정 End --- */


/* --- slider_content --- */

const $left = $(".wrap .left");
const $brand_bg = $left.find(".brand_bg");
const $brand_bg_boxs = $brand_bg.find("article");
const $right = $(".wrap .right");
const $brand_slide = $right.find(".brand_slide");
const $brand_slide_boxs = $brand_slide.find("article");
let len = $brand_slide_boxs.length;

const $brand_prev = $left.find(".btn_prev");
const $brand_next = $left.find(".btn_next");
const tits = document.querySelectorAll(".brand_inner_con li");
const bgs = document.querySelectorAll(".brand_bg article");
const page_count = document.querySelector(".current_num");

init($brand_slide);

$brand_prev.on("click", function (e) {
  e.preventDefault();
  if (enableClick) {
    brand_prev($brand_slide);
    brand_activation(bgs);
    brand_activation(tits);
    count_num()
    enableClick = false;
  };
});

$brand_next.on("click", function (e) {
  e.preventDefault();
  if (enableClick) {
    brand_next($brand_slide);
    brand_activation(bgs);
    brand_activation(tits);
    count_num()
    enableClick = false;
  };
});

function init(el) {
  el.css({
    marginLeft: -100 / len + "%"
  });
  el.find("article").css({
    width: 100 / len + "%"
  });
  el.find("article").last().prependTo(el);
};

function brand_prev(el) {
  el.children().removeClass("on");
  el.children().eq(0).addClass("on");
  el.stop().animate({
    marginLeft: "0%"
  }, 300, function () {
    el.css({
      marginLeft: "-20%"
    });
    el.find("article").last().prependTo(el);
    enableClick = true;
  });
};

function brand_next(el) {
  el.children().removeClass("on");
  el.children().eq(2).addClass("on");
  el.stop().animate({
    marginLeft: "-40%"
  }, 300, function () {
    el.css({
      marginLeft: "-20%"
    });
    el.find("article").first().appendTo(el);
    enableClick = true;
  });
};

function brand_activation(acti) {
  let acti_terget = document.querySelector(".brand_slide article.on");
  let i = acti_terget.getAttribute("data-index");

  for (let el of acti) {
    el.classList.remove("on");
  }
  acti[i].classList.add("on");
}

function count_num() {
  let acti_terget = document.querySelector(".brand_slide article.on");
  let acti_index = acti_terget.getAttribute("data-index");

  page_count.innerHTML = ++acti_index;
}


/* --- slider_content End --- */




/* --- box_content3 slide --- */
const $box_con3_slide_wrap = $(".box_con3_slide_wrap");
const $box_con3_pagination = $(".box_con3_pagination");
const $box_con3_btns = $box_con3_pagination.find("li");


$box_con3_btns.on("click", function (e) {
  e.preventDefault();

  let i = $(this).index();
  move_slide(i);

  for (let el of $box_con3_btns) {
    el.classList.remove("on");
  }
  $box_con3_btns[i].classList.add("on");
});

function move_slide(index) {
  $box_con3_slide_wrap.css({
    transform: "translateX(" + -25 * index + "%)"
  });
}

/* --- box_content3 slide End --- */