# GQL Central
#####GraphQL central server to serve all APIs

Built as a project to learn GraphQL and also use it to serve my APIs that currently use REST.


##Installation & Usage
Just like any other node project, use npm to install it

    npm install
    
To run the development server, use nodemon

    npm run dev:server
    
this uses nodemon as a dependency. so if you dont have nodemon installed, install it globally using

    npm i -g nodemon
    
###Graphiql interface

Running the development server starts an express server on port __3000__
GraphiQL is set up on the /graphql endpoint.
Goto [localhost:3000/graphql](http://localhost:3000/graphql/) to use the interface.

