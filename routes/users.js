import express from "express"
import{client} from "../index.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userRouter = express.Router();



userRouter.get("/", async(request, response )=>{

    const Users = await client.db("MovieCounter").collection("Users").find({}).toArray();
    response.json(Users);
    // console.log("All movieData", Users);
});

userRouter.post("/AddUser", async(request, response )=>{

    // const{email} =request.body;
    const user= request.body;
    const{ email, password} =request.body;

   
    const result = await CheckEmail(email);
    if(result)
    {
      response.status(401).json({message :"User Already exits " , status:"401" });  
    }
    else{
         user.password=await passwordHashing(password);
         await postUser(user);
         response.json({message :"User Register Successfully" , status:"200" });
     }
    
    console.log('Signing up..')
});


userRouter.post("/login", async(request, response )=>{

    const{ email, password} = request.body;
    
    const EmailFound = await CheckEmail(email);
    if(!EmailFound)
    {
      response.status(401).send({message :"Wrong User Credentials"});  
    }
    else{
        
        const storedPassword = EmailFound.password;
        const isPasswordMatched = await bcrypt.compare(password,storedPassword);
        // response.send(isPasswordMatched);
        
        if(!isPasswordMatched)
        {   
            // response.status(401).send({message :"Wrong User Credentials", password});
            response.status(401).json({message :"Wrong User Credentials", password});
        }
        else{

           const token= jwt.sign({id:EmailFound._id}, process.env.Secret_Key, {expiresIn:"1h"} );
            // response.send(EmailFound);
            response.status(200).json({user: EmailFound , token :token })
            console.log("login sucess")
        }
       
         
        
      
     }
    
});



async function passwordHashing(password)
{   
    const rounds =10;
    const salted = await bcrypt.genSalt(rounds);
    // console.log(salted);
    const hashedpassword =  await bcrypt.hash(password,salted);
    // console.log(hashedpassword);
    return hashedpassword;

}


async function CheckEmail(email) {
    return await client.db("MovieCounter").collection("Users").findOne({ email: email });
}

async function postUser(user) {
    return await client.db("MovieCounter").collection("Users").insertOne(user);
}

export const usersRouter = userRouter;