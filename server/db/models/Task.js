const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Task = db.define("task", {
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
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    reference: {
      model: "task",
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
  dueDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  priority: {
    type: Sequelize.ENUM("Low", "Medium", "High"),
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
});

// o: i don't think this works right?
Task.findTasksAndSubtasks = async function (userId) {
  const allTasks = await Task.findAll({
    where: {
      userId: userId,
      parentId: null,
    },
    include: [
      {
        model: Task,
        as: "subtasks",
      },
    ],
  });
  return allTasks;
};

module.exports = Task;
