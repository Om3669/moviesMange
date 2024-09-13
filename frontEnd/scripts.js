document.addEventListener("DOMContentLoaded", () => {
    fetch("https://moviesmange.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          loadMovies(data.data); // Pass the 'data' array
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  });
  
  function loadMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = ""; // Clear container before loading movies
  
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");
  
      const movieContent = `
        <img src="${movie.image_url}" alt="${movie.title}">
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p><strong>Rating:</strong> ${movie.rating}</p>
          <p><strong>Runtime:</strong> ${movie.runtime_in_minutes} minutes</p>
          <p>${movie.description}</p>
        </div>
      `;
  
      movieDiv.innerHTML = movieContent;
      container.appendChild(movieDiv);
    });
  }
  