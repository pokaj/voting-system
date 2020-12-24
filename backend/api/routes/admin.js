const express = require('express');
const router = express.Router();
const checkAdmin = require('../middleware/check-admin');
const AdminController = require('../controllers/admin');

// Admin route to login
router.post('/login', AdminController.login);

// Admin route to sign up a new user.
router.post('/add-user', checkAdmin, AdminController.add_user);

// Admin route to add new category
router.post('/add-category', checkAdmin, AdminController.add_category);

// Admin route to add candidates.
router.post('/add-candidate', checkAdmin, AdminController.add_candidate);

module.exports = router;