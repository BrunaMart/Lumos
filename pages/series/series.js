function searchRecipes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const recipes = document.querySelectorAll(".receita_1, .receita_2");
    
    recipes.forEach(recipe => {
        const title = recipe.querySelector("h2").textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            recipe.style.display = "block";  // Mostra a receita
        } else {
            recipe.style.display = "none";  // Esconde a receita
        }
    });
}

onclick="window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })";

