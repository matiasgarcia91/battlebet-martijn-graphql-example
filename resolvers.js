const { ApolloError, AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./config/constants");
const { toJWT, toData } = require("./auth/jwt");
const User = require("./models").User;

async function CheckAuth(req) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !auth[0] === "Bearer" || !auth[1])
    throw new AuthenticationError(
      "This endpoint requires an Authorization header with a valid token"
    );

  try {
    const data = toData(auth[1]);
    const user = await User.findByPk(data.usrId);
    if (!user) {
      throw new AuthenticationError("User does not exist");
    }
    return user.dataValues;
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);
    switch (error.name) {
      case "TokenExpiredError":
        throw new ApolloError(error.message, 401);
      case "JsonWebTokenError":
        throw new ApolloError(error.message, 400);
      default:
        throw new ApolloError("Something went wrong, sorry", 400);
    }
  }
}

const FIXTURE_EVENT = "FIXTURE_EVENT";

module.exports = {
  Subscription: {
    liveFixtureEvent: {
      subscribe: () => pubsub.asyncIterator([FIXTURE_EVENT]),
    },
  },
  Query: {
    readError: (parent, args, context) => {
      fs.readFileSync("/does/not/exist");
    },
    apolloError: (parent, args, context) => {
      throw new ApolloError();
    },
    checkToken: async (parent, _args, { req }, info) => {
      const user = await CheckAuth(req);
      return user;
    },
    user(parent, { id }, { db }, info) {
      return db.User.findByPk(id);
    },
    leagues: async (_source, _args, { dataSources, db }, info) => {
      const api2Leagues = await dataSources.footballApi.getCompetitions();
      const dbLeagues = await db.League.findAll();
      return [...dbLeagues, ...api2Leagues];
    },
    fixturesByLeague: async (_source, { league_id }, { dataSources }) => {
      return dataSources.apiFootball.getFixturesOfLeague(league_id);
    },
    tournaments: async (parent, _args, { db }, info) => {
      return db.Tournament.findAll({
        include: [
          { model: db.User },
          { model: db.League },
          { model: db.PlayerGroup, include: [{ model: db.User }] },
        ],
      });
    },

    tournament: async (parent, { TournamentId }, { db }, info) => {
      return db.Tournament.findOne({
        where: { id: TournamentId },
        include: [
          { model: db.User },
          {
            model: db.Round,
            include: [
              {
                model: db.Match,
                include: [
                  { model: db.User, as: "player1User" },
                  { model: db.User, as: "player2User" },
                  { model: db.User, as: "winnerUser" },
                ],
              },
            ],
          },
          {
            model: db.League,
            include: [
              { model: db.Team },
              {
                model: db.Fixture,
                include: [
                  { model: db.Team, as: "homeTeam" },
                  { model: db.Team, as: "awayTeam" },
                  { model: db.Team, as: "winnerTeam" },
                ],
              },
            ],
          },
          { model: db.PlayerGroup, include: [{ model: db.User }] },
        ],
      });
    },
    match: async (parent, { id }, { db }, info) => {
      return db.Match.findOne({
        where: { id },
        include: [
          { model: db.User, as: "player1User" },
          { model: db.User, as: "player2User" },
          { model: db.User, as: "winnerUser" },
          { model: db.Prediction, as: "predictionPlayer1" },
          { model: db.Prediction, as: "predictionPlayer2" },
          {
            model: db.Fixture,
            include: [
              { model: db.Team, as: "homeTeam" },
              { model: db.Team, as: "awayTeam" },
              { model: db.Team, as: "winnerTeam" },
            ],
          },
        ],
      });
    },
    playergroup: async (parent, { TournamentId }, { db }, info) => {
      return db.PlayerGroup.findOne({
        where: { TournamentId },
        include: [{ model: db.User }],
      });
    },
  },
  Mutation: {
    signup: async (parent, { userName, email, password }, { db }, info) => {
      const user = await db.User.create({
        userName: userName,
        email: email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        avatar: "https://i.imgur.com/m0pGSHF.png",
      });
      delete user.dataValues["password"];
      const token = toJWT({ usrId: user.dataValues.id });
      return { token, user: user.dataValues };
    },
    login: async (parent, { email, password }, { db }, info) => {
      const usr = await db.User.findOne({ where: { email } });
      if (!usr) return new ApolloError("User with that email not found", 400);
      if (!bcrypt.compareSync(password, usr.password))
        return new ApolloError("Password incorrect", 400);
      delete usr.dataValues["password"]; // don't send back the password hash
      const token = toJWT({ usrId: usr.id });
      return { token, user: usr.dataValues };
    },
    createTournament: async (parent, { name, LeagueId }, { db, req }, info) => {
      const usr = await CheckAuth(req);
      const tourn = await db.Tournament.create({
        name,
        UserId: usr.id,
        LeagueId,
      });
      if (!tourn) return new ApolloError("Tournament not created", 400);
      const plyrgr = await db.PlayerGroup.create({
        TournamentId: tourn.dataValues.id,
      });
      if (plyrgr)
        db.UsersPlayerGroup.create({
          PlayerGroupId: plyrgr.dataValues.id,
          UserId: usr.id,
        });
      return tourn;
    },
    joinTournament: async (parent, { TournamentId }, { db, req }, info) => {
      const usr = await CheckAuth(req);
      const plyrgr = await db.PlayerGroup.findOne({
        where: { TournamentId },
        include: [{ model: db.User }],
      });
      if (!plyrgr) return new ApolloError("Player Group not found", 400);
      console.log(plyrgr);
      if (plyrgr.dataValues.Users.map((plyr) => plyr.id).includes(usr.id))
        return new ApolloError("You are already in this tournament", 400);
      const addPlayer = await db.UsersPlayerGroup.create({
        UserId: usr.id,
        PlayerGroupId: plyrgr.dataValues.id,
      });
      if (addPlayer) {
        return db.Tournament.findOne({
          where: { id: TournamentId },
          include: [
            { model: db.User },
            { model: db.PlayerGroup, include: [{ model: db.User }] },
          ],
        });
      }
      return new ApolloError("Something went wrong", 400);
    },
    startTournament: async (parent, { TournamentId }, { db, req }, info) => {
      const usr = await CheckAuth(req);
      let tour = await db.Tournament.findOne({
        where: { id: TournamentId },
        include: [
          { model: db.User },
          { model: db.League, include: [{ model: db.Fixture }] },
          { model: db.PlayerGroup, include: [{ model: db.User }] },
        ],
      });
      tour = tour.get({ plain: true });
      if (!tour) return new ApolloError("Tournament not found", 400);
      if (tour.User.id !== usr.id)
        return new ApolloError("You're not the admin of this tournament", 400);
      if (tour.PlayerGroup.Users.length < 8)
        return new ApolloError(
          "Not enough players to start yet, you need eight",
          400
        );
      let qf = await db.Round.create({ TournamentId, type: "Quarter-Final" });
      qf = qf.get({ plain: true });
      let matches = [];
      for (let index = 0; index < 4; index++) {
        let a = 0 + index;
        let b = 7 - index;
        let data = await db.Match.create({
          RoundId: qf.id,
          player1: tour.PlayerGroup.Users[a].id,
          player2: tour.PlayerGroup.Users[b].id,
          FixtureId: tour.League.Fixtures[index].id,
          date: tour.League.Fixtures[index].date,
        });
        matches[index] = data.get({ plain: true });
      }
      if (matches.length < 4)
        return new ApolloError("Something went very wrong", 400);
      return tour;
    },
    fixtureEvent: async (
      parent,
      {
        id,
        HTScoreTeam1,
        HTScoreTeam2,
        FTScoreTeam1,
        FTScoreTeam2,
        status,
        winner,
      },
      { db },
      info
    ) => {
      let fix = db.Fixture.findByPk(id);
      fix.HTScoreTeam1 = HTScoreTeam1;
      fix.HTScoreTeam2 = HTScoreTeam2;
      fix.FTScoreTeam1 = FTScoreTeam1;
      fix.FTScoreTeam2 = FTScoreTeam2;
      fix.status = status;
      fix.winner = winner;
      pubsub.publish(FIXTURE_EVENT, { liveFixtureEvent: fix });
      return fix.save();
    },
    calculateResults: async (parent, { id }, { db }, info) => {
      const match = await db.Match.findOne({
        where: { id },
        include: [
          { model: db.Prediction, as: "predictionPlayer1" },
          { model: db.Prediction, as: "predictionPlayer2" },
          { model: db.Fixture },
        ],
      });
      let scorePlayer1 = 0;
      let scorePlayer2 = 0;

      if (
        match.dataValues.predictionPlayer1.HTScoreTeam1 ==
        match.dataValues.Fixture.HTScoreTeam1
      )
        scorePlayer1 + 1;
      if (
        match.dataValues.predictionPlayer1.HTScoreTeam2 ==
        match.dataValues.Fixture.HTScoreTeam2
      )
        scorePlayer1 + 1;
      if (
        match.dataValues.predictionPlayer1.FTScoreTeam1 ==
        match.dataValues.Fixture.FTScoreTeam1
      )
        scorePlayer1 + 1;
      if (
        match.dataValues.predictionPlayer1.FTScoreTeam2 ==
        match.dataValues.Fixture.FTScoreTeam2
      )
        scorePlayer1 + 1;
      if (
        match.dataValues.predictionPlayer1.winner ==
        match.dataValues.Fixture.winner
      )
        scorePlayer1 + 1;
      if (
        match.dataValues.predictionPlayer1.HTScoreTeam1 ==
        match.dataValues.Fixture.HTScoreTeam1
      )
        scorePlayer2 + 1;
      if (
        match.dataValues.predictionPlayer1.HTScoreTeam2 ==
        match.dataValues.Fixture.HTScoreTeam2
      )
        scorePlayer2 + 1;
      if (
        match.dataValues.predictionPlayer1.FTScoreTeam1 ==
        match.dataValues.Fixture.FTScoreTeam1
      )
        scorePlayer2 + 1;
      if (
        match.dataValues.predictionPlayer1.FTScoreTeam2 ==
        match.dataValues.Fixture.FTScoreTeam2
      )
        scorePlayer2 + 1;
      if (
        match.dataValues.predictionPlayer1.winner ==
        match.dataValues.Fixture.winner
      )
        scorePlayer2 + 1;
      console.log(scorePlayer2);
      match.scorePlayer1 = scorePlayer1;
      match.scorePlayer2 = scorePlayer2;
      match.winner =
        scorePlayer1 > scorePlayer2
          ? match.dataValues.player1
          : match.dataValues.player2;
      return match.save();
    },
    createPrediction: async (
      parent,
      {
        MatchId,
        HTScoreTeam1,
        HTScoreTeam2,
        FTScoreTeam1,
        FTScoreTeam2,
        winner,
      },
      { db, req },
      info
    ) => {
      const usr = await CheckAuth(req);
      let match = await db.Match.findByPk(MatchId, {
        include: [
          { model: db.User, as: "player1User" },
          { model: db.User, as: "player2User" },
        ],
      });
      let prediction = await db.Prediction.create({
        UserId: usr.id,
        HTScoreTeam1,
        HTScoreTeam2,
        FTScoreTeam1,
        FTScoreTeam2,
        winner,
      });
      if (match.dataValues.player1User.id == usr.id)
        match.predPlayer1 = prediction.dataValues.id;
      if (match.dataValues.player2User.id == usr.id)
        match.predPlayer2 = prediction.dataValues.id;
      await match.save();

      return prediction;
    },
  },
};
