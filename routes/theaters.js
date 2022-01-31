import express from "express"
import{client} from "../index.js"
const theaterRouter = express.Router();



theaterRouter.get("/", async(request, response )=>{

    const theaters = await client.db("MovieCounter").collection("Theaters").find({}).toArray();
    response.json(theaters);
    // console.log("All TheaterData", theaters);
});

theaterRouter.post("/AddTheater", async(request, response )=>{

    // const{email} =request.body;
    const theater= request.body;
    
    const result = await client.db("MovieCounter").collection("Theaters").insertOne(theater);
    response.json({message :"Theater Added Successfully" , status:"200" });
    // console.log(theater);
    // console.log("result",result);
});

export const theatersRouter =theaterRouter;