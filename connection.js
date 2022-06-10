const MongoClient = require("mongodb").MongoClient;

// Server path
const url = 'mongodb://localhost:27017';

let connection = null;

class DB {

    static getConnection() {
        return connection;
    }

    static async connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if (err) {
                    reject("Error in the connectivity");
                }
                console.log("Successfully connected to DB");
                connection = client.db("temp");
                resolve();
            })
        });
    }
}

module.exports = DB;