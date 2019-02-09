import * as types from '../mutations-types'

// keep the user when he refresh the page and he didnt log out
export function autoLogIn ({commit}, payload) {
  commit(types.SET_USER, {
    id: payload.uid
  })
}
