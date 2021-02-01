import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

// sage에서 보내는 axios 요청
axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;  // back과 더불어 쿠키 전달해줄 친구(기본 적용)

export default function* rootSaga() {
    yield all([
       fork(postSaga), 
       fork(userSaga),
    ]);
}