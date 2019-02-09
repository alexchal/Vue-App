export const getters = {
  loadedFestivals (state) {
    return state.loadedFestivals.sort((festivalA, festivalB) => {
      return festivalA.date < festivalB.date
    })
  },
  loadedMoreFestivals (state) {
    return state.loadedMoreFestivals.sort((festivalA, festivalB) => {
      return festivalA.date < festivalB.date
    })
  },
  loadedUserFestivals (state) {
    return state.loadedUserFestivals
  },
  featuredFestivals (state, getters) {
    return getters.loadedFestivals.slice(0, 30)
  },
  featuredMoreFestivals (state, getters) {
    return getters.loadedMoreFestivals
  },
  loadedFestival (state) {
    return (festivalId) => {
      return state.loadedFestivals.find(festival => {
        return festival.id === festivalId
      })
    }
  },
  loadedArticles (state) {
    return state.loadedArticles.sort((articleA, articleB) => {
      return articleA.date < articleB.date
    })
  },
  loadedMoreArticles (state) {
    return state.loadedMoreArticles.sort((articleA, articleB) => {
      return articleA.date < articleB.date
    })
  },
  loadedUserArticles (state) {
    return state.loadedUserArticles
  },
  featuredArticles (state, getters) {
    return getters.loadedArticles.slice(0, 30)
  },
  featuredMoreArticles (state, getters) {
    return getters.loadedMoreArticles
  },
  loadedArticle (state) {
    return (articleId) => {
      return state.loadedArticles.find((article) => {
        return article.id === articleId
      })
    }
  },
  randomDocuments (state) {
    return state.randomDocuments.sort((randomDocumentA, randomDocumentB) => {
      return randomDocumentA.date < randomDocumentB.date
    })
  },
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  documentFestivalsLoading (state) {
    return state.documentFestivalLoading
  },
  documentArticlesLoading (state) {
    return state.documentArticleLoading
  },
  searchBar (state) {
    return state.searchBar.active
  },
  error (state) {
    return state.error
  }
}
