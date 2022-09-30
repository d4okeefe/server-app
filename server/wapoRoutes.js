var router = global.router
const axios = require('axios')

const wapo_addresses = [
  {
    title: 'politics',
    api_route: '/washington-post/politics',
    url_ext: 'politics',
  },
  {
    title: 'opinions',
    api_route: '/washington-post/opinions',
    url_ext: 'opinions',
  },
  {
    title: 'local',
    api_route: '/washington-post/local',
    url_ext: 'local',
  },
  {
    title: 'sports',
    api_route: '/washington-post/sports',
    url_ext: 'sports',
  },
  {
    title: 'technology',
    api_route: '/washington-post/business/technology',
    url_ext: 'business/technology',
  },
  {
    title: 'national',
    api_route: '/washington-post/national',
    url_ext: 'national',
  },
  {
    title: 'world',
    api_route: '/washington-post/world',
    url_ext: 'world',
  },
  {
    title: 'business',
    api_route: '/washington-post/business',
    url_ext: 'business',
  },
  {
    title: 'lifestyle',
    api_route: '/washington-post/lifestyle',
    url_ext: 'lifestyle',
  },
  {
    title: 'entertainment',
    api_route: '/washington-post/entertainment',
    url_ext: 'entertainment',
  },
]

const axios_wapo = axios.create({
  baseURL: `https://feeds.washingtonpost.com/rss/`,
  timeout: 30000,
})

wapo_addresses.forEach((itm, idx) => {
  router.get(itm.api_route, async (req, res) => {
    await axios_wapo
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
