import { all } from 'redux-saga/effects'
import bookSaga from './routes/Book/Search/saga';
import userSaga from './routes/System/User/saga';

export default function* rootSaga() {
  yield all([
    bookSaga(),
    userSaga(),
  ])
}