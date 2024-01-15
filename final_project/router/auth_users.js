const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{
    //write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

 
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
  let accessToken = jwt.sign({
    data: password
  }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = {
    accessToken,username
}
return res.status(200).send("User successfully logged in");
} else {
  return res.status(208).json({message: "Invalid Login. Check username and password"});
}
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let selected_book = books[isbn]
  if (selected_book) {
      let review = req.query.review;
      let reviewer = req.session.authorization['username'];
      if(review) {
          selected_book['reviews'][reviewer] = review;
          books[isbn] = selected_book;
      }
      res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
  }
  else{
      res.send("Unable to find this ISBN!");
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbnRequest = req.params.isbn;
    let reviewer = req.session.authorization['username'];
    let selected_review = books[isbnRequest]["reviews"];
    if (selected_review[reviewer]){
        delete selected_review[reviewer];
        res.send(`Reviews for the ISBN  ${isbnRequest} posted by the user ${reviewer} deleted.`);
    }
    else{
        res.send("Can't delete, as this review has been posted by a different user");
    }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
