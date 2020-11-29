import React from 'react';
import { UPDATE_USER_RECIPE } from '../../queries';
import { Mutation } from 'react-apollo';
import CKEditor from 'react-ckeditor-component';

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
		{updatedUserRecipe => (
			<div className='fixed bg-white bg-opacity-75 inset-0'>
				<div className='bg-white bg-opacity-75 flex flex-col justify-center min-h-screen'>
					<form onSubmit={event => handleSubmit(event, updatedUserRecipe)} className='bg-white py-10 px-8 border border-gray-200 rounded-md shadow-lg w-full mx-auto max-w-sm'>
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
		)}
	</Mutation>
);

export default EditRecipeModal;
