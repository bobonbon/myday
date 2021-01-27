import { all, fork, takeLatest, put, delay, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
} from '../reducers/post';
import {
    ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from '../reducers/user';
import shortId from 'shortid';

function loadPostsAPI(data) {
	return axios.get('/api/posts', data);
}

function* loadPosts(action) {
    try {
        //const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data, //실패 결과
        }) 
    }
}

function addPostAPI(data) {
	return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: { //성공결과
                id,
                content: action.data,
            }   
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: {
                id,
                content: action.data,
                Images: action.data,
            }
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function removePostAPI(data) {
	return axios.delete('/api/post', data);
}

function* removePost(action) {
    try {
        //const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,  
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function addCommentAPI(data) {
	return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        //const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,   //성공결과
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function* watchLoadPosts() {
    yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);  
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);  
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);  
}

//throttle: 2000 동안은 서버에 요청 1 번만 보냄(함수가 호출 된 후 일정시간이 지나기 전에 호출되지 않는다.)
//takeLatest: 똑같은 요청이 동시에 여러번 와도 로딩 중인 동일한 액션 중에 마지막 요청만 처리함(서버로는 모두 요청을 보냄)

export default function* postSaga() {
    yield all([
       fork(watchLoadPosts), 
       fork(watchAddPost), 
       fork(watchRemovePost), 
       fork(watchAddComment), 
    ]);
}