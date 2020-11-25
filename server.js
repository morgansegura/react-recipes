const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

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

// Create Graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect Schemas with GraphQL
app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress({
		schema,
		context: {
			Recipe,
			User,
		},
	}),
);

const PORT = process.env.port || 4444;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
