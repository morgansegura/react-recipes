import React from 'react';

class Signup extends React.Component {
	render() {
		return (
			<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
				<div className='w-full max-w-screen-sm border border-gray-200 rounded-md bg-white shadow-md flex flex-col'>
					<h2 className='p-4 text-lg border-b text-gray-500 border-gray-100'>Signup for a new account.</h2>
					<form className='form bg-gray-100 bg-opacity-50 flex flex-col p-8' action=''>
						<input type='text' name='username' placeholder='Username' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
						<input type='email' name='email' placeholder='Email Address' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
						<input type='pawword' name='password' placeholder='Password' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
						<input type='pawword' name='passwordConfirmation' placeholder='Confirm Password' className='w-full border border-gray-200 py-3 px-4 mb-3 rounded-md placeholder-gray-500 text-gray-700 text-sm focus:ring-blue-300 transition ease-out duration-300' />
						<div className='text-right mt-3'>
							<button type='submit' className='w-full py-3 shadow-md border border-transparent bg-green-500 text-white rounded-md hover:bg-green-400 active:bg-green-700 transition ease-out duration-300'>
								Let's Go!
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Signup;
