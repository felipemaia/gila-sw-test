db = db.getSiblingDB("gila-sw-db");

db.createCollection("categories");

db.categories.insertMany([
  {
    _id: ObjectId("63f25cbe41389bd3186e53e6"),
    name: "Sports",
  },
  {
    _id: ObjectId("63f25cbe41389bd3186e53e7"),
    name: "Finance",
  },
  {
    _id: ObjectId("63f25cbe41389bd3186e53e8"),
    name: "Movies",
  },
]);

db.createCollection("channels");

db.channels.insertMany([
  {
    _id: ObjectId("63f25e72f829dd642581fc4b"),
    name: "SMS",
  },
  {
    _id: ObjectId("63f25e72f829dd642581fc4c"),
    name: "E-Mail",
  },
  {
    _id: ObjectId("63f25e72f829dd642581fc4d"),
    name: "Push Notification",
  },
]);

db.createCollection("users");

db.users.insertMany([
  {
    name: "User Test 1",
    email: "user@test.one",
    phone: "111111111",
    subscribed: [
      "63f25cbe41389bd3186e53e6",
      "63f25cbe41389bd3186e53e7",
      "63f25cbe41389bd3186e53e8",
    ],
    channels: [
      "63f25e72f829dd642581fc4b",
      "63f25e72f829dd642581fc4c",
      "63f25e72f829dd642581fc4d",
    ],
  },
  {
    name: "User Test 2",
    email: "user@test.two",
    phone: "222222222",
    subscribed: [
      "63f25cbe41389bd3186e53e6",
      "63f25cbe41389bd3186e53e7",
      "63f25cbe41389bd3186e53e8",
    ],
    channels: ["63f25e72f829dd642581fc4b"],
  },
  {
    name: "User Test 3",
    email: "user@test.three",
    phone: "333333333",
    subscribed: ["63f25cbe41389bd3186e53e7"],
    channels: [
      "63f25e72f829dd642581fc4b",
      "63f25e72f829dd642581fc4c",
      "63f25e72f829dd642581fc4d",
    ],
  },
  {
    name: "User Test 4",
    email: "user@test.four",
    phone: "444444444",
    subscribed: ["63f25cbe41389bd3186e53e6", "63f25cbe41389bd3186e53e8"],
    channels: [],
  },
  {
    name: "User Test 5",
    email: "user@test.five",
    phone: "555555555",
    subscribed: [],
    channels: ["63f25e72f829dd642581fc4c", "63f25e72f829dd642581fc4d"],
  },
]);
