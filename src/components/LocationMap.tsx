
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map - coordinates for Kaena Restaurant on Main Road Arorangi, Rarotonga, Cook Islands
    // These coordinates are more precise for the actual Kaena restaurant location based on the provided image
    const kaenaCoordinates = [-21.2422, -159.8310]; // Updated coordinates based on the image
    map.current = L.map(mapContainer.current).setView(kaenaCoordinates, 16); // Increased zoom level for better visibility

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Create a custom icon for the marker
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add marker for restaurant location
    marker.current = L.marker(kaenaCoordinates, { icon: customIcon })
      .addTo(map.current)
      .bindPopup('Kaena Restaurant & Bar - Main Road Arorangi');

    // Add zoom controls
    map.current.zoomControl.setPosition('topright');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default LocationMap;
