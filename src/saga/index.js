import {
    message
} from 'antd';
import {
    take,
    all,
    fork,
    put,
    call,
} from 'redux-saga/effects';
import {
    httpGet,
    httpPost
} from '../utils/axios';

function* login() {
    while (true) {
        const action = yield take('LOGIN');
        const {
            username,
            password
        } = action
        const res = yield call(httpPost, {
            url: '/login',
            data: {
                name: username,
                passWord: password
            }
        })
        if (username && password) {
            if (res.success) {
                yield put({
                    type: 'LOGIN'
                })
                localStorage.removeItem('token')
                localStorage.setItem('token', res.data.token)
                message.success(res.msg)
            } else {
                yield put({
                    type: 'LOGIN'
                })

            }
        } else {
            message.error('请填写完整信息')
        }
    }

}

function* run() {
    const action = yield take('LOGIN');
    console.log('const action = yield take)')
}
export default function* rootSaga() {
    yield all([
        fork(login),
        fork(run),
    ]);
}