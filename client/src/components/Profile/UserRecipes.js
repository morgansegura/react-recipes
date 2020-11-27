import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';

const UserRecipes = ({ username }) => (
	<Query query={GET_USER_RECIPES} variables={{ username }}>
		{({ data, loading, error }) => {
			if (loading) return <div>Loading</div>;
			if (error) return <div>Error</div>;
			return (
				<div>
					<ul>
						<h3>Your Recipes</h3>
						{console.log({ username })}
						{data.getUserRecipes.map(recipe => (
							<li key={recipe._id}>
								<Link to={`/recipes/${recipe._id}`}>
									<div>{recipe.name}</div>
								</Link>
								<div>Likes: {recipe.likes}</div>
							</li>
						))}
					</ul>
				</div>
			);
		}}
	</Query>
);

export default UserRecipes;
