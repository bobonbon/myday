const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: DataTypes.TEXT,
                allowNull: false,   //필수
            },
        }, {
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',  //이모티콘 저장
            sequelize,
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User); //post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });  //post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, { as: 'Bookmark' });
    }
};
// module.exports = (sequelize, DataTypes) => {
//     const Post = sequelize.define('Post', { //Post -> Posts로 mysql에 생성
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',    // 한글 저장
//     });
//     Post.associate = (db) => {
//         db.Post.belongsTo(db.User);
//         db.Post.hasMany(db.Comment);
//         db.Post.hasMany(db.Image);
//         db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
//         db.Post.belongsTo(db.Post, { as: 'Bookmark'});
//         db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
//     };
//     return Post;
// }