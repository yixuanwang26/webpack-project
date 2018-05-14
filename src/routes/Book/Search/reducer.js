import { SAVE_BOOKS } from './actionTypes';

const initState = {
    books: []
}

export const booksReducer = function(state = initState, action) {
    switch (action.type) {
        case SAVE_BOOKS:
            return {
                ...state,
                books: state.books.concat(action.books)
            }
        default:
            return state
    }
}