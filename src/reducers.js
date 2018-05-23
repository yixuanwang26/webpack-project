import { combineReducers } from "redux";
import { booksReducer } from './routes/Book/Search/reducer';
import { usersReducer } from './routes/System/User/reducer';



export const rootReducer = combineReducers({
    booksReducer,
    usersReducer,
})