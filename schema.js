const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type League {
    league_id: ID!
    name: String!
    type: String
    country: String!
    season: Int
  }

  type Team {
    team_id: ID!
    team_name: String
    logo: String
  }

  type Score {
    halftime: String
    fulltime: String
    extratime: String
    penalty: String
  }

  type Fixture {
    fixture_id: ID!
    league_id: ID!
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
  }

  type Competition {
    id: ID!
    name: String
    region: String
  }

  type Tournament {
    id: ID!
    name: String!
    AdminId: ID!
    User: User
    createdAt: Date
  }

  type SuccesJoinTournament {
    message: String!
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
    playergroup(TournamentId: ID!): PlayerGroup
    users: [User]
    checkToken: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): Login!
    login(email: String!, password: String!): Login!
    createTournament(name: String!): Tournament!
    joinTournament(TournamentId: Int!): SuccesJoinTournament!
  }
`;

module.exports = typeDefs;
