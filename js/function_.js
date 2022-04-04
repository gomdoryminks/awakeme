/**
 * @author minks
 */

var timer = null;
var resizeFlag = false;

$(function() {
    //리사이즈
    $(window).resize(function() {
        //레이어 팝업 리사이즈
        if ($(".popup_layer_area:visible").length > 0) {
            var layer_id = $(".popup_layer_area:visible").attr("id");
            openLayer(layer_id);
        }
        
        //롤링 슬라이드 리사이즈
        clearTimeout(timer);
        timer = setTimeout(rollingSlideResize, 300);
        
        /*var win_width = $(window).width() + 17;
        
        if (win_width > 1080) {
            if ($(".main_con_sub_list").length > 0) {
                rollingSlide("main_con_sub_list", "resize");
            } else if ($(".introduce_con_sub_list").length > 0) {
                rollingSlide("introduce_con_sub_list", "resize");
            }
        } else if (win_width > 900) {
            if ($(".main_con_sub_list").length > 0) {
                rollingSlide("main_con_sub_list", "resize");
            } else if ($(".introduce_con_list").length > 0) {
                rollingSlide("introduce_con_list", "resize");
            }
        } else {
            if ($(".main_con_list").length > 0) {
                rollingSlide("main_con_list", "resize");
            } else if ($(".introduce_con_sub_list").length > 0) {
                rollingSlide("introduce_con_sub_list", "resize");
            }
        }*/
    });    
    
    //슬라이드 메뉴 보이기&숨기기
	$('header.header .header_menu_btn').click(function() {
		if ($('header.header .header_menu').css("display") == "none") {
			$('header.header .header_menu').css('display','block');
			$('header.header .header_menu').css('z-index','999');
			$('header.header .header_box').css('left','0px');
			$('header.header .header_menu_btn .line1').addClass('line11');
			$('header.header .header_menu_btn .line2').addClass('line22');
			$('header.header .header_menu_btn .line3').addClass('line33');
			//$('body').css('overflow','hidden');
		} else {
			$('header.header .header_menu').css('display','none');
			$('header.header .header_menu').css('z-index','-1');
			$('header.header .header_box').css('left','-300px');
			$('header.header .header_menu_btn .line1').removeClass('line11');
			$('header.header .header_menu_btn .line2').removeClass('line22');
			$('header.header .header_menu_btn .line3').removeClass('line33');
			//$('body').css('overflow','scroll');
		}
	});
    
    //공유 체크박스 체크시 버튼 활성화
    $(".inquiry_area .share_chk_area input[type='checkbox']").click(function() {
        if ($(this).is(":checked") == true) {
            $(".inquiry_area .share_info_area .share_btn").attr("disabled",false);
        } else {
            $(".inquiry_area .share_info_area .share_btn").attr("disabled",true);
        }
    });
    
    //공유 셀렉트박스 보이기&숨기기
    $(".inquiry_area .share_info_area .share_select").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(".inquiry_area .share_info_area .share_select_list").stop(true,true).slideUp(200);
        } else {
            $(this).addClass("on");
            $(".inquiry_area .share_info_area .share_select_list").stop(true,true).slideDown(200);
        }
    });
    
    //공유 셀렉트박스 선택
    $(".inquiry_area .share_info_area .share_select_list>li").not(".tit").bind("click", function() {
        var data_val = $(this).attr("data-val");
        $(".inquiry_area .share_info_area .share_select input[type='hidden']").val(data_val);
        $(".inquiry_area .share_info_area .share_select .share_select_tit").text(data_val);
        $(".inquiry_area .share_info_area .share_select_list>li").not(".tit").removeClass("active");
        $(this).addClass("active");
        $(".inquiry_area .share_info_area .share_select").removeClass("on");
        $(".inquiry_area .share_info_area .share_select_list").stop(true,true).slideUp(200);
    });
    
    if ($(".inquiry_area .share_info_area .share_select_list>li.active").length > 0) {
        var li_index = $(".inquiry_area .share_info_area .share_select_list>li.active").index();
        $(".inquiry_area .share_info_area .share_select_list>li").eq(li_index).trigger("click");
    } else {
        $(".inquiry_area .share_info_area .share_select_list>li").eq(1).trigger("click");
    }
    
    //레이어 팝업 닫기
    $(".popup_layer_mask").click(function() {
        $(this).closest(".popup_layer_area").css("display","none");
    });
    
    //롤링 슬라이드 호출
    var win_width = $(window).width() + 17;
    var ul_selector = null;
    
    if (win_width > 1080) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
        	ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".introduce_slide_area_two .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_two .introduce_con_sub_list";
        }
    } else if (win_width > 900) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
        	ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".introduce_slide_area_one .introduce_con_list").length > 0) {
            ul_selector = ".introduce_slide_area_one .introduce_con_list";
        }
    } else {
        if ($(".main_slide_area_mobile .main_con_list").length > 0) {
        	ul_selector = ".main_slide_area_mobile .main_con_list";
        } else if ($(".introduce_slide_area_three .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_three .introduce_con_sub_list";
        }
    }
    
    if (ul_selector != null) {
    	$(ul_selector).each(function() {
    		var video = $(this).children("li").eq(0).find("video").get(0);
    		
    		if (video != null && video.addEventListener) {
    			video.addEventListener("ended", function() {
    				if (!resizeFlag) rollingSlide(video, "exe");
    			}, false);
    		}
    	});
    }
    
    /*if (win_width > 1080) {
        if ($(".main_con_sub_list").length > 0) {
            inter = setInterval(function() { rollingSlide("main_con_sub_list", "run"); }, 4000);
        } else if ($(".introduce_con_sub_list").length > 0) {
            inter = setInterval(function() { rollingSlide("introduce_con_sub_list", "run"); }, 4000);
        }
    } else if (win_width > 900) {
        if ($(".main_con_sub_list").length > 0) {
            inter = setInterval(function() { rollingSlide("main_con_sub_list", "run"); }, 4000);
        } else if ($(".introduce_con_list").length > 0) {
            inter = setInterval(function() { rollingSlide("introduce_con_list", "run"); }, 4000);
        }
    } else {
        if ($(".main_con_list").length > 0) {
            inter = setInterval(function() { rollingSlide("main_con_list", "run"); }, 4000);
        } else if ($(".introduce_con_sub_list").length > 0) {
            inter = setInterval(function() { rollingSlide("introduce_con_sub_list", "run"); }, 4000);
        }
    }*/
});

