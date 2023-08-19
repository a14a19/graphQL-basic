export const typeDefs = `#graphql
    type Game {
        id: ID! 
        title: String!
        platform: [String!]!
        reviews: [Review!]      #for related data
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!     #for related data
        author: Author!     #for related data
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]      #for related data
    }
    type Query {
        reviews: [Review]
        review(id: ID): Review
        reviewRating(rating: Int, id: ID): Review
        games: [Game]
        game(id: ID): Game
        authors: [Author]
        author(id: ID): Author
    }
    type Mutation {
        addNewGame(game: AddGame!): [Game]  # : after this type what you want to return from function
        deleteGameByID(id: ID!): [Game]
        updateGame(id: ID!, edit: EditGame): Game
    }
    input AddGame {     #for adding new game 
        title: String!
        platform: [String!]!
    }
    input EditGame {      # for updating new game, pass id and object
        title: String
        platform: [String!]
    }
`

// ! this represent that field is required
// int, float, string, bool, ID