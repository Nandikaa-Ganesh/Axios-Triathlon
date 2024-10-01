const express = require('express');
const app = express();
app.use(express.json()); // This middleware is used to parse JSON bodies.

app.listen(3000, () => console.log('Server running on port 3000'));

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Tragedy', publicationDate:'2010', price:'2000'},
  { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Drama', publicationDate:'2011', price:'3000'},
  { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Romance', publicationDate:'2012', price:'2000'},

];

// Create a Book
app.get('/books', (req, res) => {
  // Logic to add a book
  res.json(books)
});

// Get All Books
app.post('/books', function (req, res) {

 
  if(!req.body.id|| !req.body.title||!req.body.author||!req.body.genre||!req.body.publicationDate||!req.body.price){
    res.status(400).json({
      'message':"Enter all details for this book (ID, Title, Author, PublicationDate, Genre, Price)"
    })
  }
  else{
  let newItem = {
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate,
      price: req.body.price
  }

  books.push(newItem);
  

  res.status(201).json({
      'message': "successfully created"
  });
  }
});

// Get a Single Book
app.get("/books/:id", function (req, res) {
  let found = books.find(function (item) {
      return item.id === parseInt(req.params.id);
  });
  if (found) {
      res.status(200).json(found);
  } else {
      res.sendStatus(404);
  }
});

// Update a Book
app.put('/books/:id', function (req, res) {
  let found = books.find(function (item) {
      return item.id === parseInt(req.params.id);
  });
  if (found) {
      let updateData = {
          id: found.id,
          title: req.body.title,
          genre: req.body.genre,
          publicationDate: req.body.publicationDate,
          price: req.body.price
      };

      let targetIndex = books.indexOf(found);

      books.splice(targetIndex, 1, updateData);

      res.status(201).json({ 'message': "Book Details updated" });
  } else {
      res.status(404).json({
          'message': 'unable to insert Book Detail because Book inserted not matched'
      });
  }
});

// Delete a Book
app.delete('/books/:id', (req, res) => {
  // Logic to delete a book
});
