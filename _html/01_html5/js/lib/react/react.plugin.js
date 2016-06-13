// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・React Test
　→React動作で必要な実装

----------------------------------------------------*/




$(function() {




		/*【TEST】 React実装
		--------------------*/
		var Hello = React.createClass({
			displayName: 'Hello',
			render: function() {
				return React.createElement("div", null, "Hello ", this.props.name);
			}
		});

		ReactDOM.render(
			React.createElement(Hello, {name: "World"}),
			document.getElementById('test06')
		);




});