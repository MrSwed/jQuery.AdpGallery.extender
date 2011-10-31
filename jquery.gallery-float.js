//if (typeof jQuery == "function") {
// jQuery.noConflict();
// var init ;
// (init = function($) {
 $(function(){
  var IE7 = ($.browser.msie && parseInt($.browser.version)<=7);
 /**/
/* Gallery - first release for http://surganova.su */
if ($('.gallery .list img').size()) {
var onScroll = function(e){
 if ($('.gallery .list img').size()<=12) return;
   var pyTop = window.pageYOffset || document.documentElement.scrollTop ;
   var o = $('.gallery .content-block');
   if (pyTop>500 && o.not(".fixed")) {
    o.removeClass("absolute").addClass("fixed").css({"top":0,"margin-left":IE7?"5px":"325px"});
    var als = $(".tagsBlock").offset()["top"] - $('.gallery .content-block').height();
    var tals = als - ($(".header").height()+$(".column-head").height());
//console.log(window.pageYOffset + " " +als + " " + tals + " left "+o.offset()["left"]);
    if (pyTop > als) {
     o.removeClass("fixed").addClass("absolute").css({"top":tals,"margin-left":IE7?"5px":"325px"});
    }
   } else // if (o.is(".fixed"))
    o.removeClass("absolute").removeClass("fixed").css({"top":0,"margin-left":0});

  };
//  $(window).scroll(onScroll);
//  $(window).bind("scrollstart,scrollstop,scroll",onScroll);
//  $(window).bind("scrollstop",onScroll);
  $(window).bind("scroll",onScroll);
//  $(window).bind("scrollstart",onScroll);
 /**/
 $('.gallery .list a:has(img)').unbind().click(function(e){
  e.preventDefault();
  var o = $(this),ohref = $(o).attr("href"),
      vo = $('.gallery .content-block .view'),
      io;
  io = $("ul",vo);
  if (!io.size()) {
   io = $('.gallery .list ul').clone();
   $("li",io).css({"display":"block","position":"absolute"}).hide();
   $(".img-border",io).css("width","auto");
   $("img",io).attr("class","").attr("src","");
   $("a",io).lightBox();
   io.appendTo(vo);
  };
  var df = function() {
   $("li:visible",io).fadeOut(500);
   var ia = $("li:has(a[href='"+ohref+"'])",io);
   ia.fadeIn(500,function(){
    // дурацкий сафари
     vo.animate({height:ia.height()},500);
     //$(window).scroll();
     onScroll();
     if (IE7) {
       $("img",io).each(imgBorder);
//       if (io.closest(".content-block").not(".fixed"))
//        io.closest(".content-block").addClass("absolute");
      }
    });
   if (ia.height()>300) vo.animate({height:ia.height()},500);
   $(".gallery .content-block .photoinfo").html($("a",ia).attr("title"));
  };
  if (!$("li:has(a[href='"+ohref+"']) img",io).attr("src"))
   $("li:has(a[href='"+ohref+"']) img",io).attr("src",ohref).load(df);
  else df();
 });
 $('.gallery .list a:has(img):first').click();
/**/
}
/**/


  
 });
// })(jQuery);
//}