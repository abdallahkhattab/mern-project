const express = require('express')
const app = express()
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:false}))

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

  app.use(express.json())
mongoose.connect('mongodb+srv://boodykhattab97:1@cluster0.vhlccez.mongodb.net/mapdb?retryWrites=true&w=majority')
.then(()=>{
   
    console.log("connected to mongo")
    app.listen(4000, () => {
        console.log("Example app listening on 4000")
      })
}).catch((error)=>{ // <-- missing closing bracket
    console.log(error)
})
//import model
require("./src/models/userModels");
const User = mongoose.model("UserInfo");

//login /*
app.post('/login/Register',async(req,res)=>{
    const{fname,lname,email,password} = req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
//unique email
        const oldUser = await User.findOne({email});
        if(oldUser){
            return  res.send({error:"user exist"})

        }
        //create new user in mongodb
      await User.create({
            fname,
            lname,
            email,
            password:encryptedPassword,
        });

        res.send({status:"ok"})
 
    } catch (error) {
        res.send({status:"error"});
    }
});

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        
      });
  
      if (res.status(200)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });


app.post("/map",async(req,res)=>{
  const {token} = req.body;
  try {
     //if login success all data stored here 
    const user = jwt.verify(token,JWT_SECRET);
    console.log(user);
    const useremail = user.email;
    User.findOne({email : useremail}).then((data)=>{
      res.send({status:"ok",data:data});
    });
  } catch (error) {

    res.send({status:"error", data:error})
    
  }
})
