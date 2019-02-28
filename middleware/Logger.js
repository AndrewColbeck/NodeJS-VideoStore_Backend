function log(req,res,next) { 
    console.log('Logging...');
    next(); // Go to Next module in pipeline
}

module.exports = log;