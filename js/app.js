import L from 'leaflet';

// Existing JavaScript with improvements
const facilities = [
    // ... existing facilities data ...
];

// Declare map variable in global scope
let map;
let markers = [];
let filteredFacilities = [...facilities];

// Enhanced map marker creation with animations
function createCustomMarker(facility) {
    const markerHtml = `
        <div class="custom-marker ${facility.type}" style="animation: bounce 1s infinite;">
            <i class="fas ${getFacilityIcon(facility.type)}"></i>
        </div>
    `;
    
    return L.divIcon({
        className: 'custom-marker-container',
        html: markerHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

// Enhanced nearest hospital finder with loading state
function findNearestHospital(userLat, userLng) {
    try {
        let nearestHospital = null;
        let shortestDistance = Infinity;

        const hospitals = facilities.filter(f => f.type === 'hospital' && f.coordinates);
        
        if (hospitals.length === 0) {
            showToast('Nenhum hospital encontrado na base de dados', 'error');
            return null;
        }

        hospitals.forEach(hospital => {
            const distance = calculateDistance(
                userLat, 
                userLng, 
                hospital.coordinates[0], 
                hospital.coordinates[1]
            );
            
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestHospital = hospital;
            }
        });

        return { hospital: nearestHospital, distance: shortestDistance };
    } catch (error) {
        console.error('Error finding nearest hospital:', error);
        showToast('Erro ao buscar hospital mais próximo', 'error');
        return null;
    }
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Enhanced facility card creation with animations
function createFacilityCard(facility) {
    const card = document.createElement('div');
    card.className = `facility-card ${facility.type}`;
    card.style.animation = 'fadeIn 0.5s ease-out';
    
    const statusClass = facility.hours.includes('24') ? 'open-24h' : 
                       isCurrentlyOpen(facility.hours) ? 'open' : 'closed';
    
    const statusText = statusClass === 'open-24h' ? '24H' : 
                      statusClass === 'open' ? 'Aberto' : 'Fechado';
    
    card.innerHTML = `
        <div class="facility-status ${statusClass}">${statusText}</div>
        <h3>
            ${facility.name}
            <span class="facility-type">
                ${facility.type === 'hospital' ? 'Hospital' : 
                  facility.type === 'health-center' ? 'Posto de Saúde' : 'Clínica'}
            </span>
        </h3>
        <p>${facility.description}</p>
        <div class="facility-info">
            <span><i class="fas fa-map-marker-alt"></i> ${facility.address.split(',')[0]}</span>
            <span><i class="fas fa-phone"></i> ${facility.phone}</span>
            <span><i class="far fa-clock"></i> ${facility.hours}</span>
        </div>
        <div class="facility-services">
            ${facility.services.slice(0, 3).map(service => 
                `<span class="service-tag">${service}</span>`
            ).join('')}
            ${facility.services.length > 3 ? 
                `<span class="service-tag">+${facility.services.length - 3}</span>` : 
                ''}
        </div>
        ${facility.type === 'hospital' ? `
            <button class="directions-btn" onclick="getDirections(${facility.coordinates[0]}, ${facility.coordinates[1]})">
                <i class="fas fa-directions"></i> Como chegar
            </button>
        ` : ''}
    `;
    
    // Add click animation
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
            showFacilityDetails(facility);
        }, 150);
    });
    
    return card;
}

// Enhanced directions with loading state and animation
function getDirections(lat, lng) {
    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const mapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`;
                window.open(mapsUrl, '_blank');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-directions"></i> Como chegar';
                showToast('Abrindo Google Maps com a rota...', 'info');
            },
            error => {
                console.error('Geolocation error:', error);
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                window.open(mapsUrl, '_blank');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-directions"></i> Como chegar';
                showToast('Não foi possível obter sua localização', 'error');
            }
        );
    } else {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-directions"></i> Como chegar';
    }
}

// Enhanced nearest hospital button with animations
function addNearestHospitalButton() {
    const button = document.createElement('button');
    button.className = 'nearest-hospital-btn';
    button.innerHTML = '<i class="fas fa-hospital"></i> Hospital mais próximo';
    button.style.animation = 'fadeIn 0.5s ease-out';
    button.onclick = findAndNavigateToNearestHospital;
    document.body.appendChild(button);
}

// Enhanced nearest hospital navigation with feedback and animations
function findAndNavigateToNearestHospital() {
    const btn = document.querySelector('.nearest-hospital-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Localizando...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const result = findNearestHospital(userLat, userLng);
                
                if (result?.hospital) {
                    const { hospital, distance } = result;
                    const distanceKm = Math.round(distance * 10) / 10;
                    
                    showToast(`Hospital mais próximo: ${hospital.name} (${distanceKm}km)`, 'info');
                    
                    map.flyTo(hospital.coordinates, 15, {
                        duration: 1.5,
                        easeLinearity: 0.5
                    });
                    
                    setTimeout(() => {
                        getDirections(hospital.coordinates[0], hospital.coordinates[1]);
                    }, 1500);
                } else {
                    showToast('Não foi possível encontrar hospitais próximos.', 'error');
                }
                
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-hospital"></i> Hospital mais próximo';
            },
            error => {
                console.error('Geolocation error:', error);
                showToast('Não foi possível obter sua localização. Por favor, permita o acesso à localização.', 'error');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-hospital"></i> Hospital mais próximo';
            }
        );
    } else {
        showToast('Seu navegador não suporta geolocalização.', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-hospital"></i> Hospital mais próximo';
    }
}

// Enhanced toast notification system with animations
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Check if facility is currently open
function isCurrentlyOpen(hours) {
    if (hours.includes('24')) return true;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    const [start, end] = hours.match(/\d+/g).map(Number);
    
    return currentHour >= start && currentHour < end;
}

// Enhanced map markers update with animations
function updateMapMarkers(facilitiesToShow) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    facilitiesToShow.forEach((facility, index) => {
        if (facility.coordinates) {
            const marker = L.marker(
                facility.coordinates,
                { 
                    icon: createCustomMarker(facility),
                    opacity: 0
                }
            );
            
            marker.bindPopup(createFacilityCard(facility));
            marker.addTo(map);
            
            setTimeout(() => {
                marker.setOpacity(1);
            }, index * 100);
            
            markers.push(marker);
        }
    });
}

// Enhanced map initialization with animations
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        scrollWheelZoom: true
    }).setView([-16.7281, -43.8638], 13);
    
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    addCustomControls();
    updateMapMarkers(facilities);
}

// Enhanced custom map controls with animations
function addCustomControls() {
    const locationControl = L.control({ position: 'bottomright' });
    
    locationControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'custom-map-control location-control');
        div.innerHTML = '<button><i class="fas fa-location-arrow"></i></button>';
        
        div.onclick = function() {
            if (navigator.geolocation) {
                const btn = div.querySelector('button');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        map.flyTo([latitude, longitude], 15, {
                            duration: 1.5,
                            easeLinearity: 0.5
                        });
                        btn.disabled = false;
                        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
                        showToast('Localização atualizada!', 'info');
                    },
                    error => {
                        console.error('Geolocation error:', error);
                        showToast('Não foi possível obter sua localização.', 'error');
                        btn.disabled = false;
                        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
                    }
                );
            }
        };
        
        return div;
    };
    
    locationControl.addTo(map);
}

// Initialize the application with enhanced animations
function initApp() {
    initMap();
    addNearestHospitalButton();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add fade-in animation to initial elements
    document.querySelectorAll('.facility-card').forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);