import Firebase from 'firebase'

export const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAHNeXmugtyC7vUchZ8mLKOzu-1eVP3hbU',
  authDomain: process.env.FirebaseAuthDomain,
  databaseURL: 'https://vue-project-4463a.firebaseio.com',
  projectId: process.env.FirebaseProjectId,
  storageBucket: 'vue-project-4463a.appspot.com'
})
