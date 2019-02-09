import * as types from '../mutations-types'

// it loads the festivals that the user has published
export function loadUserFestivals ({commit, getters}) {
  const userFestivals = getters.loadedFestivals.filter(loadedFestival => {
    if (getters.user.id === loadedFestival.creatorId) {
      return loadedFestival
    }
    return false
  })

  commit(types.SET_LOADED_USER_FESTIVALS, userFestivals)
}
