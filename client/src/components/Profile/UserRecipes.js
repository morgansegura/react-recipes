import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries';

const handleDelete = deleteUserRecipe => {
	const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
	if (confirmDelete) {
		deleteUserRecipe().then(({ data }) => {});
	}
};

const UserRecipes = ({ username }) => (
	<Query query={GET_USER_RECIPES} variables={{ username }}>
		{({ data, loading, error }) => {
			if (loading) return <div>Loading</div>;
			if (error) return <div>Error</div>;
			return (
				<div>
					<ul>
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
									{(deleteUserRecipe, attrs = {}) => {
										return (
											<p className='delete-button' onClick={() => handleDelete(deleteUserRecipe)}>
												{attrs.loading ? 'deleting...' : 'X'}
											</p>
										);
									}}
								</Mutation>
							</li>
						))}
					</ul>
				</div>
			);
		}}
	</Query>
);

export default UserRecipes;