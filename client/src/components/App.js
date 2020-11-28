import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from '../components/Recipe/RecipeItem';
import posed from 'react-pose';
import Spinner from './Spinner';

const RecipeList = posed.ul({
	shown: {
		x: '0%',
		staggerChildren: 100,
	},
	hidden: {
		x: '-100%',
	},
});

class App extends React.Component {
	state = {
		on: false,
	};
	componentDidMount() {
		setTimeout(this.slideIn, 200);
	}

	slideIn = () => {
		this.setState({ on: !this.state.on });
	};

	render() {
		return (
			<div className='min-h-screen'>
				<div className='py-20 px-8 max-w-6xl mx-auto'>
					<h1 className='text-2xl font-bold mb-3 inline-block border-b border-gray-800'>Home</h1>
					<Query query={GET_ALL_RECIPES}>
						{({ data, loading, error }) => {
							if (loading) return <Spinner />;
							if (error) return <div>Error</div>;
							const { on } = this.state;
							return (
								<RecipeList pose={on ? 'shown' : 'hidden'}>
									{data.getAllRecipes.map(recipe => (
										<RecipeItem key={recipe._id} {...recipe} />
									))}
								</RecipeList>
							);
						}}
					</Query>
				</div>
			</div>
		);
	}
}

export default App;
