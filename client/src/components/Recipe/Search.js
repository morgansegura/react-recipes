import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../queries';
import SearchItem from './SearchItem';

class Search extends React.Component {
	state = { searchResults: [] };

	handleChange = ({ searchRecipes }) => {
		this.setState({ searchResults: searchRecipes });
	};
	render() {
		const { searchResults } = this.state;
		return (
			<ApolloConsumer>
				{client => (
					<div className='min-h-screen'>
						<div className='py-20 px-8 max-w-6xl mx-auto'>
							<h2 className='mt-8 ml-8 text-2xl font-bold inline-block border-b border-gray-800'>Search Recipes</h2>
							<div className='py-4 my-4'>
								<input
									placeholder='Search Recipes...'
									type='search'
									className='search w-full border border-gray-200 py-3 px-4 mb-3 placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300'
									onChange={async event => {
										event.persist();
										const { data } = await client.query({
											query: SEARCH_RECIPES,
											variables: { searchTerm: event.target.value },
										});
										this.handleChange(data);
									}}
								/>
							</div>
							<ul>{searchResults && searchResults.map(recipe => <SearchItem key={recipe._id} {...recipe} />)}</ul>
						</div>
					</div>
				)}
			</ApolloConsumer>
		);
	}
}

export default Search;
