import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

const App = ({ dispatch, children }) =>
	<div>
		<ul className="nav">
			<li onClick={() => dispatch(routeActions.push('/')) }>
				Home
			</li>
			<li onClick={() => dispatch(routeActions.push('/foo')) }>
				Foo
			</li>
			<li onClick={() => dispatch(routeActions.push('/bar')) }>
				Bar
			</li>
		</ul>
		<div className="page">
			{children}
		</div>
	</div>;

export default connect()(App);
