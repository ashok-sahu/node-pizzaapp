function guest(req,res,next){
    if(!req.isAuthencated){
        return next()
    }
    return res.redirect('/')
}

module.exports = guest