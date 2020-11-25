import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
// import reportWebVitals from './reportWebVitals';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './styles/tailwind.css';

const client = new ApolloClient({
	uri: 'http://localhost:4444/graphql',
});

const Root = () => (
	<Router>
		<Switch>
			<Route path='/' exact component={App} />
			<Route path='/signin' component={Signin} />
			<Route path='/signup' component={Signup} />
			<Redirect to='/' />
		</Switch>
	</Router>
);

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Root />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
