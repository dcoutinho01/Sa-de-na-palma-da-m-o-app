// Dados dos estabelecimentos de saúde em Montes Claros/MG
const facilities = [
    {
        id: 1,
        name: "Hospital Universitário Clemente de Faria",
        description: "Hospital universitário vinculado à UNIMONTES com atendimento em diversas especialidades.",
        type: "hospital",
        address: "Av. Cula Mangabeira, 562 - Santo Reis, Montes Claros - MG",
        phone: "(38) 3224-8000",
        hours: "24 horas",
        services: ["Emergência", "Consultas", "Cirurgias", "Exames", "Internação"],
        coordinates: [-16.7285, -43.8658]
    },
    {
        id: 2,
        name: "Hospital Municipal de Montes Claros",
        description: "Hospital público municipal com atendimento de urgência e emergência.",
        type: "hospital",
        address: "Rua Quintino Bocaiúva, 122 - Centro, Montes Claros - MG",
        phone: "(38) 3229-2800",
        hours: "24 horas",
        services: ["Emergência", "Pronto Socorro", "Internação"],
        coordinates: [-16.7213, -43.8639]
    },
    {
        id: 3,
        name: "Hospital Aroldo Tourinho",
        description: "Hospital filantrópico com atendimento em diversas especialidades médicas.",
        type: "hospital",
        address: "Av. Dep. Esteves Rodrigues, 1080 - Centro, Montes Claros - MG",
        phone: "(38) 3222-8200",
        hours: "24 horas",
        services: ["Emergência", "Consultas", "Exames", "Cirurgias"],
        coordinates: [-16.7178, -43.8624]
    },
    {
        id: 4,
        name: "UPA Norte - Unidade de Pronto Atendimento",
        description: "Unidade de Pronto Atendimento 24 horas na zona norte da cidade.",
        type: "hospital",
        address: "Rua Joaquim Costa, 100 - Vila Atlântida, Montes Claros - MG",
        phone: "(38) 3214-7500",
        hours: "24 horas",
        services: ["Emergência", "Pronto Socorro", "Atendimento Básico"],
        coordinates: [-16.7065, -43.8712]
    },
    {
        id: 5,
        name: "UPA Sul - Unidade de Pronto Atendimento",
        description: "Unidade de Pronto Atendimento 24 horas na zona sul da cidade.",
        type: "hospital",
        address: "Rua Coronel Prates, 150 - Vila Oliveira, Montes Claros - MG",
        phone: "(38) 3224-8400",
        hours: "24 horas",
        services: ["Emergência", "Pronto Socorro", "Atendimento Básico"],
        coordinates: [-16.7402, -43.8736]
    },
    {
        id: 6,
        name: "Centro de Saúde Dr. João Alves",
        description: "Posto de saúde com atendimento básico e programas de saúde da família.",
        type: "health-center",
        address: "Rua São Paulo, 300 - Centro, Montes Claros - MG",
        phone: "(38) 3229-3500",
        hours: "7h às 17h (segunda a sexta)",
        services: ["Consultas Básicas", "Vacinação", "Curativos", "Saúde da Família"],
        coordinates: [-16.7189, -43.8601]
    },
    {
        id: 7,
        name: "Centro de Saúde Major Prates",
        description: "Posto de saúde com atendimento básico e especialidades.",
        type: "health-center",
        address: "Rua Major Prates, 450 - Centro, Montes Claros - MG",
        phone: "(38) 3221-4500",
        hours: "7h às 17h (segunda a sexta)",
        services: ["Consultas Básicas", "Pré-Natal", "Vacinação", "Saúde da Mulher"],
        coordinates: [-16.7205, -43.8647]
    },
    {
        id: 8,
        name: "Clínica Médica Santa Maria",
        description: "Clínica médica particular com diversas especialidades.",
        type: "clinic",
        address: "Av. Dep. Esteves Rodrigues, 1500 - Centro, Montes Claros - MG",
        phone: "(38) 3222-5050",
        hours: "7h às 19h (segunda a sábado)",
        services: ["Consultas", "Exames", "Cardiologia", "Ortopedia"],
        coordinates: [-16.7158, -43.8619]
    },
    {
        id: 9,
        name: "Clínica São Lucas",
        description: "Clínica médica com atendimento em diversas especialidades.",
        type: "clinic",
        address: "Rua Coronel Celestino, 200 - Centro, Montes Claros - MG",
        phone: "(38) 3221-7070",
        hours: "8h às 18h (segunda a sexta)",
        services: ["Consultas", "Exames", "Pediatria", "Ginecologia"],
        coordinates: [-16.7198, -43.8632]
    },
    {
        id: 10,
        name: "Clínica de Especialidades Médicas",
        description: "Clínica especializada em diversas áreas da medicina.",
        type: "clinic",
        address: "Av. Cula Mangabeira, 800 - Santo Reis, Montes Claros - MG",
        phone: "(38) 3224-9000",
        hours: "8h às 18h (segunda a sexta)",
        services: ["Dermatologia", "Oftalmologia", "Endocrinologia", "Neurologia"],
        coordinates: [-16.7265, -43.8662]
    }
];

