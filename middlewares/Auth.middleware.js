const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token)
    {
        try{
            const decoded = jwt.verify(token.split(" ")[1],'masai');
            // console.log(decoded)
            if(decoded){
                // console.log(req.body)
                req.body.authorID=decoded.authorID;
                req.body.author=decoded.author;
                next();
            }
        }catch(err){
            res.send({"err":err.message})
        }
    }else{
        res.send("Please Login !!")
    }
}

module.exports={auth};