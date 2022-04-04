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
    });    
    
    //슬라이드 메뉴 보이기&숨기기
	$('.mb_area .mb_menu_btn').click(function() {
		if ($('.mb_area .mb_menu').css("display") == "none") {
			$('.mb_area .mb_menu').css('display','block');
			$('.mb_area .mb_menu').css('z-index','999');
			$('.mb_area .mb_box').css('left','0px');
			$('.mb_area .mb_menu_btn .line1').addClass('line11');
			$('.mb_area .mb_menu_btn .line2').addClass('line22');
			$('.mb_area .mb_menu_btn .line3').addClass('line33');
			//$('body').css('overflow','hidden');
		} else {
			$('.mb_area .mb_menu').css('display','none');
			$('.mb_area .mb_menu').css('z-index','-1');
			$('.mb_area .mb_box').css('left','-300px');
			$('.mb_area .mb_menu_btn .line1').removeClass('line11');
			$('.mb_area .mb_menu_btn .line2').removeClass('line22');
			$('.mb_area .mb_menu_btn .line3').removeClass('line33');
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
	
	$(".popup_layer_area .popup_layer_close_btn").click(function() {
        $(this).closest(".popup_layer_area").css("display","none");
    });
    
    //롤링 슬라이드 호출
    var win_width = window.innerWidth;
    var ul_selector = null;
	var mainFlag = false;
    
    if (win_width > 1080) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
        	ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".t_main_slide_area_pc .t_main_con_sub_list").length > 0) {
        	ul_selector = ".t_main_slide_area_pc .t_main_con_sub_list";
			mainFlag = true;
        } else if ($(".introduce_slide_area_two .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_two .introduce_con_sub_list";
        }
    } else if (win_width > 900) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
        	ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".t_main_slide_area_pc .t_main_con_sub_list").length > 0) {
        	ul_selector = ".t_main_slide_area_pc .t_main_con_sub_list";
			mainFlag = true;
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
    
    if (ul_selector != null && !mainFlag) {
    	$(ul_selector).each(function() {
    		var video = $(this).children("li").eq(0).find("video").get(0);
    		
    		if (video != null && video.addEventListener) {
    			video.addEventListener("ended", function() {
    				if (!resizeFlag) rollingSlide(video, "exe", mainFlag);
    			}, false);
    		}
    	});
    }
	
	//slick 슬라이드 (client)
    var client_slick = $('.client_slide_list').slick({
        infinite: false,
        slidesPerRow: 7,
        rows: 3,
        arrows: true,
        dots: false,
        fade: false,
        prevArrow: '<div class="client_slide_prev_btn"><img src="img/prev_arrow.png" alt="prev_arrow"></div>',
        nextArrow: '<div class="client_slide_next_btn"><img src="img/next_arrow.png" alt="next_arrow"></div>',
		responsive: [
            {
                breakpoint: 901,
                settings: {
                    slidesPerRow: 3
                }
            }
        ]
    });
	
	//slick 슬라이드 (creator)
    var creator_slick = $('.creator_slide_list').slick({
        infinite: false,
        slidesPerRow: 3,
        rows: 2,
        arrows: false,
        dots: true,
        fade: false,
		vertical: true
    });
	
	creator_slick.on('wheel', function(e) {
		e.preventDefault();
		
		if (e.originalEvent.deltaY > 0) {
			$(this).stop(true,true).slick('slickNext');
		} else {
			$(this).stop(true,true).slick('slickPrev');
		}
	});
	
	//slick 슬라이드 (campain)
    var campain_slick = $('.campain_slide_list').slick({
        infinite: false,
        slidesPerRow: 5,
        rows: 1,
        arrows: false,
        dots: true,
        fade: false,
		vertical: true,
		responsive: [
			{
                breakpoint: 1401,
                settings: {
                    slidesPerRow: 4
                }
            },
            {
                breakpoint: 901,
                settings: {
                    slidesPerRow: 3
                }
            },
			{
                breakpoint: 551,
                settings: {
                    slidesPerRow: 2
                }
            }
        ]
    });
	
	campain_slick.on('wheel', function(e) {
		e.preventDefault();
		
		if (e.originalEvent.deltaY > 0) {
			$(this).stop(true,true).slick('slickNext');
		} else {
			$(this).stop(true,true).slick('slickPrev');
		}
	});
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

//롤링 슬라이드 실행 (exe : 함수 실행, resize : 리사이즈) / mainFlag : 동영상 9개 보여주는 화면인지 여부 확인하는 플래그
function rollingSlide(val, type, mainFlag) {
    var $banner = $(val).closest("ul");
    
    if ($banner.length > 0) {
		var $bannerHeight = 0;

		if (mainFlag) {
			$bannerHeight = $(val).height();
		} else {
			$bannerHeight = $(".rolling_slide_area:visible").height();
		}
        
        var $bannerLength = $banner.children("li").length;
        var bannerIndex = $(val).index();
        var nextIndex = (bannerIndex == $bannerLength - 1) ? 0 : bannerIndex + 1;
        
        if ($bannerLength > 1) {
			if (!mainFlag) {
				$banner.css("height", ($bannerHeight * $bannerLength) + "px");
				$banner.children("li").css("height", $bannerHeight + "px");
			}
            
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
                    rollingSlide(video, "exe", mainFlag);
                }, false);
            }
        } else {
            var video = $banner.children("li").eq(nextIndex).find("video").get(0);        

            if (video != null && video.addEventListener) {
                video.play();
				
				if (video.currentTime > 0) {
					video.currentTime = 0;
				}

                video.addEventListener("ended", function() {
                    if (!resizeFlag) rollingSlide(video, "exe", mainFlag);
                }, false);
            }
        }
    }
}

//롤링 슬라이드 리사이즈시 실행
function rollingSlideResize() {
    var win_width = window.innerWidth;
    var ul_selector = null;
	var mainFlag = false;
    
    if (win_width > 1080) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
            ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".t_main_slide_area_pc .t_main_con_sub_list").length > 0) {
            ul_selector = ".t_main_slide_area_pc .t_main_con_sub_list";
			mainFlag = true;
        } else if ($(".introduce_slide_area_two .introduce_con_sub_list").length > 0) {
            ul_selector = ".introduce_slide_area_two .introduce_con_sub_list";
        }
    } else if (win_width > 900) {
        if ($(".main_slide_area_pc .main_con_sub_list").length > 0) {
            ul_selector = ".main_slide_area_pc .main_con_sub_list";
        } else if ($(".t_main_slide_area_pc .t_main_con_sub_list").length > 0) {
            ul_selector = ".t_main_slide_area_pc .t_main_con_sub_list";
			mainFlag = true;
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

				if (video.currentTime > 0) {
					video.currentTime = 0;
				}
                
                rollingSlide(video, "resize", mainFlag);
            }
        });
    }
}

