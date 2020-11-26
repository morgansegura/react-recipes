import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, category, createdDate, description, instructions, likes }) => (
	<li>
		<Link to={`/recipes/${_id}`}>
			<h4>{name}</h4>
		</Link>
		<p>Name: {_id}</p>
		<p>Category: {category}</p>
		<p>Created Date: {createdDate}</p>
		<p>Description: {description}</p>
		<p>Instructions: {instructions}</p>
		<p>Likes: {likes}</p>
	</li>
);

export default RecipeItem;
