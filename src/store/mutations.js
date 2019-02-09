import * as types from './mutations-types'

export const mutations = {
  // create the festival and push it to the general loeadedFestivals array
  [types.SET_CREATE_FESTIVAL] (state, payload) {
    state.loadedFestivals.push(payload)
  },
  // loads all the festivals
  [types.SET_LOADED_FESTIVALS] (state, payload) {
    state.loadedFestivals = payload
  },
  // it saves the Api's results in the loadMoreFestivals array
  [types.SET_LOADED_MORE_FESTIVALS] (state, payload) {
    state.loadedMoreFestivals = payload
  },
  // it saves all the fesivals that the user has published
  [types.SET_LOADED_USER_FESTIVALS] (state, payload) {
    state.loadedUserFestivals = payload
  },
  // it saves some both festivals and articles randomly in an array
  [types.SET_RANDOOM_DOCUMENTS] (state) {
    const articles = state.loadedArticles
    const festivals = state.loadedFestivals
    state.randomDocuments = [
      ...festivals,
      ...articles
    ]
    let getRandomDoc = []
    const lengthDocuments = state.randomDocuments.length / 4
    for (let i = 0; i <= lengthDocuments; i++) {
      const x = state.randomDocuments[Math.floor(Math.random() * state.randomDocuments.length)]
      getRandomDoc.push(x)
    }
    state.randomDocuments = getRandomDoc
  },
  // create the festival and push it to the general loeadedFestivals array
  [types.SET_CREATE_ARTICLE] (state, payload) {
    state.loadedArticles.push(payload)
  },
  // it saves the Api's results in the loadMoreArticles array
  [types.SET_LOADED_MORE_ARTICLES] (state, payload) {
    state.loadedMoreArticles = payload
  },
  // it saves all the articles that the user has published
  [types.SET_LOADED_USER_ARTICLES] (state, payload) {
    state.loadedUserArticles = payload
  },
  // loads all the articles
  [types.SET_LOADED_ARTICLES] (state, payload) {
    state.loadedArticles = payload
  },
  // it set the User
  [types.SET_USER] (state, payload) {
    state.user = payload
  },
  // it set the loading spinner
  [types.SET_LOADING] (state, payload) {
    state.loading = payload
  },
  // it set the loading spinner for the festivals
  [types.SET_FESTIVALS_LOADING] (state, payload) {
    state.documentFestivalLoading = payload
  },
  // it set the loading spinner for the articles
  [types.SET_ARTICLES_LOADING] (state, payload) {
    state.documentArticleLoading = payload
  },
  // it set the search bar
  [types.SET_SEARCH_BAR] (state, payload) {
    state.searchBar = payload
  },
  // it set the error
  [types.SET_ERROR] (state, payload) {
    state.error = payload
  },
  // it set the clear error
  [types.SET_CLEAR_ERROR] (state) {
    state.error = null
  }

}
