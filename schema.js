const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    userName: String!
    email: String!
    avatar: String!
  }

  type League {
    id: ID
    league_id: ID
    name: String!
    Teams: [Team]
    Fixtures: [Fixture]
    type: String
    country: String
    season: Int
  }

  type Team {
    id: ID!
    name: String
    logo: String
  }

  type Score {
    halftime: String
    fulltime: String
    extratime: String
    penalty: String
  }

  type Fixture {
    id: ID!
    LeagueId: ID!
    league: League
    event_date: String
    homeTeam: Team
    awayTeam: Team
    status: String
    statusShort: String
    venue: String
    referee: String
    goalsHomeTeam: Int
    goalsAwayTeam: Int
    score: Score
    date: Date
    HTScoreTeam1: Int
    HTScoreTeam2: Int
    FTScoreTeam1: Int
    FTScoreTeam2: Int
    winnerTeam: Team
  }

  type Competition {
    id: ID!
    name: String
    region: String
  }

  type Tournament {
    id: ID!
    name: String!
    User: User
    createdAt: Date
    PlayerGroup: PlayerGroup
    League: League
    Rounds: [Round]
  }

  type Round {
    id: ID!
    TournamentId: ID!
    type: String
    createdAt: Date
    Matches: [Match]
  }

  type Match {
    id: ID!
    player1User: User
    player2User: User
    winnerUser: User
    FixtureId: Int
    scorePlayer1: Int
    scorePlayer2: Int
    date: Date
    predictionPlayer1: Prediction
    predictionPlayer2: Prediction
    Fixture: Fixture
  }

  type Prediction {
    id: ID!
    UserId: Int
    HTScoreTeam1: Int
    HTScoreTeam2: Int
    FTScoreTeam1: Int
    FTScoreTeam2: Int
    winner: Int
  }

  type Login {
    token: String!
    user: User!
  }

  type PlayerGroup {
    id: ID!
    TournamentId: ID!
    Users: [User]
  }

  type Query {
    user(id: ID!): User
    leagues: [League]
    fixturesByLeague(league_id: Int): [Fixture]
    competitions: [Competition]
    readError: String
    apolloError: String
    tournaments: [Tournament]
    tournament(TournamentId: ID!): Tournament
    playergroup(TournamentId: ID!): PlayerGroup
    users: [User]
    checkToken: User
    match(id: ID!): Match
  }

  type Mutation {
    signup(userName: String!, email: String!, password: String!): Login!
    login(email: String!, password: String!): Login!
    createTournament(name: String!, LeagueId: Int!): Tournament!
    joinTournament(TournamentId: ID!): Tournament!
    startTournament(TournamentId: ID!): Tournament!
    calculateResults(id: Int!): Match
    createPrediction(
      MatchId: Int!
      HTScoreTeam1: Int!
      HTScoreTeam2: Int!
      FTScoreTeam1: Int!
      FTScoreTeam2: Int!
      winner: Int!
    ): Prediction!
    fixtureEvent(
      id: Int!
      HTScoreTeam1: Int
      HTScoreTeam2: Int
      FTScoreTeam1: Int
      FTScoreTeam2: Int
      status: String
      winner: Int
    ): Fixture
  }

  type Subscription {
    liveFixtureEvent: Fixture
  }
`;

module.exports = typeDefs;
