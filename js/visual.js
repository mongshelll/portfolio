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
  speed: 400,
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
const inner_slide = document.querySelectorAll(".inner_slide article");
const prev = document.querySelector(".swiper-button-prev");
const next = document.querySelector(".swiper-button-next");
const navi = document.querySelectorAll(".swiper-pagination span");

next.addEventListener("click", activation);
prev.addEventListener("click", activation);
// window.addEventListener("mousewheel", activation);

swiper.on("slideChangeTransitionEnd", activation); //swiper 애니메이션 후 작동

for (let el of navi) {
  el.addEventListener("click", e => { //navi의 el(span)클릭시
    //특정클래스 확인하기 classList.contains()
    //활성화된 span
    const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");
    if (isOn) return;
    swiper.on("slideChangeTransitionEnd", activation); //비활성화 span 클릭시 함수 시작
  })
}

function activation() {
  let item = document.querySelector(".swiper-slide-active");
  let i = item.getAttribute("data-swiper-slide-index");

  // console.log(i);
  // setTimeout(function () {
  //   for (let el of inner_slide) {
  //     el.classList.remove("on");
  //   }
  //   inner_slide[i].classList.add("on");
  // }, 100)
  for (let el of inner_slide) {
    el.classList.remove("on");
  }
  inner_slide[i].classList.add("on");
}
