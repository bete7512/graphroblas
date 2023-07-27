"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_BY_USERNAME = void 0;
var USER_BY_USERNAME = "\nquery MyQuery($username: String = \"\") {\n  users(where: {username: {_eq: $username}}) {\n    id\n    username\n    password\n    role\n  }\n}\n";
exports.USER_BY_USERNAME = USER_BY_USERNAME;