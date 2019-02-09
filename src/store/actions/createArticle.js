import * as firebase from 'firebase'
import * as types from '../mutations-types'

// it creates the article and send it to Firebase
export function createArticle ({commit, getters}, payload) {
  const article = {
    author: payload.author,
    title: payload.title,
    location: payload.location,
    description: payload.description,
    date: payload.date.toISOString(),
    creatorId: getters.user.id,
    imageArticleIndex: Math.floor(Math.random() * 11)
  }

  let imageUrl, key
  firebase.database().ref('articles').push(article)
  .then((data) => {
    key = data.key
    return key
  })
  .then(key => {
    const filename = payload.image.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    return firebase.storage().ref('articles' + key + '.' + ext).put(payload.image)
  })
  .then(fileData => {
    imageUrl = fileData.metadata.downloadURLs[0]
    return firebase.database().ref('articles').child(key).update({imageUrl: imageUrl})
  })
  .then(() => {
    commit(types.SET_CREATE_ARTICLE, {
      ...article,
      imageUrl: imageUrl,
      id: key
    })
  })
  .catch((error) => {
    console.log(error)
  })
}
