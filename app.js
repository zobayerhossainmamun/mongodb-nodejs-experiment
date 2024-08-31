require('dotenv').config();
const Student = require('./actions/Student');
const Book = require('./actions/Book');
const Product = require('./actions/Product');
const DataAggregation = require('./actions/DataAggregation');

async function studentAction() {
    const student = new Student();

    // await student.createOneStudent();
    // await student.createMultipleStudent();
    // await student.createMultipleGrades();

    // let result = await student.getOneStudent();
    // console.log(result);

    // let result = await student.getAllStudent();
    // console.log(result);

    // let result = await student.getStudentCount();
    // console.log(result);

    // let result = await student.getStudentById(1);
    // console.log(result);

    // let result = await student.getStudentByName('aimee Zank');
    // console.log(result);

    // let result = await student.getStudentScores(1);
    // console.log(result);

    // let result = await student.getStudentScores(1);
    // console.log(result);

    // let result = await student.getStudentScoreMore60();
    // console.log(result);

    // let result = await student.getStudentScoreLess60();
    // console.log(result);

    // let result = await student.getStudentScoreEqual();
    // console.log(result);

    // let result = await student.getStudentScoreGEqual();
    // console.log(result);

    // let result = await student.getStudentScoreIn();
    // console.log(result);

    // let result = await student.getStudentScoreLEqual();
    // console.log(result);

    // let result = await student.getStudentScoreNEqual();
    // console.log(result);

    // let result = await student.getStudentScoreNIn();
    // console.log(result);

    // let result = await student.getAvgScores();
    // console.log(result);

    // let result = await student.getTotalScores();
    // console.log(result);

    // let result = await student.getWhoScoreMore90();
    // console.log(result);

    // let result = await student.getstudentGrades();
    // console.log(result);

    // let result = await student.findGradeByClassAndId(28, 0);
    // console.log(result);

    // let result = await student.findGradeByClassORId(28, 0);
    // console.log(result);
}
// studentAction();


async function bookAction() {
    const book = new Book();

    // await book.createBooks();

    // let result = await book.getBookNotLess200Page();
    // console.log(result);

    // let result = await book.getBookNotLess200PageAndAuthor();
    // console.log(result);

    // let result = await book.getBookifPageExist();
    // console.log(result);
}
// bookAction();

async function productAction() {
    const product = new Product();

    // await product.createProducts();

    // let result = await product.getProductByType();
    // console.log(result);

    // let result = await product.getProductByMath();
    // console.log(result);

    // let result = await product.getProductWithProjection();
    // console.log(result);

    // await product.incrementQuantity();

    // await product.setMinPrice();

    // await product.setMaxPrice();

    // await product.setMultiplyPrice();

    // await product.setMultiplyPrice();

    // await product.renameField();

    // await product.updateProductAvailability();
}
// productAction();

async function DataAggregationAction() {
    const daggregation = new DataAggregation();

    // let result = await daggregation.getCountProductsPriceAndQty();
    // console.log(result);

    // let result = await daggregation.getTotalPriceAndAvgRating();
    // console.log(result);

    // let result = await daggregation.getstudentWithGrades();
    // console.log(result);
    
}
DataAggregationAction();