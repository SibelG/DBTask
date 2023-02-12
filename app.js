
import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import blogRoute from "./routes/blogRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRoute from "./routes/commentRoute.js";
dotenv.config();

conn();

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/blogs', blogRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);


app.listen(port, () => {
 console.log('App started...');
});