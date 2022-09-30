var router = global.router
const axios = require('axios')

const axios_wired = axios.create({
  baseURL: `https://www.wired.com/feed/`,
  timeout: 30000,
})

const wired_addresses = [
  {
    title: 'business',
    api_route: '/wired/business',
    url_ext: 'category/business/latest/rss',
  },
  {
    title: 'culture',
    api_route: '/wired/culture',
    url_ext: 'category/culture/latest/rss',
  },
  {
    title: 'science',
    api_route: '/wired/science',
    url_ext: 'category/science/latest/rss',
  },
  {
    title: 'gear',
    api_route: '/wired/gear',
    url_ext: 'category/gear/latest/rss',
  },
  {
    title: 'ideas',
    api_route: '/wired/ideas',
    url_ext: 'category/ideas/latest/rss',
  },
  {
    title: 'ai',
    api_route: '/wired/ai',
    url_ext: 'tag/ai/latest/rss',
  },
  {
    title: 'security',
    api_route: '/wired/security',
    url_ext: 'category/security/latest/rss',
  },
  {
    title: 'backchannel',
    api_route: '/wired/backchannel',
    url_ext: 'category/backchannel/latest/rss',
  },
  {
    title: 'wired_guide',
    api_route: '/wired/wired-guide',
    url_ext: 'tag/wired-guide/latest/rss',
  },
]

wired_addresses.forEach((itm, idx) => {
  router.get(itm.api_route, async (req, res) => {
    await axios_wired
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
