// Definir el objeto que van a usar y los campos necesarios para crearlo
export const authenticationTypeDef = `
  type User2 {
      id: Int!
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }
  input User2Input {
      username: String!
      mail: String!
      birthDate: String!
      career: String!
      role: String!
      name: String!
      password: String!
  }`;

//Definir las consultas del objeto (solo GET)
export const authenticationQueries = `
  getAllUsers: [User2]!  
  getUser2ByUsername(username:String!): User2!
  getUser2ByMail(mail:String!): User2!
  `;
//Definir las mutaciones (POST PUT Y DELETE) 
export const authenticationMutations = `
  createUser2(user2: User2Input!): User2!
`;





