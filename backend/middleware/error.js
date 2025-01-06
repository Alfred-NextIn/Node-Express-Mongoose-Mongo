const errorHandler = (err, req, res, next) =>{

    const statusCode = err.status? err.status: 500
    
    return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production'? null:err.stack
    });
   
    
};


export default errorHandler;