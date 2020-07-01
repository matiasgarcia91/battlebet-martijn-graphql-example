const { RESTDataSource } = require("apollo-datasource-rest");
const token = `Authorization=xYpbUJDFAz7atG22xgifQ7G5syB2gWY36TpdCPfS`;

module.exports = class FootballAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://data.football-api.com/v3";
  }

  async getCompetitions() {
    const data = await this.get(`competitions?${token}`);
    console.log(data);
    return data;
  }

  async getMatches(id) {
    const data = await this.get(`matches?comp_id=${id}&${token}`);
    console.log(data);
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
