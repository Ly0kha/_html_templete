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


	// var React = require('react');
	// var ReactDOM = require('react-dom');


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


	var HelloWorld = React.createClass({
		render: function() {
				return (
					<p>ひょっとして読み込めちゃった系？</p>
				);
		}
	});

	var m = ReactDOM.render(<HelloWorld />, document.getElementById('test08'));


	var Hirata = React.createClass({
		render: function() {
				return (
					<p className='box mb-20'>お前、{this.props.name}</p>
				);
		}
	});

	var m = ReactDOM.render(<Hirata name='平田だろ？' />, document.getElementById('test09'));


	var MyComponent = React.createClass({
		render: function() {
				return (
					<p className='box mb-20'>お前、{this.props.name}</p>
				);
		}
	});

	var m = ReactDOM.render(<MyComponent name='名無しだろ？' />, document.getElementById('test10'));


	React.createClass({
		displayName : '',
		propTypes: {},
		mixins : [],
		getInitialState : function() {},
		componentWillMount : function() {},
		componentWillUnmount : function() {},
		_onChange : function() {},
		_onCreate : function() {},
		render : function() {}
	});


	/*【TEST】 React実装 ここまで
	------------------------------------------------------------*/




	/* 中にテキストが入るタグの判定 */
	var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

	$(tag).kerning({
		'data': data
	});




});