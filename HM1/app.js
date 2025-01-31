const fs = require('fs');
const readline = require('readline');

const filePath = "books.json";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readBooks() {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        return [];
    }
}

function writeBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

function generateId(books) {
    return books.length > 0 ? books[books.length - 1].id + 1 : 1;
}

function showMenu() {
    console.log("\n1. Add Book\n2. View Books\n3. Delete Book\n4. Exit");
    rl.question("Select an action: ", handleMenu);
}

function handleMenu(option) {
    let books = readBooks();

    if (option === "1") {
        addBook(books);
    } else if (option === "2") {
        viewBooks(books);
    } else if (option === "3") {
        deleteBook(books);
    } else if (option === "4") {
        console.log("Выход...");
        rl.close();
    } else {
        console.log("Неверный ввод! Попробуйте снова.");
        showMenu();
    }
}

function addBook(books) {
    rl.question("Название: ", (title) => {
        rl.question("Автор: ", (author) => {
            const newBook = { id: generateId(books), title, author };
            books.push(newBook);
            writeBooks(books);
            console.log("Книга добавлена!");
            showMenu();
        });
    });
}

function viewBooks(books) {
    console.log("\nСписок книг:");
    if (books.length === 0) {
        console.log("Список пуст.");
    } else {
        books.forEach((book) => console.log(`ID: ${book.id}, ${book.title} - ${book.author}`));
    }
    showMenu();
}

function deleteBook(books) {
    rl.question("Введите ID книги для удаления: ", (id) => {
        const newBooks = books.filter((book) => book.id !== parseInt(id));
        if (newBooks.length === books.length) {
            console.log("Книга с таким ID не найдена.");
        } else {
            writeBooks(newBooks);
            console.log("Книга удалена!");
        }
        showMenu();
    });
}

console.log("Добро пожаловать в библиотеку!");
showMenu();
