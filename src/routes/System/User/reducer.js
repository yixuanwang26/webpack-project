import { SAVE_USERS } from './actionTypes';

const initState = {
    userList: [],
    editModel: {
        currentRecord: null,
        modelVisibleFlag: false,
        saveLoading: false,
    }
}

export const usersReducer = function (state = initState, action) {
    switch (action.type) {
        case SAVE_USERS:
            return {
                ...state,
                userList: action.users
            };
        case 'user/saveUserList':
            let newUserList = [...state.userList];
            switch (action.payload.type) {
                case 'init':
                    newUserList = action.payload.data;
                    break;
                case 'update':
                    newUserList = [...state.userList].map(a => a.userId === action.payload.data.userId ? action.payload.data : a);
                    break;
                case 'add':
                    newUserList = [...state.userList].concat(action.payload.data);
                    break;
                case 'delete':
                    newUserList = [...state.userList].filter(a => a.userId !== action.payload.data.id);
                default:
                    break;
            }
            return {
                ...state,
                userList: newUserList,
            }
        case 'user/changeCurrentRecord':
        const newState = {
            ...state,
            editModel: {
                ...state.editModel,
                currentRecord: action.payload,
            }
        }
            return newState;
        case 'user/changeModelVisibleFlag':
            return {
                ...state,
                editModel: {
                    ...state.editModel,
                    modelVisibleFlag: action.payload,
                }
            };
        default:
            return state
    }
}