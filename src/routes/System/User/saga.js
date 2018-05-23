import { put, takeEvery, call } from 'redux-saga/effects';
import * as usersTypes from './actionTypes';



var index = 0;
function* fetchUsers() {
    const response = yield call(fetch, 'http://localhost:3020/api/user/query');
    if (response.ok) {
        const json = yield response.json();
        if (json.success) {
            yield put({
                type: usersTypes.SAVE_USERS,
                users: json.rows
            });
        } else {
            //数据获取失败
            console.log(json.message);
        }
    } else {
        //调取接口失败
        console.log('error');
    }
}

function* openEditModel({ payload }) {
    yield put({
        type: 'user/changeCurrentRecord',
        payload,
    });
    yield put({
        type: 'user/changeModelVisibleFlag',
        payload: true,
    });
}

function* modelEditOk({ payload }) {
    let request = new Request(`http://localhost:3020/api/user/submit`, {
        method: 'POST',
        //credentials: 'include',
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    const response = yield call(fetch, request);
    if (response.ok) {
        const json = yield response.json();
        if (json.success) {
            yield put({
                type: 'user/saveUserList',
                payload: {
                    type: payload.__status,
                    data: json.newRecord,
                }
            });

            yield put({
                type: 'user/changeModelVisibleFlag',
                payload: false,
            });
            yield put({
                type: 'user/changeCurrentRecord',
                payload: null,
            });
        
            

        } else {
            //数据获取失败
            console.log(json.message);
        }
    } else {
        //调取接口失败
        console.log('error');
    }
}

function* modelEditCancel({ payload }) {

    yield put({
        type: 'user/changeModelVisibleFlag',
        payload: false,
    });

    yield put({
        type: 'user/changeCurrentRecord',
        payload,
    });
}

export default function* userSaga() {
    yield takeEvery(usersTypes.QUERY_USERS, fetchUsers);
    yield takeEvery('user/openEditModel', openEditModel);
    yield takeEvery('user/modelEditOk', modelEditOk);
    yield takeEvery('user/modelEditCancel', modelEditCancel);
}