const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const  token = req.header('Authorization');

    if(!token)
    {
        return res.status(401).json({message:'Access denied'});
    }
    try{
        const decoded = jwt.verify(token,'your-secret-key');
        req.user = decoded;
        next();
    }
    catch(error)
    {
        res.status(401).json({message:'Invalide token'});
    }
};