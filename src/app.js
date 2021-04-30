const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.urlencoded({extended:false}));

//console.log(path.join(__dirname,"../public"))
app.use(express.static(static_path));
app.set("view engine", "hbs");  
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req , res) =>{ 
    res.render("index")
});
app.get("/register",(req , res) => {
    res.render("register")
});

app.get("/about",(req , res) => {
    res.render("about")
});
app.get("/login",(req , res) => {
    res.render("login")
});
//create new  user in database
app.post("/register", async (req , res) => {
    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registeruser = new Register({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                gender:req.body.gender,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
            })
            const registered = registeruser.save();
            res.status(201).render("index");
        }
        else{
            res.send("password do not match")
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () =>{
    console.log(`server is running at port no. ${port}`);
})