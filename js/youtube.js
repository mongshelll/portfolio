//AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes  - youtube key
//PLoIl8ul_XWuWPrTDKqRESrEkLPraZH_79  - youtube key

//매개변수 :ㅣ parameter 함수로 값이 전달되기 위한 통로이름
//인수 : argument 매개변수 실제로 전달되는 값

//즉시 실행함수 : 
(function ($) {
  //디폴트 옵션값
  $.defaults = {
    // key : "AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes",
    key: "AIzaSyD4pM0SFlzeHbYBc1XWSzrRBEkQQzO9wg8",
    playlist: "PLoIl8ul_XWuWPrTDKqRESrEkLPraZH_79",
    count: 4
  }


  //제이쿼리 객체에 플러그인 등록 코드
  $.fn.myYoutube = function (option) {
    //기본 옵션값이랑 사용자가 지정한 옵션 객체 합침
    var result_opt = $.extend({}, $.defaults, option);

    if (result_opt.key == undefined || result_opt.playlist == undefined) {
      console.error("key와 playlist는 필수입력 사항입니다.");
      //location.href = "https://www.플러그인문서.html";
    }

    //인스턴스 복사 this -> 선택자, result_opt -> 합쳐진 옵션 객체
    new MyYoutube(this, result_opt); //this는 선택자
    return this;
  }

  function MyYoutube(el, option) {
    this.init(el, option);
    this.bindingEvent();
  }

  MyYoutube.prototype.init = function (el, opt) {
    this.frame = el; //$("#vidGallery")
    this.key = opt.key;
    this.playlist = opt.playlist;
    this.count = opt.count;
  }

  MyYoutube.prototype.bindingEvent = function () {
    this.CallData();

    $("body").on("click", "#vidGallery article a", function (e) {
      e.preventDefault();
      var vidId = $(e.currentTarget).attr("href"); //this로 하면 vidId값을 구할 수 없음
      this.createPop(vidId);
    }.bind(this));

    $("body").on("click", ".pop_youtube .close", function (e) {
      e.preventDefault();

      this.removePop();
    }.bind(this));
  }

  MyYoutube.prototype.CallData = function () {
    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      dataType: "jsonp",
      data: {
        part: "snippet",
        key: this.key,
        playlistId: this.playlist,
        maxResults: this.count
      }
    })
      .success(function (data) {
        var items = data.items;
        this.createList(items);
        // console.log(items);
      }.bind(this))
      .error(function (err) {
        console.error(err);
      })
  }

  MyYoutube.prototype.createList = function (items) {
    $(items).each(function (index, data) {
      var tit = data.snippet.title;
      if (tit.length > 20) tit = tit.substr(0, 20) + "...";
      var txt = data.snippet.description;
      if (txt.length > 170) txt = txt.substr(0, 170) + "...";
      var date = data.snippet.publishedAt.split("T")[0];
      var imgSrc = data.snippet.thumbnails.high.url;
      var vidId = data.snippet.resourceId.videoId;

      this.frame
        .append(
          $("<article>")
            .append(
              $("<a class='pic'>")
                .attr({
                  href: vidId
                })
                .css({
                  backgroundImage: "url(" + imgSrc + ")"
                }),
              $("<h2>").text(tit),
              $("<p>").text(txt),
              $("<span>").text(date)
            )
        )
    }.bind(this));
  }

  MyYoutube.prototype.createPop = function (vidId) {
    $("body")
      .css({ overflowY: "hidden" })
      .append(
        $("<aside class='pop_youtube'>")
          .css({
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "none",
            padding: 100,
            boxSizing: "border-box",
            zIndex: 1
          })
          .append(
            $("<img src='img/youtube_loading.gif'>")
              .css({
                width: 80,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              })
          )
          .append(
            $("<div class='con'>")
              .css({
                width: "100%",
                height: "100%",
                position: "relative",
                display: "none"
              })
              .append(
                $("<iframe>")
                  .attr({
                    src: "https://www.youtube.com/embed/" + vidId,
                    width: "100%",
                    height: "100%",
                    frameborder: 0,
                    allowfullscreen: true
                  })
              )
          )
          .append(
            $("<a href='#' class='close'>")
              .text("Close")
              .css({
                position: "absolute",
                top: 60,
                right: 100,
                color: "#fff"
              })
          ).fadeIn()
      )
    setTimeout(function () {
      $(".pop_youtube .con").fadeIn(500, function () {
        $(".pop_youtube > img").remove();
      })
    }, 1000)
  }

  MyYoutube.prototype.removePop = function () {
    $(".pop_youtube").fadeOut(500, function () {
      $(this).remove();
    });
    $("body").css({
      overflowY: "visible"
    });
  }

})(jQuery);


/*
.bind(this) : 생성자 함수에서 인스턴스 this값을 적용해야될때 this값이
              다른 값을 참조하는 경우 강제로 인스턴스 this로 값을 고정하기 위함

1. 이벤트문 연결
2. each문 연결
3. setTimeout() 연결
4. success() 연결
*/