//레이어 팝업 열기
function openLayer(layer_id) {
    $("#" + layer_id).css("display","block").css("opacity","0");
    $("#" + layer_id).children(".popup_layer_box").children().children(".popup_layer_info").css("height","auto");
    
    var win_height = $(window).height();
    var layer_header_height = $("#" + layer_id).children(".popup_layer_box").children().children(".popup_layer_header").height();
    var layer_content_height = $("#" + layer_id).children(".popup_layer_box").children().children(".popup_layer_info").height();
    var layer_top = (win_height - layer_header_height - layer_content_height) / 2;
    
    if (layer_content_height > ((win_height - layer_header_height) * 0.94)) {
        layer_content_height = (win_height - layer_header_height) * 0.94;
        layer_top = (win_height - layer_header_height) * 0.03;
    }
    
    $("#" + layer_id).children(".popup_layer_box").children().children(".popup_layer_info").css("height",layer_content_height + "px");
    $("#" + layer_id).children(".popup_layer_box").css("top",layer_top+"px");
    $("#" + layer_id).css("opacity","1");
}

//롤링 슬라이드 실행 (exe : 함수 실행, resize : 리사이즈)
function rollingSlide(val, type) {
    var $banner = $(val).closest("ul");
    
    if ($banner.length > 0) {
        var $bannerHeight = $(".rolling_slide_area:visible").height();
        var $bannerLength = $banner.children("li").length;
        var bannerIndex = $(val).index();
        var nextIndex = (bannerIndex == $bannerLength - 1) ? 0 : bannerIndex + 1;
        
        if ($bannerLength > 1) {
            $banner.css("height", ($bannerHeight * $bannerLength) + "px");
            $banner.children("li").css("height", $bannerHeight + "px");
            
            if (type != "resize") {
                $banner.stop(true,true).animate({ top: - $bannerHeight + "px" }, 1000, function() {
                    $(this).append("<li>" + $(this).children("li:first").html() + "</li>");
                    $(this).children("li:first").remove();
                    $(this).css("top", 0);
                });
            }
        }
        
        if (type == "resize") {
            var video = val;        

            if (video != null && video.addEventListener) {
                video.addEventListener("ended", function() {
                    resizeFlag = false;
                    rollingSlide(video, "exe");
                }, false);
            }
        } else {
            var video = $banner.children("li").eq(nextIndex).find("video").get(0);        

            if (video != null && video.addEventListener) {
                video.play();
                video.currentTime = 0;

                video.addEventListener("ended", function() {
                    if (!resizeFlag) rollingSlide(video, "exe");
                }, false);
            }
        }
    }
}

/*var inter;

function rollingSlide(rolling_id, type) {
    var $banner = $(".rolling_slide_area ul." + rolling_id + ":visible");
    
    if ($banner.length > 0) {
        var $bannerHeight = $(".rolling_slide_area:visible").height();
        var $bannerLength = $banner.children("li").length;
        
        if ($bannerLength > 1) {
            clearInterval(inter);
            
            $banner.css("height", ($bannerHeight * $bannerLength) + "px");
            $banner.children("li").css("height", $bannerHeight + "px");
            
            if (type != "resize") {
                $banner.stop(true,true).animate({ top: - $bannerHeight + "px" }, 1000, function() {
                    $(this).append("<li>" + $(this).children("li:first").html() + "</li>");
                    $(this).children("li:first").remove();
                    $(this).css("top", 0);
                });
            }
            
            inter = setInterval(function() { rollingSlide(rolling_id, "run"); }, 4000);
        }
    }
}*/

//롤링 슬라이드 리사이즈시 실행
function rollingSlideResize() {
    var win_width = $(window).width() + 17;
    var ul_selector = null;
    
    if (win_width > 1080) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
            ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".introduce_slide_area_two .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_two .introduce_con_sub_list";
        }
    } else if (win_width > 900) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
            ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".introduce_slide_area_one .introduce_con_list").length > 0) {
            ul_selector = ".introduce_slide_area_one .introduce_con_list";
        }
    } else {
        if ($(".main_slide_area_mobile .main_con_list").length > 0) {
            ul_selector = ".main_slide_area_mobile .main_con_list";
        } else if ($(".introduce_slide_area_three .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_three .introduce_con_sub_list";
        }
    }
    
    if (ul_selector != null) {
        $(ul_selector).each(function() {
            var video = $(this).children("li").eq(0).find("video").get(0);

            if (video != null && video.addEventListener) {
                resizeFlag = true;
                video.currentTime = 0;
                rollingSlide(video, "resize");
            }
        });
    }
}

