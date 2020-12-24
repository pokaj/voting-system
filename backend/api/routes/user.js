const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const UserController = require('../controllers/user');

// User route to login
router.post('/login', UserController.login);

// User route to authenticate token
router.post('/verify-token', UserController.verify);

// User route for categories
router.post('/categories', checkAuth, UserController.categories);

// User route to get details on voting standings
router.post('/standings', checkAuth, UserController.standings);

// User route to get all presidents
router.post('/presidents', UserController.presidents);

// User route to get all vice presidents
router.post('/vice-presidents', UserController.vice_presidents);

// User route to get all parliamentarians
router.post('/parliamentary', UserController.parliamentary);

// User route vote for a candidate
router.post('/vote', checkAuth, UserController.vote);

module.exports = router;