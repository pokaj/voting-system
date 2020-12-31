const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Category = require('../models/category');
const Candidate = require('../models/candidate');


exports.login = async (req, res) => {
    const phone = req.body.phone;
    const admin = await User.findOne({phone: phone});
    bcrypt.compare(req.body.password, admin.password,  function(error, results){
        if(error){
            console.log(error);
            return res.status(401).json({status: false, message: 'Authentication failed'});
        }
        if(results){
            const token = jwt.sign({
                is_admin: true
            }, process.env.JWT_KEY, {expiresIn: '1h'});
            return res.status(200).json({status: true, message: 'Authentication Successful', token: token});
        }else {
            console.log(error);
            return res.status(401).json({status: false, message: 'Authentication failed'});
        }
    });
}


exports.add_user = async (req, res) => {
    try{
        const phone = '233' + req.body.phone.slice(1,10);
        const existingUser = await User.findOne({phone: phone});
        if(existingUser){
            return res.status(200).json({status: false, message: 'A user with this number already exists'});
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: phone,
        })
        await user.save();
        return res.status(201).json({status: false, message: 'New user created successfully'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.add_category = async (req, res) =>{
    try{
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        });
        await category.save();
        return res.status(201).json({status: true, message: 'New category created successfully'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.add_candidate = async (req, res) => {
    try{
        const phone = '233' + req.body.phone.slice(1,10);
        const existingCandidate = await Candidate.findOne({phone: phone});
        if(existingCandidate){
            return res.status(200).json({status: false, message: 'A candidate with this number already exists'});
        }
        const candidate = new Candidate({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: phone,
            image: req.path.image,
            category: req.body.category
        });

        await candidate.save();
        return res.status(201).json({status: true, message: 'New candidate created successfully'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}