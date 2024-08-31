const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL, {});

let isConnected = false;
const db = client.db('nodejsMongodb');
async function connect() {
    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Failed to connect to MongoDB', err);
            isConnected = false;
        }
    } else {
        console.log('Already connected to MongoDB');
    }
    return client;
}

module.exports = {
    connect,
    client,
    db
};