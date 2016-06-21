// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・React Test
　→React動作で必要な実装

----------------------------------------------------*/


$.ajax ({
    dataType: 'json',
});


// AJAXが入っているディレクトリの指定 //
var kerningJsonFirstDir = ('ajax/kerning.json');


$.getJSON(kerningJsonFirstDir, function(data) {


    /*【TEST】 React実装
    ------------------------------------------------------------*/


    var Hello = React.createClass({
        displayName: 'Hello',
        render: function() {
            return React.createElement('div', {className: 'box mb-20'}, 'Hello ', this.props.name);
        }
    });

    ReactDOM.render(
        React.createElement(Hello, {name: 'World'}),
        document.getElementById('test06')
    );


    /*----------------------------------------------------------*/


    var Test = React.createClass({
        displayName: 'Test',
        render: function() {
            return React.createElement('div', {className: 'box mb-20'}, 'Mr ', this.props.name);
        }
    });

    ReactDOM.render(
        React.createElement(Test, {name: 'Rolling Thunder'}),
        document.getElementById('test07')
    );


    /*----------------------------------------------------------*/


    var HelloWorld = React.createClass({
        render: function() {
                return (
                    <p>ひょっとして読み込めちゃった系？</p>
                );
        }
    });

    var m = ReactDOM.render(<HelloWorld />, document.getElementById('test08'));


    /*----------------------------------------------------------*/


    var Hirata = React.createClass({
        render: function() {
                return (
                    <div>
                        <p className='box'>お前、{this.props.name}</p>
                        <p className='box mb-20'>しょっぱいコーディングですみません！</p>
                    </div>
                );
        }
    });

    var m = ReactDOM.render(<Hirata name='平田だろ!?' />, document.getElementById('test09'));


    /*----------------------------------------------------------*/


    var MyComponent = React.createClass({
        render: function() {
                return (
                    <p className='box mb-20'>お前、{this.props.name}</p>
                );
        }
    });

    var m = ReactDOM.render(<MyComponent name='名無しだろ!?' />, document.getElementById('test10'));


    /*----------------------------------------------------------*/


    var Counter = React.createClass ({

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

    var m = ReactDOM.render(<Counter />, document.getElementById('test11'));


    /*----------------------------------------------------------*/


    var Avatar = React.createClass ({

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

    var m = ReactDOM.render(<Avatar user={user} />, document.getElementById('test12'));


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


    var Avatar02 = React.createClass({

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

    var m = ReactDOM.render(<Avatar02 user={user} />, document.getElementById('test13'));


    /*【TEST】 React実装 ここまで
    ------------------------------------------------------------*/


    setTimeout(function() {

        /* 中にテキストが入るタグの判定 */
        var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

        $(tag).kerning({
            'data': data
        });

    }, 1000);


});