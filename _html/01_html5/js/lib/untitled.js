function mf360start(i, n) {

    figChangeFlag = !0,
    setTimeout(function () {
        $("#minifig360_loading").fadeIn(800, "easeInQuart"),
        $("#minifig360_fig").animate({
            top: 500
        }, 1200, "easeOutExpo"),
        $("#minifig360_fig").animate({
            opacity: 0
        }, {
            complete: function () {
                if ($("#minifig360_fig").css("top", $("#minifig360_holder").height()), $("#minifig360_holder h4").css("display", "none"), location.pathname.indexOf("sp") >= 0)
                    var e = "sp";
                else
                    var e = "pc";
                null == i
                    ? nowfig = Math.floor(Math.random() * minifig.length)
                    : nowfig += i,
                0 > nowfig && (nowfig = minifig.length - 1),
                nowfig >= minifig.length && (nowfig = 0);
                var t = $("#minifig360_fig h4"),
                    a = $("#minifig360_fig ul");
                t.empty(),
                a.empty(),
                t.append('<img src="/resource/img/minifig/' + minifig[nowfig] + '/name.png" alt="">');
                for (var f = 1; 16 >= f; f++) {
                    if (10 > f)
                        var o = "0" + f;
                    else
                        var o = f;
                    a.append('<li><img src="/resource/img/minifig/' + minifig[nowfig] + "/" + o + '.jpg" alt=""></li>')
                }
                setTimeout(function () {
                    $("#minifig360")
                        .imagesLoaded(function () {
                            $("#minifig360_loading")
                                .fadeOut(200, "linear", function () {
                                    setTimeout(function () {
                                        var i = 0,
                                            t = 0,
                                            a = !1,
                                            f = $("#minifig360_holder"),
                                            o = $("#minifig360_ca"),
                                            g = $("#minifig360_fig"),
                                            m = g.find("li"),
                                            c = 0;
                                        if (0 > n)
                                            var r = -80;
                                        else
                                            var r = 80;
                                        var l = .984,
                                            u = 6,
                                            s = 4;
                                        g.animate({
                                            opacity: 1,
                                            top    : 0
                                        }, 2e3, "easeOutCubic"),
                                        setTimeout(function () {
                                            figChangeFlag = !1,
                                            f
                                                .find("h4")
                                                .fadeIn(600, "linear"),
                                            "sp" == e
                                                ? ($("#minifig360_back").animate({
                                                    left: 0
                                                }, 600, "easeInOutCubic"), $("#minifig360_next").animate({
                                                    right: 0
                                                }, 600, "easeInOutCubic"))
                                                : ($("#minifig360_back").css("display", "block").animate({
                                                    left   : 50,
                                                    opacity: 1
                                                }, 600, "easeInOutCubic"), $("#minifig360_next").css("display", "block").animate({
                                                    opacity: 1,
                                                    right  : 50
                                                }, 600, "easeInOutCubic")),
                                            o.bind("mousedown", function (n) {
                                                n || (n = window.event),
                                                n.preventDefault(),
                                                a = !0,
                                                i = n.clientX,
                                                t = n.clientY
                                            }),
                                            o.bind("mouseup", function (i) {
                                                i || (i = window.event),
                                                i.preventDefault(),
                                                a = !1
                                            }),
                                            o.bind("mouseout", function (i) {
                                                i || (i = window.event),
                                                i.preventDefault(),
                                                a = !1
                                            }),
                                            o.bind("mousemove", function (n) {
                                                if (n || (n = window.event), n.preventDefault(), a) {
                                                    var e = Math.sqrt(Math.pow(i - n.clientX, 2) + Math.pow(t - n.clientY, 2)) / u;
                                                    i - n.clientX < 0 && (e = -e),
                                                    r += e,
                                                    0 != deltaMax && (r >= deltaMax && (r = deltaMax), -deltaMax >= r && (r = -deltaMax)),
                                                    i = n.clientX,
                                                    t = n.clientY
                                                }
                                            }),
                                            o.bind("touchstart", function () {
                                                event || (event = window.event),
                                                event.preventDefault(),
                                                a = !0,
                                                i = event.changedTouches[0].pageX,
                                                t = event.changedTouches[0].pageY
                                            }),
                                            o.bind("touchend", function () {
                                                event || (event = window.event),
                                                event.preventDefault(),
                                                a = !1
                                            }),
                                            o.bind("touchcancel", function () {
                                                event || (event = window.event),
                                                event.preventDefault(),
                                                a = !1
                                            }),
                                            o.bind("touchmove", function () {
                                                if (event || (event = window.event), event.preventDefault(), a) {
                                                    var n = Math.sqrt(Math.pow(i - event.changedTouches[0].pageX, 2) + Math.pow(t - event.changedTouches[0].pageY, 2)) / s;
                                                    i - event.changedTouches[0].pageX < 0 && (n = -n),
                                                    r += n,
                                                    0 != deltaMax && (r >= deltaMax && (r = deltaMax), -deltaMax >= r && (r = -deltaMax)),
                                                    i = event.changedTouches[0].pageX,
                                                    t = event.changedTouches[0].pageY
                                                }
                                            })
                                        }, 5e3),
                                        setInterval(function () {
                                            if (0 != Math.round(r)) {
                                                if (c += r - r * l, r *= l, r >= 0)
                                                    for (; Math.round(c) >= 16;)
                                                        c -= 16;
                                            else
                                                    for (; Math.round(c) < 0;)
                                                        c += 16;
                                            m.not(":eq(" + Math.round(c) + ")").css("opacity", "0"),
                                                m
                                                    .eq(Math.round(c))
                                                    .css("opacity", "1")
                                            } else
                                                r = 0
                                        }, 10),
                                        mfbackhoverflag = !1,
                                        mfbackmoveflag  = !1,
                                        mfnexthoverflag = !1,
                                        mfnextmoveflag  = !1,
                                        $("#minifig360_back").hover(function () {
                                            mfbackhoverflag = !0,
                                            mfbackmoveflag || mf360controllerBack()
                                        }, function () {
                                            mfbackhoverflag = !1
                                        }),
                                        $("#minifig360_next").hover(function () {
                                            mfnexthoverflag = !0,
                                            mfnextmoveflag || mf360controllerNext()
                                        }, function () {
                                            mfnexthoverflag = !1
                                        })
                                    }, 300)
                                })
                        })
                }, 5)
            },
            duration: 1200,
            easing  : "easeOutExpo",
            queue   : !1
        })
    }, 500)
}
function mf360controllerBack() {
    mfbackhoverflag && (mfbackmoveflag = !0, $("#minifig360_back .minifig360_arrow").animate({
        left: 0
    }, 350, "swing", function () {
        $(this)
            .animate({
                left: 20
            }, 450, "swing", function () {
                mfbackmoveflag = !1
            })
    }))
}
function mf360controllerNext() {
    mfnexthoverflag && (mfnextmoveflag = !0, $("#minifig360_next .minifig360_arrow").animate({
        right: 0
    }, 350, "swing", function () {
        $(this)
            .animate({
                right: 20
            }, 450, "swing", function () {
                mfnextmoveflag = !1
            })
    }))
}
$(function () {
    minifig     = new Array,
    minifig[0]  = "majisto_wizard",
    minifig[1]  = "crusader_axe",
    minifig[2]  = "brown_bandit",
    minifig[3]  = "captain_roger",
    minifig[4]  = "one-eyed_pirate",
    minifig[5]  = "sheriff",
    minifig[6]  = "patrol_officer",
    minifig[7]  = "city_police_officer",
    minifig[8]  = "aquanaut",
    minifig[9]  = "red_spaceman",
    minifig[10] = "repair_man",
    minifig[11] = "green_and_white_team_player",
    minifig[12] = "princess",
    minifig[13] = "pharaoh_hotep",
    minifig[14] = "ghost";
    for (var i = 0, n = minifig.length; n > i; ++i)
        minifig[i] = [
            minifig[i], Math.random()
        ];
    minifig
        .sort(function (i, n) {
            return i[1] - n[1]
        });
    for (var i = 0, n = minifig.length; n > i; ++i)
        minifig[i] = minifig[i][0];
    nowfig        = 0,
    deltaMax      = 60,
    figChangeFlag = !1,
    $("#minifig360_loading").fadeIn(300, "linear"),
    $(window).imagesLoaded(function () {
        mf360start()
    }),
    $("#minifig360_back").click(function () {
        0 == figChangeFlag && mf360start(-1, -1)
    }),
    $("#minifig360_next").click(function () {
        0 == figChangeFlag && mf360start(1, 1)
    })

});