// DOM Elements
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');
const continueBtn = document.getElementById('continue-btn');
const googleBtn = document.getElementById('google-btn');
const appleBtn = document.getElementById('apple-btn');
const facilitiesList = document.getElementById('facilities-list');
const searchInput = document.getElementById('search-input');
const filterBtn = document.getElementById('filter-btn');
const filterOptions = document.getElementById('filter-options');
const closeFilter = document.getElementById('close-filter');
const applyFiltersBtn = document.getElementById('apply-filters');
const facilityModal = document.getElementById('facility-modal');
const closeFacility = document.getElementById('close-facility');
const detailTitle = document.getElementById('detail-title');
const detailType = document.getElementById('detail-type');
const detailDescription = document.getElementById('detail-description');
const detailAddress = document.getElementById('detail-address');
const detailPhone = document.getElementById('detail-phone');
const detailHours = document.getElementById('detail-hours');
const detailServices = document.getElementById('detail-services');
const directionsBtn = document.getElementById('directions-btn');
const callBtn = document.getElementById('call-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const resultsTitle = document.getElementById('results-title');
const mapContainer = document.getElementById('map');
const currentTimeElement = document.getElementById('current-time');

// Global Variables
let map;
let markers = [];
let filteredFacilities = [...facilities];
let selectedFacility = null;
let userLocation = null;

// Initialize the application
function initApp() {
    updateTime();
    setInterval(updateTime, 60000);
    
    checkAuth();
    renderFacilities();
    initMap();
    setupEventListeners();
    
    // Simulate loading
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 1500);
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    currentTimeElement.textContent = timeString;
}

// Check authentication status
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        setTimeout(() => {
            authModal.style.display = 'flex';
        }, 2000);
    }
}

// Initialize Leaflet map
function initMap() {
    // Default coordinates for Montes Claros city center
    const montesClarosCoords = [-16.7281, -43.8638];
    
    map = L.map('map').setView(montesClarosCoords, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for each facility
    updateMapMarkers(filteredFacilities);
    
    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                userLocation = [position.coords.latitude, position.coords.longitude];
                L.marker(userLocation, {
                    icon: L.divIcon({
                        className: 'user-location-marker',
                        html: '<i class="fas fa-map-marker-alt" style="color: #4285F4; font-size: 24px;"></i>',
                        iconSize: [24, 24],
                        iconAnchor: [12, 24]
                    })
                }).addTo(map).bindPopup('Sua localização');
            },
            error => {
                console.log('Geolocation error:', error);
            }
        );
    }
}

