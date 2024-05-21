const { PrismaClient } = require('@prisma/client');
const { parseInt } = require('lodash');
const prisma = new PrismaClient()

const resolvers = {

    Query:{
        users:async()=>{
            try{
                return await prisma.user.findMany();
            }catch(error){
                console.error('Error to Fetch user',error)
                throw new Error('Failed to fetch users')
            }
        },
        user:async(_, { id })=>{
            try{
                return await prisma.user.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch find user')
            }
        },
        chats:async()=>{
            try{
                return await prisma.user.findMany()
            }catch(error){
                console.error("Error to fetch chat",error)
                throw new Error('Failed to fetch chat')
            }
        },
        chat:async(_,{id})=>{
            try{
                return await prisma.chat.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch chat',error)
                throw new Error('Failed to fetch chat')
            }
        },
        messages:async()=>{
            try{
                return await prisma.message.findMany()
            }catch(error){
                console.error('Error to fetch messages',error)
                throw new Error('Failed to fetch messages')
            }
        },
        message:async(_,{id})=>{
            try{
                return await prisma.message.findUnique({
                    where:{id:parseInt(id)}
                })
            }catch(error){
                console.error('Error to fetch message',error);
                throw new Error('Failed to fetch message')
            }
        }
    },
     
    Mutation:{
       createUser:async(_,{name,email})=>{
        try{
            const createUser = await prisma.user.create({
                data:{
                    name:name,
                    email:email
                }
            });return createUser
        }catch(error){
            console.error('Error to create user',error);
            throw new Error('Failed to create user')
        }
       }, 
        updateUser:async(_, { id, name, email})=>{
            try {
                const updateUser = await prisma.user.update({
                    where:{id:parseInt(id)},
                    data:{
                        name:name,
                        email:email
                    }
                });return updateUser;
            }catch(error){
                console.error('Error to update users',error)
                throw new Error('Failed to update user')
            }
        },
        deleteUser:async(_,{id})=>{
            try{
                const deleteUser = await prisma.user.delete({
                    where:{id:parseInt(id)}
                });return deleteUser;
            }catch(error){
                console.error('Error to delete user',user)
                throw new Error('Failed to delete user')
            }
        },
        createChat:async(_,{userIds})=>{
            try{
                return await prisma.chat.create({
                    data:{
                        id:parseInt(userIds)
                    }
                })
            }catch(error){
                console.error('Error to create chat ',error)
                throw new Error('Failed to create chat')
            }
        },
        createMessage:async(_, { content, chatId,userId,parentId})=>{
            try{
                const createMessage = await prisma.message.create({
                    data:{
                        content:content,
                        chatId:parseInt(chatId),
                        userId:parseInt(userId),
                        parentId:parseInt(parentId)
                    }
                });return createMessage;
            }catch(error){
                console.error('Error to create message',error)
                throw new Error('Failed to create message')
            }
        },
        updateMessage:async(_,{id,content,chatId,userId,parentId})=>{
            try{
                const updateMessage = await prisma.message.update({
                    where:{id:parseInt(id)},
                    data:{
                        content:content,
                        chatId:parseInt(chatId),
                        userId:parseInt(userId),
                        parentId:parseInt(parentId)
                    }
                });
                return updateMessage;
            }catch(error){
                console.error('Error to update message',error)
                throw new Error('Failed to update message')
            }
        },
        deleteMessage:async(_,{id})=>{
            try{
                const deleteMessage = await prisma.message.delete({
                    where:{id:parseInt(id)}
                });return deleteMessage;
            }catch(error){
                console.error('Error to delete message',error)
                throw new Error('Failed to delete message')
            }
        }
    },
    User: {
        messages: async (parent) => {
          console.log(parent);
          try {
            return await prisma.message.findMany({ where: { userId: parent.id } });
          } catch (error) {
            throw new Error(`Failed to fetch messages for user with id ${parent.id}: ${error.message}`);
          }
        },
        chats: async (parent) => {
          console.log(parent)
          try {
            // return await prisma.chat.findMany({ where: { users: { some: { id: parent.id } } } });
            return await prisma.chat.findMany({where:{users:{some:{id:parent.id}}}})
          } catch (error) {
            throw new Error(`Failed to fetch chats for user with id ${parent.id}: ${error.message}`);
          }
        },
        replies: async(parent) =>{
          console.log(parent)
          try {
            return await prisma.message.findMany({where:{parentId:parent.id}})
          } catch (error) {
            throw new Error(`Failed to fetch replies for user with id ${parent.id}: ${error.message}`);
          }
        },
      },
}



module.exports = resolvers;