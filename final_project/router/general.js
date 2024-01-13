const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  return res.status(300).send(JSON.stringify(books,null,4));
  //send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbnSame = req.params.isbn;
  return res.status(300).send(books[isbnSame]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let newAuthorList = [];
  let isbnNew = Object.keys(books);
  isbnNew.forEach((isbn) => {
    if(books[isbn]["author"]=== req.params.author){
        newAuthorList.push({"isbn":isbn,
        "title":books[isbn]["title"],
        "reviews":books[isbn]["reviews"]})
    }
    })
  return res.status(300).send(JSON.stringify({newAuthorList},null,4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here json({message: "Yet to be implemented"})
  let booksByTitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"]=== req.params.title){
        booksByTitle.push({"isbn":isbn,
            "author":books[isbn]["author"],
            "reviews":books[isbn]["reviews"]})
    }
  })
  return res.status(300).send(JSON.stringify({booksByTitle},null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbnQuery = req.params.isbn;
  return res.status(300).send(books[isbnQuery]["reviews"]);
});

module.exports.general = public_users;
