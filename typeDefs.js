const  { gql } = require('apollo-server')

const typeDefs = gql`

        scalar DateTime

        type User {
                id: Int!
                name: String!
                email: String!
                createdAt: DateTime!
                updatedAt: DateTime!
                messages: [Message!]!
                chats: [Chat!]!
                replies: [Message!]!
                }

        type Chat {
                id: Int!
                createdAt: DateTime!
                updatedAt: DateTime!
                messages: [Message!]!
                users: [User!]!
                }

        type Message {
                id: Int!
                content: String!
                sentAt: DateTime!
                chat: Chat!
                user: User!
                parent: Message
                replies: [Message!]!
                }


        type Query{
             users:[User]!
             user(id:ID!):User
             chats:[Chat]!
             chat(id:ID!):Chat
             messages:[Message]!
             message(id:ID!):Message
             replies:[Message]!
        }

    type Mutation{
        createUser(name:String!, email:String!):User!
        updateUser(id:ID!, name:String!, email:String!):User!
        deleteUser(id:ID!):User!

        createChat(userIds:[Int!]!): Chat!

        createMessage(content: String!, chatId: ID!, userId: ID!, parentId: ID!): Message!
        updateMessage(id:ID!, content:String!, chatId: ID!, userId:ID!, parentId:ID!):Message!
        deleteMessage(id:ID!):Message!
    }
`

module.exports = typeDefs