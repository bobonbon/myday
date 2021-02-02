import axios from 'axios';
import { all, fork, takeLatest, put, delay, throttle, call } from 'redux-saga/effects';
import {
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, 
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
} from '../reducers/post';
import {
    ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from '../reducers/user';

function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function addPostAPI(data) {
	return axios.post('/post', data);   // FormData는 감싸면 안됨
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function uploadImagesAPI(data) {
	return axios.post('/post/images', data);    
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);    // action.data 가 FormData로 넘어온다. 그래서 post에 data를 뭘로 감싸거나 하면 안됨 json이 되어버린다.
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function removePostAPI(data) {
	return axios.delete(`/post/${data}`);
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,  
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
	return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,   //성공결과
        });
    } catch (err) {
        console.error(err);  
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data, //실패 결과
        })
    }
}

function likePostAPI(data) {
	return axios.patch(`/post/${data}/like`); // 데이터의 일부분만 수정하면 patch
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,  // PostId, UserId (back routes)
        });
    } catch (err) {
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function unlikePostAPI(data) {
	return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data, //실패 결과
        })
        console.error(err);  
    }
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);  
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);  
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);  
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);  
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);  
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);  
}

//throttle: 2000 동안은 서버에 요청 1 번만 보냄(함수가 호출 된 후 일정시간이 지나기 전에 호출되지 않는다.)
//takeLatest: 똑같은 요청이 동시에 여러번 와도 로딩 중인 동일한 액션 중에 마지막 요청만 처리함(서버로는 모두 요청을 보냄)

export default function* postSaga() {
    yield all([
       fork(watchLoadPosts), 
       fork(watchAddPost), 
       fork(watchUploadImages), 
       fork(watchRemovePost), 
       fork(watchAddComment), 
       fork(watchLikePost), 
       fork(watchUnlikePost), 
    ]);
}