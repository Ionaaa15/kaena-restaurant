
// Slideshow functionality
const images = [
  'images/food1.png',
  'images/food2.png',
  'images/food3.png',
  'images/food4.png',
  'images/food5.png',
  'images/food6.png',
  'images/food7.png',
  'images/food8.png',
  'images/food9.png',
  'images/food10.png',
  'images/food11.png',
  'images/food12.png',
  'images/food13.png',
  'images/food14.png'
];

let currentSlide = 0;
const slideshowContainer = document.getElementById('slideshow-container');
const slideIndicators = document.getElementById('slide-indicators');

// Create slide indicators
images.forEach((_, index) => {
  const indicator = document.createElement('button');
  indicator.className = `w-2 h-2 rounded-full transition-all duration-300 ${
    currentSlide === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
  }`;
  indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
  indicator.onclick = () => setSlide(index);
  slideIndicators.appendChild(indicator);
});

// Create and load all images
images.forEach((img, index) => {
  const imgElement = document.createElement('div');
  imgElement.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
    currentSlide === index ? 'opacity-100' : 'opacity-0'
  }`;
  imgElement.innerHTML = `
    <img
      src="${img}"
      alt="Kaena Restaurant Food ${index + 1}"
      class="w-full h-full object-contain"
    />
  `;
  slideshowContainer.appendChild(imgElement);
});

function updateSlideIndicators() {
  Array.from(slideIndicators.children).forEach((indicator, index) => {
    indicator.className = `w-2 h-2 rounded-full transition-all duration-300 ${
      currentSlide === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
    }`;
  });
}

function setSlide(index) {
  const slides = slideshowContainer.children;
  slides[currentSlide].className = 'absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0';
  currentSlide = index;
  slides[currentSlide].className = 'absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100';
  updateSlideIndicators();
}

function nextSlide() {
  setSlide((currentSlide + 1) % images.length);
}

function prevSlide() {
  setSlide((currentSlide - 1 + images.length) % images.length);
}

document.getElementById('next-slide').onclick = nextSlide;
document.getElementById('prev-slide').onclick = prevSlide;

// Auto-advance slides
setInterval(nextSlide, 5000);

// Map functionality
const map = L.map('map-container').setView([-21.2335, -159.8162], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.marker([-21.2335, -159.8162], { icon: customIcon })
  .addTo(map)
  .bindPopup('Kaena Restaurant & Bar - Main Road Arorangi');

// Info Card Toggle functionality
const toggleInfoCard = document.getElementById('toggle-info-card');
const infoCardContent = document.getElementById('info-card-content');
const chevronDown = document.getElementById('chevron-down');
const chevronUp = document.getElementById('chevron-up');
let isCollapsed = false;

toggleInfoCard?.addEventListener('click', () => {
  isCollapsed = !isCollapsed;
  if (isCollapsed) {
    infoCardContent.classList.add('hidden');
    chevronDown.classList.add('hidden');
    chevronUp.classList.remove('hidden');
  } else {
    infoCardContent.classList.remove('hidden');
    chevronDown.classList.remove('hidden');
    chevronUp.classList.add('hidden');
  }
});

// Save button functionality
const saveButton = document.getElementById('save-button');
const heart = document.getElementById('heart');
let isSaved = false;

saveButton?.addEventListener('click', () => {
  isSaved = !isSaved;
  if (isSaved) {
    saveButton.classList.remove('border-black', 'text-black');
    saveButton.classList.add('border-red-500', 'text-red-500');
    saveButton.innerHTML = `Saved <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  } else {
    saveButton.classList.remove('border-red-500', 'text-red-500');
    saveButton.classList.add('border-black', 'text-black');
    saveButton.innerHTML = `Save <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  }
});
