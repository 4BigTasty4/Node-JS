const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Имя и email обязательны" });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email уже существует" });
    } else {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
});

module.exports = router;
