import { ApolloClient, InMemoryCache } from "@apollo/client";
import dotenv from 'dotenv';
dotenv.config();

export default new ApolloClient({ 
    uri: process.env.SUBGRAPH_API, 
    cache: new InMemoryCache()
});