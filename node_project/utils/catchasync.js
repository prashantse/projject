const astchAsync = (fn)=>{
    const errorHandler = (req , res , next) => {
       fn(req, res, next).catch(next)
    };
    return errorHandler;
}

module.exports = astchAsync;