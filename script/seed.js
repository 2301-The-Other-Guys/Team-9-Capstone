"use strict";

const {
  db,
  models: { User, Task },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "Cody",
      email: "cody@example.com",
      password: "123",
    }),
    User.create({
      username: "Murphy",
      email: "murphy@example.com",
      password: "456",
    }),
    User.create({
      username: "Rodney",
      email: "rodeny@example.com",
      password: "789",
    }),
  ]);

  // Creating Tasks

  const tasks = await Promise.all([
    Task.create({
      parentId: 1,
      userId: 1,
      title: "Do the dishes",
      description: "Wash the dishes and put them away",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "clean pool",
      description: "clean pool vacuum and add chlorine",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "mow the yard",
      description: "grass is too damn high",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "clean truck",
      description: "nobody will love you with a turck looking like that",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "mop",
      description: "dogs tracking in too much dirt and mud",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "vacuum",
      description: "too much dog hair",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "Do the laundry",
      description: "no more clean clothes",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 1,
      title: "Do the trash",
      description: "trash is full",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 2,
      title: "walk the dog",
      description: "Take the dog for a walk",
      scheduledTime: "2023-06-01 12:00:00",
      dueDate: "2023-06-01 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 3,
      title: "work on capstone",
      description: "Work on capstone project",
      scheduledTime: "2023-06-11 12:00:00",
      dueDate: "2023-06-11 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
  ]);

  // Creating SubTasks

  const subTasks = await Promise.all([
    Task.create({
      userId: 1,
      parentId: 1, // Reference to the parent task ID
      title: "Dry the dishes",
      description: "Dry the dishes and put them away",
      dueDate: "2023-05-20 12:00:00",
      priority: "Medium",
      isCompleted: false,
    }),
    Task.create({
      userId: 2,

      title: "Feed the dog",
      description: "Feed the dog",
      dueDate: "2023-05-20 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
    Task.create({
      userId: 3,

      title: "Create DB",
      description: "Create the database for the project",
      dueDate: "2023-05-20 12:00:00",
      priority: "High",
      isCompleted: false,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${tasks.length} tasks`);
  console.log(`seeded ${subTasks.length} subTasks`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      rodney: users[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
