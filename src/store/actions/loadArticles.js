import * as firebase from 'firebase'
import * as types from '../mutations-types'

// gets the articles from Firebase Api per payload.counter
export function loadMoreArticles ({commit}, payload) {
  if (payload.type === 'app') {
    commit(types.SET_LOADING, true)
  } else {
    commit(types.SET_ARTICLES_LOADING, true)
  }
  setTimeout(() => {
    firebase.database().ref('articles').limitToLast(payload.counter).once('value')
      .then((data) => {
        const articles = []
        const obj = data.val()
        for (let key in obj) {
          articles.push({
            id: key,
            author: obj[key].author,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            imageArticleIndex: obj[key].imageArticleIndex,
            creatorId: obj[key].creatorId
          })
        }

        commit(types.SET_LOADED_MORE_ARTICLES, articles)
        commit(types.SET_LOADING, false)
        commit(types.SET_ARTICLES_LOADING, false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit(types.SET_LOADING, false)
          commit(types.SET_ARTICLES_LOADING, false)
        }
      )
  }, 500)
}

// gets all the Articles from Firebase Api
export function loadArticles ({commit}) {
  commit(types.SET_LOADING, true)
  firebase.database().ref('articles').once('value')
    .then((data) => {
      const articles = []
      const obj = data.val()
      for (let key in obj) {
        articles.push({
          id: key,
          author: obj[key].author,
          title: obj[key].title,
          description: obj[key].description,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date,
          imageArticleIndex: obj[key].imageArticleIndex,
          creatorId: obj[key].creatorId
        })
      }
      commit(types.SET_LOADED_ARTICLES, articles)
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
