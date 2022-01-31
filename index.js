import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { theatersRouter } from './routes/theaters.js';
import { moviesRouter } from './routes/movies.js';


const app = express();
app.use(express.json());
app.use(cors());


dotenv.config(); //all keys will be put inside process.env
// console.log(process.env);
const PORT=process.env.PORT;


const Mongo_URL=process.env.Mongo_URL;
// const Mongo_URL='mongodb+srv://dpatil98:Patil1998@cluster0.llbyj.mongodb.net';
// /myFirstDatabase?retryWrites=true&w=majority

// const Mongo_URL = "mongodb://localhost";

async function createConnection(){

    const client = new MongoClient(Mongo_URL);
    await client.connect();
    console.log("MongoDB Connected");
    return client;
}
            
export const client = await createConnection();

app.get("/" , (request ,response) => 
{

    response.send("Movie Counter");

});

//  async function deleteAllTheaters() {
//     return await client.db("MovieCounter").collection("Theaters").deleteMany({});
// }

// deleteAllTheaters();

//  async function deleteAllMovies() {
//     return await client.db("MovieCounter").collection("Movies").deleteMany({});
// }

// deleteAllMovies();

app.use("/theaters", theatersRouter );
app.use("/movies", moviesRouter );

app.listen(PORT ,() => console.log("App is Started on Port :" ,PORT));



