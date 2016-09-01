// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・React Test
　→React動作で必要な実装

----------------------------------------------------*/




(function($) {




/* Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------*/


    "use strict";


    // ウィンドウのサイズ判定 //
    var self                    = this;


    // ウィンドウのサイズ判定 //
    var window_width            = $(window).width();
    var window_height           = $(window).height();
    var window_outer_width      = $(window).outerWidth();
    var window_outer_height     = $(window).outerHeight();
    var window_inner_width      = $(window).innerWidth();
    var window_inner_height     = $(window).innerHeight();


    // ディレクトリの判定 //
    var rootDir                 = location.href.split('/');
    var currentDir              = rootDir[rootDir.length -2];


    // 端末ユーザーエージェントの判定 //
    var user_agent              = navigator.userAgent;
    var ua_sp                   = user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent);


    // ヘッダーの判定 //
    var header                  = $('header');
    var header_navi_1st_none    = $('header#header-navi-1st-none');
    var header_navi_1st         = $('header#header-navi-1st');
    var header_navi_2nd         = $('header#header-navi-2nd');
    var header_navi_3rd         = $('header#header-navi-3rd');


    // フッターの判定 //
    var footer                  = $('footer');
    var footer_navi_1st         = $('footer#footer-navi-1st');
    var footer_navi_2nd         = $('footer#footer-navi-2nd');
    var footer_navi_3rd         = $('footer#footer-navi-3rd');




        /* ユーザーエージェント一覧
        ----------------------------------------


        //　iOS
        user_agent.indexOf('iPhone') > 0
        user_agent.indexOf('iPad') > 0
        user_agent.indexOf('iPod') > 0

        //　Android
        user_agent.indexOf('Android') > 0

        //　BlackBerry
        user_agent.indexOf('BlackBerry') > 0

        //　Windows Phone
        user_agent.indexOf('windows Phone') > 0

        //　NOKIA
        user_agent.indexOf('NOKIA') > 0

        //　Firefox OS
        /Mobile.*Firefox/.test(user_agent)

        //　IE
        user_agent.match(/MSIE/) 　////　vr.11 or high
        user_agent.match(/Trident/) ////　vr.10 or less


        ----------------------------------------
        */




    $.ajaxSetup ({

        cache: true,
        async: true

    });




    /*【TEST】 React実装
    ------------------------------------------------------------*/


    var Test06 = React.createClass({
        displayName: 'Hello',
        render: function() {
            return React.createElement('div', {className: 'box mb-20'}, 'Hello ', this.props.name);
        }
    });

    ReactDOM.render(
        React.createElement(Test06, {name: 'World'}),
        document.getElementById('test06')
    );


    /*----------------------------------------------------------*/


    var Test07 = React.createClass({
        displayName: 'Test',
        render: function() {
            return React.createElement('div', {className: 'box mb-20'}, 'Mr ', this.props.name);
        }
    });

    ReactDOM.render(
        React.createElement(Test07, {name: 'Rolling Thunder'}),
        document.getElementById('test07')
    );


    /*----------------------------------------------------------*/


    var Test08 = React.createClass({
        render: function() {
                return (
                    <p>ひょっとして読み込めちゃった系？</p>
                );
        }
    });

    ReactDOM.render(<Test08 />, document.getElementById('test08'));


    /*----------------------------------------------------------*/


    var Test09 = React.createClass({
        render: function() {
                return (
                    <div>
                        <p className='box'>お前、{this.props.name}</p>
                        <p className='box mb-20'>しょっぱいコーディングですみません！</p>
                    </div>
                );
        }
    });

    ReactDOM.render(<Test09 name='平田だろ!?' />, document.getElementById('test09'));


    /*----------------------------------------------------------*/


    var Test10 = React.createClass({
        render: function() {
                return (
                    <p className='box mb-20'>お前、{this.props.name}</p>
                );
        }
    });

    ReactDOM.render(<Test10 name='名無しだろ!?' />, document.getElementById('test10'));


    /*----------------------------------------------------------*/


    var Test11 = React.createClass ({

        getInitialState() {
            return {
                count: 0
            };
        },

        onClick() {
            this.setState({count: this.state.count + 1 });
        },

        render () {
            return (
                <div>
                    <div>
                        count: {this.state.count}
                    </div>
                    <button onClick={this.onClick}>
                        click!
                    </button>
                </div>
            );
        }

    });

    ReactDOM.render(<Test11 />, document.getElementById('test11'));


    /*----------------------------------------------------------*/


    var Test12 = React.createClass ({

        render() {
            var avatarImg = `images/avatar/avatar_${this.props.user.id}.png`;
            return (
                <div className='box center mb-10'>
                    <img src={avatarImg} className='wd-10' />
                    <p className='small mg-00 center'>
                        {this.props.user.name}
                    </p>
                </div>
            );
        }

    });

    var user = {
        id: 10,
        name: 'Atsushi Kikushima'
    };

    ReactDOM.render(<Test12 user={user} />, document.getElementById('test12'));


    /*----------------------------------------------------------*/


    /*----------------------------------------------------------

    React.PropTypes.array           // 配列
    React.PropTypes.bool.isRequired // Booleanで必須
    React.PropTypes.func            // 関数
    React.PropTypes.number          // 数値
    React.PropTypes.object          // オブジェクト
    React.PropTypes.string          // 文字列
    React.PropTypes.node            // Renderできるもの
    React.PropTypes.element         // React Element
    React.PropTypes.instanceOf(XXX) // XXXのinstanceかどうか
    React.PropTypes.oneOf(['foo', 'bar']) // fooかbar
    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]) // 文字列か配列
    React.PropTypes.arrayOf(React.PropTypes.string)  // 文字列の配列かどうか
    React.PropTypes.objectOf(React.PropTypes.string) // 文字列の値を持っているか
    React.PropTypes.shape({                          // 指定された形式を満たしているかどうか
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number
    });
    React.PropTypes.any.isRequired  // なんでもいいけど必須

    ----------------------------------------------------------*/


    var Test13 = React.createClass({

        propTypes: {
            user: React.PropTypes.shape({
                name:   React.PropTypes.string.isRequired,
                id:     React.PropTypes.number.isRequired,
                width:  React.PropTypes.number.isRequired,
                height: React.PropTypes.number.isRequired,
                alt:    React.PropTypes.string
            })
        },

        render() {
            var src = `images/avatar/avatar_${this.props.user.id}.png`;
            return (

                <div className='box center mb-10'>
                    <img src={src} width={this.props.user.width} height={this.props.user.height} alt={this.props.user.alt} />
                    <p className='small mg-00 center'>
                        {this.props.user.name}
                    </p>
                </div>

            );

        }

    });

    var user = {
        name:       'Atsushi Kikushima',
        id:         10,
        width:      100,
        height:     100,
        alt:        'ヒマ人'
    };

    ReactDOM.render(<Test13 user={user} />, document.getElementById('test13'));


    /*----------------------------------------------------------*/


    var Todo = React.createClass({

        propTypes: {
            todo: React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                text: React.PropTypes.string.isRequired
            }),
            // 削除するための処理をI/Fとして定義
            onDelete: React.PropTypes.func.isRequired
        },
        // 親に処理を委譲する
        _onDelete() {
            this.props.onDelete(this.props.todo.id);
        },
        render() {
            return (
                <div>
                    <span>{this.props.todo.text}</span>
                    <button onClick={this._onDelete}>delete</button>
                </div>
            );
        }

    });

    var Test14 = React.createClass({

        getInitialState() {
            return {

                todos: [
                    {id:1, text:"advent calendar1"},
                    {id:2, text:"advent calendar2"},
                    {id:3, text:"advent calendar3"}
                ]

            };
        },
        // TodoListはこのComponentが管理しているので削除する処理もここにあるべき
        deleteTodo(id) {

            this.setState({
                todos: this.state.todos.filter((todo) => {
                    return todo.id !== id;
                })
            });

        },
        render() {

            var todos = this.state.todos.map((todo) => {
                return <li key={todo.id}><Todo onDelete={this.deleteTodo} todo={todo} /></li>;
            });
            return <ul>{todos}</ul>;

        }

    });

    ReactDOM.render(<Test14 />, document.getElementById('test14'));


    /*----------------------------------------------------------*/


    var Test15 = React.createClass({

        propTypes: {
            initialCount: React.PropTypes.number
        },
        getDefaultProps() {
            return {
                initialCount: 0
            };
        },
        getInitialState() {
            return {
                count: this.props.initialCount
            }
        },
        onClick() {
            this.setState({ count: this.state.count + 1 });
        },
        render() {
            return (
                <div>
                    <p>{this.state.count}</p>
                    <button onClick={this.onClick}>click</button>
                </div>
            );
        }

    });

    ReactDOM.render(<Test15 />, document.getElementById('test15'));


    /*----------------------------------------------------------*/


    /* Kerning
    ----------------------------------------------------*/


    /*Attention
    ----------------------------------------------------

    ※カーニングは半角英数には対応不可
    ※数字、記号、約物は全角のみカーニングに対応
    ※詳しい対応文字はajax/kerning.jsonを確認

    ----------------------------------------------------
    */




    function kerningDir(rootDir) {

        /* JSONデータ読み込み - 非同期通信するためgetJSONで読み出すこと - */
        return $.getJSON(rootDir + 'ajax/kerning.json', function(data) {


            /* 中にテキストが入るタグの判定 divは含まれない */
            var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl, dt, dd, dl.news dt, dl.news dd, dl.column dt, dl.column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address');

            /* JSONのデータを基にカーニングを実行 */
            tag.kerning({
                'data': data
            });


        });

    }


    if (header_navi_1st.length || header_navi_1st_none.length) {
        kerningDir('./');
    }

    else if (header_navi_2nd.length) {
        kerningDir('../');
    }

    else if (header_navi_3rd.length) {
        kerningDir('../../');
    }




})(jQuery);