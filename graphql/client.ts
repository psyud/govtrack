import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default new ApolloClient({ 
    uri: publicRuntimeConfig.SUBGRAPH_API, 
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache'
        }
    }
});