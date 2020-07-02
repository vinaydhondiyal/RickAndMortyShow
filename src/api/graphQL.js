import {gql} from 'apollo-boost';
let gqlQuery =function(page = 1, filter='{}'){
    let results = gql`{characters(
            page:${page}
            filter: ${filter}
            ){
                info{count}
                results{
                id
                status
                name
                species
                type
                gender
                origin{name}
                location{name}
                image
                created
                }
            }
        }`;
        console.log(results);
        return  results;
};

export default gqlQuery;