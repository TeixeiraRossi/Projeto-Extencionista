import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Users, Building, TreePine } from "lucide-react"

export default function SobrePage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Sobre Nossa Cidade</h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Conheça a história, a cultura e as características que tornam nossa cidade única e especial
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <History className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>História</CardTitle>
                <CardDescription>Raízes e tradições</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-muted-foreground">
                  Nossa cidade tem uma história rica que remonta a séculos atrás. Fundada por colonizadores,
                  desenvolveu-se ao longo dos anos como um centro cultural e econômico importante, preservando suas
                  tradições enquanto abraça o futuro.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>População</CardTitle>
                <CardDescription>Diversidade e cultura</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-muted-foreground">
                  Com uma população acolhedora e diversificada, nossa cidade é conhecida pela hospitalidade. Aqui você
                  encontra uma mistura de culturas que se reflete na culinária, nas festas e no dia a dia dos moradores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Building className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Economia</CardTitle>
                <CardDescription>Desenvolvimento e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-muted-foreground">
                  A economia local é diversificada, com destaque para setores como comércio, turismo, tecnologia e
                  indústria. A cidade oferece excelentes oportunidades de negócios e qualidade de vida para
                  empreendedores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <TreePine className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Natureza</CardTitle>
                <CardDescription>Áreas verdes e lazer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-muted-foreground">
                  Cercada por belas paisagens naturais, a cidade conta com diversos parques, praças e áreas de
                  preservação ambiental. Lugares perfeitos para relaxar, praticar esportes e estar em contato com a
                  natureza.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight">Nossa Missão</h2>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Promover o desenvolvimento sustentável da cidade, preservando nossa história e cultura, enquanto criamos
              oportunidades para todos os cidadãos. Queremos ser uma referência em qualidade de vida, inovação e
              respeito ao meio ambiente.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
