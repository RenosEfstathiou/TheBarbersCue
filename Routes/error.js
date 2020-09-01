const errorHandler = (error,req,res,next) =>{
  const statusCode = res.statusCode == 404 ? 404 : 500;
  res.status(statusCode)
  res.json({
    message:error.message,
  })
}
module.exports = errorHandler;