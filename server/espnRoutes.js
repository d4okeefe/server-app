var router = global.router
const axios = require('axios')

const espn_addresses = [
  {
    title: 'mlb',
    api_route: '/espn/mlb',
    url_ext: 'mlb/news',
  },
  {
    title: 'f1',
    api_route: '/espn/f1',
    url_ext: 'f1/news',
  },
  {
    title: 'nba',
    api_route: '/espn/nba',
    url_ext: 'nba/news',
  },
  {
    title: 'tennis',
    api_route: '/espn/tennis',
    url_ext: 'tennis/news',
  },
  {
    title: 'soccer',
    api_route: '/espn/soccer',
    url_ext: 'soccer/news',
  },
  {
    title: 'nfl',
    api_route: '/espn/nfl',
    url_ext: 'nfl/news',
  },
]

const axios_espn = axios.create({
  baseURL: `https://www.espn.com/espn/rss/`,
  timeout: 30000,
})

espn_addresses.forEach((itm, idx) => {
  router.get(itm.api_route, async (req, res) => {
    await axios_espn
      .get(itm.url_ext)
      .then((response) => {
        var parseString = require('xml2js').parseString
        parseString(response.data, function (err, result) {
          const extractedData = result['rss']['channel'][0]
          // console.log(extractedData)
          res.json(extractedData)
        })
      })
      .catch((err) => console.log(err))
  })
})

module.exports = router
