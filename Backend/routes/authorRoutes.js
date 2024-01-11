const  express = require('express');
const authorization = require('../middleware/authorization')

const router = express.Router();
const {registerAuthor,authAuthor,allAuthors,getAuthorById,loggedInAuthor,updateAuthor,deleteAuthor} = require('../controllers/authorController')
router.route('/').post(registerAuthor);
router.route('/login').post(authAuthor);
router.route('/').get(authorization,allAuthors);
router.route('/me').get(authorization,loggedInAuthor);
router.route('/:id').get(authorization,getAuthorById);
router.route('/:id').put(authorization,updateAuthor);
router.route('/:id').delete(authorization,deleteAuthor);
module.exports = router;