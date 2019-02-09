import * as types from '../mutations-types'

// it loads the articles that the user has published
export function loadUserArticles ({commit, getters}) {
  const userArticles = getters.loadedArticles.filter(loadedArticle => {
    if (getters.user.id === loadedArticle.creatorId) {
      return loadedArticle
    }
    return false
  })
  commit(types.SET_LOADED_USER_ARTICLES, userArticles)
}
