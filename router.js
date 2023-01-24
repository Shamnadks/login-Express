var express =require("express");
var router =express.Router();
router.use(function(req,res,next){
    res.header('cache-control', 'no-cache','no-store');
    next();
});

const credential={
    email : "shamnadks@gmail.com",
    password : "admin123"
};

router.get("/",function(req,res){
    if(req.session.user){
        res.redirect("/route/dashboard")
    }else{
        res.render("/base")
    }
})
router.post("/login",(req,res)=>{
if(req.body.email == credential.email&&req.body.password == credential.password){
req.session.user = true;
req.session.email =req.body.email;
 res.redirect('/route/dashboard');
}
else{
    req.session.user=false;
    res.sendFile(__dirname +'/invalid.html');
}

});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{email :req.session.email})
    }else{

   res.send("Unauthorize User")
    }
})

router.get('/logout',(req,res)=>{
    req.session.user=false;
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error")
        }else{
            res.render('base',{title:"Express",logout:"log out successfully.."})
        }
    })
})

module.exports= router;

console.log([]===[])