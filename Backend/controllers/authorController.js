const asynchandler = require("express-async-handler");

const Author = require("../models/authorModel");
const Book = require("../models/bookModel");
const generateToken = require("../config/generateToken");

const registerAuthor = asynchandler(async (req, res) => {
  const { name, email, phone_no, password } = req.body;

  if (!name || !email || !phone_no || !password) {
    res.status(400);
    throw new Error("Please Enter required fields");
  }

  const authorExists = await Author.findOne({ email });

  if (authorExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const author = await Author.create({
    name,
    email,
    phone_no,
    password,
  });

  if (author) {
    res.status(201).json({
      _id: author._id,
      name: author.name,
      email: author.email,
      phone_no: author.phone_no,
      token: generateToken(author._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured while creating new user");
  }
  console.log(author);
});

const authAuthor = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("User not found");
  }

  const author = await Author.findOne({ email });
  if (author && (await author.matchPassword(password))) {
    res.json({
      _id: author._id,
      name: author.name,
      email: author.email,
      phone_no: author.phone_no,
      token: generateToken(author._id),
    });
  } else {
    res.json(401);
    throw new Error("Invalid email or password");
  }
});

const allAuthors = asynchandler(async (req, res) => {
  try {
    const authors = await Author.find();
    // console.log(authors);
    // authors.map((author)=>{

    // })

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

const getAuthorById = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const loggedInAuthor = asynchandler(async (req, res) => {
  try {
    const loggedInAuthor = await Author.findById(req.author._id);
    if (!loggedInAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    return res.status(200).json(loggedInAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateAuthor = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_no } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, email, phone_no },
      { new: true }
    );

    if (!updatedAuthor) {
      res.status(404).json("Author not found");
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

const deleteAuthor = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedAuthor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = {
  registerAuthor,
  authAuthor,
  allAuthors,
  getAuthorById,
  loggedInAuthor,
  updateAuthor,
  deleteAuthor,
};
