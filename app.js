// env
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './db/_db.js';

// types
import { typeDefs } from './schema/schema.js';

// resolver
const resolvers = {
    Query: {
        games(){
            return db.games
        },
        game(_, args){
            return db.games.find((game) => game.id === args.id)
        },
        reviews(){
            return db.reviews
        },
        review(_, args){
            return db.reviews.find((review) => review.id === args.id)
        },
        reviewRating(_, args){
            return db.reviews.find((review) => review.rating === args.rating && review.id === args.id)
        },
        authors(){
            return db.authors
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id)
        },
    },
    Game: {
        reviews(parent){ // for getting data from parents for related data
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Review: {
        game(parent){
            return db.games.find((g) => g.id === parent.game_id)
        },
        author(parent){
            return db.authors.find((a) => a.id === parent.author_id)
        }
    },
    Author: {
        reviews(parent){
            // console.log(parent, "coming from author")
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Mutation: {
        deleteGameByID(_, args){
            console.log(args, "Coming from mutation delete game by id")
            db.games = db.games.filter((dg) => dg.id !== args.id)
            return db.games
        },
        addNewGame(_, args){
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000)
            }
            console.log(args, "Add new games", game)
            db.games.push(game)
            return db.games
        },
        updateGame(_, args){
            db.games = db.games.map((g) => {
                if(g.id === args.id){
                    console.log(g, "edited to", args.edit)
                    return { ...g, ...args.edit}
                }
                return g
            })
            return db.games.find((g) => g.id === args.id) 
        }
    }
}

/* 
games {
    title
}
*/

// server setup
const server = new ApolloServer({
    // typeDefs (schema)
    typeDefs,
    // resolvers (function)
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT }
})

console.warn("Server running at =>",process.env.PORT)