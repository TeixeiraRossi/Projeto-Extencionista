// Health locations data
const locations = [
  {
    id: 1,
    nome: "UPA Dra. Anete Maria Mota Maria",
    categoria: "UPA",
    endereco: "Av. André Antônio Maggi",
    telefone: "(66) 3520-3400",
    horario: "24 horas",
    lat: -11.8642,
    lng: -55.5048,
  },
  {
    id: 2,
    nome: "UBS Jardim das Oliveiras",
    categoria: "UBS",
    endereco: "Jardim das Oliveiras",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.855,
    lng: -55.515,
  },
  {
    id: 3,
    nome: "UBS Jardim Paulista",
    categoria: "UBS",
    endereco: "Jardim Paulista",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.87,
    lng: -55.52,
  },
  {
    id: 4,
    nome: "UBS Residencial Morada do Sol",
    categoria: "UBS",
    endereco: "Residencial Morada do Sol",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.85,
    lng: -55.495,
  },
  {
    id: 5,
    nome: "UBS Centro",
    categoria: "UBS",
    endereco: "Região Central",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.865,
    lng: -55.505,
  },
  {
    id: 6,
    nome: "UBS Setor Industrial",
    categoria: "UBS",
    endereco: "Setor Industrial",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.88,
    lng: -55.51,
  },
  {
    id: 7,
    nome: "UBS Jardim Itália",
    categoria: "UBS",
    endereco: "Jardim Itália",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.845,
    lng: -55.525,
  },
  {
    id: 8,
    nome: "UBS Residencial Florença",
    categoria: "UBS",
    endereco: "Residencial Florença",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.858,
    lng: -55.49,
  },
  {
    id: 9,
    nome: "UBS Jardim das Palmeiras",
    categoria: "UBS",
    endereco: "Jardim das Palmeiras",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.875,
    lng: -55.53,
  },
  {
    id: 10,
    nome: "UBS Residencial Júlio Domingos de Campos",
    categoria: "UBS",
    endereco: "Residencial Júlio Domingos de Campos",
    telefone: "(66) 3520-XXXX",
    horario: "Segunda a Sexta: 7h às 17h",
    lat: -11.84,
    lng: -55.51,
  },
]

let selectedLocationId = null
let filteredLocations = [...locations]

// Initialize map
document.addEventListener("DOMContentLoaded", () => {
  renderLocations(filteredLocations)

  // Search functionality
  const searchInput = document.getElementById("search-input")
  searchInput.addEventListener("input", (e) => {
    filterLocations()
  })

  // Filter functionality
  const filterSelect = document.getElementById("filter-select")
  filterSelect.addEventListener("change", (e) => {
    filterLocations()
  })
})

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

function selectLocation(id) {
  selectedLocationId = id
  const location = locations.find((loc) => loc.id === id)

  // Update selected card styling
  renderLocations(filteredLocations)

  // Update map area
  updateMapDisplay(location)

  // Enable buttons
  document.getElementById("directions-btn").disabled = false
  document.getElementById("call-btn").disabled = false
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
