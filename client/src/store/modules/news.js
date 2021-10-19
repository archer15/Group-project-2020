import NewsAPI from '@/services/api/news.api.js'
import { DateTime } from 'luxon'

const getQueryString = payload => Object.entries(payload).map(([key, val]) => `${key}=${val}`).join('&')

const state = {
  language: 'en',
  country: 'au',
  cache: {},
  cacheExpiryMinutes: 15,
  pageSize: 25,
  safeSearch: 'Moderate'
}

const getters = {
  cache: state => state.cache,
  cacheExpiryMinutes: state => state.cacheExpiryMinutes,
  language: state => state.language,
  country: state => state.country,
  pageSize: state => state.pageSize,
  safeSearch: state => state.safeSearch
}

const mutations = {
  setCache (state, { key, query, results }) {
    if (!state.cache[key]) state.cache[key] = {}
    if (state.cache[key][query]) delete state.cache[key][query]
    state.cache[key][query] = {
      timestamp: DateTime.local().plus({ minutes: state.cacheExpiryMinutes }).toString(),
      data: results
    }
  }
}

const actions = {
  async newsCategory ({ commit, getters }, payload = {}) {
    const key = 'newsCategory'
    const params = {
      cc: getters.country,
      setLang: getters.language,
      count: getters.pageSize,
      safeSearch: getters.safeSearch,
      originalImg: 'true',
      textFormat: 'Raw',
      category: 'World',
      ...payload
    }

    const query = getQueryString(params)

    // If valid cache exists, return cached results
    const cache = getters.cache?.[key]?.[query]
    const valid = cache && DateTime.fromISO(cache.timestamp) > DateTime.local()
    if (valid) return cache.data

    // Otherwise query the API
    const response = await NewsAPI.NewsCategory(params)
    const results = response.data

    // Cache returned results based on query string for next time
    commit('setCache', { key, query, results })

    return results
  },

  async search ({ commit, getters }, payload = {}) {
    const key = 'search'
    const params = {
      cc: getters.country,
      setLang: getters.language,
      count: getters.pageSize,
      safeSearch: getters.safeSearch,
      originalImg: 'true',
      textFormat: 'Raw',
      freshness: 'Day',
      ...payload
    }

    const query = getQueryString(params)

    // If valid cache exists, return cached results
    const cache = getters.cache?.[key]?.[query]
    const valid = cache && DateTime.fromISO(cache.timestamp) > DateTime.local()
    if (valid) return cache.data

    // Otherwise query the API
    const response = await NewsAPI.Search(params)
    const results = response.data

    // Cache returned results based on query string for next time
    commit('setCache', { key, query, results })

    return results
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}