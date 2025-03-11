
document.addEventListener('DOMContentLoaded', function() {
  // Slideshow functionality
  const images = [
    "images/food1.png", // BBQ ribs with mashed potatoes
    "images/food2.png", // Fettuccine with garlic bread
    "images/food3.png", // Onion rings with dip
    "images/food4.png", // Fried chicken with rice
    "images/food5.png", // Breaded shrimp with dip
    "images/food6.png", // Grilled pineapple with fried egg
    "images/food7.png", // BBQ chicken with yellow rice
    "images/food8.png", // Steamed fish with garnish
    "images/food9.png", // Chocolate milkshake
    "images/food10.png", // Fried chicken with sauce
    "images/food11.png", // BBQ chicken with yellow rice
    "images/food12.png", // Onion rings
    "images/food13.png", // Breaded shrimp
    "images/food14.png"  // Grilled pineapple with egg
  ];

  let currentSlide = 0;
  const slideshowContainer = document.getElementById('slideshow-container');
  const slideIndicators = document.getElementById('slide-indicators');
  
  // Create slide elements
  images.forEach((img, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
      index === 0 ? "opacity-100" : "opacity-0"
    }`;
    slideDiv.id = `slide-${index}`;
    
    const imgElement = document.createElement('img');
    imgElement.src = img;
    imgElement.alt = `Kaena Restaurant Food ${index + 1}`;
    imgElement.className = "w-full h-full object-contain";
    
    slideDiv.appendChild(imgElement);
    slideshowContainer.appendChild(slideDiv);
    
    // Create indicator buttons
    const indicator = document.createElement('button');
    indicator.className = `w-2 h-2 rounded-full transition-all duration-300 ${
      index === 0 ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
    }`;
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.addEventListener('click', () => setSlide(index));
    
    slideIndicators.appendChild(indicator);
  });
  
  function setSlide(index) {
    // Hide all slides
    document.querySelectorAll('#slideshow-container > div').forEach((slide, i) => {
      slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        i === index ? "opacity-100" : "opacity-0"
      }`;
    });
    
    // Update indicators
    document.querySelectorAll('#slide-indicators > button').forEach((indicator, i) => {
      indicator.className = `w-2 h-2 rounded-full transition-all duration-300 ${
        i === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
      }`;
    });
    
    currentSlide = index;
  }
  
  function nextSlide() {
    setSlide((currentSlide + 1) % images.length);
  }
  
  function prevSlide() {
    setSlide((currentSlide - 1 + images.length) % images.length);
  }
  
  // Add event listeners for next/prev buttons
  document.getElementById('next-slide').addEventListener('click', nextSlide);
  document.getElementById('prev-slide').addEventListener('click', prevSlide);
  
  // Auto-advance slides
  setInterval(nextSlide, 5000);
  
  // Initialize map
  const map = L.map('map').setView([-21.2335, -159.8162], 18);
  
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
  
  const marker = L.marker([-21.2335, -159.8162], { icon: customIcon })
    .addTo(map)
    .bindPopup('Kaena Restaurant & Bar - Main Road Arorangi');
  
  map.zoomControl.setPosition('topright');
  
  // Info card toggle functionality
  const infoCard = document.getElementById('info-card');
  const toggleButton = document.getElementById('toggle-info');
  const infoContent = document.getElementById('info-content');
  const chevronUp = document.getElementById('chevron-up');
  const chevronDown = document.getElementById('chevron-down');
  
  let isCollapsed = false;
  
  toggleButton.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    
    if (isCollapsed) {
      infoContent.style.display = 'none';
      chevronDown.classList.remove('hidden');
      chevronUp.classList.add('hidden');
    } else {
      infoContent.style.display = 'block';
      chevronDown.classList.add('hidden');
      chevronUp.classList.remove('hidden');
    }
  });
  
  // Save button functionality
  const saveButton = document.getElementById('save-button');
  const heartIcon = document.getElementById('heart-icon');
  let isSaved = false;
  
  saveButton.addEventListener('click', () => {
    isSaved = !isSaved;
    
    if (isSaved) {
      saveButton.textContent = 'Saved ';
      saveButton.classList.remove('border-black', 'text-black');
      saveButton.classList.add('border-red-500', 'text-red-500', 'hover:bg-red-50');
      heartIcon.classList.add('fill-red-500');
    } else {
      saveButton.textContent = 'Save ';
      saveButton.classList.add('border-black', 'text-black');
      saveButton.classList.remove('border-red-500', 'text-red-500', 'hover:bg-red-50');
      heartIcon.classList.remove('fill-red-500');
    }
    
    saveButton.appendChild(heartIcon);
  });
});
