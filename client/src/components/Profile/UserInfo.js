import React from 'react';
import { link } from 'react-router-dom';

const formatDate = date => {
	const newDate = new Date(date).toLocaleDateString('en-US');
	const newTime = new Date(date).toLocaleTimeString('en-US');
	return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
	<div>
		<h2 className='mb-4 text-2xl font-bold inline-block border-b border-gray-800'>User Profile</h2>
		<p>Username: {session.getCurrentUser.username}</p>
		<p>Email: {session.getCurrentUser.email}</p>
		<p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>

		<ul>
			<h3>{session.getCurrentUser.username}'s Favorites</h3>
			{session.getCurrentUser.favorites.map(favorite => (
				<li key={favorite._id}>
					<p>{favorite.name}</p>
				</li>
			))}
			{!session.getCurrentUser.favorites.length && <p>You have no favorites. Go add some!</p>}
		</ul>
	</div>
);

export default UserInfo;
