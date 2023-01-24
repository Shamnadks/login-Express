const express =require("express");
const path =require("path");
const bodyparser =require("body-parser");
const session =require("express-session")
const {v4:uuidv4} = require("uuid");
const router =require('./router')
const app =express();

app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
     next();
   });
const port = process.env.PORT||3000;


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.set("view engine","ejs");
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized:'true'
}));

app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, private, no-store');
     next();
   });

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.use('/route',router);

app.get("/",(req,res)=>{
    if(req.session.user){
        res.redirect("/route/dashboard")
    }else{
        res.render("base",{title:"login System"}) 
    }
})

app.listen(port,()=>{
    console.log("listening to the server on http://localhost:3000")});