import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';
import {connect} from 'mongoose';
import Note from "../models/note.js";

const MONGODB = 'mongodb+srv://ikechukwuaachom:ikeys22@cluster0.pfgcqm1.mongodb.net/?retryWrites=true&w=majority'

const typeDefs = `#graphql
    type Note{
        _id: String
        author: String
        title: String
        year: Int
    }

    input NoteInput {
        author: String
        title: String
        year: Int
    }

    type Query {
        getNote(ID: ID!): Note!
        getNotes(limit: Int): [Note]

    }

    type Mutation {
        createNote(noteInput: NoteInput): String!
        updateNote(ID: ID!, noteInput: NoteInput): String!
        deleteNote(ID: ID!): String!
    }
    



`;

const resolvers = {
    Query: {
        async getNote(_, {ID}) { 
            return await Note.findById(ID)
        },
        async getNotes(_, {limit}) { 
            return await Note.find().limit(limit)
        },
    },
    Mutation: {
        async createNote(_, {noteInput: {author, title, year}}) {
            const res = await new Note({author, title, year}).save();

            return res._id;
        },

        async updateNote(_, {ID, noteInput: {author, title, year}}) {
            await Note.updateOne({_id:ID}, { $set: {author, title, year}});

            return ID;
        },

        async deleteNote(_, {ID}){
            await Note.deleteOne({_id: ID});
            return ID;
        }

    }
}

await connect(MONGODB);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port:4000 }
});

console.log(`Server is ready at ${url}`);

