import * as types from '../mutations-types'

export function deleteArticle ({commit, state, getters}, payload) {
  // remove from the Userfestivals the deleted festival
  const getFinalArticles = getters.loadedUserArticles.filter(el => {
    return el.id !== payload
  })

  // remove from all the festivals the deleted festival
  state.loadedArticles = state.loadedArticles.filter(el => {
    return el.id !== payload
  })

  commit(types.SET_LOADED_USER_ARTICLES, getFinalArticles)
}
