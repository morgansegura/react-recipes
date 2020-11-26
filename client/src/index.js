import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import RecipePage from './components/Recipe/RecipePage';
import Profile from './components/Profile/Profile';
import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
// import reportWebVitals from './reportWebVitals';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './styles/tailwind.css';

const client = new ApolloClient({
	uri: 'http://localhost:4444/graphql',
	fetchOptions: {
		credentials: 'include',
	},
	request: operation => {
		const token = localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: token,
			},
		});
	},
	onError: ({ networkError, graphQLErrors, errorMessage }) => {
		if (networkError) {
			console.log('Network Error: ', networkError);

			if (networkError.statusCode === 401) {
				localStorage.removeItem('token');
			}
		}
		if (graphQLErrors) {
			console.log('GraphQL Error: ', graphQLErrors);
		}
		if (errorMessage) {
			console.log('Error Message: ', errorMessage);
		}
	},
});

const Root = ({ refetch, session }) => (
	<Router>
		<Fragment>
			<Navbar session={session} />
			<Switch>
				<Route path='/' exact component={App} />
				<Route path='/search' component={Search} />
				<Route path='/signin' render={() => <Signin refetch={refetch} />} />
				<Route path='/signup' render={() => <Signup refetch={refetch} />} />
				<Route path='/recipe/add' render={() => <AddRecipe session={session} />} />
				<Route path='/recipes/:_id' component={RecipePage} />
				<Route path='/profile' component={Profile} />
				<Redirect to='/' />
			</Switch>
		</Fragment>
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RootWithSession />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
