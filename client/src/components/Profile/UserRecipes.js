import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_USER_RECIPE, GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries';
import Spinner from '../Spinner';
import CKEditor from 'react-ckeditor-component';

class UserRecipes extends React.Component {
	state = {
		_id: '',
		modal: false,
		name: '',
		imageUrl: '',
		category: '',
		description: '',
		instructions: '',
	};
	handleEditorChange = event => {
		const newContent = event.editor.getData();
		this.setState({ instructions: newContent });
	};
	handleDelete = deleteUserRecipe => {
		const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
		if (confirmDelete) {
			deleteUserRecipe().then(({ data }) => {});
		}
	};
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};
	loadRecipe = recipe => {
		this.setState({ ...recipe, modal: true });
	};
	handleSubmit = (event, updateUserRecipe) => {
		event.preventDefault();
		updateUserRecipe().then(({ data }) => {
			console.log(data);
			this.closeModal();
		});
	};
	closeModal = () => {
		this.setState({ modal: false });
	};

	render() {
		const { username } = this.props;
		const { modal } = this.state;
		return (
			<Query query={GET_USER_RECIPES} variables={{ username }}>
				{({ data, loading, error }) => {
					if (loading) return <Spinner />;
					if (error) return <div>Error</div>;
					return (
						<div>
							<ul>
								{modal && <EditRecipeModal handleSubmit={this.handleSubmit} handleEditorChange={this.handleEditorChange} recipe={this.state} closeModal={this.closeModal} handleChange={this.handleChange} />}
								<h3>Your Recipes</h3>
								{!data.getUserRecipes.length && (
									<p>
										You haven't added any recipes yet. <Link to='/recipe/add'>Add Some now</Link>
									</p>
								)}
								{data.getUserRecipes.map(recipe => (
									<li key={recipe._id}>
										<Link to={`/recipes/${recipe._id}`}>
											<div>{recipe.name}</div>
										</Link>
										<div>Likes: {recipe.likes}</div>

										<Mutation
											mutation={DELETE_USER_RECIPE}
											variables={{ _id: recipe._id }}
											refetchQueries={() => [{ query: GET_ALL_RECIPES }, { query: GET_CURRENT_USER }]}
											update={(cache, { data: { deleteUserRecipe } }) => {
												const { getUserRecipes } = cache.readQuery({
													query: GET_USER_RECIPES,
													variables: { username },
												});
												cache.writeQuery({
													query: GET_USER_RECIPES,
													variables: { username },
													data: {
														getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id),
													},
												});
											}}
										>
											{(deleteUserRecipe, attrs = {}) => (
												<div>
													{console.log}
													<button className='' onClick={() => this.loadRecipe(recipe)}>
														Update
													</button>
													<p className='delete-button' onClick={() => this.handleDelete(deleteUserRecipe)}>
														{attrs.loading ? 'deleting...' : 'X'}
													</p>
												</div>
											)}
										</Mutation>
									</li>
								))}
							</ul>
						</div>
					);
				}}
			</Query>
		);
	}
}

const EditRecipeModal = ({ handleSubmit, recipe, handleChange, closeModal, handleEditorChange }) => (
	<Mutation
		mutation={UPDATE_USER_RECIPE}
		variables={{
			_id: recipe._id,
			name: recipe.name,
			imageUrl: recipe.imageUrl,
			category: recipe.category,
			description: recipe.description,
			instructions: recipe.instructions,
		}}
	>
		{updateUserRecipe => {
			return (
				<div className='absolute bg-white bg-opacity-75 inset-0'>
					<div className='bg-white bg-opacity-75 flex flex-col justify-center min-h-screen p-6'>
						<form onSubmit={event => handleSubmit(event, updateUserRecipe)} className='bg-white py-4 px-8 border border-gray-200 rounded-md shadow-lg w-full max-w-lg mx-auto'>
							<h4>Edit Recipe</h4>
							<input onChange={handleChange} value={recipe.name} type='text' name='name' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
							<input onChange={handleChange} value={recipe.imageUrl} type='text' name='imageUrl' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
							<select name='category' onChange={handleChange} value={recipe.category} className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300'>
								<option value='Breakfast'>Breakfast</option>
								<option value='Lunch'>Lunch</option>
								<option value='Dinner'>Dinner</option>
								<option value='Snack'>Snack</option>
							</select>
							<input onChange={handleChange} value={recipe.description} type='text' name='description' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
							<label htmlFor='instructions'>Add Instructions</label>
							<CKEditor name='instructions' content={recipe.instructions} events={{ change: handleEditorChange }} />
							<div className='text-right mt-3'>
								<button onClick={closeModal} type='submit' className='w-20 text-sm py-3 mr-4 shadow-md text-gray-700 rounded-md border border-gray-200 bg-white hover:bg-gray-100 hover:bg-opacity-50 active:bg-gray-100 transition ease-out duration-300'>
									Cancel
								</button>
								<button type='submit' className='w-32 py-3 text-sm shadow-md text-white rounded-md border border-transparent bg-green-500 hover:bg-green-400 active:bg-green-700 transition ease-out duration-300'>
									Add Recipe
								</button>
							</div>
						</form>
					</div>
				</div>
			);
		}}
	</Mutation>
);

export default UserRecipes;
