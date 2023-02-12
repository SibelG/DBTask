import mongoose, { connect } from "mongoose";

const con = () => {
    mongoose.connect(process.env.DB_URI,{
        dbName:"DBTask",
        usenewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to Db successfully")
    })
    .catch((err) => {
        console.log("DB connection error:, ${err}")
    });
};

export default con;