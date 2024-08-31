const { connect, db } = require("../utils/mongoClient");
const products = require('../datasets/products.json');
const { ObjectId } = require("mongodb");

class Product {
    constructor() {
        connect();
    }

    /**
     * Import products from json to mongodb collection
     */
    async createProducts() {
        const collection = db.collection('products');
        await collection.insertMany(products.map(doc => {
            const { _id, ...rest } = doc; // Destructure and exclude _id
            return rest;
        }));
    }

    async getProductByType() {
        const collection = db.collection('products');
        let result = collection.find({
            type: {
                $all: ["accessory", "charger"]
            }
        }).toArray();
        return result;
    }

    async getProductByMath() {
        const collection = db.collection('products');
        let result = collection.find({
            color: "green"
        }).toArray();
        return result;
    }

    async getProductWithProjection() {
        const collection = db.collection('products');
        let result = collection.find({}, {
            projection: {
                name: 1,
                price: {
                    $ifNull: ["$price", 0]
                },
                type: 1
            }
        }).toArray();
        return result;
    }

    async incrementQuantity() {
        const collection = db.collection('products');
        await collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $inc: {
                quantity: 1
            }
        });
    }

    async setMinPrice() {
        const collection = db.collection('products');
        await collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $min: {
                price: 120
            }
        });
    }

    async setMaxPrice() {
        const collection = db.collection('products');
        await collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $max: {
                price: 500
            }
        });
    }

    async renameField() {
        const collection = db.collection('products');
        await collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $rename: { "qty": "quantity" }
        });
    }

    async updateProductAvailability() {
        const collection = db.collection('products');
        await collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $set: { available: true }
        });
    }

}
module.exports = Product;