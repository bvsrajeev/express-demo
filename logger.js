//Creating a custom middleware
//next is the refenrece to the next middleware in the piprline
//at the end of this middleware function we have to call next(), if not
//our request will be hanging.
function log (req,res,next){
  console.log('Logging.....');
  next();
}

module.exports = log;