// Update map markers based on filtered facilities
function updateMapMarkers(facilitiesToShow) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    facilitiesToShow.forEach(facility => {
        if (facility.coordinates) {
            const marker = L.marker(facility.coordinates, {
                icon: L.divIcon({
                    className: 'facility-marker',
                    html: `<i class="fas ${getFacilityIcon(facility.type)}" style="color: ${getFacilityColor(facility.type)}; font-size: 18px;"></i>`,
                    iconSize: [18, 18],
                    iconAnchor: [9, 18]
                })
            }).addTo(map);
            
            marker.bindPopup(`<b>${facility.name}</b><br>${facility.type === 'hospital' ? 'Hospital' : facility.type === 'health-center' ? 'Posto de Saúde' : 'Clínica Médica'}`);
            
            marker.on('click', () => {
                showFacilityDetails(facility);
            });
            
            markers.push(marker);
        }
    });
    
    // Adjust map view to show all markers if there are any
    if (facilitiesToShow.length > 0) {
        const markerCoords = facilitiesToShow
            .filter(f => f.coordinates)
            .map(f => f.coordinates);
        
        if (markerCoords.length > 0) {
            map.fitBounds(markerCoords);
        }
    }
}

// Get appropriate icon for facility type
function getFacilityIcon(type) {
    switch(type) {
        case 'hospital': return 'fa-hospital';
        case 'health-center': return 'fa-clinic-medical';
        case 'clinic': return 'fa-stethoscope';
        default: return 'fa-map-marker-alt';
    }
}

// Get color for facility type
function getFacilityColor(type) {
    switch(type) {
        case 'hospital': return '#d32f2f';
        case 'health-center': return '#1976d2';
        case 'clinic': return '#7b1fa2';
        default: return '#4CAF50';
    }
}

// Render facilities list
function renderFacilities(facilitiesToShow = filteredFacilities) {
    facilitiesList.innerHTML = '';
    
    if (facilitiesToShow.length === 0) {
        facilitiesList.innerHTML = '<p class="no-results">Nenhum estabelecimento encontrado com os filtros aplicados.</p>';
        resultsTitle.textContent = 'Nenhum resultado encontrado';
        return;
    }
    
    resultsTitle.textContent = `Estabelecimentos de Saúde (${facilitiesToShow.length})`;
    
    facilitiesToShow.forEach(facility => {
        const facilityCard = document.createElement('div');
        facilityCard.className = `facility-card ${facility.type}`;
        facilityCard.innerHTML = `
            <h3>${facility.name} <span class="facility-type">${facility.type === 'hospital' ? 'Hospital' : facility.type === 'health-center' ? 'Posto de Saúde' : 'Clínica'}</span></h3>
            <p>${facility.description}</p>
            <div class="facility-services">
                ${facility.services.slice(0, 3).map(service => `<span class="service-tag">${service}</span>`).join('')}
                ${facility.services.length > 3 ? '<span class="service-tag">+ mais</span>' : ''}
            </div>
        `;
        
        facilityCard.addEventListener('click', () => showFacilityDetails(facility));
        
        facilitiesList.appendChild(facilityCard);
    });
}

