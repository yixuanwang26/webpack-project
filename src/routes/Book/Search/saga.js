import { put, takeEvery } from 'redux-saga/effects';
import * as usersTypes from './actionTypes';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

var index = 0;
function* fetchBooks() {
    yield delay(2000);

    yield put({
      type: usersTypes.SAVE_BOOKS,
      books: {
                id: index++,
                bookName: '《海底两万里》',
                language: 'English',
                author: 'Richard Fleischer',
             }
    });
}

export default function* bookSaga() {
  yield takeEvery(usersTypes.QUERY_BOOKS, fetchBooks)
}