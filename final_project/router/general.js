const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});

  //return res.status(300).json({message: "Yet to be implemented"});
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


// TASK 10 - Get the book list available in the shop using Promises
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

  //Task 11
  public_users.get('/isbn/:isbn', function(res,req) {
    let isbnSame = req.params.isbn;
    const get_books = new Promise((resolve,reject) => {
        resolve(res.status(300).send(books[isbnSame]));
    });

    get_books.then(() => console.log("Promise Task 11 executed!"))
  });

  //Task 12
  public_users.get('/author/:author', function(res,req){
    
  })
module.exports.general = public_users;
