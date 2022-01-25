const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id : ID!
        name: String!
        email: String!
        password: String
        dob: String!
        address: String!
    }

    type AuthUser{
        userId: ID!
        token: String!
    }

    input UserInput{
        name: String!
        email: String!
        password: String!
        dob: String!
        address: String!
    }

    type RootQuery {
        login(email: String!, password: String!) : AuthUser!
        users : [User!]!
    }

    type RootMutation {
        createUser(input : UserInput): User
    }

    schema {
        query : RootQuery
        mutation : RootMutation
    }
`);