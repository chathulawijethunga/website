document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const pagination = document.querySelector('.pagination');
  let slideIndex = 0;

  function showSlides() {
      slideIndex++;
      if (slideIndex >= slider.children.length) {
          slideIndex = 0;
      }
      slider.style.transform = `translateX(-${slideIndex * 100}%)`;
      updatePagination();
  }

  function showPrevSlide() {
      slideIndex--;
      if (slideIndex < 0) {
          slideIndex = slider.children.length - 1;
      }
      slider.style.transform = `translateX(-${slideIndex * 100}%)`;
      updatePagination();
  }

  function showNextSlide() {
      slideIndex++;
      if (slideIndex >= slider.children.length) {
          slideIndex = 0;
      }
      slider.style.transform = `translateX(-${slideIndex * 100}%)`;
      updatePagination();
  }

  function updatePagination() {
      const buttons = pagination.querySelectorAll('button');
      buttons.forEach((button, index) => {
          if (index === slideIndex) {
              button.classList.add('active');
          } else {
              button.classList.remove('active');
          }
      });
  }

  prevBtn.addEventListener('click', showPrevSlide);
  nextBtn.addEventListener('click', showNextSlide);

  // Create pagination buttons
  for (let i = 0; i < slider.children.length; i++) {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
          slideIndex = i;
          slider.style.transform = `translateX(-${slideIndex * 100}%)`;
          updatePagination();
      });
      pagination.appendChild(button);
  }

  updatePagination();
  
  setInterval(showSlides, 3000); // Change slide every 3 seconds
});
