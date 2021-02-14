const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment, Hashtag } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {}
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
        //console.log('> load posts');
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        next(error);
    }
    
})

module.exports = router;