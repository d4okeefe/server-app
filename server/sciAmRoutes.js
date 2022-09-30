var router = global.router
const axios = require('axios')

const axios_sci_am = axios.create({
  baseURL: `http://rss.sciam.com/`,
  timeout: 30000,
})

const sci_am_addresses = [
  {
    title: 'news',
    api_route: '/scientific-american/news',
    url_ext: 'ScientificAmerican-Global',
  },
  {
    title: 'science',
    api_route: '/scientific-american/science',
    url_ext: 'basic-science',
  },
  {
    title: 'mind',
    api_route: '/scientific-american/mind',
    url_ext: 'sciam/mind-and-brain',
  },
  {
    title: 'health',
    api_route: '/scientific-american/health',
    url_ext: 'sciam/health-and-medicine',
  },
  {
    title: 'tech',
    api_route: '/scientific-american/tech',
    url_ext: 'sciam/technology',
  },
]

sci_am_addresses.forEach((itm, idx) => {
  router.get(itm.api_route, async (req, res) => {
    await axios_sci_am
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

// // NEWS
// router.get(sci_am_addresses.news.api_route, async (req, res) => {
//   await axios_sci_am
//     .get(sci_am_addresses.news.url_ext)
//     .then((response) => {
//       res_json_sci_am(response.data, res)
//     })
//     .catch((err) => console.log(err))
// })

// // SCIENCE
// router.get(sci_am_addresses.science.api_route, async (req, res) => {
//   await axios_sci_am
//     .get(sci_am_addresses.science.url_ext)
//     .then((response) => {
//       res_json_sci_am(response.data, res)
//     })
//     .catch((err) => console.log(err))
// })

// // MIND
// router.get(sci_am_addresses.mind.api_route, async (req, res) => {
//   await axios_sci_am
//     .get(sci_am_addresses.mind.url_ext)
//     .then((response) => {
//       res_json_sci_am(response.data, res)
//     })
//     .catch((err) => console.log(err))
// })

// // HEALTH
// router.get(sci_am_addresses.health.api_route, async (req, res) => {
//   await axios_sci_am
//     .get(sci_am_addresses.health.url_ext)
//     .then((response) => {
//       res_json_sci_am(response.data, res)
//     })
//     .catch((err) => console.log(err))
// })

module.exports = router
