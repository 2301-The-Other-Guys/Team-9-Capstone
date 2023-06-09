const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Task = require("./Task");
const SALT_ROUNDS = 5;
const currentDate = new Date();

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatarUrl: {
    type: Sequelize.STRING,
    defaultValue: "default.png",
  },
});

User.afterCreate((user) => {
  Task.create({
    userId: user.id,
    title: "Go create a new task",
    description:
      "Using the + icon on the left side of the screen. This is the link to creating new tasks and sub tasks.",
    scheduledTime: `${currentDate}`,
    dueDate: `${currentDate}`,
    priority: "High",
    isCompleted: false,
  });
  Task.create({
    userId: user.id,
    title: "Go view the calendar to show your new tasks.",
    description: "Click the calendar icon on the left side of the screen.",
    scheduledTime: `${currentDate}`,
    dueDate: `${currentDate}`,
    priority: "High",
    isCompleted: false,
  }),
    Task.create({
      userId: user.id,
      title: "Go checkout your profile page",
      description: "Click the profile icon on the left side of the screen.",
      scheduledTime: `${currentDate}`,
      dueDate: `${currentDate}`,
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: user.id,
      title: "Finally go checkout the info page",
      description: "Click the ? icon on the left side of the screen.",
      scheduledTime: `${currentDate}`,
      dueDate: `${currentDate}`,
      priority: "High",
      isCompleted: false,
    });
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
