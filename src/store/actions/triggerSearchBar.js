import * as types from '../mutations-types'

// trigger the Search bar whether to show it or hide it
export function triggerSearchBar ({commit}, payload) {
  commit(types.SET_SEARCH_BAR, payload)
}
