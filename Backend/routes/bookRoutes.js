const express = require('express');
const authorization  = require('../middleware/authorization')
const router = express.Router();
const {getAllBooks,createBook, getBooksById} =require('../controllers/BookController');



router.route('/').post(authorization,createBook);
router.route('/').get(authorization,getAllBooks);
router.route('/:id').get(authorization,getBooksById);
router.route('/like/:id').get(authorization,likeBook);
// router.route('')


module.exports =router;