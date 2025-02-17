const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/libraryDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const authorSchema = new mongoose.Schema({name: String});
const Author = mongoose.model("Author",authorSchema);

const genreSchema = new mongoose.Schema({name: String});
const Genre = mongoose.model("Genre",genreSchema);

const bookSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"},
    genre: {type: mongoose.Schema.Types.ObjectId, ref: "Genre"},
});
const Book = mongoose.model("Book",bookSchema);

app.post("/authors",async (req, res) =>{
    const author = new Author(req.body);
    await author.save();
    res.json(author);
});

app.get("/authors", async (req, res) =>{
    const authors = await Author.find();
    res.json(authors);
});

app.post("/genres", async (req, res) => {
    const genre = new Genre(req.body);
    await genre.save();
    res.json();
});

app.get("/genres", async (req,res) => {
    const genres = await Genre.find();
    res.json(genres);
});

app.post("/books", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
});

app.get("/books", async (req, res) => {
    const books = await Book.find().populate("author").populate("genre");
    res.json(books);
});

app.put("/books/:id", async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});

app.delete("/books/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
});
 
app.listen(3000, () => console.log("Server running on port 3000"));