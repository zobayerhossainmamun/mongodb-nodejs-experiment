const { connect, db } = require("../utils/mongoClient");

class DataAggregation {
    constructor() {
        connect();
    }

    async getCountProductsPriceAndQty() {
        const collection = db.collection('products');
        let result = await collection.aggregate([
            {
                $match: {
                    price: { $gt: 0 },
                    quantity: { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: "$name",
                    totalQuantity: {
                        $sum: "$quantity"
                    },
                    totalPrice: {
                        $sum: "$price"
                    }
                }
            },
            {
                $sort: {
                    totalQuantity: -1
                }
            }
        ]).toArray();
        return result;
    }

    async getTotalPriceAndAvgRating() {
        const collection = db.collection('products');
        let result = await collection.aggregate([
            {
                $facet: {
                    totalPrice: [
                        {
                            $group: {
                                _id: null,
                                totalPrice: { $sum: "$price" }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalPrice: 1
                            }
                        }
                    ],
                    averageRating: [
                        {
                            $group: {
                                _id: null,
                                averageRating: { $avg: "$rating" }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                averageRating: 1
                            }
                        }
                    ]
                }
            }
        ]).toArray();
        return result[0];
    }

    async getstudentWithGrades() {
        const collection = db.collection('students');
        let result = await collection.aggregate([
            {
                $lookup: {
                    from: "grades",
                    localField: "_id",
                    foreignField: "student_id",
                    as: "grades"
                }
            },
            {
                $unwind: "$grades"
            },
            {
                $project: {
                    name: 1,
                    "scores": 1,
                    "grades.class_id": 1,
                    "grades.scores": 1
                }
            }
        ]).toArray();
        return result;
    }
}
module.exports = DataAggregation;