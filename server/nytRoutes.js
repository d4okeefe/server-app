var router = global.router
const axios = require('axios')

const api_key = 'O7qlJESoWIOLRSrMh63pU90FoTtWT8Fw'

const nyt_addresses = [
  {
    title: 'topstories',
    section: 'topstories',
    api_route: '/new-york-times/topstories',
    url_ext: 'topstories/v2/home.json',
  },
  {
    title: 'opinions',
    section: 'topstories',
    api_route: '/new-york-times/topstories/opinions',
    url_ext: 'topstories/v2/opinion.json',
  },
  {
    title: 'science',
    section: 'topstories',
    api_route: '/new-york-times/topstories/science',
    url_ext: 'topstories/v2/science.json',
  },
  {
    title: 'sports',
    section: 'topstories',
    api_route: '/new-york-times/topstories/sports',
    url_ext: 'topstories/v2/sports.json',
  },
  {
    title: 'world',
    section: 'topstories',
    api_route: '/new-york-times/topstories/world',
    url_ext: 'topstories/v2/world.json',
  },
  {
    title: 'books',
    section: 'topstories',
    api_route: '/new-york-times/topstories/books',
    url_ext: 'topstories/v2/books.json',
  },
  {
    title: 'movie reviews',
    section: 'movies',
    api_route: '/new-york-times/movie-reviews',
    url_ext: 'movies/v2/reviews/picks.json',
  },
  {
    title: 'F1',
    section: 'search',
    api_route: '/new-york-times/articlesearch/f1',
    url_ext: 'search/v2/articlesearch.json',
    query: 'Formula-1',
  },
]

const axios_nyt = axios.create({
  baseURL: `https://api.nytimes.com/svc/`,
  timeout: 30000,
})

nyt_addresses
  .filter((itm) => itm.section === 'topstories' || itm.section === 'movies')
  .forEach((itm, idx) => {
    router.get(itm.api_route, async (req, res) => {
      await axios_nyt
        .get(itm.url_ext, {
          params: {
            'api-key': api_key,
          },
        })
        .then((response) => res.json(response.data.results))
        .catch((err) => console.log(err))
    })
  })

nyt_addresses
  .filter((itm) => itm.section === 'search')
  .forEach((itm, idx) => {
    router.get(itm.api_route, async (req, res) => {
      await axios_nyt
        .get(itm.url_ext, {
          params: {
            q: itm.query,
            'api-key': api_key,
          },
        })
        .then((response) => res.json(response.data.response.docs))
        .catch((err) => console.log(err))
    })
  })

module.exports = router
