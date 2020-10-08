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

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

// app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

// const bodyParserMiddleWare = express.json();
// app.use(bodyParserMiddleWare);

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

// app.use(corsMiddleWare());

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

// if (process.env.DELAY) {
//   app.use((req, res, next) => {
//     setTimeout(() => next(), parseInt(process.env.DELAY));
//   });
// }

/**
 *
 * authMiddleware:
 *
 * When a token is provided:
 * decrypts a jsonwebtoken to find a userId
 * queries the database to find the user with that add id
 * adds it to the request object
 * user can be accessed as req.user when handling a request
 * req.user is a sequelize User model instance
 *
 * When no or an invalid token is provided:
 * returns a 4xx reponse with an error message
 *
 * check: auth/middleware.js
 *
 * For fine grained control, import this middleware in your routers
 * and use it for specific routes
 *
 * for a demo check the following endpoints
 *
 * POST /authorized_post_request
 * GET /me
 *
 */

/**
 * Routes
 *
 * Define your routes here (now that middlewares are configured)
 */

// GET endpoint for testing purposes, can be removed
// app.get("/", (req, res) => {
//   res.send("Hi from express");
// });

// // POST endpoint for testing purposes, can be removed
// app.post("/echo", (req, res) => {
//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//   });
// });

// // POST endpoint which requires a token for testing purposes, can be removed
// app.post("/authorized_post_request", authMiddleWare, (req, res) => {
//   // accessing user that was added to req by the auth middleware
//   const user = req.user;
//   // don't send back the password hash
//   delete user.dataValues["password"];

//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//     userFoundWithToken: {
//       ...user.dataValues,
//     },
//   });
// });

// app.use("/", authRouter);

// Listen for connections on specified port (default is port 4000)

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
