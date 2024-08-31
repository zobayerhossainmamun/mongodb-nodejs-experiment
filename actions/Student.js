const { connect, db } = require("../utils/mongoClient");
const students = require('../datasets/students.json');
const grades = require('../datasets/grades.json');

class Student {
    constructor() {
        connect();
    }

    /**
     * Create one student
     */
    async createOneStudent() {
        const collection = db.collection('students');
        await collection.insertOne(students[0]);
    }

    /**
     * Create Multiple student
     */
    async createMultipleStudent() {
        const collection = db.collection('students');
        await collection.insertMany(students);
    }

    /**
     * Create Multiple Grades
     */
    async createMultipleGrades() {
        const collection = db.collection('grades');
        await collection.insertMany(grades.map(doc => {
            const { _id, ...rest } = doc; // Destructure and exclude _id
            return rest;
        }));
    }

    /**
     * Get one student
     * @returns student
     */
    async getOneStudent() {
        const collection = db.collection('students');
        return collection.findOne();
    }

    /**
     * Get all student
     * @returns student
     */
    async getAllStudent() {
        const collection = db.collection('students');
        return await collection.find().toArray();
    }

    /**
     * Get all count
     * @returns count
     */
    async getStudentCount() {
        const collection = db.collection('students');
        return await collection.countDocuments();
    }

    /**
     * Get student by id
     * @returns student
     */
    async getStudentById(id) {
        const collection = db.collection('students');
        return await collection.findOne({ _id: id });
    }

    /**
     * Get student by name
     * @returns student
     */
    async getStudentByName(name) {
        const collection = db.collection('students');
        return await collection.findOne({ name: name });
    }

    /**
     * Get student with only score column
     * @returns student
     */
    async getStudentScores(id) {
        const collection = db.collection('students');
        return await collection.findOne({ _id: id }, { projection: ['scores'] });
    }

    /**
     * Get student where score more then 60
     * @returns student
     */
    async getStudentScoreMore60() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $gt: 60 } }).toArray();
    }

    /**
     * Get student where score less then 60
     * @returns student
     */
    async getStudentScoreLess60() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $lt: 60 } }).toArray();
    }

    /**
     * Get student where score equal 35.8740349954354
     * @returns student
     */
    async getStudentScoreEqual() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $eq: 35.8740349954354 } }).toArray();
    }

    /**
     * Get student where score equal or greater then 35.8740349954354
     * @returns student
     */
    async getStudentScoreGEqual() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $gte: 35.8740349954354 } }).toArray();
    }

    /**
     * Get student where score equal or less then 35.8740349954354
     * @returns student
     */
    async getStudentScoreLEqual() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $lte: 35.8740349954354 } }).toArray();
    }

    /**
     * Get student where score is in [35.8740349954354, 71.76133439165544]
     * @returns student
     */
    async getStudentScoreIn() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $in: [35.8740349954354, 71.76133439165544] } }).toArray();
    }

    /**
     * Get student where score is not in [35.8740349954354, 71.76133439165544]
     * @returns student
     */
    async getStudentScoreNIn() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $nin: [35.8740349954354, 71.76133439165544] } }).toArray();
    }

    /**
     * Get student where score is in equal 35.8740349954354
     * @returns student
     */
    async getStudentScoreNEqual() {
        const collection = db.collection('students');
        return await collection.find({ "scores.score": { $ne: 35.8740349954354 } }).toArray();
    }

    /**
     *  Calculate the Average Score for Each Student
     * @returns students
     */
    async getAvgScores() {
        const collection = db.collection('students');
        let result = await collection.aggregate([
            {
                $unwind: "$scores"  // Unwind the scores array to process each score separately
            },
            {
                $group: {
                    _id: "$_id",  // Group by student ID
                    name: { $first: "$name" },  // Keep the student's name
                    averageScore: { $avg: "$scores.score" }  // Calculate the average score
                }
            }
        ]).toArray();
        return result;
    }

    /**
     *  Calculate the Total Score for Each Student
     * @returns students
     */
    async getTotalScores() {
        const collection = db.collection('students');
        let result = await collection.aggregate([
            {
                $unwind: "$scores"  // Unwind the scores array to process each score separately
            },
            {
                $group: {
                    _id: "$_id",  // Group by student ID
                    name: { $first: "$name" },  // Keep the student's name
                    totalScore: { $sum: "$scores.score" }  // Calculate the total score
                }
            }
        ]).toArray();
        return result;
    }

    /**
     * Find Students Who Have Scored Above a Certain Threshold in Exams
     * @returns students
     */
    async getWhoScoreMore90() {
        const collection = db.collection('students');
        let result = await collection.aggregate([
            {
                $unwind: "$scores"  // Unwind the scores array to access individual scores
            },
            {
                $match: {
                    "scores.type": "exam",  // Match only exam scores
                    "scores.score": { $gt: 90 }  // Score must be greater than 90
                }
            },
            {
                $group: {
                    _id: "$_id",  // Group by student ID
                    name: { $first: "$name" },  // Keep the student's name
                    examScore: { $first: "$scores.score" }  // Keep the exam score
                }
            }
        ]).toArray();
        return result;
    }

    /**
     * Join with grades collection and return grades with students
     * @returns 
     */
    async getstudentGrades() {
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

    /**
     * Get grade by class_id and student_id
     * @param {number} class_id 
     * @param {number} student_id 
     * @returns student
     */
    async findGradeByClassAndId(class_id, student_id) {
        const collection = db.collection('grades');
        let result = await collection.findOne({
            $and: [
                { class_id: class_id },
                { student_id: student_id }
            ]
        });
        return result;
    }

    /**
     * Get grade by class id or student id
     * @param {number} class_id 
     * @param {number} student_id 
     * @returns 
     */
    async findGradeByClassORId(class_id, student_id) {
        const collection = db.collection('grades');
        let result = await collection.findOne({
            $or: [
                { class_id: class_id },
                { student_id: student_id }
            ]
        });
        return result;
    }
}

module.exports = Student;