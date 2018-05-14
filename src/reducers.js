import { combineReducers } from "redux";
import { booksReducer } from './routes/Book/Search/reducer';



export const rootReducer = combineReducers({
    booksReducer,
})