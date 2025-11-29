console.log("MAPA.JS CARREGOU!");
// Health locations data
async function carregarDados() {
  const arquivos = [
    "json/unidades_de_farmacia_publica.json",
    "json/caps.json",
    "json/upa-sinop.json",
    "json/policias_sinop.json",
    "json/centros_sinop.json",
    "json/ubs_sinop.json"
  ];

  try {
    console.log("Carregando arquivos:", arquivos);

    const respostas = await Promise.all(
      arquivos.map(async (arquivo) => {

        try {
          const response = await fetch(arquivo);
          console.log("Status de", arquivo, response.status);

          if (!response.ok) {
            throw new Error(`Erro ao carregar ${arquivo} (status: ${response.status})`);
          }

          const data = await response.json();
          console.log("Carregado com sucesso:", arquivo, data);

          return data;

        } catch (erroArquivo) {
          console.error("Erro ao carregar arquivo:", arquivo, erroArquivo);
          return []; // evita quebra do Promise.all
        }

      })
    );

    const locations = respostas.flat();
    console.log("Dados finais carregados:", locations);

    return locations;

  } catch (erroGeral) {
    console.error("Erro geral ao carregar JSON:", erroGeral);
    return [];
  }
}


let locations = [];
let filteredLocations = [];
let selectedLocationId = null


function filterLocations() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const filterCategory = document.getElementById("filter-select").value

  filteredLocations = locations.filter((loc) => {
    const matchesSearch = loc.nome.toLowerCase().includes(searchTerm)
    const matchesCategory = filterCategory === "all" || loc.categoria === filterCategory
    return matchesSearch && matchesCategory
  })

  renderLocations(filteredLocations)
  updateLocationCount(filteredLocations.length)
}

function renderLocations(locs) {
  const locationsList = document.getElementById("locations-list")
  locationsList.innerHTML = ""

  locs.forEach((location) => {
    const card = createLocationCard(location)
    locationsList.appendChild(card)
  })
}

function selectLocation(id) {
      selectedLocationId = id;
      const location = locations.find(l => l.id === id);
      
      // Update map info
      document.getElementById('map-description').innerHTML = `
        <strong>${location.nome}</strong><br>
        ${location.endereco}<br>
        ${location.horario}
      `;
      
      document.getElementById('map-text').innerHTML = `
        <p class="font-medium mb-2">${location.nome}</p>
        <p class="text-xs">Coordenadas: ${location.lat}, ${location.lng}</p>
      `;
      
      document.getElementById('map-icon').innerHTML = 
        location.categoria === 'UPA' 
          ? '<i class="fas fa-ambulance text-2xl text-red-600"></i>'
          : '<i class="fas fa-hospital text-2xl text-primary"></i>';
      
      // Enable buttons
      document.getElementById('directions-btn').disabled = false;
      document.getElementById('call-btn').disabled = false;
      
      renderLocations(filteredLocations);
    }

document.getElementById('directions-btn').addEventListener('click', () => {
      if (selectedLocationId) {
        const location = locations.find(l => l.id === selectedLocationId);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
      }
    });

document.getElementById('call-btn').addEventListener('click', () => {
  if (selectedLocationId) {
    const location = locations.find(l => l.id === selectedLocationId);
    if (!location || !location.telefone) return;

    // Converter para apenas números
    const numero = location.telefone.replace(/\D/g, '');

    // Abrir WhatsApp com o mesmo número
    window.open(`https://wa.me/${numero}`, '_blank');
  }
});

function createLocationCard(location) {
  const card = document.createElement("div")
  card.className = `rounded-lg border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-colors hover:border-blue-500 ${
    selectedLocationId === location.id ? "border-blue-500 bg-blue-50" : ""
  }`

  card.addEventListener("click", () => selectLocation(location.id))

  const badgeColor = location.categoria === "UPA" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
  const icon =
    location.categoria === "UPA"
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>'
    : location.categoria === "Policial"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l4 2h4v6c0 5-3 9-8 12-5-3-8-7-8-12V4h4l4-2z"></path>`
    : location.categoria === "CIAMS"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v4m0 8v4m4-4h4M4 12h4m4-8a8 8 0 110 16 8 8 0 010-16z" />`
    : location.categoria === "CAPS"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6a3 3 0 110 6 3 3 0 010-6zm-6 12a6 6 0 0112 0H6z" />`
    : location.categoria === "CEM"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v5a6 6 0 0012 0V4m-2 14a2 2 0 11-4 0" />`
    : location.categoria === "CEO"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2c3 0 5 2 5 5 0 4-2 7-2 10a2 2 0 01-4 0c0-3-2-6-2-10 0-3 2-5 5-5z"/>`
    : location.categoria === "CER"
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a2 2 0 110 4 2 2 0 010-4zm-7 8h14m-9 0v6m4-6v6" />`
    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>'

  card.innerHTML = `
    <div class="mb-2 flex items-center gap-2">
      <span class="inline-flex items-center gap-1 rounded-full ${badgeColor} px-2 py-1 text-xs font-medium">
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icon}
        </svg>
        ${location.categoria}
      </span>
    </div>
    <h3 class="text-base font-semibold leading-relaxed mb-2">${location.nome}</h3>
    <div class="space-y-1 text-xs text-gray-600">
      <div class="flex items-start gap-1">
        <svg class="mt-0.5 h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>${location.endereco}</span>
      </div>
      <div>Horário: ${location.horario}</div>
      ${location.telefone ? `<div>Tel: ${location.telefone}</div>` : ""}
    </div>
  `

  return card
}

function updateMapDisplay(location) {
  const icon =
    location.categoria === "UPA"
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>'

  const selectedCard = document.getElementById("selected-location-card")
  selectedCard.innerHTML = `
    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
      <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${icon}
      </svg>
    </div>
    <p class="text-sm font-medium mb-2">${location.nome}</p>
    <p class="text-xs text-gray-600">
      Coordenadas: ${location.lat}, ${location.lng}
    </p>
  `

  const description = document.getElementById("map-description")
  description.innerHTML = `
    <strong>${location.nome}</strong><br>
    ${location.endereco}<br>
    ${location.horario}
  `
}


function updateLocationCount(count) {
  document.getElementById("location-count").textContent = `${count} unidades encontradas`
}
// Inicialização do mapa após carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Chamando carregarDados()");

  // 1. Carregar todos os arquivos JSON
  locations = await carregarDados();

  console.log("Dados recebidos:", locations);

  // 2. Criar a lista filtrável com base nos dados
  filteredLocations = [...locations];

  // 3. Renderizar lista no painel lateral
  renderLocations(filteredLocations);
  updateLocationCount(filteredLocations.length);
  // 4. Ativar busca
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", filterLocations);

  // 5. Ativar filtro por categoria
  const filterSelect = document.getElementById("filter-select");
  filterSelect.addEventListener("change", filterLocations);
});
