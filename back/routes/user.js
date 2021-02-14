const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /user
    console.log('> load myinfo', req.headers);
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Post, // hasMany의 model: Post 가 복수형이 되어 Posts가 된다.
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
    try {
        const where = { UserId: req.params.userId };
        if (parseInt(req.query.lastId, 10)) {   // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        }
        const posts = await Post.findAll({  // findAll 로 모든 게시글
            //  where: {UserId: 1   // 1번 id를 가진 작성자의 글을 모두 가져오자};
            //where: { id: lastId },
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: Hashtag,
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        console.log('> load posts');
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        next(error);
    }
    
})

//login
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {   // 서버에러, 성공객체, 정보
        if (error) {    //서버에러
            console.error(error);
            return next(error);
        }
        if (info) {     //클라이언트에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginError) => {  //패스포트로그인에러
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Post, // hasMany의 model: Post 가 복수형이 되어 Posts가 된다.
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            });
            return res.json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

//logout
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

// signup
router.post('/', isNotLoggedIn, async (req, res, next) => {    //POST /user
    try {
        const exUser = await User.findOne({   // 중복 검사
            where: {
                email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 이메일입니다.')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({ // 수정은 update crud
            nickname: req.body.nickname,    //req.bocy 는 프론트에서 제공
        }, {
            where: { id: req.user.id }, // 내 아이디의 닉넴만 수정해야지
        })
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send('없는 유저를 팔로우 할 수 없습니다.');
        }
        await user.addFollower(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send('없는 유저를 언팔로우 할 수 없습니다.');
        }
        await user.removeFollower(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 팔로워 제거
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/1
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send('없는 유저를 언팔로우 할 수 없습니다.');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 팔로워 목록
router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            res.status(403).send('없는 유저를 언팔로우 할 수 없습니다.');
        }
        const followers = await user.getFollowers({ 
            limit: parseInt(req.query.limit), 
        });
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 팔로잉 목록
router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            res.status(403).send('없는 유저를 언팔로우 할 수 없습니다.');
        }
        const followings = await user.getFollowings({ 
            limit: parseInt(req.query.limit),
        });
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId', async (req, res, next) => { // GET /user/1
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.userId },
            attributes: {
                exclude: ['password'],
            },
            include: [{
                model: Post, // hasMany의 model: Post 가 복수형이 되어 Posts가 된다.
            }, {
                model: User,
                as: 'Followings',
            }, {
                model: User,
                as: 'Followers',
            }]
        });
        
        if (fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);
        } else {
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;