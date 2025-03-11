
// Array of image paths for the slideshow
const images = [
  'images/food1.png',  // BBQ ribs with mashed potatoes
  'images/food2.png',  // Fettuccine with garlic bread
  'images/food3.png',  // Onion rings with dip
  'images/food4.png',  // Fried chicken with rice
  'images/food5.png',  // Breaded shrimp with dip
  'images/food6.png',  // Grilled pineapple with fried egg
  'images/food7.png',  // BBQ chicken with yellow rice
  'images/food8.png',  // Steamed fish with garnish
  'images/food9.png',  // Chocolate milkshake
  'images/food10.png', // Fried chicken with sauce
  'images/food11.png', // BBQ chicken with yellow rice
  'images/food12.png', // Onion rings
  'images/food13.png', // Breaded shrimp
  'images/food14.png'  // Grilled pineapple with egg
];

// Initialize variables
let currentSlideIndex = 0;
const slideshowContainer = document.getElementById('slideshow-container');
const slideIndicators = document.getElementById('slide-indicators');

// Create initial slide elements
function initSlideshow() {
  // Clear existing content
  slideshowContainer.innerHTML = '';
  slideIndicators.innerHTML = '';
  
  // Create slides
  images.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
    slide.id = `slide-${index}`;
    
    const image = document.createElement('img');
    image.src = img;
    image.alt = `Kaena Restaurant Food ${index + 1}`;
    image.className = 'w-full h-full object-contain';
    
    slide.appendChild(image);
    slideshowContainer.appendChild(slide);
    
    // Create indicator
    const indicator = document.createElement('button');
    indicator.className = `w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'}`;
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.onclick = () => goToSlide(index);
    
    slideIndicators.appendChild(indicator);
  });
}

// Change slide
function goToSlide(index) {
  // Hide current slide
  const currentSlide = document.getElementById(`slide-${currentSlideIndex}`);
  currentSlide.classList.remove('opacity-100');
  currentSlide.classList.add('opacity-0');
  
  // Update indicator
  const currentIndicator = slideIndicators.children[currentSlideIndex];
  currentIndicator.classList.remove('bg-white', 'w-4');
  currentIndicator.classList.add('bg-white/50');
  
  // Update current index
  currentSlideIndex = index;
  
  // Show new slide
  const newSlide = document.getElementById(`slide-${currentSlideIndex}`);
  newSlide.classList.remove('opacity-0');
  newSlide.classList.add('opacity-100');
  
  // Update indicator
  const newIndicator = slideIndicators.children[currentSlideIndex];
  newIndicator.classList.remove('bg-white/50');
  newIndicator.classList.add('bg-white', 'w-4');
}

// Next slide
function nextSlide() {
  goToSlide((currentSlideIndex + 1) % images.length);
}

// Previous slide
function prevSlide() {
  goToSlide((currentSlideIndex - 1 + images.length) % images.length);
}

// Add event listeners to buttons
document.getElementById('next-slide').addEventListener('click', nextSlide);
document.getElementById('prev-slide').addEventListener('click', prevSlide);

// Auto-advance slideshow
setInterval(nextSlide, 5000);

// Initialize slideshow
initSlideshow();

// Toggle info card on mobile
const infoCard = document.getElementById('info-card');
const infoCardContent = document.getElementById('info-card-content');
const toggleInfoCardButton = document.getElementById('toggle-info-card');
const chevronDown = document.getElementById('chevron-down');
const chevronUp = document.getElementById('chevron-up');

if (toggleInfoCardButton) {
  toggleInfoCardButton.addEventListener('click', () => {
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
}

// Save button functionality
const saveButton = document.getElementById('save-button');
const heart = document.getElementById('heart');
let isSaved = false;

if (saveButton) {
  saveButton.addEventListener('click', () => {
    isSaved = !isSaved;
    if (isSaved) {
      saveButton.innerText = 'Saved ';
      saveButton.classList.add('text-red-500', 'border-red-500', 'hover:bg-red-50');
      saveButton.classList.remove('text-black', 'border-black', 'hover:bg-gray-100');
      heart.setAttribute('fill', 'currentColor');
    } else {
      saveButton.innerText = 'Save ';
      saveButton.classList.remove('text-red-500', 'border-red-500', 'hover:bg-red-50');
      saveButton.classList.add('text-black', 'border-black', 'hover:bg-gray-100');
      heart.setAttribute('fill', 'none');
    }
    saveButton.appendChild(heart.cloneNode(true));
  });
}

// Initialize map
const mapContainer = document.getElementById('map-container');

if (mapContainer && L) {
  const map = L.map('map-container').setView([-21.250, -159.786], 14);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  const marker = L.marker([-21.250, -159.786]).addTo(map);
  marker.bindPopup("<b>Kaena Restaurant & Bar</b><br>Near Rarotongan Beach Resort").openPopup();
}
