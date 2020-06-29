const { RESTDataSource } = require("apollo-datasource-rest");
const { APIFootballURL } = require("../../config/constants");

// class PersonalizationAPI extends RESTDataSource {
//     willSendRequest(request) {
//       request.headers.set('Authorization', this.context.token);
//     }
//   }

module.exports = class APIFootball extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = APIFootballURL;
  }

  async getLeagues() {
    const data = await this.get(`leagues`);
    return data.api.leagues;
  }

  async getFixturesRounds(league_id) {
    const data = await this.get(`fixtures/rounds/${league_id}`);
    return data.api.fixtures;
  }

  async getFixturesOfLeague(league_id) {
    const data = await this.get(`fixtures/league/${league_id}`);
    return data.api.fixtures;
  }
};

//   async getMostViewedMovies(limit = 10) {
//     const data = await this.get('movies', {
//       per_page: limit,
//       order_by: 'most_viewed',
//     });
//     return data.results;
//   }
// }
