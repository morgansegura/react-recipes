import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';

const Profile = ({ session }) => (
	<div className='min-h-screen bg-blue-300'>
		<div className='py-20 px-8 max-w-6xl mx-auto'>
			<UserInfo session={session} />
			<UserRecipes username={session.getCurrentUser.username} />
		</div>
	</div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
