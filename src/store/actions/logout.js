import * as firebase from 'firebase'
import * as types from '../mutations-types'

export function logout ({commit}) {
  firebase.auth().signOut()
  commit(types.SET_USER, null)
}
