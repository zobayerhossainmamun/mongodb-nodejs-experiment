require('dotenv').config();
const Student = require('./actions/Student');
const Book = require('./actions/Book');
const Product = require('./actions/Product');
const { callAllMethodsExcept } = require('./utils/helper');

async function studentAction() {
    const student = new Student();
    callAllMethodsExcept(student, ['createOneStudent', 'createMultipleStudent', 'createMultipleGrades']);
}
// studentAction();

async function bookAction() {
    const book = new Book();
    callAllMethodsExcept(book, ['createBooks']);
}
// bookAction();

async function productAction() {
    const product = new Product();
    callAllMethodsExcept(product, ['createProducts', 'incrementQuantity', 'setMinPrice', 'setMaxPrice', 'renameField', 'updateProductAvailability']);
}
// productAction();