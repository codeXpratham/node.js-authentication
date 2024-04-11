import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

mongoose.connect("mongodb://localhost:27017" , {
  dbName : "backend" 
}).then( ()=>{
  console.log("db connection established");
}).catch( (e)=>{
   console.log(e);
});

const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  password : String,
});

const userZ =  mongoose.model("USERs" , userSchema);

const app = express();

// using middlewares 
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine" ,"ejs");



// const isAuthenticated = async (req, res , next) => {
//   const { token } = req.cookies;
//   console.log(token);
//   if(token){
//     try {
//       const decoded = jwt.verify(token , "134135gfads");
//       console.log(decoded);
//       req.user = await userZ.findById(decoded._id);
//       next();
//     } catch (error) {
//       // Handle token verification error
//       console.error(error);
//       res.render("register");
//     }
//   } else {
//     res.redirect("login");
//     return; // Return here to prevent further execution
//   }
// };
const isAuthenticated = async (req, res , next) => {
  const { token } = req.cookies;
  if(token){
    
      const decoded = jwt.verify(token , "134135gfads");
      // console.log(decoded);
      req.user = await userZ.findById(decoded._id);
      next();

  } else {
    res.redirect("login");
    return; // Return here to prevent further execution
  }
};


app.get("/", isAuthenticated, (req, res) => {

   res.render("logout" , {name : req.user.name});

});
app.get("/register", (req, res) => {

   res.render("register" );

});
app.get("/login", (req, res) => {
   res.render("login" );

});



// app.post("/login", async (req, res) => {
//   console.log(req.body);
//     const {name , email , password} = req.body;

//     let user1 = await userZ.findOne({email});
//     console.log(user1 , "yue");

//     if(!user1){              
//         return res.redirect("/register" );
      
//     }
//     else{
//       res.redirect("/register");
//     }


// });

// app.post("/register", async (req, res) => {
    
//     console.log(req.body);
//     const {name , email , password} = req.body;

//     let user1 = await userZ.findOne({email});
//     console.log(user1 , "yue");

//     if(user1){               
//       res.redirect("/login");
//       //  return console.log("register karo pehle");
//     }

//     const user = await userZ.create({name,email , password});

//     const token = jwt.sign({_id: user._id } , "134135gfads" );
//     console.log(token);
    
//     res.cookie("token", token , {
//       httpOnly: true,
//       expires : new Date(Date.now() + 60*1000 ),
//     });  
//     // return res.redirect("/");         
//     if (user !== null) {
//   return res.redirect("/");
// } else {
//   return res.redirect("/login");
// }
// });        


app.post("/register", async (req, res) => {
  console.log(req.body);
  const {name , email , password} = req.body;

  let user1 = await userZ.findOne({email});
  console.log(user1 , "yue");



  if(user1){               
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userZ.create({name,email , password : hashedPassword});

  if (user) {
    const token = jwt.sign({_id: user._id } , "134135gfads" );
    console.log(token);
    
    res.cookie("token", token , {
      httpOnly: true,
      expires : new Date(Date.now() + 60*1000 ),
    });  
    
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
});


app.post("/login", async (req, res) => {
  
  const {email , password, name} = req.body;

  let user = await userZ.findOne();
  
  if(!user) return res.redirect("register");

  // const isMatch = user.password === password;
  const isMatch = bcrypt.compare(user.password, password);

  if(!isMatch) return res.render("login" , {email,name, message: "incorrect password"});

  const token = jwt.sign({_id: user._id } , "134135gfads" );
    
    
    res.cookie("token", token , {
      httpOnly: true,
      expires : new Date(Date.now() + 60*1000 ),
    });  
    
    return res.redirect("/");

});





app.get("/logout", (req, res) => {     
    res.cookie("token", "10" , {       
      httpOnly: true,                  
      expires : new Date(Date.now() ), 
    });  
    res.redirect("/");           
});                              
// app.get("/users", (req, res) => {
//    res.render("index" , {name : "Pratham"});
//   //  res.sendFile('index');  
// });

app.listen(5000, () => {
  console.log('server is working');
});

