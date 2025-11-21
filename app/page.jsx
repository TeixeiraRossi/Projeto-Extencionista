import Link from "next/link"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">Descubra Nossa Cidade</h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Explore os melhores lugares, eventos e experiências. Um guia completo para você conhecer cada canto da
              nossa cidade.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/mapa">
                  Ver Mapa
                  <MapPin className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Por que visitar?</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Nossa cidade oferece experiências únicas para todos os gostos
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Mapa Interativo</CardTitle>
                <CardDescription>Explore o mapa com todas as unidades de saúde e pontos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/mapa">
                    Explorar
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Calendar className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>Festivais, shows e eventos culturais acontecendo agora</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/sobre">
                    Ver eventos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-balance text-3xl">Pronto para explorar?</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Use nosso mapa interativo para descobrir os melhores lugares
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/mapa">Abrir Mapa Interativo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
