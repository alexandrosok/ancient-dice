import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {Sequelize} from 'sequelize-typescript';
import userResolvers from './resolvers/User.resolver';
import betResolvers from './resolvers/Bet.resolver';
import bodyParser from "body-parser";
import {User} from './models/User.model';
import {Bet} from './models/Bet.model';

(async () => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './dice-bet.sqlite',
        host: '127.0.0.1',
    });
    await sequelize.addModels([User, Bet]);
    await sequelize.sync({force: true});

    const server = new ApolloServer({
        typeDefs: gql`
    ${require('fs').readFileSync('./src/schemas/User.schema.graphql').toString()}
    ${require('fs').readFileSync('./src/schemas/Bet.schema.graphql').toString()}
  `,
        resolvers: [userResolvers, betResolvers],
    });

    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    await server.start()
    server.applyMiddleware({app})

    app.listen({port: 4000}, () => {
        console.log(` No sign of life did flicker In floods of tears she cried, \n
            Server running at http://localhost:4000${server.graphqlPath}`);
    });

})();



