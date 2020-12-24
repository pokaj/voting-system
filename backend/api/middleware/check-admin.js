const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded.is_admin === true){
            next();
        }else{
            return res.status(401).json({message: 'Authorization failed'});
        }
    } catch(err){
        console.log(err);
        return res.status(401).json({message: 'Authorization failed'});
    }
}