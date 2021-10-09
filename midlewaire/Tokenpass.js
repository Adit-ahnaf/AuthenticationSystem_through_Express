const Tokenpass  = (req,res,next)=>{
const {authorization} = req.headers;
const jwt = require('jsonwebtoken');
try{
    const token  = authorization.split(' ')[1];
    const decode  = jwt.verify(token, process.env.JWT_SECRET);
    const {username, userId} = decode;
    req.username = username;
    req.userID  = userId;
    next();
}
catch{
  next("Authentication failed");
}
}
module.exports = Tokenpass;