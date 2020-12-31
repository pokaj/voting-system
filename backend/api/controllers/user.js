const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Candidate = require('../models/candidate');
const Category = require('../models/category');
const client = require('twilio')(process.env.accountSID, process.env.authToken);

// Some of the status codes may not be appropriate:
// This is to allow easy integration with the frontend

exports.login = async (req, res) =>{
    const phone = '+233' + req.body.phone.slice(1,10);
    const user = await User.findOne({phone: phone});
    if(user == null) {
        return res.status(200).json({status: false, message: 'User with this number does not exist. Kindly contact the admin.'})
    }else {
        try{
            await client
                .verify
                .services(process.env.serviceID)
                .verifications
                .create({
                    to: phone,
                    channel: 'sms'
                });
            return res.status(200).json({status: true, message: 'kindly check your phone for your verification code'});
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}


exports.verify = async (req, res) =>{
    const phone = '233' + req.body.phone.slice(1,10);
    try{
        const data = await client
            .verify
            .services(process.env.serviceID)
            .verificationChecks
            .create({
                to: '+' + phone,
                code: req.body.code
            })
        if(data.status === 'approved'){
            const user = await User.findOne({phone: phone});
            const token = jwt.sign({
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone
            }, process.env.JWT_KEY, {expiresIn: '1h'});
            return res.status(200).json({message:'Authentication successful', status: true, token:token, user:user});
        }else{
            return res.status(200).json({message: 'Authentication Failed', status: false});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({error: error, message: 'Authentication Failed', status: false});
    }
}


exports.vote = async (req, res) => {
    try{
        const userId = req.body.userId;
        const candidateId = req.body.candidateId;
        const candidate = await Candidate.findOne({_id: candidateId});
        const user = await User.findOne({_id: userId});
        const voted = user.votes.indexOf(candidate.category) !== -1
        if(voted === true){
            return res.status(200).json({status: false, message: 'You have already voted for this category'});
        }else {
            await Candidate.findOneAndUpdate({_id: candidateId}, {
                $push: {
                    votes: userId
                }
            });

            await User.findOneAndUpdate({_id: userId}, {
                $push: {
                    votes: candidate.category
                }
            });
            return res.status(200).json({status: true, message: 'Your vote has been recorded'});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error:error, status:false});
    }
}


exports.standings = async (req, res) => {
    try{
        const results = await Candidate.find();
        return res.status(200).json({results: results});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.categories = async (req, res) => {
    try{
        const results = await Category.find();
        return res.status(200).json({results: results});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}


exports.presidents = async(req, res) => {
    try{
        const presidents = await Candidate.find({category: '5fe45a3a4d0d601e30787e96'});
        return res.status(200).json(presidents);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.vice_presidents = async(req, res) => {
    try{
        const vice_presidents = await Candidate.find({category: '5fe4ac8c9b2fd59ff99387c6'});
        return res.status(200).json(vice_presidents);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}


exports.parliamentary = async(req, res) => {
    try{
        const parliamentary = await Candidate.find({category: '5fe43d4af3559519276ce057'});
        return res.status(200).json(parliamentary);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

