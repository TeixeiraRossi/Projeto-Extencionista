"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Search, Hospital, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MapaPage() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const locations = [
    // UPA
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

    // UBS - Unidades Básicas de Saúde
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

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = loc.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || loc.categoria === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (categoria) => {
    if (categoria === "UPA") {
      return <Activity className="h-4 w-4" />
    }
    return <Hospital className="h-4 w-4" />
  }

  const getCategoryVariant = (categoria) => {
    if (categoria === "UPA") {
      return "destructive"
    }
    return "default"
  }

  return (
    <main className="h-[calc(100vh-4rem)]">
      <div className="flex h-full flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full border-b border-border bg-background lg:w-96 lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-6">
              <h1 className="text-balance text-2xl font-bold">Mapa da Saúde</h1>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">Unidades de Saúde de Sinop - MT</p>
            </div>

            <div className="space-y-3 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar unidade de saúde..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as unidades</SelectItem>
                  <SelectItem value="UPA">UPA - Pronto Atendimento</SelectItem>
                  <SelectItem value="UBS">UBS - Unidades Básicas</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{filteredLocations.length} unidades encontradas</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.id}
                    className={`cursor-pointer transition-colors hover:border-primary ${
                      selectedLocation === location.id ? "border-primary bg-accent" : ""
                    }`}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <CardHeader className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant={getCategoryVariant(location.categoria)} className="text-xs">
                          <span className="mr-1">{getCategoryIcon(location.categoria)}</span>
                          {location.categoria}
                        </Badge>
                      </div>
                      <CardTitle className="text-base leading-relaxed">{location.nome}</CardTitle>
                      <CardDescription className="space-y-1 text-xs">
                        <div className="flex items-start gap-1">
                          <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                          <span>{location.endereco}</span>
                        </div>
                        <div>Horário: {location.horario}</div>
                        {location.telefone && <div>Tel: {location.telefone}</div>}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 bg-muted/30">
          <div className="flex h-full items-center justify-center">
            <Card className="m-4 max-w-2xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Mapa Interativo de Saúde</CardTitle>
                <CardDescription className="text-pretty">
                  {selectedLocation ? (
                    <>
                      <strong>{locations.find((l) => l.id === selectedLocation)?.nome}</strong>
                      <br />
                      {locations.find((l) => l.id === selectedLocation)?.endereco}
                      <br />
                      {locations.find((l) => l.id === selectedLocation)?.horario}
                    </>
                  ) : (
                    "Visualize todas as Unidades Básicas de Saúde (UBS) e Unidades de Pronto Atendimento (UPA) de Sinop - MT. Clique em uma unidade na barra lateral para ver mais detalhes."
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
                    {selectedLocation ? (
                      <>
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                          {getCategoryIcon(locations.find((l) => l.id === selectedLocation)?.categoria || "UBS")}
                        </div>
                        <p className="text-sm font-medium mb-2">
                          {locations.find((l) => l.id === selectedLocation)?.nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Coordenadas: {locations.find((l) => l.id === selectedLocation)?.lat},{" "}
                          {locations.find((l) => l.id === selectedLocation)?.lng}
                        </p>
                      </>
                    ) : (
                      <>
                        <Navigation className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Selecione uma unidade de saúde na barra lateral</p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm" disabled={!selectedLocation}>
                      <Navigation className="mr-2 h-4 w-4" />
                      Como Chegar
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm" disabled={!selectedLocation}>
                      Ligar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-64 w-64"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
