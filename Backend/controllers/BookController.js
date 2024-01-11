const asynchandler = require('express-async-handler');
const Book = require('../models/bookModel');


const createBook = asynchandler(async(req,res)=>{
    try {

        // if(!title||!author){
        //     res.status(400);
        //     res.json("plese fill all details");
        // }
        const {title,author} = req.body;
        // const bookExists = await Book.findOne(book);
        
        
        const book = await Book.create({title,author});
        res.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"internal server error"})
    }
})

const getAllBooks=asynchandler(async(req,res)=>{
    try {
        
    
        // Implement logic for pagination and sorting
        const books = await Book.find();
        res.status(200).json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

const getBooksById = asynchandler(async(req,res)=>{
    try {
        const {id}  = req.params;
        // console.log(id);
        const book = await Book.find({author:id}).populate('author','name');

        // res.json({
        //     id:book._id,
        //     title:book.title,
        //     author:{book:{author:id}}

        // })
        res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

const likeBook = asynchandler(ayns)
module.exports={getAllBooks,createBook,getBooksById}