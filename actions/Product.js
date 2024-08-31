const { connect, db } = require("../utils/mongoClient");
const products = require('../datasets/products.json');
const { ObjectId } = require("mongodb");

class Product {
    constructor() {
        connect();
        this.collection = db.collection('products');
    }

    /**
     * Import products from json to mongodb collection
     */
    async createProducts() {
        await this.collection.insertMany(products.map(doc => {
            const { _id, ...rest } = doc; // Destructure and exclude _id
            return rest;
        }));
    }

    /**
     * Get Product by type
     * @returns 
     */
    async getProductByType() {
        let result = this.collection.find({
            type: {
                $all: ["accessory", "charger"]
            }
        }).toArray();
        return result;
    }

    /**
     * Get product by match color
     * @returns 
     */
    async getProductByMath() {
        let result = this.collection.find({
            color: "green"
        }).toArray();
        return result;
    }

    /**
     * Get product with projection
     * @returns 
     */
    async getProductWithProjection() {
        let result = this.collection.find({}, {
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

    /**
     * Increment quantity
     */
    async incrementQuantity() {
        await this.collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $inc: {
                quantity: 1
            }
        });
    }

    /**
     * Set minimum price
     */
    async setMinPrice() {
        await this.collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $min: {
                price: 120
            }
        });
    }

    /**
     * Set maximum price
     */
    async setMaxPrice() {
        await this.collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $max: {
                price: 500
            }
        });
    }

    /**
     * Rename field name
     */
    async renameField() {
        await this.collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $rename: { "qty": "quantity" }
        });
    }

    /**
     * Update product availability
     */
    async updateProductAvailability() {
        await this.collection.updateOne({
            _id: new ObjectId("66d32c5412c9de877c41da77")
        }, {
            $set: { available: true }
        });
    }

    /**
     * Get product average price
     * @returns 
     */
    async getAveragePrice() {
        return this.collection.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$price" }
                }
            }
        ]).toArray();
    }

    /**
     * Get quantity by product type
     * @returns 
     */
    async getTotalQuantityByType() {
        return this.collection.aggregate([
            {
                $match: {
                    available: true
                }
            },
            {
                $group: {
                    _id: "$type",
                    totalQuantity: { $sum: "$quantity" }
                }
            }
        ]).toArray();
    }

    /**
     * Get top rated 3 product
     * @returns 
     */
    async getTopRatedProducts() {
        return this.collection.aggregate([
            {
                $sort: {
                    rating: -1
                }
            },
            {
                $limit: 3
            }
        ]).toArray();
    }

    /**
     * Count product with high discount
     * @returns 
     */
    async countProductsWithHighDiscount() {
        return this.collection.aggregate([
            {
                $match: {
                    discount: { $gt: 30 }
                }
            },
            {
                $count: "count"
            }
        ]).toArray();
    }

    /**
     * Get total discount by brand
     * @returns 
     */
    async getTotalDiscountByBrand() {
        return this.collection.aggregate([
            {
                $group: {
                    _id: "$brand",
                    totalDiscount: { $sum: "$discount" }
                }
            }
        ]).toArray();
    }

    /**
     * Get product available percentage
     * @returns 
     */
    async getPercentageAvailable() {
        return this.collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 },
                    availableCount: {
                        $sum: {
                            $cond: [{ $eq: ["$available", true] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    percentageAvailable: {
                        $multiply: [
                            { $divide: ["$availableCount", "$totalCount"] },
                            100
                        ]
                    }
                }
            }
        ]).toArray();
    }

    /**
     * Get top 3 expensive product
     * @returns 
     */
    async getTopExpensiveProducts() {
        return this.collection.aggregate([
            {
                $sort: {
                    price: -1
                }
            },
            {
                $limit: 5
            }
        ]).toArray();
    }

    /**
     * Count product with long warranty
     * @returns 
     */
    async countProductsWithLongWarranty() {
        return this.collection.aggregate([
            {
                $match: {
                    warranty_years: { $gt: 1 }
                }
            },
            {
                $count: "count"
            }
        ]).toArray();
    }
}
module.exports = Product;