// Show facility details modal
function showFacilityDetails(facility) {
    selectedFacility = facility;
    
    detailTitle.textContent = facility.name;
    detailType.textContent = facility.type === 'hospital' ? 'Hospital' : facility.type === 'health-center' ? 'Posto de Saúde' : 'Clínica Médica';
        detailDescription.textContent = facility.description;
    detailAddress.textContent = facility.address || 'Endereço não disponível';
    detailPhone.textContent = facility.phone || 'Telefone não disponível';
    detailHours.textContent = facility.hours || 'Horário não disponível';
    
    // Update services list
    detailServices.innerHTML = '';
    facility.services.forEach(service => {
        const serviceTag = document.createElement('span');
        serviceTag.className = 'service-tag';
        serviceTag.textContent = service;
        detailServices.appendChild(serviceTag);
    });
    
    // Set up buttons
    directionsBtn.onclick = () => {
        if (facility.coordinates) {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
            window.open(mapsUrl, '_blank');
        } else if (facility.address) {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(facility.address)}`;
            window.open(mapsUrl, '_blank');
        } else {
            alert('Endereço não disponível para este estabelecimento.');
        }
    };
    
    callBtn.onclick = () => {
        if (facility.phone) {
            window.open(`tel:${facility.phone.replace(/\D/g, '')}`);
        } else {
            alert('Número de telefone não disponível para este estabelecimento.');
        }
    };
    
    // Check if facility is favorited
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorited = favorites.includes(facility.id);
    updateFavoriteButton(isFavorited);
    
    favoriteBtn.onclick = () => toggleFavorite(facility.id);
    
    // Center map on this facility if it has coordinates
    if (facility.coordinates) {
        map.setView(facility.coordinates, 15);
    }
    
    facilityModal.style.display = 'flex';
}

// Update favorite button appearance
function updateFavoriteButton(isFavorited) {
    const icon = favoriteBtn.querySelector('i');
    if (isFavorited) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorito';
        icon.style.color = '#d32f2f';
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Favoritar';
        icon.style.color = '';
    }
}

// Toggle facility as favorite
function toggleFavorite(facilityId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(facilityId);
    
    if (index === -1) {
        favorites.push(facilityId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(index === -1);
}

// Filter facilities based on search and filters
function filterFacilities() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(el => el.value);
    const serviceFilters = Array.from(document.querySelectorAll('input[name="service"]:checked')).map(el => el.value);
    
    filteredFacilities = facilities.filter(facility => {
        // Filter by search term
        const matchesSearch = 
            facility.name.toLowerCase().includes(searchTerm) || 
            facility.description.toLowerCase().includes(searchTerm) ||
            facility.address.toLowerCase().includes(searchTerm);
        
        // Filter by type
        const matchesType = typeFilters.length === 0 || typeFilters.includes(facility.type);
        
        // Filter by services
        const matchesServices = serviceFilters.length === 0 || 
            serviceFilters.every(service => facility.services.some(s => s.toLowerCase().includes(service.toLowerCase())));
        
        return matchesSearch && matchesType && matchesServices;
    });
    
    renderFacilities();
    updateMapMarkers(filteredFacilities);
}

// Setup event listeners
function setupEventListeners() {
    // Auth modal
    closeAuth.addEventListener('click', () => {
        authModal.style.display = 'none';
    });
    
    continueBtn.addEventListener('click', () => {
        const email = document.getElementById('user-email').value;
        if (email && email.includes('@')) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            authModal.style.display = 'none';
            alert(`Bem-vindo(a) ao Saúde na Palma da Mão! Um e-mail de confirmação foi enviado para ${email}`);
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    });
    
    googleBtn.addEventListener('click', () => {
        alert('Login com Google selecionado. Em uma implementação real, isso integraria com a API do Google.');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'google-user@example.com');
        authModal.style.display = 'none';
    });
    
    appleBtn.addEventListener('click', () => {
        alert('Login com Apple selecionado. Em uma implementação real, isso integraria com a API da Apple.');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'apple-user@example.com');
        authModal.style.display = 'none';
    });
    
    // Facility modal
    closeFacility.addEventListener('click', () => {
        facilityModal.style.display = 'none';
    });
    
    // Search and filter
    searchInput.addEventListener('input', filterFacilities);
    
    filterBtn.addEventListener('click', () => {
        filterOptions.classList.add('active');
    });
    
    closeFilter.addEventListener('click', () => {
        filterOptions.classList.remove('active');
    });
    
    applyFiltersBtn.addEventListener('click', () => {
        filterFacilities();
        filterOptions.classList.remove('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
        if (e.target === facilityModal) {
            facilityModal.style.display = 'none';
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);