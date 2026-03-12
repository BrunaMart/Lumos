// Menu hamburguer
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => nav.classList.toggle("active"));

//menu for evry page
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", (req, res) => {
  res.render("books");
});

app.get("/movies", (req, res) => {
  res.render("movies");
});

app.get("/series", (req, res) => {
  res.render("series");
});

app.listen(3000);