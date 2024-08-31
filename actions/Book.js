const { connect, db } = require("../utils/mongoClient");
const books = require('../datasets/books.json');

class Book {
    constructor() {
        connect();
    }

    /**
     * Import books from json to mongodb collection
     */
    async createBooks() {
        const collection = db.collection('books');
        await collection.insertMany(books);
    }

    async getBookNotLess200Page() {
        const collection = db.collection('books');
        return await collection.find({
            pageCount: {
                $not: {
                    $lt: 200
                }
            }
        }).toArray();
    }

    async getBookNotLess200PageAndAuthor() {
        const collection = db.collection('books');
        return await collection.find({
            $nor: [
                {
                    pageCount: { $gt: 200 }
                },
                {
                    authors: "Robi Sen"
                }
            ]
        }).toArray();
    }

    async getBookifPageExist() {
        const collection = db.collection('books');
        return await collection.find({
            pageCount: { $exists: true }
        }).toArray();
    }

}
module.exports = Book;