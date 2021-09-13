/* --- main_visual --- */

var $main_visual = $("#main_visual");
var $slide_bg = $main_visual.find(".slide_bg");
var $bg_boxs = $slide_bg.children("article");
var $inner_contents = $main_visual.find(".inner_contents");
// var $slide_pagination = document.querySelector(".slide_pagination");
var $slide_pagination = $inner_contents.find(".slide_pagination");
// var $slide_pagination_btn = document.querySelectorAll("li");
var $slide_pagination_btn = $slide_pagination.find("li");
var $inner_slide = $inner_contents.find(".inner_slide");
var $inner_slide_tit = $inner_slide.find(".slide_tit");
var $btn_prev = $inner_contents.find(".btn_prev");
var $btn_next = $inner_contents.find(".btn_next");
var len = $bg_boxs.length;
var enableClick = true;

// slide_pagination($slide_pagination_btn);

init($slide_bg);

function init(el) {
  el.css({
    width: 100 * "%",
    marginLeft: "-100%"
  });
  el.find("article").css({
    width: 100 / len + "%"
  });
  el.find("article").last().prependTo(el);
}


function slide_pagination(el) {
  el.on("click", function (e) {
    e.preventDefault();

    if (!$(this).hasClass("on")) {
      el.removeClass("on");
      $(this).addClass("on");
      acti(this);
    };
  });
}

// acti($slide_bg);

function acti(self) {
  var idx = $(self).index();

  $inner_slide_tit.removeClass("on");
  $inner_slide_tit.eq(idx).addClass("on");
}

$btn_prev.on("click", function (e) {
  e.preventDefault();

  if (enableClick) {
    setTimeout(function () {
      prev($slide_bg);
    }, 200);
    enableClick = false;
  }
  pagination_prev($slide_bg);
});

$btn_next.on("click", function (e) {
  e.preventDefault();

  if (enableClick) {
    setTimeout(function () {
      next($slide_bg);
    }, 200);
    enableClick = false;
  }
  pagination_next($slide_bg);
});

function prev(el) {
  el.stop().animate({
    marginLeft: "0%"
  }, 500, function () {
    el.css({
      marginLeft: "-100%"
    });
    el.find("article").last().prependTo(el);
    enableClick = true;
  });

}

function next(el) {
  el.stop().animate({
    marginLeft: "-200%"
  }, 500, function () {
    el.css({
      marginLeft: "-100%"
    });
    el.find("article").first().appendTo(el);
    enableClick = true;
  });
}

function pagination_prev(el) {
  let page_num = el.find("article").eq(0).attr("data-index"); // 500 이후 last().prependTo() 시작하기 때문에 그 전에 카운트시 eq(0) el 구하면 500 이후 eq(1) el임
  // console.log(page_num);
  for (let el of $slide_pagination_btn) {
    el.classList.remove("on");
  }
  $slide_pagination_btn[page_num - 1].classList.add("on");
}

function pagination_next(el) {
  let page_num = el.find("article").eq(2).attr("data-index"); // 500 이후 first().appendTo() 시작하기 때문에 그 전에 카운트시 eq(2) el 구하면 500 이후 eq(1) el임
  // console.log(page_num);
  for (let el of $slide_pagination_btn) {
    el.classList.remove("on");
  }
  $slide_pagination_btn[page_num - 1].classList.add("on");
}

// console.log($slide_bg.find("article").eq(2).attr("data-index"));

/* --- main_visual end --- */






// const menu = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const swiper = new Swiper("#wrap", {
//   loop: true,
//   slidesPerView: "auto", //슬라이더 사이즈 커스텀 사이즈로
//   centeredSlides: true, //슬라이더 가운데 배치
//   spaceBetween: 50, //슬라이더 간격조절
//   mousewheel: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev"
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     type: "bullets",
//     clickable: true,
//     renderBullet: function(index, className){
//       return `<span class="${className}">${menu[index]}</span>`
//     }
//   },
//   // effect: "coverflow", //effect 적용
//   // coverflowEffect: {
//   //   rotate: 50,
//   //   stretch: -100,
//   //   depth: 400,
//   //   slideShadows: false
//   // }
// });

// //Dom Caching
// const bgs = document.querySelectorAll(".bg li");
// const prev = document.querySelector(".swiper-button-prev");
// const next = document.querySelector(".swiper-button-next");
// const navi = document.querySelectorAll(".swiper-pagination span");

// next.addEventListener("click", activation);
// prev.addEventListener("click", activation);
// window.addEventListener("mousewheel", activation);

// swiper.on("slideChangeTransitionEnd", activation); //swiper 애니메이션 후 작동

// for(let el of navi){
//   el.addEventListener("click", e =>{ //navi의 el(li)클릭시
//     //특정클래스 확인하기 classList.contains()
//     //활성화된 li
//     const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");
//     if(isOn) return;
//     swiper.on("slideChangeTransitionEnd", activation); //비활성화 li 클릭시 함수 시작
//   })
// }

// function activation(){
//   let item = document.querySelector(".swiper-slide-active");
//   let i = item.getAttribute("data-swiper-slide-index");

//   // console.log(i);

//   for(let el of bgs){
//     el.classList.remove("on");
//   }
//   bgs[i].classList.add("on");
// }