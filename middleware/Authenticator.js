function Authenticate(req,res,next) { 
    console.log('Authenticating...');
    next(); // Go to Next module in pipeline
}

module.exports = Authenticate;