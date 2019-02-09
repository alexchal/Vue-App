import * as firebase from 'firebase'
import * as types from '../mutations-types'

// it creates the festival and send it to Firebase
export function createFestival ({commit, getters}, payload) {
  const festival = {
    creatorFestival: payload.creatorFestival,
    title: payload.title,
    location: payload.location,
    description: payload.description,
    date: payload.date.toISOString(),
    creatorId: getters.user.id,
    likes: 0
  }
  let imageUrl, key
  firebase.database().ref('festivals').push(festival)
  .then((data) => {
    key = data.key
    return key
  })
  .then(key => {
    const filename = payload.image.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    return firebase.storage().ref('festivals' + key + '.' + ext).put(payload.image)
  })
  .then(fileData => {
    imageUrl = fileData.metadata.downloadURLs[0]
    return firebase.database().ref('festivals').child(key).update({imageUrl: imageUrl})
  })
  .then(() => {
    commit(types.SET_CREATE_FESTIVAL, {
      ...festival,
      imageUrl: imageUrl,
      id: key
    })
  })
  .catch((error) => {
    console.log(error)
  })
}
