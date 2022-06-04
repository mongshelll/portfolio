//자주 수정될 정보값들 전역변수로 설정
// var url_interest = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
var url_user = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
var key = "3b218370762e7a7645e6e7ccbac826b2";
var num = 15;
var $gallery = "#flickr_gallery";
var searchBtn = $("#search button");
var searchInput = $("#search input[type=text]");

//로딩이미지 생성
$("body").prepend(
	$("<img class='loading on'>").attr({
		src: "img/loading.gif"
	})
);

//갤러리 호출
getFlickr({
	type: "user"
});

//search
//엔터키 사용 (구글에서 keycode.info 들어가서 키 번호 확인하기)
$(window).on("keypress", function (e) {
	if (e.keyCode === 13) {
		search();
	}
})

searchBtn.on("click", function (e) {
	e.preventDefault();
	search();
});


$("body").on("click", ".list li a", function (e) {
	e.preventDefault();
	var imgSrc = $(this).attr("href");
	createPop(imgSrc);
});

$("body").on("click", ".pop span", function () {
	$(".pop").fadeOut(500, function () {
		$(".pop").remove();
	});
});


function getFlickr(opt) {
	//type에 따라 ajax호출구문 변경
	var result_opt;

	// //type이 interest일때 ajax전용 옵션을 result_opt에 저장
	// if (opt.type == "interest") {
	//   result_opt = {
	//     url: url,
	//     dataType: "json",
	//     data: {
	//       api_key: key,
	//       per_page: num,
	//       format: "json",
	//       nojsoncallback: 1,
	//       tagmode: "any",
	//       privacy_filter: 5
	//     }
	//   }
	// }
	//type이 search일때 ajax전용 옵션을 result_opt에 저장
	if (opt.type == "search") {
		result_opt = {
			url: url_search,
			dataType: "json",
			data: {
				api_key: key,
				per_page: num,
				format: "json",
				nojsoncallback: 1,
				tagmode: "any",
				privacy_filter: 5,
				tags: opt.tag
			}
		}
	}
	//type이 user일떄 ajax전용 옵션을 result_opt에 저장
	if (opt.type == "user") {
		result_opt = {
			url: url_user,
			dataType: "json",
			data: {
				api_key: key,
				per_page: num,
				format: "json",
				nojsoncallback: 1,
				tagmode: "any",
				privacy_filter: 5,
				user_id: "192921501@N03"
			}
		}
	}

	//ajax메서드 호출시 외부의 result_opt객체값 인수로 전달
	$.ajax(result_opt)
		.success(function (data) {
			var items = data.photos.photo;
			createList(items);
		})
		.error(function (err) {
			console.log("데이터를 불러오는데 실패 했습니다.");
		})
}

function createList(items) {
	$($gallery).empty();
	$($gallery).append("<ul class='list'>");
	$($gallery).children("ul").append("<li class='item-sizer'>");
	//데이터의 갯수만큼 반복을 돌면서 img를 포함한 li DOM 생성
	$(items).each(function (index, data) {
		var tit = data.title;
		if (tit == "") tit = "There is no Title here.";
		$($gallery).children("ul").append(
			$("<li class='item'>").append(
				$("<div class='inner'>")
					.append(
						$("<a>").attr({
							href: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_b.jpg"
						}).append(
							$("<img>").attr({
								src: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_w.jpg",
								onerror: "javascript:this.parentNode.parentNode.parentNode.style='display:none;'"
							})
						)
					)
					.append(
						$("<p>").text(tit)
					)
					.append(
						$("<div class='profile'>")
							.append(
								$("<img>").attr({
									src: "https://www.flickr.com/buddyicons/" + data.owner + ".jpg"
								}),
								$("<span>").text(data.owner)
							)
					)
			)
		)
	});

	isoLayout();
}

function isoLayout() {
	//DOM생성 이후 img DOM 요소만 찾아서 유사배열로 저장
	var imgs = $($gallery).find("img");
	var count = 0;

	//모든 imgDOM을 반복을 돌림
	$(imgs).each(function (index, data) {

		//해당 DOM에 소스이미지가 완료가 되면 실행되는 onload이벤트 실행
		data.onload = function () {

			//각 소스이미지가 로딩 완료되면 카운트값이 1씩 증가
			count++;

			//카운트 값이 전체 이미지 갯수와 동일해지면(모든 소스이미지가 로딩이 완료되면)
			//그때 isoLayout 함수 호출
			if (count === imgs.length) {
				new Isotope($gallery, {
					itemSelector: ".item",
					columnWidth: "#flickr_gallery ul li",
					transitionDuration: "0.8s",
					masonry: {
						columnWidth: ".item-sizer"
					}
				});

				$($gallery).addClass("on");
				$(".loading").removeClass("on");
			};
		};
	});
}

function search() {
	var tags = searchInput.val();
	if (tags == "") {
		alert("검색어를 입력해주세요.");
		return;
	}

	$("#flickr_gallery").removeClass("on");
	$(".loading").addClass("on");

	getFlickr({
		type: "search",
		tag: tags
	});
}

function createPop(imgSrc) {
	$("body").append(
		$("<aside class='pop'>")
			.css({
				width: '100%',
				height: "100%",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 10,
				boxSizing: "border-box",
				padding: "3vw",
				background: "rgba(0,0,0,0.9)",
				display: "none"
			})
			.append(
				$("<img>")
					.attr({
						src: imgSrc
					})
					.css({
						width: "100%",
						height: "100%",
						objectFit: "contain"
					}),
				$("<span>").text("close").css({
					cursor: "pointer",
					color: "#fff",
					position: "absolute",
					top: 20,
					right: 20
				})
			).fadeIn()
	)
}