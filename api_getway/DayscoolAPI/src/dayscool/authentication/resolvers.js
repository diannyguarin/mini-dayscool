import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
//Añadir la url correspondiente a su microservicio
const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
//Añadir las definiciones por url de las request
	Query: {
		getAllUsers: (_) =>
			getRequest(`${URL}/users`, ''),
		getUser2ByUsername: (_, {username}) =>
			generalRequest(`${URL}/getUserByUsername`, 'GET', username),
		getUser2ByMail: (_, { mail }) =>
			generalRequest(`${URL}/getUserByMail`, 'GET', mail),
	},
	Mutation: {
		createUser2: (_, { user2 }) =>
			generalRequest(`${URL}/users`, 'POST', user2),		
	}
};

export default resolvers;