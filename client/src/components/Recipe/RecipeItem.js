import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const RecipeItem = ({ _id, name, imageUrl, category, createdDate, description, instructions, likes }) => (
	<li>
		<Link to={`/recipes/${_id}`}>
			<h4>{name}</h4>
		</Link>
		<p>Category: {category}</p>
		<img src={imageUrl} alt={name} />
		<p>Created Date: {createdDate}</p>
		<p>Description: {description}</p>
		<p>Instructions: {instructions}</p>
		<p>Likes: {likes}</p>
	</li>
);

export default RecipeItem;
