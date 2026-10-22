
const express = require("express");
const http = require("http");
const soap = require("soap");
const fs = require("fs");

const app = express();
const server = http.createServer(app);

let books = [
  { id: 1, title: "Python Basics", author: "John" },
  { id: 2, title: "Java Programming", author: "David" }
];

const service = {
  BookService: {
    BookPort: {
      addBook(args) {
        const id = Number(args.id);

        if (books.some(book => book.id === id)) {
          return { result: "Book ID already exists" };
        }

        books.push({
          id,
          title: args.title,
          author: args.author
        });

        return { result: "Book added successfully" };
      },

      getBooks() {
        return {
          result: JSON.stringify(books)
        };
      },

      getBook(args) {
        const book = books.find(
          book => book.id === Number(args.id)
        );

        return {
          result: book
            ? JSON.stringify(book)
            : "Book not found"
        };
      },

      deleteBook(args) {
        const id = Number(args.id);
        const index = books.findIndex(book => book.id === id);

        if (index === -1) {
          return { result: "Book not found" };
        }

        books.splice(index, 1);

        return { result: "Book deleted successfully" };
      }
    }
  }
};

const wsdl = fs.readFileSync("./books.wsdl", "utf8");

server.listen(8000, () => {
  soap.listen(server, "/books", service, wsdl);
  console.log("SOAP server running at http://localhost:8000/books");
  console.log("WSDL: http://localhost:8000/books?wsdl");
});
