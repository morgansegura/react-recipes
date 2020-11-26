import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from '../components/Recipe/RecipeItem';

const App = () => (
	<div className='min-h-screen bg-gradient-to-b from-teal-400 to-blue-500'>
		<div className='py-20 px-8 max-w-6xl mx-auto'>
			<h1 className='text-2xl font-bold mb-3 inline-block border-b border-gray-800'>Home</h1>
			<Query query={GET_ALL_RECIPES}>
				{({ data, loading, error }) => {
					if (loading) return <div>Loading</div>;
					if (error) return <div>Error</div>;
					return (
						<ul>
							{data.getAllRecipes.map(recipe => (
								<RecipeItem key={recipe._id} {...recipe} />
							))}
						</ul>
					);
				}}
			</Query>
		</div>
	</div>
);

export default App;
