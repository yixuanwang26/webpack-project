import * as usersTypes from './actionTypes';


export const saveBooks = books => ({ type: usersTypes.SAVE_BOOKS, books })

export const queryBooks = () => ({ type: usersTypes.QUERY_BOOKS })