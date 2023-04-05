function run() {
    fetch('https://resource-ghibli-api.onrender.com/films')
    .then(response => response.json())
    .then(data => {
        const titlesSelect = document.getElementById('titles');
        const displayInfo = document.getElementById('display-info');
        const peopleList = document.getElementById('people');
        const reviewList = document.getElementById('review-list');

    
    data.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie.id;
      option.text = movie.title;
      titlesSelect.add(option);
    });

    
    titlesSelect.addEventListener('change', (event) => {
      const selectedMovieId = event.target.value;

      
      fetch(`https://resource-ghibli-api.onrender.com/films/${selectedMovieId}`)
        .then(response => response.json())
        .then(movie => {
          // Update movie details section
          displayInfo.innerHTML = `
            <p><strong>Title:</strong> ${movie.title}</p>
            <p><strong>Description:</strong> ${movie.description}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Producer:</strong> ${movie.producer}</p>
            <p><strong>Release Year:</strong> ${movie.release_date}</p>
          `;
        })
        .catch(error => console.error('Error fetching movie details:', error));
    });

    
    const reviewForm = document.querySelector('form');
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const reviewInput = document.getElementById('review');
      const review = reviewInput.value.trim();
      if (review !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = review;
        reviewList.appendChild(listItem);
        reviewInput.value = '';
      }
    });

    
    const showPeopleButton = document.getElementById('show-people');
    showPeopleButton.addEventListener('click', () => {
      const selectedMovieId = titlesSelect.value;

      
      fetch(`https://resource-ghibli-api.onrender.com/films/${selectedMovieId}`)
        .then(response => response.json())
        .then(movie => {
          
          peopleList.innerHTML = '';
          movie.people.forEach(personUrl => {
            
            fetch(personUrl)
              .then(response => response.json())
              .then(person => {
                const listItem = document.createElement('li');
                listItem.textContent = person.name;
                peopleList.appendChild(listItem);
              })
              .catch(error => console.error('Error fetching person details:', error));
          });
        })
        .catch(error => console.error('Error fetching movie details:', error));
    });

    
    const resetReviewsButton = document.getElementById('reset-reviews');
    resetReviewsButton.addEventListener('click', () => {
      reviewList.innerHTML = '';
    });
  })
  .catch(error => console.error('Error fetching movies:', error));

}
setTimeout(run, 1000);