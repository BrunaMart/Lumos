
//menu for evry page
fetch("/components/navbar/menu.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("menu").innerHTML = data;
  });
