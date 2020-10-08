const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const APIFootball = require("./APIs/api-football/api-football");
const User = require("./models").User;
const db = require("./models");
const { PORT, APIFootballURL } = require("./config/constants");
const { toData } = require("./auth/jwt");
const FootballAPI = require("./APIs/football-api/FootballApi");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { apiFootball: new APIFootball(), footballApi: new FootballAPI() };
  },
  context: ({ req }) => {
    // // { req }
    // {
    //   const auth =
    //     req.headers.authorization && req.headers.authorization.split(" ");
    //   if (!auth) return { db };
    //   const token = auth[1];
    //   try {
    //     const jwtdata = toData(token);
    //     const user = User.findOne({ where: { id: jwtdata.usrId } });
    //     return {
    //       db,
    //       user,
    //     };
    //   } catch (e) {
    //     console.log(e);
    return { db, req };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
