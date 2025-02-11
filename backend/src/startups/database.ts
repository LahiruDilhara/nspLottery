import c from "config"
import debug from "debug";
import mongoose from "mongoose"

export default async function configDatabase() {
    try {
        await mongoose.connect(c.get("database.connectionString"));
    }
    catch (e) {
        debug("error")(`An error occoured when try to connect with the database. The error is ${e}`);
    }
    console.log("The database was connected successfully");
}