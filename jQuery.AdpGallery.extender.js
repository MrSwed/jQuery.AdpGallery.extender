/*
	* @name jQuery Adaptive Gallery
	* @author MrSwed https://github.com/MrSwed
	*
	* Copyright 2011-2015 @ webmaster@sdcollection.com
	* Released under the MIT license.
	* 
	*/

(function($) {
	$.fn.extend({
	"AdpGallery" :  function(p) {
		return $(this).each(function(){
			var g = $(this),
			 img = $("img", g),
			 l = $(".list", g),
			 cb = $(".content-block", g),
			 cv = $(".view", cb),
			 pi = $(".description", cb),
				io =  $(".list",cv);
			if (!img.size() || this.AdpGallery) return $(this);
			var _t = this; 
			var $p = {
				"defaults":{
//					"extender" : ["fancybox",{'padding': 0}],
					"extender" : "fancybox",
					"item"     : "a",
					"urlattr"  : "href",
					"animate" : {"speed":500}
				}
			};
			$p.args = p;
			$p.p = $.extend({},$p.defaults,p);
			if (typeof $p.p.extender != "object" ) $p.p.extender = [$p.p.extender];
			var onScroll = function(e) {
				//     if ( lowY < g.offset()["top"]+g.height()) lowY = g.offset()["top"] + g.height();
				//     if (img.size() <= 5) return;
				lowY = g.offset()["top"]+g.height();
				var pyTop=window.pageYOffset||document.documentElement.scrollTop;
				if (pyTop>l.offset()["top"]&&cb.not(".fixed")) {
					cb.removeClass("absolute").addClass("fixed").css({"top": 0});
					//      var als = $(".footer").offset()["top"] - cb.height() - 60;
					var als=lowY-cb.height();
					var tals=als-g.offset()["top"];
					//      console.log(window.pageYOffset + " " + als + " " + tals + " left " + cb.offset()["left"] +
					//          " lowY "+ lowY + " footer " + $(".footer").offset()["top"]
					//      );
					if (pyTop>als) {
						cb.removeClass("fixed").addClass("absolute").css({"top": tals});
					}
				} else // if (cb.is(".fixed"))
					cb.removeClass("absolute").removeClass("fixed").css({"top": 0});
			};
			var df = function(ohref) {
				var vo=$('.content-block .view',g),
						io=$(".list",vo);
				$($p.p.item,io).filter(":visible").fadeOut($p.p.animate.speed);
				var ia=$($p.p.item,io).filter("["+$p.p.urlattr+"='"+ohref+"']");
				ia.fadeIn($p.p.animate.speed,function() {
					// дурацкий сафари
					vo.animate({height: ia.fullHeight()},$p.p.animate.speed);
					onScroll();
				});
				if (ia.fullHeight()>300) vo.animate({height: ia.fullHeight()},$p.p.animate.speed);
				pi.html($(ia).attr("title")||$("img",ia).attr("title")||$("img",ia).attr("alt")||$("img",ia).attr("longdescr")||
						"");
			};
			var viewImg = function(){
				var o=$(this),
						ohref=$(o).attr("href"),
						vo=$('.content-block .view',g),
						io=$(".list",vo);
				if (!$("a["+$p.p.urlattr+"='"+ohref+"'] img",io).attr("src"))
					$("a["+$p.p.urlattr+"='"+ohref+"'] img",io).attr("src",ohref).load(function(){df(ohref)}); 
				else df(ohref);

			};
			$p.init = function (){
					if (!l.size()) {
						l=$("<div class='list'></div>");
						$($p.p.item,g).appendTo(l);
						g.html("");
						l.appendTo(g);
						$("img",l).attr({"style": null,"width": null,"height": null});
					}
					if (!cb.size()) {
						cb=$("<div class='content-block'></div>").appendTo(g);
						cb.append("<div class='view'></div>");
						cb.append("<div class='photoinfo'></div>");
						cv = $(".view",cb);
						pi = $(".description",cb);
					}
					if (!io.size()) {
						io = l.clone();
						$("a",io).css({"display": "block","position": "absolute"}).hide();
						io.appendTo(cv);
						typeof $.fn[$p.p["extender"][0]] == "function" && $("a",io).attr("rel","gallery") && 
						$.fn[$p.p["extender"][0]].call($($p.p.item,io).filter("[rel='gallery']"),($p.p["extender"][1] || null));
					}
					$($p.p.item,l).unbind().on("click",function(e) {
						e.preventDefault();
						viewImg.call($(this));
					});
					viewImg.call($($p.p.item,g).filter(":first"));
					_t.AdpGallery = $p;
					$(window).bind("scroll",onScroll);
				};
			$p.init();
			return $(this);
		});
	}
	});

})(jQuery);