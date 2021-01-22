export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '보봉뽕',
        },
        content: '게시글글글글 글아 길어져라져라져라ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
        Images: [{
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTFfNjIg%2FMDAxNjEwMzIxODcwNjM3.cXtg4PoFJiMIqDJC1Zc7SF9LB27P5chT5t581PihPGkg.hCaX3n01l3m3p6kErAJVfcxMv4j78yAub29zw2-w6A4g.JPEG.puppys1015%2F1610321869250.jpg&type=sc960_832',
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMDFfMTgw%2FMDAxNjA5NTA0NjYzODA5.7e04PejjVZqEXViwNk2PNYeSHaiIqsPlF2WYv39NWrsg._UedLkSz7OdvwK5UvH1RnU1N9E0Tx_v6cBTdbJvBgkkg.JPEG.gasilver_love%2FIMG_1227.jpg&type=sc960_832',
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMTlfMTUx%2FMDAxNjEwOTg0MzE1NTI2.NRqBjwgc5hUo_ViF9LyjCcGb7uanb9EIDWXuHfZ9JEgg._kCOYvH4IgnbQLyfTjJASqzcfauhjWUT_27Dim2moJQg.JPEG.urmyangel1004%2FIMG_8545.JPG&type=sc960_832',
        }],
        Comments: [{
            User: {
                nickname: '그림자분신',
            },
            content: '내가 알던 삼색이가 맞나.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }, {
            User: {
                nickname: '뽀보봉',
            },
            content: '가슴이 웅장해 진다.',
        }]
    }],
    imagePaths: [],
    postAdded: false,
    // 기본 소문자 표기로 설정 되지만 이 중 관계형 데이터는 기본값이 첫 글자는 대문자 표기 됨
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '더미더미덤더미 더비비비ㅣ',
    User: {
        id: 1, 
        nickname: '보봉뽕2',
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
}

export default reducer;