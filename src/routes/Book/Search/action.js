import * as usersTypes from './actionTypes';
let index = 0;
export const queryBooks = () => {
    return (dispatch, getState) => {
     dispatch(saveBooks({
        id: index++,
        bookName: '《海底两万里》',
        language: 'English',
        author: 'Richard Fleischer',
     }))
   }
}

export const saveBooks = books => ({ type: usersTypes.SAVE_BOOKS, books })