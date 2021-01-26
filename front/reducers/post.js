import shortId from 'shortid';
import faker from 'faker';

import produce from 'immer';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '보봉뽕',
        },
        content: '게시글글글글 글아 길어져라져라져라ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ #첫글 #해쉬해쉬',
        Images: [{
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTFfNjIg%2FMDAxNjEwMzIxODcwNjM3.cXtg4PoFJiMIqDJC1Zc7SF9LB27P5chT5t581PihPGkg.hCaX3n01l3m3p6kErAJVfcxMv4j78yAub29zw2-w6A4g.JPEG.puppys1015%2F1610321869250.jpg&type=sc960_832',
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMDFfMTgw%2FMDAxNjA5NTA0NjYzODA5.7e04PejjVZqEXViwNk2PNYeSHaiIqsPlF2WYv39NWrsg._UedLkSz7OdvwK5UvH1RnU1N9E0Tx_v6cBTdbJvBgkkg.JPEG.gasilver_love%2FIMG_1227.jpg&type=sc960_832',
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTlfMTUx%2FMDAxNjEwOTg0MzE1NTI2.NRqBjwgc5hUo_ViF9LyjCcGb7uanb9EIDWXuHfZ9JEgg._kCOYvH4IgnbQLyfTjJASqzcfauhjWUT_27Dim2moJQg.JPEG.urmyangel1004%2FIMG_8545.JPG&type=sc960_832',
        }],
        Comments: [{
            id: shortId.generate(),
            User: {
                nickname: '그림자분신',
            },
            content: '내가 알던 삼색이가 맞나.',
        }, {
            id: shortId.generate(),
            User: {
                nickname: '그림자분신',
            },
            content: '내가 알던 삼색이가 맞나.',
        }, {
            id: shortId.generate(),
            User: {
                nickname: '그림자분신',
            },
            content: '내가 알던 삼색이가 맞나.',
        }, {
            id: shortId.generate(),
            User: {
                nickname: '그림자분신',
            },
            content: '내가 알던 삼색이가 맞나.',
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    // 기본 소문자 표기로 설정 되지만 이 중 관계형 데이터는 기본값이 첫 글자는 대문자 표기 됨
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: '보봉뽕',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',
    },
});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }
    })
    
}

export default reducer;