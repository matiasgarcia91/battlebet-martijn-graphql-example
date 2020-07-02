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
  }

  type Mutation {
    signup(userName: String!, email: String!, password: String!): Login!
    login(email: String!, password: String!): Login!
    createTournament(name: String!, LeagueId: Int!): Tournament!
    joinTournament(TournamentId: ID!): Tournament!
  }
`;

module.exports = typeDefs;
