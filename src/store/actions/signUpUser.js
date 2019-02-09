import * as firebase from 'firebase'
import * as types from '../mutations-types'

// it creates User with the createUserWithEmailAndPassword method
export function signUpUser ({commit}, payload) {
  commit(types.SET_LOADING, true)
  commit(types.SET_CLEAR_ERROR)
  firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
