const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const { ApolloServer, gql } = require('apollo-server-express');
// const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Connect to DB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB Connected'))
	.catch(err => console.error(err));

// Initalize the app
const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(cors(corsOptions));

// Setup JWT auth middleware
app.use(async (req, res, next) => {
	const token = req.headers['authorization'];
	if (token !== 'null') {
		try {
			const currentUser = await jwt.verify(token, process.env.SECRET);
			req.currentUser = currentUser;
		} catch (err) {
			// console.error(err);
		}
	}
	next();
});

// Create Graphiql application
const schema = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req: { currentUser } }) => ({
		Recipe,
		User,
		currentUser,
	}),
	playgroud: {
		endpoint: '/graphql',
		setting: {
			'editor.theme': 'light',
		},
	},
});

// Apply Middleware
schema.applyMiddleware({
	app,
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
