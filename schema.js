const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


// Hardcoded Data
const customers = [
    {id: '1', name: 'Beeple Crap', email: 'beeple@crap.xyz', age: 35},
    {id: '2', name: 'Mantissa', email: 'mantissa@crap.xyz', age: 38},
    {id: '3', name: 'Midge', email: 'Midge@crap.xyz', age: 41},
    {id: '4', name: 'Gleb', email: 'gleb@crap.xyz', age: 25}
]


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
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id == args.id) {
                        return customers[i];
                    }
                }

            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers
            }
        }

    }
})


//exporting
module.exports = new GraphQLSchema({
    query: RootQuery
})