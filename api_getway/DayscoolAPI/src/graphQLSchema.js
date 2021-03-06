import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import { //User
	userTypeDef,
	userQueries,	
	userMutations,
} from './dayscool/users/typeDefs';

import { //Activities
	activitiesTypeDef,
	activitiesQueries,	
	activitiesMutations,
} from './dayscool/activities/typeDefs';

import { //Authentication
	authenticationTypeDef,
	authenticationQueries,	
	authenticationMutations,
} from './dayscool/authentication/typeDefs';


import{ //Messages
	conversationTypeDef,
	conversationQueries,
	conversationMutations,
	messageTypeDef
} from './dayscool/messages/typeDefs';

import { // ABAC
	roleTypeDef,
	microserviceTypeDef,
	requestTypeDef,
	permissionTypeDef,
	roleQueries,
	roleMutations,
	microserviceQueries,
	microserviceMutations,
	requestQueries,
	requestMutations,
	permissionQueries,
	permissionMutations
} from './dayscool/abac/typeDefs';

import { // Curso
	cursoTypeDef,
	reunionTypeDef,
	alumnosTypeDef,
	cursoQueries,
	cursoMutations
} from './dayscool/curso/typeDefs'
import { // Notification
	notificationMutations,
	notificationQueries,
	notificationTypeDef
} from './dayscool/notification/typeDefs';

import userResolvers from './dayscool/users/resolvers';
import messageResolvers from './dayscool/messages/resolvers';
import abacResolvers from './dayscool/abac/resolvers';
import cursoResolvers from './dayscool/curso/resolvers'
import notificationResolvers from './dayscool/notification/resolvers';
import activitiesResolvers from './dayscool/activities/resolvers';
import authenticationResolvers from './dayscool/authentication/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef,
		activitiesTypeDef,
		authenticationTypeDef,		
		conversationTypeDef,
		messageTypeDef,
		roleTypeDef,
		microserviceTypeDef,
		requestTypeDef,
		permissionTypeDef,
		cursoTypeDef,
		alumnosTypeDef,
		reunionTypeDef,
		notificationTypeDef
	],
	[
		userQueries,
		activitiesQueries,
		authenticationQueries,
		conversationQueries,
		roleQueries,
		microserviceQueries,
		requestQueries,
		permissionQueries,
		cursoQueries,
		notificationQueries
	],
	[	
		userMutations,
		activitiesMutations,
		authenticationMutations,		
		conversationMutations,
		roleMutations,
		microserviceMutations,
		requestMutations,
		permissionMutations,
		cursoMutations,
		notificationMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		userResolvers,
		activitiesResolvers,
		authenticationResolvers,		
		messageResolvers,
		abacResolvers,
		cursoResolvers,
		notificationResolvers

	)
});
