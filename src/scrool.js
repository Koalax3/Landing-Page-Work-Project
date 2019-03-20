import $ from "jquery";

function scroolAnchor() {
    $("a[href*='#']:not([href='#'])").click(function() {
        if (
            window.location.hostname == this.hostname
            && this.pathname.replace(/^\//,"") == window.location.pathname.replace(/^\//,"")
        ) {
            var anchor = $(this.hash);
            anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) +"]");
            if ( anchor.length ) {
                $("html, body").animate( { scrollTop: anchor.offset().top }, 1500);
            }
        }
    });
  }

function scroolHiden(){
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        console.log(document.querySelector(".App-header"));
        document.querySelector(".App-header").style.top = "0";
      } else {
        document.querySelector(".App-header").style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    }
}

export {scroolAnchor, scroolHiden};