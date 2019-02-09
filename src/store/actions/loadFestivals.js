import * as firebase from 'firebase'
import * as types from '../mutations-types'

// gets the festivals from Firebase Api per payload.counter
export function loadMoreFestivals ({commit}, payload) {
  if (payload.type === 'app') {
    commit(types.SET_LOADING, true)
  } else {
    commit(types.SET_FESTIVALS_LOADING, true)
  }
  setTimeout(() => {
    firebase.database().ref('festivals').limitToLast(payload.counter).once('value')
    .then((data) => {
      const festivals = []
      const obj = data.val()
      for (let key in obj) {
        festivals.push({
          id: key,
          creatorFestival: obj[key].creatorFestival,
          title: obj[key].title,
          description: obj[key].description,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date,
          location: obj[key].location,
          creatorId: obj[key].creatorId,
          likes: obj[key].likes
        })
      }
      commit(types.SET_LOADED_MORE_FESTIVALS, festivals)
      commit(types.SET_LOADING, false)
      commit(types.SET_FESTIVALS_LOADING, false)
    })
    .catch(
      (error) => {
        console.log(error)
        commit(types.SET_LOADING, false)
        commit(types.SET_FESTIVALS_LOADING, false)
      }
    )
  }, 500)
}

// gets all the Festivals from Firebase Api
export function loadFestivals ({commit}, payload) {
  commit(types.SET_LOADING, true)
  firebase.database().ref('festivals').once('value')
  .then((data) => {
    const festivals = []
    const obj = data.val()
    for (let key in obj) {
      festivals.push({
        id: key,
        creatorFestival: obj[key].creatorFestival,
        title: obj[key].title,
        description: obj[key].description,
        imageUrl: obj[key].imageUrl,
        date: obj[key].date,
        location: obj[key].location,
        creatorId: obj[key].creatorId,
        likes: obj[key].likes
      })
    }
    commit(types.SET_LOADED_FESTIVALS, festivals)
    commit(types.SET_RANDOOM_DOCUMENTS)
    commit(types.SET_LOADING, false)
  })
  .catch(
    (error) => {
      console.log(error)
      commit(types.SET_LOADING, false)
    }
  )
}

