$(document).ready(function () {
  //For slide animation.
  var slided = false;

  //Searchbutton function.
  $("#searchButton").click(function () {
    //Empty data after search
    $("#result").empty();

    //List of results
    var list = [];

    if ($("#searchInput").val() === "") {
      window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
    } else {
      //Query data from wiki api, storing in list array
      var query = $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
          action: "query",
          list: "search",
          srsearch: $("#searchInput").val(),
          format: "json"
        },
        dataType: "jsonp",
        success: function (x) {
          list = x.query.search;
        }
      });

      //If ajax call is done, show result.
      query.done(function () {
        for (var i = 0; i < 10; i++) {
          //Making articles
          var wiki = "https://en.wikipedia.org/wiki/";
          var titleResult = list[i].title;
          var hrefResult = titleResult.replace(/\s/g, "_");
          var snippetResult = list[i].snippet;
          //Adding articles
          $("#result").append(
            `<article class='search__result__card'>
              <div class='card result__card'>
                <a class='card__text' href=` +
            wiki +
            hrefResult +
            `>
                <div class='card-block'>
                  <p class='card-title text-center'>` +
            titleResult +
            `</p>
                 <p class='card-text'>` +
            snippetResult +
            `</p>
                 </a>
               </div>
             </div>
           </article>`
          );
        }
      });
      $("#result").delay(400).fadeIn(400);
    }

    //If not slided animate;
    if (!slided) {
      $(".search__input").animate({ top: "-=10vh" });
      $(".wrapper").css("height","180vh");
      slided = true;
    }
  });

  //Clear button
  $("#clearBtn").click(function () {
    if ($("#searchInput").val() !== "") {
      $("#searchInput").val("");
      $("#result").delay(400).fadeOut(400);
      //IF slided then animate
      if (slided) {
        //After result fadeOut
        $(".search__input").delay(800).animate({ top: "+=10vh" });
        $(".wrapper").css("height","100vh");
        slided = false;
      }
    }
  });
});