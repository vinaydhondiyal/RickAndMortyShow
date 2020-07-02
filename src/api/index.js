
import ApolloClient from 'apollo-boost';
import {URL_ENDPOINT} from "./config";

//Apollo Client setup
const client = new ApolloClient({
    uri:URL_ENDPOINT,
});

export default client;