//if (typeof jQuery == "function") {
// jQuery.noConflict();
// var init ;
// (init = function($) {
 $(function(){
/**/
/* Gallery - release for http://ramonaite.ru */
		(function () {
			var g = $(".gallery"),
				img = $("img", g),
				l = $(".list", g),
				cb = $(".content-block", g),
				cv = $(".view", cb),
				pi = $(".photoinfo", cb);
			if (img.size()) {
				if (!l.size()) {
//     l = g.wrapInner("<div class='list'></div>").find(".list");
					l=$("<div class='list'></div>");
					$("a",g).appendTo(l);
					g.html("");
					l.appendTo(g);
					$("img", g).attr({"style": null, "width": null, "height": null});
				}
				if (!cb.size()) {
					cb = $("<div class='content-block'></div>").appendTo(g);
					cb.append("<div class='view'></div>");
					cb.append("<div class='photoinfo'></div>");
					cv = $(".view", cb);
					pi = $(".photoinfo", cb);
					g.append("<br class='clear' />");
				}
				var onScroll = function (e) {
//     if ( lowY < g.offset()["top"]+g.height()) lowY = g.offset()["top"] + g.height();
//     if (img.size() <= 5) return;
					lowY = $(".stroke").offset()["top"] + $(".stroke").height()
					var pyTop = window.pageYOffset || document.documentElement.scrollTop;
					if (pyTop > l.offset()["top"] && cb.not(".fixed")) {
						cb.removeClass("absolute").addClass("fixed").css({"top": 0});
//      var als = $(".footer").offset()["top"] - cb.height() - 60;
						var als = lowY - cb.height();
						var tals = als - g.offset()["top"];
//      console.log(window.pageYOffset + " " + als + " " + tals + " left " + cb.offset()["left"] +
//          " lowY "+ lowY + " footer " + $(".footer").offset()["top"]
//      );
						if (pyTop > als) {
							cb.removeClass("fixed").addClass("absolute").css({"top": tals});
						}
					} else // if (cb.is(".fixed"))
						cb.removeClass("absolute").removeClass("fixed").css({"top": 0});

				};
				$(window).bind("scroll", onScroll);
				/**/
				$('a:has(img)', g).unbind().click(function (e) {
					e.preventDefault();
					var o = $(this), ohref = $(o).attr("href"), vo = $('.content-block .view',g), io = $(".list", vo);
					if (!io.size()) {
						io = $('.list', g).clone();
						$("a", io).css({"display": "block", "position": "absolute"}).hide();
//      $("img", io).attr("class", "").attr("src", "");
						$("a", io).attr("rel", "gallery").fancybox({'padding': 0});
						io.appendTo(vo);
					}
					var df = function () {
						$("a:visible", io).fadeOut(500);
						var ia = $("a[href='" + ohref + "']", io);
						ia.fadeIn(500, function () {
							// РґСѓСЂР°С†РєРёР№ СЃР°С„Р°СЂРё
							vo.animate({height: ia.fullHeight()}, 500);
							//$(window).scroll();
							onScroll();
						});
						if (ia.fullHeight() > 300) vo.animate({height: ia.fullHeight()}, 500);
						pi.html($(ia).attr("title") || $("img",ia).attr("title") || $("img",ia).attr("alt") || $("img",ia).attr("longdescr") || "");
					};
					if (!$("a[href='" + ohref + "'] img", io).attr("src"))
						$("a[href='" + ohref + "'] img", io).attr("src", ohref).load(df); else df();
				});
				$('a:has(img):first', g).click();
				/**/
			}

		})();
		/**/


		
 });
// })(jQuery);
//}