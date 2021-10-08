//로딩완료시 유튜브 데이터 호출
$.ajax({
  url: "https://www.googleapis.com/youtube/v3/playlistItems",
  dataType: "jsonp",
  data: {
    part: "snippet",
    key: "AIzaSyD4pM0SFlzeHbYBc1XWSzrRBEkQQzO9wg8",
    maxResults: 7,
    playlistId: "PLoIl8ul_XWuWPrTDKqRESrEkLPraZH_79"
  }
})
  .success(function (data) {
    console.log(data.items);
    var items = data.items;
    //반복해서 만들 DOM문자열이 저장될 빈 문자열 전역변수 생성
    var result = "";

    //데이터의 갯수만큼 반복
    $(items).each(function (index, data) {
      // console.log(data);

      var title = data.snippet.title;
      if (title.length > 30) {
        title = title.substr(0, 30) + "...";
      }

      var con = data.snippet.description;
      if (con.length > 100) {
        con = con.substr(0, 100) + "...";
      }

      var date = data.snippet.publishedAt.split("T")[0];
      var imgSrc = data.snippet.thumbnails.high.url;
      var vidId = data.snippet.resourceId.videoId;

      //빈 문자열에 계속해서 아래 문자코드를 중첩해서 더함
      //es6문법
      result += `
          <article>
              <a href=${vidId} class="pic">
                  <img src=${imgSrc}>
              </a>
              <div class="con">
                  <h2>${title}</h2>
                  <p>${con}</p>
                  <span>${date}</span>
              </div>
          </article>
      `;
    });

    //반복되며 중첩된 DOM생성 문자결과값을 .vidList에 삽입해서 DOM생성
    $("#vidGallery").append(result);
  })
  .error(function (err) {
    console.error(err);
  });


$("body").on("click", "#vidGallery article a", function (e) {
  e.preventDefault();
  var vidSrc = $(this).parent().find(".pic").attr("href");

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
          zIndex: 2
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
                  src: "https://www.youtube.com/embed/" + vidSrc,
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
});

$("body").on("click", ".pop_youtube .close", function () {
  $(".pop_youtube").fadeOut(500, function () {
    $(this).remove();
  });
  $("body").css({
    overflowY: "visible"
  });
})