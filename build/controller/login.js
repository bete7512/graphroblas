"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = require("dotenv");
var _user = require("../tools/user");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
(0, _dotenv.config)();
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, username, password, user, value, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body$input = req.body.input, username = _req$body$input.username, password = _req$body$input.password;
          console.log(username, password);
          _context.next = 4;
          return (0, _user.User)({
            username: username
          });
        case 4:
          user = _context.sent;
          console.log(user);
          if (user) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'user not found'
          }));
        case 10:
          _context.next = 12;
          return _bcrypt["default"].compare(password, user.password);
        case 12:
          value = _context.sent;
          console.log(value);
          if (value) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'incorrect password'
          }));
        case 16:
          token = _jsonwebtoken["default"].sign({
            'https://hasura.io/jwt/claims': {
              'x-hasura-allowed-roles': ['manager'],
              'x-hasura-default-role': user.role,
              'x-hasura-user-id': "".concat(user.id)
            }
          }, process.env.HASURA_GRAPHQL_JWT_SECRET);
          return _context.abrupt("return", res.json({
            accessToken: token
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;