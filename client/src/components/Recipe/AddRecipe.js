import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
	name: '',
	instructions: '',
	category: 'Breakfast',
	description: '',
	username: '',
};
class AddRecipe extends React.Component {
	state = { ...initialState };

	clearState = () => {
		this.setState({ ...initialState });
	};

	componentDidMount() {
		this.setState({
			username: this.props.session.getCurrentUser.username,
		});
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event, addRecipe) => {
		event.preventDefault();
		addRecipe().then(({ data }) => {
			this.clearState();
			this.props.history.push('/');
		});
	};

	validateForm = () => {
		const { name, category, instructions, description } = this.state;

		const isInvalid = !name || !category || !instructions || !description;
		return isInvalid;
	};

	updateCache = (cache, { data: { addRecipe } }) => {
		const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
		cache.writeQuery({
			query: GET_ALL_RECIPES,
			data: {
				getAllRecipes: [addRecipe, ...getAllRecipes],
			},
		});
	};

	render() {
		const { name, category, instructions, description, username } = this.state;
		return (
			<Mutation mutation={ADD_RECIPE} variables={{ name, category, instructions, description, username }} refetchQueries={() => [{ query: GET_USER_RECIPES, variables: { username } }]} update={this.updateCache}>
				{(addRecipe, { data, loading, error }) => {
					return (
						<div className='min-h-screen'>
							<div className='py-20 px-8 max-w-6xl mx-auto'>
								<div className='border border-gray-200 shadow-sm rounded-sm'>
									<h2 className='mt-8 ml-8 text-2xl font-bold inline-block border-b border-gray-800'>Add a Recipe</h2>
									<form onSubmit={event => this.handleSubmit(event, addRecipe)} className='form flex flex-col p-8'>
										<input onChange={this.handleChange} value={name} type='text' name='name' placeholder='Recipe Name' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
										<select name='category' onChange={this.handleChange} value={category} className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300'>
											<option value='Breakfast'>Breakfast</option>
											<option value='Lunch'>Lunch</option>
											<option value='Dinner'>Dinner</option>
											<option value='Snack'>Snack</option>
										</select>
										<input onChange={this.handleChange} value={description} type='text' name='description' placeholder='Add Description' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
										<textarea onChange={this.handleChange} value={instructions} name='instructions' placeholder='Add Instructions' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300'></textarea>
										<div className='text-right mt-3'>
											<button disabled={loading || this.validateForm()} type='submit' className={`w-full py-3 shadow-md text-white rounded-md border border-transparent ${this.validateForm() ? 'cursor-not-allowed bg-gray-400' : 'bg-green-500 hover:bg-green-400 active:bg-green-700 transition ease-out duration-300'}`}>
												Add Recipe
											</button>
											{error && <Error error={error} />}
										</div>
									</form>
								</div>
							</div>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));
