import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
	username: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

class Signup extends React.Component {
	state = { ...initialState };

	clearState = () => {
		this.setState({ ...initialState });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event, signupUser) => {
		event.preventDefault();
		signupUser().then(async ({ data }) => {
			localStorage.setItem('token', data.signupUser.token);
			await this.props.refetch();
			this.clearState();
			this.props.history.push('/');
		});
	};

	validateForm = () => {
		const { username, email, password, passwordConfirmation } = this.state;

		const isInvalid = !username || !email || !password || password !== passwordConfirmation;
		return isInvalid;
	};

	render() {
		const { username, email, password, passwordConfirmation } = this.state;
		return (
			<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6'>
				<div className='w-full max-w-screen-sm border border-gray-200 rounded-md bg-white shadow-md flex flex-col'>
					<h2 className='p-4 text-lg border-b text-gray-500 border-gray-100'>Signup for a new account.</h2>
					<Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
						{(signupUser, { data, loading, error }) => {
							return (
								<form onSubmit={event => this.handleSubmit(event, signupUser)} className='form bg-gray-100 bg-opacity-50 flex flex-col p-8'>
									<input onChange={this.handleChange} value={username} type='text' name='username' placeholder='Username' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
									<input onChange={this.handleChange} value={email} type='email' name='email' placeholder='Email Address' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
									<input onChange={this.handleChange} value={password} type='password' name='password' placeholder='Password' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' autoComplete='off' />
									<input onChange={this.handleChange} value={passwordConfirmation} type='password' name='passwordConfirmation' placeholder='Confirm Password' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' autoComplete='off' />
									<div className='text-right mt-3'>
										<button disabled={loading || this.validateForm()} type='submit' className={`w-full py-3 shadow-md text-white rounded-md border border-transparent ${this.validateForm() ? 'cursor-not-allowed bg-gray-400' : 'bg-green-500 hover:bg-green-400 active:bg-green-700 transition ease-out duration-300'}`}>
											Let's Go!
										</button>
									</div>
									{error && <Error error={error} />}
								</form>
							);
						}}
					</Mutation>
				</div>
			</div>
		);
	}
}

export default withRouter(Signup);
