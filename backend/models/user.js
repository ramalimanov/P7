const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
class User extends Model {}
const Post = require("./post.js");

User.init({
    // Model attributes are defined here
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    // model options
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Post);
Post.belongsTo(User,{
foreignKey: 'UserId'
});

module.exports = User;
