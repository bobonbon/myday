const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, User, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const comment = require('../models/comment');

const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('uploads 폴더를 생성!');
    fs.mkdirSync('uploads');
}

// multipart/form-data 를 위한 multer 라우터 세팅
const upload = multer({
    storage: multer.diskStorage({   // 배포 시에 변경 (s3)
        destination(req, file, done) {
            done(null, 'uploads');  // uploads 폴더에 저장해 둘것이니 폴더를 만들어야함
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);    // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // 확장자를 뺀 이름
            done(null, basename + '_' + new Date().getTime() + ext);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

// 게시글 불러오기
router.get('/:postId', async (req, res, next) => { // GET /post/1
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: User,
                as: 'Likers',
                attributes: ['id', 'nickname'],
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        });
        res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {    // POST /post
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        // 해시태그
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
                where: { name: tag.slice(1).toLowerCase() },
            })));
            await post.addHashtags(result.map((v) => v[0]));
        }
        // 이미지
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {    // 이미지가 여러 개인 경우
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            } else {    // 이미지가 하나인 경우
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }]
        });
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 이미지 작성
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
    try {
        console.log(req.files);
        res.json(req.files.map((v) => v.filename));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 삭제
router.delete('/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {    //DELETE /post/comment/1
    try {
        const comment = await Comment.findOne({
            where: { 
                id: req.params.commentId,
                UserId: req.user.id,
                PostId: req.params.postId,
            },
        });
        console.log('>>>>>>',comment, comment.id, comment.UserId, comment.PostId);
        if (!comment) {
            res.status(403).send('존재하지 않는 댓글입니다.');
        }
        await comment.destroy({ id: req.params.commentId });
        res.status(200).json({ 
            CommentId: parseInt(req.params.commentId, 10),
            PostId: parseInt(req.params.postId, 10),
        });
    } catch (error) {
        console.error(error);
        next(error)
    }
});

// 게시글 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        // 관계형 데이터에서 db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });로 지칭, 
        //add: 관계테이블에 데이터 추가 ex) addLikers
        //get: 관계테이블에서 데이터 가져오기
        //set: 기존 데이터를 새 데이터로 대체
        //remove: 데이터 삭제
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 좋아요 취소
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({ 
            where: { 
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.json({ PostId: parseInt(req.params.postId) });
    } catch (error) {
        console.error(error);
        next(error)
    }
});


module.exports = router;