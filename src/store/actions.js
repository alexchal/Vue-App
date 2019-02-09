import {loadFestivals, loadMoreFestivals} from './actions/loadFestivals'
import {loadUserFestivals} from './actions/loadUserFestivals'
import {createFestival} from './actions/createFestival'
import {deleteFestival} from './actions/deleteFestival'
import {loadArticles, loadMoreArticles} from './actions/loadArticles'
import {loadUserArticles} from './actions/loadUserArticles'
import {createArticle} from './actions/createArticle'
import {deleteArticle} from './actions/deleteArticle'
import {signUpUser} from './actions/signUpUser'
import {LogInUser} from './actions/LogInUser'
import {autoLogIn} from './actions/autoLogIn'
import {logout} from './actions/logout'
import {clearError} from './actions/clearError'
import {triggerSearchBar} from './actions/triggerSearchBar'

export const actions = {
  loadFestivals,
  loadMoreFestivals,
  loadUserFestivals,
  createFestival,
  deleteFestival,
  loadArticles,
  loadMoreArticles,
  loadUserArticles,
  createArticle,
  deleteArticle,
  signUpUser,
  LogInUser,
  autoLogIn,
  logout,
  clearError,
  triggerSearchBar
}
