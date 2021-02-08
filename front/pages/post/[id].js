//next@9 에서 다이나믹라우팅을 지원한다~
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';

import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    // if (router.isFallback) {
    //     return <div>로딩중</div>
    // }

    return (
        <AppLayout>
            {singlePost && (
            <Head>
                <title>
                    {singlePost.User.nickname}님의 게시글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://bobonbon.com/favicon.ico'} />
                {/* <meta property="og:url" content={`https://bobonbon.com/post/${id}`} /> */}
            </Head>
            )}

            {singlePost ? (
                <PostCard post={singlePost} />
            ) : (
                <div>해당 게시글이 존재하지 않습니다.</div>
            )}
            
        </AppLayout>
    )
};

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '11' } },
//             { params: { id: '13' } },
//         ],
//         fallback: true,
//     }
// }

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,    // 또는 context.query.id 를 사용하면 userRouter에 접근 가능
    });
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;