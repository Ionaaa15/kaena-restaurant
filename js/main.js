
// Initialize the slideshow when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initSlideshow();
  initMap();
  initInfoCard();
  initSaveButton();
});

// Slideshow initialization
function initSlideshow() {
  const slideshowContainer = document.getElementById('slideshow-container');
  const slideIndicators = document.getElementById('slide-indicators');
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');
  
  // Array of image paths for the slideshow
  const images = [
    'images/food1.png',
    'images/food2.png',
    'images/food3.png',
    'images/food4.png',
  ];
  
  let currentIndex = 0;
  
  // Create the slides
  images.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'absolute inset-0 transition-opacity duration-300';
    slide.style.opacity = index === 0 ? '1' : '0';
    slide.style.backgroundImage = `url('${src}')`;
    slide.style.backgroundSize = 'cover';
    slide.style.backgroundPosition = 'center';
    slideshowContainer.appendChild(slide);
    
    // Create indicators
    const indicator = document.createElement('button');
    indicator.className = 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/70 transition-colors';
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    
    if (index === 0) {
      indicator.classList.add('bg-white');
    }
    
    indicator.addEventListener('click', () => goToSlide(index));
    slideIndicators.appendChild(indicator);
  });
  
  // Set up event listeners for next/prev buttons
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlideshow();
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlideshow();
  });
  
  // Function to go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlideshow();
  }
  
  // Update the slideshow display
  function updateSlideshow() {
    const slides = slideshowContainer.children;
    const indicators = slideIndicators.children;
    
    // Update slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.opacity = i === currentIndex ? '1' : '0';
    }
    
    // Update indicators
    for (let i = 0; i < indicators.length; i++) {
      if (i === currentIndex) {
        indicators[i].classList.add('bg-white');
        indicators[i].classList.remove('bg-white/50');
      } else {
        indicators[i].classList.remove('bg-white');
        indicators[i].classList.add('bg-white/50');
      }
    }
  }
  
  // Auto-advance slideshow
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlideshow();
  }, 5000);
}

// Map initialization
function initMap() {
  // Create a map centered at the restaurant location
  const map = L.map('map-container').setView([-21.2524, -159.8132], 14);

  // Add the OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for the restaurant location
  const marker = L.marker([-21.2524, -159.8132]).addTo(map);
  marker.bindPopup("<b>Kaena Restaurant & Bar</b><br>Arorangi, Rarotonga").openPopup();
}

// Info card initialization
function initInfoCard() {
  const toggleButton = document.getElementById('toggle-info-card');
  const infoCardContent = document.getElementById('info-card-content');
  const chevronDown = document.getElementById('chevron-down');
  const chevronUp = document.getElementById('chevron-up');
  
  toggleButton.addEventListener('click', function() {
    if (infoCardContent.classList.contains('hidden')) {
      infoCardContent.classList.remove('hidden');
      chevronDown.classList.add('hidden');
      chevronUp.classList.remove('hidden');
    } else {
      infoCardContent.classList.add('hidden');
      chevronDown.classList.remove('hidden');
      chevronUp.classList.add('hidden');
    }
  });
  
  // On mobile, hide the content by default
  if (window.innerWidth < 768) {
    infoCardContent.classList.add('hidden');
  }
  
  // Update on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      infoCardContent.classList.remove('hidden');
    } else if (!infoCardContent.classList.contains('hidden')) {
      chevronDown.classList.add('hidden');
      chevronUp.classList.remove('hidden');
    }
  });
}

// Save button functionality
function initSaveButton() {
  const saveButton = document.getElementById('save-button');
  const heartIcon = document.getElementById('heart');
  
  saveButton.addEventListener('click', function() {
    if (heartIcon.hasAttribute('fill') && heartIcon.getAttribute('fill') === 'currentColor') {
      heartIcon.setAttribute('fill', 'none');
      saveButton.classList.remove('border-red-500');
      saveButton.classList.add('border-black');
    } else {
      heartIcon.setAttribute('fill', 'currentColor');
      heartIcon.setAttribute('stroke', 'none');
      saveButton.classList.remove('border-black');
      saveButton.classList.add('border-red-500');
    }
  });
}
