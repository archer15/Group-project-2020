import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bing-news-search1.p.rapidapi.com/news',
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': process.env.VUE_APP_NEWS_API_KEY,
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
  }
})

const NewsCategory = async (params) => {
  return api.get('', {
    params
  })
}

const Search = async (params) => {
  return api.get('/search', {
    params
  })
}

export default {
  NewsCategory,
  Search
}