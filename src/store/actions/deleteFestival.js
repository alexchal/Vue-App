import * as types from '../mutations-types'

export function deleteFestival ({commit, state, getters}, payload) {
  // remove from the Userfestivals the deleted festival
  const getFinalFestivals = getters.loadedUserFestivals.filter(el => {
    return el.id !== payload
  })

  // remove from all the festivals the deleted festival
  state.loadedFestivals = state.loadedFestivals.filter(el => {
    return el.id !== payload
  })

  commit(types.SET_LOADED_USER_FESTIVALS, getFinalFestivals)
}
