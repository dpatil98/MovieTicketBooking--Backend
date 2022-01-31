import express from "express"
import{client} from "../index.js"
const movieRouter = express.Router();



movieRouter.get("/", async(request, response )=>{

    const movies = await client.db("MovieCounter").collection("Movies").find({}).toArray();
    response.json(movies);
    // console.log("All movieData", movies);
});

movieRouter.post("/AddMovie", async(request, response )=>{

    // const{email} =request.body;
    const movie= request.body;
    
    const result = await client.db("MovieCounter").collection("Movies").insertOne(movie);
    response.json({message :"Movie Added Successfully" , status:"200" });
    console.log("resulr",result);
    // console.log("result",result);
});

export const moviesRouter =movieRouter;