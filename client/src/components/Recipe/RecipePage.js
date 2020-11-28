import React from 'react';
import { withRouter } from 'react-router-dom';
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

const RecipePage = ({ match }) => {
	const { _id } = match.params;
	return (
		<Query query={GET_RECIPE} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Spinner />;
				if (error) return <div>Error</div>;
				return (
					<div className='min-h-screen'>
						<div className='py-20 px-8 max-w-6xl mx-auto'>
							<h2 className='text-2xl font-bold mb-3 inline-block border-b border-gray-800'>{data.getRecipe.name}</h2>
							<p>Category: {data.getRecipe.name}</p>
							<p>Description: {data.getRecipe.description}</p>
							<h3>Instructions:</h3>
							<div dangerouslySetInnerHTML={{ __html: data.getRecipe.instructions }} />
							<p>Likes: {data.getRecipe.likes}</p>
							<p>Created By: {data.getRecipe.username}</p>
							<LikeRecipe _id={_id} />
						</div>
					</div>
				);
			}}
		</Query>
	);
};

export default withRouter(RecipePage);
