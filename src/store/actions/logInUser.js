import * as firebase from 'firebase'
import * as types from '../mutations-types'

// user's authentication
export function LogInUser ({commit, getters}, payload) {
  commit(types.SET_LOADING, true)
  commit(types.SET_CLEAR_ERROR)
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        commit(types.SET_LOADING, false)
        const newUser = {
          id: user.uid
        }
        commit(types.SET_USER, newUser)
      }
    )
    .catch(
      error => {
        commit(types.SET_LOADING, false)
        commit(types.SET_ERROR, error)
        console.log(error)
      }
    )
}
