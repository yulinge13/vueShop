import {
    delay
} from 'redux-saga';
import {
    take,
    all,
    fork,
    put,
    call
} from 'redux-saga/effects';
import {
    httpGet,
    httpPost
} from '../utils/axios';

function* watchIsLogin() {
    const action = yield take('LOGIN');
    console.log(action)
    const {
        username,
        password
    } = action
    const res = yield call(httpPost, {
        url: '/login',
        data: {
            name:username,
            passWord:password
        }
    })
    if (res.success) {
        localStorage.setItem('token', res.data.token)
        yield put({type:'LOGIN'})
    }
    //   while(true){
    //     //监听登入事件
    //     const action1=yield take('TO_LOGIN_IN');
    //     const res=yield call(fetchSmart,'/login',{
    //       method:'POST',
    //       body:JSON.stringify({
    //         username:action1.username,
    //         password:action1.password
    //       })
    //     });
    //     //根据返回的状态码判断登陆是否成功
    //     if(res.status===10000){
    //       yield put({type:'to_login_in'});
    //     }
    //     //监听登出事件
    //     const action2=yield take('TO_LOGIN_OUT');
    //     yield put({type:'to_login_out'});
    //   }
}
export default function* rootSaga() {
    yield all([
        fork(watchIsLogin),
    ]);
}