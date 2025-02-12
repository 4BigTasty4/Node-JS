const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Ошибка подключения к MongoDB"));
db.once("open", () => console.log("Успешно подключено к MongoDB!"));

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
