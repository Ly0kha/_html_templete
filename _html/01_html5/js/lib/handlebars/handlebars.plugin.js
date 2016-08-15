// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→TumblrのAPI設定
　→TumblrのJson読み出し
　→Jsonを元にHTMLに整形

・Function
　→画像をフルサイズにリサイズ
　→スライドする為の設定とカスタマイズ

----------------------------------------------------*/




var GLOBAL = GLOBAL || self;




window.onload = (function(global) {




    /* Setup
    ------------------------------------------------------------------------------*/




    var values = {
        myParty: [
            {
                name: 'ながしま',
                job: 'ゆうしゃ',
                current_hp: 20,
                max_hp: 999,
                isLive: true
            },
            {
                name: 'おう',
                job: 'せんし',
                current_hp: 15,
                max_hp: 999,
                isLive: true
            },
            {
                name: 'のむら',
                job: 'まほうつかい',
                current_hp: 999,
                max_hp: 999,
                isLive: true
            },
            {
                name: 'みはら',
                job: 'けんじゃ',
                current_hp: 0,
                max_hp: 999,
                isLive: false
            }
        ]
    };

    var template = Handlebars.compile($('#input').html());

    Handlebars.registerHelper('showCondition', function(cond, opt) {
        var condition = '';
        if (cond > 80) {
            condition = 'すごくげんき';
        } else if (cond > 10) {
            condition = 'げんき';
        } else {
            condition = 'ひんし';
        }
        return condition;
    });

    $('#output').html(template(values));




    /* Function
    ------------------------------------------------------------------------------*/









})((this || 0).self || global);