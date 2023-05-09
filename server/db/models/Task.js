const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Task = db.define("task", {
  // o: you don't need to add this, as its added automatically
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  // o: maybe stretch goal for this? 🤔
  scheduledTime: {
    type: Sequelize.TIME,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  type: Sequelize.STRING,
  // o: this should be an Sequelize.ENUM("low", "medium", "high")
  priority: {
    type: Sequelize.STRING,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  // o: you can add a parentId here to identify a subtask
});

module.exports = Task;
