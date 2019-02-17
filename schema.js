const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

/*
// Hardcoded Data
const customers = [
    {id: '1', name: 'Beeple Crap', email: 'beeple@crap.xyz', age: 35},
    {id: '2', name: 'Mantissa', email: 'mantissa@crap.xyz', age: 38},
    {id: '3', name: 'Midge', email: 'Midge@crap.xyz', age: 41},
    {id: '4', name: 'Gleb', email: 'gleb@crap.xyz', age: 25}
]
*/

//CustomerType
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {


                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data)
                // for (let i = 0; i < customers.length; i++) {
                //     if (customers[i].id == args.id) {
                //         return customers[i];
                //     }
                // }

            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data)
            }
        }

    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer:{
            type: CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data)
            }
        }
    }
})


//exporting
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})



