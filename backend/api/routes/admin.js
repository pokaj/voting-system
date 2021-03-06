const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1025 * 5},
    fileFilter: fileFilter
});

const checkAdmin = require('../middleware/check-admin');
const AdminController = require('../controllers/admin');

// Admin route to login
router.post('/login', AdminController.login);

// Admin route to sign up a new user.
router.post('/add-user', checkAdmin, AdminController.add_user);

// Admin route to add new category
router.post('/add-category', checkAdmin, AdminController.add_category);

// Admin route to add candidates.
router.post('/add-candidate', checkAdmin, upload.single('image'), AdminController.add_candidate);

module.exports = router;